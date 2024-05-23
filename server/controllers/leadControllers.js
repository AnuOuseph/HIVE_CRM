const Lead = require("../models/leadModel");
const exceljs = require('exceljs');
const { leadSource } = require("./dashboardControllers");

//create new lead
const createLead = async(req, res) => {
    try {
        const newLead = new Lead(req.body);
        const savedLead = await newLead.save();
        res.status(201).json({success: true, message: 'Lead added successfully', savedLead});
    } catch (error) {
        console.log("errr",error)
        res.status(500).json({ success: false, message: 'Error creating lead', error: error });
    }
};

//get all leads
const getAllLeads = async(req, res) => {
    try {
      const searchQuery = req.query.query;
      if (searchQuery !== null && searchQuery !== undefined) {
        // Implement your MongoDB query for searching
        const leads = await Lead.find({
          $or: [
            { name: { $regex: new RegExp(searchQuery, 'i') } },
            { firstName: { $regex: new RegExp(searchQuery, 'i') } },
            { leadStage: { $regex: new RegExp(searchQuery, 'i') } },
            { leadStatus: { $regex: new RegExp(searchQuery, 'i') } },
          ],
        });
        console.log(leads)
        res.json({success: true, leads: leads });
      } else {
        // Fetch all documents if searchQuery is not provided
        const allLeads = await Lead.find();
        console.log(allLeads)
        res.json({ success: true,leads: allLeads });
      }
        
        // const leads = await Lead.find();
        // res.status(201).json({ success: true, leads });
    } catch(error) {
        res.status(500).json({ success: false, message: 'Error retrieving leads', error: error.message });
    }
};

//get a single lead by ID
const getLeadById = async (req, res) => {
    const leadId = req.params.id;
    try {
        const lead = await Lead.findById(leadId);
        if(!lead) {
            return res.status(404).json({ error: 'Lead not found '});
        }
        res.status(201).json({ success:true, lead});
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error retrieving lead', error: error.message});
    }
};

//update a lead by id
const updateLead = async (req, res) => {
    const leadId = req.params.id;
    try {
        const updatedLead = await Lead.findByIdAndUpdate(leadId, req.body, { new: true });
        if(!updatedLead) {
            return res.status(404).json({ error: 'Lead not found' });
        }
        res.status(201).json({ success: true, message:' Lead updated successfully', updatedLead});
    } catch (error) {
        res.status(500).json({ success:false, message: 'Error updating lead', error: error.message });
    }
};

//Delete a lead by ID 
const deleteLead= async (req, res) => {
    const leadId = req.params.id;
    try {
        const deletedLead = await Lead.findByIdAndDelete(leadId);
        if(!deletedLead) {
            return res.status(404).json({ message: `Cannot find by any lead with ID ${leadId}` });
        }
        res.status(201).json({ success: true, message: "Lead Deleted Successfully", deletedLead});
    } catch (error) {
        res.status(500).json({ message: 'Error deleting lead', error: error.message });
    }
};

//bulk upload 
const uploadExcel = async (req, res) => {
    const workbook = new exceljs.Workbook();
    const excelBuffer = req.file.buffer;
  
    try {
  
      await workbook.xlsx.load(excelBuffer);
      workbook.eachSheet(async (worksheet) => {
  
        const headers = worksheet.getRow(1).values;
        worksheet.eachRow(async (row, rowNumber) => {
  
          if (rowNumber === 1) {
            return;
          }
  
          const studentData = {};
          headers.forEach((header, colIndex) => {
  
            if (colIndex === 0) {
              return;
            }
  
            const cellValue = row.getCell(colIndex).value;
            switch (header) {
              case 'firstName':
                studentData.firstName = cellValue;
                break;
              case 'number':
                studentData.number = !isNaN(cellValue) ? parseFloat(cellValue) : cellValue;
                break;
              case 'highestEducation':
                studentData.highestEducation = cellValue;
                break;
              case 'country':
                studentData.country = cellValue;
                break;
              case 'email':
                studentData.email = cellValue;
                break;
              case 'comments':
                studentData.comments = cellValue;
                break;
              case 'status':
                studentData.status = cellValue;
                break;
              default:
                studentData[header.toLowerCase()] = cellValue;
                break;
            }
          });
  
          if (studentData.firstName && studentData.number) {
            const existingStudent = await Lead.findOne({ $or: [{ number: studentData.number }, { firstName: studentData.firstName }] });
            if (!existingStudent) {
              console.log(`Inserting data into the database. Data:`, studentData);
              await Lead.create(studentData);
            } else {
              console.log(`Skipping data with number ${studentData.number} and email ${studentData.firstName} as it already exists in the database.`);
            }
          }else{
            console.log(`Skipping row ${rowNumber} as name, number, or email is empty.`);
            return;
          }
        });
      });
  
      res.json({ message: 'Data successfully uploaded to the database.' });
    } catch (error) {
      console.error('Error saving to MongoDB:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

module.exports = { 
    createLead, 
    getAllLeads, 
    getLeadById, 
    updateLead, 
    deleteLead,
    uploadExcel
};