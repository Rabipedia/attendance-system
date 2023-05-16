const User = require('../Models/User');

const findUserByProperty = (key, value) => {
    if(key === '_id'){
        return User.findById(value);
    }
    return User.findOne(value);
}

const createNewUser = ({name, email, password, accountStatus}) => {
    const user = new User({name, email, password});
    return user.save();
}

module.exports = {
    findUserByProperty,
    createNewUser
};