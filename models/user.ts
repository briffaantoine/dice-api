'use strict';
import { Model, DataTypes, Optional } from 'sequelize';

interface UserAttributes {
  id: number,
  name: string,
  balance: number
}

module.exports = (sequelize: any, DataTypes: any) => {
    class User extends Model<UserAttributes> implements UserAttributes {
        id!: number;
        name!: string;
        balance!: number;

        static associate(models: any) {
            this.hasMany(models.Bet, {
                foreignKey: 'UserId'
            });
        }
    }

    User.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        balance: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0
        }
    }, 
    {
        sequelize,
        modelName: 'User',
        tableName: 'users'
    });

    return User;
};