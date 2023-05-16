const User = require('../Models/User');
const {findUserByProperty, createNewUser} = require('./user')

const registerService = ({name, email, password}) => {
    let user =  findUserByProperty('email', email)

    if(user) {
        const error = new Error('User already exist');
        error.status = 400;
        throw error;
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    user.password = hash;
    createNewUser({name, email, password: hash});
}

const loginService = ({email, password}) => {
    const user =  findUserByProperty('email', email)
       if(!user) {
        const error = new Error('Invalid credential');
        error.status = 400;
        throw error;
       }
       const isMatch = bcrypt.compare(password, user.password);

       if(!isMatch) {
        const error = new Error('Invalid credential');
        error.status = 400;
        throw error;
       }
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