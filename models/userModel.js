const {Schema , model} = require('mongoose');

const userSchema =Schema({
    name :String ,
    email :{
        type : String ,
        unique:true,
        required:true
    } ,
    role :{
        type: String,
        default : "GENERAL",
        enum: ['GENERAL', 'ADMIN']
    },
    password :String
},{
    timestamps : true
})

const userModel = model("user" , userSchema)

module.exports = userModel