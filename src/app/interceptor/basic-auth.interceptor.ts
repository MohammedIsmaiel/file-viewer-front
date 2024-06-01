import { HttpInterceptorFn } from '@angular/common/http';

export const basicAuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authHeader = 'Basic ' + btoa('user:user');
  const authReq = req.clone({ setHeaders: { Authorization: authHeader } });
  return next(authReq);
};
