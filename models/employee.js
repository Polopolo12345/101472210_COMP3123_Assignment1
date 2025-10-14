const mongoose = require('mongoose');


const empSchema = new mongoose.Schema(
    {
        first_name: { type: String, required: true, trim: true },
        last_name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, trim: true },
        position: { type: String, required: true },
        salary: { type: Number, required: true },
        date_of_joining: { type: Date, required: true },
        department: { type: String, required: true },
    }
);


module.exports = mongoose.model('Employee', empSchema);