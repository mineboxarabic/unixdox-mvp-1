import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const UserScalarFieldEnumSchema = z.enum(['id','name','image','email','emailVerified','googleId','password','dateInscription','createdAt','updatedAt']);

export const DocumentScalarFieldEnumSchema = z.enum(['id','idProprietaire','nomFichier','urlStockage','type','statut','tags','dateUpload','size','createdAt','updatedAt','dossierIds']);

export const DossierScalarFieldEnumSchema = z.enum(['id','idProprietaire','nom','idsDocuments','couleur','icone','createdAt','updatedAt']);

export const ModeleDemarcheScalarFieldEnumSchema = z.enum(['id','titre','description','typesDocumentsRequis','categorie','actif','ordre','createdAt','updatedAt']);

export const DemarcheUtilisateurScalarFieldEnumSchema = z.enum(['id','idUtilisateur','idModele','complete','dateDebut','dateCompletion','statut','notes','createdAt','updatedAt']);

export const NotificationScalarFieldEnumSchema = z.enum(['id','idUser','type','message','idDocumentLie','lu','dateCreation','priorite','createdAt','updatedAt']);

export const AccountScalarFieldEnumSchema = z.enum(['id','userId','type','provider','providerAccountId','refresh_token','access_token','expires_at','token_type','scope','id_token','session_state']);

export const SessionScalarFieldEnumSchema = z.enum(['id','sessionToken','userId','expires']);

