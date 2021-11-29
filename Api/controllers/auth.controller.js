const crypto = require('crypto');
const config = require("../config/auth.config");
const db = require("../models");
const ErrorResponse = require('../utils/errorResponse');
const sendEmail =require('../utils/sendEmail')
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map(role => role._id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};

exports.signin = (req, res) => {
  
  User.findOne({
    email: req.body.email
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token
      });
    });
};

exports.forgotpassword = async(req, res, next) => {
  const {email} = req.body;

  try {
      const user = await User.findOne({email});
      if(!user){
          return next( new ErrorResponse("No se pudo enviar el email",404))
      }
      const resetToken = user.getResetPasswordToken() 
      await user.save();
      const resetUrl = `http://localhost:8081/resetpassword/${resetToken}`;
      const message = `
      <h1> You have requested a Password reset </h1>
      <p> Please go to this link to reset your password </p>
      <a href=${resetUrl} clicktracking=off>${resetUrl} </a>
      `
      try {
          await sendEmail ({
              to: user.email,
              subject: "Password Reset Request",
              text: message
          })
          res.status(200).json({success: true, data: "Email enviado"})
      } catch (error) {
       user.resetPasswordToken = undefined;
       user.resetPasswordExpire = undefined;

       await user.save();

       return next( new ErrorResponse("No se pudo enviar el email",500))
      }
  } catch (error) {
     next(error);
  }
}
exports.resetpassword = async(req, res, next) => {
  const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");

try {
   const user = await User.findOne({
       resetPasswordToken,
       resetPasswordExpire: { $gt: Date.now()}
   })
   if(!user){
       return next( new ErrorResponse("Reset Token Invalida",400))
   }
   user.password = req.body.password;
   user.resetPasswordToken = undefined;
   user.resetPasswordExpire = undefined;

await user.save();
res.status(201).json({
   success: true,
   data: "Password Reset Success",
   token: user.getSignedJwtToken(),
   
})
} catch (error) {
   next(error);
   
}
}
const sendToken = (user, statusCode, res) =>{
    const token = user.getSignedJwtToken()
    res.status(statusCode).json({success:true,token})
}