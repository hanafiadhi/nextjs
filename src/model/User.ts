import mongoose from "mongoose";
const { Schema } = mongoose;

// const userSchemas = new Schema(
//   {
//     name: {
//       type: String,
//       unique: true,
//       required: true,
//     },
//     email: {
//       type: String,
//       unique: true,
//       required: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     isActive: {
//       type: Boolean,
//       required: true,
//     },
//   },
//   { timestamps: true }
// );
const userSchemas = new Schema({

  // id?: number;


  tenantId:{
    type: String
  },
  username: {
    type: String
  },
  email: {
    type: String
  },
  password:{
    type: String
  },
  role:[String],
  applications: [String],
  refreshToken: {
    type: String,
    default:""
  },
  accessToken:{
    type:String,
    default:""
  },
  salt:{
    type:String,
    default:""
  },
  isActive:{
    type:Boolean,
    default: true
  },
  isAdmin: {
    type:Boolean,
    default: true
  },
  isVerified:{
    type:Boolean,
    default: false
  },
  path_default: {
    type:String,
    default: ""
  },
  device_id: {
    type:String,
    default: ""
  },
  device_brand:{
    type:String,
    default: ""
  },
  device_model:{
    type:String,
    default: ""
  },
  device_manufacture:{
    type:String,
    default: ""
  },
  device_os:{
    type:String,
    default: ""
  },
  device_os_version:{
    type:String,
    default: ""
  },
  application_version:{
    type:String,
    default: ""
  },
  last_login:{
    type:Date,
    default: ""
  }
},{ timestamps: true })
export default mongoose.models.User || mongoose.model("User", userSchemas);
