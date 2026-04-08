import { Router, Request, Response } from "express";
import { fromNodeHeaders } from "better-auth/node";
import z from "zod";
import { auth } from "../utils/auth";
import { statusCodes as sc } from "../utils/server/status-codes";
import { handleError } from "../utils/server/errors";
import { escapeHTML } from "../utils/utils";
import { returnJson, returnPage, returnRedirect } from "../utils/server/responses";
import { User } from "../database/models/User";

/////////////////////////////////////
// Auth pages / API
const authRouter = Router();

/////////////////////////////////////
// Home page
authRouter.get("/", (req: Request, res: Response) => {
  try {
    const user = res.locals.user;

    // Authorized home page (dashboard)
    if (user?.isAuthorized)
      return returnPage(res, 'layout_dashboard', 'home_logged',
      {
        currentPage: 'home',
      });
    
    // Unauthorized home page (cover)
    else
      return returnPage(res, 'layout_cover', 'home_unlogged',
      {
        props: {
          currentPage: 'home',
          hideSignup: false,
        },
        model: {
          hideLogin: user ? true : false,
          showSignout: user ? true : false,
        },
      });
  }
  catch(e) {
    return handleError(e, res);
  };
});

/////////////////////////////////////
// Signup page
authRouter.get("/signup", (req: Request, res: Response) => {
  try {
    const user = res.locals.user;

    if (user?.isAuthenticated)
      return returnRedirect(res, "/");

    else
      return returnPage(res, 'layout_cover', 'auth/auth_signup',
      {
        props: {
          currentPage: 'signup',
          hideSignup: false,
        },
        model: {
          hideLogin: user ? true : false,
          showSignout: user ? true : false,
        },
      });
  }
  catch(e) {
    return handleError(e, res);
  };
});

// Login page
authRouter.get("/login", (req: Request, res: Response) => {
  try {
    const user = res.locals.user;
    const isAuthenticated = user?.isAuthenticated;

    if (isAuthenticated) {
      if (!user?.isEmailVerified)
        return returnRedirect(res, "/email-verification");

      else if (process.env.BETTER_AUTH_FORCE_ENABLE_TWOFA && !user?.isTwoFaEnabled)
        return returnRedirect(res, "/otp-enable");

      else
        return returnRedirect(res, "/");
    }

    else
      return returnPage(res, 'layout_cover', 'auth/auth_login',
      {
        props: {
          currentPage: 'login',
          hideSignup: false,
        },
        model: {
          hideLogin: user ? true : false,
          showSignout: user ? true : false,
        },
      });
  }
  catch(e) {
    return handleError(e, res);
  };
});

/////////////////////////////////////
// Forgot password page
authRouter.get("/password-forgot", (req: Request, res: Response) => {
  try {
    return returnPage(res, 'layout_cover', 'auth/auth_password_forgot',
    {
      props: {
        currentPage: 'login',
        hideSignup: true,
      },
      model: {
        hideLogin: res.locals.user ? true : false,
        showSignout: res.locals.user ? true : false,
      },
    });
  }
  catch(e) {
    return handleError(e, res);
  };
});

// Reset password page
authRouter.get("/password-reset", (req: Request, res: Response) => {
  try {
    const token = escapeHTML(z.string().nonempty().parse(req.query.token));
    
    return returnPage(res, 'layout_cover', 'auth/auth_password_reset',
    {
      props: {
        currentPage: 'login',
        hideSignup: true,
      },
      model: {
        hideLogin: res.locals.user ? true : false,
        showSignout: res.locals.user ? true : false,
        token: token || "",
      },
    });
  }
  catch(e) {
    return handleError(e, res);
  };
});

/////////////////////////////////////
// Reset email page
authRouter.get("/email-reset", (req: Request, res: Response) => {
  try {
    return returnPage(res, 'layout_cover', 'auth/auth_email_reset',
    {
      props: {
        currentPage: 'login',
        hideSignup: true,
      },
      model: {
        hideLogin: res.locals.user ? true : false,
        showSignout: res.locals.user ? true : false,
      },
    });
  }
  catch(e) {
    return handleError(e, res);
  };
});

/////////////////////////////////////
// Email verification page
authRouter.get("/email-verification", (req: Request, res: Response) => {
  try {
    const user = res.locals.user;

    return returnPage(res, 'layout_cover', 'auth/auth_email_verification',
    {
      props: {
        currentPage: 'login',
        hideSignup: true,
      },
      model: {
        hideLogin: user ? true : false,
        showSignout: user ? true : false,
        isEmailVerified: user?.isEmailVerified,
      },
    });
  }
  catch(e) {
    return handleError(e, res);
  };
});

