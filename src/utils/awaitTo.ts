import { message } from 'antd';

export const awaitTo = <T>(promise): Promise<[null, T] | [Error, null]> => {
  return promise
    .then((value) => [null, value] as [null, T])
    .catch((error) => {
      message.error(error.message);
      return [error, null] as [Error, null];
    });
};
