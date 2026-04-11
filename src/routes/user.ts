import { Router, Request, Response } from "express";
import z from "zod";
import { handleError } from "../utils/server/errors";
import { returnJson, returnPage } from "../utils/server/responses";
import { auth } from "../utils/auth";
import { parseDBObject } from "../utils/utils";

/////////////////////////////////////
// User pages / API
const userRouter = Router();

/////////////////////////////////////
/////////////////////////////////////
/////////////////////////////////////
// User settings page
userRouter.get("/", async (req: Request, res: Response) => {
  try {
    const user = res.locals.user;

    let backupCodes: string[] = [];
    if (user.twoFactorEnabled && !user.twoFactorEmailOnly) {
      const b = await auth.api.viewBackupCodes({ body: { userId: user.id } });
      if (b.status) backupCodes = b.backupCodes;
    };
    console.log(backupCodes);

    return returnPage(res, 'layout_dashboard', 'user/user_settings',
    {
      props: {
        currentPage: 'settings',
        forceEnableTwoFa: process.env.BETTER_AUTH_FORCE_ENABLE_TWOFA,
      },
      model: {
        name: user.name,
        email: user.email,
        twoFactorEnabled: user.twoFactorEnabled,
        twoFactorEmailOnly: user.twoFactorEmailOnly,
        backupCodes: parseDBObject(backupCodes) || "", //JSON.stringify(backupCodes),
        isAdmin: user ? user.isAdmin : false,
      },
    });
  }
  catch(e) {
    return handleError(e, res);
  };
});

// User TwoFA enabling page (switch to app OTP)
userRouter.get("/otp-enable", (req: Request, res: Response) => {
  try {
    const user = res.locals.user;

    return returnPage(res, 'layout_cover', 'auth/auth_otp_enable',
    {
      props: {
        currentPage: 'login',
        isAuth: true,
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

// User TwoFA enabling (by email) page (switch to email OTP)
userRouter.get("/otp-enable-email", (req: Request, res: Response) => {
  try {
    const user = res.locals.user;

    return returnPage(res, 'layout_cover', 'auth/auth_otp_enable_email',
    {
      props: {
        currentPage: 'login',
        isAuth: true,
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

// User TwoFA generate codes page
userRouter.get("/otp-codes-generate", (req: Request, res: Response) => {
  try {
    const user = res.locals.user;

    return returnPage(res, 'layout_cover', 'auth/auth_otp_codes_generate',
    {
      props: {
        currentPage: 'login',
        isAuth: true,
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
// User TwoFA updating API
userRouter.post("/update-twofa", (req: Request, res: Response) => {
  try {
    const body = z.object({
      twoFactorEnabled: z.boolean(),
      twoFactorOTP: z.boolean(),
      twoFactorEmail: z.boolean()
    }).parse(req.body);

    const user = res.locals.user;
    const language = res.locals.language;

    // Enable / disable OTP only available if env variable is false
    if (!process.env.BETTER_AUTH_FORCE_ENABLE_TWOFA) {
      // User wants to deactivate OTP
      if (user.twoFactorEnabled && !body.twoFactorEnabled) {
        return returnJson(res, {
          message: language === 0 ?
            "Vous avez changé vos paramètres (désactivation de l'OTP), vous allez être redirigé" :
            "You have changed your settings (OTP disactivation), you will be redirected",
          redirect: '/otp-disable'
        });
      };
      
      // User wants to activate OTP
      if (!user.twoFactorEnabled && body.twoFactorEnabled) {
        return returnJson(res, {
          message: language === 0 ?
            "Vous avez changé vos paramètres (activation de l'OTP), vous allez être redirigé" :
            "You have changed your settings (OTP activation), you will be redirected",
          redirect: '/otp-enable',
        });
      }
    };

    // User was using email only and wants to use OTP app
    if (user.twoFactorEmailOnly && !body.twoFactorEmail && body.twoFactorOTP) {
      return returnJson(res, {
        message: language === 0 ?
          "Vous avez changé vos paramètres (activation de l'app OTP), vous allez être redirigé" :
          "You have changed your settings (OTP app activation), you will be redirected",
        redirect: '/user/otp-enable'
      });
    };

    // User was using OTP app and wants to use email only
    if (!user.twoFactorEmailOnly && body.twoFactorEmail && !body.twoFactorOTP) {
      return returnJson(res, {
        message: language === 0 ?
          "Vous avez changé vos paramètres (activation des codes par email), vous allez être redirigé" :
          "You have changed your settings (OTP codes sent by email), you will be redirected",
        redirect: '/user/otp-enable-email'
      });
    };

    // No modification
    return returnJson(res, {
      message: language === 0 ?
        "Aucune modification n'a été apportée" :
        "No changes have been made",
    });
  }
  catch(e) {
    return handleError(e, res);
  };
});

//////////////////////
export default userRouter;