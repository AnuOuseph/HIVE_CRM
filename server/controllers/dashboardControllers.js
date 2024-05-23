const Lead = require("../models/leadModel");

//count leads
const NumOfLeads = async (startDate, endDate) => {
    const totalLeads = await Lead.aggregate([
        {
            $match: {
                createdAt: { $gte: startDate, $lte: endDate },
            },
        },
        {
            $group: {
                _id: null,
                total: { $sum: 1 }, // Count the number of documents
            },
        },
    ]);

    return totalLeads;
};

//lead analysis
const totalLeads = async (req, res) => {
    const stageArray = ['T8','T9','T10','T11','T12','T13','T14','T15','T16','T17','T18','T19'];
    const degradArray = ['T1','T2']
    try {
        const totalLeadCount = await Lead.countDocuments()
        const hotLeadCount = await Lead.countDocuments({ leadStatus: 'Hot' })
        const coldLeadCount = await Lead.countDocuments({ leadStatus: 'Cold' })
        const warmLeadCount = await Lead.countDocuments({ leadStatus: 'Warm' })
        const enrolledLeadCount = await Lead.countDocuments({ leadStatus: 'Enrolled' })
        const conversionCount = await Lead.countDocuments({leadStage: {$in:stageArray} })
        const degradCount = await Lead.countDocuments({ leadStage: {$in:degradArray} })
        const upgradCount = await Lead.countDocuments({ leadStage: {$nin:degradArray} })
        const perConvert = ((conversionCount/totalLeadCount)*100).toFixed(1);
        const perUpgrad = ((upgradCount/totalLeadCount)*100).toFixed(1);
        const perDegrad = ((degradCount/totalLeadCount)*100).toFixed(1);
        res.json({ totalLeadCount, hotLeadCount, warmLeadCount, coldLeadCount, enrolledLeadCount,perConvert,perUpgrad,perDegrad })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching total leads', error: error.message });
    }
}

//lead source
const leadSource = async (req, res) => {
    try {
        const inLeadCount = await Lead.countDocuments({ leadSource: 'linkedin' })
        const fbLeadCount = await Lead.countDocuments({ leadSource: 'facebook' })
        const igLeadCount = await Lead.countDocuments({ leadSource: 'instagram' })
        const evLeadCount = await Lead.countDocuments({ leadSource: 'events' })
        const rbfLeadCount = await Lead.countDocuments({ leadSource: 'referalbyFriend' })
        const rbaLeadCount = await Lead.countDocuments({ leadSource: 'referalbyAlumni' })
        const rbbLeadCount = await Lead.countDocuments({ leadSource: 'referalbyBA' })
        res.json({ inLeadCount,fbLeadCount,igLeadCount,evLeadCount,rbfLeadCount,rbaLeadCount,rbbLeadCount })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching lead source', error: error.message });
    }
}

//leads today
const totalLeadsToday = async (req, res) => {
    try {
        const today = new Date()
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth();
        const currentDay = today.getDate();

        const startDate = new Date(currentYear, currentMonth, currentDay, 0, 0, 0);
        const endDate = new Date(currentYear, currentMonth, currentDay, 23, 59, 59);

        const totalLeads = await NumOfLeads(startDate, endDate)
        const totalNumberOfLead = totalLeads.length > 0 ? totalLeads[0].total : 0;

        res.json({ totalLeadToday: totalNumberOfLead });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching total leads today', error: error.message });
    }
}

//leads this week
const totalLeadsThisWeek = async (req, res) => {
    try {
        const today = new Date();
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth();
        const currentDay = today.getDate();
        const currentDayOfWeek = today.getDay();

        const startDate = new Date(currentYear, currentMonth, currentDay - currentDayOfWeek, 0, 0, 0);
        const endDate = new Date(currentYear, currentMonth, currentDay + (6 - currentDayOfWeek), 23, 59, 59);

        const totalLeads = await NumOfLeads(startDate, endDate);
        const totalNumberOfLeads = totalLeads.length > 0 ? totalLeads[0].total : 0;

        res.json({ totalLeadsThisWeek: totalNumberOfLeads });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching total leads this week', error: error.message });
    }
};

