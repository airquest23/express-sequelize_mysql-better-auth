import path from 'path';
import env from "dotenv";

env.config({
  path: path.join(__dirname, '../.env')
});

const isProd = process.env.NODE_ENV === 'production';

import db from './database/config';
import { transporter } from './utils/email/config';
import app from './server';
import logger from './utils/logger';

//import { Server } from 'socket.io';
//import { createServer } from 'http';
//import { setTextsSocket } from './routes/texts';
//import { setRichTextsSocket } from './routes/richTexts';

import { User } from './database/models/User';
import { Session } from './database/models/Session';
import { Account } from './database/models/Account';
import { Verification } from './database/models/Verification';
import { TwoFactor } from './database/models/TwoFactor';
import { RateLimit } from './database/models/RateLimit';
//import { getLanguageSocketMiddleware } from './middlewares/language';
//import { getAuthSocketMiddleware } from './middlewares/auth';

//const server = createServer(app);
//const io = new Server(server);

function logError(e: unknown, type: string) {
  logger.error(type + ' error:', e);
};

//////////////////////////////////////////////////////////////
/// MAIN APP DECLARATION
db.sync()

.then(async () => {
  await User.sync();
  await Session.sync();
  await Account.sync();
  await Verification.sync();
  await TwoFactor.sync();
  await RateLimit.sync();
  
  transporter.verify((e, success) => {
    if (e) { logError(e, 'Transporter'); if(isProd) return; }
    if (isProd && !success) return;

    const port = process.env.PORT;

    /*server*/app.listen(port, (e) => {
      if (e) { logError(e, 'Server'); if(isProd) return; }

      /*io.use(getLanguageSocketMiddleware);
      io.use(getAuthSocketMiddleware);
      
      io.on('connection', (socket) => {
        logger.info('User connected!');
        setTextsSocket(socket);
        setRichTextsSocket(socket);
        socket.on('disconnect', () => {
          logger.info('User disconnected!');
        });
      });*/

      logger.info(`Express app listening on port ${port}`);
      logger.info(`App mode: ${process.env.NODE_ENV}`);
    });
  });
})

.catch((e) => {
  logError(e, 'DB');
});