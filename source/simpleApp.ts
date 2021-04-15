import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

import RouterSingleton from './router/routerSingleton';
import { DatabaseHandler, DatabaseHandlerInitializer } from 'backapisocket';

export default class SimpleApp {
  io: Server;
  router: RouterSingleton;
  databaseHandler: DatabaseHandler;
  constructor(router: RouterSingleton, databaseHandler: DatabaseHandler) {
    const httpServer = createServer();
    this.io = new Server(httpServer, {
      // ...
    });
    this.middlewares();
    this.router = router;
    this.databaseHandler = databaseHandler;
    this.routes(databaseHandler.getInit());
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected middlewares(): void {}

  protected routes(initDefault?: DatabaseHandlerInitializer): void {
    this.io.on('connection', (socket: Socket) => {
      this.router.createRoutes.bind(this.router)(socket, initDefault);
    });
  }
}
