import { Server, ServerOptions, Socket } from 'socket.io';

import RouterSingleton from './router/routerSingleton';
import { DatabaseHandler, IDatabaseHandler } from 'backapi';

export default class SimpleApp {
  server: Server;
  router: RouterSingleton;
  databaseHandler: DatabaseHandler;
  protected _port: number;
  public get port(): number {
    return this._port;
  }
  constructor(
    router: RouterSingleton,
    databaseHandler: DatabaseHandler,
    port: number,
    options?: Partial<ServerOptions>
  ) {
    this._port = port;
    this.server = new Server(port, options);
    this.middlewares();
    this.router = router;
    this.databaseHandler = databaseHandler;
    this.routes(databaseHandler.getInit());
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected middlewares(): void {}

  protected routes(initDefault?: IDatabaseHandler): void {
    this.server.on('connection', (socket: Socket) => {
      this.router.createRoutes.bind(this.router)(
        this.server,
        socket,
        initDefault
      );
    });
  }
}
