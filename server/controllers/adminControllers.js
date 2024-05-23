const Admin = require('../models/adminModel')
const bcrypt = require("bcrypt");
const jwt = require(`jsonwebtoken`);


//admin create
const AdminRegister = async (req, res) => {
    try {
      const { name, email, password ,designation, admin} = req.body;
      const existingAdmin = await Admin.findOne({ email });
      if (existingAdmin) {
        return res.status(409).json({ message: "Admin already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newAdmin = new Admin({
        name,
        email,
        password: hashedPassword,
        designation,
        admin,
      });
  
      const savedAdmin = await newAdmin.save();
  
      res
        .status(201)
        .json({ message: "Admin registered successfully", user: savedAdmin });
    } catch (error) {
      console.error("Error during registration:", error);
      res.status(500).json({ message: "Registration failed", error });
    }
  };

  //get all admins
  const getAllAdmins = async (req, res) => {
    try {
      const admins = await Admin.find();
      return res.status(201)
                .json({ message: "All Admins", admins: admins });
    } catch (error) {
      res.json(error);
    }
  };

  //get a single admin by ID
    const getAdminById = async (req, res) => {
        const adminId = req.params.id;
        try {
            const admin = await Admin.findById(adminId);
            if(!admin) {
                return res.status(404).json({ error: 'Admin not found '});
            }
            res.status(201).json({ success:true, admin});
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error retrieving admin', error: error.message});
        }
    };

  //update admin
  const updateAdmin = async (req, res) => {
    try {
      const adminId = req.params.id;
      const admin = await Admin.findByIdAndUpdate(adminId, req.body, { new: true });
      if (!admin) {
        return res.status(404).json({ success:false, message: "Admin not found" });
      }
      res.status(200).json({ success:true, message: "Admin updated successfully", admin: admin });
    } catch (error) {
      res.status(500).json({ success:false, message: "Update failed", error: error.message });
    }
  };

  //delete admin
  const deleteAdmin = async (req, res) => {
    const adminId = req.params.id;
    try {
      const deletedAdmin = await Admin.findByIdAndDelete(adminId);
      if(!deletedAdmin) {
        return res.status(404).json({ success:false, message: `Cannot find by any admin with ID ${adminId}` });
      }
      res.status(201).json({ success: true, message: "Admin Deleted Successfully", deletedAdmin});
    } catch(error) {
        res.status(500).json({ message: 'Error deleting admin', error: error.message });  
    }
  };

  
  

  module.exports = {
    AdminRegister,
    getAllAdmins,
    getAdminById,
    updateAdmin,
    deleteAdmin
  };