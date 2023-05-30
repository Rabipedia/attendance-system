const { Schema, model } = require('mongoose');

const studentAttendanceShcema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    adminAttendance: {
        type: Schema.Types.ObjectId,
        ref: 'AdminAttendance',
        required: true
    },
},
{ timestamps: true }
);

const studentAttendance = model('StudentAttendance', studentAttendanceShcema);

module.exports = studentAttendance;