// Email verification resend page
authRouter.get("/email-verification-resend", (req: Request, res: Response) => {
  try {
    const user = res.locals.user;

    if (user?.isEmailVerified)
      return returnRedirect(res, "/");

    else
      return returnPage(res, 'layout_cover', 'auth/auth_email_verification_resend',
      {
        props: {
          currentPage: 'login',
          hideSignup: true,
        },
        model: {
          hideLogin: user ? true : false,
          showSignout: user ? true : false,
        },
      });
  }
  catch(e) {
    return handleError(e, res);
  };
});

/////////////////////////////////////
// Email verification page
authRouter.get("/email-verified", (req: Request, res: Response) => {
  try {
    const user = res.locals.user;

    return returnPage(res, 'layout_cover', 'auth/auth_email_verification',
    {
      props: {
        currentPage: 'login',
        hideSignup: true,
      },
      model: {
        hideLogin: user ? true : false,
        showSignout: user ? true : false,
        isEmailVerified: true,
      },
    });
  }
  catch(e) {
    return handleError(e, res);
  };
});

/////////////////////////////////////
// TwoFA disabling page
authRouter.get("/otp-disable", (req: Request, res: Response) => {
  try {
    const user = res.locals.user;

    if (!user?.twoFactorEnabled && !user?.isAuthorized)
      return returnRedirect(res, "/");

    else
      return returnPage(res, 'layout_cover', 'auth/auth_otp_disable',
      {
        props: {
          currentPage: 'login',
          hideSignup: true,
          issuer: process.env.APP_NAME,
        },
        model: {
          hideLogin: user ? true : false,
          showSignout: user ? true : false,
        },
      });
  }
  catch(e) {
    return handleError(e, res);
  };
});

// TwoFA enabling page
authRouter.get("/otp-enable", (req: Request, res: Response) => {
  try {
    const user = res.locals.user;

    if (user?.twoFactorEnabled && !user?.isAuthorized)
      return returnRedirect(res, "/");

    else
      return returnPage(res, 'layout_cover', 'auth/auth_otp_enable',
      {
        props: {
          currentPage: 'login',
          hideSignup: true,
          issuer: process.env.APP_NAME,
        },
        model: {
          hideLogin: user ? true : false,
          showSignout: user ? true : false,
        },
      });
  }
  catch(e) {
    return handleError(e, res);
  };
});

// TwoFA enabling page (2nd step = verify)
authRouter.get("/otp-enable-verify", (req: Request, res: Response) => {
  try {
    const user = res.locals.user;

    if (user?.twoFactorEnabled && !user?.isAuthorized)
      return returnRedirect(res, "/");

    else
      return returnPage(res, 'layout_cover', 'auth/auth_otp_enable_verify',
      {
        props: {
          currentPage: 'login',
          hideSignup: true,
        },
        model: {
          hideLogin: user ? true : false,
          showSignout: user ? true : false,
        },
      });
  }
  catch(e) {
    return handleError(e, res);
  };
});

// TwoFA enabling (by email) page
authRouter.get("/otp-enable-email", (req: Request, res: Response) => {
  try {
    const user = res.locals.user;

    if (user?.twoFactorEnabled && !user?.isAuthorized)
      return returnRedirect(res, "/");

    else
      return returnPage(res, 'layout_cover', 'auth/auth_otp_enable_email',
      {
        props: {
          currentPage: 'login',
          hideSignup: true,
        },
        model: {
          hideLogin: user ? true : false,
          showSignout: user ? true : false,
        },
      });
  }
  catch(e) {
    return handleError(e, res);
  };
});

// TwoFA enabling (by email) page (2nd step = verify)
authRouter.get("/otp-enable-email-verify", (req: Request, res: Response) => {
  try {
    const user = res.locals.user;

    if (user?.twoFactorEnabled && !user?.isAuthorized)
      return returnRedirect(res, "/");

    else
      return returnPage(res, 'layout_cover', 'auth/auth_otp_enable_email_verify',
      {
        props: {
          currentPage: 'login',
          hideSignup: true,
        },
        model: {
          hideLogin: user ? true : false,
          showSignout: user ? true : false,
        },
      });
  }
  catch(e) {
    return handleError(e, res);
  };
});

