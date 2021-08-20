exports.responses = {
    success: function (data, others = {}) {
        return { data, ...others }
    },
    error: function (message, others = {}) {
        return { message, ...others }
    }
}