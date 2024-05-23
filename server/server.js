const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const app = express();
const cookieParser = require('cookie-parser')
const adminRouter = require('./routes/adminRoutes');
const superadminRoute = require('./routes/superAdminRoutes');
const cors = require('cors');

dotenv.config();
connectDB();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/admin',adminRouter);
app.use("/api/superadmin", superadminRoute);

app.use((req, res) => {
    res.status(404).send({ code: 404, error: 'Not Found' });
});


const PORT = process.env.PORT || 7000;

app.listen(PORT, console.log(`Server running at ${PORT}`));