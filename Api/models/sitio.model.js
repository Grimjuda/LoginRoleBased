
module.exports = (sequelize, Sequelize) => {
    const Sitio = sequelize.define("sitios", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING
      }
    });
  
    return Sitio;
  };
  