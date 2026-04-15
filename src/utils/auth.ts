import { Request } from "express";
import { betterAuth, APIError } from "better-auth";
import { isAPIError } from "better-auth/api";
import { twoFactor } from "better-auth/plugins";
import { createAuthMiddleware } from "better-auth/api";
import { createPool } from "mysql2/promise";
import { v4 as uuidv4 } from 'uuid';
import logger from "./logger";
import { sendEmail } from "../utils/email/helpers";
import { BASE_ERROR_CODES_FR } from "../ressources/better-auth-errors";
import { AdminMessage } from "../database/models/AdminMessage";
import { EMAIL_CONTENTS } from "../ressources/better-auth-emails";
import { getLanguageFromRequest } from "../middlewares/language";

export const auth = betterAuth({
  baseURL: process.env.APP_URL_1,
  basePath: "/api/auth",
	trustedOrigins: [
		process.env.APP_URL_1 || 'http://localhost:8080',
		process.env.APP_URL_2 || 'http://127.0.0.1'
	],
  secret: process.env.BETTER_AUTH_SECRET,

	database: createPool({
		host    : process.env.DB_HOST     || '',
		user    : process.env.DB_USERNAME || '',
		password: process.env.DB_PASSWORD || '',
		database: process.env.DB_DATABASE || '',
		timezone: 'Z'
	}),

  emailAndPassword: {
		enabled: true,
		disableSignUp: false,
		autoSignIn: true,
		requireEmailVerification: true,
		minPasswordLength: 8,
		maxPasswordLength: 128,
		resetPasswordTokenExpiresIn: 3600,
		sendResetPassword: async ({ user, url, token }, request) => {
			const language = getLanguageFromRequest(request as unknown as Request);
      void sendEmail({
        to: '"' + user.name + '" <' + user.email + '>',
        subject: EMAIL_CONTENTS.sendResetPassword.subject[language],
        text: EMAIL_CONTENTS.sendResetPassword.text[language](url),
				html: EMAIL_CONTENTS.sendResetPassword.html[language](url),
      });
		},
    onExistingUserSignUp: async ({ user }, request) => {
			const language = getLanguageFromRequest(request as unknown as Request);
      void sendEmail({
        to: '"' + user.name + '" <' + user.email + '>',
        subject: EMAIL_CONTENTS.existingUserSignUp.subject[language],
        text: EMAIL_CONTENTS.existingUserSignUp.text[language],
				html: EMAIL_CONTENTS.existingUserSignUp.html[language],
      });
    },
  },

	emailVerification: {
		sendOnSignUp: true,
		sendOnSignIn: true,
		autoSignInAfterVerification: true,
		expiresIn: 3600,
		sendVerificationEmail: async ({ user, url, token }, request) => {
			url = url.replace('%2Flogin', '%2Femail-verified');
			const language = getLanguageFromRequest(request as unknown as Request);
			void sendEmail({
        to: '"' + user.name + '" <' + user.email + '>',
        subject: EMAIL_CONTENTS.sendVerificationEmail.subject[language],
        text: EMAIL_CONTENTS.sendVerificationEmail.text[language](url),
				html: EMAIL_CONTENTS.sendVerificationEmail.html[language](url),
      });
		},
	},

  plugins: [
		twoFactor({
			issuer: process.env.APP_NAME,
      otpOptions: {
				async sendOTP({ user, otp }, ctx) {
					try {
						const language = getLanguageFromRequest(ctx?.request as unknown as Request);
						void sendEmail({
							to: '"' + user.name + '" <' + user.email + '>',
							subject: EMAIL_CONTENTS.sendOTP.subject[language],
							text: EMAIL_CONTENTS.sendOTP.text[language](otp),
							html: EMAIL_CONTENTS.sendOTP.html[language](otp),
						});
					} catch(e) {
						throw(e);
					};
				},
			},
    }),
  ],

	user: {
		changeEmail: {
			enabled: true,
			sendChangeEmailConfirmation: async ({ user, newEmail, url, token }, request) => {
				const language = getLanguageFromRequest(request as unknown as Request);
				void sendEmail({
					to: '"' + user.name + '" <' + user.email + '>',
					subject: EMAIL_CONTENTS.sendChangeEmailConfirmation.subject[language],
					text: EMAIL_CONTENTS.sendChangeEmailConfirmation.text[language](newEmail, url),
					html: EMAIL_CONTENTS.sendChangeEmailConfirmation.html[language](newEmail, url),
				});
			},
		},
		additionalFields: {
			role: {
        type: ["user", "admin"],
        required: false,
        defaultValue: "user",
        input: false,
      },
			twoFactorEmailOnly: {
				type: "boolean",
        required: false,
        defaultValue: false,
				input: false,
			},
			approved: {
				type: "boolean",
        required: false,
				defaultValue: false,
				input: false,
			},
			banned: {
				type: "boolean",
        required: false,
        defaultValue: false,
				input: false,
			},
		}
	},

	rateLimit: {
		enabled: true,
		window: 10, // time window in seconds
		max: 100,
		storage: "memory", //"database",
		//modelName: "rateLimit",
	},
	advanced: {
		useSecureCookies: true,
		defaultCookieAttributes: {
			httpOnly: true,
			sameSite: 'strict',
			secure: true,
		},
		cookiePrefix: process.env.APP_NAME,
	},

	logger: {
		disabled: false,
		disableColors: false,
		level: "debug",
		log: (level, message, ...args) => {
			if (level === "error")
				logger.error(`[${level}] ${message}`, ...args);
			else if (level === "warn")
				logger.warn( `[${level}] ${message}`, ...args);
			else if (level === "info")
				logger.info( `[${level}] ${message}`, ...args);
			else if (level === "debug")
				logger.debug(`[${level}] ${message}`, ...args);
		},
	},
	
	hooks: {
		before: createAuthMiddleware(async (ctx) => {
			// Execute before processing the request
			logger.debug("------------- [Auth Hooks] BEFORE starts -------------");
			logger.debug("Request path: " + ctx.path);
			logger.debug("Request body:", ctx.body || { body: null });
			logger.debug("------------- [Auth Hooks] BEFORE ends -------------");
		}),

		after: createAuthMiddleware(async (ctx) => {
			// Execute after processing the request
			logger.debug("------------- [Auth Hooks] AFTER starts -------------");
			logger.debug("Response:", ctx.context.returned || { response: null });
			logger.debug("------------- [Auth Hooks] AFTER ends -------------");
			
			if (process.env.BETTER_AUTH_FORCE_APPROVAL && ctx.path === '/sign-up/email') {
				try {
					const insert = await AdminMessage.upsert({
						id: uuidv4(),
						from: '"' + ctx.body.name + '" <' + ctx.body.email + '>',
						message: "New subscription approval!",
					});
					const language = getLanguageFromRequest(ctx?.request as unknown as Request);
					void sendEmail({
						to: '"' + ctx.body.name + '" <' + ctx.body.email + '>',
						subject: EMAIL_CONTENTS.userApprovalConfirmation.subject[language],
						text: EMAIL_CONTENTS.userApprovalConfirmation.text[language],
						html: EMAIL_CONTENTS.userApprovalConfirmation.html[language],
					});
				}
				catch(e) {
					throw e;
				};
			};

			const error = ctx.context.returned;
			
			if (isAPIError(error)) {
				throw new APIError(
					// @ts-ignore
					error.status,
					{
						// @ts-ignore
						...error.body,
						// @ts-ignore
						message: [BASE_ERROR_CODES_FR[error.body?.code] || error.message, error.message]
					}
				);
			};
		}),
	},
});