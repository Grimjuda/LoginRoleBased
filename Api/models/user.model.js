const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING,
      unique: true
    },
    password: {
      type: Sequelize.STRING
    },
    empresa: {
      type: Sequelize.STRING
    },
    sitioweb: {
      type: Sequelize.STRING
    },
    resetPasswordToken: {type: Sequelize.STRING
    },
     resetPasswordExpire: {type: Sequelize.DATE}
  });
 
const setSaltAndPassword = async function(user) {
    if (user.changed('password')) {
      const salt = bcrypt.genSaltSync(10);
      user.password = bcrypt.hashSync(user.password, salt);
    }
  };
  User.prototype.getResetPasswordToken =  function() {
    const resetToken = crypto.randomBytes(20).toString("hex");
     this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + 10 * (60*1000);
    return resetToken;
  };
  User.prototype.getSignedJwtToken =  function() {
    return jwt.sign({ id: this._id},process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE,})
  };
 
 

  User.beforeCreate(setSaltAndPassword);
  User.beforeUpdate(setSaltAndPassword);

  return User;
};