// TwoFA enabling (by OTP only) API
authRouter.get("/otp-enable-otp-only", async (req: Request, res: Response) => {
  try {
    const user = res.locals.user;

    const dbQuery = await User.update(
      {
        twoFactorEmailOnly: false,
      },
      {
        where: {
          id: user?.id,
        },
      }
    );

    if (Array.isArray(dbQuery) && dbQuery.length > 0 && dbQuery[0] === 1)
      return returnJson(res, {}, sc["202-Accepted"].code);

    else {
      const resetUser = await User.update(
        {
          twoFactorEnabled: false,
          twoFactorEmailOnly: false,
        },
        {
          where: {
            id: user?.id,
          },
        }
      );

      if (Array.isArray(resetUser) && resetUser.length > 0 && resetUser[0] === 1)
        throw new Error(res.locals.language === 0 ?
          "Impossible d'activer l'app OTP, vous devez utiliser les emails" :
          "Unable to activate the OTP app, you must use emails");
      
      else
        throw new Error(res.locals.language === 0 ?
          "Il y a eu un problème dans la désactivation du TwoFA, vous devrez peut-être contacter un administrateur" :
          "There was an issue deactivating TwoFA, you may need to contact an administrator");
    };
  }
  catch(e) {
    return handleError(e, res);
  };
});

// TwoFA enabling (by email only) API
authRouter.get("/otp-enable-email-only", async (req: Request, res: Response) => {
  try {
    const user = res.locals.user;

    const dbQuery = await User.update(
      {
        twoFactorEmailOnly: true,
      },
      {
        where: {
          id: user?.id,
        },
      }
    );

    if (Array.isArray(dbQuery) && dbQuery.length > 0 && dbQuery[0] === 1)
      return returnJson(res, {}, sc["202-Accepted"].code);

    else {
      const resetUser = await User.update(
        {
          twoFactorEnabled: false,
          twoFactorEmailOnly: false,
        },
        {
          where: {
            id: user?.id,
          },
        }
      );

      if (Array.isArray(resetUser) && resetUser.length > 0 && resetUser[0] === 1)
        throw new Error(res.locals.language === 0 ?
          "Impossible d'activer l'envoi de codes par email, vous devez utiliser une app" :
          "Unable to activate email OTP, you must use an app");
      
      else
        throw new Error(res.locals.language === 0 ?
          "Il y a eu un problème dans la désactivation du TwoFA, vous devrez peut-être contacter un administrateur" :
          "There was an issue deactivating TwoFA, you may need to contact an administrator");
    };
  }
  catch(e) {
    return handleError(e, res);
  };
});

/////////////////////////////////////
// TwoFA verification page
authRouter.get("/otp-verify", (req: Request, res: Response) => {
  try {
    const user = res.locals.user;

    if (user?.isAuthorized)
      return returnRedirect(res, "/");

    else
      return returnPage(res, 'layout_cover', 'auth/auth_otp_verify',
      {
        props: {
          currentPage: 'login',
          hideSignup: true,
        },
        model: {
          hideLogin: user ? true : false,
          showSignout: user ? true : false,
        },
      });
  }
  catch(e) {
    return handleError(e, res);
  };
});

// TwoFA verification with backup code
authRouter.get("/otp-verify-code", (req: Request, res: Response) => {
  try {
    const user = res.locals.user;

    if (user?.isAuthorized)
      return returnRedirect(res, "/");

    else
      return returnPage(res, 'layout_cover', 'auth/auth_otp_verify_code',
      {
        props: {
          currentPage: 'login',
          hideSignup: true,
        },
        model: {
          hideLogin: user ? true : false,
          showSignout: user ? true : false,
        },
      });
  }
  catch(e) {
    return handleError(e, res);
  };
});

// TwoFA verification (by email) page
authRouter.get("/otp-verify-email", (req: Request, res: Response) => {
  try {
    const user = res.locals.user;

    if (user?.isAuthorized)
      return returnRedirect(res, "/");

    else
      return returnPage(res, 'layout_cover', 'auth/auth_otp_verify_email',
      {
        props: {
          currentPage: 'login',
          hideSignup: true,
        },
        model: {
          hideLogin: user ? true : false,
          showSignout: user ? true : false,
        },
      });
  }
  catch(e) {
    return handleError(e, res);
  };
});

// TwoFA verification (by email only) page
authRouter.get("/otp-verify-email-only", (req: Request, res: Response) => {
  try {
    const user = res.locals.user;

    if (user?.isAuthorized)
      return returnRedirect(res, "/");

    else
      return returnPage(res, 'layout_cover', 'auth/auth_otp_verify_email',
      {
        props: {
          currentPage: 'login',
          hideSignup: true,
          hideOTPLink: true,
        },
        model: {
          hideLogin: user ? true : false,
          showSignout: user ? true : false,
        },
      });
  }
  catch(e) {
    return handleError(e, res);
  };
});

/////////////////////////////////////
// Signout flow API
authRouter.get("/signout", async (req: Request, res: Response) => {
  try {
    await auth.api.signOut({
      headers: fromNodeHeaders(req.headers),
    });
    return returnRedirect(res, '/', sc["202-Accepted"].code);
  }
  catch(e) {
    return handleError(e, res);
  };
});

//////////////////////
export default authRouter;