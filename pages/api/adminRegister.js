import initDB from "../../helpers/db";
import admin from "../../models/admin";
import bcrypt from 'bcrypt';

initDB();

export default (req, res) => {
  if(req.body.password!="" && req.body.password==req.body.confirm_password){
    bcrypt.hash(req.body.password, 12, function(err, hash){
      const fName= req.body.fName;
      const lName= req.body.lName;
      const mobile= req.body.mobile;
      const email= req.body.email;
      const password= hash;
      var newAdmin = new admin({fName,lName,email,mobile,password})
      newAdmin.save()
      .then(admin => {
        var message={success:"successfully registered!",data:admin};
        res.status(200).json(message);
      })
      .catch(err => {
        var message = {error:""};
        if( err.code=="11000" && Object.keys(err.keyValue)[0] == "mobile"){
          message.error="mobile already exist!";
        }
        else if(Object.keys(err.errors)[0]=="mobile")
        {
          message.error=err.errors.mobile.properties.message;
        }
        else if(Object.keys(err.errors)[0]=="fName")
        {
          message.error=err.errors.fName.properties.message;
        }
        else if(Object.keys(err.errors)[0]=="password")
        {
          message.message=err.errors.password.properties.message;
        }
        else if(Object.keys(err.errors)[0]=="email")
        {
          message.error=err.errors.email.properties.message;
        }
        else{
          message.error="Something went wrong!";
        }
        res.status(200).json(message);
      })     
    });
  }
  else{
    var message = { 
      error:"password and confirm password not matched" 
    };
    res.status(200).json(message);
  }
}
