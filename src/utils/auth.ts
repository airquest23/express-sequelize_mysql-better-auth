import { betterAuth, APIError } from "better-auth";
import { isAPIError } from "better-auth/api";
import { twoFactor } from "better-auth/plugins";
import { createAuthMiddleware } from "better-auth/api";
import { createPool } from "mysql2/promise";
import logger from "./logger";
import { sendEmail } from "../utils/email/helpers";
import { BASE_ERROR_CODES_FR } from "../ressources/better-auth-errors";

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
      void sendEmail({
        to: '"' + user.name + '" <' + user.email + '>',
        subject: "Reset your password",
        text: `Copy paste this link in your browser to reset your password:\n\n${url}`,
				html: `
					<p style="margin-top: 5px; margin-bottom: 5px;">
						Click the link below to reset your password:
					</p>
					<p>
						<a href="${url}" target="_blank" rel="noopener noreferrer">
							Reset my password
						</a>
					</p>
				`,
      });
		},
    onExistingUserSignUp: async ({ user }, request) => {
      void sendEmail({
        to: '"' + user.name + '" <' + user.email + '>',
        subject: "Sign-up attempt with your email",
        text: "Someone tried to create an account using your email address. If this was you, try signing in instead. If not, you can safely ignore this email.",
				html: `
					<p style="margin-top: 5px; margin-bottom: 5px;">
						Someone tried to create an account using your email address.
					</p>
					<p>
						If this was you, try signing in instead. If not, you can safely ignore this email.
					</p>
				`,
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
			void sendEmail({
        to: '"' + user.name + '" <' + user.email + '>',
        subject: "Verify your email",
        text: `Copy paste this link in your browser to verify your email:\n\n${url}`,
				html: `
					<p style="margin-top: 5px; margin-bottom: 5px;">
						Click the link below to verify your email:
					</p>
					<p>
						<a href="${url}" target="_blank" rel="noopener noreferrer">
							Verify my email
						</a>
					</p>
				`,
      });
		},
	},
  plugins: [
		twoFactor({
			issuer: process.env.APP_NAME,
      otpOptions: {
				async sendOTP({ user, otp }, ctx) {
					void sendEmail({
						to: '"' + user.name + '" <' + user.email + '>',
						subject: "Here is your one-time password",
						text: `Copy paste this one-time password to log-in:\n${otp}`,
						html: `
							<p style="margin-top: 5px; margin-bottom: 5px;">
								Copy paste this one-time password to log-in:
							</p>
							<p>
								${otp}
							</p>
						`,
					});
				},
			},
    }),
  ],
	user: {
		changeEmail: {
			enabled: true,
			sendChangeEmailConfirmation: async ({ user, newEmail, url, token }, request) => { 
				void sendEmail({
					to: '"' + user.name + '" <' + user.email + '>',
					subject: 'Approve email change',
					text: `Copy paste this link in your browser to approve the change to ${newEmail}:\n\n${url}`,
					html: `
						<p style="margin-top: 5px; margin-bottom: 5px;">
							Click the link below to approve the change to ${newEmail}:
						</p>
						<p>
							<a href="${url}" target="_blank" rel="noopener noreferrer">
								Reset my email to ${newEmail}
							</a>
						</p>
					`,
				})
			}
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
			
			const error = ctx.context.returned;
			if (isAPIError(error)) {
				throw new APIError(
					// @ts-ignore
					error.status, { ...error.body, message: [BASE_ERROR_CODES_FR[error.body?.code], error.message] }
				);
			};
		}),
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
});