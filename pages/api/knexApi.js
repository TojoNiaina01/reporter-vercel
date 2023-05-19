import MyDatabase from "@/config/MyDatabase"


export default async function handler(req, res) {
    const {method, body} = req
    const db = new MyDatabase

    try {
        switch(method){
            case "POST":
                /**========================================================================
                 * *                                INFO
                 *   query: nom de la méthode de MyDatabase
                 *   param: parametre de query
                 *========================================================================**/
                 const {query, param} = body
                 if(param){
                    const data = await db[query](...param) // mitovy @ hoe db.getArticle(id) (ra ohatra oe query = "getArticle")
                     res.status(200).json({result: data})
                 }else{
                    const data = await db[query]()
                    res.status(200).json({result: data})
                 }
                 break;
            default:
                res.status(405).json({message: "nous sommes dans le default cases"})
                 
        }
        
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "une erreur c'est produit"})
        
    }
  } 