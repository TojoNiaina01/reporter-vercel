import fs from 'fs';
import path from 'path';


  export default async function handler(req, res) {

    if(req.method === "POST"){
        try {
            const name = req.body.name;
            const extension = req.body.extension

            let file;

            const typeImageValid = ["jpg", "png", "jpeg", "JPG", "PNG", "JPEG"]
            const typeVideoValid = ["mp4", "avi", "mkv"]

            if(typeVideoValid.indexOf(extension) !== -1){
                file = path.join(__dirname,'..','..','..','..','public','uploads','videos',`${name}.${extension}`)
            }else if(typeImageValid.indexOf(extension) !== -1){
                file = path.join(__dirname,'..','..','..','..','public','uploads','images',`${name}.${extension}`)
            }


            fs.unlink(file, () => {
                res.status(200).json({message: "suppression du video file réussi kkkkk"})
            })
        } catch (error) {
            res.status(200).json(error)
        }
       
    }

}