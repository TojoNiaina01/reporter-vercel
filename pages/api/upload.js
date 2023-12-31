import formidable from "formidable";
import fs from "fs";
import path from "path";
import { v4 as uuidV4 } from "uuid";


export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const checkType = (type) => {
      const typeImageValid = [
        "jpg",
        "png",
        "jpeg",
        "JPG",
        "PNG",
        "JPEG",
        "webp",
      ];
      const typeVideoValid = ["mp4", "avi", "mkv"];

      if (typeImageValid.indexOf(type) === -1) {
        if (typeVideoValid.indexOf(type) === -1) {
          return false;
        } else {
          return "video";
        }
      } else {
        return "image";
      }
    };

    try {
      const form = new formidable.IncomingForm();
      const pathFolderImage = path.join(
        __dirname,
        "..",
        "..",
        "..",
        "..",
        "uploads",
        "images"
      );
      const pathFolderVideo = path.join(
        __dirname,
        "..",
        "..",
        "..",
        "..",
        "uploads",
        "videos"
      );
      form.multiples = true;
      //form.uploadDir = pathFolder
      //form.maxFileSize = 1 * 1024 * 1024
      try
      {
      await form.parse(req, async (err, fields, files) => {
        const file = files.file;
        const extension = file.mimetype.split("/").pop();
        const newName = uuidV4();

       
         const form = new formidable.IncomingForm()
        const pathFolderImage = path.join(__dirname,'..','..','..','..', 'uploads','images')
        const pathFolderVideo = path.join(__dirname,'..','..','..','..','uploads','videos')
        form.multiples = true
        //form.uploadDir = pathFolder
        //form.maxFileSize = 1 * 1024 * 1024

        if (err) {
          console.log("BIG ERROR");
          fs.unlink(file.filepath, () => {
            return res.status(500).json({ error: `parse error : ${err}` });
          });
        }
        

        if (!checkType(extension)) {
          fs.unlink(file.filepath, () => {
            return res
              .status(500)
              .json({
                error: `extension error : l'extension choisi n'est pas valide`,
              });
          });
        }


          if(checkType(extension) === 'image'){


          fs.rename(file.filepath, path.join(pathFolderImage,`${newName}.${extension}`), () => {
            return res.status(200).json({type: "image",result: {name: newName, extension: extension, size: file.size, type: file.mimetype}})

          })
           
          }else{

            fs.rename(file.filepath, path.join(pathFolderVideo,`${newName}.${extension}`), () => {
              return res.status(200).json({type: "video", result: {name: newName, extension: extension}})
          })
          //return res.status(200).json({type: "video"})
        }
      });
    } catch (e) {
      res.status(500).json({ msg: `big error detail : ${e}` });
    }
  }
}
