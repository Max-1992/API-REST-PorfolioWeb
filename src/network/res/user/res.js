// RESPONSES DECLARATION

const AuthSuccess = (req, res, user, token, status = 200 ) => {
    return res.status(status).header( 'Authorization', token).json(user);
};

const success = (req, res, user, status = 200 ) => {
    return res.status(status).json(user);
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
    AuthSuccess,
    notFound,
    error
};