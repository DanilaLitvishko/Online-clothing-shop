const Sequelize = require("sequelize");

const sequelize = new Sequelize("test", "postgres", "postgres", {
    dialect: "postgres"
});

const User = sequelize.define("user", {
    displayName:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    },
    id:{
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
    }
})

module.exports = User