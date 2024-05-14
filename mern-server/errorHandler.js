// errorHandler.js
const errorHandler = require('./ErrorConfig.json');

module.exports = {
    sendError: function(res, errorMessage) {
        let statusCode = 500; 
        for (const code in errorHandler) {
            if (errorHandler[code] === errorMessage) {
                statusCode = parseInt(code);
                break;
            }
        }
        res.status(statusCode).send(errorMessage);
    }
};



