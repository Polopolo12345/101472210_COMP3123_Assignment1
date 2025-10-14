const mongoose = require('mongoose');
const Employee = require('../models/employee');


exports.getAllEmployees = async (req, res) => {
    try {
        const emps = await Employee.find();
        const out = emps.map(e => ({
            employee_id: e._id,
            first_name: e.first_name,
            last_name: e.last_name,
            email: e.email,
            position: e.position,
            salary: e.salary,
            date_of_joining: e.date_of_joining,
            department: e.department,
        }));
        return res.status(200).json(out);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: false, message: 'Server error' });
    }
};


exports.createEmployee = async (req, res) => {
    try {
        const payload = req.body;
        const emp = await Employee.create(payload);
        return res.status(201).json({ message: 'Employee created successfully.', employee_id: emp._id });
    } catch (err) {
        console.error(err);
        if (err.code === 11000) return res.status(400).json({ status: false, message: 'Employee with this email already exists' });
        return res.status(500).json({ status: false, message: 'Server error' });
    }
};


exports.getEmployeeById = async (req, res) => {
    try {
        const { eid } = req.params;
        if (!mongoose.isValidObjectId(eid)) return res.status(400).json({ status: false, message: 'Invalid employee ID' });
        const e = await Employee.findById(eid).select('-__v -created_at -updated_at');
        if (!e) return res.status(404).json({ status: false, message: 'Employee not found' });
        return res.status(200).json({
            employee_id: e._id,
            first_name: e.first_name,
            last_name: e.last_name,
            email: e.email,
            position: e.position,
            salary: e.salary,
            date_of_joining: e.date_of_joining,
            department: e.department,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: false, message: 'Server error' });
    }
};


exports.updateEmployee = async (req, res) => {
    try {
        const { eid } = req.params;
        if (!mongoose.isValidObjectId(eid)) return res.status(400).json({ status: false, message: 'Invalid employee ID' });
        await Employee.findByIdAndUpdate(eid, req.body, { new: true });
        return res.status(200).json({ message: 'Employee details updated successfully.' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: false, message: 'Server error' });
    }
};


exports.deleteEmployee = async (req, res) => {
    try {
        const { eid } = req.query;
        if (!eid) return res.status(400).json({ status: false, message: 'Missing eid query parameter' });
        if (!mongoose.isValidObjectId(eid)) return res.status(400).json({ status: false, message: 'Invalid employee ID' });
        await Employee.findByIdAndDelete(eid);
        return res.status(204).send();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: false, message: 'Server error' });
    }
};