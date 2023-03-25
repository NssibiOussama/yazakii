const connection = require("../util/database");

const getUsers = async (req, res, next) => {
  connection.query(
"SELECT * FROM `users`;",    (error, data, fields) => {
      if (error) res.status(500).send(error);
      else res.status(200).json(data);
    }
  );
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  connection.query(
    "DELETE FROM users where id =?",
    [id],
    (err, data, fields) => {
      if (err) res.status(500).send(err);
      else res.status(200).send({ msg: "User  supprimé avec succées" });
    }
  );
};

const updateUsers = async (req, res) => {

  const id = req.params.id;
 
  connection.query(
    "UPDATE `users` SET `first_name`=?,`last_name`=?,`email`=?,`role`=? WHERE `id`=?",
    [
        req.body.firstname,
        req.body.lastname,
        req.body.email,
        req.body.role,
        id,
      
    ],
    (err, data, fields) => {
      if (err) res.status(500).send(err);
      else
        res.status(200).send({ msg: "User modifié avec succés" });
    }
  );
};

const getUserById = async (req, res, next) => {
  const id = req.params.id;
  connection.query(
    "SELECT * FROM `users` WHERE id = ?",
    [id],
    (error, data, fields) => {
      if (error) res.status(500).send(error);
      else res.status(200).json(data);
    }
  );
};








module.exports = {
    getUsers,
    deleteUser,
    updateUsers,
    getUserById
   
};
