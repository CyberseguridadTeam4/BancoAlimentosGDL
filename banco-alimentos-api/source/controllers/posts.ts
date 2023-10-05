/** source/controllers/posts.ts */
import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import Parse from 'parse/node';
import * as dotenv from 'dotenv';
dotenv.config();


const appID = process.env.APPLICATION_ID;
const jsKey = process.env.JAVASCRIPT_KEY;
if (appID && jsKey) {
    Parse.initialize(appID,jsKey);
    Parse.serverURL = 'https://parseapi.back4app.com/';
}

// Create user in database
const createUser = async (req: Request, res: Response, next: NextFunction) => {
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

        // Set additional properties for the User object
        
        //////////////////////////////
        user.set('emailVerified', false); // Email verification status
        //////////////////////////

        user.set('badges', []); // Initialize badges as an empty array
        user.set('idProfilePicture', 0); // Initialize profile picture ID 0 is starting picture for everyone
        user.set('visBadge', -1); // Initialize visibility badge. -1 means no badges

        // Create a pointer to the Pollo object
        const polloPointer = Pollo.createWithoutData(pollo.id); // 
        user.set('pollo', polloPointer);

        // Save the User object to the database
        await user.save();

        return res.status(200).json({
            message: 'New object created successfully',
        });
    } catch (error) {
        console.log('Error creating object: ', error);
        return res.status(500).json({
            message: 'Error creating object',
        });
    }
};

// Get user by objectId
const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params; // Extract the userId from the URL parameters

        // Create a new Parse Query for the "_User" class
        const User = Parse.Object.extend('_User');
        const query = new Parse.Query(User);

        // Use the objectId to find the user
        const user = await query.get(userId);

        return res.status(200).json(user);
    } catch (error) {
        console.log('Error fetching user: ', error);
        return res.status(500).json({
            message: 'Error fetching user',
        });
    }
};

export default { createUser ,getUserById};