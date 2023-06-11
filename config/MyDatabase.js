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
                    .leftJoin({v : 'videos'}, 'v.article_id', 'a.id')
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
                        {image_id: 'img.id'}, 
                        {image_name: 'img.name'}, 
                        {image_extension: 'img.extension'},
                        {image_size: 'img.size'}, 
                        {image_type: 'img.type'},
                        {video_name: 'v.name'}, 
                        {video_extension: 'v.extension'},
                        {video_id: 'v.id'}
                        
                        )
                      .where('a.id', id)
            if(res){
            const resToJson = JSON.parse(JSON.stringify(res))

                return ObjectFormater(ObjectFormater(resToJson, 'image'), 'video')
        }else{
            return null
        }
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
        .orderBy('a.id', 'desc')

        if(res){
            const resToJson = JSON.parse(JSON.stringify(res))

             return ObjectFormater(resToJson, 'image')
        }else{
            return null
        }
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
        

            if(res){
                const resToJson = JSON.parse(JSON.stringify(res))

                    return ObjectFormater(resToJson, 'image')
            }else{
                return null
            }
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
        
            if(res){
                const resToJson = JSON.parse(JSON.stringify(res))

                    return ObjectFormater(resToJson, 'image')
            }else{
                return null
            }
    }
   
   
    async searchArticle(tag, lang){
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
                        .whereILike("a.title", `%${tag}%`)
                        .orWhereILike("a.description", `%${tag}%`)
                        .orWhereILike("a.body", `%${tag}%`)
                        .where('a.lang', lang)
                        .orderBy('a.id', 'desc')
        

            if(res){
                const resToJson = JSON.parse(JSON.stringify(res))

                    return ObjectFormater(resToJson, 'image')
            }else{
                return null
            }
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

        if(res){
            const resToJson = JSON.parse(JSON.stringify(res))

             return ObjectFormater(resToJson, 'image')
        }else{
            return null
        }
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

        if(res){
            const resToJson = JSON.parse(JSON.stringify(res))

             return ObjectFormater(resToJson, 'image')
        }else{
            return null
        }
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


        if(res){
            const resToJson = JSON.parse(JSON.stringify(res))

             return ObjectFormater(resToJson, 'image')
        }else{
            return null
        }
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


        if(res){
            const resToJson = JSON.parse(JSON.stringify(res))

             return ObjectFormater(resToJson, 'image')
        }else{
            return null
        }
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


        if(res){
            const resToJson = JSON.parse(JSON.stringify(res))

             return ObjectFormater(resToJson, 'image')
        }else{
            return null
        }
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

            if(res){
                const resToJson = JSON.parse(JSON.stringify(res))

                 return ObjectFormater(resToJson, 'image')
            }else{
                return null
            }
        
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
                          .innerJoin({h: 'hastag'}, 'ha.hastag_id', 'h.id')
                          .select(
                            'h.id',
                           'h.name',
                           'h.lang',
                           {articleID: 'a.id'}
                          )
                          .where({'c.id': categoryID, 'a.lang': lang})

                if(res){
                const result = JSON.parse(JSON.stringify(res))
                return filterElement(result, "id")
            }else{
                return null
            }
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

            if(res){
                const result = JSON.parse(JSON.stringify(res))
                return filterElement(result, "id")
            }else{
                return null
            }
        
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

                if(res){
                    const resToJson = JSON.parse(JSON.stringify(res))

                    return ObjectFormater(resToJson, 'image')
                }else{
                    return null
                }

            
     }


     async getAllHastag() {
        let res = await knex('hastag')
        .select('*')

        if(res){
            return JSON.parse(JSON.stringify(res))
        }else{
            return null
        }
     }

     async getHastagByID(id){
        let res = await knex('hastag')
        .select('*')
        .where('id', id)

        if(res){
            return JSON.parse(JSON.stringify(res))
        }else{
            return null
        }
     }

     async addHastag(tabHastag, lang){
        const result = []
        try {
            for (const hashtag of tabHastag) {
              const existingHashtag = await knex('hastag').where({'name': hashtag.toUpperCase(), lang: lang}).first();
                
              if (!existingHashtag) {
                let newHastag = await knex('hastag').insert({ name: hashtag.toUpperCase(), lang: lang });
                console.log(`Le hashtag '${hashtag}' a été inséré.`);
                result.push(newHastag[0])
                console.log("new == ",JSON.parse(JSON.stringify(newHastag)))
              } else {
                const newhas = JSON.parse(JSON.stringify(existingHashtag))
                console.log(`Le hashtag '${hashtag}' existe déjà.`);
                console.log("exist tag == ",JSON.parse(JSON.stringify(existingHashtag)))
                result.push(newhas.id)
              }
            }
          } catch (error) {
            console.error('Erreur lors de la vérification et de l\'insertion des hashtags :', error);
          }
          return result
     }

     async addHastagArticle(data){
            await knex('hastag_articles')
                  .insert(data)
            return data
     }


     /**========================================================================
     **                          IMAGES & VIDEO
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
     
     
     async addVideo({article_id, name, extension}){
        let videoID = await knex
                        .insert({
                            article_id,
                            name,
                            extension,
                            created_at:  moment().format("YYYY-MM-DD hh:mm:ss")
                        })
                        .into('videos')

            videoID = JSON.parse(JSON.stringify(videoID))

        return videoID[0]
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

                if(res){
                    return JSON.parse(JSON.stringify(res))
                }else{
                    return null
                }
     }

     async getFullFlashinfo(){
        let res = await knex('flashInfo')
                        .select('*')
        
            if(res){
                return JSON.parse(JSON.stringify(res))
            }else{
                return null
            }
     }

     async getFlashinfoByLang(lang){
        let res = await knex('flashInfo')
                        .select('*')
                        .where('lang', lang)
        
            if(res){
                return JSON.parse(JSON.stringify(res))
            }else{
                return null
            }
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

            if(res){
                return JSON.parse(JSON.stringify(res))
            }else{
                return null
            }
     }
     
     async getCategory(id){
        let res = await knex('categories')
                        .select('*')
                        .where('id', id)

            if(res){
                return JSON.parse(JSON.stringify(res))
            }else{
                return null
            }
     }

     /**========================================================================
     **                             USERS
     * @addUser            : mi-ajout user
     * @getUsers           : maka ny user rehetra
     * @checkMail          : mi-vérifier an'ilay olona
     * @getUser            : maka user
     * @deleteUser         : mamafa user
     * @findUser           : mitady user
     *========================================================================**/

     async getUsers(){
        let res =  await knex('users')
                        .select('*')
                        //.orderBy('id', 'desc')
            if(res){
                return JSON.parse(JSON.stringify(res))
            }else{
                return null
            }
     }

     async addUser({name, email, password, type, token}){
        let res = await knex('users')
                           .insert({
                            name,
                            email,
                            password,
                            type,
                            token,
                            created_at: moment().format("YYYY-MM-DD hh:mm:ss")
                           })
            let userID = JSON.parse(JSON.stringify(res))
            return await this.getFlashinfo(userID[0])
     }

     async getUser(id){
        let res =  await knex('users')
                        .select('*')
                        .where('id', id)
        if(res){
            return JSON.parse(JSON.stringify(res))
        }else{
            return null
        }
     }

     async checkMail(email){
        let res = await knex('users')
                        .count("*", {as: 'email'})
                        .where('email', email)
        
        if(res){
            return JSON.parse(JSON.stringify(res))
        }else{
            return null
        }
}

     async deleteUser(id){
        await knex('users')
            .where('id', id)
            .del()

        return id
     }

     async findUser(email){
        let res =  await knex('users')
                        .select('*')
                        .where('email', email)
        if(res){
            return JSON.parse(JSON.stringify(res))
        }else{
            return null
        }
     }

    /**========================================================================
     **                             ADS GESTION
     * @getAdsbyDate            : récupérer l'ads encore valide
     * @addAds                  : ajouter une ads
     * @checkDateAds                  : vérifie-na ra mbola dispo ilay date
     *========================================================================**/

     async getAllAds(){
        let res =  await knex('ads')
                        .select('*')
                        
        if(res){
            return JSON.parse(JSON.stringify(res))
        }else{
            return null
        }
     }

     async getAdsAndImages(){
            const res = await knex({a: 'ads'})
            .leftJoin({img: 'ads_images'}, 'a.id', 'img.ads_id')
            .select(
                'a.id', 
                'a.title', 
                'a.link', 
                'a.format', 
                'a.date_start', 
                'a.date_end',
                {image_id: 'img.id'},
                {image_name: 'img.name'},
                {image_extension: 'img.extension'}
                )


    if(res){
        return JSON.parse(JSON.stringify(res))
    }else{
        return null
    }
     }

     async getAds(id){
        const res = await knex({a: 'ads'})
                        .leftJoin({img: 'ads_images'}, 'a.id', 'img.ads_id')
                        .select(
                            'a.id', 
                            'a.title', 
                            'a.link', 
                            'a.format', 
                            'a.date_start', 
                            'a.date_end',
                            {image_id: 'img.id'},
                            {image_name: 'img.name'},
                            {image_extension: 'img.extension'}
                            )
                        .where('a.id', id)


            if(res){
                return JSON.parse(JSON.stringify(res))
            }else{
                return null
            }

              
     }

     async addAds({title, link, format, date_start, date_end}){
        let res = await knex('ads')
                        .insert({
                            title,
                            link,
                            format,
                            date_start,
                            date_end
                        })

            let userAds = JSON.parse(JSON.stringify(res))
            return await this.getAds(userAds[0])
     }

     async getAdsByDate(format){
            const today = new Date();
            let res = await knex({a: 'ads'})
                            .leftJoin({img: 'ads_images'}, 'a.id', 'img.ads_id')
                            .select(
                                'a.id', 
                                'a.title', 
                                'a.link', 
                                'a.format', 
                                'a.date_start', 
                                'a.date_end',
                                {image_id: 'img.id'},
                                {image_name: 'img.name'},
                                {image_extension: 'img.extension'}
                                )
                            .where('a.date_start', '<=', today)
                            .where('a.date_end', '>=', today)
                            .where('a.format', format)
            if(res){
                return JSON.parse(JSON.stringify(res))
            }else{
                return null
            }
     }

     async checkDateAds(date_start, date_end){
                let res = await knex('ads')
                                .count("*", {as: 'id'})
                                .whereNotBetween('date_start', [date_start, date_end])
                                .andWhereNotBetween('date_end', [date_start, date_end])

                if(res){
                    return JSON.parse(JSON.stringify(res))
                }else{
                    return null
                }
     }

     async addImageAds({ads_id, name, extension, size, type}){
        let imgID = await knex
                        .insert({
                            ads_id,
                            name,
                            extension,
                            size,
                            type
                        })
                        .into('ads_images')

        imgID = JSON.parse(JSON.stringify(imgID))

        return imgID[0]
     }

     async deleteImageAds(id){
        await knex('ads_images')
            .where('id', id)
            .del()

        return id
     }

     async deleteAds(id){
        await knex('ads')
        .where('id', id)
        .del()

    return id
     }


     async addFollowers(email){
        let id = await knex
                        .insert({
                            email,
                            created_at:  moment().format("YYYY-MM-DD hh:mm:ss")
                        })
                        .into('followers')

            id = JSON.parse(JSON.stringify(id))

        return id[0]
     }
}

export default MyDatabase;

