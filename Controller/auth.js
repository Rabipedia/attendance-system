const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const { registerService, loginService } = require('../Service/auth');

const registerController = async (req, res, next) => {
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
        registerController({name, email, password});
        res.status(201).json({ message: 'User Created Successfully'}, user);
    }
    catch (e) {
        next(e);
 }
}

const loginController = async(req, res, next) => {
    const { name, email, password } = req.body;

    try{
       const token = await loginService({email, password});
       return res.status(200).json({ message: 'Login Successful', token });
    } catch(e){
        next(e)
    }

}

module.exports = {
    loginController,
    registerController
}