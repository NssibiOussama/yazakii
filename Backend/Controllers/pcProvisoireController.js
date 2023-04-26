const connection = require("../util/database");

const getdemandes = async (req, res, next) => {
  connection.query(
"select pcprovisoire.id,pcprovisoire.nom,pcprovisoire.prenom,pcprovisoire.departement_id,pcprovisoire.fonction,pcprovisoire.motif,pcprovisoire.appareil,pcprovisoire.user_id,departements.dept,roles.role , users.first_name , users.last_name FROM `pcprovisoire` inner join departements on pcprovisoire.departement_id = departements.id INNER join roles on pcprovisoire.fonction = roles . id INNER join users on pcprovisoire.user_id = users.id;",    (error, data, fields) => {
      if (error) res.status(500).send(error);
      else res.status(200).json(data);
    }
  );
};



const getDemandeById = async (req, res, next) => {
  const id = req.params.id;
  connection.query(
    "SELECT * FROM `pcprovisoire` WHERE id = ?",
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
    "UPDATE `pcprovisoire` SET `nom`=?,`perenom`=?,`departement_id`=?,`fonction`=?,`appareil`=?,`motif`=? ,`du`=?,`jusqua`=? WHERE id = ?",
    [
        req.body.nom,
        req.body.prenom,
        req.body.departement_id,
        req.body.fonction,
        req.body.appareil,
        req.body.motif,
        req.body.du,
        req.body.jusqua,
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
    "INSERT INTO `pcprovisoire`(`nom` ,`prenom` ,`departement_id` ,`fonction` ,`appareil`,`motif`,`du`,`jusqua`,`user_id`  ) VALUES (?,?,?,?,?,?,?,?,?)",
    [
        req.body.nom,
        req.body.prenom,
        req.body.departement_id,
        req.body.fonction,
        req.body.appareil,
        req.body.motif,
        req.body.du,
        req.body.jusqua,
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
    "DELETE FROM ppcprovisoirec where id =?",
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
