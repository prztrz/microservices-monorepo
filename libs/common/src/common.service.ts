import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonService {
  constructor() {}

  isValid24Hex = (str: string): boolean => /^[a-f0-9]{24}$/i.test(str);
}
