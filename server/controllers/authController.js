const Admin = require("../models/adminModel");
const bcrypt = require("bcrypt");
const jwt = require(`jsonwebtoken`);

// admin login
const adminLogin = async (req, res) => {
  try {
    const admin = await Admin.findOne({ email: req.body.email });
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!admin) {
      return res.status(400).send("Admin not found");
    }

    if (admin && bcrypt.compareSync(req.body.password, admin.password)) {
      const token = jwt.sign(
        {
          adminId: admin._id,
        },
        JWT_SECRET,
        { expiresIn: "4w" }
      );

      res.status(200).send({ email: admin.email, status: true, token: token, admin: admin.admin, name: admin.name, adminId: admin._id });
    } else {
      res.status(404).send("Password is Wrong!");
    }
  } catch (error) {
    res.status(500).send(error)
  }
};

module.exports = {
  adminLogin,
};