const Admin = require('../models/Admin')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const registerAdmin = async (req, res) => {
    try{
        const { name, iname, iemail, employeeid, plan, password } = req.body
        const existing = await Admin.findOne({ iemail });
        if (existing)
            return res.status(400).json({ message: "Admin Already Exits" });

        const hashedPassword = await bcrypt.hash(password, 10)
    
        const admin = await Admin.create({
            name, iname, iemail, employeeid, plan, password: hashedPassword
        })
    
        const token = jwt.sign({ id: admin._id }, process.env.REACT_APP_JWT_SECRET, { expiresIn: "7D" })
        console.log(req.body)
        return res.status(201).json({
            success: true,
            token,
            user: {
                name: admin.name, iname: admin.iname, id:admin._id
            }
        })
    }catch(err){
        console.log(err)
    }
}

const loginAdmin = async (req,res) => {
    try{
        const {iemail, password} = req.body
        const user = await Admin.findOne({iemail});
        if(!user)
            return res.status(404).json({message:"User Not Found"})

        const isMatch = await bcrypt.compare(password, user.password)
        
        if(!isMatch)
            return res.status(400).json({success:false,message:"invalid credentials"})

        const token = jwt.sign({id:user._id}, process.env.REACT_APP_JWT_SECRET,{expiresIn:"7D"})
        return res.json({
            success: true,
            token,
            user: {
                name: user.name, iname: user.iname,id:user._id
            }
        })
    }catch(err){
        console.log(err)
    }
}

module.exports={registerAdmin, loginAdmin}