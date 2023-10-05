/** source/controllers/posts.ts */
import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import Parse from 'parse/node';
import * as dotenv from 'dotenv';
dotenv.config();

//DB CONNECTION
const appID = process.env.APPLICATION_ID;
const jsKey = process.env.JAVASCRIPT_KEY;
const rest= process.env.REST_API
if (appID && jsKey) {
    Parse.initialize(appID,jsKey,rest);
    Parse.serverURL = 'https://parseapi.back4app.com/';
}
//USER
const createUser = async (req: Request, res: Response, next: NextFunction) => {
    // Create user in database
    try {
        const { username, password, email, name, nextStage } = req.body;         
        const Pollo=Parse.Object.extend('Pollo');
        const pollo = new Pollo();
        // Set properties for the object
        pollo.set('name', name);
        pollo.set('nextStage', nextStage);

        // Save the object to the database
        await pollo.save();

        // Create a new Parse User object
        const User = Parse.Object.extend('_User');
        const user = new User();

        // Set properties for the User object
        user.set('username', username);
        user.set('password', password);
        user.set('email', email);


        user.set('badges', []); // Initialize badges as an empty array
        user.set('idProfilePicture', 0); // Initialize profile picture ID 0 is starting picture for everyone
        user.set('visBadge', -1); // Initialize visibility badge. -1 means no badges

        // Create a pointer to the Pollo object
        const polloPointer = Pollo.createWithoutData(pollo.id); // 
        user.set('pollo', polloPointer);
        
        // Save the User object to the database
        await user.signUp();

        return res.status(200).json({
            message: 'New object created successfully',
        });
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};

// Get user by objectId
const userLogin = async (req: Request, res: Response, next: NextFunction) => {
    try{
    const{username,password}=req.body
    const user = await Parse.User.logIn("myname", "mypass", { usePost: false });
    return res.status(200).json({
        user: user,
    });
    }catch (error) {
        return res.status(500).json({
            message: error,
        });
    }

};

export default { createUser ,userLogin};