import { gql } from 'apollo-server';

const typeDefs = gql`
    type User {
        id: ID!
        name: String
        balance: Float
        bets: [Bet]
    }

    type Bet {
        id: ID!
        betAmount: Float
        chance: Float
        payout: Float
        win: Boolean
        UserId: ID!
        user: User!
    }

    type BestBetPerUser {
        user: User
        payout: Float
    }

    type BetOutput {
        id: ID!
        UserId: Int!
        betAmount: Float!
        chance: Float!
        payout: Float!
        win: Boolean!
    }

    type Query {
        getUserList: [User]
        getUser(id: ID!): User!
        getBetList: [Bet]
        getBet(id: ID!): Bet!
        getBestBetPerUser(limit: Int): [BestBetPerUser]
    }
      
    type Mutation {
        createBet(UserId: Int!, betAmount: Float!, chance: Float!): BetOutput!
    }
`;

export default typeDefs;