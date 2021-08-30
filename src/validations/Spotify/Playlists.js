const yup = require("yup")
const utils = require("../../utils")

exports.create = async params => {
    try{
        const schema = yup.object().shape({
            userId: yup.string().required("userId param is required"),
            name: yup.string().required("name param is required")
        })
        await schema.validate(params)
    }catch(err){
        const badRequestStatus = 400
        throw new utils.Exception(err.message,badRequestStatus)
    }
}