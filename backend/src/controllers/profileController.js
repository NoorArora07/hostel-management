import {request, response} from 'express';
import dotenv from 'dotenv';
import User from '../models/users.model.js';
import userDetail from '../models/userDetail.model.js';
dotenv.config();

export const viewProfile = async (request, response) => {
    //get hai ye toh
    const usersid = request.user.sid;
    try {
        const findDetails = await userDetail.findOne( {sid: usersid});
        const data = {
            name: request.user.name,
            sid: usersid,
            email: request.user.email,
            branch: findDetails.branch,
            phoneNumber: findDetails.phoneNumber,
            parentsNumber: findDetails.parentsNumber
        }
        console.log("user details successfully fetched");
        response.status(200).send(data);
    } catch (error) {
        console.log("there has been an error while viewing the profile: ", error);
        response.status(500).send(error);
    }   
}

export const editProfile = async(request, response) => {
    //request.body me aayega jo change hona hai
    const usersid = request.user.sid;
    const user = request.body;
    try {   
        for (const key in user) {
            if (user.hasOwnProperty(key)) {
                if (key === 'name' || key === 'sid' || key === 'email') {
                    //first db se call
                    console.log(user[key]);
                    const result = await User.updateOne( {
                        sid: usersid,
                    }, {
                        $set: {
                            [key]: user[key]
                        }
                    })
                    
                    if (result.matchedCount === 0) {
                        console.log(`No User found with sid: ${usersid}`);
                    }
                    
                    if (result.modifiedCount == 0) {
                        console.log('no change made!');
                    }
                    
                    console.log("successfully updated!");
                }
                else {
                    //second db se call
                    console.log(user[key]);
                    const result = await userDetail.updateOne( {
                        sid: usersid,
                    }, {
                        $set: {
                            [key]: user[key]
                        }
                    })

                    if (result.matchedCount === 0) {
                        console.log(`No User found with sid: ${usersid}`);
                    }

                    if (result.modifiedCount == 0) {
                        console.log('no change made!');
                    }

                    console.log("successfully updated!");

                }
            }
        }

        console.log("finally the updates are complete!");
        response.status(200).send("donesies");

    } catch (error) {
        console.log("there has been an error while trying to change the profile details!", error);
        response.status(500).send(error);
    }
}
