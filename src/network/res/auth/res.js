// RESPONSES DECLARATION

const unauthorizedAccess = (req, res, err, status = 401) => {
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


module.exports = {
    unauthorizedAccess,
    error
};