export const EMAIL_CONTENTS = {
  sendResetPassword: {
    subject: [
      "Reset your password",
      "..."
    ],
    text: [
      (url: string) => `Copy paste this link in your browser to reset your password:\n\n${url}`,
      (url: string) => `...`
    ],
    html: [
      (url: string) => `
        <p style="margin-top: 5px; margin-bottom: 5px;">
          Click the link below to reset your password:
        </p>
        <p>
          <a href="${url}" target="_blank" rel="noopener noreferrer">
            Reset my password
          </a>
        </p>
      `,
      (url: string) => `...`
    ],
  },
  
  existingUserSignUp: {
    subject: [
      "Sign-up attempt with your email",
      "..."
    ],
    text: [
      "Someone tried to create an account using your email address.\nIf this was you, try signing in instead. If not, you can safely ignore this email.",
      "..."
    ],
    html: [
      `
        <p style="margin-top: 5px; margin-bottom: 5px;">
          Someone tried to create an account using your email address.
        </p>
        <p>
          If this was you, try signing in instead. If not, you can safely ignore this email.
        </p>
      `,
      `...`
    ],
  },

  sendVerificationEmail: {
    subject: [
      "Verify your email",
      "..."
    ],
    text: [
      (url: string) => `Copy paste this link in your browser to verify your email:\n\n${url}`,
      (url: string) => `...`
    ],
    html: [
      (url: string) => `
        <p style="margin-top: 5px; margin-bottom: 5px;">
          Click the link below to verify your email:
        </p>
        <p>
          <a href="${url}" target="_blank" rel="noopener noreferrer">
            Verify my email
          </a>
        </p>
      `,
      (url: string) => `...`
    ],
  },

  sendOTP: {
    subject: [
      "Here is your one-time password",
      "..."
    ],
    text: [
      (otp: string) => `Copy paste this one-time password to log-in:\n${otp}`,
      (otp: string) => `...`
    ],
    html: [
      (otp: string) => `
        <p style="margin-top: 5px; margin-bottom: 5px;">
          Copy paste this one-time password to log-in:
        </p>
        <p>
          ${otp}
        </p>
      `,
      (otp: string) => `...`
    ],
  },

  sendChangeEmailConfirmation: {
    subject: [
      "Approve email change",
      "..."
    ],
    text: [
      (newEmail: string, url: string) => `Copy paste this link in your browser to approve the change to ${newEmail}:\n\n${url}`,
      (newEmail: string, url: string) => `...`
    ],
    html: [
      (newEmail: string, url: string) => `
        <p style="margin-top: 5px; margin-bottom: 5px;">
          Click the link below to approve the change to ${newEmail}:
        </p>
        <p>
          <a href="${url}" target="_blank" rel="noopener noreferrer">
            Reset my email to ${newEmail}
          </a>
        </p>
      `,
      (newEmail: string, url: string) => `...`
    ],
  },

  userApprovalConfirmation: {
    subject: [
      "Approval",
      "..."
    ],
    text: [
      "You need to be approved, you will be contacted soon.\nThanks for your subscription.",
      "..."
    ],
    html: [
      `
        <p style="margin-top: 5px; margin-bottom: 5px;">
          You need to be approved, you will be contacted soon.
        </p>
        <p>
          Thanks for your subscription.
        </p>
      `,
      `...`
    ],
  },
} as const;