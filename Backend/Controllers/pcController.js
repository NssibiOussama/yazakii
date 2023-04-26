const connection = require("../util/database");

const getdemandes = async (req, res, next) => {
  connection.query(
"SELECT pc.id,pc.nom,pc.prenom,pc.departement_id,pc.fonction,pc.motif,pc.appareil,departements.dept,roles.role FROM `pc` inner join departements on pc.departement_id = departements.id INNER join roles on pc.fonction = roles . id;",    (error, data, fields) => {
      if (error) res.status(500).send(error);
      else res.status(200).json(data);
    }
  );
};



const getDemandeById = async (req, res, next) => {
  const id = req.params.id;
  connection.query(
    "SELECT * FROM `pc` WHERE id = ?",
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
    "UPDATE `pc` SET `nom`=?,`perenom`=?,`departement_id`=?,`fonction`=?,`appareil`=?,`motif`=? WHERE id = ?",
    [
        req.body.nom,
        req.body.prenom,
        req.body.departement_id,
        req.body.fonction,
        req.body.appareil,
        req.body.motif,
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
    "INSERT INTO `pc`(`nom` ,`prenom` ,`departement_id` ,`fonction` ,`appareil` ,`motif`,`user_id`  ) VALUES (?,?,?,?,?,?,?)",
    [
        req.body.nom,
        req.body.prenom,
        req.body.departement_id,
        req.body.fonction,
        req.body.appareil,
        req.body.motif,
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
    "DELETE FROM pc where id =?",
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
