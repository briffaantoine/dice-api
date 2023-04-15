import express from 'express';
const app = express();
const port = process.env.PORT || 3000;
import db from './models';
import { ApolloServer, gql } from 'apollo-server';
import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';
import { createUsers, createBets } from './utils';

// createUsers();
// createBets();

db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`App listening port ${port}`);
    });
});

const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({url}:{url: string}) => {
    console.log(`Server listening at ${url}`);
})