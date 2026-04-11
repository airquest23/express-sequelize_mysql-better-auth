import { Request, Response, NextFunction } from "express";
import { fromNodeHeaders } from "better-auth/node";
//import { DefaultEventsMap, ExtendedError, Socket } from "socket.io";
import { auth } from "../utils/auth";
import { isObject } from "../utils/utils";
import logger from "../utils/logger";

/////////////////////////////////////
// Auth socket middleware (compute user and pass it to socket)
/*export const getAuthSocketMiddleware = async (
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  next: (err?: ExtendedError | undefined) => void 
) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(socket.request.headers),
    });

    logger.debug("------------- Session from socket connection -------------");
    logger.debug(session);
    
    if (!session) {
      throw new Error("Credentials needed!");
    };

    socket.data.user = session?.user;
    next();
  }
  catch(e) {
    logger.error(e);
    throw e;
  };
};*/

/////////////////////////////////////
// Auth middleware (compute user and session and pass them to routes)
const getAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.debug("------------- [Auth middleware] Check session -------------");
    logger.debug("Route: " + req.path);

    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
    
    logger.debug("Session:", session || { session: null });
    logger.debug("------------- [Auth middleware] End check session -------------");
    
    if (!session) {
      res.locals.user = null;
      res.locals.session = null;
    }
    
    else {
      const user = session.user;
      const authSession = session.session;
      
      const isAuthenticated =
        user        != null && user        != undefined && isObject(user) &&
        authSession != null && authSession != undefined && isObject(authSession);
      
      const isEmailVerified = isAuthenticated && user.emailVerified;

      const isNotBanned = isEmailVerified && !user.banned;

      const isApproved = isNotBanned && (!process.env.BETTER_AUTH_FORCE_APPROVAL || user.approved);

      const isTwoFactorEnabled = process.env.BETTER_AUTH_FORCE_ENABLE_TWOFA ?
        isApproved && user.twoFactorEnabled :
        isApproved;
      
      const isTwoFactorEmailOnly = isTwoFactorEnabled && user.twoFactorEmailOnly;
      
      const isAuthorized = isTwoFactorEnabled;

      const isAdmin = isAuthorized && user.role === 'admin';

      res.locals.user = {
        ...user,
        isAuthenticated: isAuthenticated,
        isEmailVerified: isEmailVerified,
        isNotBanned: isNotBanned,
        isApproved: isApproved,
        isTwoFactorEnabled: isTwoFactorEnabled,
        isTwoFactorEmailOnly: isTwoFactorEmailOnly,
        isAuthorized: isAuthorized,
        isAdmin: isAdmin,
      };

      res.locals.session = authSession;
    };

    next();
  }
  catch(e) {
    next(e);
  };
};

export default getAuthMiddleware;