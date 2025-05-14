import { Injectable } from '@nestjs/common';
import { isNil } from 'lodash-es';

@Injectable()
export class CommonService {
  getDefined<T>(item: T | undefined | null): T {
    if (isNil(item)) {
      throw new Error('Item is undefined');
    }

    return item;
  }
}
