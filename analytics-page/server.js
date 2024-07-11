const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());

// Replace <username> and <password> with your actual MongoDB Atlas username and password
const mongoURI = 'mongodb+srv://dongTS:TS123%40@dongts.hx7yxbh.mongodb.net/TS_database?retryWrites=true&w=majority&appName=DongTS';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB Atlas');
}).catch((error) => {
    console.error('Error connecting to MongoDB Atlas', error);
});

const TodoSchema = new mongoose.Schema({
    name: String,
    email: String
});

const TodoModel = mongoose.model('Todo', TodoSchema, 'todos');

app.get('/data', async (req, res) => {
    try {
        const data = await TodoModel.find();
        console.log(data)
        res.json(data);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
