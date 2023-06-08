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

const filterElement = (obj, type) => { // mba i-combinena izay mitovy valeur (obj: ilay tableau; type: ilay i-filtre-na anazy)

    const result = []
    obj.forEach((element, key) => {
        if(!result.find(item => item[type] === element[type])){
            result.push(element)
        }
    })

    return result
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
                    .leftJoin({c : 'categories'}, 'c.id', 'a.category_id')
                    .select(
                        'a.id', 
                        'a.title', 
                        'a.body', 
                        'a.description', 
                        'a.author', 
                        'a.lang',
                        'a.created_at',
                        'a.flash', 
                        'a.hot', 
                        'a.slide', 
                        'a.created_at',
                        {category_fr: 'c.fr'},
                        {category_en: 'c.en'},
                        {category_id: 'c.id'},
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
        .leftJoin({c : 'categories'}, 'c.id', 'a.category_id')
        .select(
               'a.id', 
               'a.title', 
               'a.body', 
               'a.description', 
               'a.author', 
               'a.lang',
               'a.created_at',
               'a.flash', 
               'a.hot', 
               'a.slide', 
               'a.created_at',
               {category_fr: 'c.fr'},
               {category_en: 'c.en'},
               {category_id: 'c.id'},
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
                            'a.flash', 
                            'a.hot', 
                            'a.slide', 
                            'a.created_at',
                            {category_fr: 'c.fr'},
                            {category_en: 'c.en'},
                            {category_id: 'c.id'},
                            {image_name: 'img.name'}, 
                            {image_extension: 'img.extension'},
                            {image_size: 'img.size'}, 
                            {image_type: 'img.type'}
                            
                            )
                        .orderBy('a.id', 'desc')
        

        const resToJson = JSON.parse(JSON.stringify(res))

        return ObjectFormater(resToJson, 'image')
    }

    async getArticleByCategoryLang(category_id, lang){
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
                            'a.flash', 
                            'a.hot', 
                            'a.slide', 
                            'a.created_at',
                            {category_fr: 'c.fr'},
                            {category_en: 'c.en'},
                            {category_id: 'c.id'},
                            {image_name: 'img.name'}, 
                            {image_extension: 'img.extension'},
                            {image_size: 'img.size'}, 
                            {image_type: 'img.type'}
                            
                            )
                        .where({'c.id': category_id, 'a.lang': lang})
                        .orderBy('a.id', 'desc')
        

        const resToJson = JSON.parse(JSON.stringify(res))

        return ObjectFormater(resToJson, 'image')
    }

   async getSlideByLang(lang){
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
            'a.flash', 
            'a.hot', 
            'a.slide', 
            'a.created_at',
            {category_fr: 'c.fr'},
            {category_en: 'c.en'},
            {category_id: 'c.id'},
            {image_name: 'img.name'}, 
            {image_extension: 'img.extension'},
            {image_size: 'img.size'}, 
            {image_type: 'img.type'}
            
            )
        .where({'a.lang': lang, 'a.slide': true})


            const resToJson = JSON.parse(JSON.stringify(res))

        return ObjectFormater(resToJson, 'image')
    }
   async getFlashByLang(lang){
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
            'a.flash', 
            'a.hot', 
            'a.slide', 
            'a.created_at',
            {category_fr: 'c.fr'},
            {category_en: 'c.en'},
            {category_id: 'c.id'},
            {image_name: 'img.name'}, 
            {image_extension: 'img.extension'},
            {image_size: 'img.size'}, 
            {image_type: 'img.type'}
            
            )
        .where({'a.lang': lang, 'a.flash': true})


            const resToJson = JSON.parse(JSON.stringify(res))

        return ObjectFormater(resToJson, 'image')
    }


   async getHotByLang(lang){
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
            'a.flash', 
            'a.hot', 
            'a.slide', 
            'a.created_at',
            {category_fr: 'c.fr'},
            {category_en: 'c.en'},
            {category_id: 'c.id'},
            {image_name: 'img.name'}, 
            {image_extension: 'img.extension'},
            {image_size: 'img.size'}, 
            {image_type: 'img.type'}
            
            )
        .where({'a.lang': lang, 'a.hot': true})


            const resToJson = JSON.parse(JSON.stringify(res))

        return ObjectFormater(resToJson, 'image')
    }

    async getRecentArticle(lang){
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
            'a.flash', 
            'a.hot', 
            'a.slide', 
            'a.created_at',
            {category_fr: 'c.fr'},
            {category_en: 'c.en'},
            {category_id: 'c.id'},
            {image_name: 'img.name'}, 
            {image_extension: 'img.extension'},
            {image_size: 'img.size'}, 
            {image_type: 'img.type'}
            
            )
        .where({'a.lang': lang})
        .orderBy('a.id', 'desc')


        const resToJson = JSON.parse(JSON.stringify(res))

        return ObjectFormater(resToJson, 'image')
    }


    async getMostReadByLang(lang){
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
            'a.flash', 
            'a.hot', 
            'a.slide', 
            'a.created_at',
            'a.views',
            {category_fr: 'c.fr'},
            {category_en: 'c.en'},
            {category_id: 'c.id'},
            {image_name: 'img.name'}, 
            {image_extension: 'img.extension'},
            {image_size: 'img.size'}, 
            {image_type: 'img.type'}
            
            )
        .where({'a.lang': lang})
        .orderBy('a.views', 'desc')


        const resToJson = JSON.parse(JSON.stringify(res))

        return ObjectFormater(resToJson, 'image')
    }


    async getMostPopular(lang){
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
            'a.flash', 
            'a.hot', 
            'a.slide', 
            'a.created_at',
            'a.views',
            {category_fr: 'c.fr'},
            {category_en: 'c.en'},
            {category_id: 'c.id'},
            {image_name: 'img.name'}, 
            {image_extension: 'img.extension'},
            {image_size: 'img.size'}, 
            {image_type: 'img.type'}
            
            )
        .where({'a.lang': lang})
        .orderBy('a.rating', 'desc')


        const resToJson = JSON.parse(JSON.stringify(res))

        return ObjectFormater(resToJson, 'image')
    }
    
    async addArticle({title, body, description, author, category_id, lang}){
       let articleID = await knex
                        .insert({
                            title,
                            body,
                            description,
                            author,
                            category_id,
                            created_at: moment().format("YYYY-MM-DD hh:mm:ss"),
                            lang,
                            flash: false,
                            hot: false,
                            slide: false
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

    async updateArticle({id, title, description, body, category_id, lang}){
        return await knex('articles')
                    .where('id', id)
                    .update({
                        title,
                        description,
                        body,
                        category_id,
                        lang,
                        created_at: moment().format("YYYY-MM-DD hh:mm:ss")
                    })
    }

    async updateFlash(id, flash){
        return await knex('articles')
                    .where('id', id)
                    .update({
                        flash: flash
                    })
    }
    async updateHot(id, hot){
        return await knex('articles')
                    .where('id', id)
                    .update({
                        hot: hot
                    })
    }
    async updateSlide(id, slide){
        return await knex('articles')
                    .where('id', id)
                    .update({
                        slide: slide
                    })
    }

    async checkFlash(flash, lang){
        return await knex('articles')
                    .count('*', {as: 'flash'})
                    .where({flash: flash, lang: lang})
    }
    async checkSlide(slide, lang){
        return await knex('articles')
                    .count('*', {as: 'slide'})
                    .where({slide: slide, lang: lang})
    }
    async checkHot(hot, lang){
        return await knex('articles')
                    .count('*', {as: 'hot'})
                    .where({hot: hot, lang: lang})
    }

    async incrementViews(id){
        return await knex('articles')
                    .where('id', id)
                    .increment('views', 1)
    }
    
    async incrementRating(id){
        return await knex('articles')
                    .where('id', id)
                    .increment('rating', 1)
    }



     /**========================================================================
     **                          HASTAG ARTICLES
     * @getHastagByCategory           : maka ny hastag rehetra par category
     * @getHastagByArticle            : maka ny hastag rehetra isakin'ny article
     * @getArticlesByHasTag           : maka ny articles rehetra isakin'ny hastag
     * @getAllHastag                  : alaina ny hastag rehetra
     *========================================================================**/

     async getHastagByCategory(categoryID, lang){
        const res = await knex({c: 'categories'})
                          .leftJoin({a: 'articles'}, 'c.id', 'a.category_id')
                          .leftJoin({ha: 'hastag_articles'}, 'ha.article_id', 'a.id')
                          .leftJoin({h: 'hastag'}, 'ha.hastag_id', 'h.id')
                          .select(
                            'h.id',
                           'h.name',
                           'h.lang',
                           {articleID: 'a.id'}
                          )
                          .where({'c.id': categoryID, 'a.lang': lang})

        const result = JSON.parse(JSON.stringify(res))
        return filterElement(result, "id")
     }
    
    
     async getHastagByArticle(articleID){
        const res = await knex({c: 'categories'})
                          .leftJoin({a: 'articles'}, 'c.id', 'a.category_id')
                          .leftJoin({ha: 'hastag_articles'}, 'ha.article_id', 'a.id')
                          .leftJoin({h: 'hastag'}, 'ha.hastag_id', 'h.id')
                          .select(
                            'h.id',
                           'h.name',
                           'h.lang',
                           {articleID: 'a.id'}
                          )
                          .where('a.id', articleID)

        const result = JSON.parse(JSON.stringify(res))
        return filterElement(result, "id")
     }
     
     
     async getArticlesByHasTag(hastagID){
        const res = await knex({a: 'articles'})
                        .leftJoin({img: 'images'}, 'a.id', 'img.article_id')
                        .leftJoin({c : 'categories'}, 'c.id', 'a.category_id')
                        .leftJoin({ha: 'hastag_articles'}, 'ha.article_id', 'a.id')
                        .leftJoin({h: 'hastag'}, 'ha.hastag_id', 'h.id')
                        .select(
                            'a.id', 
                            'a.title', 
                            'a.body', 
                            'a.description', 
                            'a.author', 
                            'a.lang',
                            'a.flash', 
                            'a.hot', 
                            'a.slide', 
                            'a.created_at',
                            'a.views',
                            {category_fr: 'c.fr'},
                            {category_en: 'c.en'},
                            {category_id: 'c.id'},
                            {image_name: 'img.name'}, 
                            {image_extension: 'img.extension'},
                            {image_size: 'img.size'}, 
                            {image_type: 'img.type'}
                        )
                        .where('h.id', hastagID)

            const resToJson = JSON.parse(JSON.stringify(res))

            return ObjectFormater(resToJson, 'image')
     }


     async getAllHastag() {
        let res = await knex('hastag')
        .select('*')

        return JSON.parse(JSON.stringify(res))
     }

     async getHastagByID(id){
        let res = await knex('hastag')
        .select('*')
        .where('id', id)

return JSON.parse(JSON.stringify(res))
     }
     /**========================================================================
     **                          IMAGES
     * @addImage           : ajouter une image
     * @deleteImage        : effacer une image avec son ID
     *========================================================================**/

     async addImage({article_id, name, extension, size, type}){
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
    //  async addImage(article_id, name, extension, size, type){
    //     let imgID = await knex
    //                     .insert({
    //                         article_id,
    //                         name,
    //                         extension,
    //                         size,
    //                         type
    //                     })
    //                     .into('images')

    //     imgID = JSON.parse(JSON.stringify(imgID))

    //     return imgID[0]
    //  }

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

