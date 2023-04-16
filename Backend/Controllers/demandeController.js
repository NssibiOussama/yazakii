const connection = require("../util/database");


const demande = async (req, res) => {

    const user_id = req.params.id;
    const nom = req.body.nom;
    const prenom = req.body.prenom
    const email = req.body.email
    const description = req.body.description
 
  
    connection.query(
      "INSERT INTO `demandes`( `nom`, `prenom`, `email`, `description`, `user_id`) VALUES (?,?,?,?,?)",
      [
          nom,
          prenom,
          email,
          description,
          user_id,
      ],
      (err, data, fields) => {
        if (err) res.status(500).send(err);
        else {
          res.status(200).send({ msg: "Demande envoyé avec succés" });
        }
      }
    );
  };

  module.exports = {
    demande,
   
};