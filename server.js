const express = require('express');
const connectDB = require('./db');
const { loginController, registerController } = require('./Controller/auth')
const authenticate = require('./Middleware/authenticate');
const routes = require('./Routes/index');
const error = require('./Utils/error');

const app = express();
app.use(express.json());
app.use(routes);


app.post('/register', registerController);

app.post('/login', loginController)

app.get('/private',authenticate, async(req, res) => {
    
    return res.status(200).json({ message: 'I am a private route'})
})

app.get('/public', (req, res) => {
    return res.status(200).json({ message: 'I am a public a route'})
})

app.get('/', (_, res) => {
    res.send('Thank you for your request')
});

app.use((err, req, res, next) => {
    const msg =  err.message ? err.message : 'Server error occured';
    const status =  err.status ? err.status : '500';

    res.status(status).json({ message });
})

connectDB('mongodb://localhost:27017/attendance-db').then(() => {
        
    console.log('Database Connected');
        app.listen(4000, () => {
            console.log("I'm listening on port 4000")
        })
    }).catch((e) => console.log(e))

