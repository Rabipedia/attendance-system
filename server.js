const express = require('express');
const connectDB = require('./db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./Models/User'); 

const app = express();
app.use(express.json());


app.post('/register', async (req, res, next) => {
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

    try {
        let user = await User.findOne({ email });

    if(user) {
        return res.status(400).json({ message: 'User already exist' });
    }

    user = new User({name, email, password});

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    user.password = hash;

    await user.save();

    res.status(201).json({ message: 'User Created Successfully'}, user);
    }
    catch (e) {
        next(e);
    }
});

app.post('/login', async(req, res, next) => {
    const { name, email, password } = req.body;

    try{
       const user = await User.findOne({email});
       if(!user) {
        return res.status(400).json({ message
        : 'Invalid credential' });
       }
       const isMatch = bcrypt.compare(password, user.password);

       if(!isMatch) {
        return res.status
        (400).json({ message: 'Invalid Credential' });
       }

       delete user._doc.password;
       const token = jwt.sign(user._doc, 'secret-key', {expiresIn: '2h'})
       return res.status(200).json({ message: 'Login Successful', token });
    }

})

app.get('/private', async(req, res) => {
    let token = req.headers.authorization;
    if(!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try{
        token = token.split(' ')[1];
        const decoded = jwt.verify(token, 'secret-key');
        const user = await User.findById(decoded._id);
        if(!user){
            return res.status(401).json({ message: 'Unauthorized' })
        }
        return res.status(200).json({ message: 'I am a private route'})
    } catch(e){
        res.status(400).json({ message: 'Invalid token'})
    }
})

app.get('/public', (req, res) => {
    return res.status(200).json({ message: 'I am a public a route'})
})

app.get('/', (_, res) => {
    res.send('Thank you for your request')
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ message: 'Server error occured'});
})

connectDB('mongodb://localhost:27017/attendance-db').then(() => {
        
    console.log('Database Connected');
        app.listen(4000, () => {
            console.log("I'm listening on port 4000")
        })
    }).catch((e) => console.log(e))

