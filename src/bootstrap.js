import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { schema } from './graphql/schema.js';

export const bootstrap = async () => {
  const app = express();

  app.use(express.json());

  app.use(
    '/graphql',
    graphqlHTTP({
      schema,
      graphiql: true,
    })
  );

  app.listen(process.env.PORT || 3000, () =>
    console.log(`Servidor levantado en el puerto ${process.env.PORT || 3000}`)
  );
};
