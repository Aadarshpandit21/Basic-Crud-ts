import express,{Request,Response} from 'express';
import mongoose,{ConnectOptions}from 'mongoose';
import route from "./routes/user.route"
const app = express();
app.use(express.json());

// app.get("/",(req:Request,res:Response)=>{
//     res.send("Welcome");
// })
const dbOptions: ConnectOptions = {
    useNewUrlParser:true,
    useUnifiedTopology: true
  }as any;
mongoose.connect("mongodb+srv://AadarshPandit21:TzUH6bos1cHJeK4K@cluster0.qs2wbxg.mongodb.net/Aadarsh21-db",dbOptions).then(()=>{
    console.log("MongoDb is connected")
}).catch(()=>{
    console.log("error during connection with mongoDb")
})

app.use("/",route);

app.listen(3001,()=>{
    console.log("server is connected ");
})