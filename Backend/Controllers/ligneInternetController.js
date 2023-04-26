const connection = require("../util/database");

const getdemandes = async (req, res, next) => {
  connection.query(
    "SELECT ligneinternet.id,ligneinternet.nom,ligneinternet.prenom,ligneinternet.departement_id,ligneinternet.fonction,ligneinternet.forfait,ligneinternet.appareil,departements.dept,roles.role FROM `ligneinternet` inner join departements on ligneinternet.departement_id = departements.id INNER join roles on ligneinternet.fonction = roles . id;",
    (error, data, fields) => {
      if (error) res.status(500).send(error);
      else res.status(200).json(data);
    }
  );
};



const getDemandeById = async (req, res, next) => {
  const id = req.params.id;
  connection.query(
    "SELECT * FROM `ligneinternet` WHERE id = ?",
    [id],
    (error, data, fields) => {
      if (error) res.status(500).send(error);
      else res.status(200).json(data);
    }
  );
};

const updateDemande = async (req, res) => {

  const id = req.params.id;
 
  connection.query(
    "UPDATE `ligneinternet` SET `nom`=?,`perenom`=?,`departement_id`=?,`fonction`=?,`appareil`=?,`forfait`=? WHERE id = ?",
    [
        req.body.nom,
        req.body.prenom,
        req.body.departement_id,
        req.body.fonction,
        req.body.appareil,
        req.body.forfait,
        id
        
    ],
    (err, data, fields) => {
      if (err) res.status(500).send(err);
      else
        res.status(200).send({ msg: "Demande modifié avec succés" });
    }
  );
};

const addDemande = async (req, res) => {
  connection.query(
    "INSERT INTO `ligneinternet`(`nom` ,`prenom` ,`departement_id` ,`fonction` ,`appareil` ,`forfait` ,`user_id` ) VALUES (?,?,?,?,?,?,?)",
    [
        req.body.nom,
        req.body.prenom,
        req.body.departement_id,
        req.body.fonction,
        req.body.appareil,
        req.body.forfait,
        req.params.user_id

    ],
    (err, data, fields) => {
      if (err) res.status(500).send(err);
      else {
        res.status(200).send({ msg: "Demande Ajouté avec succés" });
      }
    }
  );
};

const deleteDemande = async (req, res) => {
  const id = req.params.id;
  connection.query(
    "DELETE FROM ligneinternet where id =?",
    [id],
    (err, data, fields) => {
      if (err) res.status(500).send(err);
      else res.status(200).send({ msg: "Demande  supprimé avec succées" });
    }
  );
};








module.exports = {
    getdemandes,
    getDemandeById,
    updateDemande,
    addDemande,
    deleteDemande

};
