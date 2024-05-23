const express = require("express");
const { createLead, getAllLeads, getLeadById, updateLead, deleteLead, uploadExcel } = require('../controllers/leadControllers');
const { getAllAdmins, AdminRegister, updateAdmin, deleteAdmin, getAdminById } = require("../controllers/adminControllers");
const { totalLeads, totalLeadsToday, totalLeadsThisWeek, totalLeadsThisMonth, leadsPerMonth, leadsPerStage, leadSource, totalLeadsPerAdmin, getAllLeadsPerAdmin } = require("../controllers/dashboardControllers");
const { adminLogin } = require("../controllers/authController");
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });


const router = express.Router();

//leads
router.post('/createLead', createLead);
router.get('/getAllLeads', getAllLeads);
router.get('/getLeadById/:id', getLeadById);
router.patch('/updateLead/:id', updateLead);
router.delete('/deleteLead/:id', deleteLead);
router.post('/excel',upload.single('file'), uploadExcel)

//admins
router.post('/createAdmin', AdminRegister);
router.get('/getAllAdmins',getAllAdmins)
router.get('/getAdminById/:id',getAdminById)
router.patch('/updateAdmin/:id',updateAdmin)
router.delete('/deleteAdmin/:id',deleteAdmin)

//dashboard
router.get('/totalLeads',totalLeads)
router.get('/totalLeadsToday',totalLeadsToday)
router.get('/totalLeadsThisWeek',totalLeadsThisWeek)
router.get('/totalLeadsThisMonth',totalLeadsThisMonth)
router.get('/leadsPerMonth',leadsPerMonth)
router.get('/leadsPerStage',leadsPerStage)
router.get('/leadSource',leadSource)

//dashboard admin
router.get('/totalLeadsPerAdmin/:id',totalLeadsPerAdmin)
router.get('/getAllLeadsPerAdmin/:id', getAllLeadsPerAdmin);

//authentication
router.post('/login',adminLogin)

module.exports = router;