const config = require("../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model")(sequelize, Sequelize);
db.role = require("./role.model")(sequelize, Sequelize);
db.empresa = require('./empresa.model')(sequelize,Sequelize);
db.sitio = require('./sitio.model')(sequelize,Sequelize);


db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
  });
db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
  });
db.ROLES = ["user", "admin","admin_master"];
db.empresa.hasMany(db.sitio);
db.sitio.belongsTo(db.empresa);
db.empresa.hasMany(db.user);
db.user.belongsTo(db.empresa);
module.exports = db;