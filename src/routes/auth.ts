import { Router, Request, Response } from "express";
import { fromNodeHeaders } from "better-auth/node";
import z from "zod";
import { v4 as uuidv4 } from 'uuid';
import { auth } from "../utils/auth";
import { statusCodes as sc } from "../utils/server/status-codes";
import { ErrorServer, handleError } from "../utils/server/errors";
import { escapeHTML } from "../utils/utils";
import { returnJson, returnPage, returnRedirect } from "../utils/server/responses";
import { User } from "../database/models/User";
import { AdminMessage } from "../database/models/AdminMessage";

/////////////////////////////////////
// Auth pages / API
const authRouter = Router();

/////////////////////////////////////
/////////////////////////////////////
/////////////////////////////////////
// Home page
authRouter.get("/", (req: Request, res: Response) => {
  try {
    const user = res.locals.user;

    // Authorized home page (dashboard)
    if (user?.isAuthorized)
      return returnPage(res, 'layout_dashboard', 'home_logged',
      {
        props: {
          currentPage: 'home'
        },
        model: {
          isAdmin: user ? user.isAdmin : false
        },
      });
    
    // Unauthorized home page (cover)
    else
      return returnPage(res, 'layout_cover', 'home_unlogged',
      {
        props: {
          currentPage: 'home',
        },
        model: {
          isAuthenticated: user?.isAuthenticated,
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
        },
        model: {
          isAuthenticated: user?.isAuthenticated,
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

      else if (!user?.isGoodBoy)
        return returnRedirect(res, "/banned");

      else if (!user?.isApproved)
        return returnRedirect(res, "/approval");

      else if (!user?.isTwoFactorEnabled)
        return returnRedirect(res, "/otp-enable");

      else
        return returnRedirect(res, "/");
    }
    
    else
      return returnPage(res, 'layout_cover', 'auth/auth_login',
      {
        props: {
          currentPage: 'login',
        },
        model: {
          isAuthenticated: user?.isAuthenticated,
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
    const user = res.locals.user;

    return returnPage(res, 'layout_cover', 'auth/auth_password_forgot',
    {
      props: {
        currentPage: 'login',
      },
      model: {
        isAuthenticated: user?.isAuthenticated,
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
    const user = res.locals.user;
    const token = escapeHTML(z.string().nonempty().parse(req.query.token));
    
    return returnPage(res, 'layout_cover', 'auth/auth_password_reset',
    {
      props: {
        currentPage: 'login',
      },
      model: {
        isAuthenticated: user?.isAuthenticated,
        token: token || "",
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
      },
      model: {
        isAuthenticated: user?.isAuthenticated,
        isEmailVerified: user?.isEmailVerified,
      },
    });
  }
  catch(e) {
    return handleError(e, res);
  };
});

// Email verified page (confirmation)
authRouter.get("/email-verified", (req: Request, res: Response) => {
  try {
    const user = res.locals.user;

    return returnPage(res, 'layout_cover', 'auth/auth_email_verification',
    {
      props: {
        currentPage: 'login',
      },
      model: {
        isAuthenticated: user?.isAuthenticated,
        isEmailVerified: true,
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
        },
        model: {
          isAuthenticated: user?.isAuthenticated,
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
    const user = res.locals.user;
    
    if (!user?.isAuthorized)
      return returnRedirect(res, "/");
    
    else
      return returnPage(res, 'layout_cover', 'auth/auth_email_reset',
      {
        props: {
          currentPage: 'login',
        },
        model: {
          isAuthenticated: user?.isAuthenticated,
        },
      });
  }
  catch(e) {
    return handleError(e, res);
  };
});

/////////////////////////////////////
// Approval page
authRouter.get("/approval", (req: Request, res: Response) => {
  try {
    const user = res.locals.user;
    
    if (!user?.isAuthenticated)
      return returnRedirect(res, "/");

    else
      return returnPage(res, 'layout_cover', 'auth/auth_approval',
      {
        props: {
          currentPage: 'login',
        },
        model: {
          isAuthenticated: user?.isAuthenticated,
        },
      });
  }
  catch(e) {
    return handleError(e, res);
  };
});

/////////////////////////////////////
// Banned page
authRouter.get("/banned", (req: Request, res: Response) => {
  try {
    const user = res.locals.user;
    
    if (!user?.banned)
      return returnRedirect(res, "/");

    else
      return returnPage(res, 'layout_cover', 'auth/auth_banned',
      {
        props: {
          currentPage: 'login',
        },
        model: {
          isAuthenticated: user?.isAuthenticated,
        },
      });
  }
  catch(e) {
    return handleError(e, res);
  };
});

/////////////////////////////////////
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
          issuer: process.env.APP_NAME,
        },
        model: {
          isAuthenticated: user?.isAuthenticated,
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
        },
        model: {
          isAuthenticated: user?.isAuthenticated,
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
        },
        model: {
          isAuthenticated: user?.isAuthenticated,
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
        },
        model: {
          isAuthenticated: user?.isAuthenticated,
        },
      });
  }
  catch(e) {
    return handleError(e, res);
  };
});

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
          issuer: process.env.APP_NAME,
        },
        model: {
          isAuthenticated: user?.isAuthenticated,
        },
      });
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
        },
        model: {
          isAuthenticated: user?.isAuthenticated,
        },
      });
  }
  catch(e) {
    return handleError(e, res);
  };
});

