// IMPORT OF MODULES

// IMPORT SCHEMA
const Project = require('./model');


// STORE METHODS DECLARATION

const add = async ( projectData ) => {
    try {
        // Save a new project in the database and return the data of the created project.
        const newProject = new Project(projectData);
        const project = await newProject.save();

        return project;

    } catch (err) {
        console.error(`[ERROR Add]: ${err}`);
        return Promise.reject(err);
    }
};


const all = async ( searchProject, pages ) => {
    try {
        // Pagination.
        const itemPages = 9;
    
        // Validate if there is a search term and if not, return all paginated projects.
        if( !searchProject ) {
            const projects = await Project.find({})
                                            .skip( ( itemPages * pages ) - itemPages )
                                            .limit( itemPages )
                                            .sort( {"date": "desc"} )
                                            .exec();
            
            return projects;
        }

        // Return the paginated projects that meet the search term.
        let regex = new RegExp( searchProject, 'i' );
    
        const projects = await Project.find({ "category": regex })
                                                                .skip( ( itemPages * pages ) - itemPages )
                                                                .limit( itemPages )
                                                                .sort({ "date": "desc" })
                                                                .exec();

        return projects;

    } catch (err) {
        console.error(`[ERROR All]: ${err}`);
        return Promise.reject(err);
    }



};


const get = async ( id ) => {
    try {
        // Search project in the database by id and return project found.
        const project = Project.findById(id);

        return project;

    } catch (err) {
        console.error(`[ERROR Get]: ${err}`);
        return Promise.reject(err);
    }
};


const update = async ( id, updateProject ) => {
    try {
        // Update project in the database by id and return updated project.
        const project = await Project.findByIdAndUpdate( id, updateProject, { new: true });
    
        return project;
        
    } catch (err) {
        console.error(`[ERROR Update]: ${err}`);
        return Promise.reject(err);
    }

};


const remove = async ( id ) => {
    try {
        // Remove project from the database and return deleted project.
        const deleteProject = await Project.findByIdAndDelete(id);

        return deleteProject;

    } catch (err) {
        console.error(`[ERROR Remove]: ${err}`);
        return Promise.reject(err);
    }
};


// EXPORT STORE
module.exports = {
    add,
    all,
    get,
    update,
    remove
};