'use strict';

module.exports = (sequelize, DataTypes) => {
    const swPlanet = sequelize.define(
        'swPlanet',{
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
            name: DataTypes.STRING,
            gravity: DataTypes.STRING,
        }, 
        {
            paranoid: true
        }
    );
    return swPlanet;
};