import nodemailer from 'nodemailer'

const sendEmail = async(to, subject, html) => {
    // Créez un objet de transport en utilisant votre service de courriel préféré (par exemple, Gmail)
    let transporter = nodemailer.createTransport({
      host: 'mail.hamarketplace.com',
      port: 465,
      secure: true,
      auth: {
        user: 'ha.market@hamarketplace.com',
        pass: 'HAmarket@123'
      }
    });
  
    // Définissez les options de l'e-mail
    let mailOptions = {
      from: '"HAmarket" <andriatsimihambomanana@gmail.com>',
      to,
      subject,
      html
    };
  
    // Envoyez le courriel en utilisant l'objet de transport
    let info = await transporter.sendMail(mailOptions);
    console.log(`Message sent: ${info.messageId}`);
  }
  
export default async function handler(req, res) {
    if(req.method === "POST"){
        try {
            const to = req.body.to
            const subject = req.body.subject
            const html = req.body.message

            await sendEmail(to, subject, html)
            res.status(200).json({message: "Mail a été bien envoyé!!"})
        } catch (error) {
            res.status(500).json({error: error})
            
        }
        res.status(200).json({message: "hello world!!!!"})
    }
  }
  