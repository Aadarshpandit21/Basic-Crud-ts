
import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from 'bcrypt';

//console.log(bcrypt)
export const userRegistration = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    let existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).send({ status: false, message: "user Already exist" });
    }
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if(!emailRegex.test(email)){
        res.status(400).send({message:"email should be a valid email"});
    }

    const passwordRegex = /^(?=.*[\p{P}\p{S}]).{8,}$/u;
    if (!passwordRegex.test(password)) {
      return res
        .status(400).send({ message:
            "Password must be at least 8 characters long and contain at least one special character",
        });
    }
    const Salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password,Salt);
    req.body.password = hashedPass;
    const newUser = await User.create(req.body);

    res
      .status(201)
      .send({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).send({ message: "Internal server error "+error });
  }
};

export const updateUser = async (req:Request,res:Response)=>{
  try {
    const { email } = req.params;
    const { userName } = req.body;

    // Find and update the user by email
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { userName },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send({ message: 'User not found' });
    }

    res.status(200).send({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    
    res.status(500).send({ message: 'Internal server error '+ error});
  }
}
