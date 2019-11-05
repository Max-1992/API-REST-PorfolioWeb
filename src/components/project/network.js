// IMPORT OF MODULES
const { Router } = require('express');


// INITIALIZATIONS
const router = Router();


// IMPORT CONTROLLERS
const controller = require('./controller');


// ROUTES
router.get('/', controller.allProject);
router.get('/:id', controller.getProject);
router.post('/', controller.addProject);
router.put('/:id', controller.updateProject);
router.delete('/:id', controller.deleteProject);

module.exports = router;