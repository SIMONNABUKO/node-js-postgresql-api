const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 4000;
const db = require('./queries');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
//home page
app.get('/', (req, res) => {
    res.status(201).json({ info: 'Your app is working fine' });
});
app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

app.listen(port, () => console.log(`Server running on port ${port}`));