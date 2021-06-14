const Sequelize = require("sequelize");

const sequelize = new Sequelize("test", "postgres", "postgres", {
    dialect: "postgres"
});

const Message = sequelize.define("message", {
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    text:{
        type: Sequelize.STRING,
        allowNull: false
    },
    roomId:{
        type: Sequelize.STRING,
        allowNull: false
    },
    userId:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Message