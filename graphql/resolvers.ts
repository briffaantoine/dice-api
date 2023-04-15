import db from '../models';

interface BetOutput {
    id: number;
    UserId: number;
    betAmount: number;
    payout: number;
    win: boolean;
}

const resolvers = {
    Query: {
        getUserList: async () => {
            return await db.User.findAll();
        },
        getUser: async (_: any, { id }: { id: number }) => {
            const user = await db.User.findByPk(id, { include: [db.Bet] });
            if (!user) {
                throw new Error(`User with ID ${id} not found`);
            }

            return user;
        },
        getBetList: async () => {
            return await db.Bet.findAll();
        },
        getBet: async (_: any, { id }: { id: number }) => {
            const bet = await db.Bet.findByPk(id, { include: [db.User] });
            if (!bet) {
                throw new Error(`Bet with ID ${id} not found`);
            }
            
            return bet;
        },
        getBestBetPerUser: async (_: any, { limit }: { limit: number}) => {
            const bets = await db.Bet.findAll({
                attributes: [
                    'UserId',
                    [db.sequelize.fn('MAX', db.sequelize.col('payout')), 'payout'],
                ],
                group: ['UserId'],
                order: [[db.sequelize.col('payout'), 'DESC']],
                limit: limit,
                include: {
                    model: db.User,
                    attributes: ['id', 'name', 'balance'],
                },
            });
              
            return bets.map((bet: any) => ({
                user: {
                    id: bet.User.id,
                    name: bet.User.name,
                    balance: bet.User.balance
                },
                payout: bet.payout
            }));
          },
    },
    Mutation: {
        createBet: async (_: any, { UserId, betAmount, chance }: { UserId: number, betAmount: number, chance: number }): Promise<BetOutput> => {
            const user = await db.User.findByPk(UserId);
            if (!user) {
                throw new Error(`User with ID ${UserId} not found`);
            }

            if (user.balance < betAmount) {
                throw new Error('Insufficient balance');
            }

            const payout = (100 / chance) * betAmount;
            const win = Math.random() * 100 < chance;
            const balance = win ? user.balance + payout - betAmount : user.balance - betAmount;

            await user.update({ balance });
      
            const bet = await db.Bet.create({
                UserId,
                betAmount,
                win,
                payout,
                chance,
            });
      
            return bet.toJSON() as BetOutput;
        }
    },
    User: {
        bets: (user: any) => user.Bets,
    },
    Bet: {
        user: (bet: any) => bet.User
    }
}

export default resolvers;