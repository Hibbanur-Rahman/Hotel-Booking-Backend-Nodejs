const httpStatusCode = require("../constants/httpStatusCode")

const Login=async(req,res)=>{
    try{

    }catch(error){
        return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
            success:false,
            message:"Something went wrong!!",
            error:error.message
        })
    }
}

module.exports={
    Login
}