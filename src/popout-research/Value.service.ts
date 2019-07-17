// Value service
export type ValueServiceData = {
  data: string;
};

export type ValueServiceError = {
  error: string;
};

export class ValueService {
  fetch(fail: boolean) {
    return new Promise((resolve: (value?: ValueServiceData) => void, reject: (reason?: ValueServiceError) => void) => {
      setTimeout(() => {
        if (!fail) {
          resolve({
            data: 'data',
          });
        }
        else {
          reject({
            error: 'error',
          });
        }
      }, 5000);
    });
  }
}
