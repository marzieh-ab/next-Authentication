import {Schema,models,model}  from "mongoose"

const usertwoSchema=new Schema({
    email:{
        type:String,
        require:true

    },
    password:{
        type:String,
        require:true
    },

    name:{
        type:String
    },
    lastName:{
        type:String
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true,
      }

})

const UsersTwo=models.UsersTwo||model("UsersTwo",usertwoSchema)

export default UsersTwo