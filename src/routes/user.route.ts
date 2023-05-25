import express,{Request,Response} from 'express';
import { userRegistration,updateUser} from "../controllers/user.controller"
const router = express.Router();
router.get("/",(req:Request,res:Response)=>{
   res.send("Hello Postman")
})
router.post('/register', userRegistration);
router.patch("/users/:email",updateUser);
export default router;


