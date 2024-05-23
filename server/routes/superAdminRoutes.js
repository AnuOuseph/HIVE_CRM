const express = require("express");
const { SuperAdminRegister, superAdminLogin, } = require('../controllers/superAdminControllers');

const router = express.Router();

//leads
router.post('/createSuperAdmin', SuperAdminRegister);


module.exports = router;