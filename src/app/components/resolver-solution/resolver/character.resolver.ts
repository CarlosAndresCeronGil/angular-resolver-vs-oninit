import { ResolveFn } from '@angular/router';

export const characterResolver: ResolveFn<boolean> = (route, state) => {
  return true;
};
