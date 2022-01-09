const crypto = require('crypto');
const config = require("../config/auth.config");
const db = require("../models");
const ErrorResponse = require('../utils/errorResponse');
const sendEmail =require('../utils/sendEmail')
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
exports.sendemail = (req,res) => {

  
  const message = `
  <h1> Te hemos registrado en nuestra plataforma </h1>
  <p> Estas son tu credenciales para que puedas ingresar </p>
  <p> Email:  ${req.body.email} </p>
  <p> Contraseña:  ${req.body.password} </p>
  `
  try {
      
    sendEmail ({
         to: req.body.email,
         subject: "Haz sido registrado a la plataforma",
         text: message
     })
     res.status(200).json({success: true, data: "Email enviado"})
 } catch (error) {


  return next( new ErrorResponse("No se pudo enviar el email",500))
 }
}
exports.signup =  (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    empresa: req.body.empresa,
    sitioweb: req.body.sitioweb
  }).then(user => {
    if (req.body.roles) {
      Role.findAll({
        where: {
          name: {
            [Op.or]: req.body.roles
          }
        }
      }).then(roles => {
        user.setRoles(roles).then(() => {
          res.send({ message: "User was registered successfully!" });
        });
      });
    } else {
      // user role = 1
      user.setRoles([1]).then(() => {
        res.send({ message: "User was registered successfully!" });
      });
    }
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
};

exports.signin = (req, res) => {
  
  User.findOne({
    where: {email: req.body.email}
    
  })
  .then(user => {
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
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        authorities.push("ROLE_" + roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        empresa: user.empresa,
        sitioweb: user.sitioweb,
        roles: authorities,
        accessToken: token
      });
    });
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
};

exports.forgotpassword = async(req, res, next) => {
  const {email} = req.body;

  try {
      const user = await User.findOne({where: {email: req.body.email}})
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
   const user = await User.findOne({ where: {  
    resetPasswordToken,
  
   }})
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