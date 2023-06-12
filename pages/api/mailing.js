import nodemailer from 'nodemailer'

const sendEmail = async(to, subject, html) => {

  
    // Créez un objet de transport en utilisant votre service de courriel préféré (par exemple, Gmail)
    let transporter = nodemailer.createTransport({
      host: 'mail.indep-reporter.com',
       port: 465,
       secure: true,
      auth: {
        user: 'administrator@indep-reporter.com',
        pass: 'GOvina@@123'
      }
    });
  
    // Définissez les options de l'e-mail
    let mailOptions = {
      from: '"INDEPENDENT R." <administrator@indep-reporter.com>',
      to,
      subject: `${subject}`,
      html: `${html}`
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

            console.log(`to ${to} subject ${subject}`)

            await sendEmail(to, subject, html).then(result => {
              res.status(200).json({message: "Mail a été bien envoyé!!"})
            })
            
        } catch (error) {
            res.status(500).json({error: error})
            
        }
      
    }
  }
  