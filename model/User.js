import {Schema,model} from 'mongoose';


const User = new Schema({
    name :{
        type:String,
        required:true,
    },
    email: {
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        unique:true,
        required:true
     },
    date: {
        type:Date,
        default:Date.now
     }
})
export default  model('User',User)
