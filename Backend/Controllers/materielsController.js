const connection = require("../util/database");

const getMateriels = async (req, res, next) => {
  connection.query(
    "Select users.first_name,users.last_name,materiels.id,materiels.asset,materiels.sub_asset,materiels.inv_method,materiels.date,materiels.sn,materiels.user_id,materiels.location,materiels.location,materiels.remarque,materiels.cc ,materiels.asset_description FROM `materiels` inner join users on materiels.user_id = users.id where materiels.scrape = 0;",
    (error, data, fields) => {
      if (error) res.status(500).send(error);
      else res.status(200).json(data);
    }
  );
};



const getMaterielById = async (req, res, next) => {
  const id = req.params.id;
  connection.query(
    "SELECT * FROM `materiels` WHERE id = ?",
    [id],
    (error, data, fields) => {
      if (error) res.status(500).send(error);
      else res.status(200).json(data);
    }
  );
};

const updateMateriel = async (req, res) => {

  const id = req.params.id;
  const asset = req.body.asset;
  const sub_asset = req.body.sub_asset;
  const inv_method = req.body.inv_method;
  const date = req.body.date;
  const sn = req.body.sn;
  const user_id = req.body.user_id;
  const location = req.body.location;
  const remarque = req.body.remarque;
  const cc = req.body.cc;
  const asset_description = req.body.asset_description
  connection.query(
    "UPDATE `materiels` SET `asset`=?,`sub_asset`=?,`inv_method`=?,`date`=?,`sn`=?,`user_id`=?,`location`=?,`remarque`=?,`cc`=? ,`asset_description`=?  WHERE id = ?",
    [
        asset,
        sub_asset,
        inv_method,
        date,
        sn,
        user_id,
        location,
        remarque,
        cc,
        asset_description,
        id,
        
    ],
    (err, data, fields) => {
      if (err) res.status(500).send(err);
      else
        res.status(200).send({ msg: "Materiel modifié avec succés" });
    }
  );
};

const addMateriel = async (req, res) => {

  const id = req.params.id;
  const asset = req.body.asset;
  const sub_asset = req.body.sub_asset;
  const inv_method = req.body.inv_method;
  const date = req.body.date;
  const sn = req.body.sn;
  const user_id = req.body.user_id;
  const location = req.body.location;
  const remarque = req.body.remarque;
  const cc = req.body.cc;
  const asset_description = req.body.asset_description

  connection.query(
    "INSERT INTO `materiels`(`asset`,`sub_asset`,`inv_method`,`date`,`sn`,`user_id`,`location`,`remarque` ,`cc`,`asset_description`  ) VALUES (?,?,?,?,?,?,?,?,?,?)",
    [
        asset,
        sub_asset,
        inv_method,
        date,
        sn,
        user_id,
        location,
        remarque,
        cc,
        asset_description
    ],
    (err, data, fields) => {
      if (err) res.status(500).send(err);
      else {
        res.status(200).send({ msg: "Materiel Ajouté avec succés" });
      }
    }
  );
};

const deleteMateriel = async (req, res) => {
  const id = req.params.id;
  connection.query(
    "DELETE FROM materiels where id =?",
    [id],
    (err, data, fields) => {
      if (err) res.status(500).send(err);
      else res.status(200).send({ msg: "materiel  supprimé avec succées" });
    }
  );
};

const updateScrape = async (req,res) =>{
  const id = req.params.id 
  connection.query("UPDATE `materiels` SET `scrape`= 1  WHERE id = ?",[id],
  (err,data)=>{
    if(err) res.status(500).send(err)
    else res.status(200).send({msg:"Materiel modifié avec succées"})
  })
}

const updateScrape2 = async (req,res) =>{
  const id = req.params.id 
  connection.query("UPDATE `materiels` SET `scrape`= 0  WHERE id = ?",[id],
  (err,data)=>{
    if(err) res.status(500).send(err)
    else res.status(200).send({msg:"Materiel modifié avec succées"})
  })
}
const getScrapeMateriels = async (req, res, next) => {
  connection.query(
    "Select users.first_name,users.last_name,materiels.id,materiels.asset,materiels.sub_asset,materiels.inv_method,materiels.date,materiels.sn,materiels.user_id,materiels.location,materiels.location,materiels.remarque,materiels.cc ,materiels.asset_description FROM `materiels` inner join users on materiels.user_id = users.id where materiels.scrape = 1;",
    (error, data, fields) => {
      if (error) res.status(500).send(error);
      else res.status(200).json(data);
    }
  );
};






module.exports = {
    getMateriels,
    getMaterielById,
    updateMateriel,
    addMateriel,
    deleteMateriel,
    updateScrape,
    updateScrape2,
    getScrapeMateriels
};