// TwoFA verification with backup code page
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
        },
        model: {
          isAuthenticated: user?.isAuthenticated,
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
        },
        model: {
          isAuthenticated: user?.isAuthenticated,
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
          hideOTPLink: true,
        },
        model: {
          isAuthenticated: user?.isAuthenticated,
        },
      });
  }
  catch(e) {
    return handleError(e, res);
  };
});

/////////////////////////////////////
/////////////////////////////////////
/////////////////////////////////////
// TwoFA enabling (by OTP only) API
authRouter.get("/otp-enable-app-only", async (req: Request, res: Response) => {
  try {
    const user = res.locals.user;

    const dbQuery = await User.update(
      {
        twoFactorEmailOnly: false,
      },
      { where: {
        id: user?.id,
      }}
    );

    if (Array.isArray(dbQuery) && dbQuery.length > 0 && dbQuery[0] === 1)
      return returnJson(res, {}, sc["202-Accepted"].code);

    else {
      const resetUser = await User.update(
        {
          twoFactorEnabled: false,
          twoFactorEmailOnly: false,
        },
        { where: {
          id: user?.id,
        }}
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
      { where: {
        id: user?.id,
      }}
    );

    if (Array.isArray(dbQuery) && dbQuery.length > 0 && dbQuery[0] === 1)
      return returnJson(res, {}, sc["202-Accepted"].code);

    else {
      const resetUser = await User.update(
        {
          twoFactorEnabled: false,
          twoFactorEmailOnly: false,
        },
        { where: {
          id: user?.id,
        }}
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

/////////////////////////////////////
/////////////////////////////////////
/////////////////////////////////////
// Contact us page
authRouter.get("/contact-us", (req: Request, res: Response) => {
  try {
    const user = res.locals.user;

    return returnPage(res, 'layout_cover', 'auth/auth_contact_us',
    {
      props: {
        currentPage: 'login',
      },
      model: {
        isAuthenticated: user?.isAuthenticated,
      },
    });
  }
  catch(e) {
    return handleError(e, res);
  };
});

authRouter.post("/contact-us", async (req: Request, res: Response) => {
  try {
    const body = z.object({
      email: z.email(),
      message: z.string().nullable(),
    }).parse(req.body);

    const updBody = {
      //...body,
      id: uuidv4(),
      from: body.email,
      message: body.message,
    };

    const insert = await AdminMessage.upsert(updBody);

    if (Array.isArray(insert) && insert[0] && insert[0].dataValues?.id)
      return returnJson(res, {
        id: insert[0].dataValues.id
      }, sc["201-Created"].code);

    else
      throw new ErrorServer(
        sc["417-Expectation-Failed"].message + '.\n' +
        sc["417-Expectation-Failed"].description,
        sc["417-Expectation-Failed"].code
      );
  }
  catch(e) {
    return handleError(e, res);
  };
});

//////////////////////
export default authRouter;