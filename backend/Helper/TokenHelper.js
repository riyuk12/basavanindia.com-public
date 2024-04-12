const jsonWebToken=require("jsonwebtoken")

const DecodeToken=(token)=>{
    return jsonWebToken.decode(token,{complete:true})
}

const VerifyToken=(token)=>{
    return jsonWebToken.verify(token,process.env.TOKEN_SECRET)
}

module.exports={DecodeToken,VerifyToken}