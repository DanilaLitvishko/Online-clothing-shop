const Sequelize = require("sequelize");

const sequelize = new Sequelize("test", "postgres", "postgres", {
    dialect: "postgres"
});

const Room = sequelize.define("room", {
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    id:{
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
    }
})

module.exports = Room