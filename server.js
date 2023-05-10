const express = require('express');
const connectDB = require('./db');
const bcrypt = require('bcrypt');
const User = require('./Models/User'); 

const app = express();
app.use(express.json());


app.post('/register', async (req, res) => {
    /**
     * Request Input Sources:
     *  - req Body
     *  - req Param
     *  - req Query
     *  - req Header
     *  - req Cookies
     */

    const { name, email, password } = req.body;

    if(!name || !email || !password) {
        return res.status(400).json({mess: 'Invalid Data'});
    }

    let user = await User.findOne({ email });

    if(user) {
        return res.status(400).json({ message: 'User already exist' });
    }

    user = new User({name, email, password});

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    user.password = hash;

    await user.save();

    res.status(201).json({ message: 'User Created Successfully'});
})

app.get('/', (_, res) => {
    res.send('Thank you for your request')
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ message: 'Server error occured'});
})

connectDB('mongodb://localhost:27017/attendance-db')
    .then(() => {
        console.log('Database Connected');
        app.listen(4000, () => {
            console.log("I'm listening on port 4000")
        })
    }).catch((e) => console.log(e))

