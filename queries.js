const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'simon',
    host: 'localhost',
    database: 'api',
    password: 'simon',
    port: 5432


})

// GET — / | displayHome()
// GET — /users | getUsers()
// GET — /users/:id | getUserById()
// POST — users | createUser()
// PUT — /users/:id | updateUser()
// DELETE — /users/:id | deleteUser()

//get all users function
const getUsers = (req, res) => {
        pool.query('SELECT * FROM users ORDER BY id ASC')
            .then(results => res.status(201).json(results.rows))
            .catch(err => console.log(err));
    }
    //Get a user by id
const getUserById = (req, res) => {
        const id = parseInt(req.params.id)
        pool.query('SELECT * FROM users WHERE id = $1', [id])
            .then(results => res.status(201).json(results.rows))
            .catch(err => console.log(err));
    }
    //Create user
const createUser = (req, res) => {
        const { name, email } = req.body;

        pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email])
            .then(results => res.status(201).send({ success: `Inserted user with id ${results.insertId}` }))
            .catch(err => console.log(err));
    }
    //update users
const updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;
    pool.query('UPDATE users SET name= $1, email= $2 WHERE id= $3', [name, email, id])
        .then(results => res.status(201).send({ success: `Updated user with id ${id}` }))
        .catch(err => console.log(err));
}
const deleteUser = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query('DELETE FROM users WHERE id=$1', [id])
        .then(results => res.status(201).json({ success: `The user with id of ${id} deleted successfully` }))
        .catch(err => console.log(err));
}
module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}