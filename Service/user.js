const User = require('../Models/User');
const error = require('../Utils/error');

const findUsers = () => {
    return User.find();
}

const findUserByProperty = (key, value) => {
    if(key === '_id'){
        return User.findById(value);
    }
    return User.findOne(value);
}

const createNewUser = ({name, email, password, roles, accountStatus}) => {
    const user = new User({
        name,
        email,
        password,
        roles: roles ? roles : ['STUDENT'],
        accountStatus: accountStatus ? accountStatus : ['PENDING']
    });
    return user.save();
}

const updateUser = async(id, data) => {
    const user = await findUserByProperty('email', data.email);
    if(user){
        throw error('User email already used', 400)
    }
    return User.findByIdAndUpdate(id, {...data}, {new: true})
}

module.exports = {
    findUsers,
    findUserByProperty,
    createNewUser,
    updateUser
};