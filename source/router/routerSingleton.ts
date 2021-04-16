/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Server, Socket } from 'socket.io';
import { BaseControllerDefault, RouterInitializer } from 'backapisocket';
// @ts-ignore
export default class RouterSingleton {
  protected controller:
    | {
        [name: string]: BaseControllerDefault;
      }
    | undefined;
  // @ts-ignore
  // eslint-disable-next-line no-unused-vars
  abstract createRoutes(
    server: Server,
    socket: Socket,
    initDefault?: RouterInitializer
  ): void;
  protected static _instance: RouterSingleton;

  static getInstance(): RouterSingleton {
    if (!this._instance) {
      this._instance = new this();
    }
    return this._instance;
  }
}
