const { addMinutes, isAfter } = require('date-fns');
const StudentAttendance = require('../Models/StudentAttendance');
const AdminAttendance = require('../Models/AdminAttendance');
const error = require('../Utils/error');

const getAttendance = async(req, res, next) => {
    const { id } = req.params;
    
    try{
        const adminAttendance = await AdminAttendance.findById(id);

        if(!adminAttendance){
            throw error('Invalid Attendance ID', 400);
        }

        if(adminAttendance.status === 'COMPLETED'){
            throw error('Attendance Completed', 400);
        }
        let attendance = await StudentAttendance.findById({
            adminAttendance: id,
            user: req.user._id
        })

        attendance = new StudentAttendance({
            user: req.user._id,
            adminAttendance: id
        })

        await attendance.save();

        return res.status(203).send();
    }catch(e){
        next(e)
    }
};

const getAttendanceStatus = async(req, res, next) => {
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
    
};

module.exports = {
    getAttendance,
    getAttendanceStatus
}