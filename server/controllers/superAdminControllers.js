const SuperAdmin = require("../models/superAdminModel");
const bcrypt = require("bcrypt");
const jwt = require(`jsonwebtoken`);

//super admin create
const SuperAdminRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingAdmin = await SuperAdmin.findOne({ email });
    if (existingAdmin) {
      return res.status(409).json({ message: "Admin already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newAdmin = new SuperAdmin({
      name,
      email,
      password: hashedPassword,
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

const superAdminLogin = async (req, res) => {
  try {
    const user = await SuperAdmin.findOne({ username: req.body.username });
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!user) {
      return res.status(400).send("The user not found");
    }

    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      const token = jwt.sign(
        {
          userId: user.id,
        },
        JWT_SECRET,
        { expiresIn: "4w" }
      );

      res.status(200).send({ user: user.username, status: true, token: token });
    } else {
      res.status(404).send("Password is Wrong!");
    }
  } catch (error) {
    res.status(500).send(error)
  }
};

module.exports = {
  SuperAdminRegister,
  superAdminLogin,
};