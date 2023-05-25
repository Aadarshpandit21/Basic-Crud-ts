import {Document,Schema,model} from 'mongoose'

export interface User extends Document {
  email: string;
  password: string;
  userName:string;
}

const userSchema = new Schema<User>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  userName:{type:String}
},{timestamps:true});

export default model<User>('registerdUsers', userSchema);
