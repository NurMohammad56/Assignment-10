const mongoose = require("mongoose");
const {Schema} = mongoose;

const dataSchema = new Schema(
    {
        Email:{type:String},
        Name: {type:String},
        Roll:{
            type:Number,
            min:[6, 'min 6 & max 12 but you have entered = {VALUE}']
        },
        Class:{type:String},
        Remark:{type:String},
        Number:{type: String,
            validate:{
                validator: function (value) {
                    return /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/.test(value);
                },
                message: "11 Digit Mobile Number Required"
            }
        }
    },
    {timestamps: true, versionKey:false}
)
const studentsModel= mongoose.model('Students', dataSchema)
module.exports = studentsModel;