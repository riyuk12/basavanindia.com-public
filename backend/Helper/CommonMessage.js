module.exports={

    commonResponse:function (error){
        return {message:"something is wrong!",success:false,error:error}
    },

    validateMessage:function(error){
        return { message: "Please fill all mandatory field", success: false, errors: error}
    },
}