//leads this month
const totalLeadsThisMonth = async (req, res) => {
    try {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        const startDate = new Date(year, month, 1, 0, 0, 0);
        const endDate = new Date(year, month + 1, 0, 23, 59, 59);

        const totalLeads = await NumOfLeads(startDate, endDate)
        const totalLeadsThisMonth = totalLeads.length > 0 ? totalLeads[0].total : 0;

        res.json({ totalLeadsThisMonth: totalLeadsThisMonth });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching total investment this month', error: error.message });
    }
}

//leads per month
const leadsPerMonth = async (req, res) => {
    try {
        const totalLeadsPerMonth = await Lead.aggregate([
            {
                $group: {
                    _id: {
                        year: { $year: '$createdAt' },
                        month: { $month: '$createdAt' },
                    },
                    total: { $sum: 1 },
                },
            },
            {
                $sort: {
                    '_id.year': 1,
                    '_id.month': 1,
                },
            },
        ]);

        res.json({ totalLeadsPerMonth });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching leads per month',
            error: error.message,
        });
    }
};

//leads per stages
const leadsPerStage = async (req, res) => {
    try {
        const pipeline = [
            {
                $group: {
                    _id: '$leadStage',
                    count: { $sum: 1 }
                }
            }
        ];
        const result = await Lead.aggregate(pipeline);
        res.json({result});
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching leads per stage',
            error: error.message,
        });
    }
};

//lead per admin
const totalLeadsPerAdmin = async (req, res) => {
    const stageArray = ['T8','T9','T10','T11','T12','T13','T14','T15','T16','T17','T18','T19'];
    const degradArray = ['T1','T2']
    const id = req.params.id
    try {
        const totalLeadCount = await Lead.countDocuments({leadAssigned:id})
        const hotLeadCount = await Lead.countDocuments({ leadAssigned:id,leadStatus: 'Hot' })
        const coldLeadCount = await Lead.countDocuments({ leadAssigned:id,leadStatus: 'Cold' })
        const warmLeadCount = await Lead.countDocuments({ leadAssigned:id,leadStatus: 'Warm' })
        const enrolledLeadCount = await Lead.countDocuments({ leadAssigned:id,leadStatus: 'Enrolled' })
        const conversionCount = await Lead.countDocuments({ leadAssigned:id,leadStage: {$in:stageArray} })
        const degradCount = await Lead.countDocuments({ leadAssigned:id,leadStage: {$in:degradArray} })
        const upgradCount = await Lead.countDocuments({ leadAssigned:id,leadStage: {$nin:degradArray} })
        const perConvert = ((conversionCount/totalLeadCount)*100).toFixed(1);
        const perUpgrad = ((upgradCount/totalLeadCount)*100).toFixed(1);
        const perDegrad = ((degradCount/totalLeadCount)*100).toFixed(1);
        res.json({ totalLeadCount, hotLeadCount, warmLeadCount, coldLeadCount, enrolledLeadCount, perConvert,perDegrad,perUpgrad })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching total leads', error: error.message });
    }
}

//get all leads per admin
const getAllLeadsPerAdmin = async(req, res) => {
    const id = req.params.id
    console.log("leads",id)
    try {
        const searchQuery = req.query.query;
        if (searchQuery !== null && searchQuery !== undefined) {
          // Implement your MongoDB query for searching
          const searchCriteria = {
            $or: [
              { firstName: { $regex: new RegExp(searchQuery, 'i') } },
              { leadStage: { $regex: new RegExp(searchQuery, 'i') } },
              { leadStatus: { $regex: new RegExp(searchQuery, 'i') } },
            ],
          };
          
          const leads = await Lead.find({ leadAssigned: id }, searchCriteria);
          console.log(leads)
          res.json({success: true, leads: leads });
        } else {
          // Fetch all documents if searchQuery is not provided
          const allLeads = await Lead.find({leadAssigned:id});
          console.log(allLeads)
          res.json({ success: true,leads: allLeads });
        }
    // try {
    //     const leads = await Lead.find({leadAssigned:id});
    //     res.status(201).json({ success: true, leads });
    } catch(error) {
        res.status(500).json({ success: false, message: 'Error retrieving leads', error: error.message });
    }
};


module.exports = { 
    totalLeads,
    totalLeadsToday,
    totalLeadsThisWeek,
    totalLeadsThisMonth,
    leadsPerMonth,
    leadsPerStage,
    leadSource,
    totalLeadsPerAdmin,
    getAllLeadsPerAdmin,
};