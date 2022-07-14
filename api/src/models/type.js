const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {

    class Type extends Model {};
  
    Type.init({
        name: {
            type: DataTypes.STRING,
            validate: {
                isIn: {
                    args: [["normal", "Henry", "fighting","flying","poison","ground","rock","bug","ghost","steel","fire","water","grass","electric","psychic","ice","dragon","dark","fairy","unknown","shadow"]],
                    msg: 'No es un valor valido'
                },
            },
            alowNull: false
        }
    },{
        sequelize: sequelize,
        modelName: 'type'
    }) 
};
