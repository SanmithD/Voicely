import authModel from "../models/auth.model.js";
import { reportModel } from "../models/report.model.js";
import { sendMail } from "../service/email.service.js";

export const sendReport = async(req, res) =>{
    const { report } = req.body;
    const userId = req.user._id;

    if(!report || !userId){
        return res.status(404).json({
        success: false,
        message: "Request failed"
      });
    }
    try {
        const { email } = await authModel.findOne({ _id: userId });
        if(!email){
            return res.status(404).json({
                    success: false,
                    message: "Email not found"
            });
        }
        const newReport = new reportModel({
            userId,
            report
        })
        const isSend = await sendMail(email, "sanmithdevadiga91@gmail.com", "User report", report);
        await newReport.save();
        if(!isSend){
            return res.status(404).json({
        success: false,
        message: "Fail to send report"
      });
        }
        res.status(200).json({
        success: true,
        message: "Report submitted"
      });
    } catch (error) {
        res.status(500).json({
        success: false,
        message: "Server error"
      });
      console.log(error)
    }
}