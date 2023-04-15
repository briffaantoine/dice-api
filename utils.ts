import db from './models';
import { users } from './seeders/users';
import { bets } from './seeders/bets';

export const createUsers = () => {
    users.map(user => { db.User.create(user) })
}

export const createBets = () => {
    bets.map(bet => { db.Bet.create(bet) })
}