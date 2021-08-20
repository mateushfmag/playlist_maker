exports.responses = {
    success: function (data, others = {}) {
        return { data, ...others }
    },
    error: function (message, others = {}) {
        return { message, ...others }
    }
}

global.Error = class extends Error{
    constructor(message,status = 500){
        super(message)
        this.status = status
    }
}