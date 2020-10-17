import cors from 'cors';
import {GraphQLServer, PubSub} from 'graphql-yoga';
import helmet from 'helmet';
import logger from 'morgan';
import schema from './schema';
import decodeJwt from './util/decodeJwt';

class App {
  public app: GraphQLServer;
  public pubSub: any;
  constructor() {
    this.pubSub = new PubSub();
    this.pubSub.ee.setMaxListeners(99);
    this.app = new GraphQLServer({
      schema,
      context: req => {
        return {
          req: req.request,
          pubSub: this.pubSub
        }
      }
    });
    this.middlewares();
  }
  private middlewares = (): void => {
    this.app.express.use(
      helmet({
        contentSecurityPolicy: false,
      }),
    );
    this.app.express.use(logger('dev'));
    this.app.express.use(cors());
    this.app.express.use(this.jwt);
  };
  private jwt = async (req, res, next): Promise<void> => {
    const token = req.get('X-JWT');
    if (token) {
      const user = await decodeJwt(token);
      if (user) {
        req.user = user;
      } else {
        req.user = undefined;
      }
    }
    next();
  };
}

export default new App().app;
