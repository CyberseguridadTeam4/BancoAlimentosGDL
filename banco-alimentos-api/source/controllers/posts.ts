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
        const {name,nextStage}=req.body
        // Example: Creating a new object
        const Pollo=Parse.Object.extend('Pollo');
        const pollo = new Pollo();
    
        // Set properties for the object
        pollo.set('name', name);
        pollo.set('nextStage', nextStage);

        // Save the object to the database
        await pollo.save();

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

export default { createUser };