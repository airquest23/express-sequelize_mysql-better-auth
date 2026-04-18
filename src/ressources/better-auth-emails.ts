export const EMAIL_CONTENTS = {
  sendResetPassword: {
    subject: [
      "Reset your password",
      "Réinitialiser votre mot de passe"
    ],
    text: [
      (url: string) => `Copy paste this link in your browser to reset your password:\n\n${url}`,
      (url: string) => `Copiez-collez ce lien dans votre navigateur pour réinitialiser votre mot de passe :\n\n${url}`
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
      (url: string) => `
        <p style="margin-top: 5px; margin-bottom: 5px;">
          Cliquez sur le lien ci-dessous pour réinitialiser votre mot de passe :
        </p>
        <p>
          <a href="${url}" target="_blank" rel="noopener noreferrer">
            Réinitialiser mon mot de passe
          </a>
        </p>
      `
    ],
  },
  
  existingUserSignUp: {
    subject: [
      "Sign-up attempt with your email",
      "Tentative d'inscription avec votre adresse email"
    ],
    text: [
      "Someone tried to create an account using your email address.\nIf this was you, try signing in instead. If not, you can safely ignore this email.",
      "Quelqu'un a essayé de créer un compte en utilisant votre adresse email.\nSi c'était vous, essayez plutôt de vous connecter. Sinon, vous pouvez ignorer cet email."
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
      `
        <p style="margin-top: 5px; margin-bottom: 5px;">
          Quelqu'un a essayé de créer un compte en utilisant votre adresse email.
        </p>
        <p>
          Si c'était vous, essayez de vous connecter. Sinon, vous pouvez ignorer cet email.
        </p>
      `
    ],
  },

  sendVerificationEmail: {
    subject: [
      "Verify your email",
      "Vérifiez votre adresse email"
    ],
    text: [
      (url: string) => `Copy paste this link in your browser to verify your email:\n\n${url}`,
      (url: string) => `Copiez-collez ce lien dans votre navigateur pour vérifier votre adresse email :\n\n${url}`
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
      (url: string) => `
        <p style="margin-top: 5px; margin-bottom: 5px;">
          Cliquez sur le lien ci-dessous pour vérifier votre adresse email :
        </p>
        <p>
          <a href="${url}" target="_blank" rel="noopener noreferrer">
            Vérifier mon adresse email
          </a>
        </p>
      `
    ],
  },

  sendOTP: {
    subject: [
      "Here is your one-time password",
      "Voici votre mot de passe à usage unique"
    ],
    text: [
      (otp: string) => `Copy paste this one-time password to log-in:\n${otp}`,
      (otp: string) => `Copiez-collez ce mot de passe à usage unique pour vous connecter :\n${otp}`
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
      (otp: string) => `
        <p style="margin-top: 5px; margin-bottom: 5px;">
          Copiez-collez ce mot de passe à usage unique pour vous connecter :
        </p>
        <p>
          ${otp}
        </p>
      `
    ],
  },

  sendChangeEmailConfirmation: {
    subject: [
      "Approve email change",
      "Approuver le changement d'adresse email"
    ],
    text: [
      (newEmail: string, url: string) => `Copy paste this link in your browser to approve the change to ${newEmail}:\n\n${url}`,
      (newEmail: string, url: string) => `Copiez-collez ce lien dans votre navigateur pour approuver le changement vers ${newEmail} :\n\n${url}`
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
      (newEmail: string, url: string) => `
        <p style="margin-top: 5px; margin-bottom: 5px;">
          Cliquez sur le lien ci-dessous pour approuver le changement vers ${newEmail} :
        </p>
        <p>
          <a href="${url}" target="_blank" rel="noopener noreferrer">
            Changer mon adresse email pour ${newEmail}
          </a>
        </p>
      `
    ],
  },

  userApprovalConfirmation: {
    subject: [
      "Approval",
      "Approbation"
    ],
    text: [
      "You need to be approved, you will be contacted soon.\nThanks for your subscription.",
      "Vous devez être approuvé, vous serez contacté prochainement.\nMerci pour votre inscription."
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
      `
        <p style="margin-top: 5px; margin-bottom: 5px;">
          Vous devez être approuvé, vous serez contacté prochainement.
        </p>
        <p>
          Merci pour votre inscription.
        </p>
      `
    ],
  },
} as const;

/*export const EMAIL_CONTENTS = {
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
} as const;*/