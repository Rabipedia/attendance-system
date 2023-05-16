const User = require('../Models/User');
const {findUserByProperty, createNewUser} = require('./user');
const error = require('../Utils/error');

const registerService = ({name, email, password}) => {
    let user =  findUserByProperty('email', email)

    if(user) throw error('User already exist', 400); 

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    user.password = hash;
    createNewUser({name, email, password: hash});
}

const loginService = ({email, password}) => {
    const user =  findUserByProperty('email', email)
       if(!user) throw error('Invalid credential', 400);
       
       const isMatch = bcrypt.compare(password, user.password);

       if(!isMatch) throw error('Invalid credential', 400);
       
       const payload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        roles: user.roles,
        accountStatus: user.accountStatus
       }
       return jwt.sign(payload, 'secret-key', {expiresIn: '2h'})
}

module.exports = {
    registerService,
    loginService
}