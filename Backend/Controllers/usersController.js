const connection = require("../util/database");

const getUsers = async (req, res, next) => {
  connection.query(
"SELECT * FROM `users`;",    (error, data, fields) => {
      if (error) res.status(500).send(error);
      else res.status(200).json(data);
    }
  );
};








module.exports = {
    getUsers,
   
};
