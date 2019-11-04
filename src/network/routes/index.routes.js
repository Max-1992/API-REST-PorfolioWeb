// IMPORT ROUTES API
const projectRoutes = require('../../components/project/network');

const routes = server => {
    server.use('/api/project', projectRoutes);
};

module.exports = routes;