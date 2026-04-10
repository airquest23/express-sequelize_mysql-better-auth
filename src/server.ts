import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
//import fileupload from 'express-fileupload';
import { rateLimit } from 'express-rate-limit';
import morgan from 'morgan';
import path from 'path';

import { toNodeHandler } from 'better-auth/node';
import { auth } from './utils/auth';
import { statusCodes as sc } from './utils/server/status-codes';
import { parseTemplate } from './utils/server/parser';
import { isString } from './utils/utils';
import { ErrorServer, handleError } from './utils/server/errors';
import { returnPage } from './utils/server/responses';
import logger from './utils/logger';

import getLanguageMiddleware from './middlewares/language';
import getAuthMiddleware from './middlewares/auth';

import authRouter from './routes/auth';
import textsRouter from './routes/texts';
import richTextsRouter from './routes/richTexts';
import userRouter from './routes/user';
import adminRouter from './routes/admin';

const app = express();

//////////////////////
// View engine
//////////////////////
app.engine('html', (filePath, options, callback) => {
  try {
    // @ts-ignore
    const rendered = parseTemplate(filePath, options, options.model);
    if (isString(rendered))
      return callback(null, rendered);
    else
      throw new Error('--- Template Type Error ---');
  } catch(e) {
    if (e instanceof Error)
      return callback(e);
    else
      return callback(new Error('--- Template Unknown error ---'));
  };
});

app.set('views', path.join(__dirname, process.env.VIEW_PATH || '../views'));
app.set('view engine', 'html');

//////////////////////
// CORS
//////////////////////
app.use(
  cors({
    origin: [
      process.env.APP_URL_1 || 'http://localhost:8080',
      process.env.APP_URL_2 || 'http://127.0.0.1'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

//////////////////////
// RATE LIMIT
//////////////////////
app.use(rateLimit({
  windowMs: 10 * 1000, // time window in milliseconds
  limit: 100,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  // @ts-ignore
  ipv6Subnet: 56,
  message: sc['429-Too-Many-Requests'].message + ': ' +
    sc['429-Too-Many-Requests'].description,
}));

//////////////////////
// Public PATH
//////////////////////
app.use(
  express.static(
    path.join(__dirname, process.env.PUBLIC_PATH || '../public')
  )
);

//////////////////////
// Morgan middleware
//////////////////////
app.use(morgan(
  'method: :method; ' +
  'route: \':url\'; ' +
  'status: :status; ' +
  'res-length: :res[content-length]; ' +
  'res-time: :response-time ms',
  {
    stream: {
      write: (message) => {
        logger.http(message.trim());
        logger.verbose("******************** REQUEST FLOW ENDS ********************");
        logger.verbose("***********************************************************");
      },
    },
  },
));

//////////////////////
// Auth Handler
//////////////////////
app.all(
  '/api/auth/*splat',
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const BETTER_AUTH_ACCEPT_METHODS = ['POST', 'GET'];
      if(!BETTER_AUTH_ACCEPT_METHODS.includes(req.method)) {
        return handleError(
          new ErrorServer(
            sc['405-Method-Not-Allowed'].message + '.\n' +
            sc['405-Method-Not-Allowed'].description,
            sc['405-Method-Not-Allowed'].code
          ),
          res
        );
      }
      else { next(); };
    }
    catch(e) {
      next(e);
    };
  },
  toNodeHandler(auth),
);

//////////////////////
// Parsers
//////////////////////
app.use(express.json());
app.use(cookieParser());
//app.use(express.urlencoded({ extended: true }));
//app.use(fileupload());

//////////////////////
// Middlewares
//////////////////////
app.use(getLanguageMiddleware);
app.use(getAuthMiddleware);

//////////////////////
// Routers
//////////////////////
app.use(authRouter);

const checkAuthMiddleWare = (req: Request, res: Response, next: NextFunction) => {
  try {
    if(!res.locals.user || !res.locals.user?.isAuthorized) {
      return handleError(
        new ErrorServer(
          sc['401-Unauthorized'].message + '.\n' +
          sc['401-Unauthorized'].description,
          sc['401-Unauthorized'].code
        ),
        res
      );
    }
    else { next(); };
  }
  catch(e) {
    next(e);
  };
};

app.use('/texts', checkAuthMiddleWare, textsRouter);
app.use('/rich-texts', checkAuthMiddleWare, richTextsRouter);
app.use('/user', checkAuthMiddleWare, userRouter);
app.use('/admin', checkAuthMiddleWare,
  (req: Request, res: Response, next: NextFunction) => {
    try {
      if(!res.locals.user || res.locals.user?.role !== 'admin') {
        return handleError(
          new ErrorServer(
            sc['401-Unauthorized'].message + '.\n' +
            sc['401-Unauthorized'].description,
            sc['401-Unauthorized'].code
          ),
          res
        );
      }
      else { next(); };
    }
    catch(e) {
      next(e);
    };
  },
  adminRouter
);

//////////////////////
// Page 404 error
//////////////////////
app.use((req: Request, res: Response) => {
  try {
    const user = res.locals.user;
    
    return returnPage(res, 'layout_cover', '404',
    {
      props: {
        currentPage: 'login',
      },
      model: {
        isLoggedIn: user ? true : false,
      },
    });
  }
  catch(e) {
    return handleError(e, res);
  };
});

//////////////////////
// Error handler
//////////////////////
app.use((e: unknown, req: Request, res: Response, next: NextFunction) => {
  return handleError(e, res);
});

//////////////////////
export default app;