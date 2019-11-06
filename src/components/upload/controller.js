// IMPORT OF MODULES
const uuid = require('uuid/v4');
const fs = require('fs-extra');
const path = require('path');

// IMPORT OF METHODS
const store = require('./store');

// RESPONSE
const response = require('../../network/res/project/res');


// CONTROLLERS DECLARATION

const addImage = async ( req, res ) => {

    try {
        // Capture parameters.
        const { type } = req.params;
        const { id } = req.params;

        // Validate if we receive the file.
        if( !req.files ) {
            let err = `It is not possible to process your request, the image was not sent correctly.`;
            return response.error(req, res, err, 400);
        }
    
        // Almacenar el archivo recibido
        let image = req.files.image;

        // Declaration of valid file extensions.
        let validExtensions = ['png', 'jpg', 'gif', 'jpeg'];

        // Validate file extension.
        let fileExtension = image.name.split('.');
        let extension = fileExtension[fileExtension.length -1];

        if( validExtensions.indexOf(extension) < 0 ) {
            let err = `The extension ${extension} is not allowed. Please modify the format of your file to any of the following extensions: ${validExtensions.join(', ')}`;
            return response.error(req, res, err, 400);
        }

        // Declaration of Valid Types.
        let validTypes = ['project', 'user'];

        // Valid Types
        if( validTypes.indexOf(type) < 0 ) {
            let err = `The type ${type} is not allowed. Please modify the format of your file to any of the following extensions: ${validTypes.join(', ')}`;
            return response.error(req, res, err, 400);
        }

        // Modify image name to be unique.
        let newImageName = `${uuid()}-${image.name}`;
        image.name = newImageName;

        // Move files to the root directory
        await image.mv(`./uploads/${type}/${image.name}`);

        // Update the database to add the image property.
        if( type === 'user' ){
            const user = await store.add( id, type, image.name);

             // Validate if there is a Found Data.
             if( !user ) {
                const err = `Could not find a User with the ID provided. Please check again with a new ID.`;

                // Remove junk files from the server.
                let pathImage = path.resolve(__dirname, `../../../uploads/${type}/${image.name}`);

                if( fs.existsSync(pathImage) ) {
                    fs.unlinkSync(pathImage);
                }

                return response.notFound(req, res, err, 404);
            }

            // Response success.
            return response.success(req, res, user, 201);
        } else {
            const project = await store.add( id, type, image.name);

            // Validate if there is a Found Data.
            if( !project ) {
                const err = `Could not find a project with the ID provided. Please check again with a new ID.`;

                // Remove junk files from the server.
                let pathImage = path.resolve(__dirname, `../../../uploads/${type}/${image.name}`);

                if( fs.existsSync(pathImage) ) {
                    fs.unlinkSync(pathImage);
                }

                // Response success.
                return response.notFound(req, res, err, 404);
            }
    
            // Response success.
            return response.success(req, res, project, 201);
        }

    } catch (err) {

        // Remove junk files from the server.
        let pathImage = path.resolve(__dirname, `../../../uploads/${type}/${image.name}`);

        if( fs.existsSync(pathImage) ) {
            fs.unlinkSync(pathImage);
        }

        // Response error.
        return response.error(req, res, err, 500);
    }
};


const updateImage = async ( req, res ) => {
    try {
        // Capture parameters.
        const { type } = req.params;
        const { id } = req.params;

        // Validate if we receive the file.
        if( !req.files ) {
            let err = `It is not possible to process your request, the image was not sent correctly.`;
            return response.error(req, res, err, 400);
        }
    
        // Almacenar el archivo recibido
        let image = req.files.image;

        // Declaration of valid file extensions.
        let validExtensions = ['png', 'jpg', 'gif', 'jpeg'];

        // Validate file extension.
        let fileExtension = image.name.split('.');
        let extension = fileExtension[fileExtension.length -1];

        if( validExtensions.indexOf(extension) < 0 ) {
            let err = `The extension ${extension} is not allowed. Please modify the format of your file to any of the following extensions: ${validExtensions.join(', ')}`;
            return response.error(req, res, err, 400);
        }

        // Declaration of Valid Types.
        let validTypes = ['project', 'user'];

        // Valid Types
        if( validTypes.indexOf(type) < 0 ) {
            let err = `The type ${type} is not allowed. Please modify the format of your file to any of the following extensions: ${validTypes.join(', ')}`;
            return response.error(req, res, err, 400);
        }

        // Modify image name to be unique.
        let newImageName = `${uuid()}-${image.name}`;
        image.name = newImageName;

        // Move files to the root directory
        await image.mv(`./uploads/${type}/${image.name}`);

        // Update the database to add the image property.
        if( type === 'user' ){
            const user = await store.update( id, type, image.name);

             // Validate if there is a Found Data.
             if( !user ) {
                const err = `Could not find a User with the ID provided. Please check again with a new ID.`;

                // Remove junk files from the server.
                let pathImage = path.resolve(__dirname, `../../../uploads/${type}/${image.name}`);

                if( fs.existsSync(pathImage) ) {
                    fs.unlinkSync(pathImage);
                }

                return response.notFound(req, res, err, 404);
            }

            // Response success.
            return response.success(req, res, user, 201);
        } else {
            const project = await store.update( id, type, image.name);

            // Validate if there is a Found Data.
            if( !project ) {
                const err = `Could not find a project with the ID provided. Please check again with a new ID.`;

                // Remove junk files from the server.
                let pathImage = path.resolve(__dirname, `../../../uploads/${type}/${image.name}`);

                if( fs.existsSync(pathImage) ) {
                    fs.unlinkSync(pathImage);
                }

                // Response success.
                return response.notFound(req, res, err, 404);
            }
    
            // Response success.
            return response.success(req, res, project, 201);
        }

    } catch (err) {

        // Remove junk files from the server.
        let pathImage = path.resolve(__dirname, `../../../uploads/${type}/${image.name}`);

        if( fs.existsSync(pathImage) ) {
            fs.unlinkSync(pathImage);
        }

        // Response error.
        return response.error(req, res, err, 500);
    }

};


const getImage = ( req, res ) => {
   
    // Capture parameters.
    const { type } = req.params;
    const { image } = req.params;

    // Create path to image file
    const pathImage = path.join(__dirname, `../../../uploads/${type}/${image}`);

    // Return the image file if it exists or return a no-image file.
    if( fs.existsSync(pathImage) ) {
        return res.sendFile(pathImage);
    } else {
        let noImagePath = path.join(__dirname, '../assets/no-img.jpg');
        return res.sendFile(noImagePath);
    }

};

module.exports = {
    addImage,
    updateImage,
    getImage
};