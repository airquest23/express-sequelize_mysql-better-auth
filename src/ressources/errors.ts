export const errors: { [key: string]: string[] } = {
  errorUsersNotFound: [
    'Utilisateur inconnu',
    'User not found'
  ],
  errorPasswordNotFound: [
    'Mot de passe inconnu',
    'Password not found'
  ],
  errorObjectNotFound: [
    "Objet inconnu",
    "Object not found"
  ],
  errorAccountExists: [
    'Le compte existe déjà',
    'The account already exists'
  ],
  errorIdNotUuid: [
    "Requête invalide ('id' doit être un UUID)",
    "Invalid request ('id' must be an UUID)"
  ],
  errorItemsNotArray: [
    "Requête invalide ('items' doit être une liste d'objets)",
    "Invalid request ('items' must be an array of objects)"
  ],
  errorGetNoRight: [
    'Requête rejetée (pas de droit d\'accès à ce contenu)',
    'Rejected request (no right to access this content)'
  ],
  errorUpdateNoRight: [
    'Requête rejetée (pas de droit d\'édition de ce contenu)',
    'Rejected request (no right to update this content)'
  ],
  errorDeleteNoRight: [
    'Requête rejetée (pas de droit de suppression de ce contenu)',
    'Rejected request (no right to delete this content)'
  ],
} as const;