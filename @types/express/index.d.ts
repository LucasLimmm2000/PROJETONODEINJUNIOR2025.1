// src/@types/express/index.d.ts

import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: any; // tenho que olhar mais tarde, pois da para definir mais específico
    }
  }
}
