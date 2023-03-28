const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt')
const connection = require('../util/database')


function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'adrenaline4games@gmail.com', // TODO: your gmail account
        pass: 'veovaipwochynhip' // TODO: your gmail password
    }
});

const SaveResetPasswordCode = (user_id, code) => {
    connection.query(
        'INSERT INTO `reset_password_code`(`code`, `user_id`) VALUES (?,?)',
        [code, user_id],
        (err, data, fields) => {
            if (err) return 1 ;
            else return 0
        },
    )
}
const sendConfirmationEmail = async (req, res, next) => {

    const code =makeid(25);
    const { email } = req.body
          connection.query(
        'SELECT id FROM `users` WHERE `email` =?', [email],  (error, data) => {
            if(error) { res.status(500).send(error)} 
            else if (data.length !=1){
                res.status(404).send({msg:"Adresse mail invalid"})
            }else {
                connection.query(
                    'INSERT INTO `reset_password_code`(`code`, `user_id`) VALUES (?,?)',[code, data[0].id],(error, data) => {
                        if (error) res.status(500).send(error)
                       else {
                        let mailOptions = {
                            from: 'adrenaline4games@gmail.com', 
                            to: email, 
                            subject: 'Réinitialiser votre mot de passe',
                            text: '',
                            html: `<h1>Réinitialisation du mot de passe</h1> 
                            <p>Bonjour,</p> 
                            <p>Veuillez cliquer sur le button ci-dessous pour ré-initialiser votre mot de passe.</p> 
                            <button style="width:120px; height:10%; background-color:#E62147; font-size:large; border-radius:15px"><a style="color:white" href=http://localhost:4200/updatePwd/${code}  target_="blank" >Cliquez ici</a></button>
                            <p>A très bientôt !</p>`
                    
                        };
                        transporter.sendMail(mailOptions, (err, data) => {
                            if (err) {
                                res.status(404).send(err)
                            }
                            res.status(200).send(data)
                        });

                       }
                    },
                )

            }

        },
    )

}

const updatePassword = async (req, res, next) => {
    const { code } = req.body
    let id
    connection.query(
        'SELECT user_id FROM `reset_password_code` WHERE `code` =?', [code], (error, data) => {
            if (error) { return res.status(500).send(error) }
            else if (data.length) {
                // UPDATE `users` SET `password`=? WHERE id =
                id = data[0].user_id
                // console.log(id);
                connection.query('DELETE FROM `reset_password_code` WHERE user_id = ?;', [id], async (error, data) => {
                    if (error) { return res.status(500).send(error) }
                    else {
                        const salt = await bcrypt.genSalt(7);
                        bcrypt.hash(req.body.nvxPwd, salt, (err, hash) => {
                            if (err) {
                                return res.status(500).send({
                                    msg: "hash not work"
                                });
                            } else {
                                connection.query('UPDATE `users` SET `password`=? WHERE id = ?',
                                    [hash, id], (err, data, fields) => {
                                        if (err) return res.status(500).send(err)
                                        else return res.status(200).send({ msg: 'Mdp modifié avec succés' })
                                    },)
                            }
                        })
                    }
                })


            } else {
                return res.status(500).send({ msg: 'Code incorrect' })

            }

        },
    )

}


module.exports = {
    sendConfirmationEmail,
    updatePassword


}