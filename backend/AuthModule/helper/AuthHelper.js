const bcryptjs=require('bcryptjs')
const jonsWeToken=require('jsonwebtoken')
const token=require('../Models/TokenModel')
const User=require('../Models/AuthModel')

const hashPassword=async(password)=>{
    let salt=await bcryptjs.genSalt(15)
    return await bcryptjs.hash(password,salt)
}

const ComparePassword=(hashPassword,password)=>{
    return bcryptjs.compare(password,hashPassword)
}

const CreateToken=async(id)=>{
    return new Promise((resolve,reject)=>{

        let tokenCreate=jonsWeToken.sign({id},process.env.TOKEN_SECRET)

        token.create({token:tokenCreate,user:id}).then((result)=>{
            resolve(result.token)
        }).catch((err)=>{
            reject(err)
        })
    })
}

const DeleteToken=()=>{
    return new Promise((resolve,reject)=>{
        let date=moment().utc().subtract(15,"days").format()
        token.deleteMany({createdAt:{$lte:date}}).then((result)=>{
            resolve(result)
        }).catch((err)=>{

            reject(err)
        })

    })
}

const DecodeToken = (token) => {
    return jonsWeToken.decode(token, { complete: true })
}

const VerifyToken = (token) => {
    return jonsWeToken.verify(token, process.env.TOKEN_SECRET, { complete: true })
}

const ResetToken = () => {
    return new Promise((resolve, reject) => {
        let date = moment().utc().subtract(1, "hours").format()
        User.updateMany({ "resetPasswordToken.createdAt": { $lte: date } }, { "resetPasswordToken.createdAt": "", "resetPasswordToken.token": "" }).then((result) => {
            resolve(result)
        }).catch((err) => {
            reject(err)
        });
    })
}


module.exports={hashPassword,ComparePassword,CreateToken,DeleteToken,DecodeToken,VerifyToken,ResetToken}