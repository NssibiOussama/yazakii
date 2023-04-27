const connection = require("../util/database");


const getLigneInternetdemandes = async (req, res, next) => {
 const role = req.params.role
  if (role == "HR Manager" || "IT Manager"||"Plant Manager") {
    
    connection.query(
      "select ligneinternet.id,ligneinternet.nom,ligneinternet.prenom,ligneinternet.departement_id,ligneinternet.fonction,ligneinternet.forfait,ligneinternet.appareil,ligneinternet.user_id,ligneinternet.sig_manager,ligneinternet.sig_itmanager,ligneinternet.sig_hrmanager,ligneinternet.sig_plantmanager,ligneinternet.approuved,users.first_name,users.last_name,users.role FROM `ligneinternet` INNER JOIN users on ligneinternet.departement_id = users.departement WHERE ligneinternet.approuved = 0;",
      [
        req.params.role
  
      ],
      (error, data, fields) => {
        if (error) res.status(500).send(error);
        else res.status(200).json(data);
      }
    );
  } else if (role == "Manager") {
    connection.query(
      "SELECT ligneinternet.id,ligneinternet.nom,ligneinternet.prenom,ligneinternet.departement_id,ligneinternet.fonction,ligneinternet.forfait,ligneinternet.appareil,ligneinternet.user_id,ligneinternet.sig_manager,ligneinternet.sig_itmanager,ligneinternet.sig_hrmanager,ligneinternet.sig_plantmanager,ligneinternet.approuved,users.first_name,users.last_name,users.role FROM `ligneinternet` INNER JOIN users on ligneinternet.departement_id = users.departement WHERE users.role = ? and ligneinternet.approuved = 0;",
      [
        req.params.role
  
      ],
      (error, data, fields) => {
        if (error) res.status(500).send(error);
        else res.status(200).json(data);
      }
    );
  }


};

const getPcdemandes = async (req, res, next) => {
 const  role = req.params.role
  if (role == "HR Manager" || "IT Manager"||"Plant Manager") {
    
    connection.query(
      "select pc.id,pc.nom,pc.prenom,pc.departement_id,pc.fonction,pc.motif,pc.appareil,pc.user_id,pc.sig_manager,pc.sig_itmanager,pc.sig_hrmanager,pc.sig_plantmanager,pc.approuved,users.first_name,users.last_name,users.role FROM `pc` INNER JOIN users on pc.departement_id = users.departement WHERE pc.approuved = 0;",
      [
        req.params.role
  
      ],
      (error, data, fields) => {
        if (error) res.status(500).send(error);
        else res.status(200).json(data);
      }
    );
  } else if (role == "Manager") {
    connection.query(
      "SELECT PC.id,PC.nom,PC.prenom,PC.departement_id,PC.fonction,pc.motif,pc.appareil,pc.user_id,pc.sig_manager,pc.sig_itmanager,pc.sig_hrmanager,pc.sig_plantmanager,pc.approuved,users.first_name,users.last_name,users.role FROM `pc` INNER JOIN users on pc.departement_id = users.departement WHERE users.role = ? and pc.approuved = 0;",
      [
        req.params.role
  
      ],
      (error, data, fields) => {
        if (error) res.status(500).send(error);
        else res.status(200).json(data);
      }
    );
  }


};
const getPcProvisoireDemande = async (req, res, next) => {
  const role = req.params.role
  if (role == "HR Manager" || "IT Manager"||"Plant Manager") {
    
    connection.query(
      "select pcprovisoire.id,pcprovisoire.nom,pcprovisoire.prenom,pcprovisoire.departement_id,pcprovisoire.fonction,pcprovisoire.motif,pcprovisoire.du,pcprovisoire.jusqua,pcprovisoire.appareil,pcprovisoire.user_id,pcprovisoire.sig_manager,pcprovisoire.sig_itmanager,pcprovisoire.sig_hrmanager,pcprovisoire.sig_plantmanager,pcprovisoire.approuved,users.first_name,users.last_name,users.role FROM `pcprovisoire` INNER JOIN users on pcprovisoire.departement_id = users.departement WHERE pcprovisoire.approuved = 0;",
      [
        req.params.role
  
      ],
      (error, data, fields) => {
        if (error) res.status(500).send(error);
        else res.status(200).json(data);
      }
    );
  } else if (role == "Manager") {
    connection.query(
      "SELECT pcprovisoire.id,pcprovisoire.nom,pcprovisoire.prenom,pcprovisoire.departement_id,pcprovisoire.fonction,pcprovisoire.motif,pcprovisoire.appareil,pcprovisoire.du,pcprovisoire.jusqua,pcprovisoire.user_id,pcprovisoire.sig_manager,pcprovisoire.sig_itmanager,pcprovisoire.sig_hrmanager,pcprovisoire.sig_plantmanager,pcprovisoire.approuved,users.first_name,users.last_name,users.role FROM `pcprovisoire` INNER JOIN users on pcprovisoire.departement_id = users.departement WHERE users.role = ? and pcprovisoire.approuved = 0;",
      [
        req.params.role
  
      ],
      (error, data, fields) => {
        if (error) res.status(500).send(error);
        else res.status(200).json(data);
      }
    );
  }

 
};

