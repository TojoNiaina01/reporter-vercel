const knexConfig = require('../config/knexfile')
const knex = require('knex')(knexConfig)
var moment = require('moment')

const ObjectFormater = (parent, type) => {
    const result = []
    if(parent){
        parent.forEach((element, key) => {
            if(!result.find(item => item.id === element.id)){
                let parentTmp = {}
                let childTmp = []
                let childContent = {}


                for (const [i, value] of Object.entries(element)) {
                    if(!i.includes(type)){
                        
                        parentTmp = {[i]: value, ...parentTmp}
                    }else{
                        childContent = {[i]: value, ...childContent}
                    }
                  }

                  childTmp.push(childContent)
                  parentTmp = {[type]: childTmp, ...parentTmp}    
                  result.push(parentTmp)
            }else{
                let childContent = {}
                const elementIndex = result.findIndex(item => item.id === element.id)

                for (const [i, value] of Object.entries(element)) {
                    if(i.includes(type)){
                        childContent = {[i]: value, ...childContent}
                    }
                }
                result[elementIndex][type].push(childContent)

            }
        })

        return result
    }
}


class MyDatabase {

    /**========================================================================
     **                          ARTICLES
     * @getArticle          : récupérer une article avec son ID
     * @getFullArticles     : récupérer tous les articles
     * @addArticle          : ajouter une article
     * @deleteArticle       : effacer une article
     *========================================================================**/

    async getArticle(id) {
        const res = await knex({a: 'articles'})
                     .leftJoin({img: 'images'}, 'a.id', 'img.article_id')
                     .select(
                            'a.id', 
                            'a.title', 
                            'a.body', 
                            'a.description', 
                            'a.author', 
                            {image_name: 'img.name'}, 
                            {image_extension: 'img.extension'},
                            {image_size: 'img.size'}, 
                            {image_type: 'img.type'}
                            
                            )
                      .where('a.id', id)
        

        const resToJson = JSON.parse(JSON.stringify(res))

        return ObjectFormater(resToJson, 'image')
    }

    async getArticlesByLang(lang){
        const res = await knex({a: 'articles'})
        .leftJoin({img: 'images'}, 'a.id', 'img.article_id')
        .select(
               'a.id', 
               'a.title', 
               'a.body', 
               'a.description', 
               'a.author', 
               'a.lang',
               {image_name: 'img.name'}, 
               {image_extension: 'img.extension'},
               {image_size: 'img.size'}, 
               {image_type: 'img.type'}
               
               )
        .where('a.lang', lang)


        const resToJson = JSON.parse(JSON.stringify(res))

        return ObjectFormater(resToJson, 'image')
    }

    async getFullArticles(){
        const res = await knex({a: 'articles'})
                     .leftJoin({img: 'images'}, 'a.id', 'img.article_id')
                     .leftJoin({c : 'categories'}, 'c.id', 'a.category_id')
                     .select(
                            'a.id', 
                            'a.title', 
                            'a.body', 
                            'a.description', 
                            'a.author', 
                            'a.lang',
                            {category_fr: 'c.fr'},
                            {category_en: 'c.en'},
                            {image_name: 'img.name'}, 
                            {image_extension: 'img.extension'},
                            {image_size: 'img.size'}, 
                            {image_type: 'img.type'}
                            
                            )
        

        const resToJson = JSON.parse(JSON.stringify(res))

        return ObjectFormater(resToJson, 'image')
    }

    async addArticle(title, body, description, author){
       let articleID = await knex
                        .insert({
                            title,
                            body,
                            description,
                            author,
                            created_at: moment().format("YYYY-MM-DD hh:mm:ss")
                        }) 
                        .into('articles')
        articleID = JSON.parse(JSON.stringify(articleID))

        return this.getArticle(articleID[0])
    }

    async deleteArticle(id){
        await knex('articles')
             .where('id', id)
             .del()
        return id
    }






     /**========================================================================
     **                          IMAGES
     * @addImage           : ajouter une image
     * @deleteImage        : effacer une image avec son ID
     *========================================================================**/

     async addImage(article_id, name, extension, size, type){
        let imgID = await knex
                        .insert({
                            article_id,
                            name,
                            extension,
                            size,
                            type
                        })
                        .into('images')

        imgID = JSON.parse(JSON.stringify(imgID))

        return imgID[0]
     }

     async deleteImage(id){
        await knex('images')
            .where('id', id)
            .del()

        return id
     }




     /**========================================================================
     **                             FLASH INFO
     * @getFlashinfo            : récupérer une flash info avec son ID
     * @addFlashinfo            : ajouter une flash info
     * @getFullFlashinfo        : récupérer tous les flashinfo
     * @getFlashinfoByLang      : récupérer tous les flashinfo par lang
     * @deleteFlashinfo         : effacer une flash info
     *========================================================================**/

     async getFlashinfo(id){
        let res = await knex('flashInfo')
                        .select('*')
                        .where('id', id)

        return JSON.parse(JSON.stringify(res))
     }

     async getFullFlashinfo(){
        let res = await knex('flashInfo')
                        .select('*')
        
        return JSON.parse(JSON.stringify(res))
     }

     async getFlashinfoByLang(lang){
        let res = await knex('flashInfo')
                        .select('*')
                        .where('lang', lang)
        
        return JSON.parse(JSON.stringify(res))
     }

     async deleteFlashinfo(id){
        await knex('flashinfo')
            .where('id', id)
            .del()

        return id
     }

     async addFlashinfo(title, body, description, author, name_img, extension, created_at, lang){
        let flashID = await knex('flashInfo')
                        .insert({
                            title, 
                            body, 
                            description, 
                            author, 
                            name_img,
                            extension, 
                            created_at, 
                            lang
                        })
        flashID = JSON.parse(JSON.stringify(flashID))
        return await this.getFlashinfo(flashID[0])
     }


      /**========================================================================
     **                             CATEGORIES
     * @getFullCategories            : récupérer tous les catégories
     * @getCategory                  : récupérer un catégorie avec son ID
     *========================================================================**/

     async getFullCategories(){
        let res = await knex('categories')
                        .select('*')

        return JSON.parse(JSON.stringify(res))
     }
     
     async getCategory(id){
        let res = await knex('categories')
                        .select('*')
                        .where('id', id)

        return JSON.parse(JSON.stringify(res))
     }
}

export default MyDatabase;

