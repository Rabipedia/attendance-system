const AdminAttendance = require('../Models/AdminAttendance');
const error = require('../Utils/error');
const { addMinutes, isAfter } = require('date-fns');

const getEnable = async (req, res, next) => {
    try{
        const running = await AdminAttendance.findOne({ status: 'Running' });
        if(running){
            throw error('Already Running', 400);
        }
        const attendance = new AdminAttendance({});
        attendance.save();
        return res.status(200).json({message: 'Success', attendance});
    }catch(e){
        next(e);
    }
}

const getStatus = async (req, res, next) => {
    try{
        const running = await AdminAttendance.findOne({ status: 'Running' });
        if(!running){
            throw error('Not running', 400);
        }

        const started = addMinutes(new Date(running.createdAt), running.timelimit);

        if(isAfter(new Date(), started)){
            running.status = 'COMPLETED';
            await running.save();
        }
        return res.status(200).json(running);
    } catch(e){
        next(e)
    }
}

const getDisable = async(req, res, next) => {
    try{
        const running = await AdminAttendance.findOne({ status: 'Running' });
        if(!running){
            throw error('Not running', 400);
        }
        running.status = 'COMPLETED';
            await running.save();

        return res.status(200).json(running)
    }catch(e){
        next(e)
    }
 };


module.exports = {
    getEnable,
    getDisable
}