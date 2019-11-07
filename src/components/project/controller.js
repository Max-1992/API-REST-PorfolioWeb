// IMPORT STORE
const store = require('./store');


// RESPONSE
const response = require('../../network/res/project/res');


// CONTROLLERS DECLARATION

const addProject = async ( req, res ) => {
    try {    
        // Capture the request body and execute store method to save in database.
        const newProject = req.body;
        const project = await store.add( newProject );

        // Response success.
        return response.success(req, res, project, 201);

    } catch (err) {
        // Response error.
        return response.error(req, res, err, 500);
    }
};


const allProject = async ( req, res ) => {
    try {
        // Capture query params.
        const searchProject = req.query.search;
        let page = req.query.page || 1;
        page = Number(page);
        
        // Run search method.
        const projects = await store.all( searchProject, page );
        
        // Response success.
        return response.success(req, res, projects, 200);

    } catch (err) {
        // Response error.
        return response.error(req, res, err, 500);
    }

};


const getProject = async ( req, res ) => {
    try {
        // Capture id params and run search method.
        const { id } = req.params;
        const project = await store.get( id );

        // Validate if there is a Found Data.
        if( !project ) {
            const err = `Could not find a project with the ID provided. Please check again with a new ID.`;
            return response.notFound(req, res, err, 404);
        }
        
        // Response success.
        return response.success(req, res, project, 200);

    } catch (err) {
        // Response error.
        return response.error(req, res, err, 500);
    }
};


const updateProject = async ( req, res ) => {
    try {
        // Capture the id parameters and the request body, then execute the update method.
        const { id } = req.params;
        const updateProject = req.body;
    
        const project = await store.update( id, updateProject );
    
        // Validate if there is a Found Data.
        if( !project ) {
            const err = `Could not find a project with the ID provided. Please check again with a new ID.`;
            return response.notFound(req, res, err, 404);
        }
    
        // Response success.
        return response.success(req, res, project, 200);

    } catch (err) {
        // Response error.
        return response.error(req, res, err, 500);
    }
};


const deleteProject = async ( req, res ) => {
    try {
        // Capture id params and run delete method.
        const { id } = req.params;
        const deleteProyect = await store.remove( id );

         // Validate if there is a Found Data.
         if( !deleteProyect ) {
            const err = `Could not find a project with the ID provided. Please check again with a new ID.`;
            return response.notFound(req, res, err, 404);
        }

        // Response success.
        return response.success(req, res, deleteProyect, 200);


    } catch (err) {
         // Response error.
         return response.error(req, res, err, 500);
    }
};


// EXPORT CONTROLLERS
module.exports = {
    addProject,
    allProject,
    getProject,
    updateProject,
    deleteProject,
};