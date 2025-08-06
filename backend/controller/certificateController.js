const Admin = require('../models/Admin')
const Certificate = require('../models/Certificate')
const { storeCertHashOnBlockchain, calcHash } = require('../utils/blockchain');
const axios = require('axios');

const uploadCertificate = async (req, res) => {
    try {
        const { studentName, course, issueDate, certificateID, issuedBy } = req.body
        console.log("req.body: ", req.body)
        // const dataToHash = `${studentName}-${course}-${issueDate}-${req.admin._id}`;
        const certHash=calcHash(studentName, course, issueDate)
        const {txId} = await storeCertHashOnBlockchain(certHash);

        const certificate = await Certificate.create({
            // studentName, course, issueDate, certificateID, issuedBy: "", certHash, txId: txId
            studentName, course, issueDate, issuedBy, certificateID, certHash, txId: txId
        })

        return res.status(200).json({ success: true, uploaded:true, message: "Certificate Uploaded on Blockchain and Database"})

    } catch (err) {
        console.log(err)
        return res.status(500).json({ success: false, uploaded:false, message: "Failed to upload certificate" });
    }
}


const verifyCertificate = async (req, res) => {
    const { studentName, course, issueDate, certificateID } = req.body

    try {
        const cert = await Certificate.findOne({ certificateID });
        if (!cert)
            return res.status(200).json({message: "Invalid Certificate" });
        const txId = cert.txId

        const response = await axios.get(
            `https://api.tatum.io/v3/record?chain=MATIC&id=${txId}`,
            {
                headers: {
                    'x-api-key': process.env.REACT_APP_TATUM_API_KEY,
                    'accept': 'application/json'
                }
            }
        )

        const hashVal = response.data.data
        const certHash=calcHash(studentName, course, issueDate)

        if (hashVal === certHash) {
            const _id=cert.issuedBy
            const admin = await Admin.findOne({_id})
            console.log("Admin info: ",admin)
            return res.status(200).json({
                valid:true,
                message: "Valid Certificate", 
                details: {
                    studentName: cert.studentName,
                    issueDate: cert.issueDate,
                    issuedBy: admin.name,
                    issuedFrom:admin.iname
                }
            })
        }
        else{
            res.status(200).json({
                valid:false,
                message: "Duplicate Certificate",
                details: {
                    studentName: cert.studentName,
                    issueDate: cert.issueDate,
                    issuedBy: cert.issuedBy.iname
                }
            })
        }
    } catch (err) {
        console.log("Error Occured: ", err)
        return res.status(500).json({message:"Error Occured"});
    }
}

module.exports = { uploadCertificate, verifyCertificate }