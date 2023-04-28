const bcrypt = require('bcrypt')
const connection = require('../util/database')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const nodemailer = require('nodemailer')

const sigunup = async (req, res, next) => {
  connection.query(
    'SELECT * FROM users where users.email = ?',
    [req.body.email],
    async (err, result) => {
      if (result.length) {
        return res.status(409).send({
          msg: 'Compte dèjà existant!',
        })
      } else {
        // username is available
        const salt = await bcrypt.genSalt(7)
        const password =makeid(12);
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) {
            return res.status(500).send({
              msg: err,
            })
          } else {
            // has hashed pw => add to database
            const image =
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZiiiqDB3T5-nKWzCEYN_ZGaA7qaYrfIQE3Q&usqp=CAU'
            connection.query(
              'INSERT INTO `users`(`first_name`, `last_name`, `email`, `password`,`image`,`role`,`departement`) VALUES (?,?,?,?,?,?,?)',
              [
                req.body.firstname,
                req.body.lastname,
                req.body.email,
                hash,
                image,
                req.body.role,
                req.body.departement
              ],
              (err, result) => {
                if (err) {
                  return res.status(400).send({
                    msg: err,
                  })
                } else {
                  let mailOptions = {
                    from: 'adrenaline4games@gmail.com', 
                    to: req.body.email, 
                    subject: 'Credationals for yazaki',
                    text: '',
                    html: `<h3>Username et password :</h3> 
                    <p>Bonjour,</p> 
                    <p>Password : ${password}</p> 
                    <p>Email : ${req.body.email}</p> 
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
        })
      }
    },
  )
}
const login = async (req, res, next) => {
  connection.query(
    `SELECT * FROM users WHERE email = ${connection.escape(req.body.email)} `,
    (err, result) => {
      // user does not exists
      if (err) {
        return res.status(400).send({
          msg: err,
        })
      }
      if (!result.length) {
        return res.status(401).send({
          msg: 'Adresse ou mot de passe incorrecte!',
        })
      }
      // check password
      bcrypt.compare(
        req.body.password,
        result[0]['password'],
        (bErr, bResult) => {
          // wrong password
          if (bErr) {
            return res.status(401).send({
              msg: 'Adresse ou mot de passe incorrecte!',
            })
          }
          if (bResult) {
            const token = jwt.sign(
              {
                userId: result[0].id,
                firstname: result[0].first_name,
                lastname: result[0].last_name,
                email: result[0].email,
                image: result[0].image,
                role: result[0].role,
                departement : result[0].departement
              },
              process.env.SECRET_KEY,
              {
                expiresIn: '7d',
              },
            )
            return res.status(200).send({
              msg: 'Logged in!',
              token: token,
            })
          }
          return res.status(401).send({
            msg: 'Adresse ou mot de passe incorrecte!',
          })
        },
      )
    },
  )
}

function makeid(length) {
  var result = ''
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  var charactersLength = characters.length
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'adrenaline4games@gmail.com', // TODO: your gmail account
    pass: 'veovaipwochynhip', // TODO: your gmail password
  },
})



const confirmEmail = async (req, res, next) => {
  const code = req.params.code
  
  let id;
  connection.query(
    'SELECT user_id FROM `reset_password_code` WHERE `code` =?',
    [code],
    (error, data) => {
      if (error) return res.status(500).send(error)
      if (data.length) {
        id = data[0].user_id
        connection.query(
          'DELETE FROM `reset_password_code` WHERE user_id = ? ',
          [id],
          async (error, data) => {
              if (error) return res.status(500).send(error);
               else { connection.query('UPDATE `users` SET `verified`= 1  WHERE id = ?',[id],
                (err, data, fields) => {
                  if (err) return res.status(500).send(err);
                  else res.writeHead(301,{location: `http://localhost:4200/login`}).end()
                }
              )
            }
          }
        )
      }
    },
  )
}

module.exports = { sigunup, login, confirmEmail }
