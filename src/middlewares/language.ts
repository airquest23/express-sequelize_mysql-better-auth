import { Request, Response, NextFunction } from "express";
import { getLanguage as getLang } from "../utils/languages";
import { isString } from "../utils/utils";
//import { DefaultEventsMap, ExtendedError, Socket } from "socket.io";
import { statusCodes as sc } from "../utils/server/status-codes";
import logger from "../utils/logger";

const getPreferredLanguage = (acceptLanguageHeader : string) => {
  const languages = acceptLanguageHeader.split(',');
  return languages[0].split(';')[0].trim();
};

const langCookie = `__Secure-${process.env.APP_NAME}.language`;

export const getLanguageFromRequest = (req: Request | undefined, res: Response | null = null) => {
  if (!req) return 1;
  
  let lang = '';

  // 1st check the query (?language=...)
  if (res && req.query.language) {
    lang = req.query.language.toString();
    res.cookie(langCookie, lang, {
      maxAge: 86400,
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      //signed: true,
    });
  }
  
  // 2nd check the cookie (langCookie=...)
  else if (req.cookies && req.cookies[langCookie] && isString(req.cookies[langCookie])) {
    lang = req.cookies[langCookie];
  }
  
  // 3rd check the req header (accept-language=...)
  else {
    const acceptLanguageHeader = req.headers['accept-language'];
    if (acceptLanguageHeader)
      lang = getPreferredLanguage(acceptLanguageHeader).split('-')[0];
  };
  
  const applyLang = getLang(lang);
  return !isNaN(applyLang) ? applyLang : 1;
};

/////////////////////////////////////
// Language socket middleware
/*export const getLanguageSocketMiddleware = async (
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  next: (err?: ExtendedError | undefined) => void 
) => {
  try {
    // let lang = '';
    
    // Check the cookie (langCookie=...)
    // if (
    //   socket.request.cookies &&
    //   socket.request.cookies[langCookie] &&
    //   isString(socket.request.cookies[langCookie])
    // ) {
    //   lang = socket.request.cookies[langCookie];
    // }
    
    // Check the req header (accept-language=...)
    // else {
    //   const acceptLanguageHeader = socket.request.headers['accept-language'];
    //   if (acceptLanguageHeader)
    //     lang = getPreferredLanguage(acceptLanguageHeader).split('-')[0];
    // };
    
    // const applyLang = getLang(lang);
    socket.data.language = getLanguageFromRequest(socket.request); //!isNaN(applyLang) ? applyLang : 1;
    next();
  }
  catch(e) {
    logger.error(e);
    throw e;
  };
};*/

/////////////////////////////////////
// Language middleware
const getLanguageMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    //////////////////////////////
    // Protection against robots
    const path = req.path;
    if (
      path.includes('/.well-known') ||
      path.includes('.xml') ||
      path.includes('.php') ||
      path.includes('.txt') ||
      path.includes('/wp-') ||
      path.includes('/media') ||
      req.headers['from'] && req.headers['from'].includes('googlebot')
    ) {
      return res.status(sc["404-Not-Found"].code).end();
    };
    //////////////////////////////
    //////////////////////////////

    logger.verbose("*************************************************************");
    logger.verbose("******************** REQUEST FLOW BEGINS ********************");
    logger.debug("------------- [Lang middleware] REQ headers -------------");
    logger.http("ReqHeaders:", req.headers || { headers: null });

    /*let lang = '';

    // 1st check the query (?language=...)
    if (req.query.language) {
      lang = req.query.language.toString();
      res.cookie(langCookie, lang, {
        maxAge: 86400,
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
        //signed: true,
      });
    }
    
    // 2nd check the cookie (langCookie=...)
    else if (req.cookies && req.cookies[langCookie] && isString(req.cookies[langCookie])) {
      lang = req.cookies[langCookie];
    }
    
    // 3rd check the req header (accept-language=...)
    else {
      const acceptLanguageHeader = req.headers['accept-language'];
      if (acceptLanguageHeader)
        lang = getPreferredLanguage(acceptLanguageHeader).split('-')[0];
    };
    
    const applyLang = getLang(lang);*/
    res.locals.language = getLanguageFromRequest(req, res); //!isNaN(applyLang) ? applyLang : 1;
    next();
  }
  catch(e) {
    next(e);
  };
};

export default getLanguageMiddleware;