export const VerificationTokenScalarFieldEnumSchema = z.enum(['id','identifier','token','expires']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const DocumentTypeSchema = z.enum(['FACTURE','CONTRAT','CARTE_IDENTITE','PASSEPORT','JUSTIFICATIF_DOMICILE','ACTE_NAISSANCE','ACTE_MARIAGE','DIPLOME','ATTESTATION_TRAVAIL','FICHE_PAIE','RELEVE_BANCAIRE','ASSURANCE','PERMIS_CONDUIRE','CARTE_VITALE','AUTRE']);

export type DocumentTypeType = `${z.infer<typeof DocumentTypeSchema>}`

export const DocumentStatutSchema = z.enum(['VERIFIE','EN_ATTENTE','EXPIRE','REFUSE']);

export type DocumentStatutType = `${z.infer<typeof DocumentStatutSchema>}`

export const NotificationTypeSchema = z.enum(['EXPIRATION','RAPPEL','INFO','ALERTE']);

export type NotificationTypeType = `${z.infer<typeof NotificationTypeSchema>}`

export const NotificationPrioriteSchema = z.enum(['BASSE','NORMALE','HAUTE']);

export type NotificationPrioriteType = `${z.infer<typeof NotificationPrioriteSchema>}`

export const DemarcheStatutSchema = z.enum(['EN_COURS','COMPLETE','ABANDONNEE']);

export type DemarcheStatutType = `${z.infer<typeof DemarcheStatutSchema>}`

export const DemarcheCategorieSchema = z.enum(['ADMINISTRATIF','FINANCIER','JURIDIQUE','PERSONNEL','AUTRE']);

export type DemarcheCategorieType = `${z.infer<typeof DemarcheCategorieSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  image: z.string().nullable(),
  email: z.string().nullable(),
  emailVerified: z.coerce.date().nullable(),
  googleId: z.string().nullable(),
  password: z.string().nullable(),
  dateInscription: z.coerce.date(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// DOCUMENT SCHEMA
/////////////////////////////////////////

export const DocumentSchema = z.object({
  type: DocumentTypeSchema,
  statut: DocumentStatutSchema,
  id: z.string(),
  idProprietaire: z.string(),
  nomFichier: z.string(),
  urlStockage: z.string().nullable(),
  tags: z.string().array(),
  dateUpload: z.coerce.date(),
  size: z.number().int(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  dossierIds: z.string().array(),
})

export type Document = z.infer<typeof DocumentSchema>

/////////////////////////////////////////
// DOSSIER SCHEMA
/////////////////////////////////////////

export const DossierSchema = z.object({
  id: z.string(),
  idProprietaire: z.string(),
  nom: z.string(),
  idsDocuments: z.string().array(),
  couleur: z.string(),
  icone: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Dossier = z.infer<typeof DossierSchema>

/////////////////////////////////////////
// MODELE DEMARCHE SCHEMA
/////////////////////////////////////////

export const ModeleDemarcheSchema = z.object({
  categorie: DemarcheCategorieSchema,
  id: z.string(),
  titre: z.string(),
  description: z.string().nullable(),
  typesDocumentsRequis: z.string().array(),
  actif: z.boolean(),
  ordre: z.number().int(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type ModeleDemarche = z.infer<typeof ModeleDemarcheSchema>

/////////////////////////////////////////
// DEMARCHE UTILISATEUR SCHEMA
/////////////////////////////////////////

export const DemarcheUtilisateurSchema = z.object({
  statut: DemarcheStatutSchema,
  id: z.string(),
  idUtilisateur: z.string(),
  idModele: z.string(),
  complete: z.boolean(),
  dateDebut: z.coerce.date(),
  dateCompletion: z.coerce.date().nullable(),
  notes: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type DemarcheUtilisateur = z.infer<typeof DemarcheUtilisateurSchema>

/////////////////////////////////////////
// NOTIFICATION SCHEMA
/////////////////////////////////////////

export const NotificationSchema = z.object({
  type: NotificationTypeSchema,
  priorite: NotificationPrioriteSchema,
  id: z.string(),
  idUser: z.string(),
  message: z.string(),
  idDocumentLie: z.string().nullable(),
  lu: z.boolean(),
  dateCreation: z.coerce.date(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Notification = z.infer<typeof NotificationSchema>

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

export const AccountSchema = z.object({
  id: z.string(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().nullable(),
  access_token: z.string().nullable(),
  expires_at: z.number().int().nullable(),
  token_type: z.string().nullable(),
  scope: z.string().nullable(),
  id_token: z.string().nullable(),
  session_state: z.string().nullable(),
})

export type Account = z.infer<typeof AccountSchema>

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
  id: z.string(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date(),
})

export type Session = z.infer<typeof SessionSchema>

/////////////////////////////////////////
// VERIFICATION TOKEN SCHEMA
/////////////////////////////////////////

export const VerificationTokenSchema = z.object({
  id: z.string(),
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date(),
})

export type VerificationToken = z.infer<typeof VerificationTokenSchema>

/////////////////////////////////////////
// COMPOSITE TYPES
/////////////////////////////////////////
// USER PREFERENCES
//------------------------------------------------------


/////////////////////////////////////////
// USER PREFERENCES SCHEMA
/////////////////////////////////////////

export const UserPreferencesSchema = z.object({
  notifications: z.boolean(),
  language: z.string(),
})

export type UserPreferences = z.infer<typeof UserPreferencesSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
}).strict();

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  documents: z.boolean().optional(),
  dossiers: z.boolean().optional(),
  demarchesUtilisateur: z.boolean().optional(),
  notifications: z.boolean().optional(),
  accounts: z.boolean().optional(),
  sessions: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  image: z.boolean().optional(),
  email: z.boolean().optional(),
  emailVerified: z.boolean().optional(),
  googleId: z.boolean().optional(),
  password: z.boolean().optional(),
  dateInscription: z.boolean().optional(),
  preferences: z.union([z.boolean(),z.lazy(() => UserPreferencesArgsSchema)]).optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  documents: z.union([z.boolean(),z.lazy(() => DocumentArgsSchema)]).optional(),
  dossiers: z.union([z.boolean(),z.lazy(() => DossierArgsSchema)]).optional(),
  demarchesUtilisateur: z.union([z.boolean(),z.lazy(() => DemarcheUtilisateurArgsSchema)]).optional(),
  notifications: z.union([z.boolean(),z.lazy(() => NotificationArgsSchema)]).optional(),
  accounts: z.union([z.boolean(),z.lazy(() => AccountArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// DOCUMENT
//------------------------------------------------------

export const DocumentIncludeSchema: z.ZodType<Prisma.DocumentInclude> = z.object({
}).strict();

export const DocumentArgsSchema: z.ZodType<Prisma.DocumentDefaultArgs> = z.object({
  select: z.lazy(() => DocumentSelectSchema).optional(),
  include: z.lazy(() => DocumentIncludeSchema).optional(),
}).strict();

export const DocumentCountOutputTypeArgsSchema: z.ZodType<Prisma.DocumentCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => DocumentCountOutputTypeSelectSchema).nullish(),
}).strict();

export const DocumentCountOutputTypeSelectSchema: z.ZodType<Prisma.DocumentCountOutputTypeSelect> = z.object({
  dossiers: z.boolean().optional(),
  notifications: z.boolean().optional(),
}).strict();

export const DocumentSelectSchema: z.ZodType<Prisma.DocumentSelect> = z.object({
  id: z.boolean().optional(),
  idProprietaire: z.boolean().optional(),
  nomFichier: z.boolean().optional(),
  urlStockage: z.boolean().optional(),
  type: z.boolean().optional(),
  statut: z.boolean().optional(),
  tags: z.boolean().optional(),
  dateUpload: z.boolean().optional(),
  size: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  dossierIds: z.boolean().optional(),
  proprietaire: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  dossiers: z.union([z.boolean(),z.lazy(() => DossierArgsSchema)]).optional(),
  notifications: z.union([z.boolean(),z.lazy(() => NotificationArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => DocumentCountOutputTypeArgsSchema)]).optional(),
}).strict()

// DOSSIER
//------------------------------------------------------

export const DossierIncludeSchema: z.ZodType<Prisma.DossierInclude> = z.object({
}).strict();

export const DossierArgsSchema: z.ZodType<Prisma.DossierDefaultArgs> = z.object({
  select: z.lazy(() => DossierSelectSchema).optional(),
  include: z.lazy(() => DossierIncludeSchema).optional(),
}).strict();

export const DossierCountOutputTypeArgsSchema: z.ZodType<Prisma.DossierCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => DossierCountOutputTypeSelectSchema).nullish(),
}).strict();

export const DossierCountOutputTypeSelectSchema: z.ZodType<Prisma.DossierCountOutputTypeSelect> = z.object({
  documents: z.boolean().optional(),
}).strict();

export const DossierSelectSchema: z.ZodType<Prisma.DossierSelect> = z.object({
  id: z.boolean().optional(),
  idProprietaire: z.boolean().optional(),
  nom: z.boolean().optional(),
  idsDocuments: z.boolean().optional(),
  couleur: z.boolean().optional(),
  icone: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  proprietaire: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  documents: z.union([z.boolean(),z.lazy(() => DocumentArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => DossierCountOutputTypeArgsSchema)]).optional(),
}).strict()

// MODELE DEMARCHE
//------------------------------------------------------

export const ModeleDemarcheIncludeSchema: z.ZodType<Prisma.ModeleDemarcheInclude> = z.object({
}).strict();

export const ModeleDemarcheArgsSchema: z.ZodType<Prisma.ModeleDemarcheDefaultArgs> = z.object({
  select: z.lazy(() => ModeleDemarcheSelectSchema).optional(),
  include: z.lazy(() => ModeleDemarcheIncludeSchema).optional(),
}).strict();

export const ModeleDemarcheCountOutputTypeArgsSchema: z.ZodType<Prisma.ModeleDemarcheCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ModeleDemarcheCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ModeleDemarcheCountOutputTypeSelectSchema: z.ZodType<Prisma.ModeleDemarcheCountOutputTypeSelect> = z.object({
  demarchesUtilisateur: z.boolean().optional(),
}).strict();

export const ModeleDemarcheSelectSchema: z.ZodType<Prisma.ModeleDemarcheSelect> = z.object({
  id: z.boolean().optional(),
  titre: z.boolean().optional(),
  description: z.boolean().optional(),
  typesDocumentsRequis: z.boolean().optional(),
  categorie: z.boolean().optional(),
  actif: z.boolean().optional(),
  ordre: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  demarchesUtilisateur: z.union([z.boolean(),z.lazy(() => DemarcheUtilisateurArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ModeleDemarcheCountOutputTypeArgsSchema)]).optional(),
}).strict()

// DEMARCHE UTILISATEUR
//------------------------------------------------------

export const DemarcheUtilisateurIncludeSchema: z.ZodType<Prisma.DemarcheUtilisateurInclude> = z.object({
}).strict();

export const DemarcheUtilisateurArgsSchema: z.ZodType<Prisma.DemarcheUtilisateurDefaultArgs> = z.object({
  select: z.lazy(() => DemarcheUtilisateurSelectSchema).optional(),
  include: z.lazy(() => DemarcheUtilisateurIncludeSchema).optional(),
}).strict();

export const DemarcheUtilisateurSelectSchema: z.ZodType<Prisma.DemarcheUtilisateurSelect> = z.object({
  id: z.boolean().optional(),
  idUtilisateur: z.boolean().optional(),
  idModele: z.boolean().optional(),
  complete: z.boolean().optional(),
  dateDebut: z.boolean().optional(),
  dateCompletion: z.boolean().optional(),
  statut: z.boolean().optional(),
  notes: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  utilisateur: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  modele: z.union([z.boolean(),z.lazy(() => ModeleDemarcheArgsSchema)]).optional(),
}).strict()

// NOTIFICATION
//------------------------------------------------------

export const NotificationIncludeSchema: z.ZodType<Prisma.NotificationInclude> = z.object({
}).strict();

export const NotificationArgsSchema: z.ZodType<Prisma.NotificationDefaultArgs> = z.object({
  select: z.lazy(() => NotificationSelectSchema).optional(),
  include: z.lazy(() => NotificationIncludeSchema).optional(),
}).strict();

export const NotificationSelectSchema: z.ZodType<Prisma.NotificationSelect> = z.object({
  id: z.boolean().optional(),
  idUser: z.boolean().optional(),
  type: z.boolean().optional(),
  message: z.boolean().optional(),
  idDocumentLie: z.boolean().optional(),
  lu: z.boolean().optional(),
  dateCreation: z.boolean().optional(),
  priorite: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  documentLie: z.union([z.boolean(),z.lazy(() => DocumentArgsSchema)]).optional(),
}).strict()

// ACCOUNT
//------------------------------------------------------

export const AccountIncludeSchema: z.ZodType<Prisma.AccountInclude> = z.object({
}).strict();

export const AccountArgsSchema: z.ZodType<Prisma.AccountDefaultArgs> = z.object({
  select: z.lazy(() => AccountSelectSchema).optional(),
  include: z.lazy(() => AccountIncludeSchema).optional(),
}).strict();

export const AccountSelectSchema: z.ZodType<Prisma.AccountSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  type: z.boolean().optional(),
  provider: z.boolean().optional(),
  providerAccountId: z.boolean().optional(),
  refresh_token: z.boolean().optional(),
  access_token: z.boolean().optional(),
  expires_at: z.boolean().optional(),
  token_type: z.boolean().optional(),
  scope: z.boolean().optional(),
  id_token: z.boolean().optional(),
  session_state: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// SESSION
//------------------------------------------------------

export const SessionIncludeSchema: z.ZodType<Prisma.SessionInclude> = z.object({
}).strict();

export const SessionArgsSchema: z.ZodType<Prisma.SessionDefaultArgs> = z.object({
  select: z.lazy(() => SessionSelectSchema).optional(),
  include: z.lazy(() => SessionIncludeSchema).optional(),
}).strict();

export const SessionSelectSchema: z.ZodType<Prisma.SessionSelect> = z.object({
  id: z.boolean().optional(),
  sessionToken: z.boolean().optional(),
  userId: z.boolean().optional(),
  expires: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// VERIFICATION TOKEN
//------------------------------------------------------

export const VerificationTokenArgsSchema: z.ZodType<Prisma.VerificationTokenDefaultArgs> = z.object({
  select: z.lazy(() => VerificationTokenSelectSchema).optional(),
}).strict();

export const VerificationTokenSelectSchema: z.ZodType<Prisma.VerificationTokenSelect> = z.object({
  id: z.boolean().optional(),
  identifier: z.boolean().optional(),
  token: z.boolean().optional(),
  expires: z.boolean().optional(),
}).strict()

// USER PREFERENCES
//------------------------------------------------------

export const UserPreferencesArgsSchema: z.ZodType<Prisma.UserPreferencesDefaultArgs> = z.object({
  select: z.lazy(() => UserPreferencesSelectSchema).optional(),
}).strict();

export const UserPreferencesSelectSchema: z.ZodType<Prisma.UserPreferencesSelect> = z.object({
  notifications: z.boolean().optional(),
  language: z.boolean().optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  googleId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  dateInscription: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  preferences: z.union([ z.lazy(() => UserPreferencesNullableCompositeFilterSchema), z.lazy(() => UserPreferencesObjectEqualityInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  documents: z.lazy(() => DocumentListRelationFilterSchema).optional(),
  dossiers: z.lazy(() => DossierListRelationFilterSchema).optional(),
  demarchesUtilisateur: z.lazy(() => DemarcheUtilisateurListRelationFilterSchema).optional(),
  notifications: z.lazy(() => NotificationListRelationFilterSchema).optional(),
  accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
});

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  googleId: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  dateInscription: z.lazy(() => SortOrderSchema).optional(),
  preferences: z.lazy(() => UserPreferencesOrderByInputSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  documents: z.lazy(() => DocumentOrderByRelationAggregateInputSchema).optional(),
  dossiers: z.lazy(() => DossierOrderByRelationAggregateInputSchema).optional(),
  demarchesUtilisateur: z.lazy(() => DemarcheUtilisateurOrderByRelationAggregateInputSchema).optional(),
  notifications: z.lazy(() => NotificationOrderByRelationAggregateInputSchema).optional(),
  accounts: z.lazy(() => AccountOrderByRelationAggregateInputSchema).optional(),
  sessions: z.lazy(() => SessionOrderByRelationAggregateInputSchema).optional(),
});

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    email: z.string(),
    googleId: z.string(),
  }),
  z.object({
    id: z.string(),
    email: z.string(),
  }),
  z.object({
    id: z.string(),
    googleId: z.string(),
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    email: z.string(),
    googleId: z.string(),
  }),
  z.object({
    email: z.string(),
  }),
  z.object({
    googleId: z.string(),
  }),
])
.and(z.strictObject({
  id: z.string().optional(),
  email: z.string().optional(),
  googleId: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  dateInscription: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  preferences: z.union([ z.lazy(() => UserPreferencesNullableCompositeFilterSchema), z.lazy(() => UserPreferencesObjectEqualityInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  documents: z.lazy(() => DocumentListRelationFilterSchema).optional(),
  dossiers: z.lazy(() => DossierListRelationFilterSchema).optional(),
  demarchesUtilisateur: z.lazy(() => DemarcheUtilisateurListRelationFilterSchema).optional(),
  notifications: z.lazy(() => NotificationListRelationFilterSchema).optional(),
  accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
}));

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  googleId: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  dateInscription: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
});

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema), z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema), z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.coerce.date() ]).optional().nullable(),
  googleId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  dateInscription: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
});

export const DocumentWhereInputSchema: z.ZodType<Prisma.DocumentWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => DocumentWhereInputSchema), z.lazy(() => DocumentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DocumentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DocumentWhereInputSchema), z.lazy(() => DocumentWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  idProprietaire: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  nomFichier: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  urlStockage: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  type: z.union([ z.lazy(() => EnumDocumentTypeFilterSchema), z.lazy(() => DocumentTypeSchema) ]).optional(),
  statut: z.union([ z.lazy(() => EnumDocumentStatutFilterSchema), z.lazy(() => DocumentStatutSchema) ]).optional(),
  tags: z.lazy(() => StringNullableListFilterSchema).optional(),
  dateUpload: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  size: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  dossierIds: z.lazy(() => StringNullableListFilterSchema).optional(),
  proprietaire: z.union([ z.lazy(() => UserRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
  dossiers: z.lazy(() => DossierListRelationFilterSchema).optional(),
  notifications: z.lazy(() => NotificationListRelationFilterSchema).optional(),
});

export const DocumentOrderByWithRelationInputSchema: z.ZodType<Prisma.DocumentOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  idProprietaire: z.lazy(() => SortOrderSchema).optional(),
  nomFichier: z.lazy(() => SortOrderSchema).optional(),
  urlStockage: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  statut: z.lazy(() => SortOrderSchema).optional(),
  tags: z.lazy(() => SortOrderSchema).optional(),
  dateUpload: z.lazy(() => SortOrderSchema).optional(),
  size: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  dossierIds: z.lazy(() => SortOrderSchema).optional(),
  proprietaire: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  dossiers: z.lazy(() => DossierOrderByRelationAggregateInputSchema).optional(),
  notifications: z.lazy(() => NotificationOrderByRelationAggregateInputSchema).optional(),
});

export const DocumentWhereUniqueInputSchema: z.ZodType<Prisma.DocumentWhereUniqueInput> = z.object({
  id: z.string(),
})
.and(z.strictObject({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => DocumentWhereInputSchema), z.lazy(() => DocumentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DocumentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DocumentWhereInputSchema), z.lazy(() => DocumentWhereInputSchema).array() ]).optional(),
  idProprietaire: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  nomFichier: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  urlStockage: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  type: z.union([ z.lazy(() => EnumDocumentTypeFilterSchema), z.lazy(() => DocumentTypeSchema) ]).optional(),
  statut: z.union([ z.lazy(() => EnumDocumentStatutFilterSchema), z.lazy(() => DocumentStatutSchema) ]).optional(),
  tags: z.lazy(() => StringNullableListFilterSchema).optional(),
  dateUpload: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  size: z.union([ z.lazy(() => IntFilterSchema), z.number().int() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  dossierIds: z.lazy(() => StringNullableListFilterSchema).optional(),
  proprietaire: z.union([ z.lazy(() => UserRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
  dossiers: z.lazy(() => DossierListRelationFilterSchema).optional(),
  notifications: z.lazy(() => NotificationListRelationFilterSchema).optional(),
}));

export const DocumentOrderByWithAggregationInputSchema: z.ZodType<Prisma.DocumentOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  idProprietaire: z.lazy(() => SortOrderSchema).optional(),
  nomFichier: z.lazy(() => SortOrderSchema).optional(),
  urlStockage: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  statut: z.lazy(() => SortOrderSchema).optional(),
  tags: z.lazy(() => SortOrderSchema).optional(),
  dateUpload: z.lazy(() => SortOrderSchema).optional(),
  size: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  dossierIds: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => DocumentCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => DocumentAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => DocumentMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => DocumentMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => DocumentSumOrderByAggregateInputSchema).optional(),
});

export const DocumentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.DocumentScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => DocumentScalarWhereWithAggregatesInputSchema), z.lazy(() => DocumentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => DocumentScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DocumentScalarWhereWithAggregatesInputSchema), z.lazy(() => DocumentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  idProprietaire: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  nomFichier: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  urlStockage: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  type: z.union([ z.lazy(() => EnumDocumentTypeWithAggregatesFilterSchema), z.lazy(() => DocumentTypeSchema) ]).optional(),
  statut: z.union([ z.lazy(() => EnumDocumentStatutWithAggregatesFilterSchema), z.lazy(() => DocumentStatutSchema) ]).optional(),
  tags: z.lazy(() => StringNullableListFilterSchema).optional(),
  dateUpload: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  size: z.union([ z.lazy(() => IntWithAggregatesFilterSchema), z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  dossierIds: z.lazy(() => StringNullableListFilterSchema).optional(),
});

export const DossierWhereInputSchema: z.ZodType<Prisma.DossierWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => DossierWhereInputSchema), z.lazy(() => DossierWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DossierWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DossierWhereInputSchema), z.lazy(() => DossierWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  idProprietaire: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  nom: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  idsDocuments: z.lazy(() => StringNullableListFilterSchema).optional(),
  couleur: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  icone: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  proprietaire: z.union([ z.lazy(() => UserRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
  documents: z.lazy(() => DocumentListRelationFilterSchema).optional(),
});

export const DossierOrderByWithRelationInputSchema: z.ZodType<Prisma.DossierOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  idProprietaire: z.lazy(() => SortOrderSchema).optional(),
  nom: z.lazy(() => SortOrderSchema).optional(),
  idsDocuments: z.lazy(() => SortOrderSchema).optional(),
  couleur: z.lazy(() => SortOrderSchema).optional(),
  icone: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  proprietaire: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  documents: z.lazy(() => DocumentOrderByRelationAggregateInputSchema).optional(),
});

export const DossierWhereUniqueInputSchema: z.ZodType<Prisma.DossierWhereUniqueInput> = z.object({
  id: z.string(),
})
.and(z.strictObject({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => DossierWhereInputSchema), z.lazy(() => DossierWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DossierWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DossierWhereInputSchema), z.lazy(() => DossierWhereInputSchema).array() ]).optional(),
  idProprietaire: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  nom: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  idsDocuments: z.lazy(() => StringNullableListFilterSchema).optional(),
  couleur: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  icone: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  proprietaire: z.union([ z.lazy(() => UserRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
  documents: z.lazy(() => DocumentListRelationFilterSchema).optional(),
}));

export const DossierOrderByWithAggregationInputSchema: z.ZodType<Prisma.DossierOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  idProprietaire: z.lazy(() => SortOrderSchema).optional(),
  nom: z.lazy(() => SortOrderSchema).optional(),
  idsDocuments: z.lazy(() => SortOrderSchema).optional(),
  couleur: z.lazy(() => SortOrderSchema).optional(),
  icone: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => DossierCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => DossierMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => DossierMinOrderByAggregateInputSchema).optional(),
});

export const DossierScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.DossierScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => DossierScalarWhereWithAggregatesInputSchema), z.lazy(() => DossierScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => DossierScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DossierScalarWhereWithAggregatesInputSchema), z.lazy(() => DossierScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  idProprietaire: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  nom: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  idsDocuments: z.lazy(() => StringNullableListFilterSchema).optional(),
  couleur: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  icone: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
});

export const ModeleDemarcheWhereInputSchema: z.ZodType<Prisma.ModeleDemarcheWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => ModeleDemarcheWhereInputSchema), z.lazy(() => ModeleDemarcheWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ModeleDemarcheWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ModeleDemarcheWhereInputSchema), z.lazy(() => ModeleDemarcheWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  titre: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  typesDocumentsRequis: z.lazy(() => StringNullableListFilterSchema).optional(),
  categorie: z.union([ z.lazy(() => EnumDemarcheCategorieFilterSchema), z.lazy(() => DemarcheCategorieSchema) ]).optional(),
  actif: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  ordre: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  demarchesUtilisateur: z.lazy(() => DemarcheUtilisateurListRelationFilterSchema).optional(),
});

export const ModeleDemarcheOrderByWithRelationInputSchema: z.ZodType<Prisma.ModeleDemarcheOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  titre: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  typesDocumentsRequis: z.lazy(() => SortOrderSchema).optional(),
  categorie: z.lazy(() => SortOrderSchema).optional(),
  actif: z.lazy(() => SortOrderSchema).optional(),
  ordre: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  demarchesUtilisateur: z.lazy(() => DemarcheUtilisateurOrderByRelationAggregateInputSchema).optional(),
});

export const ModeleDemarcheWhereUniqueInputSchema: z.ZodType<Prisma.ModeleDemarcheWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    titre: z.string(),
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    titre: z.string(),
  }),
])
.and(z.strictObject({
  id: z.string().optional(),
  titre: z.string().optional(),
  AND: z.union([ z.lazy(() => ModeleDemarcheWhereInputSchema), z.lazy(() => ModeleDemarcheWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ModeleDemarcheWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ModeleDemarcheWhereInputSchema), z.lazy(() => ModeleDemarcheWhereInputSchema).array() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  typesDocumentsRequis: z.lazy(() => StringNullableListFilterSchema).optional(),
  categorie: z.union([ z.lazy(() => EnumDemarcheCategorieFilterSchema), z.lazy(() => DemarcheCategorieSchema) ]).optional(),
  actif: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  ordre: z.union([ z.lazy(() => IntFilterSchema), z.number().int() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  demarchesUtilisateur: z.lazy(() => DemarcheUtilisateurListRelationFilterSchema).optional(),
}));

export const ModeleDemarcheOrderByWithAggregationInputSchema: z.ZodType<Prisma.ModeleDemarcheOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  titre: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  typesDocumentsRequis: z.lazy(() => SortOrderSchema).optional(),
  categorie: z.lazy(() => SortOrderSchema).optional(),
  actif: z.lazy(() => SortOrderSchema).optional(),
  ordre: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ModeleDemarcheCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ModeleDemarcheAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ModeleDemarcheMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ModeleDemarcheMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ModeleDemarcheSumOrderByAggregateInputSchema).optional(),
});

export const ModeleDemarcheScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ModeleDemarcheScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => ModeleDemarcheScalarWhereWithAggregatesInputSchema), z.lazy(() => ModeleDemarcheScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ModeleDemarcheScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ModeleDemarcheScalarWhereWithAggregatesInputSchema), z.lazy(() => ModeleDemarcheScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  titre: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  typesDocumentsRequis: z.lazy(() => StringNullableListFilterSchema).optional(),
  categorie: z.union([ z.lazy(() => EnumDemarcheCategorieWithAggregatesFilterSchema), z.lazy(() => DemarcheCategorieSchema) ]).optional(),
  actif: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean() ]).optional(),
  ordre: z.union([ z.lazy(() => IntWithAggregatesFilterSchema), z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
});

export const DemarcheUtilisateurWhereInputSchema: z.ZodType<Prisma.DemarcheUtilisateurWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => DemarcheUtilisateurWhereInputSchema), z.lazy(() => DemarcheUtilisateurWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DemarcheUtilisateurWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DemarcheUtilisateurWhereInputSchema), z.lazy(() => DemarcheUtilisateurWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  idUtilisateur: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  idModele: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  complete: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  dateDebut: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  dateCompletion: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  statut: z.union([ z.lazy(() => EnumDemarcheStatutFilterSchema), z.lazy(() => DemarcheStatutSchema) ]).optional(),
  notes: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  utilisateur: z.union([ z.lazy(() => UserRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
  modele: z.union([ z.lazy(() => ModeleDemarcheRelationFilterSchema), z.lazy(() => ModeleDemarcheWhereInputSchema) ]).optional(),
});

export const DemarcheUtilisateurOrderByWithRelationInputSchema: z.ZodType<Prisma.DemarcheUtilisateurOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  idUtilisateur: z.lazy(() => SortOrderSchema).optional(),
  idModele: z.lazy(() => SortOrderSchema).optional(),
  complete: z.lazy(() => SortOrderSchema).optional(),
  dateDebut: z.lazy(() => SortOrderSchema).optional(),
  dateCompletion: z.lazy(() => SortOrderSchema).optional(),
  statut: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  utilisateur: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  modele: z.lazy(() => ModeleDemarcheOrderByWithRelationInputSchema).optional(),
});

export const DemarcheUtilisateurWhereUniqueInputSchema: z.ZodType<Prisma.DemarcheUtilisateurWhereUniqueInput> = z.object({
  id: z.string(),
})
.and(z.strictObject({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => DemarcheUtilisateurWhereInputSchema), z.lazy(() => DemarcheUtilisateurWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DemarcheUtilisateurWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DemarcheUtilisateurWhereInputSchema), z.lazy(() => DemarcheUtilisateurWhereInputSchema).array() ]).optional(),
  idUtilisateur: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  idModele: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  complete: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  dateDebut: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  dateCompletion: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  statut: z.union([ z.lazy(() => EnumDemarcheStatutFilterSchema), z.lazy(() => DemarcheStatutSchema) ]).optional(),
  notes: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  utilisateur: z.union([ z.lazy(() => UserRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
  modele: z.union([ z.lazy(() => ModeleDemarcheRelationFilterSchema), z.lazy(() => ModeleDemarcheWhereInputSchema) ]).optional(),
}));

export const DemarcheUtilisateurOrderByWithAggregationInputSchema: z.ZodType<Prisma.DemarcheUtilisateurOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  idUtilisateur: z.lazy(() => SortOrderSchema).optional(),
  idModele: z.lazy(() => SortOrderSchema).optional(),
  complete: z.lazy(() => SortOrderSchema).optional(),
  dateDebut: z.lazy(() => SortOrderSchema).optional(),
  dateCompletion: z.lazy(() => SortOrderSchema).optional(),
  statut: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => DemarcheUtilisateurCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => DemarcheUtilisateurMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => DemarcheUtilisateurMinOrderByAggregateInputSchema).optional(),
});

export const DemarcheUtilisateurScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.DemarcheUtilisateurScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => DemarcheUtilisateurScalarWhereWithAggregatesInputSchema), z.lazy(() => DemarcheUtilisateurScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => DemarcheUtilisateurScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DemarcheUtilisateurScalarWhereWithAggregatesInputSchema), z.lazy(() => DemarcheUtilisateurScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  idUtilisateur: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  idModele: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  complete: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean() ]).optional(),
  dateDebut: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  dateCompletion: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.coerce.date() ]).optional().nullable(),
  statut: z.union([ z.lazy(() => EnumDemarcheStatutWithAggregatesFilterSchema), z.lazy(() => DemarcheStatutSchema) ]).optional(),
  notes: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
});

export const NotificationWhereInputSchema: z.ZodType<Prisma.NotificationWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => NotificationWhereInputSchema), z.lazy(() => NotificationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => NotificationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NotificationWhereInputSchema), z.lazy(() => NotificationWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  idUser: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumNotificationTypeFilterSchema), z.lazy(() => NotificationTypeSchema) ]).optional(),
  message: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  idDocumentLie: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  lu: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  dateCreation: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  priorite: z.union([ z.lazy(() => EnumNotificationPrioriteFilterSchema), z.lazy(() => NotificationPrioriteSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
  documentLie: z.union([ z.lazy(() => DocumentNullableRelationFilterSchema), z.lazy(() => DocumentWhereInputSchema) ]).optional().nullable(),
});

export const NotificationOrderByWithRelationInputSchema: z.ZodType<Prisma.NotificationOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  idUser: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  message: z.lazy(() => SortOrderSchema).optional(),
  idDocumentLie: z.lazy(() => SortOrderSchema).optional(),
  lu: z.lazy(() => SortOrderSchema).optional(),
  dateCreation: z.lazy(() => SortOrderSchema).optional(),
  priorite: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  documentLie: z.lazy(() => DocumentOrderByWithRelationInputSchema).optional(),
});

export const NotificationWhereUniqueInputSchema: z.ZodType<Prisma.NotificationWhereUniqueInput> = z.object({
  id: z.string(),
})
.and(z.strictObject({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => NotificationWhereInputSchema), z.lazy(() => NotificationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => NotificationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NotificationWhereInputSchema), z.lazy(() => NotificationWhereInputSchema).array() ]).optional(),
  idUser: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumNotificationTypeFilterSchema), z.lazy(() => NotificationTypeSchema) ]).optional(),
  message: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  idDocumentLie: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  lu: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  dateCreation: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  priorite: z.union([ z.lazy(() => EnumNotificationPrioriteFilterSchema), z.lazy(() => NotificationPrioriteSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
  documentLie: z.union([ z.lazy(() => DocumentNullableRelationFilterSchema), z.lazy(() => DocumentWhereInputSchema) ]).optional().nullable(),
}));

export const NotificationOrderByWithAggregationInputSchema: z.ZodType<Prisma.NotificationOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  idUser: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  message: z.lazy(() => SortOrderSchema).optional(),
  idDocumentLie: z.lazy(() => SortOrderSchema).optional(),
  lu: z.lazy(() => SortOrderSchema).optional(),
  dateCreation: z.lazy(() => SortOrderSchema).optional(),
  priorite: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => NotificationCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => NotificationMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => NotificationMinOrderByAggregateInputSchema).optional(),
});

export const NotificationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.NotificationScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => NotificationScalarWhereWithAggregatesInputSchema), z.lazy(() => NotificationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => NotificationScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NotificationScalarWhereWithAggregatesInputSchema), z.lazy(() => NotificationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  idUser: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumNotificationTypeWithAggregatesFilterSchema), z.lazy(() => NotificationTypeSchema) ]).optional(),
  message: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  idDocumentLie: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  lu: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean() ]).optional(),
  dateCreation: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  priorite: z.union([ z.lazy(() => EnumNotificationPrioriteWithAggregatesFilterSchema), z.lazy(() => NotificationPrioriteSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
});

export const AccountWhereInputSchema: z.ZodType<Prisma.AccountWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => AccountWhereInputSchema), z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountWhereInputSchema), z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema), z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
});

export const AccountOrderByWithRelationInputSchema: z.ZodType<Prisma.AccountOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
});

export const AccountWhereUniqueInputSchema: z.ZodType<Prisma.AccountWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    provider_providerAccountId: z.lazy(() => AccountProviderProviderAccountIdCompoundUniqueInputSchema),
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    provider_providerAccountId: z.lazy(() => AccountProviderProviderAccountIdCompoundUniqueInputSchema),
  }),
])
.and(z.strictObject({
  id: z.string().optional(),
  provider_providerAccountId: z.lazy(() => AccountProviderProviderAccountIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => AccountWhereInputSchema), z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountWhereInputSchema), z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema), z.number().int() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
}));

export const AccountOrderByWithAggregationInputSchema: z.ZodType<Prisma.AccountOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AccountCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AccountAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AccountMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AccountMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AccountSumOrderByAggregateInputSchema).optional(),
});

export const AccountScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AccountScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema), z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema), z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema), z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
});

export const SessionWhereInputSchema: z.ZodType<Prisma.SessionWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => SessionWhereInputSchema), z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema), z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
});

export const SessionOrderByWithRelationInputSchema: z.ZodType<Prisma.SessionOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
});

export const SessionWhereUniqueInputSchema: z.ZodType<Prisma.SessionWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    sessionToken: z.string(),
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    sessionToken: z.string(),
  }),
])
.and(z.strictObject({
  id: z.string().optional(),
  sessionToken: z.string().optional(),
  AND: z.union([ z.lazy(() => SessionWhereInputSchema), z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema), z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
}));

export const SessionOrderByWithAggregationInputSchema: z.ZodType<Prisma.SessionOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SessionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SessionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SessionMinOrderByAggregateInputSchema).optional(),
});

export const SessionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SessionScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema), z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema), z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
});

export const VerificationTokenWhereInputSchema: z.ZodType<Prisma.VerificationTokenWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => VerificationTokenWhereInputSchema), z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenWhereInputSchema), z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  identifier: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
});

export const VerificationTokenOrderByWithRelationInputSchema: z.ZodType<Prisma.VerificationTokenOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
});

export const VerificationTokenWhereUniqueInputSchema: z.ZodType<Prisma.VerificationTokenWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    token: z.string(),
    identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputSchema),
  }),
  z.object({
    id: z.string(),
    token: z.string(),
  }),
  z.object({
    id: z.string(),
    identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputSchema),
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    token: z.string(),
    identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputSchema),
  }),
  z.object({
    token: z.string(),
  }),
  z.object({
    identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputSchema),
  }),
])
.and(z.strictObject({
  id: z.string().optional(),
  token: z.string().optional(),
  identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => VerificationTokenWhereInputSchema), z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenWhereInputSchema), z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
}));

export const VerificationTokenOrderByWithAggregationInputSchema: z.ZodType<Prisma.VerificationTokenOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => VerificationTokenCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => VerificationTokenMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => VerificationTokenMinOrderByAggregateInputSchema).optional(),
});

export const VerificationTokenScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.VerificationTokenScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema), z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema), z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  identifier: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
});

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.strictObject({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  googleId: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  dateInscription: z.coerce.date().optional(),
  preferences: z.union([ z.lazy(() => UserPreferencesNullableCreateEnvelopeInputSchema), z.lazy(() => UserPreferencesCreateInputSchema) ]).optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  documents: z.lazy(() => DocumentCreateNestedManyWithoutProprietaireInputSchema).optional(),
  dossiers: z.lazy(() => DossierCreateNestedManyWithoutProprietaireInputSchema).optional(),
  demarchesUtilisateur: z.lazy(() => DemarcheUtilisateurCreateNestedManyWithoutUtilisateurInputSchema).optional(),
  notifications: z.lazy(() => NotificationCreateNestedManyWithoutUserInputSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.strictObject({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  googleId: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  dateInscription: z.coerce.date().optional(),
  preferences: z.union([ z.lazy(() => UserPreferencesNullableCreateEnvelopeInputSchema), z.lazy(() => UserPreferencesCreateInputSchema) ]).optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  documents: z.lazy(() => DocumentUncheckedCreateNestedManyWithoutProprietaireInputSchema).optional(),
  dossiers: z.lazy(() => DossierUncheckedCreateNestedManyWithoutProprietaireInputSchema).optional(),
  demarchesUtilisateur: z.lazy(() => DemarcheUtilisateurUncheckedCreateNestedManyWithoutUtilisateurInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  googleId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateInscription: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  preferences: z.union([ z.lazy(() => UserPreferencesNullableUpdateEnvelopeInputSchema), z.lazy(() => UserPreferencesCreateInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  documents: z.lazy(() => DocumentUpdateManyWithoutProprietaireNestedInputSchema).optional(),
  dossiers: z.lazy(() => DossierUpdateManyWithoutProprietaireNestedInputSchema).optional(),
  demarchesUtilisateur: z.lazy(() => DemarcheUtilisateurUpdateManyWithoutUtilisateurNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUpdateManyWithoutUserNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  googleId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateInscription: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  preferences: z.union([ z.lazy(() => UserPreferencesNullableUpdateEnvelopeInputSchema), z.lazy(() => UserPreferencesCreateInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  documents: z.lazy(() => DocumentUncheckedUpdateManyWithoutProprietaireNestedInputSchema).optional(),
  dossiers: z.lazy(() => DossierUncheckedUpdateManyWithoutProprietaireNestedInputSchema).optional(),
  demarchesUtilisateur: z.lazy(() => DemarcheUtilisateurUncheckedUpdateManyWithoutUtilisateurNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.strictObject({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  googleId: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  dateInscription: z.coerce.date().optional(),
  preferences: z.union([ z.lazy(() => UserPreferencesNullableCreateEnvelopeInputSchema), z.lazy(() => UserPreferencesCreateInputSchema) ]).optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  googleId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateInscription: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  preferences: z.union([ z.lazy(() => UserPreferencesNullableUpdateEnvelopeInputSchema), z.lazy(() => UserPreferencesCreateInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  googleId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateInscription: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  preferences: z.union([ z.lazy(() => UserPreferencesNullableUpdateEnvelopeInputSchema), z.lazy(() => UserPreferencesCreateInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const DocumentCreateInputSchema: z.ZodType<Prisma.DocumentCreateInput> = z.strictObject({
  id: z.string().optional(),
  nomFichier: z.string(),
  urlStockage: z.string().optional().nullable(),
  type: z.lazy(() => DocumentTypeSchema),
  statut: z.lazy(() => DocumentStatutSchema).optional(),
  tags: z.union([ z.lazy(() => DocumentCreatetagsInputSchema), z.string().array() ]).optional(),
  dateUpload: z.coerce.date().optional(),
  size: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  proprietaire: z.lazy(() => UserCreateNestedOneWithoutDocumentsInputSchema),
  dossiers: z.lazy(() => DossierCreateNestedManyWithoutDocumentsInputSchema).optional(),
  notifications: z.lazy(() => NotificationCreateNestedManyWithoutDocumentLieInputSchema).optional(),
});

export const DocumentUncheckedCreateInputSchema: z.ZodType<Prisma.DocumentUncheckedCreateInput> = z.strictObject({
  id: z.string().optional(),
  idProprietaire: z.string(),
  nomFichier: z.string(),
  urlStockage: z.string().optional().nullable(),
  type: z.lazy(() => DocumentTypeSchema),
  statut: z.lazy(() => DocumentStatutSchema).optional(),
  tags: z.union([ z.lazy(() => DocumentCreatetagsInputSchema), z.string().array() ]).optional(),
  dateUpload: z.coerce.date().optional(),
  size: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  dossierIds: z.union([ z.lazy(() => DocumentCreatedossierIdsInputSchema), z.string().array() ]).optional(),
  dossiers: z.lazy(() => DossierUncheckedCreateNestedManyWithoutDocumentsInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedCreateNestedManyWithoutDocumentLieInputSchema).optional(),
});

export const DocumentUpdateInputSchema: z.ZodType<Prisma.DocumentUpdateInput> = z.strictObject({
  nomFichier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  urlStockage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => DocumentTypeSchema), z.lazy(() => EnumDocumentTypeFieldUpdateOperationsInputSchema) ]).optional(),
  statut: z.union([ z.lazy(() => DocumentStatutSchema), z.lazy(() => EnumDocumentStatutFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => DocumentUpdatetagsInputSchema), z.string().array() ]).optional(),
  dateUpload: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  proprietaire: z.lazy(() => UserUpdateOneRequiredWithoutDocumentsNestedInputSchema).optional(),
  dossiers: z.lazy(() => DossierUpdateManyWithoutDocumentsNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUpdateManyWithoutDocumentLieNestedInputSchema).optional(),
});

export const DocumentUncheckedUpdateInputSchema: z.ZodType<Prisma.DocumentUncheckedUpdateInput> = z.strictObject({
  idProprietaire: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nomFichier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  urlStockage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => DocumentTypeSchema), z.lazy(() => EnumDocumentTypeFieldUpdateOperationsInputSchema) ]).optional(),
  statut: z.union([ z.lazy(() => DocumentStatutSchema), z.lazy(() => EnumDocumentStatutFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => DocumentUpdatetagsInputSchema), z.string().array() ]).optional(),
  dateUpload: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dossierIds: z.union([ z.lazy(() => DocumentUpdatedossierIdsInputSchema), z.string().array() ]).optional(),
  dossiers: z.lazy(() => DossierUncheckedUpdateManyWithoutDocumentsNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedUpdateManyWithoutDocumentLieNestedInputSchema).optional(),
});

export const DocumentCreateManyInputSchema: z.ZodType<Prisma.DocumentCreateManyInput> = z.strictObject({
  id: z.string().optional(),
  idProprietaire: z.string(),
  nomFichier: z.string(),
  urlStockage: z.string().optional().nullable(),
  type: z.lazy(() => DocumentTypeSchema),
  statut: z.lazy(() => DocumentStatutSchema).optional(),
  tags: z.union([ z.lazy(() => DocumentCreatetagsInputSchema), z.string().array() ]).optional(),
  dateUpload: z.coerce.date().optional(),
  size: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  dossierIds: z.union([ z.lazy(() => DocumentCreatedossierIdsInputSchema), z.string().array() ]).optional(),
});

export const DocumentUpdateManyMutationInputSchema: z.ZodType<Prisma.DocumentUpdateManyMutationInput> = z.strictObject({
  nomFichier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  urlStockage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => DocumentTypeSchema), z.lazy(() => EnumDocumentTypeFieldUpdateOperationsInputSchema) ]).optional(),
  statut: z.union([ z.lazy(() => DocumentStatutSchema), z.lazy(() => EnumDocumentStatutFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => DocumentUpdatetagsInputSchema), z.string().array() ]).optional(),
  dateUpload: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const DocumentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.DocumentUncheckedUpdateManyInput> = z.strictObject({
  idProprietaire: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nomFichier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  urlStockage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => DocumentTypeSchema), z.lazy(() => EnumDocumentTypeFieldUpdateOperationsInputSchema) ]).optional(),
  statut: z.union([ z.lazy(() => DocumentStatutSchema), z.lazy(() => EnumDocumentStatutFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => DocumentUpdatetagsInputSchema), z.string().array() ]).optional(),
  dateUpload: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dossierIds: z.union([ z.lazy(() => DocumentUpdatedossierIdsInputSchema), z.string().array() ]).optional(),
});

export const DossierCreateInputSchema: z.ZodType<Prisma.DossierCreateInput> = z.strictObject({
  id: z.string().optional(),
  nom: z.string(),
  couleur: z.string().optional(),
  icone: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  proprietaire: z.lazy(() => UserCreateNestedOneWithoutDossiersInputSchema),
  documents: z.lazy(() => DocumentCreateNestedManyWithoutDossiersInputSchema).optional(),
});

export const DossierUncheckedCreateInputSchema: z.ZodType<Prisma.DossierUncheckedCreateInput> = z.strictObject({
  id: z.string().optional(),
  idProprietaire: z.string(),
  nom: z.string(),
  idsDocuments: z.union([ z.lazy(() => DossierCreateidsDocumentsInputSchema), z.string().array() ]).optional(),
  couleur: z.string().optional(),
  icone: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  documents: z.lazy(() => DocumentUncheckedCreateNestedManyWithoutDossiersInputSchema).optional(),
});

export const DossierUpdateInputSchema: z.ZodType<Prisma.DossierUpdateInput> = z.strictObject({
  nom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  couleur: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  icone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  proprietaire: z.lazy(() => UserUpdateOneRequiredWithoutDossiersNestedInputSchema).optional(),
  documents: z.lazy(() => DocumentUpdateManyWithoutDossiersNestedInputSchema).optional(),
});

export const DossierUncheckedUpdateInputSchema: z.ZodType<Prisma.DossierUncheckedUpdateInput> = z.strictObject({
  idProprietaire: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  idsDocuments: z.union([ z.lazy(() => DossierUpdateidsDocumentsInputSchema), z.string().array() ]).optional(),
  couleur: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  icone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  documents: z.lazy(() => DocumentUncheckedUpdateManyWithoutDossiersNestedInputSchema).optional(),
});

export const DossierCreateManyInputSchema: z.ZodType<Prisma.DossierCreateManyInput> = z.strictObject({
  id: z.string().optional(),
  idProprietaire: z.string(),
  nom: z.string(),
  idsDocuments: z.union([ z.lazy(() => DossierCreateidsDocumentsInputSchema), z.string().array() ]).optional(),
  couleur: z.string().optional(),
  icone: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const DossierUpdateManyMutationInputSchema: z.ZodType<Prisma.DossierUpdateManyMutationInput> = z.strictObject({
  nom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  couleur: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  icone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const DossierUncheckedUpdateManyInputSchema: z.ZodType<Prisma.DossierUncheckedUpdateManyInput> = z.strictObject({
  idProprietaire: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  idsDocuments: z.union([ z.lazy(() => DossierUpdateidsDocumentsInputSchema), z.string().array() ]).optional(),
  couleur: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  icone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ModeleDemarcheCreateInputSchema: z.ZodType<Prisma.ModeleDemarcheCreateInput> = z.strictObject({
  id: z.string().optional(),
  titre: z.string(),
  description: z.string().optional().nullable(),
  typesDocumentsRequis: z.union([ z.lazy(() => ModeleDemarcheCreatetypesDocumentsRequisInputSchema), z.string().array() ]).optional(),
  categorie: z.lazy(() => DemarcheCategorieSchema).optional(),
  actif: z.boolean().optional(),
  ordre: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  demarchesUtilisateur: z.lazy(() => DemarcheUtilisateurCreateNestedManyWithoutModeleInputSchema).optional(),
});

export const ModeleDemarcheUncheckedCreateInputSchema: z.ZodType<Prisma.ModeleDemarcheUncheckedCreateInput> = z.strictObject({
  id: z.string().optional(),
  titre: z.string(),
  description: z.string().optional().nullable(),
  typesDocumentsRequis: z.union([ z.lazy(() => ModeleDemarcheCreatetypesDocumentsRequisInputSchema), z.string().array() ]).optional(),
  categorie: z.lazy(() => DemarcheCategorieSchema).optional(),
  actif: z.boolean().optional(),
  ordre: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  demarchesUtilisateur: z.lazy(() => DemarcheUtilisateurUncheckedCreateNestedManyWithoutModeleInputSchema).optional(),
});

export const ModeleDemarcheUpdateInputSchema: z.ZodType<Prisma.ModeleDemarcheUpdateInput> = z.strictObject({
  titre: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  typesDocumentsRequis: z.union([ z.lazy(() => ModeleDemarcheUpdatetypesDocumentsRequisInputSchema), z.string().array() ]).optional(),
  categorie: z.union([ z.lazy(() => DemarcheCategorieSchema), z.lazy(() => EnumDemarcheCategorieFieldUpdateOperationsInputSchema) ]).optional(),
  actif: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  ordre: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  demarchesUtilisateur: z.lazy(() => DemarcheUtilisateurUpdateManyWithoutModeleNestedInputSchema).optional(),
});

export const ModeleDemarcheUncheckedUpdateInputSchema: z.ZodType<Prisma.ModeleDemarcheUncheckedUpdateInput> = z.strictObject({
  titre: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  typesDocumentsRequis: z.union([ z.lazy(() => ModeleDemarcheUpdatetypesDocumentsRequisInputSchema), z.string().array() ]).optional(),
  categorie: z.union([ z.lazy(() => DemarcheCategorieSchema), z.lazy(() => EnumDemarcheCategorieFieldUpdateOperationsInputSchema) ]).optional(),
  actif: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  ordre: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  demarchesUtilisateur: z.lazy(() => DemarcheUtilisateurUncheckedUpdateManyWithoutModeleNestedInputSchema).optional(),
});

export const ModeleDemarcheCreateManyInputSchema: z.ZodType<Prisma.ModeleDemarcheCreateManyInput> = z.strictObject({
  id: z.string().optional(),
  titre: z.string(),
  description: z.string().optional().nullable(),
  typesDocumentsRequis: z.union([ z.lazy(() => ModeleDemarcheCreatetypesDocumentsRequisInputSchema), z.string().array() ]).optional(),
  categorie: z.lazy(() => DemarcheCategorieSchema).optional(),
  actif: z.boolean().optional(),
  ordre: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const ModeleDemarcheUpdateManyMutationInputSchema: z.ZodType<Prisma.ModeleDemarcheUpdateManyMutationInput> = z.strictObject({
  titre: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  typesDocumentsRequis: z.union([ z.lazy(() => ModeleDemarcheUpdatetypesDocumentsRequisInputSchema), z.string().array() ]).optional(),
  categorie: z.union([ z.lazy(() => DemarcheCategorieSchema), z.lazy(() => EnumDemarcheCategorieFieldUpdateOperationsInputSchema) ]).optional(),
  actif: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  ordre: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ModeleDemarcheUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ModeleDemarcheUncheckedUpdateManyInput> = z.strictObject({
  titre: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  typesDocumentsRequis: z.union([ z.lazy(() => ModeleDemarcheUpdatetypesDocumentsRequisInputSchema), z.string().array() ]).optional(),
  categorie: z.union([ z.lazy(() => DemarcheCategorieSchema), z.lazy(() => EnumDemarcheCategorieFieldUpdateOperationsInputSchema) ]).optional(),
  actif: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  ordre: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const DemarcheUtilisateurCreateInputSchema: z.ZodType<Prisma.DemarcheUtilisateurCreateInput> = z.strictObject({
  id: z.string().optional(),
  complete: z.boolean().optional(),
  dateDebut: z.coerce.date().optional(),
  dateCompletion: z.coerce.date().optional().nullable(),
  statut: z.lazy(() => DemarcheStatutSchema).optional(),
  notes: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  utilisateur: z.lazy(() => UserCreateNestedOneWithoutDemarchesUtilisateurInputSchema),
  modele: z.lazy(() => ModeleDemarcheCreateNestedOneWithoutDemarchesUtilisateurInputSchema),
});

export const DemarcheUtilisateurUncheckedCreateInputSchema: z.ZodType<Prisma.DemarcheUtilisateurUncheckedCreateInput> = z.strictObject({
  id: z.string().optional(),
  idUtilisateur: z.string(),
  idModele: z.string(),
  complete: z.boolean().optional(),
  dateDebut: z.coerce.date().optional(),
  dateCompletion: z.coerce.date().optional().nullable(),
  statut: z.lazy(() => DemarcheStatutSchema).optional(),
  notes: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const DemarcheUtilisateurUpdateInputSchema: z.ZodType<Prisma.DemarcheUtilisateurUpdateInput> = z.strictObject({
  complete: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  dateDebut: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dateCompletion: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  statut: z.union([ z.lazy(() => DemarcheStatutSchema), z.lazy(() => EnumDemarcheStatutFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  utilisateur: z.lazy(() => UserUpdateOneRequiredWithoutDemarchesUtilisateurNestedInputSchema).optional(),
  modele: z.lazy(() => ModeleDemarcheUpdateOneRequiredWithoutDemarchesUtilisateurNestedInputSchema).optional(),
});

export const DemarcheUtilisateurUncheckedUpdateInputSchema: z.ZodType<Prisma.DemarcheUtilisateurUncheckedUpdateInput> = z.strictObject({
  idUtilisateur: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  idModele: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  complete: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  dateDebut: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dateCompletion: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  statut: z.union([ z.lazy(() => DemarcheStatutSchema), z.lazy(() => EnumDemarcheStatutFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const DemarcheUtilisateurCreateManyInputSchema: z.ZodType<Prisma.DemarcheUtilisateurCreateManyInput> = z.strictObject({
  id: z.string().optional(),
  idUtilisateur: z.string(),
  idModele: z.string(),
  complete: z.boolean().optional(),
  dateDebut: z.coerce.date().optional(),
  dateCompletion: z.coerce.date().optional().nullable(),
  statut: z.lazy(() => DemarcheStatutSchema).optional(),
  notes: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const DemarcheUtilisateurUpdateManyMutationInputSchema: z.ZodType<Prisma.DemarcheUtilisateurUpdateManyMutationInput> = z.strictObject({
  complete: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  dateDebut: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dateCompletion: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  statut: z.union([ z.lazy(() => DemarcheStatutSchema), z.lazy(() => EnumDemarcheStatutFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const DemarcheUtilisateurUncheckedUpdateManyInputSchema: z.ZodType<Prisma.DemarcheUtilisateurUncheckedUpdateManyInput> = z.strictObject({
  idUtilisateur: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  idModele: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  complete: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  dateDebut: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dateCompletion: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  statut: z.union([ z.lazy(() => DemarcheStatutSchema), z.lazy(() => EnumDemarcheStatutFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const NotificationCreateInputSchema: z.ZodType<Prisma.NotificationCreateInput> = z.strictObject({
  id: z.string().optional(),
  type: z.lazy(() => NotificationTypeSchema),
  message: z.string(),
  lu: z.boolean().optional(),
  dateCreation: z.coerce.date().optional(),
  priorite: z.lazy(() => NotificationPrioriteSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutNotificationsInputSchema),
  documentLie: z.lazy(() => DocumentCreateNestedOneWithoutNotificationsInputSchema).optional(),
});

export const NotificationUncheckedCreateInputSchema: z.ZodType<Prisma.NotificationUncheckedCreateInput> = z.strictObject({
  id: z.string().optional(),
  idUser: z.string(),
  type: z.lazy(() => NotificationTypeSchema),
  message: z.string(),
  idDocumentLie: z.string().optional().nullable(),
  lu: z.boolean().optional(),
  dateCreation: z.coerce.date().optional(),
  priorite: z.lazy(() => NotificationPrioriteSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const NotificationUpdateInputSchema: z.ZodType<Prisma.NotificationUpdateInput> = z.strictObject({
  type: z.union([ z.lazy(() => NotificationTypeSchema), z.lazy(() => EnumNotificationTypeFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lu: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  dateCreation: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  priorite: z.union([ z.lazy(() => NotificationPrioriteSchema), z.lazy(() => EnumNotificationPrioriteFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutNotificationsNestedInputSchema).optional(),
  documentLie: z.lazy(() => DocumentUpdateOneWithoutNotificationsNestedInputSchema).optional(),
});

export const NotificationUncheckedUpdateInputSchema: z.ZodType<Prisma.NotificationUncheckedUpdateInput> = z.strictObject({
  idUser: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => NotificationTypeSchema), z.lazy(() => EnumNotificationTypeFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  idDocumentLie: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lu: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  dateCreation: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  priorite: z.union([ z.lazy(() => NotificationPrioriteSchema), z.lazy(() => EnumNotificationPrioriteFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const NotificationCreateManyInputSchema: z.ZodType<Prisma.NotificationCreateManyInput> = z.strictObject({
  id: z.string().optional(),
  idUser: z.string(),
  type: z.lazy(() => NotificationTypeSchema),
  message: z.string(),
  idDocumentLie: z.string().optional().nullable(),
  lu: z.boolean().optional(),
  dateCreation: z.coerce.date().optional(),
  priorite: z.lazy(() => NotificationPrioriteSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const NotificationUpdateManyMutationInputSchema: z.ZodType<Prisma.NotificationUpdateManyMutationInput> = z.strictObject({
  type: z.union([ z.lazy(() => NotificationTypeSchema), z.lazy(() => EnumNotificationTypeFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lu: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  dateCreation: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  priorite: z.union([ z.lazy(() => NotificationPrioriteSchema), z.lazy(() => EnumNotificationPrioriteFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const NotificationUncheckedUpdateManyInputSchema: z.ZodType<Prisma.NotificationUncheckedUpdateManyInput> = z.strictObject({
  idUser: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => NotificationTypeSchema), z.lazy(() => EnumNotificationTypeFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  idDocumentLie: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lu: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  dateCreation: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  priorite: z.union([ z.lazy(() => NotificationPrioriteSchema), z.lazy(() => EnumNotificationPrioriteFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const AccountCreateInputSchema: z.ZodType<Prisma.AccountCreateInput> = z.strictObject({
  id: z.string().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutAccountsInputSchema),
});

export const AccountUncheckedCreateInputSchema: z.ZodType<Prisma.AccountUncheckedCreateInput> = z.strictObject({
  id: z.string().optional(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
});

export const AccountUpdateInputSchema: z.ZodType<Prisma.AccountUpdateInput> = z.strictObject({
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAccountsNestedInputSchema).optional(),
});

export const AccountUncheckedUpdateInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateInput> = z.strictObject({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const AccountCreateManyInputSchema: z.ZodType<Prisma.AccountCreateManyInput> = z.strictObject({
  id: z.string().optional(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
});

export const AccountUpdateManyMutationInputSchema: z.ZodType<Prisma.AccountUpdateManyMutationInput> = z.strictObject({
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const AccountUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyInput> = z.strictObject({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const SessionCreateInputSchema: z.ZodType<Prisma.SessionCreateInput> = z.strictObject({
  id: z.string().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date(),
  user: z.lazy(() => UserCreateNestedOneWithoutSessionsInputSchema),
});

export const SessionUncheckedCreateInputSchema: z.ZodType<Prisma.SessionUncheckedCreateInput> = z.strictObject({
  id: z.string().optional(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date(),
});

export const SessionUpdateInputSchema: z.ZodType<Prisma.SessionUpdateInput> = z.strictObject({
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSessionsNestedInputSchema).optional(),
});

export const SessionUncheckedUpdateInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateInput> = z.strictObject({
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const SessionCreateManyInputSchema: z.ZodType<Prisma.SessionCreateManyInput> = z.strictObject({
  id: z.string().optional(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date(),
});

export const SessionUpdateManyMutationInputSchema: z.ZodType<Prisma.SessionUpdateManyMutationInput> = z.strictObject({
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const SessionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyInput> = z.strictObject({
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const VerificationTokenCreateInputSchema: z.ZodType<Prisma.VerificationTokenCreateInput> = z.strictObject({
  id: z.string().optional(),
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date(),
});

export const VerificationTokenUncheckedCreateInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedCreateInput> = z.strictObject({
  id: z.string().optional(),
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date(),
});

export const VerificationTokenUpdateInputSchema: z.ZodType<Prisma.VerificationTokenUpdateInput> = z.strictObject({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const VerificationTokenUncheckedUpdateInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateInput> = z.strictObject({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const VerificationTokenCreateManyInputSchema: z.ZodType<Prisma.VerificationTokenCreateManyInput> = z.strictObject({
  id: z.string().optional(),
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date(),
});

export const VerificationTokenUpdateManyMutationInputSchema: z.ZodType<Prisma.VerificationTokenUpdateManyMutationInput> = z.strictObject({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const VerificationTokenUncheckedUpdateManyInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateManyInput> = z.strictObject({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.strictObject({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
});

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.strictObject({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional(),
});

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.strictObject({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional(),
});

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.strictObject({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
});

export const UserPreferencesNullableCompositeFilterSchema: z.ZodType<Prisma.UserPreferencesNullableCompositeFilter> = z.strictObject({
  equals: z.lazy(() => UserPreferencesObjectEqualityInputSchema).optional().nullable(),
  is: z.lazy(() => UserPreferencesWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => UserPreferencesWhereInputSchema).optional().nullable(),
  isSet: z.boolean().optional(),
});

export const UserPreferencesObjectEqualityInputSchema: z.ZodType<Prisma.UserPreferencesObjectEqualityInput> = z.strictObject({
  notifications: z.boolean(),
  language: z.string(),
});

export const DocumentListRelationFilterSchema: z.ZodType<Prisma.DocumentListRelationFilter> = z.strictObject({
  every: z.lazy(() => DocumentWhereInputSchema).optional(),
  some: z.lazy(() => DocumentWhereInputSchema).optional(),
  none: z.lazy(() => DocumentWhereInputSchema).optional(),
});

export const DossierListRelationFilterSchema: z.ZodType<Prisma.DossierListRelationFilter> = z.strictObject({
  every: z.lazy(() => DossierWhereInputSchema).optional(),
  some: z.lazy(() => DossierWhereInputSchema).optional(),
  none: z.lazy(() => DossierWhereInputSchema).optional(),
});

export const DemarcheUtilisateurListRelationFilterSchema: z.ZodType<Prisma.DemarcheUtilisateurListRelationFilter> = z.strictObject({
  every: z.lazy(() => DemarcheUtilisateurWhereInputSchema).optional(),
  some: z.lazy(() => DemarcheUtilisateurWhereInputSchema).optional(),
  none: z.lazy(() => DemarcheUtilisateurWhereInputSchema).optional(),
});

export const NotificationListRelationFilterSchema: z.ZodType<Prisma.NotificationListRelationFilter> = z.strictObject({
  every: z.lazy(() => NotificationWhereInputSchema).optional(),
  some: z.lazy(() => NotificationWhereInputSchema).optional(),
  none: z.lazy(() => NotificationWhereInputSchema).optional(),
});

export const AccountListRelationFilterSchema: z.ZodType<Prisma.AccountListRelationFilter> = z.strictObject({
  every: z.lazy(() => AccountWhereInputSchema).optional(),
  some: z.lazy(() => AccountWhereInputSchema).optional(),
  none: z.lazy(() => AccountWhereInputSchema).optional(),
});

export const SessionListRelationFilterSchema: z.ZodType<Prisma.SessionListRelationFilter> = z.strictObject({
  every: z.lazy(() => SessionWhereInputSchema).optional(),
  some: z.lazy(() => SessionWhereInputSchema).optional(),
  none: z.lazy(() => SessionWhereInputSchema).optional(),
});

export const UserPreferencesOrderByInputSchema: z.ZodType<Prisma.UserPreferencesOrderByInput> = z.strictObject({
  notifications: z.lazy(() => SortOrderSchema).optional(),
  language: z.lazy(() => SortOrderSchema).optional(),
});

export const DocumentOrderByRelationAggregateInputSchema: z.ZodType<Prisma.DocumentOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const DossierOrderByRelationAggregateInputSchema: z.ZodType<Prisma.DossierOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const DemarcheUtilisateurOrderByRelationAggregateInputSchema: z.ZodType<Prisma.DemarcheUtilisateurOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const NotificationOrderByRelationAggregateInputSchema: z.ZodType<Prisma.NotificationOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const AccountOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AccountOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const SessionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SessionOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  googleId: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  dateInscription: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  googleId: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  dateInscription: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  googleId: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  dateInscription: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.strictObject({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional(),
});

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.strictObject({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  isSet: z.boolean().optional(),
});

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.strictObject({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  isSet: z.boolean().optional(),
});

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.strictObject({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
});

export const EnumDocumentTypeFilterSchema: z.ZodType<Prisma.EnumDocumentTypeFilter> = z.strictObject({
  equals: z.lazy(() => DocumentTypeSchema).optional(),
  in: z.lazy(() => DocumentTypeSchema).array().optional(),
  notIn: z.lazy(() => DocumentTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => DocumentTypeSchema), z.lazy(() => NestedEnumDocumentTypeFilterSchema) ]).optional(),
});

export const EnumDocumentStatutFilterSchema: z.ZodType<Prisma.EnumDocumentStatutFilter> = z.strictObject({
  equals: z.lazy(() => DocumentStatutSchema).optional(),
  in: z.lazy(() => DocumentStatutSchema).array().optional(),
  notIn: z.lazy(() => DocumentStatutSchema).array().optional(),
  not: z.union([ z.lazy(() => DocumentStatutSchema), z.lazy(() => NestedEnumDocumentStatutFilterSchema) ]).optional(),
});

export const StringNullableListFilterSchema: z.ZodType<Prisma.StringNullableListFilter> = z.strictObject({
  equals: z.string().array().optional().nullable(),
  has: z.string().optional().nullable(),
  hasEvery: z.string().array().optional(),
  hasSome: z.string().array().optional(),
  isEmpty: z.boolean().optional(),
});

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
});

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.strictObject({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional(),
});

export const DocumentCountOrderByAggregateInputSchema: z.ZodType<Prisma.DocumentCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  idProprietaire: z.lazy(() => SortOrderSchema).optional(),
  nomFichier: z.lazy(() => SortOrderSchema).optional(),
  urlStockage: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  statut: z.lazy(() => SortOrderSchema).optional(),
  tags: z.lazy(() => SortOrderSchema).optional(),
  dateUpload: z.lazy(() => SortOrderSchema).optional(),
  size: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  dossierIds: z.lazy(() => SortOrderSchema).optional(),
});

export const DocumentAvgOrderByAggregateInputSchema: z.ZodType<Prisma.DocumentAvgOrderByAggregateInput> = z.strictObject({
  size: z.lazy(() => SortOrderSchema).optional(),
});

export const DocumentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.DocumentMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  idProprietaire: z.lazy(() => SortOrderSchema).optional(),
  nomFichier: z.lazy(() => SortOrderSchema).optional(),
  urlStockage: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  statut: z.lazy(() => SortOrderSchema).optional(),
  dateUpload: z.lazy(() => SortOrderSchema).optional(),
  size: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const DocumentMinOrderByAggregateInputSchema: z.ZodType<Prisma.DocumentMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  idProprietaire: z.lazy(() => SortOrderSchema).optional(),
  nomFichier: z.lazy(() => SortOrderSchema).optional(),
  urlStockage: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  statut: z.lazy(() => SortOrderSchema).optional(),
  dateUpload: z.lazy(() => SortOrderSchema).optional(),
  size: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const DocumentSumOrderByAggregateInputSchema: z.ZodType<Prisma.DocumentSumOrderByAggregateInput> = z.strictObject({
  size: z.lazy(() => SortOrderSchema).optional(),
});

export const EnumDocumentTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumDocumentTypeWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => DocumentTypeSchema).optional(),
  in: z.lazy(() => DocumentTypeSchema).array().optional(),
  notIn: z.lazy(() => DocumentTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => DocumentTypeSchema), z.lazy(() => NestedEnumDocumentTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumDocumentTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumDocumentTypeFilterSchema).optional(),
});

export const EnumDocumentStatutWithAggregatesFilterSchema: z.ZodType<Prisma.EnumDocumentStatutWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => DocumentStatutSchema).optional(),
  in: z.lazy(() => DocumentStatutSchema).array().optional(),
  notIn: z.lazy(() => DocumentStatutSchema).array().optional(),
  not: z.union([ z.lazy(() => DocumentStatutSchema), z.lazy(() => NestedEnumDocumentStatutWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumDocumentStatutFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumDocumentStatutFilterSchema).optional(),
});

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional(),
});

export const DossierCountOrderByAggregateInputSchema: z.ZodType<Prisma.DossierCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  idProprietaire: z.lazy(() => SortOrderSchema).optional(),
  nom: z.lazy(() => SortOrderSchema).optional(),
  idsDocuments: z.lazy(() => SortOrderSchema).optional(),
  couleur: z.lazy(() => SortOrderSchema).optional(),
  icone: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const DossierMaxOrderByAggregateInputSchema: z.ZodType<Prisma.DossierMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  idProprietaire: z.lazy(() => SortOrderSchema).optional(),
  nom: z.lazy(() => SortOrderSchema).optional(),
  couleur: z.lazy(() => SortOrderSchema).optional(),
  icone: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const DossierMinOrderByAggregateInputSchema: z.ZodType<Prisma.DossierMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  idProprietaire: z.lazy(() => SortOrderSchema).optional(),
  nom: z.lazy(() => SortOrderSchema).optional(),
  couleur: z.lazy(() => SortOrderSchema).optional(),
  icone: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const EnumDemarcheCategorieFilterSchema: z.ZodType<Prisma.EnumDemarcheCategorieFilter> = z.strictObject({
  equals: z.lazy(() => DemarcheCategorieSchema).optional(),
  in: z.lazy(() => DemarcheCategorieSchema).array().optional(),
  notIn: z.lazy(() => DemarcheCategorieSchema).array().optional(),
  not: z.union([ z.lazy(() => DemarcheCategorieSchema), z.lazy(() => NestedEnumDemarcheCategorieFilterSchema) ]).optional(),
});

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.strictObject({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
});

export const ModeleDemarcheCountOrderByAggregateInputSchema: z.ZodType<Prisma.ModeleDemarcheCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  titre: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  typesDocumentsRequis: z.lazy(() => SortOrderSchema).optional(),
  categorie: z.lazy(() => SortOrderSchema).optional(),
  actif: z.lazy(() => SortOrderSchema).optional(),
  ordre: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const ModeleDemarcheAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ModeleDemarcheAvgOrderByAggregateInput> = z.strictObject({
  ordre: z.lazy(() => SortOrderSchema).optional(),
});

export const ModeleDemarcheMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ModeleDemarcheMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  titre: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  categorie: z.lazy(() => SortOrderSchema).optional(),
  actif: z.lazy(() => SortOrderSchema).optional(),
  ordre: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const ModeleDemarcheMinOrderByAggregateInputSchema: z.ZodType<Prisma.ModeleDemarcheMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  titre: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  categorie: z.lazy(() => SortOrderSchema).optional(),
  actif: z.lazy(() => SortOrderSchema).optional(),
  ordre: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const ModeleDemarcheSumOrderByAggregateInputSchema: z.ZodType<Prisma.ModeleDemarcheSumOrderByAggregateInput> = z.strictObject({
  ordre: z.lazy(() => SortOrderSchema).optional(),
});

export const EnumDemarcheCategorieWithAggregatesFilterSchema: z.ZodType<Prisma.EnumDemarcheCategorieWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => DemarcheCategorieSchema).optional(),
  in: z.lazy(() => DemarcheCategorieSchema).array().optional(),
  notIn: z.lazy(() => DemarcheCategorieSchema).array().optional(),
  not: z.union([ z.lazy(() => DemarcheCategorieSchema), z.lazy(() => NestedEnumDemarcheCategorieWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumDemarcheCategorieFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumDemarcheCategorieFilterSchema).optional(),
});

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.strictObject({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional(),
});

export const EnumDemarcheStatutFilterSchema: z.ZodType<Prisma.EnumDemarcheStatutFilter> = z.strictObject({
  equals: z.lazy(() => DemarcheStatutSchema).optional(),
  in: z.lazy(() => DemarcheStatutSchema).array().optional(),
  notIn: z.lazy(() => DemarcheStatutSchema).array().optional(),
  not: z.union([ z.lazy(() => DemarcheStatutSchema), z.lazy(() => NestedEnumDemarcheStatutFilterSchema) ]).optional(),
});

export const ModeleDemarcheRelationFilterSchema: z.ZodType<Prisma.ModeleDemarcheRelationFilter> = z.strictObject({
  is: z.lazy(() => ModeleDemarcheWhereInputSchema).optional(),
  isNot: z.lazy(() => ModeleDemarcheWhereInputSchema).optional(),
});

export const DemarcheUtilisateurCountOrderByAggregateInputSchema: z.ZodType<Prisma.DemarcheUtilisateurCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  idUtilisateur: z.lazy(() => SortOrderSchema).optional(),
  idModele: z.lazy(() => SortOrderSchema).optional(),
  complete: z.lazy(() => SortOrderSchema).optional(),
  dateDebut: z.lazy(() => SortOrderSchema).optional(),
  dateCompletion: z.lazy(() => SortOrderSchema).optional(),
  statut: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const DemarcheUtilisateurMaxOrderByAggregateInputSchema: z.ZodType<Prisma.DemarcheUtilisateurMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  idUtilisateur: z.lazy(() => SortOrderSchema).optional(),
  idModele: z.lazy(() => SortOrderSchema).optional(),
  complete: z.lazy(() => SortOrderSchema).optional(),
  dateDebut: z.lazy(() => SortOrderSchema).optional(),
  dateCompletion: z.lazy(() => SortOrderSchema).optional(),
  statut: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const DemarcheUtilisateurMinOrderByAggregateInputSchema: z.ZodType<Prisma.DemarcheUtilisateurMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  idUtilisateur: z.lazy(() => SortOrderSchema).optional(),
  idModele: z.lazy(() => SortOrderSchema).optional(),
  complete: z.lazy(() => SortOrderSchema).optional(),
  dateDebut: z.lazy(() => SortOrderSchema).optional(),
  dateCompletion: z.lazy(() => SortOrderSchema).optional(),
  statut: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const EnumDemarcheStatutWithAggregatesFilterSchema: z.ZodType<Prisma.EnumDemarcheStatutWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => DemarcheStatutSchema).optional(),
  in: z.lazy(() => DemarcheStatutSchema).array().optional(),
  notIn: z.lazy(() => DemarcheStatutSchema).array().optional(),
  not: z.union([ z.lazy(() => DemarcheStatutSchema), z.lazy(() => NestedEnumDemarcheStatutWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumDemarcheStatutFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumDemarcheStatutFilterSchema).optional(),
});

export const EnumNotificationTypeFilterSchema: z.ZodType<Prisma.EnumNotificationTypeFilter> = z.strictObject({
  equals: z.lazy(() => NotificationTypeSchema).optional(),
  in: z.lazy(() => NotificationTypeSchema).array().optional(),
  notIn: z.lazy(() => NotificationTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => NotificationTypeSchema), z.lazy(() => NestedEnumNotificationTypeFilterSchema) ]).optional(),
});

export const EnumNotificationPrioriteFilterSchema: z.ZodType<Prisma.EnumNotificationPrioriteFilter> = z.strictObject({
  equals: z.lazy(() => NotificationPrioriteSchema).optional(),
  in: z.lazy(() => NotificationPrioriteSchema).array().optional(),
  notIn: z.lazy(() => NotificationPrioriteSchema).array().optional(),
  not: z.union([ z.lazy(() => NotificationPrioriteSchema), z.lazy(() => NestedEnumNotificationPrioriteFilterSchema) ]).optional(),
});

export const DocumentNullableRelationFilterSchema: z.ZodType<Prisma.DocumentNullableRelationFilter> = z.strictObject({
  is: z.lazy(() => DocumentWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => DocumentWhereInputSchema).optional().nullable(),
});

export const NotificationCountOrderByAggregateInputSchema: z.ZodType<Prisma.NotificationCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  idUser: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  message: z.lazy(() => SortOrderSchema).optional(),
  idDocumentLie: z.lazy(() => SortOrderSchema).optional(),
  lu: z.lazy(() => SortOrderSchema).optional(),
  dateCreation: z.lazy(() => SortOrderSchema).optional(),
  priorite: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const NotificationMaxOrderByAggregateInputSchema: z.ZodType<Prisma.NotificationMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  idUser: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  message: z.lazy(() => SortOrderSchema).optional(),
  idDocumentLie: z.lazy(() => SortOrderSchema).optional(),
  lu: z.lazy(() => SortOrderSchema).optional(),
  dateCreation: z.lazy(() => SortOrderSchema).optional(),
  priorite: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const NotificationMinOrderByAggregateInputSchema: z.ZodType<Prisma.NotificationMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  idUser: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  message: z.lazy(() => SortOrderSchema).optional(),
  idDocumentLie: z.lazy(() => SortOrderSchema).optional(),
  lu: z.lazy(() => SortOrderSchema).optional(),
  dateCreation: z.lazy(() => SortOrderSchema).optional(),
  priorite: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const EnumNotificationTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumNotificationTypeWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => NotificationTypeSchema).optional(),
  in: z.lazy(() => NotificationTypeSchema).array().optional(),
  notIn: z.lazy(() => NotificationTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => NotificationTypeSchema), z.lazy(() => NestedEnumNotificationTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumNotificationTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumNotificationTypeFilterSchema).optional(),
});

export const EnumNotificationPrioriteWithAggregatesFilterSchema: z.ZodType<Prisma.EnumNotificationPrioriteWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => NotificationPrioriteSchema).optional(),
  in: z.lazy(() => NotificationPrioriteSchema).array().optional(),
  notIn: z.lazy(() => NotificationPrioriteSchema).array().optional(),
  not: z.union([ z.lazy(() => NotificationPrioriteSchema), z.lazy(() => NestedEnumNotificationPrioriteWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumNotificationPrioriteFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumNotificationPrioriteFilterSchema).optional(),
});

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.strictObject({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional(),
});

export const AccountProviderProviderAccountIdCompoundUniqueInputSchema: z.ZodType<Prisma.AccountProviderProviderAccountIdCompoundUniqueInput> = z.strictObject({
  provider: z.string(),
  providerAccountId: z.string(),
});

export const AccountCountOrderByAggregateInputSchema: z.ZodType<Prisma.AccountCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional(),
});

export const AccountAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AccountAvgOrderByAggregateInput> = z.strictObject({
  expires_at: z.lazy(() => SortOrderSchema).optional(),
});

export const AccountMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional(),
});

export const AccountMinOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional(),
});

export const AccountSumOrderByAggregateInputSchema: z.ZodType<Prisma.AccountSumOrderByAggregateInput> = z.strictObject({
  expires_at: z.lazy(() => SortOrderSchema).optional(),
});

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.strictObject({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  isSet: z.boolean().optional(),
});

export const SessionCountOrderByAggregateInputSchema: z.ZodType<Prisma.SessionCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
});

export const SessionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
});

export const SessionMinOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
});

export const VerificationTokenIdentifierTokenCompoundUniqueInputSchema: z.ZodType<Prisma.VerificationTokenIdentifierTokenCompoundUniqueInput> = z.strictObject({
  identifier: z.string(),
  token: z.string(),
});

export const VerificationTokenCountOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
});

export const VerificationTokenMaxOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
});

export const VerificationTokenMinOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
});

export const UserPreferencesNullableCreateEnvelopeInputSchema: z.ZodType<Prisma.UserPreferencesNullableCreateEnvelopeInput> = z.strictObject({
  set: z.lazy(() => UserPreferencesCreateInputSchema).optional().nullable(),
});

export const UserPreferencesCreateInputSchema: z.ZodType<Prisma.UserPreferencesCreateInput> = z.strictObject({
  notifications: z.boolean().optional(),
  language: z.string().optional(),
});

export const DocumentCreateNestedManyWithoutProprietaireInputSchema: z.ZodType<Prisma.DocumentCreateNestedManyWithoutProprietaireInput> = z.strictObject({
  create: z.union([ z.lazy(() => DocumentCreateWithoutProprietaireInputSchema), z.lazy(() => DocumentCreateWithoutProprietaireInputSchema).array(), z.lazy(() => DocumentUncheckedCreateWithoutProprietaireInputSchema), z.lazy(() => DocumentUncheckedCreateWithoutProprietaireInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DocumentCreateOrConnectWithoutProprietaireInputSchema), z.lazy(() => DocumentCreateOrConnectWithoutProprietaireInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DocumentCreateManyProprietaireInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema), z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
});

export const DossierCreateNestedManyWithoutProprietaireInputSchema: z.ZodType<Prisma.DossierCreateNestedManyWithoutProprietaireInput> = z.strictObject({
  create: z.union([ z.lazy(() => DossierCreateWithoutProprietaireInputSchema), z.lazy(() => DossierCreateWithoutProprietaireInputSchema).array(), z.lazy(() => DossierUncheckedCreateWithoutProprietaireInputSchema), z.lazy(() => DossierUncheckedCreateWithoutProprietaireInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DossierCreateOrConnectWithoutProprietaireInputSchema), z.lazy(() => DossierCreateOrConnectWithoutProprietaireInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DossierCreateManyProprietaireInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DossierWhereUniqueInputSchema), z.lazy(() => DossierWhereUniqueInputSchema).array() ]).optional(),
});

export const DemarcheUtilisateurCreateNestedManyWithoutUtilisateurInputSchema: z.ZodType<Prisma.DemarcheUtilisateurCreateNestedManyWithoutUtilisateurInput> = z.strictObject({
  create: z.union([ z.lazy(() => DemarcheUtilisateurCreateWithoutUtilisateurInputSchema), z.lazy(() => DemarcheUtilisateurCreateWithoutUtilisateurInputSchema).array(), z.lazy(() => DemarcheUtilisateurUncheckedCreateWithoutUtilisateurInputSchema), z.lazy(() => DemarcheUtilisateurUncheckedCreateWithoutUtilisateurInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DemarcheUtilisateurCreateOrConnectWithoutUtilisateurInputSchema), z.lazy(() => DemarcheUtilisateurCreateOrConnectWithoutUtilisateurInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DemarcheUtilisateurCreateManyUtilisateurInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DemarcheUtilisateurWhereUniqueInputSchema), z.lazy(() => DemarcheUtilisateurWhereUniqueInputSchema).array() ]).optional(),
});

export const NotificationCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.NotificationCreateNestedManyWithoutUserInput> = z.strictObject({
  create: z.union([ z.lazy(() => NotificationCreateWithoutUserInputSchema), z.lazy(() => NotificationCreateWithoutUserInputSchema).array(), z.lazy(() => NotificationUncheckedCreateWithoutUserInputSchema), z.lazy(() => NotificationUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NotificationCreateOrConnectWithoutUserInputSchema), z.lazy(() => NotificationCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NotificationCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema), z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
});

export const AccountCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateNestedManyWithoutUserInput> = z.strictObject({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema), z.lazy(() => AccountCreateWithoutUserInputSchema).array(), z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema), z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema), z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema), z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
});

export const SessionCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateNestedManyWithoutUserInput> = z.strictObject({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema), z.lazy(() => SessionCreateWithoutUserInputSchema).array(), z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema), z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema), z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema), z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
});

export const DocumentUncheckedCreateNestedManyWithoutProprietaireInputSchema: z.ZodType<Prisma.DocumentUncheckedCreateNestedManyWithoutProprietaireInput> = z.strictObject({
  create: z.union([ z.lazy(() => DocumentCreateWithoutProprietaireInputSchema), z.lazy(() => DocumentCreateWithoutProprietaireInputSchema).array(), z.lazy(() => DocumentUncheckedCreateWithoutProprietaireInputSchema), z.lazy(() => DocumentUncheckedCreateWithoutProprietaireInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DocumentCreateOrConnectWithoutProprietaireInputSchema), z.lazy(() => DocumentCreateOrConnectWithoutProprietaireInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DocumentCreateManyProprietaireInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema), z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
});

export const DossierUncheckedCreateNestedManyWithoutProprietaireInputSchema: z.ZodType<Prisma.DossierUncheckedCreateNestedManyWithoutProprietaireInput> = z.strictObject({
  create: z.union([ z.lazy(() => DossierCreateWithoutProprietaireInputSchema), z.lazy(() => DossierCreateWithoutProprietaireInputSchema).array(), z.lazy(() => DossierUncheckedCreateWithoutProprietaireInputSchema), z.lazy(() => DossierUncheckedCreateWithoutProprietaireInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DossierCreateOrConnectWithoutProprietaireInputSchema), z.lazy(() => DossierCreateOrConnectWithoutProprietaireInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DossierCreateManyProprietaireInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DossierWhereUniqueInputSchema), z.lazy(() => DossierWhereUniqueInputSchema).array() ]).optional(),
});

export const DemarcheUtilisateurUncheckedCreateNestedManyWithoutUtilisateurInputSchema: z.ZodType<Prisma.DemarcheUtilisateurUncheckedCreateNestedManyWithoutUtilisateurInput> = z.strictObject({
  create: z.union([ z.lazy(() => DemarcheUtilisateurCreateWithoutUtilisateurInputSchema), z.lazy(() => DemarcheUtilisateurCreateWithoutUtilisateurInputSchema).array(), z.lazy(() => DemarcheUtilisateurUncheckedCreateWithoutUtilisateurInputSchema), z.lazy(() => DemarcheUtilisateurUncheckedCreateWithoutUtilisateurInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DemarcheUtilisateurCreateOrConnectWithoutUtilisateurInputSchema), z.lazy(() => DemarcheUtilisateurCreateOrConnectWithoutUtilisateurInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DemarcheUtilisateurCreateManyUtilisateurInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DemarcheUtilisateurWhereUniqueInputSchema), z.lazy(() => DemarcheUtilisateurWhereUniqueInputSchema).array() ]).optional(),
});

export const NotificationUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.NotificationUncheckedCreateNestedManyWithoutUserInput> = z.strictObject({
  create: z.union([ z.lazy(() => NotificationCreateWithoutUserInputSchema), z.lazy(() => NotificationCreateWithoutUserInputSchema).array(), z.lazy(() => NotificationUncheckedCreateWithoutUserInputSchema), z.lazy(() => NotificationUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NotificationCreateOrConnectWithoutUserInputSchema), z.lazy(() => NotificationCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NotificationCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema), z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
});

export const AccountUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateNestedManyWithoutUserInput> = z.strictObject({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema), z.lazy(() => AccountCreateWithoutUserInputSchema).array(), z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema), z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema), z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema), z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
});

export const SessionUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateNestedManyWithoutUserInput> = z.strictObject({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema), z.lazy(() => SessionCreateWithoutUserInputSchema).array(), z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema), z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema), z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema), z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
});

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.strictObject({
  set: z.string().optional().nullable(),
  unset: z.boolean().optional(),
});

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.strictObject({
  set: z.coerce.date().optional().nullable(),
  unset: z.boolean().optional(),
});

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.strictObject({
  set: z.coerce.date().optional(),
});

export const UserPreferencesNullableUpdateEnvelopeInputSchema: z.ZodType<Prisma.UserPreferencesNullableUpdateEnvelopeInput> = z.strictObject({
  set: z.lazy(() => UserPreferencesCreateInputSchema).optional().nullable(),
  upsert: z.lazy(() => UserPreferencesUpsertInputSchema).optional(),
  unset: z.boolean().optional(),
});

export const DocumentUpdateManyWithoutProprietaireNestedInputSchema: z.ZodType<Prisma.DocumentUpdateManyWithoutProprietaireNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => DocumentCreateWithoutProprietaireInputSchema), z.lazy(() => DocumentCreateWithoutProprietaireInputSchema).array(), z.lazy(() => DocumentUncheckedCreateWithoutProprietaireInputSchema), z.lazy(() => DocumentUncheckedCreateWithoutProprietaireInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DocumentCreateOrConnectWithoutProprietaireInputSchema), z.lazy(() => DocumentCreateOrConnectWithoutProprietaireInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DocumentUpsertWithWhereUniqueWithoutProprietaireInputSchema), z.lazy(() => DocumentUpsertWithWhereUniqueWithoutProprietaireInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DocumentCreateManyProprietaireInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema), z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema), z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema), z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema), z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DocumentUpdateWithWhereUniqueWithoutProprietaireInputSchema), z.lazy(() => DocumentUpdateWithWhereUniqueWithoutProprietaireInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DocumentUpdateManyWithWhereWithoutProprietaireInputSchema), z.lazy(() => DocumentUpdateManyWithWhereWithoutProprietaireInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DocumentScalarWhereInputSchema), z.lazy(() => DocumentScalarWhereInputSchema).array() ]).optional(),
});

export const DossierUpdateManyWithoutProprietaireNestedInputSchema: z.ZodType<Prisma.DossierUpdateManyWithoutProprietaireNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => DossierCreateWithoutProprietaireInputSchema), z.lazy(() => DossierCreateWithoutProprietaireInputSchema).array(), z.lazy(() => DossierUncheckedCreateWithoutProprietaireInputSchema), z.lazy(() => DossierUncheckedCreateWithoutProprietaireInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DossierCreateOrConnectWithoutProprietaireInputSchema), z.lazy(() => DossierCreateOrConnectWithoutProprietaireInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DossierUpsertWithWhereUniqueWithoutProprietaireInputSchema), z.lazy(() => DossierUpsertWithWhereUniqueWithoutProprietaireInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DossierCreateManyProprietaireInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DossierWhereUniqueInputSchema), z.lazy(() => DossierWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DossierWhereUniqueInputSchema), z.lazy(() => DossierWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DossierWhereUniqueInputSchema), z.lazy(() => DossierWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DossierWhereUniqueInputSchema), z.lazy(() => DossierWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DossierUpdateWithWhereUniqueWithoutProprietaireInputSchema), z.lazy(() => DossierUpdateWithWhereUniqueWithoutProprietaireInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DossierUpdateManyWithWhereWithoutProprietaireInputSchema), z.lazy(() => DossierUpdateManyWithWhereWithoutProprietaireInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DossierScalarWhereInputSchema), z.lazy(() => DossierScalarWhereInputSchema).array() ]).optional(),
});

export const DemarcheUtilisateurUpdateManyWithoutUtilisateurNestedInputSchema: z.ZodType<Prisma.DemarcheUtilisateurUpdateManyWithoutUtilisateurNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => DemarcheUtilisateurCreateWithoutUtilisateurInputSchema), z.lazy(() => DemarcheUtilisateurCreateWithoutUtilisateurInputSchema).array(), z.lazy(() => DemarcheUtilisateurUncheckedCreateWithoutUtilisateurInputSchema), z.lazy(() => DemarcheUtilisateurUncheckedCreateWithoutUtilisateurInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DemarcheUtilisateurCreateOrConnectWithoutUtilisateurInputSchema), z.lazy(() => DemarcheUtilisateurCreateOrConnectWithoutUtilisateurInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DemarcheUtilisateurUpsertWithWhereUniqueWithoutUtilisateurInputSchema), z.lazy(() => DemarcheUtilisateurUpsertWithWhereUniqueWithoutUtilisateurInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DemarcheUtilisateurCreateManyUtilisateurInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DemarcheUtilisateurWhereUniqueInputSchema), z.lazy(() => DemarcheUtilisateurWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DemarcheUtilisateurWhereUniqueInputSchema), z.lazy(() => DemarcheUtilisateurWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DemarcheUtilisateurWhereUniqueInputSchema), z.lazy(() => DemarcheUtilisateurWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DemarcheUtilisateurWhereUniqueInputSchema), z.lazy(() => DemarcheUtilisateurWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DemarcheUtilisateurUpdateWithWhereUniqueWithoutUtilisateurInputSchema), z.lazy(() => DemarcheUtilisateurUpdateWithWhereUniqueWithoutUtilisateurInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DemarcheUtilisateurUpdateManyWithWhereWithoutUtilisateurInputSchema), z.lazy(() => DemarcheUtilisateurUpdateManyWithWhereWithoutUtilisateurInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DemarcheUtilisateurScalarWhereInputSchema), z.lazy(() => DemarcheUtilisateurScalarWhereInputSchema).array() ]).optional(),
});

export const NotificationUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.NotificationUpdateManyWithoutUserNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => NotificationCreateWithoutUserInputSchema), z.lazy(() => NotificationCreateWithoutUserInputSchema).array(), z.lazy(() => NotificationUncheckedCreateWithoutUserInputSchema), z.lazy(() => NotificationUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NotificationCreateOrConnectWithoutUserInputSchema), z.lazy(() => NotificationCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => NotificationUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => NotificationUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NotificationCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema), z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema), z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema), z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema), z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => NotificationUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => NotificationUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => NotificationUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => NotificationUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => NotificationScalarWhereInputSchema), z.lazy(() => NotificationScalarWhereInputSchema).array() ]).optional(),
});

export const AccountUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUpdateManyWithoutUserNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema), z.lazy(() => AccountCreateWithoutUserInputSchema).array(), z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema), z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema), z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccountWhereUniqueInputSchema), z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema), z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountWhereUniqueInputSchema), z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema), z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountScalarWhereInputSchema), z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
});

export const SessionUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUpdateManyWithoutUserNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema), z.lazy(() => SessionCreateWithoutUserInputSchema).array(), z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema), z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema), z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema), z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema), z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema), z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema), z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema), z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
});

export const DocumentUncheckedUpdateManyWithoutProprietaireNestedInputSchema: z.ZodType<Prisma.DocumentUncheckedUpdateManyWithoutProprietaireNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => DocumentCreateWithoutProprietaireInputSchema), z.lazy(() => DocumentCreateWithoutProprietaireInputSchema).array(), z.lazy(() => DocumentUncheckedCreateWithoutProprietaireInputSchema), z.lazy(() => DocumentUncheckedCreateWithoutProprietaireInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DocumentCreateOrConnectWithoutProprietaireInputSchema), z.lazy(() => DocumentCreateOrConnectWithoutProprietaireInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DocumentUpsertWithWhereUniqueWithoutProprietaireInputSchema), z.lazy(() => DocumentUpsertWithWhereUniqueWithoutProprietaireInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DocumentCreateManyProprietaireInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema), z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema), z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema), z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema), z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DocumentUpdateWithWhereUniqueWithoutProprietaireInputSchema), z.lazy(() => DocumentUpdateWithWhereUniqueWithoutProprietaireInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DocumentUpdateManyWithWhereWithoutProprietaireInputSchema), z.lazy(() => DocumentUpdateManyWithWhereWithoutProprietaireInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DocumentScalarWhereInputSchema), z.lazy(() => DocumentScalarWhereInputSchema).array() ]).optional(),
});

export const DossierUncheckedUpdateManyWithoutProprietaireNestedInputSchema: z.ZodType<Prisma.DossierUncheckedUpdateManyWithoutProprietaireNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => DossierCreateWithoutProprietaireInputSchema), z.lazy(() => DossierCreateWithoutProprietaireInputSchema).array(), z.lazy(() => DossierUncheckedCreateWithoutProprietaireInputSchema), z.lazy(() => DossierUncheckedCreateWithoutProprietaireInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DossierCreateOrConnectWithoutProprietaireInputSchema), z.lazy(() => DossierCreateOrConnectWithoutProprietaireInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DossierUpsertWithWhereUniqueWithoutProprietaireInputSchema), z.lazy(() => DossierUpsertWithWhereUniqueWithoutProprietaireInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DossierCreateManyProprietaireInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DossierWhereUniqueInputSchema), z.lazy(() => DossierWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DossierWhereUniqueInputSchema), z.lazy(() => DossierWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DossierWhereUniqueInputSchema), z.lazy(() => DossierWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DossierWhereUniqueInputSchema), z.lazy(() => DossierWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DossierUpdateWithWhereUniqueWithoutProprietaireInputSchema), z.lazy(() => DossierUpdateWithWhereUniqueWithoutProprietaireInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DossierUpdateManyWithWhereWithoutProprietaireInputSchema), z.lazy(() => DossierUpdateManyWithWhereWithoutProprietaireInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DossierScalarWhereInputSchema), z.lazy(() => DossierScalarWhereInputSchema).array() ]).optional(),
});

export const DemarcheUtilisateurUncheckedUpdateManyWithoutUtilisateurNestedInputSchema: z.ZodType<Prisma.DemarcheUtilisateurUncheckedUpdateManyWithoutUtilisateurNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => DemarcheUtilisateurCreateWithoutUtilisateurInputSchema), z.lazy(() => DemarcheUtilisateurCreateWithoutUtilisateurInputSchema).array(), z.lazy(() => DemarcheUtilisateurUncheckedCreateWithoutUtilisateurInputSchema), z.lazy(() => DemarcheUtilisateurUncheckedCreateWithoutUtilisateurInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DemarcheUtilisateurCreateOrConnectWithoutUtilisateurInputSchema), z.lazy(() => DemarcheUtilisateurCreateOrConnectWithoutUtilisateurInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DemarcheUtilisateurUpsertWithWhereUniqueWithoutUtilisateurInputSchema), z.lazy(() => DemarcheUtilisateurUpsertWithWhereUniqueWithoutUtilisateurInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DemarcheUtilisateurCreateManyUtilisateurInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DemarcheUtilisateurWhereUniqueInputSchema), z.lazy(() => DemarcheUtilisateurWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DemarcheUtilisateurWhereUniqueInputSchema), z.lazy(() => DemarcheUtilisateurWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DemarcheUtilisateurWhereUniqueInputSchema), z.lazy(() => DemarcheUtilisateurWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DemarcheUtilisateurWhereUniqueInputSchema), z.lazy(() => DemarcheUtilisateurWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DemarcheUtilisateurUpdateWithWhereUniqueWithoutUtilisateurInputSchema), z.lazy(() => DemarcheUtilisateurUpdateWithWhereUniqueWithoutUtilisateurInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DemarcheUtilisateurUpdateManyWithWhereWithoutUtilisateurInputSchema), z.lazy(() => DemarcheUtilisateurUpdateManyWithWhereWithoutUtilisateurInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DemarcheUtilisateurScalarWhereInputSchema), z.lazy(() => DemarcheUtilisateurScalarWhereInputSchema).array() ]).optional(),
});

export const NotificationUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.NotificationUncheckedUpdateManyWithoutUserNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => NotificationCreateWithoutUserInputSchema), z.lazy(() => NotificationCreateWithoutUserInputSchema).array(), z.lazy(() => NotificationUncheckedCreateWithoutUserInputSchema), z.lazy(() => NotificationUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NotificationCreateOrConnectWithoutUserInputSchema), z.lazy(() => NotificationCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => NotificationUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => NotificationUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NotificationCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema), z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema), z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema), z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema), z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => NotificationUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => NotificationUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => NotificationUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => NotificationUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => NotificationScalarWhereInputSchema), z.lazy(() => NotificationScalarWhereInputSchema).array() ]).optional(),
});

export const AccountUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema), z.lazy(() => AccountCreateWithoutUserInputSchema).array(), z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema), z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema), z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccountWhereUniqueInputSchema), z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema), z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountWhereUniqueInputSchema), z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema), z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountScalarWhereInputSchema), z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
});

export const SessionUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema), z.lazy(() => SessionCreateWithoutUserInputSchema).array(), z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema), z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema), z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema), z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema), z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema), z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema), z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema), z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
});

export const DocumentCreatetagsInputSchema: z.ZodType<Prisma.DocumentCreatetagsInput> = z.strictObject({
  set: z.string().array(),
});

export const UserCreateNestedOneWithoutDocumentsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutDocumentsInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutDocumentsInputSchema), z.lazy(() => UserUncheckedCreateWithoutDocumentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutDocumentsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
});

export const DossierCreateNestedManyWithoutDocumentsInputSchema: z.ZodType<Prisma.DossierCreateNestedManyWithoutDocumentsInput> = z.strictObject({
  create: z.union([ z.lazy(() => DossierCreateWithoutDocumentsInputSchema), z.lazy(() => DossierCreateWithoutDocumentsInputSchema).array(), z.lazy(() => DossierUncheckedCreateWithoutDocumentsInputSchema), z.lazy(() => DossierUncheckedCreateWithoutDocumentsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DossierCreateOrConnectWithoutDocumentsInputSchema), z.lazy(() => DossierCreateOrConnectWithoutDocumentsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DossierWhereUniqueInputSchema), z.lazy(() => DossierWhereUniqueInputSchema).array() ]).optional(),
});

export const NotificationCreateNestedManyWithoutDocumentLieInputSchema: z.ZodType<Prisma.NotificationCreateNestedManyWithoutDocumentLieInput> = z.strictObject({
  create: z.union([ z.lazy(() => NotificationCreateWithoutDocumentLieInputSchema), z.lazy(() => NotificationCreateWithoutDocumentLieInputSchema).array(), z.lazy(() => NotificationUncheckedCreateWithoutDocumentLieInputSchema), z.lazy(() => NotificationUncheckedCreateWithoutDocumentLieInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NotificationCreateOrConnectWithoutDocumentLieInputSchema), z.lazy(() => NotificationCreateOrConnectWithoutDocumentLieInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NotificationCreateManyDocumentLieInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema), z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
});

export const DocumentCreatedossierIdsInputSchema: z.ZodType<Prisma.DocumentCreatedossierIdsInput> = z.strictObject({
  set: z.string().array(),
});

export const DossierUncheckedCreateNestedManyWithoutDocumentsInputSchema: z.ZodType<Prisma.DossierUncheckedCreateNestedManyWithoutDocumentsInput> = z.strictObject({
  create: z.union([ z.lazy(() => DossierCreateWithoutDocumentsInputSchema), z.lazy(() => DossierCreateWithoutDocumentsInputSchema).array(), z.lazy(() => DossierUncheckedCreateWithoutDocumentsInputSchema), z.lazy(() => DossierUncheckedCreateWithoutDocumentsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DossierCreateOrConnectWithoutDocumentsInputSchema), z.lazy(() => DossierCreateOrConnectWithoutDocumentsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DossierWhereUniqueInputSchema), z.lazy(() => DossierWhereUniqueInputSchema).array() ]).optional(),
});

export const NotificationUncheckedCreateNestedManyWithoutDocumentLieInputSchema: z.ZodType<Prisma.NotificationUncheckedCreateNestedManyWithoutDocumentLieInput> = z.strictObject({
  create: z.union([ z.lazy(() => NotificationCreateWithoutDocumentLieInputSchema), z.lazy(() => NotificationCreateWithoutDocumentLieInputSchema).array(), z.lazy(() => NotificationUncheckedCreateWithoutDocumentLieInputSchema), z.lazy(() => NotificationUncheckedCreateWithoutDocumentLieInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NotificationCreateOrConnectWithoutDocumentLieInputSchema), z.lazy(() => NotificationCreateOrConnectWithoutDocumentLieInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NotificationCreateManyDocumentLieInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema), z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
});

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.strictObject({
  set: z.string().optional(),
});

export const EnumDocumentTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumDocumentTypeFieldUpdateOperationsInput> = z.strictObject({
  set: z.lazy(() => DocumentTypeSchema).optional(),
});

export const EnumDocumentStatutFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumDocumentStatutFieldUpdateOperationsInput> = z.strictObject({
  set: z.lazy(() => DocumentStatutSchema).optional(),
});

export const DocumentUpdatetagsInputSchema: z.ZodType<Prisma.DocumentUpdatetagsInput> = z.strictObject({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
});

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.strictObject({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional(),
});

export const UserUpdateOneRequiredWithoutDocumentsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutDocumentsNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutDocumentsInputSchema), z.lazy(() => UserUncheckedCreateWithoutDocumentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutDocumentsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutDocumentsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutDocumentsInputSchema), z.lazy(() => UserUpdateWithoutDocumentsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutDocumentsInputSchema) ]).optional(),
});

export const DossierUpdateManyWithoutDocumentsNestedInputSchema: z.ZodType<Prisma.DossierUpdateManyWithoutDocumentsNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => DossierCreateWithoutDocumentsInputSchema), z.lazy(() => DossierCreateWithoutDocumentsInputSchema).array(), z.lazy(() => DossierUncheckedCreateWithoutDocumentsInputSchema), z.lazy(() => DossierUncheckedCreateWithoutDocumentsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DossierCreateOrConnectWithoutDocumentsInputSchema), z.lazy(() => DossierCreateOrConnectWithoutDocumentsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DossierUpsertWithWhereUniqueWithoutDocumentsInputSchema), z.lazy(() => DossierUpsertWithWhereUniqueWithoutDocumentsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => DossierWhereUniqueInputSchema), z.lazy(() => DossierWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DossierWhereUniqueInputSchema), z.lazy(() => DossierWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DossierWhereUniqueInputSchema), z.lazy(() => DossierWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DossierWhereUniqueInputSchema), z.lazy(() => DossierWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DossierUpdateWithWhereUniqueWithoutDocumentsInputSchema), z.lazy(() => DossierUpdateWithWhereUniqueWithoutDocumentsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DossierUpdateManyWithWhereWithoutDocumentsInputSchema), z.lazy(() => DossierUpdateManyWithWhereWithoutDocumentsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DossierScalarWhereInputSchema), z.lazy(() => DossierScalarWhereInputSchema).array() ]).optional(),
});

export const NotificationUpdateManyWithoutDocumentLieNestedInputSchema: z.ZodType<Prisma.NotificationUpdateManyWithoutDocumentLieNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => NotificationCreateWithoutDocumentLieInputSchema), z.lazy(() => NotificationCreateWithoutDocumentLieInputSchema).array(), z.lazy(() => NotificationUncheckedCreateWithoutDocumentLieInputSchema), z.lazy(() => NotificationUncheckedCreateWithoutDocumentLieInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NotificationCreateOrConnectWithoutDocumentLieInputSchema), z.lazy(() => NotificationCreateOrConnectWithoutDocumentLieInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => NotificationUpsertWithWhereUniqueWithoutDocumentLieInputSchema), z.lazy(() => NotificationUpsertWithWhereUniqueWithoutDocumentLieInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NotificationCreateManyDocumentLieInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema), z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema), z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema), z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema), z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => NotificationUpdateWithWhereUniqueWithoutDocumentLieInputSchema), z.lazy(() => NotificationUpdateWithWhereUniqueWithoutDocumentLieInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => NotificationUpdateManyWithWhereWithoutDocumentLieInputSchema), z.lazy(() => NotificationUpdateManyWithWhereWithoutDocumentLieInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => NotificationScalarWhereInputSchema), z.lazy(() => NotificationScalarWhereInputSchema).array() ]).optional(),
});

export const DocumentUpdatedossierIdsInputSchema: z.ZodType<Prisma.DocumentUpdatedossierIdsInput> = z.strictObject({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
});

export const DossierUncheckedUpdateManyWithoutDocumentsNestedInputSchema: z.ZodType<Prisma.DossierUncheckedUpdateManyWithoutDocumentsNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => DossierCreateWithoutDocumentsInputSchema), z.lazy(() => DossierCreateWithoutDocumentsInputSchema).array(), z.lazy(() => DossierUncheckedCreateWithoutDocumentsInputSchema), z.lazy(() => DossierUncheckedCreateWithoutDocumentsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DossierCreateOrConnectWithoutDocumentsInputSchema), z.lazy(() => DossierCreateOrConnectWithoutDocumentsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DossierUpsertWithWhereUniqueWithoutDocumentsInputSchema), z.lazy(() => DossierUpsertWithWhereUniqueWithoutDocumentsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => DossierWhereUniqueInputSchema), z.lazy(() => DossierWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DossierWhereUniqueInputSchema), z.lazy(() => DossierWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DossierWhereUniqueInputSchema), z.lazy(() => DossierWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DossierWhereUniqueInputSchema), z.lazy(() => DossierWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DossierUpdateWithWhereUniqueWithoutDocumentsInputSchema), z.lazy(() => DossierUpdateWithWhereUniqueWithoutDocumentsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DossierUpdateManyWithWhereWithoutDocumentsInputSchema), z.lazy(() => DossierUpdateManyWithWhereWithoutDocumentsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DossierScalarWhereInputSchema), z.lazy(() => DossierScalarWhereInputSchema).array() ]).optional(),
});

export const NotificationUncheckedUpdateManyWithoutDocumentLieNestedInputSchema: z.ZodType<Prisma.NotificationUncheckedUpdateManyWithoutDocumentLieNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => NotificationCreateWithoutDocumentLieInputSchema), z.lazy(() => NotificationCreateWithoutDocumentLieInputSchema).array(), z.lazy(() => NotificationUncheckedCreateWithoutDocumentLieInputSchema), z.lazy(() => NotificationUncheckedCreateWithoutDocumentLieInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NotificationCreateOrConnectWithoutDocumentLieInputSchema), z.lazy(() => NotificationCreateOrConnectWithoutDocumentLieInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => NotificationUpsertWithWhereUniqueWithoutDocumentLieInputSchema), z.lazy(() => NotificationUpsertWithWhereUniqueWithoutDocumentLieInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NotificationCreateManyDocumentLieInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema), z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema), z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema), z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema), z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => NotificationUpdateWithWhereUniqueWithoutDocumentLieInputSchema), z.lazy(() => NotificationUpdateWithWhereUniqueWithoutDocumentLieInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => NotificationUpdateManyWithWhereWithoutDocumentLieInputSchema), z.lazy(() => NotificationUpdateManyWithWhereWithoutDocumentLieInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => NotificationScalarWhereInputSchema), z.lazy(() => NotificationScalarWhereInputSchema).array() ]).optional(),
});

export const UserCreateNestedOneWithoutDossiersInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutDossiersInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutDossiersInputSchema), z.lazy(() => UserUncheckedCreateWithoutDossiersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutDossiersInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
});

export const DocumentCreateNestedManyWithoutDossiersInputSchema: z.ZodType<Prisma.DocumentCreateNestedManyWithoutDossiersInput> = z.strictObject({
  create: z.union([ z.lazy(() => DocumentCreateWithoutDossiersInputSchema), z.lazy(() => DocumentCreateWithoutDossiersInputSchema).array(), z.lazy(() => DocumentUncheckedCreateWithoutDossiersInputSchema), z.lazy(() => DocumentUncheckedCreateWithoutDossiersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DocumentCreateOrConnectWithoutDossiersInputSchema), z.lazy(() => DocumentCreateOrConnectWithoutDossiersInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema), z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
});

export const DossierCreateidsDocumentsInputSchema: z.ZodType<Prisma.DossierCreateidsDocumentsInput> = z.strictObject({
  set: z.string().array(),
});

export const DocumentUncheckedCreateNestedManyWithoutDossiersInputSchema: z.ZodType<Prisma.DocumentUncheckedCreateNestedManyWithoutDossiersInput> = z.strictObject({
  create: z.union([ z.lazy(() => DocumentCreateWithoutDossiersInputSchema), z.lazy(() => DocumentCreateWithoutDossiersInputSchema).array(), z.lazy(() => DocumentUncheckedCreateWithoutDossiersInputSchema), z.lazy(() => DocumentUncheckedCreateWithoutDossiersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DocumentCreateOrConnectWithoutDossiersInputSchema), z.lazy(() => DocumentCreateOrConnectWithoutDossiersInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema), z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
});

export const UserUpdateOneRequiredWithoutDossiersNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutDossiersNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutDossiersInputSchema), z.lazy(() => UserUncheckedCreateWithoutDossiersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutDossiersInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutDossiersInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutDossiersInputSchema), z.lazy(() => UserUpdateWithoutDossiersInputSchema), z.lazy(() => UserUncheckedUpdateWithoutDossiersInputSchema) ]).optional(),
});

export const DocumentUpdateManyWithoutDossiersNestedInputSchema: z.ZodType<Prisma.DocumentUpdateManyWithoutDossiersNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => DocumentCreateWithoutDossiersInputSchema), z.lazy(() => DocumentCreateWithoutDossiersInputSchema).array(), z.lazy(() => DocumentUncheckedCreateWithoutDossiersInputSchema), z.lazy(() => DocumentUncheckedCreateWithoutDossiersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DocumentCreateOrConnectWithoutDossiersInputSchema), z.lazy(() => DocumentCreateOrConnectWithoutDossiersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DocumentUpsertWithWhereUniqueWithoutDossiersInputSchema), z.lazy(() => DocumentUpsertWithWhereUniqueWithoutDossiersInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema), z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema), z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema), z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema), z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DocumentUpdateWithWhereUniqueWithoutDossiersInputSchema), z.lazy(() => DocumentUpdateWithWhereUniqueWithoutDossiersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DocumentUpdateManyWithWhereWithoutDossiersInputSchema), z.lazy(() => DocumentUpdateManyWithWhereWithoutDossiersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DocumentScalarWhereInputSchema), z.lazy(() => DocumentScalarWhereInputSchema).array() ]).optional(),
});

export const DossierUpdateidsDocumentsInputSchema: z.ZodType<Prisma.DossierUpdateidsDocumentsInput> = z.strictObject({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
});

export const DocumentUncheckedUpdateManyWithoutDossiersNestedInputSchema: z.ZodType<Prisma.DocumentUncheckedUpdateManyWithoutDossiersNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => DocumentCreateWithoutDossiersInputSchema), z.lazy(() => DocumentCreateWithoutDossiersInputSchema).array(), z.lazy(() => DocumentUncheckedCreateWithoutDossiersInputSchema), z.lazy(() => DocumentUncheckedCreateWithoutDossiersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DocumentCreateOrConnectWithoutDossiersInputSchema), z.lazy(() => DocumentCreateOrConnectWithoutDossiersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DocumentUpsertWithWhereUniqueWithoutDossiersInputSchema), z.lazy(() => DocumentUpsertWithWhereUniqueWithoutDossiersInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema), z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema), z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema), z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema), z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DocumentUpdateWithWhereUniqueWithoutDossiersInputSchema), z.lazy(() => DocumentUpdateWithWhereUniqueWithoutDossiersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DocumentUpdateManyWithWhereWithoutDossiersInputSchema), z.lazy(() => DocumentUpdateManyWithWhereWithoutDossiersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DocumentScalarWhereInputSchema), z.lazy(() => DocumentScalarWhereInputSchema).array() ]).optional(),
});

export const ModeleDemarcheCreatetypesDocumentsRequisInputSchema: z.ZodType<Prisma.ModeleDemarcheCreatetypesDocumentsRequisInput> = z.strictObject({
  set: z.string().array(),
});

export const DemarcheUtilisateurCreateNestedManyWithoutModeleInputSchema: z.ZodType<Prisma.DemarcheUtilisateurCreateNestedManyWithoutModeleInput> = z.strictObject({
  create: z.union([ z.lazy(() => DemarcheUtilisateurCreateWithoutModeleInputSchema), z.lazy(() => DemarcheUtilisateurCreateWithoutModeleInputSchema).array(), z.lazy(() => DemarcheUtilisateurUncheckedCreateWithoutModeleInputSchema), z.lazy(() => DemarcheUtilisateurUncheckedCreateWithoutModeleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DemarcheUtilisateurCreateOrConnectWithoutModeleInputSchema), z.lazy(() => DemarcheUtilisateurCreateOrConnectWithoutModeleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DemarcheUtilisateurCreateManyModeleInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DemarcheUtilisateurWhereUniqueInputSchema), z.lazy(() => DemarcheUtilisateurWhereUniqueInputSchema).array() ]).optional(),
});

export const DemarcheUtilisateurUncheckedCreateNestedManyWithoutModeleInputSchema: z.ZodType<Prisma.DemarcheUtilisateurUncheckedCreateNestedManyWithoutModeleInput> = z.strictObject({
  create: z.union([ z.lazy(() => DemarcheUtilisateurCreateWithoutModeleInputSchema), z.lazy(() => DemarcheUtilisateurCreateWithoutModeleInputSchema).array(), z.lazy(() => DemarcheUtilisateurUncheckedCreateWithoutModeleInputSchema), z.lazy(() => DemarcheUtilisateurUncheckedCreateWithoutModeleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DemarcheUtilisateurCreateOrConnectWithoutModeleInputSchema), z.lazy(() => DemarcheUtilisateurCreateOrConnectWithoutModeleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DemarcheUtilisateurCreateManyModeleInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DemarcheUtilisateurWhereUniqueInputSchema), z.lazy(() => DemarcheUtilisateurWhereUniqueInputSchema).array() ]).optional(),
});

export const ModeleDemarcheUpdatetypesDocumentsRequisInputSchema: z.ZodType<Prisma.ModeleDemarcheUpdatetypesDocumentsRequisInput> = z.strictObject({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
});

export const EnumDemarcheCategorieFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumDemarcheCategorieFieldUpdateOperationsInput> = z.strictObject({
  set: z.lazy(() => DemarcheCategorieSchema).optional(),
});

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.strictObject({
  set: z.boolean().optional(),
});

export const DemarcheUtilisateurUpdateManyWithoutModeleNestedInputSchema: z.ZodType<Prisma.DemarcheUtilisateurUpdateManyWithoutModeleNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => DemarcheUtilisateurCreateWithoutModeleInputSchema), z.lazy(() => DemarcheUtilisateurCreateWithoutModeleInputSchema).array(), z.lazy(() => DemarcheUtilisateurUncheckedCreateWithoutModeleInputSchema), z.lazy(() => DemarcheUtilisateurUncheckedCreateWithoutModeleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DemarcheUtilisateurCreateOrConnectWithoutModeleInputSchema), z.lazy(() => DemarcheUtilisateurCreateOrConnectWithoutModeleInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DemarcheUtilisateurUpsertWithWhereUniqueWithoutModeleInputSchema), z.lazy(() => DemarcheUtilisateurUpsertWithWhereUniqueWithoutModeleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DemarcheUtilisateurCreateManyModeleInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DemarcheUtilisateurWhereUniqueInputSchema), z.lazy(() => DemarcheUtilisateurWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DemarcheUtilisateurWhereUniqueInputSchema), z.lazy(() => DemarcheUtilisateurWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DemarcheUtilisateurWhereUniqueInputSchema), z.lazy(() => DemarcheUtilisateurWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DemarcheUtilisateurWhereUniqueInputSchema), z.lazy(() => DemarcheUtilisateurWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DemarcheUtilisateurUpdateWithWhereUniqueWithoutModeleInputSchema), z.lazy(() => DemarcheUtilisateurUpdateWithWhereUniqueWithoutModeleInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DemarcheUtilisateurUpdateManyWithWhereWithoutModeleInputSchema), z.lazy(() => DemarcheUtilisateurUpdateManyWithWhereWithoutModeleInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DemarcheUtilisateurScalarWhereInputSchema), z.lazy(() => DemarcheUtilisateurScalarWhereInputSchema).array() ]).optional(),
});

export const DemarcheUtilisateurUncheckedUpdateManyWithoutModeleNestedInputSchema: z.ZodType<Prisma.DemarcheUtilisateurUncheckedUpdateManyWithoutModeleNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => DemarcheUtilisateurCreateWithoutModeleInputSchema), z.lazy(() => DemarcheUtilisateurCreateWithoutModeleInputSchema).array(), z.lazy(() => DemarcheUtilisateurUncheckedCreateWithoutModeleInputSchema), z.lazy(() => DemarcheUtilisateurUncheckedCreateWithoutModeleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DemarcheUtilisateurCreateOrConnectWithoutModeleInputSchema), z.lazy(() => DemarcheUtilisateurCreateOrConnectWithoutModeleInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DemarcheUtilisateurUpsertWithWhereUniqueWithoutModeleInputSchema), z.lazy(() => DemarcheUtilisateurUpsertWithWhereUniqueWithoutModeleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DemarcheUtilisateurCreateManyModeleInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DemarcheUtilisateurWhereUniqueInputSchema), z.lazy(() => DemarcheUtilisateurWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DemarcheUtilisateurWhereUniqueInputSchema), z.lazy(() => DemarcheUtilisateurWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DemarcheUtilisateurWhereUniqueInputSchema), z.lazy(() => DemarcheUtilisateurWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DemarcheUtilisateurWhereUniqueInputSchema), z.lazy(() => DemarcheUtilisateurWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DemarcheUtilisateurUpdateWithWhereUniqueWithoutModeleInputSchema), z.lazy(() => DemarcheUtilisateurUpdateWithWhereUniqueWithoutModeleInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DemarcheUtilisateurUpdateManyWithWhereWithoutModeleInputSchema), z.lazy(() => DemarcheUtilisateurUpdateManyWithWhereWithoutModeleInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DemarcheUtilisateurScalarWhereInputSchema), z.lazy(() => DemarcheUtilisateurScalarWhereInputSchema).array() ]).optional(),
});

export const UserCreateNestedOneWithoutDemarchesUtilisateurInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutDemarchesUtilisateurInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutDemarchesUtilisateurInputSchema), z.lazy(() => UserUncheckedCreateWithoutDemarchesUtilisateurInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutDemarchesUtilisateurInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
});

export const ModeleDemarcheCreateNestedOneWithoutDemarchesUtilisateurInputSchema: z.ZodType<Prisma.ModeleDemarcheCreateNestedOneWithoutDemarchesUtilisateurInput> = z.strictObject({
  create: z.union([ z.lazy(() => ModeleDemarcheCreateWithoutDemarchesUtilisateurInputSchema), z.lazy(() => ModeleDemarcheUncheckedCreateWithoutDemarchesUtilisateurInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ModeleDemarcheCreateOrConnectWithoutDemarchesUtilisateurInputSchema).optional(),
  connect: z.lazy(() => ModeleDemarcheWhereUniqueInputSchema).optional(),
});

export const EnumDemarcheStatutFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumDemarcheStatutFieldUpdateOperationsInput> = z.strictObject({
  set: z.lazy(() => DemarcheStatutSchema).optional(),
});

export const UserUpdateOneRequiredWithoutDemarchesUtilisateurNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutDemarchesUtilisateurNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutDemarchesUtilisateurInputSchema), z.lazy(() => UserUncheckedCreateWithoutDemarchesUtilisateurInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutDemarchesUtilisateurInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutDemarchesUtilisateurInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutDemarchesUtilisateurInputSchema), z.lazy(() => UserUpdateWithoutDemarchesUtilisateurInputSchema), z.lazy(() => UserUncheckedUpdateWithoutDemarchesUtilisateurInputSchema) ]).optional(),
});

export const ModeleDemarcheUpdateOneRequiredWithoutDemarchesUtilisateurNestedInputSchema: z.ZodType<Prisma.ModeleDemarcheUpdateOneRequiredWithoutDemarchesUtilisateurNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ModeleDemarcheCreateWithoutDemarchesUtilisateurInputSchema), z.lazy(() => ModeleDemarcheUncheckedCreateWithoutDemarchesUtilisateurInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ModeleDemarcheCreateOrConnectWithoutDemarchesUtilisateurInputSchema).optional(),
  upsert: z.lazy(() => ModeleDemarcheUpsertWithoutDemarchesUtilisateurInputSchema).optional(),
  connect: z.lazy(() => ModeleDemarcheWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ModeleDemarcheUpdateToOneWithWhereWithoutDemarchesUtilisateurInputSchema), z.lazy(() => ModeleDemarcheUpdateWithoutDemarchesUtilisateurInputSchema), z.lazy(() => ModeleDemarcheUncheckedUpdateWithoutDemarchesUtilisateurInputSchema) ]).optional(),
});

export const UserCreateNestedOneWithoutNotificationsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutNotificationsInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutNotificationsInputSchema), z.lazy(() => UserUncheckedCreateWithoutNotificationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutNotificationsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
});

export const DocumentCreateNestedOneWithoutNotificationsInputSchema: z.ZodType<Prisma.DocumentCreateNestedOneWithoutNotificationsInput> = z.strictObject({
  create: z.union([ z.lazy(() => DocumentCreateWithoutNotificationsInputSchema), z.lazy(() => DocumentUncheckedCreateWithoutNotificationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DocumentCreateOrConnectWithoutNotificationsInputSchema).optional(),
  connect: z.lazy(() => DocumentWhereUniqueInputSchema).optional(),
});

export const EnumNotificationTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumNotificationTypeFieldUpdateOperationsInput> = z.strictObject({
  set: z.lazy(() => NotificationTypeSchema).optional(),
});

export const EnumNotificationPrioriteFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumNotificationPrioriteFieldUpdateOperationsInput> = z.strictObject({
  set: z.lazy(() => NotificationPrioriteSchema).optional(),
});

export const UserUpdateOneRequiredWithoutNotificationsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutNotificationsNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutNotificationsInputSchema), z.lazy(() => UserUncheckedCreateWithoutNotificationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutNotificationsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutNotificationsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutNotificationsInputSchema), z.lazy(() => UserUpdateWithoutNotificationsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutNotificationsInputSchema) ]).optional(),
});

export const DocumentUpdateOneWithoutNotificationsNestedInputSchema: z.ZodType<Prisma.DocumentUpdateOneWithoutNotificationsNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => DocumentCreateWithoutNotificationsInputSchema), z.lazy(() => DocumentUncheckedCreateWithoutNotificationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DocumentCreateOrConnectWithoutNotificationsInputSchema).optional(),
  upsert: z.lazy(() => DocumentUpsertWithoutNotificationsInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.union([ z.boolean(),z.lazy(() => DocumentWhereInputSchema) ]).optional(),
  connect: z.lazy(() => DocumentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => DocumentUpdateToOneWithWhereWithoutNotificationsInputSchema), z.lazy(() => DocumentUpdateWithoutNotificationsInputSchema), z.lazy(() => DocumentUncheckedUpdateWithoutNotificationsInputSchema) ]).optional(),
});

export const UserCreateNestedOneWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAccountsInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema), z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
});

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.strictObject({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional(),
  unset: z.boolean().optional(),
});

export const UserUpdateOneRequiredWithoutAccountsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAccountsNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema), z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutAccountsInputSchema), z.lazy(() => UserUpdateWithoutAccountsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]).optional(),
});

export const UserCreateNestedOneWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSessionsInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema), z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
});

export const UserUpdateOneRequiredWithoutSessionsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSessionsNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema), z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutSessionsInputSchema), z.lazy(() => UserUpdateWithoutSessionsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]).optional(),
});

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.strictObject({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
});

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.strictObject({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional(),
});

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.strictObject({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional(),
});

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.strictObject({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
});

export const UserPreferencesWhereInputSchema: z.ZodType<Prisma.UserPreferencesWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => UserPreferencesWhereInputSchema), z.lazy(() => UserPreferencesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserPreferencesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserPreferencesWhereInputSchema), z.lazy(() => UserPreferencesWhereInputSchema).array() ]).optional(),
  notifications: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  language: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
});

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.strictObject({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional(),
});

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
});

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.strictObject({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  isSet: z.boolean().optional(),
});

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.strictObject({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional(),
});

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.strictObject({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  isSet: z.boolean().optional(),
});

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.strictObject({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
});

export const NestedEnumDocumentTypeFilterSchema: z.ZodType<Prisma.NestedEnumDocumentTypeFilter> = z.strictObject({
  equals: z.lazy(() => DocumentTypeSchema).optional(),
  in: z.lazy(() => DocumentTypeSchema).array().optional(),
  notIn: z.lazy(() => DocumentTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => DocumentTypeSchema), z.lazy(() => NestedEnumDocumentTypeFilterSchema) ]).optional(),
});

export const NestedEnumDocumentStatutFilterSchema: z.ZodType<Prisma.NestedEnumDocumentStatutFilter> = z.strictObject({
  equals: z.lazy(() => DocumentStatutSchema).optional(),
  in: z.lazy(() => DocumentStatutSchema).array().optional(),
  notIn: z.lazy(() => DocumentStatutSchema).array().optional(),
  not: z.union([ z.lazy(() => DocumentStatutSchema), z.lazy(() => NestedEnumDocumentStatutFilterSchema) ]).optional(),
});

export const NestedEnumDocumentTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumDocumentTypeWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => DocumentTypeSchema).optional(),
  in: z.lazy(() => DocumentTypeSchema).array().optional(),
  notIn: z.lazy(() => DocumentTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => DocumentTypeSchema), z.lazy(() => NestedEnumDocumentTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumDocumentTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumDocumentTypeFilterSchema).optional(),
});

export const NestedEnumDocumentStatutWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumDocumentStatutWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => DocumentStatutSchema).optional(),
  in: z.lazy(() => DocumentStatutSchema).array().optional(),
  notIn: z.lazy(() => DocumentStatutSchema).array().optional(),
  not: z.union([ z.lazy(() => DocumentStatutSchema), z.lazy(() => NestedEnumDocumentStatutWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumDocumentStatutFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumDocumentStatutFilterSchema).optional(),
});

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional(),
});

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
});

export const NestedEnumDemarcheCategorieFilterSchema: z.ZodType<Prisma.NestedEnumDemarcheCategorieFilter> = z.strictObject({
  equals: z.lazy(() => DemarcheCategorieSchema).optional(),
  in: z.lazy(() => DemarcheCategorieSchema).array().optional(),
  notIn: z.lazy(() => DemarcheCategorieSchema).array().optional(),
  not: z.union([ z.lazy(() => DemarcheCategorieSchema), z.lazy(() => NestedEnumDemarcheCategorieFilterSchema) ]).optional(),
});

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.strictObject({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
});

export const NestedEnumDemarcheCategorieWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumDemarcheCategorieWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => DemarcheCategorieSchema).optional(),
  in: z.lazy(() => DemarcheCategorieSchema).array().optional(),
  notIn: z.lazy(() => DemarcheCategorieSchema).array().optional(),
  not: z.union([ z.lazy(() => DemarcheCategorieSchema), z.lazy(() => NestedEnumDemarcheCategorieWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumDemarcheCategorieFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumDemarcheCategorieFilterSchema).optional(),
});

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.strictObject({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional(),
});

export const NestedEnumDemarcheStatutFilterSchema: z.ZodType<Prisma.NestedEnumDemarcheStatutFilter> = z.strictObject({
  equals: z.lazy(() => DemarcheStatutSchema).optional(),
  in: z.lazy(() => DemarcheStatutSchema).array().optional(),
  notIn: z.lazy(() => DemarcheStatutSchema).array().optional(),
  not: z.union([ z.lazy(() => DemarcheStatutSchema), z.lazy(() => NestedEnumDemarcheStatutFilterSchema) ]).optional(),
});

export const NestedEnumDemarcheStatutWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumDemarcheStatutWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => DemarcheStatutSchema).optional(),
  in: z.lazy(() => DemarcheStatutSchema).array().optional(),
  notIn: z.lazy(() => DemarcheStatutSchema).array().optional(),
  not: z.union([ z.lazy(() => DemarcheStatutSchema), z.lazy(() => NestedEnumDemarcheStatutWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumDemarcheStatutFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumDemarcheStatutFilterSchema).optional(),
});

export const NestedEnumNotificationTypeFilterSchema: z.ZodType<Prisma.NestedEnumNotificationTypeFilter> = z.strictObject({
  equals: z.lazy(() => NotificationTypeSchema).optional(),
  in: z.lazy(() => NotificationTypeSchema).array().optional(),
  notIn: z.lazy(() => NotificationTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => NotificationTypeSchema), z.lazy(() => NestedEnumNotificationTypeFilterSchema) ]).optional(),
});

export const NestedEnumNotificationPrioriteFilterSchema: z.ZodType<Prisma.NestedEnumNotificationPrioriteFilter> = z.strictObject({
  equals: z.lazy(() => NotificationPrioriteSchema).optional(),
  in: z.lazy(() => NotificationPrioriteSchema).array().optional(),
  notIn: z.lazy(() => NotificationPrioriteSchema).array().optional(),
  not: z.union([ z.lazy(() => NotificationPrioriteSchema), z.lazy(() => NestedEnumNotificationPrioriteFilterSchema) ]).optional(),
});

export const NestedEnumNotificationTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumNotificationTypeWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => NotificationTypeSchema).optional(),
  in: z.lazy(() => NotificationTypeSchema).array().optional(),
  notIn: z.lazy(() => NotificationTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => NotificationTypeSchema), z.lazy(() => NestedEnumNotificationTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumNotificationTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumNotificationTypeFilterSchema).optional(),
});

export const NestedEnumNotificationPrioriteWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumNotificationPrioriteWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => NotificationPrioriteSchema).optional(),
  in: z.lazy(() => NotificationPrioriteSchema).array().optional(),
  notIn: z.lazy(() => NotificationPrioriteSchema).array().optional(),
  not: z.union([ z.lazy(() => NotificationPrioriteSchema), z.lazy(() => NestedEnumNotificationPrioriteWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumNotificationPrioriteFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumNotificationPrioriteFilterSchema).optional(),
});

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.strictObject({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  isSet: z.boolean().optional(),
});

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.strictObject({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional(),
});

export const DocumentCreateWithoutProprietaireInputSchema: z.ZodType<Prisma.DocumentCreateWithoutProprietaireInput> = z.strictObject({
  id: z.string().optional(),
  nomFichier: z.string(),
  urlStockage: z.string().optional().nullable(),
  type: z.lazy(() => DocumentTypeSchema),
  statut: z.lazy(() => DocumentStatutSchema).optional(),
  tags: z.union([ z.lazy(() => DocumentCreatetagsInputSchema), z.string().array() ]).optional(),
  dateUpload: z.coerce.date().optional(),
  size: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  dossiers: z.lazy(() => DossierCreateNestedManyWithoutDocumentsInputSchema).optional(),
  notifications: z.lazy(() => NotificationCreateNestedManyWithoutDocumentLieInputSchema).optional(),
});

export const DocumentUncheckedCreateWithoutProprietaireInputSchema: z.ZodType<Prisma.DocumentUncheckedCreateWithoutProprietaireInput> = z.strictObject({
  id: z.string().optional(),
  nomFichier: z.string(),
  urlStockage: z.string().optional().nullable(),
  type: z.lazy(() => DocumentTypeSchema),
  statut: z.lazy(() => DocumentStatutSchema).optional(),
  tags: z.union([ z.lazy(() => DocumentCreatetagsInputSchema), z.string().array() ]).optional(),
  dateUpload: z.coerce.date().optional(),
  size: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  dossierIds: z.union([ z.lazy(() => DocumentCreatedossierIdsInputSchema), z.string().array() ]).optional(),
  dossiers: z.lazy(() => DossierUncheckedCreateNestedManyWithoutDocumentsInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedCreateNestedManyWithoutDocumentLieInputSchema).optional(),
});

export const DocumentCreateOrConnectWithoutProprietaireInputSchema: z.ZodType<Prisma.DocumentCreateOrConnectWithoutProprietaireInput> = z.strictObject({
  where: z.lazy(() => DocumentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DocumentCreateWithoutProprietaireInputSchema), z.lazy(() => DocumentUncheckedCreateWithoutProprietaireInputSchema) ]),
});

export const DocumentCreateManyProprietaireInputEnvelopeSchema: z.ZodType<Prisma.DocumentCreateManyProprietaireInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => DocumentCreateManyProprietaireInputSchema), z.lazy(() => DocumentCreateManyProprietaireInputSchema).array() ]),
});

export const DossierCreateWithoutProprietaireInputSchema: z.ZodType<Prisma.DossierCreateWithoutProprietaireInput> = z.strictObject({
  id: z.string().optional(),
  nom: z.string(),
  couleur: z.string().optional(),
  icone: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  documents: z.lazy(() => DocumentCreateNestedManyWithoutDossiersInputSchema).optional(),
});

export const DossierUncheckedCreateWithoutProprietaireInputSchema: z.ZodType<Prisma.DossierUncheckedCreateWithoutProprietaireInput> = z.strictObject({
  id: z.string().optional(),
  nom: z.string(),
  idsDocuments: z.union([ z.lazy(() => DossierCreateidsDocumentsInputSchema), z.string().array() ]).optional(),
  couleur: z.string().optional(),
  icone: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  documents: z.lazy(() => DocumentUncheckedCreateNestedManyWithoutDossiersInputSchema).optional(),
});

export const DossierCreateOrConnectWithoutProprietaireInputSchema: z.ZodType<Prisma.DossierCreateOrConnectWithoutProprietaireInput> = z.strictObject({
  where: z.lazy(() => DossierWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DossierCreateWithoutProprietaireInputSchema), z.lazy(() => DossierUncheckedCreateWithoutProprietaireInputSchema) ]),
});

export const DossierCreateManyProprietaireInputEnvelopeSchema: z.ZodType<Prisma.DossierCreateManyProprietaireInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => DossierCreateManyProprietaireInputSchema), z.lazy(() => DossierCreateManyProprietaireInputSchema).array() ]),
});

export const DemarcheUtilisateurCreateWithoutUtilisateurInputSchema: z.ZodType<Prisma.DemarcheUtilisateurCreateWithoutUtilisateurInput> = z.strictObject({
  id: z.string().optional(),
  complete: z.boolean().optional(),
  dateDebut: z.coerce.date().optional(),
  dateCompletion: z.coerce.date().optional().nullable(),
  statut: z.lazy(() => DemarcheStatutSchema).optional(),
  notes: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  modele: z.lazy(() => ModeleDemarcheCreateNestedOneWithoutDemarchesUtilisateurInputSchema),
});

export const DemarcheUtilisateurUncheckedCreateWithoutUtilisateurInputSchema: z.ZodType<Prisma.DemarcheUtilisateurUncheckedCreateWithoutUtilisateurInput> = z.strictObject({
  id: z.string().optional(),
  idModele: z.string(),
  complete: z.boolean().optional(),
  dateDebut: z.coerce.date().optional(),
  dateCompletion: z.coerce.date().optional().nullable(),
  statut: z.lazy(() => DemarcheStatutSchema).optional(),
  notes: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const DemarcheUtilisateurCreateOrConnectWithoutUtilisateurInputSchema: z.ZodType<Prisma.DemarcheUtilisateurCreateOrConnectWithoutUtilisateurInput> = z.strictObject({
  where: z.lazy(() => DemarcheUtilisateurWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DemarcheUtilisateurCreateWithoutUtilisateurInputSchema), z.lazy(() => DemarcheUtilisateurUncheckedCreateWithoutUtilisateurInputSchema) ]),
});

export const DemarcheUtilisateurCreateManyUtilisateurInputEnvelopeSchema: z.ZodType<Prisma.DemarcheUtilisateurCreateManyUtilisateurInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => DemarcheUtilisateurCreateManyUtilisateurInputSchema), z.lazy(() => DemarcheUtilisateurCreateManyUtilisateurInputSchema).array() ]),
});

export const NotificationCreateWithoutUserInputSchema: z.ZodType<Prisma.NotificationCreateWithoutUserInput> = z.strictObject({
  id: z.string().optional(),
  type: z.lazy(() => NotificationTypeSchema),
  message: z.string(),
  lu: z.boolean().optional(),
  dateCreation: z.coerce.date().optional(),
  priorite: z.lazy(() => NotificationPrioriteSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  documentLie: z.lazy(() => DocumentCreateNestedOneWithoutNotificationsInputSchema).optional(),
});

export const NotificationUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.NotificationUncheckedCreateWithoutUserInput> = z.strictObject({
  id: z.string().optional(),
  type: z.lazy(() => NotificationTypeSchema),
  message: z.string(),
  idDocumentLie: z.string().optional().nullable(),
  lu: z.boolean().optional(),
  dateCreation: z.coerce.date().optional(),
  priorite: z.lazy(() => NotificationPrioriteSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const NotificationCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.NotificationCreateOrConnectWithoutUserInput> = z.strictObject({
  where: z.lazy(() => NotificationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => NotificationCreateWithoutUserInputSchema), z.lazy(() => NotificationUncheckedCreateWithoutUserInputSchema) ]),
});

export const NotificationCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.NotificationCreateManyUserInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => NotificationCreateManyUserInputSchema), z.lazy(() => NotificationCreateManyUserInputSchema).array() ]),
});

export const AccountCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateWithoutUserInput> = z.strictObject({
  id: z.string().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
});

export const AccountUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateWithoutUserInput> = z.strictObject({
  id: z.string().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
});

export const AccountCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateOrConnectWithoutUserInput> = z.strictObject({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema), z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]),
});

export const AccountCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.AccountCreateManyUserInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => AccountCreateManyUserInputSchema), z.lazy(() => AccountCreateManyUserInputSchema).array() ]),
});

export const SessionCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateWithoutUserInput> = z.strictObject({
  id: z.string().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date(),
});

export const SessionUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateWithoutUserInput> = z.strictObject({
  id: z.string().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date(),
});

export const SessionCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateOrConnectWithoutUserInput> = z.strictObject({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema), z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
});

export const SessionCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.SessionCreateManyUserInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => SessionCreateManyUserInputSchema), z.lazy(() => SessionCreateManyUserInputSchema).array() ]),
});

export const UserPreferencesUpsertInputSchema: z.ZodType<Prisma.UserPreferencesUpsertInput> = z.strictObject({
  set: z.lazy(() => UserPreferencesCreateInputSchema).nullable(),
  update: z.lazy(() => UserPreferencesUpdateInputSchema),
});

export const DocumentUpsertWithWhereUniqueWithoutProprietaireInputSchema: z.ZodType<Prisma.DocumentUpsertWithWhereUniqueWithoutProprietaireInput> = z.strictObject({
  where: z.lazy(() => DocumentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => DocumentUpdateWithoutProprietaireInputSchema), z.lazy(() => DocumentUncheckedUpdateWithoutProprietaireInputSchema) ]),
  create: z.union([ z.lazy(() => DocumentCreateWithoutProprietaireInputSchema), z.lazy(() => DocumentUncheckedCreateWithoutProprietaireInputSchema) ]),
});

export const DocumentUpdateWithWhereUniqueWithoutProprietaireInputSchema: z.ZodType<Prisma.DocumentUpdateWithWhereUniqueWithoutProprietaireInput> = z.strictObject({
  where: z.lazy(() => DocumentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => DocumentUpdateWithoutProprietaireInputSchema), z.lazy(() => DocumentUncheckedUpdateWithoutProprietaireInputSchema) ]),
});

export const DocumentUpdateManyWithWhereWithoutProprietaireInputSchema: z.ZodType<Prisma.DocumentUpdateManyWithWhereWithoutProprietaireInput> = z.strictObject({
  where: z.lazy(() => DocumentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => DocumentUpdateManyMutationInputSchema), z.lazy(() => DocumentUncheckedUpdateManyWithoutProprietaireInputSchema) ]),
});

export const DocumentScalarWhereInputSchema: z.ZodType<Prisma.DocumentScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => DocumentScalarWhereInputSchema), z.lazy(() => DocumentScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DocumentScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DocumentScalarWhereInputSchema), z.lazy(() => DocumentScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  idProprietaire: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  nomFichier: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  urlStockage: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  type: z.union([ z.lazy(() => EnumDocumentTypeFilterSchema), z.lazy(() => DocumentTypeSchema) ]).optional(),
  statut: z.union([ z.lazy(() => EnumDocumentStatutFilterSchema), z.lazy(() => DocumentStatutSchema) ]).optional(),
  tags: z.lazy(() => StringNullableListFilterSchema).optional(),
  dateUpload: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  size: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  dossierIds: z.lazy(() => StringNullableListFilterSchema).optional(),
});

export const DossierUpsertWithWhereUniqueWithoutProprietaireInputSchema: z.ZodType<Prisma.DossierUpsertWithWhereUniqueWithoutProprietaireInput> = z.strictObject({
  where: z.lazy(() => DossierWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => DossierUpdateWithoutProprietaireInputSchema), z.lazy(() => DossierUncheckedUpdateWithoutProprietaireInputSchema) ]),
  create: z.union([ z.lazy(() => DossierCreateWithoutProprietaireInputSchema), z.lazy(() => DossierUncheckedCreateWithoutProprietaireInputSchema) ]),
});

export const DossierUpdateWithWhereUniqueWithoutProprietaireInputSchema: z.ZodType<Prisma.DossierUpdateWithWhereUniqueWithoutProprietaireInput> = z.strictObject({
  where: z.lazy(() => DossierWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => DossierUpdateWithoutProprietaireInputSchema), z.lazy(() => DossierUncheckedUpdateWithoutProprietaireInputSchema) ]),
});

export const DossierUpdateManyWithWhereWithoutProprietaireInputSchema: z.ZodType<Prisma.DossierUpdateManyWithWhereWithoutProprietaireInput> = z.strictObject({
  where: z.lazy(() => DossierScalarWhereInputSchema),
  data: z.union([ z.lazy(() => DossierUpdateManyMutationInputSchema), z.lazy(() => DossierUncheckedUpdateManyWithoutProprietaireInputSchema) ]),
});

export const DossierScalarWhereInputSchema: z.ZodType<Prisma.DossierScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => DossierScalarWhereInputSchema), z.lazy(() => DossierScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DossierScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DossierScalarWhereInputSchema), z.lazy(() => DossierScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  idProprietaire: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  nom: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  idsDocuments: z.lazy(() => StringNullableListFilterSchema).optional(),
  couleur: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  icone: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
});

export const DemarcheUtilisateurUpsertWithWhereUniqueWithoutUtilisateurInputSchema: z.ZodType<Prisma.DemarcheUtilisateurUpsertWithWhereUniqueWithoutUtilisateurInput> = z.strictObject({
  where: z.lazy(() => DemarcheUtilisateurWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => DemarcheUtilisateurUpdateWithoutUtilisateurInputSchema), z.lazy(() => DemarcheUtilisateurUncheckedUpdateWithoutUtilisateurInputSchema) ]),
  create: z.union([ z.lazy(() => DemarcheUtilisateurCreateWithoutUtilisateurInputSchema), z.lazy(() => DemarcheUtilisateurUncheckedCreateWithoutUtilisateurInputSchema) ]),
});

export const DemarcheUtilisateurUpdateWithWhereUniqueWithoutUtilisateurInputSchema: z.ZodType<Prisma.DemarcheUtilisateurUpdateWithWhereUniqueWithoutUtilisateurInput> = z.strictObject({
  where: z.lazy(() => DemarcheUtilisateurWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => DemarcheUtilisateurUpdateWithoutUtilisateurInputSchema), z.lazy(() => DemarcheUtilisateurUncheckedUpdateWithoutUtilisateurInputSchema) ]),
});

export const DemarcheUtilisateurUpdateManyWithWhereWithoutUtilisateurInputSchema: z.ZodType<Prisma.DemarcheUtilisateurUpdateManyWithWhereWithoutUtilisateurInput> = z.strictObject({
  where: z.lazy(() => DemarcheUtilisateurScalarWhereInputSchema),
  data: z.union([ z.lazy(() => DemarcheUtilisateurUpdateManyMutationInputSchema), z.lazy(() => DemarcheUtilisateurUncheckedUpdateManyWithoutUtilisateurInputSchema) ]),
});

export const DemarcheUtilisateurScalarWhereInputSchema: z.ZodType<Prisma.DemarcheUtilisateurScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => DemarcheUtilisateurScalarWhereInputSchema), z.lazy(() => DemarcheUtilisateurScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DemarcheUtilisateurScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DemarcheUtilisateurScalarWhereInputSchema), z.lazy(() => DemarcheUtilisateurScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  idUtilisateur: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  idModele: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  complete: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  dateDebut: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  dateCompletion: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  statut: z.union([ z.lazy(() => EnumDemarcheStatutFilterSchema), z.lazy(() => DemarcheStatutSchema) ]).optional(),
  notes: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
});

export const NotificationUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.NotificationUpsertWithWhereUniqueWithoutUserInput> = z.strictObject({
  where: z.lazy(() => NotificationWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => NotificationUpdateWithoutUserInputSchema), z.lazy(() => NotificationUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => NotificationCreateWithoutUserInputSchema), z.lazy(() => NotificationUncheckedCreateWithoutUserInputSchema) ]),
});

export const NotificationUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.NotificationUpdateWithWhereUniqueWithoutUserInput> = z.strictObject({
  where: z.lazy(() => NotificationWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => NotificationUpdateWithoutUserInputSchema), z.lazy(() => NotificationUncheckedUpdateWithoutUserInputSchema) ]),
});

export const NotificationUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.NotificationUpdateManyWithWhereWithoutUserInput> = z.strictObject({
  where: z.lazy(() => NotificationScalarWhereInputSchema),
  data: z.union([ z.lazy(() => NotificationUpdateManyMutationInputSchema), z.lazy(() => NotificationUncheckedUpdateManyWithoutUserInputSchema) ]),
});

export const NotificationScalarWhereInputSchema: z.ZodType<Prisma.NotificationScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => NotificationScalarWhereInputSchema), z.lazy(() => NotificationScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => NotificationScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NotificationScalarWhereInputSchema), z.lazy(() => NotificationScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  idUser: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumNotificationTypeFilterSchema), z.lazy(() => NotificationTypeSchema) ]).optional(),
  message: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  idDocumentLie: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  lu: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  dateCreation: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  priorite: z.union([ z.lazy(() => EnumNotificationPrioriteFilterSchema), z.lazy(() => NotificationPrioriteSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
});

export const AccountUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpsertWithWhereUniqueWithoutUserInput> = z.strictObject({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AccountUpdateWithoutUserInputSchema), z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema), z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]),
});

export const AccountUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithWhereUniqueWithoutUserInput> = z.strictObject({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AccountUpdateWithoutUserInputSchema), z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]),
});

export const AccountUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateManyWithWhereWithoutUserInput> = z.strictObject({
  where: z.lazy(() => AccountScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AccountUpdateManyMutationInputSchema), z.lazy(() => AccountUncheckedUpdateManyWithoutUserInputSchema) ]),
});

export const AccountScalarWhereInputSchema: z.ZodType<Prisma.AccountScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => AccountScalarWhereInputSchema), z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereInputSchema), z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema), z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
});

export const SessionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpsertWithWhereUniqueWithoutUserInput> = z.strictObject({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema), z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema), z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
});

export const SessionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithWhereUniqueWithoutUserInput> = z.strictObject({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema), z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
});

export const SessionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateManyWithWhereWithoutUserInput> = z.strictObject({
  where: z.lazy(() => SessionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateManyMutationInputSchema), z.lazy(() => SessionUncheckedUpdateManyWithoutUserInputSchema) ]),
});

export const SessionScalarWhereInputSchema: z.ZodType<Prisma.SessionScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => SessionScalarWhereInputSchema), z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereInputSchema), z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
});

export const UserCreateWithoutDocumentsInputSchema: z.ZodType<Prisma.UserCreateWithoutDocumentsInput> = z.strictObject({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  googleId: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  dateInscription: z.coerce.date().optional(),
  preferences: z.union([ z.lazy(() => UserPreferencesNullableCreateEnvelopeInputSchema), z.lazy(() => UserPreferencesCreateInputSchema) ]).optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  dossiers: z.lazy(() => DossierCreateNestedManyWithoutProprietaireInputSchema).optional(),
  demarchesUtilisateur: z.lazy(() => DemarcheUtilisateurCreateNestedManyWithoutUtilisateurInputSchema).optional(),
  notifications: z.lazy(() => NotificationCreateNestedManyWithoutUserInputSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserUncheckedCreateWithoutDocumentsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutDocumentsInput> = z.strictObject({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  googleId: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  dateInscription: z.coerce.date().optional(),
  preferences: z.union([ z.lazy(() => UserPreferencesNullableCreateEnvelopeInputSchema), z.lazy(() => UserPreferencesCreateInputSchema) ]).optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  dossiers: z.lazy(() => DossierUncheckedCreateNestedManyWithoutProprietaireInputSchema).optional(),
  demarchesUtilisateur: z.lazy(() => DemarcheUtilisateurUncheckedCreateNestedManyWithoutUtilisateurInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserCreateOrConnectWithoutDocumentsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutDocumentsInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutDocumentsInputSchema), z.lazy(() => UserUncheckedCreateWithoutDocumentsInputSchema) ]),
});

export const DossierCreateWithoutDocumentsInputSchema: z.ZodType<Prisma.DossierCreateWithoutDocumentsInput> = z.strictObject({
  id: z.string().optional(),
  nom: z.string(),
  couleur: z.string().optional(),
  icone: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  proprietaire: z.lazy(() => UserCreateNestedOneWithoutDossiersInputSchema),
});

export const DossierUncheckedCreateWithoutDocumentsInputSchema: z.ZodType<Prisma.DossierUncheckedCreateWithoutDocumentsInput> = z.strictObject({
  id: z.string().optional(),
  idProprietaire: z.string(),
  nom: z.string(),
  idsDocuments: z.union([ z.lazy(() => DossierCreateidsDocumentsInputSchema), z.string().array() ]).optional(),
  couleur: z.string().optional(),
  icone: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const DossierCreateOrConnectWithoutDocumentsInputSchema: z.ZodType<Prisma.DossierCreateOrConnectWithoutDocumentsInput> = z.strictObject({
  where: z.lazy(() => DossierWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DossierCreateWithoutDocumentsInputSchema), z.lazy(() => DossierUncheckedCreateWithoutDocumentsInputSchema) ]),
});

export const NotificationCreateWithoutDocumentLieInputSchema: z.ZodType<Prisma.NotificationCreateWithoutDocumentLieInput> = z.strictObject({
  id: z.string().optional(),
  type: z.lazy(() => NotificationTypeSchema),
  message: z.string(),
  lu: z.boolean().optional(),
  dateCreation: z.coerce.date().optional(),
  priorite: z.lazy(() => NotificationPrioriteSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutNotificationsInputSchema),
});

export const NotificationUncheckedCreateWithoutDocumentLieInputSchema: z.ZodType<Prisma.NotificationUncheckedCreateWithoutDocumentLieInput> = z.strictObject({
  id: z.string().optional(),
  idUser: z.string(),
  type: z.lazy(() => NotificationTypeSchema),
  message: z.string(),
  lu: z.boolean().optional(),
  dateCreation: z.coerce.date().optional(),
  priorite: z.lazy(() => NotificationPrioriteSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const NotificationCreateOrConnectWithoutDocumentLieInputSchema: z.ZodType<Prisma.NotificationCreateOrConnectWithoutDocumentLieInput> = z.strictObject({
  where: z.lazy(() => NotificationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => NotificationCreateWithoutDocumentLieInputSchema), z.lazy(() => NotificationUncheckedCreateWithoutDocumentLieInputSchema) ]),
});

export const NotificationCreateManyDocumentLieInputEnvelopeSchema: z.ZodType<Prisma.NotificationCreateManyDocumentLieInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => NotificationCreateManyDocumentLieInputSchema), z.lazy(() => NotificationCreateManyDocumentLieInputSchema).array() ]),
});

export const UserUpsertWithoutDocumentsInputSchema: z.ZodType<Prisma.UserUpsertWithoutDocumentsInput> = z.strictObject({
  update: z.union([ z.lazy(() => UserUpdateWithoutDocumentsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutDocumentsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutDocumentsInputSchema), z.lazy(() => UserUncheckedCreateWithoutDocumentsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional(),
});

export const UserUpdateToOneWithWhereWithoutDocumentsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutDocumentsInput> = z.strictObject({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutDocumentsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutDocumentsInputSchema) ]),
});

export const UserUpdateWithoutDocumentsInputSchema: z.ZodType<Prisma.UserUpdateWithoutDocumentsInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  googleId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateInscription: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  preferences: z.union([ z.lazy(() => UserPreferencesNullableUpdateEnvelopeInputSchema), z.lazy(() => UserPreferencesCreateInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dossiers: z.lazy(() => DossierUpdateManyWithoutProprietaireNestedInputSchema).optional(),
  demarchesUtilisateur: z.lazy(() => DemarcheUtilisateurUpdateManyWithoutUtilisateurNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUpdateManyWithoutUserNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserUncheckedUpdateWithoutDocumentsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutDocumentsInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  googleId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateInscription: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  preferences: z.union([ z.lazy(() => UserPreferencesNullableUpdateEnvelopeInputSchema), z.lazy(() => UserPreferencesCreateInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dossiers: z.lazy(() => DossierUncheckedUpdateManyWithoutProprietaireNestedInputSchema).optional(),
  demarchesUtilisateur: z.lazy(() => DemarcheUtilisateurUncheckedUpdateManyWithoutUtilisateurNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const DossierUpsertWithWhereUniqueWithoutDocumentsInputSchema: z.ZodType<Prisma.DossierUpsertWithWhereUniqueWithoutDocumentsInput> = z.strictObject({
  where: z.lazy(() => DossierWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => DossierUpdateWithoutDocumentsInputSchema), z.lazy(() => DossierUncheckedUpdateWithoutDocumentsInputSchema) ]),
  create: z.union([ z.lazy(() => DossierCreateWithoutDocumentsInputSchema), z.lazy(() => DossierUncheckedCreateWithoutDocumentsInputSchema) ]),
});

export const DossierUpdateWithWhereUniqueWithoutDocumentsInputSchema: z.ZodType<Prisma.DossierUpdateWithWhereUniqueWithoutDocumentsInput> = z.strictObject({
  where: z.lazy(() => DossierWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => DossierUpdateWithoutDocumentsInputSchema), z.lazy(() => DossierUncheckedUpdateWithoutDocumentsInputSchema) ]),
});

export const DossierUpdateManyWithWhereWithoutDocumentsInputSchema: z.ZodType<Prisma.DossierUpdateManyWithWhereWithoutDocumentsInput> = z.strictObject({
  where: z.lazy(() => DossierScalarWhereInputSchema),
  data: z.union([ z.lazy(() => DossierUpdateManyMutationInputSchema), z.lazy(() => DossierUncheckedUpdateManyWithoutDocumentsInputSchema) ]),
});

export const NotificationUpsertWithWhereUniqueWithoutDocumentLieInputSchema: z.ZodType<Prisma.NotificationUpsertWithWhereUniqueWithoutDocumentLieInput> = z.strictObject({
  where: z.lazy(() => NotificationWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => NotificationUpdateWithoutDocumentLieInputSchema), z.lazy(() => NotificationUncheckedUpdateWithoutDocumentLieInputSchema) ]),
  create: z.union([ z.lazy(() => NotificationCreateWithoutDocumentLieInputSchema), z.lazy(() => NotificationUncheckedCreateWithoutDocumentLieInputSchema) ]),
});

export const NotificationUpdateWithWhereUniqueWithoutDocumentLieInputSchema: z.ZodType<Prisma.NotificationUpdateWithWhereUniqueWithoutDocumentLieInput> = z.strictObject({
  where: z.lazy(() => NotificationWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => NotificationUpdateWithoutDocumentLieInputSchema), z.lazy(() => NotificationUncheckedUpdateWithoutDocumentLieInputSchema) ]),
});

export const NotificationUpdateManyWithWhereWithoutDocumentLieInputSchema: z.ZodType<Prisma.NotificationUpdateManyWithWhereWithoutDocumentLieInput> = z.strictObject({
  where: z.lazy(() => NotificationScalarWhereInputSchema),
  data: z.union([ z.lazy(() => NotificationUpdateManyMutationInputSchema), z.lazy(() => NotificationUncheckedUpdateManyWithoutDocumentLieInputSchema) ]),
});

export const UserCreateWithoutDossiersInputSchema: z.ZodType<Prisma.UserCreateWithoutDossiersInput> = z.strictObject({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  googleId: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  dateInscription: z.coerce.date().optional(),
  preferences: z.union([ z.lazy(() => UserPreferencesNullableCreateEnvelopeInputSchema), z.lazy(() => UserPreferencesCreateInputSchema) ]).optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  documents: z.lazy(() => DocumentCreateNestedManyWithoutProprietaireInputSchema).optional(),
  demarchesUtilisateur: z.lazy(() => DemarcheUtilisateurCreateNestedManyWithoutUtilisateurInputSchema).optional(),
  notifications: z.lazy(() => NotificationCreateNestedManyWithoutUserInputSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserUncheckedCreateWithoutDossiersInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutDossiersInput> = z.strictObject({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  googleId: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  dateInscription: z.coerce.date().optional(),
  preferences: z.union([ z.lazy(() => UserPreferencesNullableCreateEnvelopeInputSchema), z.lazy(() => UserPreferencesCreateInputSchema) ]).optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  documents: z.lazy(() => DocumentUncheckedCreateNestedManyWithoutProprietaireInputSchema).optional(),
  demarchesUtilisateur: z.lazy(() => DemarcheUtilisateurUncheckedCreateNestedManyWithoutUtilisateurInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserCreateOrConnectWithoutDossiersInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutDossiersInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutDossiersInputSchema), z.lazy(() => UserUncheckedCreateWithoutDossiersInputSchema) ]),
});

export const DocumentCreateWithoutDossiersInputSchema: z.ZodType<Prisma.DocumentCreateWithoutDossiersInput> = z.strictObject({
  id: z.string().optional(),
  nomFichier: z.string(),
  urlStockage: z.string().optional().nullable(),
  type: z.lazy(() => DocumentTypeSchema),
  statut: z.lazy(() => DocumentStatutSchema).optional(),
  tags: z.union([ z.lazy(() => DocumentCreatetagsInputSchema), z.string().array() ]).optional(),
  dateUpload: z.coerce.date().optional(),
  size: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  proprietaire: z.lazy(() => UserCreateNestedOneWithoutDocumentsInputSchema),
  notifications: z.lazy(() => NotificationCreateNestedManyWithoutDocumentLieInputSchema).optional(),
});

export const DocumentUncheckedCreateWithoutDossiersInputSchema: z.ZodType<Prisma.DocumentUncheckedCreateWithoutDossiersInput> = z.strictObject({
  id: z.string().optional(),
  idProprietaire: z.string(),
  nomFichier: z.string(),
  urlStockage: z.string().optional().nullable(),
  type: z.lazy(() => DocumentTypeSchema),
  statut: z.lazy(() => DocumentStatutSchema).optional(),
  tags: z.union([ z.lazy(() => DocumentCreatetagsInputSchema), z.string().array() ]).optional(),
  dateUpload: z.coerce.date().optional(),
  size: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  dossierIds: z.union([ z.lazy(() => DocumentCreatedossierIdsInputSchema), z.string().array() ]).optional(),
  notifications: z.lazy(() => NotificationUncheckedCreateNestedManyWithoutDocumentLieInputSchema).optional(),
});

export const DocumentCreateOrConnectWithoutDossiersInputSchema: z.ZodType<Prisma.DocumentCreateOrConnectWithoutDossiersInput> = z.strictObject({
  where: z.lazy(() => DocumentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DocumentCreateWithoutDossiersInputSchema), z.lazy(() => DocumentUncheckedCreateWithoutDossiersInputSchema) ]),
});

export const UserUpsertWithoutDossiersInputSchema: z.ZodType<Prisma.UserUpsertWithoutDossiersInput> = z.strictObject({
  update: z.union([ z.lazy(() => UserUpdateWithoutDossiersInputSchema), z.lazy(() => UserUncheckedUpdateWithoutDossiersInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutDossiersInputSchema), z.lazy(() => UserUncheckedCreateWithoutDossiersInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional(),
});

export const UserUpdateToOneWithWhereWithoutDossiersInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutDossiersInput> = z.strictObject({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutDossiersInputSchema), z.lazy(() => UserUncheckedUpdateWithoutDossiersInputSchema) ]),
});

export const UserUpdateWithoutDossiersInputSchema: z.ZodType<Prisma.UserUpdateWithoutDossiersInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  googleId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateInscription: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  preferences: z.union([ z.lazy(() => UserPreferencesNullableUpdateEnvelopeInputSchema), z.lazy(() => UserPreferencesCreateInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  documents: z.lazy(() => DocumentUpdateManyWithoutProprietaireNestedInputSchema).optional(),
  demarchesUtilisateur: z.lazy(() => DemarcheUtilisateurUpdateManyWithoutUtilisateurNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUpdateManyWithoutUserNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserUncheckedUpdateWithoutDossiersInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutDossiersInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  googleId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateInscription: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  preferences: z.union([ z.lazy(() => UserPreferencesNullableUpdateEnvelopeInputSchema), z.lazy(() => UserPreferencesCreateInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  documents: z.lazy(() => DocumentUncheckedUpdateManyWithoutProprietaireNestedInputSchema).optional(),
  demarchesUtilisateur: z.lazy(() => DemarcheUtilisateurUncheckedUpdateManyWithoutUtilisateurNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const DocumentUpsertWithWhereUniqueWithoutDossiersInputSchema: z.ZodType<Prisma.DocumentUpsertWithWhereUniqueWithoutDossiersInput> = z.strictObject({
  where: z.lazy(() => DocumentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => DocumentUpdateWithoutDossiersInputSchema), z.lazy(() => DocumentUncheckedUpdateWithoutDossiersInputSchema) ]),
  create: z.union([ z.lazy(() => DocumentCreateWithoutDossiersInputSchema), z.lazy(() => DocumentUncheckedCreateWithoutDossiersInputSchema) ]),
});

export const DocumentUpdateWithWhereUniqueWithoutDossiersInputSchema: z.ZodType<Prisma.DocumentUpdateWithWhereUniqueWithoutDossiersInput> = z.strictObject({
  where: z.lazy(() => DocumentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => DocumentUpdateWithoutDossiersInputSchema), z.lazy(() => DocumentUncheckedUpdateWithoutDossiersInputSchema) ]),
});

export const DocumentUpdateManyWithWhereWithoutDossiersInputSchema: z.ZodType<Prisma.DocumentUpdateManyWithWhereWithoutDossiersInput> = z.strictObject({
  where: z.lazy(() => DocumentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => DocumentUpdateManyMutationInputSchema), z.lazy(() => DocumentUncheckedUpdateManyWithoutDossiersInputSchema) ]),
});

export const DemarcheUtilisateurCreateWithoutModeleInputSchema: z.ZodType<Prisma.DemarcheUtilisateurCreateWithoutModeleInput> = z.strictObject({
  id: z.string().optional(),
  complete: z.boolean().optional(),
  dateDebut: z.coerce.date().optional(),
  dateCompletion: z.coerce.date().optional().nullable(),
  statut: z.lazy(() => DemarcheStatutSchema).optional(),
  notes: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  utilisateur: z.lazy(() => UserCreateNestedOneWithoutDemarchesUtilisateurInputSchema),
});

export const DemarcheUtilisateurUncheckedCreateWithoutModeleInputSchema: z.ZodType<Prisma.DemarcheUtilisateurUncheckedCreateWithoutModeleInput> = z.strictObject({
  id: z.string().optional(),
  idUtilisateur: z.string(),
  complete: z.boolean().optional(),
  dateDebut: z.coerce.date().optional(),
  dateCompletion: z.coerce.date().optional().nullable(),
  statut: z.lazy(() => DemarcheStatutSchema).optional(),
  notes: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const DemarcheUtilisateurCreateOrConnectWithoutModeleInputSchema: z.ZodType<Prisma.DemarcheUtilisateurCreateOrConnectWithoutModeleInput> = z.strictObject({
  where: z.lazy(() => DemarcheUtilisateurWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DemarcheUtilisateurCreateWithoutModeleInputSchema), z.lazy(() => DemarcheUtilisateurUncheckedCreateWithoutModeleInputSchema) ]),
});

export const DemarcheUtilisateurCreateManyModeleInputEnvelopeSchema: z.ZodType<Prisma.DemarcheUtilisateurCreateManyModeleInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => DemarcheUtilisateurCreateManyModeleInputSchema), z.lazy(() => DemarcheUtilisateurCreateManyModeleInputSchema).array() ]),
});

export const DemarcheUtilisateurUpsertWithWhereUniqueWithoutModeleInputSchema: z.ZodType<Prisma.DemarcheUtilisateurUpsertWithWhereUniqueWithoutModeleInput> = z.strictObject({
  where: z.lazy(() => DemarcheUtilisateurWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => DemarcheUtilisateurUpdateWithoutModeleInputSchema), z.lazy(() => DemarcheUtilisateurUncheckedUpdateWithoutModeleInputSchema) ]),
  create: z.union([ z.lazy(() => DemarcheUtilisateurCreateWithoutModeleInputSchema), z.lazy(() => DemarcheUtilisateurUncheckedCreateWithoutModeleInputSchema) ]),
});

export const DemarcheUtilisateurUpdateWithWhereUniqueWithoutModeleInputSchema: z.ZodType<Prisma.DemarcheUtilisateurUpdateWithWhereUniqueWithoutModeleInput> = z.strictObject({
  where: z.lazy(() => DemarcheUtilisateurWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => DemarcheUtilisateurUpdateWithoutModeleInputSchema), z.lazy(() => DemarcheUtilisateurUncheckedUpdateWithoutModeleInputSchema) ]),
});

export const DemarcheUtilisateurUpdateManyWithWhereWithoutModeleInputSchema: z.ZodType<Prisma.DemarcheUtilisateurUpdateManyWithWhereWithoutModeleInput> = z.strictObject({
  where: z.lazy(() => DemarcheUtilisateurScalarWhereInputSchema),
  data: z.union([ z.lazy(() => DemarcheUtilisateurUpdateManyMutationInputSchema), z.lazy(() => DemarcheUtilisateurUncheckedUpdateManyWithoutModeleInputSchema) ]),
});

export const UserCreateWithoutDemarchesUtilisateurInputSchema: z.ZodType<Prisma.UserCreateWithoutDemarchesUtilisateurInput> = z.strictObject({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  googleId: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  dateInscription: z.coerce.date().optional(),
  preferences: z.union([ z.lazy(() => UserPreferencesNullableCreateEnvelopeInputSchema), z.lazy(() => UserPreferencesCreateInputSchema) ]).optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  documents: z.lazy(() => DocumentCreateNestedManyWithoutProprietaireInputSchema).optional(),
  dossiers: z.lazy(() => DossierCreateNestedManyWithoutProprietaireInputSchema).optional(),
  notifications: z.lazy(() => NotificationCreateNestedManyWithoutUserInputSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserUncheckedCreateWithoutDemarchesUtilisateurInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutDemarchesUtilisateurInput> = z.strictObject({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  googleId: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  dateInscription: z.coerce.date().optional(),
  preferences: z.union([ z.lazy(() => UserPreferencesNullableCreateEnvelopeInputSchema), z.lazy(() => UserPreferencesCreateInputSchema) ]).optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  documents: z.lazy(() => DocumentUncheckedCreateNestedManyWithoutProprietaireInputSchema).optional(),
  dossiers: z.lazy(() => DossierUncheckedCreateNestedManyWithoutProprietaireInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserCreateOrConnectWithoutDemarchesUtilisateurInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutDemarchesUtilisateurInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutDemarchesUtilisateurInputSchema), z.lazy(() => UserUncheckedCreateWithoutDemarchesUtilisateurInputSchema) ]),
});

export const ModeleDemarcheCreateWithoutDemarchesUtilisateurInputSchema: z.ZodType<Prisma.ModeleDemarcheCreateWithoutDemarchesUtilisateurInput> = z.strictObject({
  id: z.string().optional(),
  titre: z.string(),
  description: z.string().optional().nullable(),
  typesDocumentsRequis: z.union([ z.lazy(() => ModeleDemarcheCreatetypesDocumentsRequisInputSchema), z.string().array() ]).optional(),
  categorie: z.lazy(() => DemarcheCategorieSchema).optional(),
  actif: z.boolean().optional(),
  ordre: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const ModeleDemarcheUncheckedCreateWithoutDemarchesUtilisateurInputSchema: z.ZodType<Prisma.ModeleDemarcheUncheckedCreateWithoutDemarchesUtilisateurInput> = z.strictObject({
  id: z.string().optional(),
  titre: z.string(),
  description: z.string().optional().nullable(),
  typesDocumentsRequis: z.union([ z.lazy(() => ModeleDemarcheCreatetypesDocumentsRequisInputSchema), z.string().array() ]).optional(),
  categorie: z.lazy(() => DemarcheCategorieSchema).optional(),
  actif: z.boolean().optional(),
  ordre: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const ModeleDemarcheCreateOrConnectWithoutDemarchesUtilisateurInputSchema: z.ZodType<Prisma.ModeleDemarcheCreateOrConnectWithoutDemarchesUtilisateurInput> = z.strictObject({
  where: z.lazy(() => ModeleDemarcheWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ModeleDemarcheCreateWithoutDemarchesUtilisateurInputSchema), z.lazy(() => ModeleDemarcheUncheckedCreateWithoutDemarchesUtilisateurInputSchema) ]),
});

export const UserUpsertWithoutDemarchesUtilisateurInputSchema: z.ZodType<Prisma.UserUpsertWithoutDemarchesUtilisateurInput> = z.strictObject({
  update: z.union([ z.lazy(() => UserUpdateWithoutDemarchesUtilisateurInputSchema), z.lazy(() => UserUncheckedUpdateWithoutDemarchesUtilisateurInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutDemarchesUtilisateurInputSchema), z.lazy(() => UserUncheckedCreateWithoutDemarchesUtilisateurInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional(),
});

export const UserUpdateToOneWithWhereWithoutDemarchesUtilisateurInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutDemarchesUtilisateurInput> = z.strictObject({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutDemarchesUtilisateurInputSchema), z.lazy(() => UserUncheckedUpdateWithoutDemarchesUtilisateurInputSchema) ]),
});

export const UserUpdateWithoutDemarchesUtilisateurInputSchema: z.ZodType<Prisma.UserUpdateWithoutDemarchesUtilisateurInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  googleId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateInscription: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  preferences: z.union([ z.lazy(() => UserPreferencesNullableUpdateEnvelopeInputSchema), z.lazy(() => UserPreferencesCreateInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  documents: z.lazy(() => DocumentUpdateManyWithoutProprietaireNestedInputSchema).optional(),
  dossiers: z.lazy(() => DossierUpdateManyWithoutProprietaireNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUpdateManyWithoutUserNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserUncheckedUpdateWithoutDemarchesUtilisateurInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutDemarchesUtilisateurInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  googleId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateInscription: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  preferences: z.union([ z.lazy(() => UserPreferencesNullableUpdateEnvelopeInputSchema), z.lazy(() => UserPreferencesCreateInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  documents: z.lazy(() => DocumentUncheckedUpdateManyWithoutProprietaireNestedInputSchema).optional(),
  dossiers: z.lazy(() => DossierUncheckedUpdateManyWithoutProprietaireNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const ModeleDemarcheUpsertWithoutDemarchesUtilisateurInputSchema: z.ZodType<Prisma.ModeleDemarcheUpsertWithoutDemarchesUtilisateurInput> = z.strictObject({
  update: z.union([ z.lazy(() => ModeleDemarcheUpdateWithoutDemarchesUtilisateurInputSchema), z.lazy(() => ModeleDemarcheUncheckedUpdateWithoutDemarchesUtilisateurInputSchema) ]),
  create: z.union([ z.lazy(() => ModeleDemarcheCreateWithoutDemarchesUtilisateurInputSchema), z.lazy(() => ModeleDemarcheUncheckedCreateWithoutDemarchesUtilisateurInputSchema) ]),
  where: z.lazy(() => ModeleDemarcheWhereInputSchema).optional(),
});

export const ModeleDemarcheUpdateToOneWithWhereWithoutDemarchesUtilisateurInputSchema: z.ZodType<Prisma.ModeleDemarcheUpdateToOneWithWhereWithoutDemarchesUtilisateurInput> = z.strictObject({
  where: z.lazy(() => ModeleDemarcheWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ModeleDemarcheUpdateWithoutDemarchesUtilisateurInputSchema), z.lazy(() => ModeleDemarcheUncheckedUpdateWithoutDemarchesUtilisateurInputSchema) ]),
});

export const ModeleDemarcheUpdateWithoutDemarchesUtilisateurInputSchema: z.ZodType<Prisma.ModeleDemarcheUpdateWithoutDemarchesUtilisateurInput> = z.strictObject({
  titre: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  typesDocumentsRequis: z.union([ z.lazy(() => ModeleDemarcheUpdatetypesDocumentsRequisInputSchema), z.string().array() ]).optional(),
  categorie: z.union([ z.lazy(() => DemarcheCategorieSchema), z.lazy(() => EnumDemarcheCategorieFieldUpdateOperationsInputSchema) ]).optional(),
  actif: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  ordre: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ModeleDemarcheUncheckedUpdateWithoutDemarchesUtilisateurInputSchema: z.ZodType<Prisma.ModeleDemarcheUncheckedUpdateWithoutDemarchesUtilisateurInput> = z.strictObject({
  titre: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  typesDocumentsRequis: z.union([ z.lazy(() => ModeleDemarcheUpdatetypesDocumentsRequisInputSchema), z.string().array() ]).optional(),
  categorie: z.union([ z.lazy(() => DemarcheCategorieSchema), z.lazy(() => EnumDemarcheCategorieFieldUpdateOperationsInputSchema) ]).optional(),
  actif: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  ordre: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const UserCreateWithoutNotificationsInputSchema: z.ZodType<Prisma.UserCreateWithoutNotificationsInput> = z.strictObject({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  googleId: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  dateInscription: z.coerce.date().optional(),
  preferences: z.union([ z.lazy(() => UserPreferencesNullableCreateEnvelopeInputSchema), z.lazy(() => UserPreferencesCreateInputSchema) ]).optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  documents: z.lazy(() => DocumentCreateNestedManyWithoutProprietaireInputSchema).optional(),
  dossiers: z.lazy(() => DossierCreateNestedManyWithoutProprietaireInputSchema).optional(),
  demarchesUtilisateur: z.lazy(() => DemarcheUtilisateurCreateNestedManyWithoutUtilisateurInputSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserUncheckedCreateWithoutNotificationsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutNotificationsInput> = z.strictObject({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  googleId: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  dateInscription: z.coerce.date().optional(),
  preferences: z.union([ z.lazy(() => UserPreferencesNullableCreateEnvelopeInputSchema), z.lazy(() => UserPreferencesCreateInputSchema) ]).optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  documents: z.lazy(() => DocumentUncheckedCreateNestedManyWithoutProprietaireInputSchema).optional(),
  dossiers: z.lazy(() => DossierUncheckedCreateNestedManyWithoutProprietaireInputSchema).optional(),
  demarchesUtilisateur: z.lazy(() => DemarcheUtilisateurUncheckedCreateNestedManyWithoutUtilisateurInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserCreateOrConnectWithoutNotificationsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutNotificationsInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutNotificationsInputSchema), z.lazy(() => UserUncheckedCreateWithoutNotificationsInputSchema) ]),
});

export const DocumentCreateWithoutNotificationsInputSchema: z.ZodType<Prisma.DocumentCreateWithoutNotificationsInput> = z.strictObject({
  id: z.string().optional(),
  nomFichier: z.string(),
  urlStockage: z.string().optional().nullable(),
  type: z.lazy(() => DocumentTypeSchema),
  statut: z.lazy(() => DocumentStatutSchema).optional(),
  tags: z.union([ z.lazy(() => DocumentCreatetagsInputSchema), z.string().array() ]).optional(),
  dateUpload: z.coerce.date().optional(),
  size: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  proprietaire: z.lazy(() => UserCreateNestedOneWithoutDocumentsInputSchema),
  dossiers: z.lazy(() => DossierCreateNestedManyWithoutDocumentsInputSchema).optional(),
});

export const DocumentUncheckedCreateWithoutNotificationsInputSchema: z.ZodType<Prisma.DocumentUncheckedCreateWithoutNotificationsInput> = z.strictObject({
  id: z.string().optional(),
  idProprietaire: z.string(),
  nomFichier: z.string(),
  urlStockage: z.string().optional().nullable(),
  type: z.lazy(() => DocumentTypeSchema),
  statut: z.lazy(() => DocumentStatutSchema).optional(),
  tags: z.union([ z.lazy(() => DocumentCreatetagsInputSchema), z.string().array() ]).optional(),
  dateUpload: z.coerce.date().optional(),
  size: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  dossierIds: z.union([ z.lazy(() => DocumentCreatedossierIdsInputSchema), z.string().array() ]).optional(),
  dossiers: z.lazy(() => DossierUncheckedCreateNestedManyWithoutDocumentsInputSchema).optional(),
});

export const DocumentCreateOrConnectWithoutNotificationsInputSchema: z.ZodType<Prisma.DocumentCreateOrConnectWithoutNotificationsInput> = z.strictObject({
  where: z.lazy(() => DocumentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DocumentCreateWithoutNotificationsInputSchema), z.lazy(() => DocumentUncheckedCreateWithoutNotificationsInputSchema) ]),
});

export const UserUpsertWithoutNotificationsInputSchema: z.ZodType<Prisma.UserUpsertWithoutNotificationsInput> = z.strictObject({
  update: z.union([ z.lazy(() => UserUpdateWithoutNotificationsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutNotificationsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutNotificationsInputSchema), z.lazy(() => UserUncheckedCreateWithoutNotificationsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional(),
});

export const UserUpdateToOneWithWhereWithoutNotificationsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutNotificationsInput> = z.strictObject({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutNotificationsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutNotificationsInputSchema) ]),
});

export const UserUpdateWithoutNotificationsInputSchema: z.ZodType<Prisma.UserUpdateWithoutNotificationsInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  googleId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateInscription: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  preferences: z.union([ z.lazy(() => UserPreferencesNullableUpdateEnvelopeInputSchema), z.lazy(() => UserPreferencesCreateInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  documents: z.lazy(() => DocumentUpdateManyWithoutProprietaireNestedInputSchema).optional(),
  dossiers: z.lazy(() => DossierUpdateManyWithoutProprietaireNestedInputSchema).optional(),
  demarchesUtilisateur: z.lazy(() => DemarcheUtilisateurUpdateManyWithoutUtilisateurNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserUncheckedUpdateWithoutNotificationsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutNotificationsInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  googleId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateInscription: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  preferences: z.union([ z.lazy(() => UserPreferencesNullableUpdateEnvelopeInputSchema), z.lazy(() => UserPreferencesCreateInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  documents: z.lazy(() => DocumentUncheckedUpdateManyWithoutProprietaireNestedInputSchema).optional(),
  dossiers: z.lazy(() => DossierUncheckedUpdateManyWithoutProprietaireNestedInputSchema).optional(),
  demarchesUtilisateur: z.lazy(() => DemarcheUtilisateurUncheckedUpdateManyWithoutUtilisateurNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const DocumentUpsertWithoutNotificationsInputSchema: z.ZodType<Prisma.DocumentUpsertWithoutNotificationsInput> = z.strictObject({
  update: z.union([ z.lazy(() => DocumentUpdateWithoutNotificationsInputSchema), z.lazy(() => DocumentUncheckedUpdateWithoutNotificationsInputSchema) ]),
  create: z.union([ z.lazy(() => DocumentCreateWithoutNotificationsInputSchema), z.lazy(() => DocumentUncheckedCreateWithoutNotificationsInputSchema) ]),
  where: z.lazy(() => DocumentWhereInputSchema).optional(),
});

export const DocumentUpdateToOneWithWhereWithoutNotificationsInputSchema: z.ZodType<Prisma.DocumentUpdateToOneWithWhereWithoutNotificationsInput> = z.strictObject({
  where: z.lazy(() => DocumentWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => DocumentUpdateWithoutNotificationsInputSchema), z.lazy(() => DocumentUncheckedUpdateWithoutNotificationsInputSchema) ]),
});

export const DocumentUpdateWithoutNotificationsInputSchema: z.ZodType<Prisma.DocumentUpdateWithoutNotificationsInput> = z.strictObject({
  nomFichier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  urlStockage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => DocumentTypeSchema), z.lazy(() => EnumDocumentTypeFieldUpdateOperationsInputSchema) ]).optional(),
  statut: z.union([ z.lazy(() => DocumentStatutSchema), z.lazy(() => EnumDocumentStatutFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => DocumentUpdatetagsInputSchema), z.string().array() ]).optional(),
  dateUpload: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  proprietaire: z.lazy(() => UserUpdateOneRequiredWithoutDocumentsNestedInputSchema).optional(),
  dossiers: z.lazy(() => DossierUpdateManyWithoutDocumentsNestedInputSchema).optional(),
});

export const DocumentUncheckedUpdateWithoutNotificationsInputSchema: z.ZodType<Prisma.DocumentUncheckedUpdateWithoutNotificationsInput> = z.strictObject({
  idProprietaire: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nomFichier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  urlStockage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => DocumentTypeSchema), z.lazy(() => EnumDocumentTypeFieldUpdateOperationsInputSchema) ]).optional(),
  statut: z.union([ z.lazy(() => DocumentStatutSchema), z.lazy(() => EnumDocumentStatutFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => DocumentUpdatetagsInputSchema), z.string().array() ]).optional(),
  dateUpload: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dossierIds: z.union([ z.lazy(() => DocumentUpdatedossierIdsInputSchema), z.string().array() ]).optional(),
  dossiers: z.lazy(() => DossierUncheckedUpdateManyWithoutDocumentsNestedInputSchema).optional(),
});

export const UserCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateWithoutAccountsInput> = z.strictObject({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  googleId: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  dateInscription: z.coerce.date().optional(),
  preferences: z.union([ z.lazy(() => UserPreferencesNullableCreateEnvelopeInputSchema), z.lazy(() => UserPreferencesCreateInputSchema) ]).optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  documents: z.lazy(() => DocumentCreateNestedManyWithoutProprietaireInputSchema).optional(),
  dossiers: z.lazy(() => DossierCreateNestedManyWithoutProprietaireInputSchema).optional(),
  demarchesUtilisateur: z.lazy(() => DemarcheUtilisateurCreateNestedManyWithoutUtilisateurInputSchema).optional(),
  notifications: z.lazy(() => NotificationCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserUncheckedCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAccountsInput> = z.strictObject({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  googleId: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  dateInscription: z.coerce.date().optional(),
  preferences: z.union([ z.lazy(() => UserPreferencesNullableCreateEnvelopeInputSchema), z.lazy(() => UserPreferencesCreateInputSchema) ]).optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  documents: z.lazy(() => DocumentUncheckedCreateNestedManyWithoutProprietaireInputSchema).optional(),
  dossiers: z.lazy(() => DossierUncheckedCreateNestedManyWithoutProprietaireInputSchema).optional(),
  demarchesUtilisateur: z.lazy(() => DemarcheUtilisateurUncheckedCreateNestedManyWithoutUtilisateurInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserCreateOrConnectWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAccountsInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema), z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]),
});

export const UserUpsertWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpsertWithoutAccountsInput> = z.strictObject({
  update: z.union([ z.lazy(() => UserUpdateWithoutAccountsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema), z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional(),
});

export const UserUpdateToOneWithWhereWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAccountsInput> = z.strictObject({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutAccountsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]),
});

export const UserUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateWithoutAccountsInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  googleId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateInscription: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  preferences: z.union([ z.lazy(() => UserPreferencesNullableUpdateEnvelopeInputSchema), z.lazy(() => UserPreferencesCreateInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  documents: z.lazy(() => DocumentUpdateManyWithoutProprietaireNestedInputSchema).optional(),
  dossiers: z.lazy(() => DossierUpdateManyWithoutProprietaireNestedInputSchema).optional(),
  demarchesUtilisateur: z.lazy(() => DemarcheUtilisateurUpdateManyWithoutUtilisateurNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserUncheckedUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAccountsInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  googleId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateInscription: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  preferences: z.union([ z.lazy(() => UserPreferencesNullableUpdateEnvelopeInputSchema), z.lazy(() => UserPreferencesCreateInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  documents: z.lazy(() => DocumentUncheckedUpdateManyWithoutProprietaireNestedInputSchema).optional(),
  dossiers: z.lazy(() => DossierUncheckedUpdateManyWithoutProprietaireNestedInputSchema).optional(),
  demarchesUtilisateur: z.lazy(() => DemarcheUtilisateurUncheckedUpdateManyWithoutUtilisateurNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateWithoutSessionsInput> = z.strictObject({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  googleId: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  dateInscription: z.coerce.date().optional(),
  preferences: z.union([ z.lazy(() => UserPreferencesNullableCreateEnvelopeInputSchema), z.lazy(() => UserPreferencesCreateInputSchema) ]).optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  documents: z.lazy(() => DocumentCreateNestedManyWithoutProprietaireInputSchema).optional(),
  dossiers: z.lazy(() => DossierCreateNestedManyWithoutProprietaireInputSchema).optional(),
  demarchesUtilisateur: z.lazy(() => DemarcheUtilisateurCreateNestedManyWithoutUtilisateurInputSchema).optional(),
  notifications: z.lazy(() => NotificationCreateNestedManyWithoutUserInputSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserUncheckedCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSessionsInput> = z.strictObject({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  googleId: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  dateInscription: z.coerce.date().optional(),
  preferences: z.union([ z.lazy(() => UserPreferencesNullableCreateEnvelopeInputSchema), z.lazy(() => UserPreferencesCreateInputSchema) ]).optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  documents: z.lazy(() => DocumentUncheckedCreateNestedManyWithoutProprietaireInputSchema).optional(),
  dossiers: z.lazy(() => DossierUncheckedCreateNestedManyWithoutProprietaireInputSchema).optional(),
  demarchesUtilisateur: z.lazy(() => DemarcheUtilisateurUncheckedCreateNestedManyWithoutUtilisateurInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserCreateOrConnectWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSessionsInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema), z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
});

export const UserUpsertWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpsertWithoutSessionsInput> = z.strictObject({
  update: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema), z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional(),
});

export const UserUpdateToOneWithWhereWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSessionsInput> = z.strictObject({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]),
});

export const UserUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateWithoutSessionsInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  googleId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateInscription: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  preferences: z.union([ z.lazy(() => UserPreferencesNullableUpdateEnvelopeInputSchema), z.lazy(() => UserPreferencesCreateInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  documents: z.lazy(() => DocumentUpdateManyWithoutProprietaireNestedInputSchema).optional(),
  dossiers: z.lazy(() => DossierUpdateManyWithoutProprietaireNestedInputSchema).optional(),
  demarchesUtilisateur: z.lazy(() => DemarcheUtilisateurUpdateManyWithoutUtilisateurNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUpdateManyWithoutUserNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserUncheckedUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSessionsInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  googleId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateInscription: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  preferences: z.union([ z.lazy(() => UserPreferencesNullableUpdateEnvelopeInputSchema), z.lazy(() => UserPreferencesCreateInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  documents: z.lazy(() => DocumentUncheckedUpdateManyWithoutProprietaireNestedInputSchema).optional(),
  dossiers: z.lazy(() => DossierUncheckedUpdateManyWithoutProprietaireNestedInputSchema).optional(),
  demarchesUtilisateur: z.lazy(() => DemarcheUtilisateurUncheckedUpdateManyWithoutUtilisateurNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const DocumentCreateManyProprietaireInputSchema: z.ZodType<Prisma.DocumentCreateManyProprietaireInput> = z.strictObject({
  id: z.string().optional(),
  nomFichier: z.string(),
  urlStockage: z.string().optional().nullable(),
  type: z.lazy(() => DocumentTypeSchema),
  statut: z.lazy(() => DocumentStatutSchema).optional(),
  tags: z.union([ z.lazy(() => DocumentCreatetagsInputSchema), z.string().array() ]).optional(),
  dateUpload: z.coerce.date().optional(),
  size: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  dossierIds: z.union([ z.lazy(() => DocumentCreatedossierIdsInputSchema), z.string().array() ]).optional(),
});

export const DossierCreateManyProprietaireInputSchema: z.ZodType<Prisma.DossierCreateManyProprietaireInput> = z.strictObject({
  id: z.string().optional(),
  nom: z.string(),
  idsDocuments: z.union([ z.lazy(() => DossierCreateidsDocumentsInputSchema), z.string().array() ]).optional(),
  couleur: z.string().optional(),
  icone: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const DemarcheUtilisateurCreateManyUtilisateurInputSchema: z.ZodType<Prisma.DemarcheUtilisateurCreateManyUtilisateurInput> = z.strictObject({
  id: z.string().optional(),
  idModele: z.string(),
  complete: z.boolean().optional(),
  dateDebut: z.coerce.date().optional(),
  dateCompletion: z.coerce.date().optional().nullable(),
  statut: z.lazy(() => DemarcheStatutSchema).optional(),
  notes: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const NotificationCreateManyUserInputSchema: z.ZodType<Prisma.NotificationCreateManyUserInput> = z.strictObject({
  id: z.string().optional(),
  type: z.lazy(() => NotificationTypeSchema),
  message: z.string(),
  idDocumentLie: z.string().optional().nullable(),
  lu: z.boolean().optional(),
  dateCreation: z.coerce.date().optional(),
  priorite: z.lazy(() => NotificationPrioriteSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const AccountCreateManyUserInputSchema: z.ZodType<Prisma.AccountCreateManyUserInput> = z.strictObject({
  id: z.string().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
});

export const SessionCreateManyUserInputSchema: z.ZodType<Prisma.SessionCreateManyUserInput> = z.strictObject({
  id: z.string().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date(),
});

export const UserPreferencesUpdateInputSchema: z.ZodType<Prisma.UserPreferencesUpdateInput> = z.strictObject({
  notifications: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  language: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const DocumentUpdateWithoutProprietaireInputSchema: z.ZodType<Prisma.DocumentUpdateWithoutProprietaireInput> = z.strictObject({
  nomFichier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  urlStockage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => DocumentTypeSchema), z.lazy(() => EnumDocumentTypeFieldUpdateOperationsInputSchema) ]).optional(),
  statut: z.union([ z.lazy(() => DocumentStatutSchema), z.lazy(() => EnumDocumentStatutFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => DocumentUpdatetagsInputSchema), z.string().array() ]).optional(),
  dateUpload: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dossiers: z.lazy(() => DossierUpdateManyWithoutDocumentsNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUpdateManyWithoutDocumentLieNestedInputSchema).optional(),
});

export const DocumentUncheckedUpdateWithoutProprietaireInputSchema: z.ZodType<Prisma.DocumentUncheckedUpdateWithoutProprietaireInput> = z.strictObject({
  nomFichier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  urlStockage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => DocumentTypeSchema), z.lazy(() => EnumDocumentTypeFieldUpdateOperationsInputSchema) ]).optional(),
  statut: z.union([ z.lazy(() => DocumentStatutSchema), z.lazy(() => EnumDocumentStatutFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => DocumentUpdatetagsInputSchema), z.string().array() ]).optional(),
  dateUpload: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dossierIds: z.union([ z.lazy(() => DocumentUpdatedossierIdsInputSchema), z.string().array() ]).optional(),
  dossiers: z.lazy(() => DossierUncheckedUpdateManyWithoutDocumentsNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedUpdateManyWithoutDocumentLieNestedInputSchema).optional(),
});

export const DocumentUncheckedUpdateManyWithoutProprietaireInputSchema: z.ZodType<Prisma.DocumentUncheckedUpdateManyWithoutProprietaireInput> = z.strictObject({
  nomFichier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  urlStockage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => DocumentTypeSchema), z.lazy(() => EnumDocumentTypeFieldUpdateOperationsInputSchema) ]).optional(),
  statut: z.union([ z.lazy(() => DocumentStatutSchema), z.lazy(() => EnumDocumentStatutFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => DocumentUpdatetagsInputSchema), z.string().array() ]).optional(),
  dateUpload: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dossierIds: z.union([ z.lazy(() => DocumentUpdatedossierIdsInputSchema), z.string().array() ]).optional(),
});

export const DossierUpdateWithoutProprietaireInputSchema: z.ZodType<Prisma.DossierUpdateWithoutProprietaireInput> = z.strictObject({
  nom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  couleur: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  icone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  documents: z.lazy(() => DocumentUpdateManyWithoutDossiersNestedInputSchema).optional(),
});

export const DossierUncheckedUpdateWithoutProprietaireInputSchema: z.ZodType<Prisma.DossierUncheckedUpdateWithoutProprietaireInput> = z.strictObject({
  nom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  idsDocuments: z.union([ z.lazy(() => DossierUpdateidsDocumentsInputSchema), z.string().array() ]).optional(),
  couleur: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  icone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  documents: z.lazy(() => DocumentUncheckedUpdateManyWithoutDossiersNestedInputSchema).optional(),
});

export const DossierUncheckedUpdateManyWithoutProprietaireInputSchema: z.ZodType<Prisma.DossierUncheckedUpdateManyWithoutProprietaireInput> = z.strictObject({
  nom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  idsDocuments: z.union([ z.lazy(() => DossierUpdateidsDocumentsInputSchema), z.string().array() ]).optional(),
  couleur: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  icone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const DemarcheUtilisateurUpdateWithoutUtilisateurInputSchema: z.ZodType<Prisma.DemarcheUtilisateurUpdateWithoutUtilisateurInput> = z.strictObject({
  complete: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  dateDebut: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dateCompletion: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  statut: z.union([ z.lazy(() => DemarcheStatutSchema), z.lazy(() => EnumDemarcheStatutFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  modele: z.lazy(() => ModeleDemarcheUpdateOneRequiredWithoutDemarchesUtilisateurNestedInputSchema).optional(),
});

export const DemarcheUtilisateurUncheckedUpdateWithoutUtilisateurInputSchema: z.ZodType<Prisma.DemarcheUtilisateurUncheckedUpdateWithoutUtilisateurInput> = z.strictObject({
  idModele: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  complete: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  dateDebut: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dateCompletion: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  statut: z.union([ z.lazy(() => DemarcheStatutSchema), z.lazy(() => EnumDemarcheStatutFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const DemarcheUtilisateurUncheckedUpdateManyWithoutUtilisateurInputSchema: z.ZodType<Prisma.DemarcheUtilisateurUncheckedUpdateManyWithoutUtilisateurInput> = z.strictObject({
  idModele: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  complete: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  dateDebut: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dateCompletion: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  statut: z.union([ z.lazy(() => DemarcheStatutSchema), z.lazy(() => EnumDemarcheStatutFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const NotificationUpdateWithoutUserInputSchema: z.ZodType<Prisma.NotificationUpdateWithoutUserInput> = z.strictObject({
  type: z.union([ z.lazy(() => NotificationTypeSchema), z.lazy(() => EnumNotificationTypeFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lu: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  dateCreation: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  priorite: z.union([ z.lazy(() => NotificationPrioriteSchema), z.lazy(() => EnumNotificationPrioriteFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  documentLie: z.lazy(() => DocumentUpdateOneWithoutNotificationsNestedInputSchema).optional(),
});

export const NotificationUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.NotificationUncheckedUpdateWithoutUserInput> = z.strictObject({
  type: z.union([ z.lazy(() => NotificationTypeSchema), z.lazy(() => EnumNotificationTypeFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  idDocumentLie: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lu: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  dateCreation: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  priorite: z.union([ z.lazy(() => NotificationPrioriteSchema), z.lazy(() => EnumNotificationPrioriteFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const NotificationUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.NotificationUncheckedUpdateManyWithoutUserInput> = z.strictObject({
  type: z.union([ z.lazy(() => NotificationTypeSchema), z.lazy(() => EnumNotificationTypeFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  idDocumentLie: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lu: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  dateCreation: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  priorite: z.union([ z.lazy(() => NotificationPrioriteSchema), z.lazy(() => EnumNotificationPrioriteFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const AccountUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithoutUserInput> = z.strictObject({
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const AccountUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateWithoutUserInput> = z.strictObject({
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const AccountUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserInput> = z.strictObject({
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const SessionUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithoutUserInput> = z.strictObject({
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const SessionUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateWithoutUserInput> = z.strictObject({
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const SessionUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserInput> = z.strictObject({
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const NotificationCreateManyDocumentLieInputSchema: z.ZodType<Prisma.NotificationCreateManyDocumentLieInput> = z.strictObject({
  id: z.string().optional(),
  idUser: z.string(),
  type: z.lazy(() => NotificationTypeSchema),
  message: z.string(),
  lu: z.boolean().optional(),
  dateCreation: z.coerce.date().optional(),
  priorite: z.lazy(() => NotificationPrioriteSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const DossierUpdateWithoutDocumentsInputSchema: z.ZodType<Prisma.DossierUpdateWithoutDocumentsInput> = z.strictObject({
  nom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  couleur: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  icone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  proprietaire: z.lazy(() => UserUpdateOneRequiredWithoutDossiersNestedInputSchema).optional(),
});

export const DossierUncheckedUpdateWithoutDocumentsInputSchema: z.ZodType<Prisma.DossierUncheckedUpdateWithoutDocumentsInput> = z.strictObject({
  idProprietaire: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  idsDocuments: z.union([ z.lazy(() => DossierUpdateidsDocumentsInputSchema), z.string().array() ]).optional(),
  couleur: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  icone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const DossierUncheckedUpdateManyWithoutDocumentsInputSchema: z.ZodType<Prisma.DossierUncheckedUpdateManyWithoutDocumentsInput> = z.strictObject({
  idProprietaire: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  idsDocuments: z.union([ z.lazy(() => DossierUpdateidsDocumentsInputSchema), z.string().array() ]).optional(),
  couleur: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  icone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const NotificationUpdateWithoutDocumentLieInputSchema: z.ZodType<Prisma.NotificationUpdateWithoutDocumentLieInput> = z.strictObject({
  type: z.union([ z.lazy(() => NotificationTypeSchema), z.lazy(() => EnumNotificationTypeFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lu: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  dateCreation: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  priorite: z.union([ z.lazy(() => NotificationPrioriteSchema), z.lazy(() => EnumNotificationPrioriteFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutNotificationsNestedInputSchema).optional(),
});

export const NotificationUncheckedUpdateWithoutDocumentLieInputSchema: z.ZodType<Prisma.NotificationUncheckedUpdateWithoutDocumentLieInput> = z.strictObject({
  idUser: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => NotificationTypeSchema), z.lazy(() => EnumNotificationTypeFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lu: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  dateCreation: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  priorite: z.union([ z.lazy(() => NotificationPrioriteSchema), z.lazy(() => EnumNotificationPrioriteFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const NotificationUncheckedUpdateManyWithoutDocumentLieInputSchema: z.ZodType<Prisma.NotificationUncheckedUpdateManyWithoutDocumentLieInput> = z.strictObject({
  idUser: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => NotificationTypeSchema), z.lazy(() => EnumNotificationTypeFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lu: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  dateCreation: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  priorite: z.union([ z.lazy(() => NotificationPrioriteSchema), z.lazy(() => EnumNotificationPrioriteFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const DocumentUpdateWithoutDossiersInputSchema: z.ZodType<Prisma.DocumentUpdateWithoutDossiersInput> = z.strictObject({
  nomFichier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  urlStockage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => DocumentTypeSchema), z.lazy(() => EnumDocumentTypeFieldUpdateOperationsInputSchema) ]).optional(),
  statut: z.union([ z.lazy(() => DocumentStatutSchema), z.lazy(() => EnumDocumentStatutFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => DocumentUpdatetagsInputSchema), z.string().array() ]).optional(),
  dateUpload: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  proprietaire: z.lazy(() => UserUpdateOneRequiredWithoutDocumentsNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUpdateManyWithoutDocumentLieNestedInputSchema).optional(),
});

export const DocumentUncheckedUpdateWithoutDossiersInputSchema: z.ZodType<Prisma.DocumentUncheckedUpdateWithoutDossiersInput> = z.strictObject({
  idProprietaire: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nomFichier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  urlStockage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => DocumentTypeSchema), z.lazy(() => EnumDocumentTypeFieldUpdateOperationsInputSchema) ]).optional(),
  statut: z.union([ z.lazy(() => DocumentStatutSchema), z.lazy(() => EnumDocumentStatutFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => DocumentUpdatetagsInputSchema), z.string().array() ]).optional(),
  dateUpload: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dossierIds: z.union([ z.lazy(() => DocumentUpdatedossierIdsInputSchema), z.string().array() ]).optional(),
  notifications: z.lazy(() => NotificationUncheckedUpdateManyWithoutDocumentLieNestedInputSchema).optional(),
});

export const DocumentUncheckedUpdateManyWithoutDossiersInputSchema: z.ZodType<Prisma.DocumentUncheckedUpdateManyWithoutDossiersInput> = z.strictObject({
  idProprietaire: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nomFichier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  urlStockage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => DocumentTypeSchema), z.lazy(() => EnumDocumentTypeFieldUpdateOperationsInputSchema) ]).optional(),
  statut: z.union([ z.lazy(() => DocumentStatutSchema), z.lazy(() => EnumDocumentStatutFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => DocumentUpdatetagsInputSchema), z.string().array() ]).optional(),
  dateUpload: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dossierIds: z.union([ z.lazy(() => DocumentUpdatedossierIdsInputSchema), z.string().array() ]).optional(),
});

export const DemarcheUtilisateurCreateManyModeleInputSchema: z.ZodType<Prisma.DemarcheUtilisateurCreateManyModeleInput> = z.strictObject({
  id: z.string().optional(),
  idUtilisateur: z.string(),
  complete: z.boolean().optional(),
  dateDebut: z.coerce.date().optional(),
  dateCompletion: z.coerce.date().optional().nullable(),
  statut: z.lazy(() => DemarcheStatutSchema).optional(),
  notes: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const DemarcheUtilisateurUpdateWithoutModeleInputSchema: z.ZodType<Prisma.DemarcheUtilisateurUpdateWithoutModeleInput> = z.strictObject({
  complete: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  dateDebut: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dateCompletion: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  statut: z.union([ z.lazy(() => DemarcheStatutSchema), z.lazy(() => EnumDemarcheStatutFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  utilisateur: z.lazy(() => UserUpdateOneRequiredWithoutDemarchesUtilisateurNestedInputSchema).optional(),
});

export const DemarcheUtilisateurUncheckedUpdateWithoutModeleInputSchema: z.ZodType<Prisma.DemarcheUtilisateurUncheckedUpdateWithoutModeleInput> = z.strictObject({
  idUtilisateur: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  complete: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  dateDebut: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dateCompletion: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  statut: z.union([ z.lazy(() => DemarcheStatutSchema), z.lazy(() => EnumDemarcheStatutFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const DemarcheUtilisateurUncheckedUpdateManyWithoutModeleInputSchema: z.ZodType<Prisma.DemarcheUtilisateurUncheckedUpdateManyWithoutModeleInput> = z.strictObject({
  idUtilisateur: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  complete: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  dateDebut: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dateCompletion: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  statut: z.union([ z.lazy(() => DemarcheStatutSchema), z.lazy(() => EnumDemarcheStatutFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(), 
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(), 
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(), 
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(), 
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(), 
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(), UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(), 
  having: UserScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema, 
}).strict();

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema, 
}).strict();

export const DocumentFindFirstArgsSchema: z.ZodType<Prisma.DocumentFindFirstArgs> = z.object({
  select: DocumentSelectSchema.optional(),
  include: DocumentIncludeSchema.optional(),
  where: DocumentWhereInputSchema.optional(), 
  orderBy: z.union([ DocumentOrderByWithRelationInputSchema.array(), DocumentOrderByWithRelationInputSchema ]).optional(),
  cursor: DocumentWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DocumentScalarFieldEnumSchema, DocumentScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const DocumentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.DocumentFindFirstOrThrowArgs> = z.object({
  select: DocumentSelectSchema.optional(),
  include: DocumentIncludeSchema.optional(),
  where: DocumentWhereInputSchema.optional(), 
  orderBy: z.union([ DocumentOrderByWithRelationInputSchema.array(), DocumentOrderByWithRelationInputSchema ]).optional(),
  cursor: DocumentWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DocumentScalarFieldEnumSchema, DocumentScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const DocumentFindManyArgsSchema: z.ZodType<Prisma.DocumentFindManyArgs> = z.object({
  select: DocumentSelectSchema.optional(),
  include: DocumentIncludeSchema.optional(),
  where: DocumentWhereInputSchema.optional(), 
  orderBy: z.union([ DocumentOrderByWithRelationInputSchema.array(), DocumentOrderByWithRelationInputSchema ]).optional(),
  cursor: DocumentWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DocumentScalarFieldEnumSchema, DocumentScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const DocumentAggregateArgsSchema: z.ZodType<Prisma.DocumentAggregateArgs> = z.object({
  where: DocumentWhereInputSchema.optional(), 
  orderBy: z.union([ DocumentOrderByWithRelationInputSchema.array(), DocumentOrderByWithRelationInputSchema ]).optional(),
  cursor: DocumentWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const DocumentGroupByArgsSchema: z.ZodType<Prisma.DocumentGroupByArgs> = z.object({
  where: DocumentWhereInputSchema.optional(), 
  orderBy: z.union([ DocumentOrderByWithAggregationInputSchema.array(), DocumentOrderByWithAggregationInputSchema ]).optional(),
  by: DocumentScalarFieldEnumSchema.array(), 
  having: DocumentScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const DocumentFindUniqueArgsSchema: z.ZodType<Prisma.DocumentFindUniqueArgs> = z.object({
  select: DocumentSelectSchema.optional(),
  include: DocumentIncludeSchema.optional(),
  where: DocumentWhereUniqueInputSchema, 
}).strict();

export const DocumentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.DocumentFindUniqueOrThrowArgs> = z.object({
  select: DocumentSelectSchema.optional(),
  include: DocumentIncludeSchema.optional(),
  where: DocumentWhereUniqueInputSchema, 
}).strict();

export const DossierFindFirstArgsSchema: z.ZodType<Prisma.DossierFindFirstArgs> = z.object({
  select: DossierSelectSchema.optional(),
  include: DossierIncludeSchema.optional(),
  where: DossierWhereInputSchema.optional(), 
  orderBy: z.union([ DossierOrderByWithRelationInputSchema.array(), DossierOrderByWithRelationInputSchema ]).optional(),
  cursor: DossierWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DossierScalarFieldEnumSchema, DossierScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const DossierFindFirstOrThrowArgsSchema: z.ZodType<Prisma.DossierFindFirstOrThrowArgs> = z.object({
  select: DossierSelectSchema.optional(),
  include: DossierIncludeSchema.optional(),
  where: DossierWhereInputSchema.optional(), 
  orderBy: z.union([ DossierOrderByWithRelationInputSchema.array(), DossierOrderByWithRelationInputSchema ]).optional(),
  cursor: DossierWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DossierScalarFieldEnumSchema, DossierScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const DossierFindManyArgsSchema: z.ZodType<Prisma.DossierFindManyArgs> = z.object({
  select: DossierSelectSchema.optional(),
  include: DossierIncludeSchema.optional(),
  where: DossierWhereInputSchema.optional(), 
  orderBy: z.union([ DossierOrderByWithRelationInputSchema.array(), DossierOrderByWithRelationInputSchema ]).optional(),
  cursor: DossierWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DossierScalarFieldEnumSchema, DossierScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const DossierAggregateArgsSchema: z.ZodType<Prisma.DossierAggregateArgs> = z.object({
  where: DossierWhereInputSchema.optional(), 
  orderBy: z.union([ DossierOrderByWithRelationInputSchema.array(), DossierOrderByWithRelationInputSchema ]).optional(),
  cursor: DossierWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const DossierGroupByArgsSchema: z.ZodType<Prisma.DossierGroupByArgs> = z.object({
  where: DossierWhereInputSchema.optional(), 
  orderBy: z.union([ DossierOrderByWithAggregationInputSchema.array(), DossierOrderByWithAggregationInputSchema ]).optional(),
  by: DossierScalarFieldEnumSchema.array(), 
  having: DossierScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const DossierFindUniqueArgsSchema: z.ZodType<Prisma.DossierFindUniqueArgs> = z.object({
  select: DossierSelectSchema.optional(),
  include: DossierIncludeSchema.optional(),
  where: DossierWhereUniqueInputSchema, 
}).strict();

export const DossierFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.DossierFindUniqueOrThrowArgs> = z.object({
  select: DossierSelectSchema.optional(),
  include: DossierIncludeSchema.optional(),
  where: DossierWhereUniqueInputSchema, 
}).strict();

export const ModeleDemarcheFindFirstArgsSchema: z.ZodType<Prisma.ModeleDemarcheFindFirstArgs> = z.object({
  select: ModeleDemarcheSelectSchema.optional(),
  include: ModeleDemarcheIncludeSchema.optional(),
  where: ModeleDemarcheWhereInputSchema.optional(), 
  orderBy: z.union([ ModeleDemarcheOrderByWithRelationInputSchema.array(), ModeleDemarcheOrderByWithRelationInputSchema ]).optional(),
  cursor: ModeleDemarcheWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ModeleDemarcheScalarFieldEnumSchema, ModeleDemarcheScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const ModeleDemarcheFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ModeleDemarcheFindFirstOrThrowArgs> = z.object({
  select: ModeleDemarcheSelectSchema.optional(),
  include: ModeleDemarcheIncludeSchema.optional(),
  where: ModeleDemarcheWhereInputSchema.optional(), 
  orderBy: z.union([ ModeleDemarcheOrderByWithRelationInputSchema.array(), ModeleDemarcheOrderByWithRelationInputSchema ]).optional(),
  cursor: ModeleDemarcheWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ModeleDemarcheScalarFieldEnumSchema, ModeleDemarcheScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const ModeleDemarcheFindManyArgsSchema: z.ZodType<Prisma.ModeleDemarcheFindManyArgs> = z.object({
  select: ModeleDemarcheSelectSchema.optional(),
  include: ModeleDemarcheIncludeSchema.optional(),
  where: ModeleDemarcheWhereInputSchema.optional(), 
  orderBy: z.union([ ModeleDemarcheOrderByWithRelationInputSchema.array(), ModeleDemarcheOrderByWithRelationInputSchema ]).optional(),
  cursor: ModeleDemarcheWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ModeleDemarcheScalarFieldEnumSchema, ModeleDemarcheScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const ModeleDemarcheAggregateArgsSchema: z.ZodType<Prisma.ModeleDemarcheAggregateArgs> = z.object({
  where: ModeleDemarcheWhereInputSchema.optional(), 
  orderBy: z.union([ ModeleDemarcheOrderByWithRelationInputSchema.array(), ModeleDemarcheOrderByWithRelationInputSchema ]).optional(),
  cursor: ModeleDemarcheWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const ModeleDemarcheGroupByArgsSchema: z.ZodType<Prisma.ModeleDemarcheGroupByArgs> = z.object({
  where: ModeleDemarcheWhereInputSchema.optional(), 
  orderBy: z.union([ ModeleDemarcheOrderByWithAggregationInputSchema.array(), ModeleDemarcheOrderByWithAggregationInputSchema ]).optional(),
  by: ModeleDemarcheScalarFieldEnumSchema.array(), 
  having: ModeleDemarcheScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const ModeleDemarcheFindUniqueArgsSchema: z.ZodType<Prisma.ModeleDemarcheFindUniqueArgs> = z.object({
  select: ModeleDemarcheSelectSchema.optional(),
  include: ModeleDemarcheIncludeSchema.optional(),
  where: ModeleDemarcheWhereUniqueInputSchema, 
}).strict();

export const ModeleDemarcheFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ModeleDemarcheFindUniqueOrThrowArgs> = z.object({
  select: ModeleDemarcheSelectSchema.optional(),
  include: ModeleDemarcheIncludeSchema.optional(),
  where: ModeleDemarcheWhereUniqueInputSchema, 
}).strict();

export const DemarcheUtilisateurFindFirstArgsSchema: z.ZodType<Prisma.DemarcheUtilisateurFindFirstArgs> = z.object({
  select: DemarcheUtilisateurSelectSchema.optional(),
  include: DemarcheUtilisateurIncludeSchema.optional(),
  where: DemarcheUtilisateurWhereInputSchema.optional(), 
  orderBy: z.union([ DemarcheUtilisateurOrderByWithRelationInputSchema.array(), DemarcheUtilisateurOrderByWithRelationInputSchema ]).optional(),
  cursor: DemarcheUtilisateurWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DemarcheUtilisateurScalarFieldEnumSchema, DemarcheUtilisateurScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const DemarcheUtilisateurFindFirstOrThrowArgsSchema: z.ZodType<Prisma.DemarcheUtilisateurFindFirstOrThrowArgs> = z.object({
  select: DemarcheUtilisateurSelectSchema.optional(),
  include: DemarcheUtilisateurIncludeSchema.optional(),
  where: DemarcheUtilisateurWhereInputSchema.optional(), 
  orderBy: z.union([ DemarcheUtilisateurOrderByWithRelationInputSchema.array(), DemarcheUtilisateurOrderByWithRelationInputSchema ]).optional(),
  cursor: DemarcheUtilisateurWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DemarcheUtilisateurScalarFieldEnumSchema, DemarcheUtilisateurScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const DemarcheUtilisateurFindManyArgsSchema: z.ZodType<Prisma.DemarcheUtilisateurFindManyArgs> = z.object({
  select: DemarcheUtilisateurSelectSchema.optional(),
  include: DemarcheUtilisateurIncludeSchema.optional(),
  where: DemarcheUtilisateurWhereInputSchema.optional(), 
  orderBy: z.union([ DemarcheUtilisateurOrderByWithRelationInputSchema.array(), DemarcheUtilisateurOrderByWithRelationInputSchema ]).optional(),
  cursor: DemarcheUtilisateurWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DemarcheUtilisateurScalarFieldEnumSchema, DemarcheUtilisateurScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const DemarcheUtilisateurAggregateArgsSchema: z.ZodType<Prisma.DemarcheUtilisateurAggregateArgs> = z.object({
  where: DemarcheUtilisateurWhereInputSchema.optional(), 
  orderBy: z.union([ DemarcheUtilisateurOrderByWithRelationInputSchema.array(), DemarcheUtilisateurOrderByWithRelationInputSchema ]).optional(),
  cursor: DemarcheUtilisateurWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const DemarcheUtilisateurGroupByArgsSchema: z.ZodType<Prisma.DemarcheUtilisateurGroupByArgs> = z.object({
  where: DemarcheUtilisateurWhereInputSchema.optional(), 
  orderBy: z.union([ DemarcheUtilisateurOrderByWithAggregationInputSchema.array(), DemarcheUtilisateurOrderByWithAggregationInputSchema ]).optional(),
  by: DemarcheUtilisateurScalarFieldEnumSchema.array(), 
  having: DemarcheUtilisateurScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const DemarcheUtilisateurFindUniqueArgsSchema: z.ZodType<Prisma.DemarcheUtilisateurFindUniqueArgs> = z.object({
  select: DemarcheUtilisateurSelectSchema.optional(),
  include: DemarcheUtilisateurIncludeSchema.optional(),
  where: DemarcheUtilisateurWhereUniqueInputSchema, 
}).strict();

export const DemarcheUtilisateurFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.DemarcheUtilisateurFindUniqueOrThrowArgs> = z.object({
  select: DemarcheUtilisateurSelectSchema.optional(),
  include: DemarcheUtilisateurIncludeSchema.optional(),
  where: DemarcheUtilisateurWhereUniqueInputSchema, 
}).strict();

export const NotificationFindFirstArgsSchema: z.ZodType<Prisma.NotificationFindFirstArgs> = z.object({
  select: NotificationSelectSchema.optional(),
  include: NotificationIncludeSchema.optional(),
  where: NotificationWhereInputSchema.optional(), 
  orderBy: z.union([ NotificationOrderByWithRelationInputSchema.array(), NotificationOrderByWithRelationInputSchema ]).optional(),
  cursor: NotificationWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ NotificationScalarFieldEnumSchema, NotificationScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const NotificationFindFirstOrThrowArgsSchema: z.ZodType<Prisma.NotificationFindFirstOrThrowArgs> = z.object({
  select: NotificationSelectSchema.optional(),
  include: NotificationIncludeSchema.optional(),
  where: NotificationWhereInputSchema.optional(), 
  orderBy: z.union([ NotificationOrderByWithRelationInputSchema.array(), NotificationOrderByWithRelationInputSchema ]).optional(),
  cursor: NotificationWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ NotificationScalarFieldEnumSchema, NotificationScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const NotificationFindManyArgsSchema: z.ZodType<Prisma.NotificationFindManyArgs> = z.object({
  select: NotificationSelectSchema.optional(),
  include: NotificationIncludeSchema.optional(),
  where: NotificationWhereInputSchema.optional(), 
  orderBy: z.union([ NotificationOrderByWithRelationInputSchema.array(), NotificationOrderByWithRelationInputSchema ]).optional(),
  cursor: NotificationWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ NotificationScalarFieldEnumSchema, NotificationScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const NotificationAggregateArgsSchema: z.ZodType<Prisma.NotificationAggregateArgs> = z.object({
  where: NotificationWhereInputSchema.optional(), 
  orderBy: z.union([ NotificationOrderByWithRelationInputSchema.array(), NotificationOrderByWithRelationInputSchema ]).optional(),
  cursor: NotificationWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const NotificationGroupByArgsSchema: z.ZodType<Prisma.NotificationGroupByArgs> = z.object({
  where: NotificationWhereInputSchema.optional(), 
  orderBy: z.union([ NotificationOrderByWithAggregationInputSchema.array(), NotificationOrderByWithAggregationInputSchema ]).optional(),
  by: NotificationScalarFieldEnumSchema.array(), 
  having: NotificationScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const NotificationFindUniqueArgsSchema: z.ZodType<Prisma.NotificationFindUniqueArgs> = z.object({
  select: NotificationSelectSchema.optional(),
  include: NotificationIncludeSchema.optional(),
  where: NotificationWhereUniqueInputSchema, 
}).strict();

export const NotificationFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.NotificationFindUniqueOrThrowArgs> = z.object({
  select: NotificationSelectSchema.optional(),
  include: NotificationIncludeSchema.optional(),
  where: NotificationWhereUniqueInputSchema, 
}).strict();

export const AccountFindFirstArgsSchema: z.ZodType<Prisma.AccountFindFirstArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(), 
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(), AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema, AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const AccountFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AccountFindFirstOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(), 
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(), AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema, AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const AccountFindManyArgsSchema: z.ZodType<Prisma.AccountFindManyArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(), 
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(), AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema, AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const AccountAggregateArgsSchema: z.ZodType<Prisma.AccountAggregateArgs> = z.object({
  where: AccountWhereInputSchema.optional(), 
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(), AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const AccountGroupByArgsSchema: z.ZodType<Prisma.AccountGroupByArgs> = z.object({
  where: AccountWhereInputSchema.optional(), 
  orderBy: z.union([ AccountOrderByWithAggregationInputSchema.array(), AccountOrderByWithAggregationInputSchema ]).optional(),
  by: AccountScalarFieldEnumSchema.array(), 
  having: AccountScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const AccountFindUniqueArgsSchema: z.ZodType<Prisma.AccountFindUniqueArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema, 
}).strict();

export const AccountFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AccountFindUniqueOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema, 
}).strict();

export const SessionFindFirstArgsSchema: z.ZodType<Prisma.SessionFindFirstArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(), 
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(), SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema, SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const SessionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SessionFindFirstOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(), 
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(), SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema, SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const SessionFindManyArgsSchema: z.ZodType<Prisma.SessionFindManyArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(), 
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(), SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema, SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const SessionAggregateArgsSchema: z.ZodType<Prisma.SessionAggregateArgs> = z.object({
  where: SessionWhereInputSchema.optional(), 
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(), SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const SessionGroupByArgsSchema: z.ZodType<Prisma.SessionGroupByArgs> = z.object({
  where: SessionWhereInputSchema.optional(), 
  orderBy: z.union([ SessionOrderByWithAggregationInputSchema.array(), SessionOrderByWithAggregationInputSchema ]).optional(),
  by: SessionScalarFieldEnumSchema.array(), 
  having: SessionScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const SessionFindUniqueArgsSchema: z.ZodType<Prisma.SessionFindUniqueArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema, 
}).strict();

export const SessionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SessionFindUniqueOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema, 
}).strict();

export const VerificationTokenFindFirstArgsSchema: z.ZodType<Prisma.VerificationTokenFindFirstArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(), 
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(), VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema, VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const VerificationTokenFindFirstOrThrowArgsSchema: z.ZodType<Prisma.VerificationTokenFindFirstOrThrowArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(), 
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(), VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema, VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const VerificationTokenFindManyArgsSchema: z.ZodType<Prisma.VerificationTokenFindManyArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(), 
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(), VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema, VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const VerificationTokenAggregateArgsSchema: z.ZodType<Prisma.VerificationTokenAggregateArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(), 
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(), VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const VerificationTokenGroupByArgsSchema: z.ZodType<Prisma.VerificationTokenGroupByArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(), 
  orderBy: z.union([ VerificationTokenOrderByWithAggregationInputSchema.array(), VerificationTokenOrderByWithAggregationInputSchema ]).optional(),
  by: VerificationTokenScalarFieldEnumSchema.array(), 
  having: VerificationTokenScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const VerificationTokenFindUniqueArgsSchema: z.ZodType<Prisma.VerificationTokenFindUniqueArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema, 
}).strict();

export const VerificationTokenFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.VerificationTokenFindUniqueOrThrowArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema, 
}).strict();

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema, UserUncheckedCreateInputSchema ]),
}).strict();

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema, 
  create: z.union([ UserCreateInputSchema, UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema, UserUncheckedUpdateInputSchema ]),
}).strict();

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema, UserCreateManyInputSchema.array() ]),
}).strict();

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema, 
}).strict();

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema, UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema, 
}).strict();

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema, UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(), 
}).strict();

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(), 
}).strict();

export const DocumentCreateArgsSchema: z.ZodType<Prisma.DocumentCreateArgs> = z.object({
  select: DocumentSelectSchema.optional(),
  include: DocumentIncludeSchema.optional(),
  data: z.union([ DocumentCreateInputSchema, DocumentUncheckedCreateInputSchema ]),
}).strict();

export const DocumentUpsertArgsSchema: z.ZodType<Prisma.DocumentUpsertArgs> = z.object({
  select: DocumentSelectSchema.optional(),
  include: DocumentIncludeSchema.optional(),
  where: DocumentWhereUniqueInputSchema, 
  create: z.union([ DocumentCreateInputSchema, DocumentUncheckedCreateInputSchema ]),
  update: z.union([ DocumentUpdateInputSchema, DocumentUncheckedUpdateInputSchema ]),
}).strict();

export const DocumentCreateManyArgsSchema: z.ZodType<Prisma.DocumentCreateManyArgs> = z.object({
  data: z.union([ DocumentCreateManyInputSchema, DocumentCreateManyInputSchema.array() ]),
}).strict();

export const DocumentDeleteArgsSchema: z.ZodType<Prisma.DocumentDeleteArgs> = z.object({
  select: DocumentSelectSchema.optional(),
  include: DocumentIncludeSchema.optional(),
  where: DocumentWhereUniqueInputSchema, 
}).strict();

export const DocumentUpdateArgsSchema: z.ZodType<Prisma.DocumentUpdateArgs> = z.object({
  select: DocumentSelectSchema.optional(),
  include: DocumentIncludeSchema.optional(),
  data: z.union([ DocumentUpdateInputSchema, DocumentUncheckedUpdateInputSchema ]),
  where: DocumentWhereUniqueInputSchema, 
}).strict();

export const DocumentUpdateManyArgsSchema: z.ZodType<Prisma.DocumentUpdateManyArgs> = z.object({
  data: z.union([ DocumentUpdateManyMutationInputSchema, DocumentUncheckedUpdateManyInputSchema ]),
  where: DocumentWhereInputSchema.optional(), 
}).strict();

export const DocumentDeleteManyArgsSchema: z.ZodType<Prisma.DocumentDeleteManyArgs> = z.object({
  where: DocumentWhereInputSchema.optional(), 
}).strict();

export const DossierCreateArgsSchema: z.ZodType<Prisma.DossierCreateArgs> = z.object({
  select: DossierSelectSchema.optional(),
  include: DossierIncludeSchema.optional(),
  data: z.union([ DossierCreateInputSchema, DossierUncheckedCreateInputSchema ]),
}).strict();

export const DossierUpsertArgsSchema: z.ZodType<Prisma.DossierUpsertArgs> = z.object({
  select: DossierSelectSchema.optional(),
  include: DossierIncludeSchema.optional(),
  where: DossierWhereUniqueInputSchema, 
  create: z.union([ DossierCreateInputSchema, DossierUncheckedCreateInputSchema ]),
  update: z.union([ DossierUpdateInputSchema, DossierUncheckedUpdateInputSchema ]),
}).strict();

export const DossierCreateManyArgsSchema: z.ZodType<Prisma.DossierCreateManyArgs> = z.object({
  data: z.union([ DossierCreateManyInputSchema, DossierCreateManyInputSchema.array() ]),
}).strict();

export const DossierDeleteArgsSchema: z.ZodType<Prisma.DossierDeleteArgs> = z.object({
  select: DossierSelectSchema.optional(),
  include: DossierIncludeSchema.optional(),
  where: DossierWhereUniqueInputSchema, 
}).strict();

export const DossierUpdateArgsSchema: z.ZodType<Prisma.DossierUpdateArgs> = z.object({
  select: DossierSelectSchema.optional(),
  include: DossierIncludeSchema.optional(),
  data: z.union([ DossierUpdateInputSchema, DossierUncheckedUpdateInputSchema ]),
  where: DossierWhereUniqueInputSchema, 
}).strict();

export const DossierUpdateManyArgsSchema: z.ZodType<Prisma.DossierUpdateManyArgs> = z.object({
  data: z.union([ DossierUpdateManyMutationInputSchema, DossierUncheckedUpdateManyInputSchema ]),
  where: DossierWhereInputSchema.optional(), 
}).strict();

export const DossierDeleteManyArgsSchema: z.ZodType<Prisma.DossierDeleteManyArgs> = z.object({
  where: DossierWhereInputSchema.optional(), 
}).strict();

export const ModeleDemarcheCreateArgsSchema: z.ZodType<Prisma.ModeleDemarcheCreateArgs> = z.object({
  select: ModeleDemarcheSelectSchema.optional(),
  include: ModeleDemarcheIncludeSchema.optional(),
  data: z.union([ ModeleDemarcheCreateInputSchema, ModeleDemarcheUncheckedCreateInputSchema ]),
}).strict();

export const ModeleDemarcheUpsertArgsSchema: z.ZodType<Prisma.ModeleDemarcheUpsertArgs> = z.object({
  select: ModeleDemarcheSelectSchema.optional(),
  include: ModeleDemarcheIncludeSchema.optional(),
  where: ModeleDemarcheWhereUniqueInputSchema, 
  create: z.union([ ModeleDemarcheCreateInputSchema, ModeleDemarcheUncheckedCreateInputSchema ]),
  update: z.union([ ModeleDemarcheUpdateInputSchema, ModeleDemarcheUncheckedUpdateInputSchema ]),
}).strict();

export const ModeleDemarcheCreateManyArgsSchema: z.ZodType<Prisma.ModeleDemarcheCreateManyArgs> = z.object({
  data: z.union([ ModeleDemarcheCreateManyInputSchema, ModeleDemarcheCreateManyInputSchema.array() ]),
}).strict();

export const ModeleDemarcheDeleteArgsSchema: z.ZodType<Prisma.ModeleDemarcheDeleteArgs> = z.object({
  select: ModeleDemarcheSelectSchema.optional(),
  include: ModeleDemarcheIncludeSchema.optional(),
  where: ModeleDemarcheWhereUniqueInputSchema, 
}).strict();

export const ModeleDemarcheUpdateArgsSchema: z.ZodType<Prisma.ModeleDemarcheUpdateArgs> = z.object({
  select: ModeleDemarcheSelectSchema.optional(),
  include: ModeleDemarcheIncludeSchema.optional(),
  data: z.union([ ModeleDemarcheUpdateInputSchema, ModeleDemarcheUncheckedUpdateInputSchema ]),
  where: ModeleDemarcheWhereUniqueInputSchema, 
}).strict();

export const ModeleDemarcheUpdateManyArgsSchema: z.ZodType<Prisma.ModeleDemarcheUpdateManyArgs> = z.object({
  data: z.union([ ModeleDemarcheUpdateManyMutationInputSchema, ModeleDemarcheUncheckedUpdateManyInputSchema ]),
  where: ModeleDemarcheWhereInputSchema.optional(), 
}).strict();

export const ModeleDemarcheDeleteManyArgsSchema: z.ZodType<Prisma.ModeleDemarcheDeleteManyArgs> = z.object({
  where: ModeleDemarcheWhereInputSchema.optional(), 
}).strict();

export const DemarcheUtilisateurCreateArgsSchema: z.ZodType<Prisma.DemarcheUtilisateurCreateArgs> = z.object({
  select: DemarcheUtilisateurSelectSchema.optional(),
  include: DemarcheUtilisateurIncludeSchema.optional(),
  data: z.union([ DemarcheUtilisateurCreateInputSchema, DemarcheUtilisateurUncheckedCreateInputSchema ]),
}).strict();

export const DemarcheUtilisateurUpsertArgsSchema: z.ZodType<Prisma.DemarcheUtilisateurUpsertArgs> = z.object({
  select: DemarcheUtilisateurSelectSchema.optional(),
  include: DemarcheUtilisateurIncludeSchema.optional(),
  where: DemarcheUtilisateurWhereUniqueInputSchema, 
  create: z.union([ DemarcheUtilisateurCreateInputSchema, DemarcheUtilisateurUncheckedCreateInputSchema ]),
  update: z.union([ DemarcheUtilisateurUpdateInputSchema, DemarcheUtilisateurUncheckedUpdateInputSchema ]),
}).strict();

export const DemarcheUtilisateurCreateManyArgsSchema: z.ZodType<Prisma.DemarcheUtilisateurCreateManyArgs> = z.object({
  data: z.union([ DemarcheUtilisateurCreateManyInputSchema, DemarcheUtilisateurCreateManyInputSchema.array() ]),
}).strict();

export const DemarcheUtilisateurDeleteArgsSchema: z.ZodType<Prisma.DemarcheUtilisateurDeleteArgs> = z.object({
  select: DemarcheUtilisateurSelectSchema.optional(),
  include: DemarcheUtilisateurIncludeSchema.optional(),
  where: DemarcheUtilisateurWhereUniqueInputSchema, 
}).strict();

export const DemarcheUtilisateurUpdateArgsSchema: z.ZodType<Prisma.DemarcheUtilisateurUpdateArgs> = z.object({
  select: DemarcheUtilisateurSelectSchema.optional(),
  include: DemarcheUtilisateurIncludeSchema.optional(),
  data: z.union([ DemarcheUtilisateurUpdateInputSchema, DemarcheUtilisateurUncheckedUpdateInputSchema ]),
  where: DemarcheUtilisateurWhereUniqueInputSchema, 
}).strict();

export const DemarcheUtilisateurUpdateManyArgsSchema: z.ZodType<Prisma.DemarcheUtilisateurUpdateManyArgs> = z.object({
  data: z.union([ DemarcheUtilisateurUpdateManyMutationInputSchema, DemarcheUtilisateurUncheckedUpdateManyInputSchema ]),
  where: DemarcheUtilisateurWhereInputSchema.optional(), 
}).strict();

export const DemarcheUtilisateurDeleteManyArgsSchema: z.ZodType<Prisma.DemarcheUtilisateurDeleteManyArgs> = z.object({
  where: DemarcheUtilisateurWhereInputSchema.optional(), 
}).strict();

export const NotificationCreateArgsSchema: z.ZodType<Prisma.NotificationCreateArgs> = z.object({
  select: NotificationSelectSchema.optional(),
  include: NotificationIncludeSchema.optional(),
  data: z.union([ NotificationCreateInputSchema, NotificationUncheckedCreateInputSchema ]),
}).strict();

export const NotificationUpsertArgsSchema: z.ZodType<Prisma.NotificationUpsertArgs> = z.object({
  select: NotificationSelectSchema.optional(),
  include: NotificationIncludeSchema.optional(),
  where: NotificationWhereUniqueInputSchema, 
  create: z.union([ NotificationCreateInputSchema, NotificationUncheckedCreateInputSchema ]),
  update: z.union([ NotificationUpdateInputSchema, NotificationUncheckedUpdateInputSchema ]),
}).strict();

export const NotificationCreateManyArgsSchema: z.ZodType<Prisma.NotificationCreateManyArgs> = z.object({
  data: z.union([ NotificationCreateManyInputSchema, NotificationCreateManyInputSchema.array() ]),
}).strict();

export const NotificationDeleteArgsSchema: z.ZodType<Prisma.NotificationDeleteArgs> = z.object({
  select: NotificationSelectSchema.optional(),
  include: NotificationIncludeSchema.optional(),
  where: NotificationWhereUniqueInputSchema, 
}).strict();

export const NotificationUpdateArgsSchema: z.ZodType<Prisma.NotificationUpdateArgs> = z.object({
  select: NotificationSelectSchema.optional(),
  include: NotificationIncludeSchema.optional(),
  data: z.union([ NotificationUpdateInputSchema, NotificationUncheckedUpdateInputSchema ]),
  where: NotificationWhereUniqueInputSchema, 
}).strict();

export const NotificationUpdateManyArgsSchema: z.ZodType<Prisma.NotificationUpdateManyArgs> = z.object({
  data: z.union([ NotificationUpdateManyMutationInputSchema, NotificationUncheckedUpdateManyInputSchema ]),
  where: NotificationWhereInputSchema.optional(), 
}).strict();

export const NotificationDeleteManyArgsSchema: z.ZodType<Prisma.NotificationDeleteManyArgs> = z.object({
  where: NotificationWhereInputSchema.optional(), 
}).strict();

export const AccountCreateArgsSchema: z.ZodType<Prisma.AccountCreateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountCreateInputSchema, AccountUncheckedCreateInputSchema ]),
}).strict();

export const AccountUpsertArgsSchema: z.ZodType<Prisma.AccountUpsertArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema, 
  create: z.union([ AccountCreateInputSchema, AccountUncheckedCreateInputSchema ]),
  update: z.union([ AccountUpdateInputSchema, AccountUncheckedUpdateInputSchema ]),
}).strict();

export const AccountCreateManyArgsSchema: z.ZodType<Prisma.AccountCreateManyArgs> = z.object({
  data: z.union([ AccountCreateManyInputSchema, AccountCreateManyInputSchema.array() ]),
}).strict();

export const AccountDeleteArgsSchema: z.ZodType<Prisma.AccountDeleteArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema, 
}).strict();

export const AccountUpdateArgsSchema: z.ZodType<Prisma.AccountUpdateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountUpdateInputSchema, AccountUncheckedUpdateInputSchema ]),
  where: AccountWhereUniqueInputSchema, 
}).strict();

export const AccountUpdateManyArgsSchema: z.ZodType<Prisma.AccountUpdateManyArgs> = z.object({
  data: z.union([ AccountUpdateManyMutationInputSchema, AccountUncheckedUpdateManyInputSchema ]),
  where: AccountWhereInputSchema.optional(), 
}).strict();

export const AccountDeleteManyArgsSchema: z.ZodType<Prisma.AccountDeleteManyArgs> = z.object({
  where: AccountWhereInputSchema.optional(), 
}).strict();

export const SessionCreateArgsSchema: z.ZodType<Prisma.SessionCreateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionCreateInputSchema, SessionUncheckedCreateInputSchema ]),
}).strict();

export const SessionUpsertArgsSchema: z.ZodType<Prisma.SessionUpsertArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema, 
  create: z.union([ SessionCreateInputSchema, SessionUncheckedCreateInputSchema ]),
  update: z.union([ SessionUpdateInputSchema, SessionUncheckedUpdateInputSchema ]),
}).strict();

export const SessionCreateManyArgsSchema: z.ZodType<Prisma.SessionCreateManyArgs> = z.object({
  data: z.union([ SessionCreateManyInputSchema, SessionCreateManyInputSchema.array() ]),
}).strict();

export const SessionDeleteArgsSchema: z.ZodType<Prisma.SessionDeleteArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema, 
}).strict();

export const SessionUpdateArgsSchema: z.ZodType<Prisma.SessionUpdateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionUpdateInputSchema, SessionUncheckedUpdateInputSchema ]),
  where: SessionWhereUniqueInputSchema, 
}).strict();

export const SessionUpdateManyArgsSchema: z.ZodType<Prisma.SessionUpdateManyArgs> = z.object({
  data: z.union([ SessionUpdateManyMutationInputSchema, SessionUncheckedUpdateManyInputSchema ]),
  where: SessionWhereInputSchema.optional(), 
}).strict();

export const SessionDeleteManyArgsSchema: z.ZodType<Prisma.SessionDeleteManyArgs> = z.object({
  where: SessionWhereInputSchema.optional(), 
}).strict();

export const VerificationTokenCreateArgsSchema: z.ZodType<Prisma.VerificationTokenCreateArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  data: z.union([ VerificationTokenCreateInputSchema, VerificationTokenUncheckedCreateInputSchema ]),
}).strict();

export const VerificationTokenUpsertArgsSchema: z.ZodType<Prisma.VerificationTokenUpsertArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema, 
  create: z.union([ VerificationTokenCreateInputSchema, VerificationTokenUncheckedCreateInputSchema ]),
  update: z.union([ VerificationTokenUpdateInputSchema, VerificationTokenUncheckedUpdateInputSchema ]),
}).strict();

export const VerificationTokenCreateManyArgsSchema: z.ZodType<Prisma.VerificationTokenCreateManyArgs> = z.object({
  data: z.union([ VerificationTokenCreateManyInputSchema, VerificationTokenCreateManyInputSchema.array() ]),
}).strict();

export const VerificationTokenDeleteArgsSchema: z.ZodType<Prisma.VerificationTokenDeleteArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema, 
}).strict();

export const VerificationTokenUpdateArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  data: z.union([ VerificationTokenUpdateInputSchema, VerificationTokenUncheckedUpdateInputSchema ]),
  where: VerificationTokenWhereUniqueInputSchema, 
}).strict();

export const VerificationTokenUpdateManyArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateManyArgs> = z.object({
  data: z.union([ VerificationTokenUpdateManyMutationInputSchema, VerificationTokenUncheckedUpdateManyInputSchema ]),
  where: VerificationTokenWhereInputSchema.optional(), 
}).strict();

export const VerificationTokenDeleteManyArgsSchema: z.ZodType<Prisma.VerificationTokenDeleteManyArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(), 
}).strict();