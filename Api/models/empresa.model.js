module.exports = (sequelize, Sequelize) => {
    const Empresa = sequelize.define("empresas", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING
      }
    });
  
    return Empresa;
  };
  