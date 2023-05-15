const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');

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
}

const loginController = async(req, res, next) => {
    const { name, email, password } = req.body;

    try{
       const user = await User.findOne({email});
       if(!user) {
        return res.status(400).json({ message
        : 'Invalid credential' });
       }
       const isMatch = bcrypt.compare(password, user.password);

       if(!isMatch) {
        return res.status(400).json({ message: 'Invalid Credential' });
       }
       delete user._doc.password;
       const token = jwt.sign(user._doc, 'secret-key', {expiresIn: '2h'})
       return res.status(200).json({ message: 'Login Successful', token });
    } catch(e){
        next(e)
    }

}

module.exports = {
    loginController,
    registerController
}