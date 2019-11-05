// RESPONSES DECLARATION

const success = (req, res, project, status = 200 ) => {
    return res.status(status).json(project);
};


const notFound = (req, res, err, status = 404 ) => {
    return res.status(status).json({
        ok: false,
        err
    });
};


const error = (req, res, err, status = 500 ) => {
    return res.status(status).json({
        ok: false,
        err
    });
};


// EXPORT RESPONSES
module.exports = {
    success,
    notFound,
    error
};