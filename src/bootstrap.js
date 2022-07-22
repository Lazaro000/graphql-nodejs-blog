import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { connectDB } from './db/index.js';
import { schema } from './graphql/schema.js';
import { config as dotenvConfig } from 'dotenv';
import { authenticate } from './middlewares/auth.js';

dotenvConfig();

export const bootstrap = async () => {
  const app = express();

  app.use(express.json());

  app.use(authenticate);

  app.use(
    '/graphql',
    graphqlHTTP({
      schema,
      graphiql: true,
    })
  );

  connectDB();

  app.listen(process.env.PORT || 3000, () =>
    console.log(`Servidor levantado en el puerto ${process.env.PORT || 3000}`)
  );
};
