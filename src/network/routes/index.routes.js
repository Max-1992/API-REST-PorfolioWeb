// IMPORT ROUTES API
const projectRoutes = require('../../components/project/network');
const uploadRoutes = require('../../components/upload/network');

const routes = server => {
    server.use('/api/project', projectRoutes);
    server.use('/api/images', uploadRoutes);
};

module.exports = routes;