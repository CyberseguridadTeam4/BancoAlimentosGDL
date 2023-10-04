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

//Create user in database
const createUser = async (req: Request, res: Response, next: NextFunction) => {
    //Create pollo
    
    //Create User
    
    return res.status(200).json({
        message: "hola"
    });
};


export default { createUser };