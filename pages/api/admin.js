import initDB from "../../helpers/db";
import admin from "../../models/admin";
import jwtAuth from '../../helpers/jwt';
import bcrypt from 'bcrypt';

initDB();

export default (req, res) => {
  admin.findOne({ mobile: req.body.mobile}, function(err, admin){
    if(err){
      res.json(err);
    }
    else if(!admin){
      var message = { error: "admin not found with this mobile"}
      res.json(message);
    }
    else {
      bcrypt.compare(req.body.password, admin.password, function(err, result) {
        if(result){
          var token = jwtAuth.generateAccessToken(admin.mobile, admin.fName, admin.lName, admin.email, admin._id, "admin");
          var output = { 
            token:token,
            message: { success: "Successfully Login" }
          }
          res.json(output);
        }
        else{
          var message = { 
            error: "mobile number and password is not matched" 
          }
          res.json(message);
        }
      })
    }
  });
}