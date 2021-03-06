// IMPORT ROUTES API
const projectRoutes = require('../../components/project/network');
const userRoutes = require('../../components/user/network');
const uploadRoutes = require('../../components/upload/network');

const routes = server => {
    server.use('/api/project', projectRoutes);
    server.use('/api/user', userRoutes);
    server.use('/api/images', uploadRoutes);
};

module.exports = routes;