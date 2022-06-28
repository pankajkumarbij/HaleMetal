import initDB from "../../helpers/db";
import user from "../../models/user";
import jwtAuth from '../../helpers/jwt';
import bcrypt from 'bcrypt';

initDB();

export default (req, res) => {
  user.findOne({ mobile: req.body.mobile}, function(err, user){
    if(err){
      res.json(err);
    }
    else if(!user){
      var message = { error: "user not found with this mobile"}
      res.json(message);
    }
    else {
      bcrypt.compare(req.body.password, user.password, function(err, result) {
        if(result){
          var token = jwtAuth.generateAccessToken(user.mobile, user.fName, user.lName, user.email, user._id, "user");
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