// IMPORT OF MODULES
const  { Schema, model } = require('mongoose');


// SCHEMA DEFINITION
const ProjectSchema = new Schema({
    title: {
        type: String,
        required: [true, `The title is required.`]
    },
    description: {
        type: String,
        requiere: [true, `The description is required.`]
    },
    category: {
        type: String,
        requiere: [true, `The category is required.`]
    },
    videoPath: {
        type: String,
    },
    imagePath: {
        type: String
    },
    technologies: [
        {
            type: String
        }
    ],
    featured: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});


// EXPORT SCHEMA
const Project = model('Project', ProjectSchema);

module.exports = Project;