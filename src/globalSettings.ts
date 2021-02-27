/*
 * Copyright © 2020 Aram Meem Company Limited.  All Rights Reserved.
 */

export class GlobalSettings {
  public static get localPort(): number {
    return Number(process.env.NODEJS_SERVER_PORT || '8080');
  }

  public static get localHost(): string {
    return process.env.NODEJS_SERVER_PORT || '0.0.0.0';
  }
}
