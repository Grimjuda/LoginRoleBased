const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
const { authJwt } = require("../middleware");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateEmail,
      verifySignUp.checkRolesExisted,
      authJwt.verifyToken, authJwt.isAdmin
     
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);
  app.post("/api/auth/sendemail",  [authJwt.verifyToken, authJwt.isAdmin],controller.sendemail)
  app.post("/api/auth/forgotpassword", controller.forgotpassword);
  app.put("/api/auth/resetpassword/:resetToken", controller.resetpassword);
};