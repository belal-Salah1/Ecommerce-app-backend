class appError extends Error{
    constructor(statusText, statusCode, message ) {
        super();
        this.statusText = statusText;
        this.statusCode = statusCode;
        this.message = message;
        return this;
    }
    
}

module.exports =  appError;