const express = require('express');
const Admin = require('../../module/adminSchema.js');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Router = express.Router();

// Signup admin
Router.post('/adminsignup', async (req, res) => {
    try {
        const { name, email, role, password } = req.body;
        if (!name || !email || !role || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Check if admin with the given email already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ error: "Admin with this email already exists" });
        }

        const hashedPassword = bcryptjs.hashSync(password, 10);

        // Create and save a new admin
        const newAdmin = await Admin.create({ name, email, role, password: hashedPassword });

        const data = {
            admin: { id: newAdmin._id }
        };

        const adminToken = jwt.sign(data, "harshadmin");

        res.status(201).json({ 
            message: "Admin created successfully", 
            admin: {
                name: newAdmin.name, 
                email: newAdmin.email, 
                role: newAdmin.role 
            }, 
            adminAuth: adminToken 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Signin admin
Router.post('/adminLogin', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Check if admin with the given email exists
        const existingAdmin = await Admin.findOne({ email });
        if (!existingAdmin) {
            return res.status(400).json({ error: "Admin not exist" });
        }

        const isPasswordMatch = bcryptjs.compareSync(password, existingAdmin.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ error: "Password not match" });
        }

        const data = {
            admin: { id: existingAdmin._id }
        };

        const adminToken = jwt.sign(data, "harshadmin");

        res.status(200).json({ 
            message: "Admin logged in successfully", 
            admin: {
                name: existingAdmin.name, 
                email: existingAdmin.email, 
                role: existingAdmin.role 
            }, 
            adminAuth: adminToken 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = Router;
