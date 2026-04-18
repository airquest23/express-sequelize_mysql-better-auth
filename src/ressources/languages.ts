export const ressources: { [key: string]: string[] } = {
  ///////////////////////////////////////
  // Errors client-side
  errorEmail: [
    'Email manquant ou invalide (min. 3 caractères; max. 40)',
    'Email missing or malformed (min. 3 chars; max. 40)'
  ],
  errorEmailVerification: [
    'L’email n’a pas été vérifié ; merci de consulter votre messagerie !',
    'Your email is not verified ; please check your inbox !'
  ],
  successEmailVerification: [
    'L’email a bien été vérifié ; vous pouvez vous logguer !',
    'Your email has correctly been verified ; you can now login !'
  ],
  errorPassword: [
    'Mot de passe manquant ou invalide (min. 8 caractères; max. 40)',
    'Password missing or malformed (min. 8 chars; max. 40)'
  ],
  errorApproval: [
    'Vous devez être approuvé ; merci de consulter votre messagerie ou contactez-nous par email !',
    'You need to be approved ; please check your inbox or contact-us by email !'
  ],
  errorBanned: [
    'Vous avez été banni, demandez-vous pourquoi :-) !',
    'You have been banned, ask yourself why :-) !'
  ],
  errorOtp: [
    'Code à 6 chiffres manquant ou invalide (min./max. 6 chiffres)',
    'One-time password missing or malformed (min./max. 6 numbers)'
  ],
  errorOtpCode: [
    'Code manquant ou invalide (min./max. 11 caractères)',
    'Code missing or malformed (min./max. 11 chars)'
  ],
  errorName: [
    'Nom manquant ou invalide (min. 3 caractères; max. 40)',
    'Name missing or malformed (min. 3 chars; max. 40)'
  ],
  errorGreaterThan0: [
    'La valeur doit être supérieure à 0',
    'Value must be greater than 0'
  ],
  errorOnlyOneObject: [
    'Merci de ne sélectionner qu’un seul objet',
    'Please select only one object'
  ],
  errorSelectionEmpty: [
    'Merci de sélectionner un objet',
    'Please select one object'
  ],
  errorResponse: [
    'Erreur dans la réponse',
    'Error in response'
  ],
  errorQrCode: [
    'Erreur dans le QR code',
    'Error in QR code'
  ],
  errorBackupCodes: [
    'Erreur dans les codes de secours',
    'Error in backup codes'
  ],
  
  ///////////////////////////////////////
  ///////////////////////////////////////
  // Global
  appName: [
    process.env.APP_NAME || "",
    process.env.APP_NAME || ""
  ],
  appSlogan: [
    'Bienvenue !',
    'Welcome !'
  ],
  home: [
    'Accueil',
    'Home'
  ],
  learnMore: [
    'En savoir plus',
    'Learn more'
  ],
  dashboard: [
    'Tableau de bord',
    'Dashboard'
  ],
  settings: [
    'Paramètres',
    'Settings'
  ],
  signOut: [
    'Déconnexion',
    'Signout'
  ],
  signUp: [
    'Inscription',
    'Signup'
  ],
  search: [
    'Recherche',
    'Search'
  ],
  success: [
    'Succès',
    'Success'
  ],
  error: [
    'Erreur',
    'Error'
  ],
  objectsDeletion: [
    'Suppression d’objets',
    'Objects deletion'
  ],
  areYouSure: [
    'Êtes-vous sûr(e) ?',
    'Are you sure ?'
  ],

  ///////////////////////////////////////
  ///////////////////////////////////////
  // Layouts
  toggleMenuDesktop: [
    'Ouvrir/fermer menu (desktop)',
    'Toggle menu (desktop)'
  ],
  toggleMenuMobile: [
    'Ouvrir/fermer menu (mobile)',
    'Toggle menu (mobile)'
  ],

  ///////////////////////////////////////
  ///////////////////////////////////////
  // Users
  pleaseSubscribe: [
    'Inscription : entrez un nom, e-mail et mot de passe',
    'Subscription : enter a name, email and password'
  ],
  enterEmail: [
    'Entrez votre adresse e-mail',
    'Enter your email address'
  ],
  email: [
    'Adresse e-mail',
    'Email address'
  ],
  newEmail: [
    'Nouvelle adresse e-mail',
    'New email address'
  ],
  password: [
    'Mot de passe',
    'Password'
  ],
  newPassword: [
    'Nouveau mot de passe',
    'New password'
  ],
  name: [
    'Nom',
    'Name'
  ],
  otp: [
    'Code à 6 chiffres',
    'One-time password'
  ],
  rememberMe: [
    'Se souvenir de moi',
    'Remember me'
  ],
  username: [
    'Nom d’utilisateur',
    'Username'
  ],
  firstname: [
    'Prénom',
    'Firstname'
  ],
  lastname: [
    'Nom',
    'Lastname'
  ],
  login: [
    'Connexion',
    'Login'
  ],
  subscribe: [
    'S’inscrire',
    'Subscribe'
  ],
  reinit: [
    'Réinitialiser',
    'Reinit'
  ],
  activate: [
    'Activer',
    'Activate'
  ],
  deactivate: [
    'Désactiver',
    'Deactivate'
  ],
  verify: [
    'Vérifier',
    'Verify'
  ],
  passwordForgot: [
    'J’ai oublié mon mot de passe',
    'I forgot my password'
  ],
  sendEmail: [
    'Envoyez-moi un email',
    'Send me an email'
  ],
  resendEmail: [
    'Renvoyez-moi un email',
    'Resend me an email'
  ],
  send: [
    'Envoyer',
    'Send'
  ],
  backLogin: [
    'Revenir au login',
    'Back to login'
  ],
  otpEnable: [
    'Nous devons activer votre accès OTP, merci de ré-entrer votre mot de passe',
    'We must validate your OTP access, please re-enter your password'
  ],
  otpDisable: [
    'Désactivation de l’accès OTP, merci de ré-entrer votre mot de passe',
    'Deactivation of your OTP access, please re-enter your password'
  ],
  otpEnableEmail: [
    'Je confirme que je souhaite uniquement l’envoi de codes par email',
    'I confirm I only want to receive OTP codes by email'
  ],
  otpVerifyAfterEnable: [
    'Merci, maintenant validez votre accès OTP dans l’app avec le QR code ci-dessous et entrez un code',
    'Thanks, now validate your OTP access in your app with the QR code below and enter a code'
  ],
  otpVerify: [
    'Entrez votre code à 6 chiffres',
    'Please enter your one-time password'
  ],
  otpVerifyEmail: [
    'Entrez votre code à 6 chiffres reçu par email',
    'Please enter your one-time password sent by email'
  ],
  trustDevice: [
    'Ne plus demander pour cet appareil',
    'Trust this device'
  ],
  backupCodes: [
    'Voici vos codes de récupération, gardez-les en lieu sûr:',
    'Here are your backup codes, keep them in a precious place:'
  ],
  otpCodesUse: [
    "Je souhaite utiliser un code de récupération",
    "I would like to use a recovery code"
  ],
  otpCodeVerify: [
    "Entrez votre code de récupération",
    "Please enter your recovery code"
  ],
  otpCode: [
    "Code (format: 12345-12345)",
    "Code (format: 12345-12345)"
  ],
  otpSendMeEmail: [
    'Je n’ai pas mon application OTP, envoyez-moi un email',
    'I don’t have my OTP app, please send me an email'
  ],
  backToOtp: [
    'Revenir à l’authentification avec l’app',
    'Back to authentication with OTP app'
  ],
  switchOtpToEmailOnly: [
    'Je ne veux pas utiliser une app OTP, je préfère l’envoi de codes par email',
    'I don’t want to use an OTP app, I’d rather only receive codes by email'
  ],
  switchOtpToApp: [
    'Je souhaite utiliser mon app OTP, merci de revenir à l’enregistrement de l’app',
    'I want to use my OTP app, please take me back to app registration'
  ],
  
  ///////////////////////////////////////
  ///////////////////////////////////////
  // Profile
  userDetails: [
    'Données utilisateur',
    'User details'
  ],
  userActions: [
    'Actions utilisateur',
    'User actions'
  ],
  userActionRemoveStorage: [
    'Supprimer toutes les données locales stockées',
    'Remove all local storage data'
  ],
  userTwoFaTitle: [
    'Authentification à deux facteurs',
    'Two factors authentication'
  ],
  userTwoFaActivateSwitch: [
    'Activer l’authentification à deux facteurs',
    'Activate the two factors authentication'
  ],
  userTwoFaForcedWarning: [
    'L’authentification à deux facteurs est obligatoire pour cette app',
    'Two factors authentication is mandatory for this app'
  ],
  userTwoFaActivateOTP: [
    'S’authentifier avec une app',
    'Authenticate with an app'
  ],
  userTwoFaActivateEmail: [
    'S’authentifier avec l’email uniquement',
    'Authenticate with email only'
  ],
  passwordChangeTitle: [
    'Modification du mot de passe',
    'Password change'
  ],
  passwordChangeText: [
    'Cliquez sur le bouton ci-dessous pour recevoir un lien par email et changer de mot de passe',
    'Click the button below to receive an email link and change your password'
  ],
  passwordChangeConfirmation: [
    'Si cette adresse e-mail figure dans notre système, vérifiez votre boîte de réception pour trouver le lien de réinitialisation',
    'If this email exists in our system, check your email for the reset link'
  ],
  emailChangeTitle: [
    'Modification de l’email',
    'Email change'
  ],
  emailChangeText: [
    'Cliquez sur le bouton ci-dessous pour être redirigé vers une page et changer d’email',
    'Click the button below to be redirected to a page and change your email address'
  ],
  emailChangeButton: [
    'Modifier mon email',
    'Modify my email'
  ],
  emailResetConfirmation: [
    'Succès! Vous avez reçu un email pour approuver',
    'Success! You received an email to approve'
  ],
  modify: [
    'Modifier',
    'Modify'
  ],
  
  ///////////////////////////////////////
  ///////////////////////////////////////
  // Profile texts
  otpSwitchToEnable: [
    "Entrez votre mot de passe pour activer l'app OTP",
    "Enter your password to activate the OTP app"
  ],
  otpCodesGenerateBtn: [
    "Générer de nouveaux codes",
    "Generate new codes"
  ],
  otpCodesGenerate: [
    "Entrez votre mot de passe pour générer de nouveaux codes",
    "Enter your password to generate new codes"
  ],
  generate: [
    "Générer",
    "Generate"
  ],

  ///////////////////////////////////////
  ///////////////////////////////////////
  // Texts
  texts: [
    'Textes',
    'Texts'
  ],
  richTexts: [
    'Textes riches',
    'Rich texts'
  ],
  all: [
    'Tout',
    'all'
  ],
  page: [
    'Page',
    'Page'
  ],
  pageNoCap: [
    'page',
    'page'
  ],
  firstPage: [
    'Première page',
    'First page'
  ],
  lastPage: [
    'Dernière page',
    'Last page'
  ],
  previousPage: [
    'Page précédente',
    'Previous page'
  ],
  nextPage: [
    'Page suivante',
    'Next page'
  ],
  lines: [
    'Lignes',
    'Lines'
  ],
  linesPerPage: [
    'lignes / page',
    'rows / page'
  ],
  perPage: [
    '/ page',
    '/ page'
  ],
  objects: [
    'Objets',
    'Objects'
  ],
  objectsNoCap: [
    'objets',
    'objects'
  ],
  to: [
    'à',
    'to'
  ],
  of: [
    'de',
    'of'
  ],
  max: [
    'max',
    'max'
  ],
  readMore: [
    '(...)',
    '(...)'
  ],

  ///////////////////////////////////////
  ///////////////////////////////////////
  // Fields
  text: [
    'Texte',
    'Text'
  ],
  textNoCap: [
    'texte',
    'text'
  ],
  creationDate: [
    'Date de création',
    'Creation date'
  ],
  modificationDate: [
    'Date de modification',
    'Modification date'
  ],

  ///////////////////////////////////////
  ///////////////////////////////////////
  // Buttons
  back: [
    'Retour',
    'Back'
  ],
  refresh: [
    'Rafraîchir',
    'Refresh'
  ],
  apply: [
    'Appliquer',
    'Apply'
  ],
  new: [
    'Nouveau',
    'New'
  ],
  edit: [
    'Éditer',
    'Edit'
  ],
  editLabel: [
    'Édition de',
    'Edit'
  ],
  remove: [
    'Enlever',
    'Remove'
  ],
  delete: [
    'Supprimer',
    'Delete'
  ],
  save: [
    'Enregistrer',
    'Save'
  ],
  save2: [
    'Sauvegarder',
    'Save'
  ],
  saveAndClose: [
    'Enregistrer et fermer',
    'Save and close'
  ],
  close: [
    'Fermer',
    'Close'
  ],
  cancel: [
    'Annuler',
    'Cancel'
  ],
  ok: [
    'Ok',
    'OK'
  ],
  sort: [
    'Trier',
    'Sort'
  ],
  hide: [
    'Cacher',
    'Hide'
  ],
  resizeCols: [
    'Redimensionner les colonnes',
    'Resize columns'
  ],
  reorderCols: [
    'Ordonner les colonnes',
    'Resize columns'
  ],
  clearSelection: [
    'Effacer la sélection',
    'Clear selection'
  ],
  selectAll: [
    'Sélectionner tout',
    'Select all'
  ],
  resetPagination: [
    'Réinitialiser la pagination',
    'Reset pagination'
  ],
  resetCols: [
    'Réinitialiser les colonnes',
    'Reset columns'
  ],
  gridView: [
    'Vue grille',
    'Grid view'
  ],
  listView: [
    'Vue liste',
    'List view'
  ],

  ///////////////////////////////////////
  ///////////////////////////////////////
  // Contact us
  contactUs: [
    'Contactez-nous',
    'Contact us'
  ],
  message: [
    'Message',
    'Message'
  ],

  ///////////////////////////////////////
  ///////////////////////////////////////
  // Admin
  admin: [
    'Admin',
    'Admin'
  ],
  from: [
    'De',
    'From'
  ],

  ///////////////////////////////////////
  ///////////////////////////////////////
  // Theme
  toggleTheme: [
    'Slectionnez le thème',
    'Toggle theme'
  ],
  dark: [
    'Sombre',
    'Dark'
  ],
  light: [
    'Clair',
    'Light'
  ],
  auto: [
    'Auto',
    'Auto'
  ],

} as const;