const User = require('../Models/User');
const userService = require('../Service/user');
const authService = require('../Service/auth');
const error = require('../Utils/error');


const getUsers = async (req, res, next) => {
    try{
        const users = await userService.findUsers();
        return res.status(200).json(users)
    } catch (e) {
        next(e);
    }
};

const getUserById = async(req, res, next) => {
    const userId = req.params.userid;

    try {
        const user = await userService.findUserByProperty('_id', userId);
        if(!user) {
            throw error('User not found', 404);
        }
        return res.status(200).json(user);
    } catch(e) {
        next(e);
    }
};

const postUser = async(req, res, next) => {
    const {name, email, password, roles, accountStatus} = req.body;
    try{
        const user = await authService.registerService({
            name,
            email,
            password,
            roles,
            accountStatus
        })
        return res.status(201).json(user);
    }catch(e){
        next(e)
    }
};

const putUserById = async(req, res, next) => { 
    const {userId} = req.params;
    const {name, roles, email, accountStatus} = req.body;
    try{
        const user = await userService.updateUser(id, {name, roles, email, accountStatus});

        if(!user){
            throw error('User not found', 404)
        }
        return res.status(200).json(user);
    }catch(e){
        next(e);
    }
};

const patchUserById = async(req, res, next) => {
    const {userId} = req.params;
    const {name, roles, accountStatus} = req.body;
    try{
        const user = await userService.findUserByProperty('_id', userId);

        if(!user){
            throw error('User not found', 404)
        }

        user.name = name ?? user.name;
        user.roles = roles ?? user.roles;
        user.accountStatus = accountStatus ?? user.accountStatus;

        await user.save();
        return res.status(200).json(user);
    }catch(e){
        next(e);
    }

};

const deleteUser = async(req, res, next) => {
    const {userId} = req.params;

    try{
        const user = await userService.findUserByProperty('_id', userId);

        if(!user){
            throw error('User not found', 404)
        }
        await user.remove();
        return res.status(203).send();
    }catch(e){
        next(e);
    }
};

module.exports = {
    getUsers,
    getUserById,
    postUser,
    putUserById,
    patchUserById,
    deleteUser
}