const connection = require("../util/database");

const getDepartements = async (req, res, next) => {
  connection.query(
    "Select * from departements;",
    (error, data, fields) => {
      if (error) res.status(500).send(error);
      else res.status(200).json(data);
    }
  );
};



const getDepartementlById = async (req, res, next) => {
  const id = req.params.id;
  connection.query(
    "SELECT * FROM `departements` WHERE id = ?",
    [id],
    (error, data, fields) => {
      if (error) res.status(500).send(error);
      else res.status(200).json(data);
    }
  );
};

const updateDepartement = async (req, res) => {

  const id = req.params.id;
  const dept = req.body.dept;
 
  connection.query(
    "UPDATE `departements` SET `dept`=? WHERE id = ?",
    [
        dept,
        id,
        
    ],
    (err, data, fields) => {
      if (err) res.status(500).send(err);
      else
        res.status(200).send({ msg: "Depatement modifié avec succés" });
    }
  );
};

const addDepartement = async (req, res) => {
  const dept = req.body.dept;


  connection.query(
    "INSERT INTO `departements`(`dept`  ) VALUES (?)",
    [
        dept,

    ],
    (err, data, fields) => {
      if (err) res.status(500).send(err);
      else {
        res.status(200).send({ msg: "Departement Ajouté avec succés" });
      }
    }
  );
};

const deleteDepartement = async (req, res) => {
  const id = req.params.id;
  connection.query(
    "DELETE FROM departements where id =?",
    [id],
    (err, data, fields) => {
      if (err) res.status(500).send(err);
      else res.status(200).send({ msg: "Departement  supprimé avec succées" });
    }
  );
};








module.exports = {
    getDepartements,
    getDepartementlById,
    updateDepartement,
    addDepartement,
    deleteDepartement,

};