const UpdateLigneInternetdemandes = async (req, res) => {
  const id = req.params.id
  const role = req.params.role 
  if (role == "Manager"){
    connection.query(
      "UPDATE `ligneinternet` SET `sig_manager`= 1 WHERE id = ?",
      [
          id
          
      ],
      (err, data, fields) => {
        if (err) res.status(500).send(err);
        else
          res.status(200).send({ msg: "Demande modifié avec succés" });
      }
    );

  } else if (role == "HR Manager"){
    connection.query(
      "UPDATE `ligneinternet` SET `sig_hrmanager`= 1 WHERE id = ?",
      [
          id
          
      ],
      (err, data, fields) => {
        if (err) res.status(500).send(err);
        else
          res.status(200).send({ msg: "Demande modifié avec succés" });
      }
    );

  } else if (role == "IT Manager"){
    connection.query(
      "UPDATE `ligneinternet` SET `sig_itmanager`= 1 WHERE id = ?",
      [
          id
          
      ],
      (err, data, fields) => {
        if (err) res.status(500).send(err);
        else
          res.status(200).send({ msg: "Demande modifié avec succés" });
      }
    );

  } else if (role == "Plant Manager"){
    connection.query(
      "UPDATE `ligneinternet` SET `sig_plantmanager`= 1 WHERE id = ?",
      [
          id
          
      ],
      (err, data, fields) => {
        if (err) res.status(500).send(err);
        else
          res.status(200).send({ msg: "Demande modifié avec succés" });
      }
    );

  }
 

};

const UpdatePcdemandes = async (req, res) => {
  const id = req.params.id
  const role = req.params.role 
  if (role == "Manager"){
    connection.query(
      "UPDATE `pc` SET `sig_manager`= 1 WHERE id = ?",
      [
          id
          
      ],
      (err, data, fields) => {
        if (err) res.status(500).send(err);
        else
          res.status(200).send({ msg: "Demande modifié avec succés" });
      }
    );

  } else if (role == "HR Manager"){
    connection.query(
      "UPDATE `pc` SET `sig_hrmanager`= 1 WHERE id = ?",
      [
          id
          
      ],
      (err, data, fields) => {
        if (err) res.status(500).send(err);
        else
          res.status(200).send({ msg: "Demande modifié avec succés" });
      }
    );

  } else if (role == "IT Manager"){
    connection.query(
      "UPDATE `pc` SET `sig_itmanager`= 1 WHERE id = ?",
      [
          id
          
      ],
      (err, data, fields) => {
        if (err) res.status(500).send(err);
        else
          res.status(200).send({ msg: "Demande modifié avec succés" });
      }
    );

  } else if (role == "Plant Manager"){
    connection.query(
      "UPDATE `pc` SET `sig_plantmanager`= 1 WHERE id = ?",
      [
          id
          
      ],
      (err, data, fields) => {
        if (err) res.status(500).send(err);
        else
          res.status(200).send({ msg: "Demande modifié avec succés" });
      }
    );

  }
 

};

const UpdatePcprovisoiredemandes = async (req, res) => {
  const id = req.params.id
  const role = req.params.role 
  if (role == "Manager"){
    connection.query(
      "UPDATE `pcprovisoire` SET `sig_manager`= 1 WHERE id = ?",
      [
          id
          
      ],
      (err, data, fields) => {
        if (err) res.status(500).send(err);
        else
          res.status(200).send({ msg: "Demande modifié avec succés" });
      }
    );

  } else if (role == "HR Manager"){
    connection.query(
      "UPDATE `pcprovisoire` SET `sig_hrmanager`= 1 WHERE id = ?",
      [
          id
          
      ],
      (err, data, fields) => {
        if (err) res.status(500).send(err);
        else
          res.status(200).send({ msg: "Demande modifié avec succés" });
      }
    );

  } else if (role == "IT Manager"){
    connection.query(
      "UPDATE `pcprovisoire` SET `sig_itmanager`= 1 WHERE id = ?",
      [
          id
          
      ],
      (err, data, fields) => {
        if (err) res.status(500).send(err);
        else
          res.status(200).send({ msg: "Demande modifié avec succés" });
      }
    );

  } else if (role == "Plant Manager"){
    connection.query(
      "UPDATE `pcprovisoire` SET `sig_plantmanager`= 1 WHERE id = ?",
      [
          id
          
      ],
      (err, data, fields) => {
        if (err) res.status(500).send(err);
        else
          res.status(200).send({ msg: "Demande modifié avec succés" });
      }
    );

  }
 

};

  module.exports = {
    getLigneInternetdemandes,
    getPcdemandes,
    getPcProvisoireDemande,
    UpdateLigneInternetdemandes,
    UpdatePcdemandes,
    UpdatePcprovisoiredemandes

};
