const connection = require("../util/database");

const getRoles = async (req, res, next) => {
    connection.query(
        "SELECT * from roles",
        (error, data, fields) => {
            if (error) res.status(500).send(error);
            else res.status(200).json(data);
        }
    );
};



const getRolelById = async (req, res, next) => {
    const id = req.params.id;
    connection.query(
        "SELECT * FROM `roles` WHERE id = ?",
        [id],
        (error, data, fields) => {
            if (error) res.status(500).send(error);
            else res.status(200).json(data);
        }
    );
};

const updateRole = async (req, res) => {

    const id = req.params.id;
    const role = req.body.role;

    connection.query(
        "UPDATE `roles` SET `role`=? WHERE id = ?",
        [
            role,
            id,

        ],
        (err, data, fields) => {
            if (err) res.status(500).send(err);
            else
                res.status(200).send({ msg: "Role modifié avec succés" });
        }
    );
};

const addRole = async (req, res) => {
    const role = req.body.role;
    connection.query(
        "INSERT INTO `roles`(`role`) VALUES (?)",
        [
            role,

        ],
        (err, data, fields) => {
            if (err) res.status(500).send(err);
            else {
                res.status(200).send({ msg: "Role Ajouté avec succés" });
            }
        }
    );
};

const deleteRole = async (req, res) => {
    const id = req.params.id;
    connection.query(
        "DELETE FROM roles where id =?",
        [id],
        (err, data, fields) => {
            if (err) res.status(500).send(err);
            else res.status(200).send({ msg: "Role  supprimé avec succées" });
        }
    );
};








module.exports = {
    getRoles,
    getRolelById,
    updateRole,
    addRole,
    deleteRole,

};
