'use strict';
import { Model, DataTypes, Optional } from 'sequelize';

interface BetAttributes {
    id: number,
    betAmount: number,
    chance: number,
    payout: number,
    win: boolean
}

module.exports = (sequelize: any, DataTypes: any) => {
    class Bet extends Model<BetAttributes> implements BetAttributes {
        id!: number;
        betAmount!: number;
        chance!: number;
        payout!: number;
        win!: boolean;

        static associate(models: any) {
            this.belongsTo(models.User, {
                foreignKey: 'UserId'
            });
        }
    }

    Bet.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        betAmount: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        chance: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        payout: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        win: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, 
    {
        sequelize,
        modelName: 'Bet',
        tableName: 'bets'
    });
    
    return Bet;
};