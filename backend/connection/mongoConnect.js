const {default:mongoose}=require("mongoose")

mongoose.set("strictQuery",true)

mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true})

const db=mongoose.connection

db.on('error',(error)=>console.error.bind(error))

db.on("connected",()=>console.log('Database connected'))

db.on('disconnected',()=>console.log("Database not connected"))