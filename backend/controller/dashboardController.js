const Admin = require('../models/Admin')
const Certificate = require('../models/Certificate')

const dashboard = async (req, res) => {
    const { name, iname } = req.body;
    try {
        const admin = await Admin.findOne({ name, iname });

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        const allAdminsFromInstitute = await Admin.find({ iname });

        const allAdminIds = allAdminsFromInstitute.map(admin => admin._id);

        const totalByInstitute = await Certificate.countDocuments({
            issuedBy: { $in: allAdminIds }
        });

        const totalByYou = await Certificate.countDocuments({
            issuedBy: admin._id
        });

        res.json({
            success: true, 
            data: {
                totalByInstitute,
                totalByYou
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

const search = async (req,res)=>{
    const {certificateID}=req.body
    try{
        const cer = await Certificate.findOne({certificateID});
        if(cer){
            // console.log(cer)
            res.status(200).json({success:true,valid:true,message:"Certificate Is Present", data:{
                studentName:cer.studentName,
                certificateId:cer.certificateID
            }})
        }else{
            // console.log(cer)
            res.status(400).json({success:true,valid:false,message:"Certificate is not present"});
        }
    }catch(err){
        console.log(err)
    }
}
module.exports = {dashboard, search} 