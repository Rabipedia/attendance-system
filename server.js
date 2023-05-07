const express = require('express');
const connectDB = require('./db');

const app = express();
app.use(express.json());


app.post('/register', (req, res) => {
    /**
     * Request Input Sources:
     *  - req Body
     *  - req Param
     *  - req Query
     *  - req Header
     *  - req Cookies
     */

})
app.get('/', (_, res) => {
    res.send('Thank you for your request')
});

connectDB('mongodb://localhost:27017/attendance-db')
    .then(() => {
        console.log('Database Connected');
        app.listen(4000, () => {
            console.log("I'm listening on port 4000")
        })
    }).catch((e) => console.log(e))

