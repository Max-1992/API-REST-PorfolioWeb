// IMPORT OF MODULES
const fs = require('fs-extra');
const path = require('path');

// IMPORT SCHEMA
const Project = require('../project/model');

// STORE METHODS DECLARATION

const add = async ( id,  collection, imageName ) => {
    try {
        // Validate the data collection and save the name of the image.
        if( collection === 'user' ) {
            let user = await User.findById(id);

            // Update the image property and save to database.
            user.image = imageName;
            user.save();
            return user;
        }
        
        let project = await Project.findById(id);

        // Update the image property and save to database.
        project.image = imageName;
        project.save();
        return project;
    } catch (err) {
        return Promise.reject(err);
    }

};


const update = async ( id,  collection, imageName ) => {
    try {
        // Validate the data collection and save the name of the image.
        if( collection === 'user' ) {
            let user = await User.findById(id);

            // Remove old server image.
            let pathImage = path.resolve(__dirname, `../../../uploads/${collection}/${user.image}`);

            if( fs.existsSync(pathImage) ) {
                fs.unlinkSync(pathImage);
            }

            // Update the image property and save to database.
            user.image = imageName;
            user.save();
            return user;
        }
        
        let project = await Project.findById(id);

        // Remove old server image.
        let pathImage = path.resolve(__dirname, `../../../uploads/${collection}/${project.image}`);

        if( fs.existsSync(pathImage) ) {
            fs.unlinkSync(pathImage);
        }

        // Update the image property and save to database.
        project.image = imageName;
        project.save();
        return project;
    } catch (err) {
        return Promise.reject(err);
    }
};


module.exports = {
    add,
    update
};