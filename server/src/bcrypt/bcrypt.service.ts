import * as bcrypt from 'bcrypt';

import { Injectable } from '@nestjs/common';

export interface IBcryptService {
  hash(hashString: string): Promise<string>;
  compare(password: string, hashPassword: string): Promise<boolean>;
}

@Injectable()
export class BcryptService implements IBcryptService {
  private rounds: number = 13;

  async hash(hashString: string): Promise<string> {
    return await bcrypt.hash(hashString, this.rounds);
  }

  async compare(password: string, hashPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashPassword);
  }
}
