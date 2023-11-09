const candidateSchema = require("../model/candidate");
const bcrypt = require("bcrypt")
const { sendEmail } = require("../services/nodeMailer"); // Import the sendEmail function from your email service module

const JWT = require("../services/token")

module.exports.signup = async (req, res) => {
    try {
        const { name, email, mobile_number, password, confirm_password } = req.body;
        // console.log(name,email,mobile_number,password,confirm_password)
        const checkemail = await candidateSchema.find({ email });
        if (checkemail.length > 0) {
            res.status(409).json({
                message: `email : ${email} already exist`
            })
        } else {
            if (password === confirm_password) {
                let salt = bcrypt.genSaltSync(10);
                let hashedPassword = await bcrypt.hash(password, salt);
                //  console.log(hashedPassword)

                //generate otp 
                const otp = Math.floor(100000 + Math.random() * 900000).toString();
                /*console.log(otp)*/
                const emailSent = await sendEmail(email, otp);
                // otp verification

                const candidateData = new candidateSchema({
                    name, email, mobile_number, password: hashedPassword, otp
                })
                const candidateCreate = candidateData.save();

                res.status(201).json({
                    message: "candidate added successfully",
                    candidateData

                })
                //create object with name email hashpassword mobilenumber and save in to database and send final res(201)
            } else {
                res.status(400).json({
                    message: `password and confirm password missmatched`
                })
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `server error ${error.message}` })
    }
}

module.exports.verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body
        // console.log(email,otp)
        const checkUser = await candidateSchema.findOne({ email });
        // console.log(checkUser)
        // console.log(checkUser[0].otp)
        // console.log(otp)
        if (checkUser.otp === otp) {
            await candidateSchema.updateOne({ email }, { $set: { isVerify: true, otp: null } })
            //console.log(updateIsVerify)
            res.status(201).json({
                message: "otp verified successfully"
            })
        } else {
            res.status(400).json({
                message: "please send correct otp"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `server error ${error.message}` })
    }
}
 

module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // console.log(email,password)
        const user = await candidateSchema.findOne({ email });
        // console.log(user)
        if (!user) {
            res.status(404).json({
                message: "user not found",
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        // console.log(isPasswordMatch)
        if (isPasswordMatch) {
            if (user.isVerify) {
                //jwt token generate and send in response with candidate email
                // console.log(user.id)
                const payload = ({
                    id: user._id,
                    email: email
                })
                console.log(payload)
                const token = await JWT.issueJWT(payload)
                // console.log(token)
                res.status(200).json({
                    message: `successfully login by ${email}  `,
                    token: token,
                })
            } else {
                res.status(400).json({
                    message: "User is not verified. Please verify your account first.",
                })
            }
        }else{
            res.status(400).json({
                message: "please enter correct password",
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `server error ${error.message}` })
    }
}

module.exports.profile = async(req,res)=> {
   try {

    const email = req.user.email;
    console.log(email)
    const user = await candidateSchema.findOne({email});
    console.log(user)
    if(!user){
        res.status(404).json({
            message:"user not found"
        })
    }else{
        res.status(200).json({
            message : "user data retrive successfullyy",
            user
        })
    }
   } catch (error) {
    console.log(error);
    res.status(500).json({message:`server error ${error.message}`})
}
}

// module.exports.Cupdate = async(req, res)=>{
//     try {
//         const {name,mobile_number} = req.body;
//         const {id} =  req.user;
//         //console.log(id)
//         const user = await candidateSchema.findByIdAndUpdate(id,name,);
// if (!user) {
//     res.status(400).json({
//         message:"User not found"
// })
// } else {
//     res.status(200).json({
//         message:"User data updated successfully",
        
//     })
// }
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({message:`server error ${error.message}`})
//     }
// }

module.exports.Cupdate = async (req, res) => {
    try {
        const data = req.body;
         //console.log(data)
        const { id } = req.user; 
        const updatedUser = await candidateSchema.findByIdAndUpdate({_id:id},{...data}, { new: true });
        //console.log(updatedUser)
        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.status(200).json({
            message: "User data updated successfully",
            user: updatedUser,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Server error ${error.message}` });
    }
}



module.exports.Cdelete = async(req,res)=>{
    try {
        const userId = req.user.id
        console.log(userId)
        const deletedUser = await candidateSchema.findByIdAndDelete(userId)
        console.log(deletedUser)
        if(deletedUser){
            res.status(200).json({
                message : "User deleted successfully"
            }) 
        }else{
            res.status(400).json({
                message :"user not found"
            })
        }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: `Server error ${error.message}` });
    }
}