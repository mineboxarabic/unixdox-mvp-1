import { z } from 'zod';
import { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

// JSON
//------------------------------------------------------

export type NullableJsonInput = Prisma.JsonValue | null | 'JsonNull' | 'DbNull' | Prisma.NullTypes.DbNull | Prisma.NullTypes.JsonNull;

export const transformJsonNull = (v?: NullableJsonInput) => {
  if (!v || v === 'DbNull') return Prisma.NullTypes.DbNull;
  if (v === 'JsonNull') return Prisma.NullTypes.JsonNull;
  return v;
};

export const JsonValueSchema: z.ZodType<Prisma.JsonValue> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.literal(null),
    z.record(z.string(), z.lazy(() => JsonValueSchema.optional())),
    z.array(z.lazy(() => JsonValueSchema)),
  ])
);

export type JsonValueType = z.infer<typeof JsonValueSchema>;

export const NullableJsonValue = z
  .union([JsonValueSchema, z.literal('DbNull'), z.literal('JsonNull')])
  .nullable()
  .transform((v) => transformJsonNull(v));

export type NullableJsonValueType = z.infer<typeof NullableJsonValue>;

export const InputJsonValueSchema: z.ZodType<Prisma.InputJsonValue> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.object({ toJSON: z.any() }),
    z.record(z.string(), z.lazy(() => z.union([InputJsonValueSchema, z.literal(null)]))),
    z.array(z.lazy(() => z.union([InputJsonValueSchema, z.literal(null)]))),
  ])
);

export type InputJsonValueType = z.infer<typeof InputJsonValueSchema>;


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const UserScalarFieldEnumSchema = z.enum(['id','email','nom','urlAvatar','googleId','password','dateInscription','createdAt','updatedAt']);

export const DocumentScalarFieldEnumSchema = z.enum(['id','idProprietaire','nomFichier','urlStockage','idGridFs','type','statut','tags','dateUpload','size','createdAt','updatedAt','dossierIds']);

export const DossierScalarFieldEnumSchema = z.enum(['id','idProprietaire','nom','idsDocuments','couleur','icone','createdAt','updatedAt']);

export const ModeleDemarcheScalarFieldEnumSchema = z.enum(['id','titre','description','typesDocumentsRequis','categorie','actif','ordre','createdAt','updatedAt']);

export const DemarcheUtilisateurScalarFieldEnumSchema = z.enum(['id','idUtilisateur','idModele','complete','dateDebut','dateCompletion','statut','notes','createdAt','updatedAt']);

export const NotificationScalarFieldEnumSchema = z.enum(['id','idUser','type','message','idDocumentLie','lu','dateCreation','priorite','createdAt','updatedAt']);

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
  email: z.string(),
  nom: z.string(),
  urlAvatar: z.string().nullable(),
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
  idGridFs: z.string().nullable(),
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
// DONNEES EXTRAITES
//------------------------------------------------------


/////////////////////////////////////////
// DONNEES EXTRAITES SCHEMA
/////////////////////////////////////////

export const DonneesExtraitesSchema = z.object({
  dates: z.coerce.date().array(),
  montants: z.number().array(),
  noms: z.string().array(),
  adresses: z.string().array(),
  autres: JsonValueSchema.nullable(),
})

export type DonneesExtraites = z.infer<typeof DonneesExtraitesSchema>
// DOCUMENT FOURNI
//------------------------------------------------------


/////////////////////////////////////////
// DOCUMENT FOURNI SCHEMA
/////////////////////////////////////////

export const DocumentFourniSchema = z.object({
  typeDocument: z.string(),
  idDocument: z.string(),
  dateAjout: z.coerce.date(),
})

export type DocumentFourni = z.infer<typeof DocumentFourniSchema>

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
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  email: z.boolean().optional(),
  nom: z.boolean().optional(),
  urlAvatar: z.boolean().optional(),
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
  documentsFournis: z.boolean().optional(),
  dossiers: z.boolean().optional(),
  notifications: z.boolean().optional(),
}).strict();

export const DocumentSelectSchema: z.ZodType<Prisma.DocumentSelect> = z.object({
  id: z.boolean().optional(),
  idProprietaire: z.boolean().optional(),
  nomFichier: z.boolean().optional(),
  urlStockage: z.boolean().optional(),
  idGridFs: z.boolean().optional(),
  type: z.boolean().optional(),
  statut: z.boolean().optional(),
  tags: z.boolean().optional(),
  donneesExtraites: z.union([z.boolean(),z.lazy(() => DonneesExtraitesArgsSchema)]).optional(),
  dateUpload: z.boolean().optional(),
  size: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  dossierIds: z.boolean().optional(),
  documentsFournis: z.union([z.boolean(),z.lazy(() => DocumentFourniArgsSchema)]).optional(),
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
  documentsFournis: z.union([z.boolean(),z.lazy(() => DocumentFourniArgsSchema)]).optional(),
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

// USER PREFERENCES
//------------------------------------------------------

export const UserPreferencesArgsSchema: z.ZodType<Prisma.UserPreferencesDefaultArgs> = z.object({
  select: z.lazy(() => UserPreferencesSelectSchema).optional(),
}).strict();

export const UserPreferencesSelectSchema: z.ZodType<Prisma.UserPreferencesSelect> = z.object({
  notifications: z.boolean().optional(),
  language: z.boolean().optional(),
}).strict()

// DONNEES EXTRAITES
//------------------------------------------------------

export const DonneesExtraitesArgsSchema: z.ZodType<Prisma.DonneesExtraitesDefaultArgs> = z.object({
  select: z.lazy(() => DonneesExtraitesSelectSchema).optional(),
}).strict();

export const DonneesExtraitesSelectSchema: z.ZodType<Prisma.DonneesExtraitesSelect> = z.object({
  dates: z.boolean().optional(),
  montants: z.boolean().optional(),
  noms: z.boolean().optional(),
  adresses: z.boolean().optional(),
  autres: z.boolean().optional(),
}).strict()

// DOCUMENT FOURNI
//------------------------------------------------------

export const DocumentFourniArgsSchema: z.ZodType<Prisma.DocumentFourniDefaultArgs> = z.object({
  select: z.lazy(() => DocumentFourniSelectSchema).optional(),
}).strict();

export const DocumentFourniSelectSchema: z.ZodType<Prisma.DocumentFourniSelect> = z.object({
  typeDocument: z.boolean().optional(),
  idDocument: z.boolean().optional(),
  dateAjout: z.boolean().optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  nom: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  urlAvatar: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
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
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  nom: z.lazy(() => SortOrderSchema).optional(),
  urlAvatar: z.lazy(() => SortOrderSchema).optional(),
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
}).strict();

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
.and(z.object({
  id: z.string().optional(),
  email: z.string().optional(),
  googleId: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  nom: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  urlAvatar: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  dateInscription: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  preferences: z.union([ z.lazy(() => UserPreferencesNullableCompositeFilterSchema), z.lazy(() => UserPreferencesObjectEqualityInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  documents: z.lazy(() => DocumentListRelationFilterSchema).optional(),
  dossiers: z.lazy(() => DossierListRelationFilterSchema).optional(),
  demarchesUtilisateur: z.lazy(() => DemarcheUtilisateurListRelationFilterSchema).optional(),
  notifications: z.lazy(() => NotificationListRelationFilterSchema).optional(),
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  nom: z.lazy(() => SortOrderSchema).optional(),
  urlAvatar: z.lazy(() => SortOrderSchema).optional(),
  googleId: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  dateInscription: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema), z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema), z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  nom: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  urlAvatar: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  googleId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  dateInscription: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
}).strict();

export const DocumentWhereInputSchema: z.ZodType<Prisma.DocumentWhereInput> = z.object({
  AND: z.union([ z.lazy(() => DocumentWhereInputSchema), z.lazy(() => DocumentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DocumentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DocumentWhereInputSchema), z.lazy(() => DocumentWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  idProprietaire: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  nomFichier: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  urlStockage: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  idGridFs: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  type: z.union([ z.lazy(() => EnumDocumentTypeFilterSchema), z.lazy(() => DocumentTypeSchema) ]).optional(),
  statut: z.union([ z.lazy(() => EnumDocumentStatutFilterSchema), z.lazy(() => DocumentStatutSchema) ]).optional(),
  tags: z.lazy(() => StringNullableListFilterSchema).optional(),
  donneesExtraites: z.union([ z.lazy(() => DonneesExtraitesNullableCompositeFilterSchema), z.lazy(() => DonneesExtraitesObjectEqualityInputSchema) ]).optional().nullable(),
  dateUpload: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  size: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  dossierIds: z.lazy(() => StringNullableListFilterSchema).optional(),
  documentsFournis: z.union([ z.lazy(() => DocumentFourniCompositeListFilterSchema), z.lazy(() => DocumentFourniObjectEqualityInputSchema).array() ]).optional(),
  proprietaire: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
  dossiers: z.lazy(() => DossierListRelationFilterSchema).optional(),
  notifications: z.lazy(() => NotificationListRelationFilterSchema).optional(),
}).strict();

export const DocumentOrderByWithRelationInputSchema: z.ZodType<Prisma.DocumentOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  idProprietaire: z.lazy(() => SortOrderSchema).optional(),
  nomFichier: z.lazy(() => SortOrderSchema).optional(),
  urlStockage: z.lazy(() => SortOrderSchema).optional(),
  idGridFs: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  statut: z.lazy(() => SortOrderSchema).optional(),
  tags: z.lazy(() => SortOrderSchema).optional(),
  donneesExtraites: z.lazy(() => DonneesExtraitesOrderByInputSchema).optional(),
  dateUpload: z.lazy(() => SortOrderSchema).optional(),
  size: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  dossierIds: z.lazy(() => SortOrderSchema).optional(),
  documentsFournis: z.lazy(() => DocumentFourniOrderByCompositeAggregateInputSchema).optional(),
  proprietaire: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  dossiers: z.lazy(() => DossierOrderByRelationAggregateInputSchema).optional(),
  notifications: z.lazy(() => NotificationOrderByRelationAggregateInputSchema).optional(),
}).strict();

export const DocumentWhereUniqueInputSchema: z.ZodType<Prisma.DocumentWhereUniqueInput> = z.object({
  id: z.string(),
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => DocumentWhereInputSchema), z.lazy(() => DocumentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DocumentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DocumentWhereInputSchema), z.lazy(() => DocumentWhereInputSchema).array() ]).optional(),
  idProprietaire: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  nomFichier: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  urlStockage: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  idGridFs: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  type: z.union([ z.lazy(() => EnumDocumentTypeFilterSchema), z.lazy(() => DocumentTypeSchema) ]).optional(),
  statut: z.union([ z.lazy(() => EnumDocumentStatutFilterSchema), z.lazy(() => DocumentStatutSchema) ]).optional(),
  tags: z.lazy(() => StringNullableListFilterSchema).optional(),
  donneesExtraites: z.union([ z.lazy(() => DonneesExtraitesNullableCompositeFilterSchema), z.lazy(() => DonneesExtraitesObjectEqualityInputSchema) ]).optional().nullable(),
  dateUpload: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  size: z.union([ z.lazy(() => IntFilterSchema), z.number().int() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  dossierIds: z.lazy(() => StringNullableListFilterSchema).optional(),
  documentsFournis: z.union([ z.lazy(() => DocumentFourniCompositeListFilterSchema), z.lazy(() => DocumentFourniObjectEqualityInputSchema).array() ]).optional(),
  proprietaire: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
  dossiers: z.lazy(() => DossierListRelationFilterSchema).optional(),
  notifications: z.lazy(() => NotificationListRelationFilterSchema).optional(),
}).strict());

export const DocumentOrderByWithAggregationInputSchema: z.ZodType<Prisma.DocumentOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  idProprietaire: z.lazy(() => SortOrderSchema).optional(),
  nomFichier: z.lazy(() => SortOrderSchema).optional(),
  urlStockage: z.lazy(() => SortOrderSchema).optional(),
  idGridFs: z.lazy(() => SortOrderSchema).optional(),
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
}).strict();

export const DocumentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.DocumentScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => DocumentScalarWhereWithAggregatesInputSchema), z.lazy(() => DocumentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => DocumentScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DocumentScalarWhereWithAggregatesInputSchema), z.lazy(() => DocumentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  idProprietaire: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  nomFichier: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  urlStockage: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  idGridFs: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  type: z.union([ z.lazy(() => EnumDocumentTypeWithAggregatesFilterSchema), z.lazy(() => DocumentTypeSchema) ]).optional(),
  statut: z.union([ z.lazy(() => EnumDocumentStatutWithAggregatesFilterSchema), z.lazy(() => DocumentStatutSchema) ]).optional(),
  tags: z.lazy(() => StringNullableListFilterSchema).optional(),
  dateUpload: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  size: z.union([ z.lazy(() => IntWithAggregatesFilterSchema), z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  dossierIds: z.lazy(() => StringNullableListFilterSchema).optional(),
}).strict();

export const DossierWhereInputSchema: z.ZodType<Prisma.DossierWhereInput> = z.object({
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
  proprietaire: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
  documents: z.lazy(() => DocumentListRelationFilterSchema).optional(),
}).strict();

export const DossierOrderByWithRelationInputSchema: z.ZodType<Prisma.DossierOrderByWithRelationInput> = z.object({
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
}).strict();

export const DossierWhereUniqueInputSchema: z.ZodType<Prisma.DossierWhereUniqueInput> = z.object({
  id: z.string(),
})
.and(z.object({
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
  proprietaire: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
  documents: z.lazy(() => DocumentListRelationFilterSchema).optional(),
}).strict());

export const DossierOrderByWithAggregationInputSchema: z.ZodType<Prisma.DossierOrderByWithAggregationInput> = z.object({
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
}).strict();

export const DossierScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.DossierScalarWhereWithAggregatesInput> = z.object({
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
}).strict();

export const ModeleDemarcheWhereInputSchema: z.ZodType<Prisma.ModeleDemarcheWhereInput> = z.object({
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
}).strict();

export const ModeleDemarcheOrderByWithRelationInputSchema: z.ZodType<Prisma.ModeleDemarcheOrderByWithRelationInput> = z.object({
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
}).strict();

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
.and(z.object({
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
}).strict());

export const ModeleDemarcheOrderByWithAggregationInputSchema: z.ZodType<Prisma.ModeleDemarcheOrderByWithAggregationInput> = z.object({
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
}).strict();

export const ModeleDemarcheScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ModeleDemarcheScalarWhereWithAggregatesInput> = z.object({
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
}).strict();

export const DemarcheUtilisateurWhereInputSchema: z.ZodType<Prisma.DemarcheUtilisateurWhereInput> = z.object({
  AND: z.union([ z.lazy(() => DemarcheUtilisateurWhereInputSchema), z.lazy(() => DemarcheUtilisateurWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DemarcheUtilisateurWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DemarcheUtilisateurWhereInputSchema), z.lazy(() => DemarcheUtilisateurWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  idUtilisateur: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  idModele: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  documentsFournis: z.union([ z.lazy(() => DocumentFourniCompositeListFilterSchema), z.lazy(() => DocumentFourniObjectEqualityInputSchema).array() ]).optional(),
  complete: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  dateDebut: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  dateCompletion: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  statut: z.union([ z.lazy(() => EnumDemarcheStatutFilterSchema), z.lazy(() => DemarcheStatutSchema) ]).optional(),
  notes: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  utilisateur: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
  modele: z.union([ z.lazy(() => ModeleDemarcheScalarRelationFilterSchema), z.lazy(() => ModeleDemarcheWhereInputSchema) ]).optional(),
}).strict();

export const DemarcheUtilisateurOrderByWithRelationInputSchema: z.ZodType<Prisma.DemarcheUtilisateurOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  idUtilisateur: z.lazy(() => SortOrderSchema).optional(),
  idModele: z.lazy(() => SortOrderSchema).optional(),
  documentsFournis: z.lazy(() => DocumentFourniOrderByCompositeAggregateInputSchema).optional(),
  complete: z.lazy(() => SortOrderSchema).optional(),
  dateDebut: z.lazy(() => SortOrderSchema).optional(),
  dateCompletion: z.lazy(() => SortOrderSchema).optional(),
  statut: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  utilisateur: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  modele: z.lazy(() => ModeleDemarcheOrderByWithRelationInputSchema).optional(),
}).strict();

export const DemarcheUtilisateurWhereUniqueInputSchema: z.ZodType<Prisma.DemarcheUtilisateurWhereUniqueInput> = z.object({
  id: z.string(),
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => DemarcheUtilisateurWhereInputSchema), z.lazy(() => DemarcheUtilisateurWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DemarcheUtilisateurWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DemarcheUtilisateurWhereInputSchema), z.lazy(() => DemarcheUtilisateurWhereInputSchema).array() ]).optional(),
  idUtilisateur: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  idModele: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  documentsFournis: z.union([ z.lazy(() => DocumentFourniCompositeListFilterSchema), z.lazy(() => DocumentFourniObjectEqualityInputSchema).array() ]).optional(),
  complete: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  dateDebut: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  dateCompletion: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  statut: z.union([ z.lazy(() => EnumDemarcheStatutFilterSchema), z.lazy(() => DemarcheStatutSchema) ]).optional(),
  notes: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  utilisateur: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
  modele: z.union([ z.lazy(() => ModeleDemarcheScalarRelationFilterSchema), z.lazy(() => ModeleDemarcheWhereInputSchema) ]).optional(),
}).strict());

export const DemarcheUtilisateurOrderByWithAggregationInputSchema: z.ZodType<Prisma.DemarcheUtilisateurOrderByWithAggregationInput> = z.object({
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
}).strict();

export const DemarcheUtilisateurScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.DemarcheUtilisateurScalarWhereWithAggregatesInput> = z.object({
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
}).strict();

export const NotificationWhereInputSchema: z.ZodType<Prisma.NotificationWhereInput> = z.object({
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
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
  documentLie: z.union([ z.lazy(() => DocumentNullableScalarRelationFilterSchema), z.lazy(() => DocumentWhereInputSchema) ]).optional().nullable(),
}).strict();

export const NotificationOrderByWithRelationInputSchema: z.ZodType<Prisma.NotificationOrderByWithRelationInput> = z.object({
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
}).strict();

export const NotificationWhereUniqueInputSchema: z.ZodType<Prisma.NotificationWhereUniqueInput> = z.object({
  id: z.string(),
})
.and(z.object({
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
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
  documentLie: z.union([ z.lazy(() => DocumentNullableScalarRelationFilterSchema), z.lazy(() => DocumentWhereInputSchema) ]).optional().nullable(),
}).strict());

export const NotificationOrderByWithAggregationInputSchema: z.ZodType<Prisma.NotificationOrderByWithAggregationInput> = z.object({
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
}).strict();

export const NotificationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.NotificationScalarWhereWithAggregatesInput> = z.object({
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
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  nom: z.string(),
  urlAvatar: z.string().optional().nullable(),
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
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  nom: z.string(),
  urlAvatar: z.string().optional().nullable(),
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
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  urlAvatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  urlAvatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  nom: z.string(),
  urlAvatar: z.string().optional().nullable(),
  googleId: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  dateInscription: z.coerce.date().optional(),
  preferences: z.union([ z.lazy(() => UserPreferencesNullableCreateEnvelopeInputSchema), z.lazy(() => UserPreferencesCreateInputSchema) ]).optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  urlAvatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  googleId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateInscription: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  preferences: z.union([ z.lazy(() => UserPreferencesNullableUpdateEnvelopeInputSchema), z.lazy(() => UserPreferencesCreateInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  urlAvatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  googleId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateInscription: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  preferences: z.union([ z.lazy(() => UserPreferencesNullableUpdateEnvelopeInputSchema), z.lazy(() => UserPreferencesCreateInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DocumentCreateInputSchema: z.ZodType<Prisma.DocumentCreateInput> = z.object({
  id: z.string().optional(),
  nomFichier: z.string(),
  urlStockage: z.string().optional().nullable(),
  idGridFs: z.string().optional().nullable(),
  type: z.lazy(() => DocumentTypeSchema),
  statut: z.lazy(() => DocumentStatutSchema).optional(),
  tags: z.union([ z.lazy(() => DocumentCreatetagsInputSchema), z.string().array() ]).optional(),
  donneesExtraites: z.union([ z.lazy(() => DonneesExtraitesNullableCreateEnvelopeInputSchema), z.lazy(() => DonneesExtraitesCreateInputSchema) ]).optional().nullable(),
  dateUpload: z.coerce.date().optional(),
  size: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  documentsFournis: z.union([ z.lazy(() => DocumentFourniListCreateEnvelopeInputSchema), z.lazy(() => DocumentFourniCreateInputSchema), z.lazy(() => DocumentFourniCreateInputSchema).array() ]).optional(),
  proprietaire: z.lazy(() => UserCreateNestedOneWithoutDocumentsInputSchema),
  dossiers: z.lazy(() => DossierCreateNestedManyWithoutDocumentsInputSchema).optional(),
  notifications: z.lazy(() => NotificationCreateNestedManyWithoutDocumentLieInputSchema).optional(),
}).strict();

export const DocumentUncheckedCreateInputSchema: z.ZodType<Prisma.DocumentUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  idProprietaire: z.string(),
  nomFichier: z.string(),
  urlStockage: z.string().optional().nullable(),
  idGridFs: z.string().optional().nullable(),
  type: z.lazy(() => DocumentTypeSchema),
  statut: z.lazy(() => DocumentStatutSchema).optional(),
  tags: z.union([ z.lazy(() => DocumentCreatetagsInputSchema), z.string().array() ]).optional(),
  donneesExtraites: z.union([ z.lazy(() => DonneesExtraitesNullableCreateEnvelopeInputSchema), z.lazy(() => DonneesExtraitesCreateInputSchema) ]).optional().nullable(),
  dateUpload: z.coerce.date().optional(),
  size: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  dossierIds: z.union([ z.lazy(() => DocumentCreatedossierIdsInputSchema), z.string().array() ]).optional(),
  documentsFournis: z.union([ z.lazy(() => DocumentFourniListCreateEnvelopeInputSchema), z.lazy(() => DocumentFourniCreateInputSchema), z.lazy(() => DocumentFourniCreateInputSchema).array() ]).optional(),
  dossiers: z.lazy(() => DossierUncheckedCreateNestedManyWithoutDocumentsInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedCreateNestedManyWithoutDocumentLieInputSchema).optional(),
}).strict();

export const DocumentUpdateInputSchema: z.ZodType<Prisma.DocumentUpdateInput> = z.object({
  nomFichier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  urlStockage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  idGridFs: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => DocumentTypeSchema), z.lazy(() => EnumDocumentTypeFieldUpdateOperationsInputSchema) ]).optional(),
  statut: z.union([ z.lazy(() => DocumentStatutSchema), z.lazy(() => EnumDocumentStatutFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => DocumentUpdatetagsInputSchema), z.string().array() ]).optional(),
  donneesExtraites: z.union([ z.lazy(() => DonneesExtraitesNullableUpdateEnvelopeInputSchema), z.lazy(() => DonneesExtraitesCreateInputSchema) ]).optional().nullable(),
  dateUpload: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  documentsFournis: z.union([ z.lazy(() => DocumentFourniListUpdateEnvelopeInputSchema), z.lazy(() => DocumentFourniCreateInputSchema), z.lazy(() => DocumentFourniCreateInputSchema).array() ]).optional(),
  proprietaire: z.lazy(() => UserUpdateOneRequiredWithoutDocumentsNestedInputSchema).optional(),
  dossiers: z.lazy(() => DossierUpdateManyWithoutDocumentsNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUpdateManyWithoutDocumentLieNestedInputSchema).optional(),
}).strict();

export const DocumentUncheckedUpdateInputSchema: z.ZodType<Prisma.DocumentUncheckedUpdateInput> = z.object({
  idProprietaire: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nomFichier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  urlStockage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  idGridFs: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => DocumentTypeSchema), z.lazy(() => EnumDocumentTypeFieldUpdateOperationsInputSchema) ]).optional(),
  statut: z.union([ z.lazy(() => DocumentStatutSchema), z.lazy(() => EnumDocumentStatutFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => DocumentUpdatetagsInputSchema), z.string().array() ]).optional(),
  donneesExtraites: z.union([ z.lazy(() => DonneesExtraitesNullableUpdateEnvelopeInputSchema), z.lazy(() => DonneesExtraitesCreateInputSchema) ]).optional().nullable(),
  dateUpload: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dossierIds: z.union([ z.lazy(() => DocumentUpdatedossierIdsInputSchema), z.string().array() ]).optional(),
  documentsFournis: z.union([ z.lazy(() => DocumentFourniListUpdateEnvelopeInputSchema), z.lazy(() => DocumentFourniCreateInputSchema), z.lazy(() => DocumentFourniCreateInputSchema).array() ]).optional(),
  dossiers: z.lazy(() => DossierUncheckedUpdateManyWithoutDocumentsNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedUpdateManyWithoutDocumentLieNestedInputSchema).optional(),
}).strict();

export const DocumentCreateManyInputSchema: z.ZodType<Prisma.DocumentCreateManyInput> = z.object({
  id: z.string().optional(),
  idProprietaire: z.string(),
  nomFichier: z.string(),
  urlStockage: z.string().optional().nullable(),
  idGridFs: z.string().optional().nullable(),
  type: z.lazy(() => DocumentTypeSchema),
  statut: z.lazy(() => DocumentStatutSchema).optional(),
  tags: z.union([ z.lazy(() => DocumentCreatetagsInputSchema), z.string().array() ]).optional(),
  donneesExtraites: z.union([ z.lazy(() => DonneesExtraitesNullableCreateEnvelopeInputSchema), z.lazy(() => DonneesExtraitesCreateInputSchema) ]).optional().nullable(),
  dateUpload: z.coerce.date().optional(),
  size: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  dossierIds: z.union([ z.lazy(() => DocumentCreatedossierIdsInputSchema), z.string().array() ]).optional(),
  documentsFournis: z.union([ z.lazy(() => DocumentFourniListCreateEnvelopeInputSchema), z.lazy(() => DocumentFourniCreateInputSchema), z.lazy(() => DocumentFourniCreateInputSchema).array() ]).optional(),
}).strict();

export const DocumentUpdateManyMutationInputSchema: z.ZodType<Prisma.DocumentUpdateManyMutationInput> = z.object({
  nomFichier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  urlStockage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  idGridFs: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => DocumentTypeSchema), z.lazy(() => EnumDocumentTypeFieldUpdateOperationsInputSchema) ]).optional(),
  statut: z.union([ z.lazy(() => DocumentStatutSchema), z.lazy(() => EnumDocumentStatutFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => DocumentUpdatetagsInputSchema), z.string().array() ]).optional(),
  donneesExtraites: z.union([ z.lazy(() => DonneesExtraitesNullableUpdateEnvelopeInputSchema), z.lazy(() => DonneesExtraitesCreateInputSchema) ]).optional().nullable(),
  dateUpload: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  documentsFournis: z.union([ z.lazy(() => DocumentFourniListUpdateEnvelopeInputSchema), z.lazy(() => DocumentFourniCreateInputSchema), z.lazy(() => DocumentFourniCreateInputSchema).array() ]).optional(),
}).strict();

export const DocumentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.DocumentUncheckedUpdateManyInput> = z.object({
  idProprietaire: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nomFichier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  urlStockage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  idGridFs: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => DocumentTypeSchema), z.lazy(() => EnumDocumentTypeFieldUpdateOperationsInputSchema) ]).optional(),
  statut: z.union([ z.lazy(() => DocumentStatutSchema), z.lazy(() => EnumDocumentStatutFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => DocumentUpdatetagsInputSchema), z.string().array() ]).optional(),
  donneesExtraites: z.union([ z.lazy(() => DonneesExtraitesNullableUpdateEnvelopeInputSchema), z.lazy(() => DonneesExtraitesCreateInputSchema) ]).optional().nullable(),
  dateUpload: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dossierIds: z.union([ z.lazy(() => DocumentUpdatedossierIdsInputSchema), z.string().array() ]).optional(),
  documentsFournis: z.union([ z.lazy(() => DocumentFourniListUpdateEnvelopeInputSchema), z.lazy(() => DocumentFourniCreateInputSchema), z.lazy(() => DocumentFourniCreateInputSchema).array() ]).optional(),
}).strict();

export const DossierCreateInputSchema: z.ZodType<Prisma.DossierCreateInput> = z.object({
  id: z.string().optional(),
  nom: z.string(),
  couleur: z.string().optional(),
  icone: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  proprietaire: z.lazy(() => UserCreateNestedOneWithoutDossiersInputSchema),
  documents: z.lazy(() => DocumentCreateNestedManyWithoutDossiersInputSchema).optional(),
}).strict();

export const DossierUncheckedCreateInputSchema: z.ZodType<Prisma.DossierUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  idProprietaire: z.string(),
  nom: z.string(),
  idsDocuments: z.union([ z.lazy(() => DossierCreateidsDocumentsInputSchema), z.string().array() ]).optional(),
  couleur: z.string().optional(),
  icone: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  documents: z.lazy(() => DocumentUncheckedCreateNestedManyWithoutDossiersInputSchema).optional(),
}).strict();

export const DossierUpdateInputSchema: z.ZodType<Prisma.DossierUpdateInput> = z.object({
  nom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  couleur: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  icone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  proprietaire: z.lazy(() => UserUpdateOneRequiredWithoutDossiersNestedInputSchema).optional(),
  documents: z.lazy(() => DocumentUpdateManyWithoutDossiersNestedInputSchema).optional(),
}).strict();

export const DossierUncheckedUpdateInputSchema: z.ZodType<Prisma.DossierUncheckedUpdateInput> = z.object({
  idProprietaire: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  idsDocuments: z.union([ z.lazy(() => DossierUpdateidsDocumentsInputSchema), z.string().array() ]).optional(),
  couleur: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  icone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  documents: z.lazy(() => DocumentUncheckedUpdateManyWithoutDossiersNestedInputSchema).optional(),
}).strict();

export const DossierCreateManyInputSchema: z.ZodType<Prisma.DossierCreateManyInput> = z.object({
  id: z.string().optional(),
  idProprietaire: z.string(),
  nom: z.string(),
  idsDocuments: z.union([ z.lazy(() => DossierCreateidsDocumentsInputSchema), z.string().array() ]).optional(),
  couleur: z.string().optional(),
  icone: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}).strict();

export const DossierUpdateManyMutationInputSchema: z.ZodType<Prisma.DossierUpdateManyMutationInput> = z.object({
  nom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  couleur: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  icone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DossierUncheckedUpdateManyInputSchema: z.ZodType<Prisma.DossierUncheckedUpdateManyInput> = z.object({
  idProprietaire: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  idsDocuments: z.union([ z.lazy(() => DossierUpdateidsDocumentsInputSchema), z.string().array() ]).optional(),
  couleur: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  icone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ModeleDemarcheCreateInputSchema: z.ZodType<Prisma.ModeleDemarcheCreateInput> = z.object({
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
}).strict();

export const ModeleDemarcheUncheckedCreateInputSchema: z.ZodType<Prisma.ModeleDemarcheUncheckedCreateInput> = z.object({
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
}).strict();

export const ModeleDemarcheUpdateInputSchema: z.ZodType<Prisma.ModeleDemarcheUpdateInput> = z.object({
  titre: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  typesDocumentsRequis: z.union([ z.lazy(() => ModeleDemarcheUpdatetypesDocumentsRequisInputSchema), z.string().array() ]).optional(),
  categorie: z.union([ z.lazy(() => DemarcheCategorieSchema), z.lazy(() => EnumDemarcheCategorieFieldUpdateOperationsInputSchema) ]).optional(),
  actif: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  ordre: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  demarchesUtilisateur: z.lazy(() => DemarcheUtilisateurUpdateManyWithoutModeleNestedInputSchema).optional(),
}).strict();

export const ModeleDemarcheUncheckedUpdateInputSchema: z.ZodType<Prisma.ModeleDemarcheUncheckedUpdateInput> = z.object({
  titre: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  typesDocumentsRequis: z.union([ z.lazy(() => ModeleDemarcheUpdatetypesDocumentsRequisInputSchema), z.string().array() ]).optional(),
  categorie: z.union([ z.lazy(() => DemarcheCategorieSchema), z.lazy(() => EnumDemarcheCategorieFieldUpdateOperationsInputSchema) ]).optional(),
  actif: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  ordre: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  demarchesUtilisateur: z.lazy(() => DemarcheUtilisateurUncheckedUpdateManyWithoutModeleNestedInputSchema).optional(),
}).strict();

export const ModeleDemarcheCreateManyInputSchema: z.ZodType<Prisma.ModeleDemarcheCreateManyInput> = z.object({
  id: z.string().optional(),
  titre: z.string(),
  description: z.string().optional().nullable(),
  typesDocumentsRequis: z.union([ z.lazy(() => ModeleDemarcheCreatetypesDocumentsRequisInputSchema), z.string().array() ]).optional(),
  categorie: z.lazy(() => DemarcheCategorieSchema).optional(),
  actif: z.boolean().optional(),
  ordre: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}).strict();

export const ModeleDemarcheUpdateManyMutationInputSchema: z.ZodType<Prisma.ModeleDemarcheUpdateManyMutationInput> = z.object({
  titre: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  typesDocumentsRequis: z.union([ z.lazy(() => ModeleDemarcheUpdatetypesDocumentsRequisInputSchema), z.string().array() ]).optional(),
  categorie: z.union([ z.lazy(() => DemarcheCategorieSchema), z.lazy(() => EnumDemarcheCategorieFieldUpdateOperationsInputSchema) ]).optional(),
  actif: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  ordre: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ModeleDemarcheUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ModeleDemarcheUncheckedUpdateManyInput> = z.object({
  titre: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  typesDocumentsRequis: z.union([ z.lazy(() => ModeleDemarcheUpdatetypesDocumentsRequisInputSchema), z.string().array() ]).optional(),
  categorie: z.union([ z.lazy(() => DemarcheCategorieSchema), z.lazy(() => EnumDemarcheCategorieFieldUpdateOperationsInputSchema) ]).optional(),
  actif: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  ordre: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DemarcheUtilisateurCreateInputSchema: z.ZodType<Prisma.DemarcheUtilisateurCreateInput> = z.object({
  id: z.string().optional(),
  documentsFournis: z.union([ z.lazy(() => DocumentFourniListCreateEnvelopeInputSchema), z.lazy(() => DocumentFourniCreateInputSchema), z.lazy(() => DocumentFourniCreateInputSchema).array() ]).optional(),
  complete: z.boolean().optional(),
  dateDebut: z.coerce.date().optional(),
  dateCompletion: z.coerce.date().optional().nullable(),
  statut: z.lazy(() => DemarcheStatutSchema).optional(),
  notes: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  utilisateur: z.lazy(() => UserCreateNestedOneWithoutDemarchesUtilisateurInputSchema),
  modele: z.lazy(() => ModeleDemarcheCreateNestedOneWithoutDemarchesUtilisateurInputSchema),
}).strict();

export const DemarcheUtilisateurUncheckedCreateInputSchema: z.ZodType<Prisma.DemarcheUtilisateurUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  idUtilisateur: z.string(),
  idModele: z.string(),
  documentsFournis: z.union([ z.lazy(() => DocumentFourniListCreateEnvelopeInputSchema), z.lazy(() => DocumentFourniCreateInputSchema), z.lazy(() => DocumentFourniCreateInputSchema).array() ]).optional(),
  complete: z.boolean().optional(),
  dateDebut: z.coerce.date().optional(),
  dateCompletion: z.coerce.date().optional().nullable(),
  statut: z.lazy(() => DemarcheStatutSchema).optional(),
  notes: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}).strict();

export const DemarcheUtilisateurUpdateInputSchema: z.ZodType<Prisma.DemarcheUtilisateurUpdateInput> = z.object({
  documentsFournis: z.union([ z.lazy(() => DocumentFourniListUpdateEnvelopeInputSchema), z.lazy(() => DocumentFourniCreateInputSchema), z.lazy(() => DocumentFourniCreateInputSchema).array() ]).optional(),
  complete: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  dateDebut: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dateCompletion: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  statut: z.union([ z.lazy(() => DemarcheStatutSchema), z.lazy(() => EnumDemarcheStatutFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  utilisateur: z.lazy(() => UserUpdateOneRequiredWithoutDemarchesUtilisateurNestedInputSchema).optional(),
  modele: z.lazy(() => ModeleDemarcheUpdateOneRequiredWithoutDemarchesUtilisateurNestedInputSchema).optional(),
}).strict();

export const DemarcheUtilisateurUncheckedUpdateInputSchema: z.ZodType<Prisma.DemarcheUtilisateurUncheckedUpdateInput> = z.object({
  idUtilisateur: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  idModele: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  documentsFournis: z.union([ z.lazy(() => DocumentFourniListUpdateEnvelopeInputSchema), z.lazy(() => DocumentFourniCreateInputSchema), z.lazy(() => DocumentFourniCreateInputSchema).array() ]).optional(),
  complete: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  dateDebut: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dateCompletion: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  statut: z.union([ z.lazy(() => DemarcheStatutSchema), z.lazy(() => EnumDemarcheStatutFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DemarcheUtilisateurCreateManyInputSchema: z.ZodType<Prisma.DemarcheUtilisateurCreateManyInput> = z.object({
  id: z.string().optional(),
  idUtilisateur: z.string(),
  idModele: z.string(),
  documentsFournis: z.union([ z.lazy(() => DocumentFourniListCreateEnvelopeInputSchema), z.lazy(() => DocumentFourniCreateInputSchema), z.lazy(() => DocumentFourniCreateInputSchema).array() ]).optional(),
  complete: z.boolean().optional(),
  dateDebut: z.coerce.date().optional(),
  dateCompletion: z.coerce.date().optional().nullable(),
  statut: z.lazy(() => DemarcheStatutSchema).optional(),
  notes: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}).strict();

export const DemarcheUtilisateurUpdateManyMutationInputSchema: z.ZodType<Prisma.DemarcheUtilisateurUpdateManyMutationInput> = z.object({
  documentsFournis: z.union([ z.lazy(() => DocumentFourniListUpdateEnvelopeInputSchema), z.lazy(() => DocumentFourniCreateInputSchema), z.lazy(() => DocumentFourniCreateInputSchema).array() ]).optional(),
  complete: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  dateDebut: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dateCompletion: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  statut: z.union([ z.lazy(() => DemarcheStatutSchema), z.lazy(() => EnumDemarcheStatutFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DemarcheUtilisateurUncheckedUpdateManyInputSchema: z.ZodType<Prisma.DemarcheUtilisateurUncheckedUpdateManyInput> = z.object({
  idUtilisateur: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  idModele: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  documentsFournis: z.union([ z.lazy(() => DocumentFourniListUpdateEnvelopeInputSchema), z.lazy(() => DocumentFourniCreateInputSchema), z.lazy(() => DocumentFourniCreateInputSchema).array() ]).optional(),
  complete: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  dateDebut: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dateCompletion: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  statut: z.union([ z.lazy(() => DemarcheStatutSchema), z.lazy(() => EnumDemarcheStatutFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NotificationCreateInputSchema: z.ZodType<Prisma.NotificationCreateInput> = z.object({
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
}).strict();

export const NotificationUncheckedCreateInputSchema: z.ZodType<Prisma.NotificationUncheckedCreateInput> = z.object({
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
}).strict();

export const NotificationUpdateInputSchema: z.ZodType<Prisma.NotificationUpdateInput> = z.object({
  type: z.union([ z.lazy(() => NotificationTypeSchema), z.lazy(() => EnumNotificationTypeFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lu: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  dateCreation: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  priorite: z.union([ z.lazy(() => NotificationPrioriteSchema), z.lazy(() => EnumNotificationPrioriteFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutNotificationsNestedInputSchema).optional(),
  documentLie: z.lazy(() => DocumentUpdateOneWithoutNotificationsNestedInputSchema).optional(),
}).strict();

export const NotificationUncheckedUpdateInputSchema: z.ZodType<Prisma.NotificationUncheckedUpdateInput> = z.object({
  idUser: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => NotificationTypeSchema), z.lazy(() => EnumNotificationTypeFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  idDocumentLie: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lu: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  dateCreation: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  priorite: z.union([ z.lazy(() => NotificationPrioriteSchema), z.lazy(() => EnumNotificationPrioriteFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NotificationCreateManyInputSchema: z.ZodType<Prisma.NotificationCreateManyInput> = z.object({
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
}).strict();

export const NotificationUpdateManyMutationInputSchema: z.ZodType<Prisma.NotificationUpdateManyMutationInput> = z.object({
  type: z.union([ z.lazy(() => NotificationTypeSchema), z.lazy(() => EnumNotificationTypeFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lu: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  dateCreation: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  priorite: z.union([ z.lazy(() => NotificationPrioriteSchema), z.lazy(() => EnumNotificationPrioriteFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NotificationUncheckedUpdateManyInputSchema: z.ZodType<Prisma.NotificationUncheckedUpdateManyInput> = z.object({
  idUser: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => NotificationTypeSchema), z.lazy(() => EnumNotificationTypeFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  idDocumentLie: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lu: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  dateCreation: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  priorite: z.union([ z.lazy(() => NotificationPrioriteSchema), z.lazy(() => EnumNotificationPrioriteFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
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
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
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
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const UserPreferencesNullableCompositeFilterSchema: z.ZodType<Prisma.UserPreferencesNullableCompositeFilter> = z.object({
  equals: z.lazy(() => UserPreferencesObjectEqualityInputSchema).optional().nullable(),
  is: z.lazy(() => UserPreferencesWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => UserPreferencesWhereInputSchema).optional().nullable(),
  isSet: z.boolean().optional(),
}).strict();

export const UserPreferencesObjectEqualityInputSchema: z.ZodType<Prisma.UserPreferencesObjectEqualityInput> = z.object({
  notifications: z.boolean(),
  language: z.string(),
}).strict();

export const DocumentListRelationFilterSchema: z.ZodType<Prisma.DocumentListRelationFilter> = z.object({
  every: z.lazy(() => DocumentWhereInputSchema).optional(),
  some: z.lazy(() => DocumentWhereInputSchema).optional(),
  none: z.lazy(() => DocumentWhereInputSchema).optional(),
}).strict();

export const DossierListRelationFilterSchema: z.ZodType<Prisma.DossierListRelationFilter> = z.object({
  every: z.lazy(() => DossierWhereInputSchema).optional(),
  some: z.lazy(() => DossierWhereInputSchema).optional(),
  none: z.lazy(() => DossierWhereInputSchema).optional(),
}).strict();

export const DemarcheUtilisateurListRelationFilterSchema: z.ZodType<Prisma.DemarcheUtilisateurListRelationFilter> = z.object({
  every: z.lazy(() => DemarcheUtilisateurWhereInputSchema).optional(),
  some: z.lazy(() => DemarcheUtilisateurWhereInputSchema).optional(),
  none: z.lazy(() => DemarcheUtilisateurWhereInputSchema).optional(),
}).strict();

export const NotificationListRelationFilterSchema: z.ZodType<Prisma.NotificationListRelationFilter> = z.object({
  every: z.lazy(() => NotificationWhereInputSchema).optional(),
  some: z.lazy(() => NotificationWhereInputSchema).optional(),
  none: z.lazy(() => NotificationWhereInputSchema).optional(),
}).strict();

export const UserPreferencesOrderByInputSchema: z.ZodType<Prisma.UserPreferencesOrderByInput> = z.object({
  notifications: z.lazy(() => SortOrderSchema).optional(),
  language: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const DocumentOrderByRelationAggregateInputSchema: z.ZodType<Prisma.DocumentOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const DossierOrderByRelationAggregateInputSchema: z.ZodType<Prisma.DossierOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const DemarcheUtilisateurOrderByRelationAggregateInputSchema: z.ZodType<Prisma.DemarcheUtilisateurOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const NotificationOrderByRelationAggregateInputSchema: z.ZodType<Prisma.NotificationOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  nom: z.lazy(() => SortOrderSchema).optional(),
  urlAvatar: z.lazy(() => SortOrderSchema).optional(),
  googleId: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  dateInscription: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  nom: z.lazy(() => SortOrderSchema).optional(),
  urlAvatar: z.lazy(() => SortOrderSchema).optional(),
  googleId: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  dateInscription: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  nom: z.lazy(() => SortOrderSchema).optional(),
  urlAvatar: z.lazy(() => SortOrderSchema).optional(),
  googleId: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  dateInscription: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
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
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
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
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
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
}).strict();

export const EnumDocumentTypeFilterSchema: z.ZodType<Prisma.EnumDocumentTypeFilter> = z.object({
  equals: z.lazy(() => DocumentTypeSchema).optional(),
  in: z.lazy(() => DocumentTypeSchema).array().optional(),
  notIn: z.lazy(() => DocumentTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => DocumentTypeSchema), z.lazy(() => NestedEnumDocumentTypeFilterSchema) ]).optional(),
}).strict();

export const EnumDocumentStatutFilterSchema: z.ZodType<Prisma.EnumDocumentStatutFilter> = z.object({
  equals: z.lazy(() => DocumentStatutSchema).optional(),
  in: z.lazy(() => DocumentStatutSchema).array().optional(),
  notIn: z.lazy(() => DocumentStatutSchema).array().optional(),
  not: z.union([ z.lazy(() => DocumentStatutSchema), z.lazy(() => NestedEnumDocumentStatutFilterSchema) ]).optional(),
}).strict();

export const StringNullableListFilterSchema: z.ZodType<Prisma.StringNullableListFilter> = z.object({
  equals: z.string().array().optional().nullable(),
  has: z.string().optional().nullable(),
  hasEvery: z.string().array().optional(),
  hasSome: z.string().array().optional(),
  isEmpty: z.boolean().optional(),
}).strict();

export const DonneesExtraitesNullableCompositeFilterSchema: z.ZodType<Prisma.DonneesExtraitesNullableCompositeFilter> = z.object({
  equals: z.lazy(() => DonneesExtraitesObjectEqualityInputSchema).optional().nullable(),
  is: z.lazy(() => DonneesExtraitesWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => DonneesExtraitesWhereInputSchema).optional().nullable(),
  isSet: z.boolean().optional(),
}).strict();

export const DonneesExtraitesObjectEqualityInputSchema: z.ZodType<Prisma.DonneesExtraitesObjectEqualityInput> = z.object({
  dates: z.coerce.date().array().optional(),
  montants: z.number().array().optional(),
  noms: z.string().array().optional(),
  adresses: z.string().array().optional(),
  autres: InputJsonValueSchema.optional().nullable(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const DocumentFourniCompositeListFilterSchema: z.ZodType<Prisma.DocumentFourniCompositeListFilter> = z.object({
  equals: z.lazy(() => DocumentFourniObjectEqualityInputSchema).array().optional(),
  every: z.lazy(() => DocumentFourniWhereInputSchema).optional(),
  some: z.lazy(() => DocumentFourniWhereInputSchema).optional(),
  none: z.lazy(() => DocumentFourniWhereInputSchema).optional(),
  isEmpty: z.boolean().optional(),
  isSet: z.boolean().optional(),
}).strict();

export const DocumentFourniObjectEqualityInputSchema: z.ZodType<Prisma.DocumentFourniObjectEqualityInput> = z.object({
  typeDocument: z.string(),
  idDocument: z.string(),
  dateAjout: z.coerce.date(),
}).strict();

export const UserScalarRelationFilterSchema: z.ZodType<Prisma.UserScalarRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional(),
}).strict();

export const DonneesExtraitesOrderByInputSchema: z.ZodType<Prisma.DonneesExtraitesOrderByInput> = z.object({
  dates: z.lazy(() => SortOrderSchema).optional(),
  montants: z.lazy(() => SortOrderSchema).optional(),
  noms: z.lazy(() => SortOrderSchema).optional(),
  adresses: z.lazy(() => SortOrderSchema).optional(),
  autres: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const DocumentFourniOrderByCompositeAggregateInputSchema: z.ZodType<Prisma.DocumentFourniOrderByCompositeAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const DocumentCountOrderByAggregateInputSchema: z.ZodType<Prisma.DocumentCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  idProprietaire: z.lazy(() => SortOrderSchema).optional(),
  nomFichier: z.lazy(() => SortOrderSchema).optional(),
  urlStockage: z.lazy(() => SortOrderSchema).optional(),
  idGridFs: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  statut: z.lazy(() => SortOrderSchema).optional(),
  tags: z.lazy(() => SortOrderSchema).optional(),
  dateUpload: z.lazy(() => SortOrderSchema).optional(),
  size: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  dossierIds: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const DocumentAvgOrderByAggregateInputSchema: z.ZodType<Prisma.DocumentAvgOrderByAggregateInput> = z.object({
  size: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const DocumentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.DocumentMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  idProprietaire: z.lazy(() => SortOrderSchema).optional(),
  nomFichier: z.lazy(() => SortOrderSchema).optional(),
  urlStockage: z.lazy(() => SortOrderSchema).optional(),
  idGridFs: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  statut: z.lazy(() => SortOrderSchema).optional(),
  dateUpload: z.lazy(() => SortOrderSchema).optional(),
  size: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const DocumentMinOrderByAggregateInputSchema: z.ZodType<Prisma.DocumentMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  idProprietaire: z.lazy(() => SortOrderSchema).optional(),
  nomFichier: z.lazy(() => SortOrderSchema).optional(),
  urlStockage: z.lazy(() => SortOrderSchema).optional(),
  idGridFs: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  statut: z.lazy(() => SortOrderSchema).optional(),
  dateUpload: z.lazy(() => SortOrderSchema).optional(),
  size: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const DocumentSumOrderByAggregateInputSchema: z.ZodType<Prisma.DocumentSumOrderByAggregateInput> = z.object({
  size: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const EnumDocumentTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumDocumentTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => DocumentTypeSchema).optional(),
  in: z.lazy(() => DocumentTypeSchema).array().optional(),
  notIn: z.lazy(() => DocumentTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => DocumentTypeSchema), z.lazy(() => NestedEnumDocumentTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumDocumentTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumDocumentTypeFilterSchema).optional(),
}).strict();

export const EnumDocumentStatutWithAggregatesFilterSchema: z.ZodType<Prisma.EnumDocumentStatutWithAggregatesFilter> = z.object({
  equals: z.lazy(() => DocumentStatutSchema).optional(),
  in: z.lazy(() => DocumentStatutSchema).array().optional(),
  notIn: z.lazy(() => DocumentStatutSchema).array().optional(),
  not: z.union([ z.lazy(() => DocumentStatutSchema), z.lazy(() => NestedEnumDocumentStatutWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumDocumentStatutFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumDocumentStatutFilterSchema).optional(),
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
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
}).strict();

export const DossierCountOrderByAggregateInputSchema: z.ZodType<Prisma.DossierCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  idProprietaire: z.lazy(() => SortOrderSchema).optional(),
  nom: z.lazy(() => SortOrderSchema).optional(),
  idsDocuments: z.lazy(() => SortOrderSchema).optional(),
  couleur: z.lazy(() => SortOrderSchema).optional(),
  icone: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const DossierMaxOrderByAggregateInputSchema: z.ZodType<Prisma.DossierMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  idProprietaire: z.lazy(() => SortOrderSchema).optional(),
  nom: z.lazy(() => SortOrderSchema).optional(),
  couleur: z.lazy(() => SortOrderSchema).optional(),
  icone: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const DossierMinOrderByAggregateInputSchema: z.ZodType<Prisma.DossierMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  idProprietaire: z.lazy(() => SortOrderSchema).optional(),
  nom: z.lazy(() => SortOrderSchema).optional(),
  couleur: z.lazy(() => SortOrderSchema).optional(),
  icone: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const EnumDemarcheCategorieFilterSchema: z.ZodType<Prisma.EnumDemarcheCategorieFilter> = z.object({
  equals: z.lazy(() => DemarcheCategorieSchema).optional(),
  in: z.lazy(() => DemarcheCategorieSchema).array().optional(),
  notIn: z.lazy(() => DemarcheCategorieSchema).array().optional(),
  not: z.union([ z.lazy(() => DemarcheCategorieSchema), z.lazy(() => NestedEnumDemarcheCategorieFilterSchema) ]).optional(),
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const ModeleDemarcheCountOrderByAggregateInputSchema: z.ZodType<Prisma.ModeleDemarcheCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  titre: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  typesDocumentsRequis: z.lazy(() => SortOrderSchema).optional(),
  categorie: z.lazy(() => SortOrderSchema).optional(),
  actif: z.lazy(() => SortOrderSchema).optional(),
  ordre: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const ModeleDemarcheAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ModeleDemarcheAvgOrderByAggregateInput> = z.object({
  ordre: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const ModeleDemarcheMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ModeleDemarcheMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  titre: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  categorie: z.lazy(() => SortOrderSchema).optional(),
  actif: z.lazy(() => SortOrderSchema).optional(),
  ordre: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const ModeleDemarcheMinOrderByAggregateInputSchema: z.ZodType<Prisma.ModeleDemarcheMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  titre: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  categorie: z.lazy(() => SortOrderSchema).optional(),
  actif: z.lazy(() => SortOrderSchema).optional(),
  ordre: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const ModeleDemarcheSumOrderByAggregateInputSchema: z.ZodType<Prisma.ModeleDemarcheSumOrderByAggregateInput> = z.object({
  ordre: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const EnumDemarcheCategorieWithAggregatesFilterSchema: z.ZodType<Prisma.EnumDemarcheCategorieWithAggregatesFilter> = z.object({
  equals: z.lazy(() => DemarcheCategorieSchema).optional(),
  in: z.lazy(() => DemarcheCategorieSchema).array().optional(),
  notIn: z.lazy(() => DemarcheCategorieSchema).array().optional(),
  not: z.union([ z.lazy(() => DemarcheCategorieSchema), z.lazy(() => NestedEnumDemarcheCategorieWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumDemarcheCategorieFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumDemarcheCategorieFilterSchema).optional(),
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional(),
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional(),
}).strict();

export const EnumDemarcheStatutFilterSchema: z.ZodType<Prisma.EnumDemarcheStatutFilter> = z.object({
  equals: z.lazy(() => DemarcheStatutSchema).optional(),
  in: z.lazy(() => DemarcheStatutSchema).array().optional(),
  notIn: z.lazy(() => DemarcheStatutSchema).array().optional(),
  not: z.union([ z.lazy(() => DemarcheStatutSchema), z.lazy(() => NestedEnumDemarcheStatutFilterSchema) ]).optional(),
}).strict();

export const ModeleDemarcheScalarRelationFilterSchema: z.ZodType<Prisma.ModeleDemarcheScalarRelationFilter> = z.object({
  is: z.lazy(() => ModeleDemarcheWhereInputSchema).optional(),
  isNot: z.lazy(() => ModeleDemarcheWhereInputSchema).optional(),
}).strict();

export const DemarcheUtilisateurCountOrderByAggregateInputSchema: z.ZodType<Prisma.DemarcheUtilisateurCountOrderByAggregateInput> = z.object({
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
}).strict();

export const DemarcheUtilisateurMaxOrderByAggregateInputSchema: z.ZodType<Prisma.DemarcheUtilisateurMaxOrderByAggregateInput> = z.object({
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
}).strict();

export const DemarcheUtilisateurMinOrderByAggregateInputSchema: z.ZodType<Prisma.DemarcheUtilisateurMinOrderByAggregateInput> = z.object({
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
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
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
}).strict();

export const EnumDemarcheStatutWithAggregatesFilterSchema: z.ZodType<Prisma.EnumDemarcheStatutWithAggregatesFilter> = z.object({
  equals: z.lazy(() => DemarcheStatutSchema).optional(),
  in: z.lazy(() => DemarcheStatutSchema).array().optional(),
  notIn: z.lazy(() => DemarcheStatutSchema).array().optional(),
  not: z.union([ z.lazy(() => DemarcheStatutSchema), z.lazy(() => NestedEnumDemarcheStatutWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumDemarcheStatutFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumDemarcheStatutFilterSchema).optional(),
}).strict();

export const EnumNotificationTypeFilterSchema: z.ZodType<Prisma.EnumNotificationTypeFilter> = z.object({
  equals: z.lazy(() => NotificationTypeSchema).optional(),
  in: z.lazy(() => NotificationTypeSchema).array().optional(),
  notIn: z.lazy(() => NotificationTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => NotificationTypeSchema), z.lazy(() => NestedEnumNotificationTypeFilterSchema) ]).optional(),
}).strict();

export const EnumNotificationPrioriteFilterSchema: z.ZodType<Prisma.EnumNotificationPrioriteFilter> = z.object({
  equals: z.lazy(() => NotificationPrioriteSchema).optional(),
  in: z.lazy(() => NotificationPrioriteSchema).array().optional(),
  notIn: z.lazy(() => NotificationPrioriteSchema).array().optional(),
  not: z.union([ z.lazy(() => NotificationPrioriteSchema), z.lazy(() => NestedEnumNotificationPrioriteFilterSchema) ]).optional(),
}).strict();

export const DocumentNullableScalarRelationFilterSchema: z.ZodType<Prisma.DocumentNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => DocumentWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => DocumentWhereInputSchema).optional().nullable(),
}).strict();

export const NotificationCountOrderByAggregateInputSchema: z.ZodType<Prisma.NotificationCountOrderByAggregateInput> = z.object({
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
}).strict();

export const NotificationMaxOrderByAggregateInputSchema: z.ZodType<Prisma.NotificationMaxOrderByAggregateInput> = z.object({
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
}).strict();

export const NotificationMinOrderByAggregateInputSchema: z.ZodType<Prisma.NotificationMinOrderByAggregateInput> = z.object({
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
}).strict();

export const EnumNotificationTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumNotificationTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => NotificationTypeSchema).optional(),
  in: z.lazy(() => NotificationTypeSchema).array().optional(),
  notIn: z.lazy(() => NotificationTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => NotificationTypeSchema), z.lazy(() => NestedEnumNotificationTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumNotificationTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumNotificationTypeFilterSchema).optional(),
}).strict();

export const EnumNotificationPrioriteWithAggregatesFilterSchema: z.ZodType<Prisma.EnumNotificationPrioriteWithAggregatesFilter> = z.object({
  equals: z.lazy(() => NotificationPrioriteSchema).optional(),
  in: z.lazy(() => NotificationPrioriteSchema).array().optional(),
  notIn: z.lazy(() => NotificationPrioriteSchema).array().optional(),
  not: z.union([ z.lazy(() => NotificationPrioriteSchema), z.lazy(() => NestedEnumNotificationPrioriteWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumNotificationPrioriteFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumNotificationPrioriteFilterSchema).optional(),
}).strict();

export const UserPreferencesNullableCreateEnvelopeInputSchema: z.ZodType<Prisma.UserPreferencesNullableCreateEnvelopeInput> = z.object({
  set: z.lazy(() => UserPreferencesCreateInputSchema).optional().nullable(),
}).strict();

export const UserPreferencesCreateInputSchema: z.ZodType<Prisma.UserPreferencesCreateInput> = z.object({
  notifications: z.boolean().optional(),
  language: z.string().optional(),
}).strict();

export const DocumentCreateNestedManyWithoutProprietaireInputSchema: z.ZodType<Prisma.DocumentCreateNestedManyWithoutProprietaireInput> = z.object({
  create: z.union([ z.lazy(() => DocumentCreateWithoutProprietaireInputSchema), z.lazy(() => DocumentCreateWithoutProprietaireInputSchema).array(), z.lazy(() => DocumentUncheckedCreateWithoutProprietaireInputSchema), z.lazy(() => DocumentUncheckedCreateWithoutProprietaireInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DocumentCreateOrConnectWithoutProprietaireInputSchema), z.lazy(() => DocumentCreateOrConnectWithoutProprietaireInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DocumentCreateManyProprietaireInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema), z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DossierCreateNestedManyWithoutProprietaireInputSchema: z.ZodType<Prisma.DossierCreateNestedManyWithoutProprietaireInput> = z.object({
  create: z.union([ z.lazy(() => DossierCreateWithoutProprietaireInputSchema), z.lazy(() => DossierCreateWithoutProprietaireInputSchema).array(), z.lazy(() => DossierUncheckedCreateWithoutProprietaireInputSchema), z.lazy(() => DossierUncheckedCreateWithoutProprietaireInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DossierCreateOrConnectWithoutProprietaireInputSchema), z.lazy(() => DossierCreateOrConnectWithoutProprietaireInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DossierCreateManyProprietaireInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DossierWhereUniqueInputSchema), z.lazy(() => DossierWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DemarcheUtilisateurCreateNestedManyWithoutUtilisateurInputSchema: z.ZodType<Prisma.DemarcheUtilisateurCreateNestedManyWithoutUtilisateurInput> = z.object({
  create: z.union([ z.lazy(() => DemarcheUtilisateurCreateWithoutUtilisateurInputSchema), z.lazy(() => DemarcheUtilisateurCreateWithoutUtilisateurInputSchema).array(), z.lazy(() => DemarcheUtilisateurUncheckedCreateWithoutUtilisateurInputSchema), z.lazy(() => DemarcheUtilisateurUncheckedCreateWithoutUtilisateurInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DemarcheUtilisateurCreateOrConnectWithoutUtilisateurInputSchema), z.lazy(() => DemarcheUtilisateurCreateOrConnectWithoutUtilisateurInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DemarcheUtilisateurCreateManyUtilisateurInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DemarcheUtilisateurWhereUniqueInputSchema), z.lazy(() => DemarcheUtilisateurWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NotificationCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.NotificationCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => NotificationCreateWithoutUserInputSchema), z.lazy(() => NotificationCreateWithoutUserInputSchema).array(), z.lazy(() => NotificationUncheckedCreateWithoutUserInputSchema), z.lazy(() => NotificationUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NotificationCreateOrConnectWithoutUserInputSchema), z.lazy(() => NotificationCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NotificationCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema), z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DocumentUncheckedCreateNestedManyWithoutProprietaireInputSchema: z.ZodType<Prisma.DocumentUncheckedCreateNestedManyWithoutProprietaireInput> = z.object({
  create: z.union([ z.lazy(() => DocumentCreateWithoutProprietaireInputSchema), z.lazy(() => DocumentCreateWithoutProprietaireInputSchema).array(), z.lazy(() => DocumentUncheckedCreateWithoutProprietaireInputSchema), z.lazy(() => DocumentUncheckedCreateWithoutProprietaireInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DocumentCreateOrConnectWithoutProprietaireInputSchema), z.lazy(() => DocumentCreateOrConnectWithoutProprietaireInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DocumentCreateManyProprietaireInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema), z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DossierUncheckedCreateNestedManyWithoutProprietaireInputSchema: z.ZodType<Prisma.DossierUncheckedCreateNestedManyWithoutProprietaireInput> = z.object({
  create: z.union([ z.lazy(() => DossierCreateWithoutProprietaireInputSchema), z.lazy(() => DossierCreateWithoutProprietaireInputSchema).array(), z.lazy(() => DossierUncheckedCreateWithoutProprietaireInputSchema), z.lazy(() => DossierUncheckedCreateWithoutProprietaireInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DossierCreateOrConnectWithoutProprietaireInputSchema), z.lazy(() => DossierCreateOrConnectWithoutProprietaireInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DossierCreateManyProprietaireInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DossierWhereUniqueInputSchema), z.lazy(() => DossierWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DemarcheUtilisateurUncheckedCreateNestedManyWithoutUtilisateurInputSchema: z.ZodType<Prisma.DemarcheUtilisateurUncheckedCreateNestedManyWithoutUtilisateurInput> = z.object({
  create: z.union([ z.lazy(() => DemarcheUtilisateurCreateWithoutUtilisateurInputSchema), z.lazy(() => DemarcheUtilisateurCreateWithoutUtilisateurInputSchema).array(), z.lazy(() => DemarcheUtilisateurUncheckedCreateWithoutUtilisateurInputSchema), z.lazy(() => DemarcheUtilisateurUncheckedCreateWithoutUtilisateurInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DemarcheUtilisateurCreateOrConnectWithoutUtilisateurInputSchema), z.lazy(() => DemarcheUtilisateurCreateOrConnectWithoutUtilisateurInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DemarcheUtilisateurCreateManyUtilisateurInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DemarcheUtilisateurWhereUniqueInputSchema), z.lazy(() => DemarcheUtilisateurWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NotificationUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.NotificationUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => NotificationCreateWithoutUserInputSchema), z.lazy(() => NotificationCreateWithoutUserInputSchema).array(), z.lazy(() => NotificationUncheckedCreateWithoutUserInputSchema), z.lazy(() => NotificationUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NotificationCreateOrConnectWithoutUserInputSchema), z.lazy(() => NotificationCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NotificationCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema), z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional(),
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable(),
  unset: z.boolean().optional(),
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional(),
}).strict();

export const UserPreferencesNullableUpdateEnvelopeInputSchema: z.ZodType<Prisma.UserPreferencesNullableUpdateEnvelopeInput> = z.object({
  set: z.lazy(() => UserPreferencesCreateInputSchema).optional().nullable(),
  upsert: z.lazy(() => UserPreferencesUpsertInputSchema).optional(),
  unset: z.boolean().optional(),
}).strict();

export const DocumentUpdateManyWithoutProprietaireNestedInputSchema: z.ZodType<Prisma.DocumentUpdateManyWithoutProprietaireNestedInput> = z.object({
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
}).strict();

export const DossierUpdateManyWithoutProprietaireNestedInputSchema: z.ZodType<Prisma.DossierUpdateManyWithoutProprietaireNestedInput> = z.object({
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
}).strict();

export const DemarcheUtilisateurUpdateManyWithoutUtilisateurNestedInputSchema: z.ZodType<Prisma.DemarcheUtilisateurUpdateManyWithoutUtilisateurNestedInput> = z.object({
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
}).strict();

export const NotificationUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.NotificationUpdateManyWithoutUserNestedInput> = z.object({
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
}).strict();

export const DocumentUncheckedUpdateManyWithoutProprietaireNestedInputSchema: z.ZodType<Prisma.DocumentUncheckedUpdateManyWithoutProprietaireNestedInput> = z.object({
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
}).strict();

export const DossierUncheckedUpdateManyWithoutProprietaireNestedInputSchema: z.ZodType<Prisma.DossierUncheckedUpdateManyWithoutProprietaireNestedInput> = z.object({
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
}).strict();

export const DemarcheUtilisateurUncheckedUpdateManyWithoutUtilisateurNestedInputSchema: z.ZodType<Prisma.DemarcheUtilisateurUncheckedUpdateManyWithoutUtilisateurNestedInput> = z.object({
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
}).strict();

export const NotificationUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.NotificationUncheckedUpdateManyWithoutUserNestedInput> = z.object({
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
}).strict();

export const DocumentCreatetagsInputSchema: z.ZodType<Prisma.DocumentCreatetagsInput> = z.object({
  set: z.string().array(),
}).strict();

export const DonneesExtraitesNullableCreateEnvelopeInputSchema: z.ZodType<Prisma.DonneesExtraitesNullableCreateEnvelopeInput> = z.object({
  set: z.lazy(() => DonneesExtraitesCreateInputSchema).optional().nullable(),
}).strict();

export const DonneesExtraitesCreateInputSchema: z.ZodType<Prisma.DonneesExtraitesCreateInput> = z.object({
  dates: z.union([ z.lazy(() => DonneesExtraitesCreatedatesInputSchema), z.coerce.date().array() ]).optional(),
  montants: z.union([ z.lazy(() => DonneesExtraitesCreatemontantsInputSchema), z.number().array() ]).optional(),
  noms: z.union([ z.lazy(() => DonneesExtraitesCreatenomsInputSchema), z.string().array() ]).optional(),
  adresses: z.union([ z.lazy(() => DonneesExtraitesCreateadressesInputSchema), z.string().array() ]).optional(),
  autres: InputJsonValueSchema.optional().nullable(),
}).strict();

export const DocumentFourniListCreateEnvelopeInputSchema: z.ZodType<Prisma.DocumentFourniListCreateEnvelopeInput> = z.object({
  set: z.union([ z.lazy(() => DocumentFourniCreateInputSchema), z.lazy(() => DocumentFourniCreateInputSchema).array() ]).optional(),
}).strict();

export const DocumentFourniCreateInputSchema: z.ZodType<Prisma.DocumentFourniCreateInput> = z.object({
  typeDocument: z.string(),
  idDocument: z.string(),
  dateAjout: z.coerce.date().optional(),
}).strict();

export const UserCreateNestedOneWithoutDocumentsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutDocumentsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutDocumentsInputSchema), z.lazy(() => UserUncheckedCreateWithoutDocumentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutDocumentsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
}).strict();

export const DossierCreateNestedManyWithoutDocumentsInputSchema: z.ZodType<Prisma.DossierCreateNestedManyWithoutDocumentsInput> = z.object({
  create: z.union([ z.lazy(() => DossierCreateWithoutDocumentsInputSchema), z.lazy(() => DossierCreateWithoutDocumentsInputSchema).array(), z.lazy(() => DossierUncheckedCreateWithoutDocumentsInputSchema), z.lazy(() => DossierUncheckedCreateWithoutDocumentsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DossierCreateOrConnectWithoutDocumentsInputSchema), z.lazy(() => DossierCreateOrConnectWithoutDocumentsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DossierWhereUniqueInputSchema), z.lazy(() => DossierWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NotificationCreateNestedManyWithoutDocumentLieInputSchema: z.ZodType<Prisma.NotificationCreateNestedManyWithoutDocumentLieInput> = z.object({
  create: z.union([ z.lazy(() => NotificationCreateWithoutDocumentLieInputSchema), z.lazy(() => NotificationCreateWithoutDocumentLieInputSchema).array(), z.lazy(() => NotificationUncheckedCreateWithoutDocumentLieInputSchema), z.lazy(() => NotificationUncheckedCreateWithoutDocumentLieInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NotificationCreateOrConnectWithoutDocumentLieInputSchema), z.lazy(() => NotificationCreateOrConnectWithoutDocumentLieInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NotificationCreateManyDocumentLieInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema), z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DocumentCreatedossierIdsInputSchema: z.ZodType<Prisma.DocumentCreatedossierIdsInput> = z.object({
  set: z.string().array(),
}).strict();

export const DossierUncheckedCreateNestedManyWithoutDocumentsInputSchema: z.ZodType<Prisma.DossierUncheckedCreateNestedManyWithoutDocumentsInput> = z.object({
  create: z.union([ z.lazy(() => DossierCreateWithoutDocumentsInputSchema), z.lazy(() => DossierCreateWithoutDocumentsInputSchema).array(), z.lazy(() => DossierUncheckedCreateWithoutDocumentsInputSchema), z.lazy(() => DossierUncheckedCreateWithoutDocumentsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DossierCreateOrConnectWithoutDocumentsInputSchema), z.lazy(() => DossierCreateOrConnectWithoutDocumentsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DossierWhereUniqueInputSchema), z.lazy(() => DossierWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NotificationUncheckedCreateNestedManyWithoutDocumentLieInputSchema: z.ZodType<Prisma.NotificationUncheckedCreateNestedManyWithoutDocumentLieInput> = z.object({
  create: z.union([ z.lazy(() => NotificationCreateWithoutDocumentLieInputSchema), z.lazy(() => NotificationCreateWithoutDocumentLieInputSchema).array(), z.lazy(() => NotificationUncheckedCreateWithoutDocumentLieInputSchema), z.lazy(() => NotificationUncheckedCreateWithoutDocumentLieInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NotificationCreateOrConnectWithoutDocumentLieInputSchema), z.lazy(() => NotificationCreateOrConnectWithoutDocumentLieInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NotificationCreateManyDocumentLieInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema), z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EnumDocumentTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumDocumentTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => DocumentTypeSchema).optional(),
}).strict();

export const EnumDocumentStatutFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumDocumentStatutFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => DocumentStatutSchema).optional(),
}).strict();

export const DocumentUpdatetagsInputSchema: z.ZodType<Prisma.DocumentUpdatetagsInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const DonneesExtraitesNullableUpdateEnvelopeInputSchema: z.ZodType<Prisma.DonneesExtraitesNullableUpdateEnvelopeInput> = z.object({
  set: z.lazy(() => DonneesExtraitesCreateInputSchema).optional().nullable(),
  upsert: z.lazy(() => DonneesExtraitesUpsertInputSchema).optional(),
  unset: z.boolean().optional(),
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional(),
}).strict();

export const DocumentFourniListUpdateEnvelopeInputSchema: z.ZodType<Prisma.DocumentFourniListUpdateEnvelopeInput> = z.object({
  set: z.union([ z.lazy(() => DocumentFourniCreateInputSchema), z.lazy(() => DocumentFourniCreateInputSchema).array() ]).optional(),
  push: z.union([ z.lazy(() => DocumentFourniCreateInputSchema), z.lazy(() => DocumentFourniCreateInputSchema).array() ]).optional(),
  updateMany: z.lazy(() => DocumentFourniUpdateManyInputSchema).optional(),
  deleteMany: z.lazy(() => DocumentFourniDeleteManyInputSchema).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutDocumentsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutDocumentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutDocumentsInputSchema), z.lazy(() => UserUncheckedCreateWithoutDocumentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutDocumentsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutDocumentsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutDocumentsInputSchema), z.lazy(() => UserUpdateWithoutDocumentsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutDocumentsInputSchema) ]).optional(),
}).strict();

export const DossierUpdateManyWithoutDocumentsNestedInputSchema: z.ZodType<Prisma.DossierUpdateManyWithoutDocumentsNestedInput> = z.object({
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
}).strict();

export const NotificationUpdateManyWithoutDocumentLieNestedInputSchema: z.ZodType<Prisma.NotificationUpdateManyWithoutDocumentLieNestedInput> = z.object({
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
}).strict();

export const DocumentUpdatedossierIdsInputSchema: z.ZodType<Prisma.DocumentUpdatedossierIdsInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const DossierUncheckedUpdateManyWithoutDocumentsNestedInputSchema: z.ZodType<Prisma.DossierUncheckedUpdateManyWithoutDocumentsNestedInput> = z.object({
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
}).strict();

export const NotificationUncheckedUpdateManyWithoutDocumentLieNestedInputSchema: z.ZodType<Prisma.NotificationUncheckedUpdateManyWithoutDocumentLieNestedInput> = z.object({
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
}).strict();

export const UserCreateNestedOneWithoutDossiersInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutDossiersInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutDossiersInputSchema), z.lazy(() => UserUncheckedCreateWithoutDossiersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutDossiersInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
}).strict();

export const DocumentCreateNestedManyWithoutDossiersInputSchema: z.ZodType<Prisma.DocumentCreateNestedManyWithoutDossiersInput> = z.object({
  create: z.union([ z.lazy(() => DocumentCreateWithoutDossiersInputSchema), z.lazy(() => DocumentCreateWithoutDossiersInputSchema).array(), z.lazy(() => DocumentUncheckedCreateWithoutDossiersInputSchema), z.lazy(() => DocumentUncheckedCreateWithoutDossiersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DocumentCreateOrConnectWithoutDossiersInputSchema), z.lazy(() => DocumentCreateOrConnectWithoutDossiersInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema), z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DossierCreateidsDocumentsInputSchema: z.ZodType<Prisma.DossierCreateidsDocumentsInput> = z.object({
  set: z.string().array(),
}).strict();

export const DocumentUncheckedCreateNestedManyWithoutDossiersInputSchema: z.ZodType<Prisma.DocumentUncheckedCreateNestedManyWithoutDossiersInput> = z.object({
  create: z.union([ z.lazy(() => DocumentCreateWithoutDossiersInputSchema), z.lazy(() => DocumentCreateWithoutDossiersInputSchema).array(), z.lazy(() => DocumentUncheckedCreateWithoutDossiersInputSchema), z.lazy(() => DocumentUncheckedCreateWithoutDossiersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DocumentCreateOrConnectWithoutDossiersInputSchema), z.lazy(() => DocumentCreateOrConnectWithoutDossiersInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema), z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutDossiersNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutDossiersNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutDossiersInputSchema), z.lazy(() => UserUncheckedCreateWithoutDossiersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutDossiersInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutDossiersInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutDossiersInputSchema), z.lazy(() => UserUpdateWithoutDossiersInputSchema), z.lazy(() => UserUncheckedUpdateWithoutDossiersInputSchema) ]).optional(),
}).strict();

export const DocumentUpdateManyWithoutDossiersNestedInputSchema: z.ZodType<Prisma.DocumentUpdateManyWithoutDossiersNestedInput> = z.object({
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
}).strict();

export const DossierUpdateidsDocumentsInputSchema: z.ZodType<Prisma.DossierUpdateidsDocumentsInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const DocumentUncheckedUpdateManyWithoutDossiersNestedInputSchema: z.ZodType<Prisma.DocumentUncheckedUpdateManyWithoutDossiersNestedInput> = z.object({
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
}).strict();

export const ModeleDemarcheCreatetypesDocumentsRequisInputSchema: z.ZodType<Prisma.ModeleDemarcheCreatetypesDocumentsRequisInput> = z.object({
  set: z.string().array(),
}).strict();

export const DemarcheUtilisateurCreateNestedManyWithoutModeleInputSchema: z.ZodType<Prisma.DemarcheUtilisateurCreateNestedManyWithoutModeleInput> = z.object({
  create: z.union([ z.lazy(() => DemarcheUtilisateurCreateWithoutModeleInputSchema), z.lazy(() => DemarcheUtilisateurCreateWithoutModeleInputSchema).array(), z.lazy(() => DemarcheUtilisateurUncheckedCreateWithoutModeleInputSchema), z.lazy(() => DemarcheUtilisateurUncheckedCreateWithoutModeleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DemarcheUtilisateurCreateOrConnectWithoutModeleInputSchema), z.lazy(() => DemarcheUtilisateurCreateOrConnectWithoutModeleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DemarcheUtilisateurCreateManyModeleInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DemarcheUtilisateurWhereUniqueInputSchema), z.lazy(() => DemarcheUtilisateurWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DemarcheUtilisateurUncheckedCreateNestedManyWithoutModeleInputSchema: z.ZodType<Prisma.DemarcheUtilisateurUncheckedCreateNestedManyWithoutModeleInput> = z.object({
  create: z.union([ z.lazy(() => DemarcheUtilisateurCreateWithoutModeleInputSchema), z.lazy(() => DemarcheUtilisateurCreateWithoutModeleInputSchema).array(), z.lazy(() => DemarcheUtilisateurUncheckedCreateWithoutModeleInputSchema), z.lazy(() => DemarcheUtilisateurUncheckedCreateWithoutModeleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DemarcheUtilisateurCreateOrConnectWithoutModeleInputSchema), z.lazy(() => DemarcheUtilisateurCreateOrConnectWithoutModeleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DemarcheUtilisateurCreateManyModeleInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DemarcheUtilisateurWhereUniqueInputSchema), z.lazy(() => DemarcheUtilisateurWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ModeleDemarcheUpdatetypesDocumentsRequisInputSchema: z.ZodType<Prisma.ModeleDemarcheUpdatetypesDocumentsRequisInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const EnumDemarcheCategorieFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumDemarcheCategorieFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => DemarcheCategorieSchema).optional(),
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional(),
}).strict();

export const DemarcheUtilisateurUpdateManyWithoutModeleNestedInputSchema: z.ZodType<Prisma.DemarcheUtilisateurUpdateManyWithoutModeleNestedInput> = z.object({
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
}).strict();

export const DemarcheUtilisateurUncheckedUpdateManyWithoutModeleNestedInputSchema: z.ZodType<Prisma.DemarcheUtilisateurUncheckedUpdateManyWithoutModeleNestedInput> = z.object({
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
}).strict();

export const UserCreateNestedOneWithoutDemarchesUtilisateurInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutDemarchesUtilisateurInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutDemarchesUtilisateurInputSchema), z.lazy(() => UserUncheckedCreateWithoutDemarchesUtilisateurInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutDemarchesUtilisateurInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
}).strict();

export const ModeleDemarcheCreateNestedOneWithoutDemarchesUtilisateurInputSchema: z.ZodType<Prisma.ModeleDemarcheCreateNestedOneWithoutDemarchesUtilisateurInput> = z.object({
  create: z.union([ z.lazy(() => ModeleDemarcheCreateWithoutDemarchesUtilisateurInputSchema), z.lazy(() => ModeleDemarcheUncheckedCreateWithoutDemarchesUtilisateurInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ModeleDemarcheCreateOrConnectWithoutDemarchesUtilisateurInputSchema).optional(),
  connect: z.lazy(() => ModeleDemarcheWhereUniqueInputSchema).optional(),
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable(),
  unset: z.boolean().optional(),
}).strict();

export const EnumDemarcheStatutFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumDemarcheStatutFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => DemarcheStatutSchema).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutDemarchesUtilisateurNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutDemarchesUtilisateurNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutDemarchesUtilisateurInputSchema), z.lazy(() => UserUncheckedCreateWithoutDemarchesUtilisateurInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutDemarchesUtilisateurInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutDemarchesUtilisateurInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutDemarchesUtilisateurInputSchema), z.lazy(() => UserUpdateWithoutDemarchesUtilisateurInputSchema), z.lazy(() => UserUncheckedUpdateWithoutDemarchesUtilisateurInputSchema) ]).optional(),
}).strict();

export const ModeleDemarcheUpdateOneRequiredWithoutDemarchesUtilisateurNestedInputSchema: z.ZodType<Prisma.ModeleDemarcheUpdateOneRequiredWithoutDemarchesUtilisateurNestedInput> = z.object({
  create: z.union([ z.lazy(() => ModeleDemarcheCreateWithoutDemarchesUtilisateurInputSchema), z.lazy(() => ModeleDemarcheUncheckedCreateWithoutDemarchesUtilisateurInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ModeleDemarcheCreateOrConnectWithoutDemarchesUtilisateurInputSchema).optional(),
  upsert: z.lazy(() => ModeleDemarcheUpsertWithoutDemarchesUtilisateurInputSchema).optional(),
  connect: z.lazy(() => ModeleDemarcheWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ModeleDemarcheUpdateToOneWithWhereWithoutDemarchesUtilisateurInputSchema), z.lazy(() => ModeleDemarcheUpdateWithoutDemarchesUtilisateurInputSchema), z.lazy(() => ModeleDemarcheUncheckedUpdateWithoutDemarchesUtilisateurInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutNotificationsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutNotificationsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutNotificationsInputSchema), z.lazy(() => UserUncheckedCreateWithoutNotificationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutNotificationsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
}).strict();

export const DocumentCreateNestedOneWithoutNotificationsInputSchema: z.ZodType<Prisma.DocumentCreateNestedOneWithoutNotificationsInput> = z.object({
  create: z.union([ z.lazy(() => DocumentCreateWithoutNotificationsInputSchema), z.lazy(() => DocumentUncheckedCreateWithoutNotificationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DocumentCreateOrConnectWithoutNotificationsInputSchema).optional(),
  connect: z.lazy(() => DocumentWhereUniqueInputSchema).optional(),
}).strict();

export const EnumNotificationTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumNotificationTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => NotificationTypeSchema).optional(),
}).strict();

export const EnumNotificationPrioriteFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumNotificationPrioriteFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => NotificationPrioriteSchema).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutNotificationsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutNotificationsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutNotificationsInputSchema), z.lazy(() => UserUncheckedCreateWithoutNotificationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutNotificationsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutNotificationsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutNotificationsInputSchema), z.lazy(() => UserUpdateWithoutNotificationsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutNotificationsInputSchema) ]).optional(),
}).strict();

export const DocumentUpdateOneWithoutNotificationsNestedInputSchema: z.ZodType<Prisma.DocumentUpdateOneWithoutNotificationsNestedInput> = z.object({
  create: z.union([ z.lazy(() => DocumentCreateWithoutNotificationsInputSchema), z.lazy(() => DocumentUncheckedCreateWithoutNotificationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DocumentCreateOrConnectWithoutNotificationsInputSchema).optional(),
  upsert: z.lazy(() => DocumentUpsertWithoutNotificationsInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.union([ z.boolean(),z.lazy(() => DocumentWhereInputSchema) ]).optional(),
  connect: z.lazy(() => DocumentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => DocumentUpdateToOneWithWhereWithoutNotificationsInputSchema), z.lazy(() => DocumentUpdateWithoutNotificationsInputSchema), z.lazy(() => DocumentUncheckedUpdateWithoutNotificationsInputSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
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
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
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
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const UserPreferencesWhereInputSchema: z.ZodType<Prisma.UserPreferencesWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserPreferencesWhereInputSchema), z.lazy(() => UserPreferencesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserPreferencesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserPreferencesWhereInputSchema), z.lazy(() => UserPreferencesWhereInputSchema).array() ]).optional(),
  notifications: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  language: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
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
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
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
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
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
}).strict();

export const NestedEnumDocumentTypeFilterSchema: z.ZodType<Prisma.NestedEnumDocumentTypeFilter> = z.object({
  equals: z.lazy(() => DocumentTypeSchema).optional(),
  in: z.lazy(() => DocumentTypeSchema).array().optional(),
  notIn: z.lazy(() => DocumentTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => DocumentTypeSchema), z.lazy(() => NestedEnumDocumentTypeFilterSchema) ]).optional(),
}).strict();

export const NestedEnumDocumentStatutFilterSchema: z.ZodType<Prisma.NestedEnumDocumentStatutFilter> = z.object({
  equals: z.lazy(() => DocumentStatutSchema).optional(),
  in: z.lazy(() => DocumentStatutSchema).array().optional(),
  notIn: z.lazy(() => DocumentStatutSchema).array().optional(),
  not: z.union([ z.lazy(() => DocumentStatutSchema), z.lazy(() => NestedEnumDocumentStatutFilterSchema) ]).optional(),
}).strict();

export const DonneesExtraitesWhereInputSchema: z.ZodType<Prisma.DonneesExtraitesWhereInput> = z.object({
  AND: z.union([ z.lazy(() => DonneesExtraitesWhereInputSchema), z.lazy(() => DonneesExtraitesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DonneesExtraitesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DonneesExtraitesWhereInputSchema), z.lazy(() => DonneesExtraitesWhereInputSchema).array() ]).optional(),
  dates: z.lazy(() => DateTimeNullableListFilterSchema).optional(),
  montants: z.lazy(() => FloatNullableListFilterSchema).optional(),
  noms: z.lazy(() => StringNullableListFilterSchema).optional(),
  adresses: z.lazy(() => StringNullableListFilterSchema).optional(),
  autres: z.lazy(() => JsonNullableFilterSchema).optional(),
}).strict();

export const DocumentFourniWhereInputSchema: z.ZodType<Prisma.DocumentFourniWhereInput> = z.object({
  AND: z.union([ z.lazy(() => DocumentFourniWhereInputSchema), z.lazy(() => DocumentFourniWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DocumentFourniWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DocumentFourniWhereInputSchema), z.lazy(() => DocumentFourniWhereInputSchema).array() ]).optional(),
  typeDocument: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  idDocument: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  dateAjout: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
}).strict();

export const NestedEnumDocumentTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumDocumentTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => DocumentTypeSchema).optional(),
  in: z.lazy(() => DocumentTypeSchema).array().optional(),
  notIn: z.lazy(() => DocumentTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => DocumentTypeSchema), z.lazy(() => NestedEnumDocumentTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumDocumentTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumDocumentTypeFilterSchema).optional(),
}).strict();

export const NestedEnumDocumentStatutWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumDocumentStatutWithAggregatesFilter> = z.object({
  equals: z.lazy(() => DocumentStatutSchema).optional(),
  in: z.lazy(() => DocumentStatutSchema).array().optional(),
  notIn: z.lazy(() => DocumentStatutSchema).array().optional(),
  not: z.union([ z.lazy(() => DocumentStatutSchema), z.lazy(() => NestedEnumDocumentStatutWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumDocumentStatutFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumDocumentStatutFilterSchema).optional(),
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
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
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedEnumDemarcheCategorieFilterSchema: z.ZodType<Prisma.NestedEnumDemarcheCategorieFilter> = z.object({
  equals: z.lazy(() => DemarcheCategorieSchema).optional(),
  in: z.lazy(() => DemarcheCategorieSchema).array().optional(),
  notIn: z.lazy(() => DemarcheCategorieSchema).array().optional(),
  not: z.union([ z.lazy(() => DemarcheCategorieSchema), z.lazy(() => NestedEnumDemarcheCategorieFilterSchema) ]).optional(),
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedEnumDemarcheCategorieWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumDemarcheCategorieWithAggregatesFilter> = z.object({
  equals: z.lazy(() => DemarcheCategorieSchema).optional(),
  in: z.lazy(() => DemarcheCategorieSchema).array().optional(),
  notIn: z.lazy(() => DemarcheCategorieSchema).array().optional(),
  not: z.union([ z.lazy(() => DemarcheCategorieSchema), z.lazy(() => NestedEnumDemarcheCategorieWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumDemarcheCategorieFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumDemarcheCategorieFilterSchema).optional(),
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional(),
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional(),
}).strict();

export const NestedEnumDemarcheStatutFilterSchema: z.ZodType<Prisma.NestedEnumDemarcheStatutFilter> = z.object({
  equals: z.lazy(() => DemarcheStatutSchema).optional(),
  in: z.lazy(() => DemarcheStatutSchema).array().optional(),
  notIn: z.lazy(() => DemarcheStatutSchema).array().optional(),
  not: z.union([ z.lazy(() => DemarcheStatutSchema), z.lazy(() => NestedEnumDemarcheStatutFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
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
}).strict();

export const NestedEnumDemarcheStatutWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumDemarcheStatutWithAggregatesFilter> = z.object({
  equals: z.lazy(() => DemarcheStatutSchema).optional(),
  in: z.lazy(() => DemarcheStatutSchema).array().optional(),
  notIn: z.lazy(() => DemarcheStatutSchema).array().optional(),
  not: z.union([ z.lazy(() => DemarcheStatutSchema), z.lazy(() => NestedEnumDemarcheStatutWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumDemarcheStatutFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumDemarcheStatutFilterSchema).optional(),
}).strict();

export const NestedEnumNotificationTypeFilterSchema: z.ZodType<Prisma.NestedEnumNotificationTypeFilter> = z.object({
  equals: z.lazy(() => NotificationTypeSchema).optional(),
  in: z.lazy(() => NotificationTypeSchema).array().optional(),
  notIn: z.lazy(() => NotificationTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => NotificationTypeSchema), z.lazy(() => NestedEnumNotificationTypeFilterSchema) ]).optional(),
}).strict();

export const NestedEnumNotificationPrioriteFilterSchema: z.ZodType<Prisma.NestedEnumNotificationPrioriteFilter> = z.object({
  equals: z.lazy(() => NotificationPrioriteSchema).optional(),
  in: z.lazy(() => NotificationPrioriteSchema).array().optional(),
  notIn: z.lazy(() => NotificationPrioriteSchema).array().optional(),
  not: z.union([ z.lazy(() => NotificationPrioriteSchema), z.lazy(() => NestedEnumNotificationPrioriteFilterSchema) ]).optional(),
}).strict();

export const NestedEnumNotificationTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumNotificationTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => NotificationTypeSchema).optional(),
  in: z.lazy(() => NotificationTypeSchema).array().optional(),
  notIn: z.lazy(() => NotificationTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => NotificationTypeSchema), z.lazy(() => NestedEnumNotificationTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumNotificationTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumNotificationTypeFilterSchema).optional(),
}).strict();

export const NestedEnumNotificationPrioriteWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumNotificationPrioriteWithAggregatesFilter> = z.object({
  equals: z.lazy(() => NotificationPrioriteSchema).optional(),
  in: z.lazy(() => NotificationPrioriteSchema).array().optional(),
  notIn: z.lazy(() => NotificationPrioriteSchema).array().optional(),
  not: z.union([ z.lazy(() => NotificationPrioriteSchema), z.lazy(() => NestedEnumNotificationPrioriteWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumNotificationPrioriteFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumNotificationPrioriteFilterSchema).optional(),
}).strict();

export const DocumentCreateWithoutProprietaireInputSchema: z.ZodType<Prisma.DocumentCreateWithoutProprietaireInput> = z.object({
  id: z.string().optional(),
  nomFichier: z.string(),
  urlStockage: z.string().optional().nullable(),
  idGridFs: z.string().optional().nullable(),
  type: z.lazy(() => DocumentTypeSchema),
  statut: z.lazy(() => DocumentStatutSchema).optional(),
  tags: z.union([ z.lazy(() => DocumentCreatetagsInputSchema), z.string().array() ]).optional(),
  donneesExtraites: z.union([ z.lazy(() => DonneesExtraitesNullableCreateEnvelopeInputSchema), z.lazy(() => DonneesExtraitesCreateInputSchema) ]).optional().nullable(),
  dateUpload: z.coerce.date().optional(),
  size: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  documentsFournis: z.union([ z.lazy(() => DocumentFourniListCreateEnvelopeInputSchema), z.lazy(() => DocumentFourniCreateInputSchema), z.lazy(() => DocumentFourniCreateInputSchema).array() ]).optional(),
  dossiers: z.lazy(() => DossierCreateNestedManyWithoutDocumentsInputSchema).optional(),
  notifications: z.lazy(() => NotificationCreateNestedManyWithoutDocumentLieInputSchema).optional(),
}).strict();

export const DocumentUncheckedCreateWithoutProprietaireInputSchema: z.ZodType<Prisma.DocumentUncheckedCreateWithoutProprietaireInput> = z.object({
  id: z.string().optional(),
  nomFichier: z.string(),
  urlStockage: z.string().optional().nullable(),
  idGridFs: z.string().optional().nullable(),
  type: z.lazy(() => DocumentTypeSchema),
  statut: z.lazy(() => DocumentStatutSchema).optional(),
  tags: z.union([ z.lazy(() => DocumentCreatetagsInputSchema), z.string().array() ]).optional(),
  donneesExtraites: z.union([ z.lazy(() => DonneesExtraitesNullableCreateEnvelopeInputSchema), z.lazy(() => DonneesExtraitesCreateInputSchema) ]).optional().nullable(),
  dateUpload: z.coerce.date().optional(),
  size: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  dossierIds: z.union([ z.lazy(() => DocumentCreatedossierIdsInputSchema), z.string().array() ]).optional(),
  documentsFournis: z.union([ z.lazy(() => DocumentFourniListCreateEnvelopeInputSchema), z.lazy(() => DocumentFourniCreateInputSchema), z.lazy(() => DocumentFourniCreateInputSchema).array() ]).optional(),
  dossiers: z.lazy(() => DossierUncheckedCreateNestedManyWithoutDocumentsInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedCreateNestedManyWithoutDocumentLieInputSchema).optional(),
}).strict();

export const DocumentCreateOrConnectWithoutProprietaireInputSchema: z.ZodType<Prisma.DocumentCreateOrConnectWithoutProprietaireInput> = z.object({
  where: z.lazy(() => DocumentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DocumentCreateWithoutProprietaireInputSchema), z.lazy(() => DocumentUncheckedCreateWithoutProprietaireInputSchema) ]),
}).strict();

export const DocumentCreateManyProprietaireInputEnvelopeSchema: z.ZodType<Prisma.DocumentCreateManyProprietaireInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => DocumentCreateManyProprietaireInputSchema), z.lazy(() => DocumentCreateManyProprietaireInputSchema).array() ]),
}).strict();

export const DossierCreateWithoutProprietaireInputSchema: z.ZodType<Prisma.DossierCreateWithoutProprietaireInput> = z.object({
  id: z.string().optional(),
  nom: z.string(),
  couleur: z.string().optional(),
  icone: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  documents: z.lazy(() => DocumentCreateNestedManyWithoutDossiersInputSchema).optional(),
}).strict();

export const DossierUncheckedCreateWithoutProprietaireInputSchema: z.ZodType<Prisma.DossierUncheckedCreateWithoutProprietaireInput> = z.object({
  id: z.string().optional(),
  nom: z.string(),
  idsDocuments: z.union([ z.lazy(() => DossierCreateidsDocumentsInputSchema), z.string().array() ]).optional(),
  couleur: z.string().optional(),
  icone: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  documents: z.lazy(() => DocumentUncheckedCreateNestedManyWithoutDossiersInputSchema).optional(),
}).strict();

export const DossierCreateOrConnectWithoutProprietaireInputSchema: z.ZodType<Prisma.DossierCreateOrConnectWithoutProprietaireInput> = z.object({
  where: z.lazy(() => DossierWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DossierCreateWithoutProprietaireInputSchema), z.lazy(() => DossierUncheckedCreateWithoutProprietaireInputSchema) ]),
}).strict();

export const DossierCreateManyProprietaireInputEnvelopeSchema: z.ZodType<Prisma.DossierCreateManyProprietaireInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => DossierCreateManyProprietaireInputSchema), z.lazy(() => DossierCreateManyProprietaireInputSchema).array() ]),
}).strict();

export const DemarcheUtilisateurCreateWithoutUtilisateurInputSchema: z.ZodType<Prisma.DemarcheUtilisateurCreateWithoutUtilisateurInput> = z.object({
  id: z.string().optional(),
  documentsFournis: z.union([ z.lazy(() => DocumentFourniListCreateEnvelopeInputSchema), z.lazy(() => DocumentFourniCreateInputSchema), z.lazy(() => DocumentFourniCreateInputSchema).array() ]).optional(),
  complete: z.boolean().optional(),
  dateDebut: z.coerce.date().optional(),
  dateCompletion: z.coerce.date().optional().nullable(),
  statut: z.lazy(() => DemarcheStatutSchema).optional(),
  notes: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  modele: z.lazy(() => ModeleDemarcheCreateNestedOneWithoutDemarchesUtilisateurInputSchema),
}).strict();

export const DemarcheUtilisateurUncheckedCreateWithoutUtilisateurInputSchema: z.ZodType<Prisma.DemarcheUtilisateurUncheckedCreateWithoutUtilisateurInput> = z.object({
  id: z.string().optional(),
  idModele: z.string(),
  documentsFournis: z.union([ z.lazy(() => DocumentFourniListCreateEnvelopeInputSchema), z.lazy(() => DocumentFourniCreateInputSchema), z.lazy(() => DocumentFourniCreateInputSchema).array() ]).optional(),
  complete: z.boolean().optional(),
  dateDebut: z.coerce.date().optional(),
  dateCompletion: z.coerce.date().optional().nullable(),
  statut: z.lazy(() => DemarcheStatutSchema).optional(),
  notes: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}).strict();

export const DemarcheUtilisateurCreateOrConnectWithoutUtilisateurInputSchema: z.ZodType<Prisma.DemarcheUtilisateurCreateOrConnectWithoutUtilisateurInput> = z.object({
  where: z.lazy(() => DemarcheUtilisateurWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DemarcheUtilisateurCreateWithoutUtilisateurInputSchema), z.lazy(() => DemarcheUtilisateurUncheckedCreateWithoutUtilisateurInputSchema) ]),
}).strict();

export const DemarcheUtilisateurCreateManyUtilisateurInputEnvelopeSchema: z.ZodType<Prisma.DemarcheUtilisateurCreateManyUtilisateurInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => DemarcheUtilisateurCreateManyUtilisateurInputSchema), z.lazy(() => DemarcheUtilisateurCreateManyUtilisateurInputSchema).array() ]),
}).strict();

export const NotificationCreateWithoutUserInputSchema: z.ZodType<Prisma.NotificationCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  type: z.lazy(() => NotificationTypeSchema),
  message: z.string(),
  lu: z.boolean().optional(),
  dateCreation: z.coerce.date().optional(),
  priorite: z.lazy(() => NotificationPrioriteSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  documentLie: z.lazy(() => DocumentCreateNestedOneWithoutNotificationsInputSchema).optional(),
}).strict();

export const NotificationUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.NotificationUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  type: z.lazy(() => NotificationTypeSchema),
  message: z.string(),
  idDocumentLie: z.string().optional().nullable(),
  lu: z.boolean().optional(),
  dateCreation: z.coerce.date().optional(),
  priorite: z.lazy(() => NotificationPrioriteSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}).strict();

export const NotificationCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.NotificationCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => NotificationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => NotificationCreateWithoutUserInputSchema), z.lazy(() => NotificationUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const NotificationCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.NotificationCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => NotificationCreateManyUserInputSchema), z.lazy(() => NotificationCreateManyUserInputSchema).array() ]),
}).strict();

export const UserPreferencesUpsertInputSchema: z.ZodType<Prisma.UserPreferencesUpsertInput> = z.object({
  set: z.lazy(() => UserPreferencesCreateInputSchema).nullable(),
  update: z.lazy(() => UserPreferencesUpdateInputSchema),
}).strict();

export const DocumentUpsertWithWhereUniqueWithoutProprietaireInputSchema: z.ZodType<Prisma.DocumentUpsertWithWhereUniqueWithoutProprietaireInput> = z.object({
  where: z.lazy(() => DocumentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => DocumentUpdateWithoutProprietaireInputSchema), z.lazy(() => DocumentUncheckedUpdateWithoutProprietaireInputSchema) ]),
  create: z.union([ z.lazy(() => DocumentCreateWithoutProprietaireInputSchema), z.lazy(() => DocumentUncheckedCreateWithoutProprietaireInputSchema) ]),
}).strict();

export const DocumentUpdateWithWhereUniqueWithoutProprietaireInputSchema: z.ZodType<Prisma.DocumentUpdateWithWhereUniqueWithoutProprietaireInput> = z.object({
  where: z.lazy(() => DocumentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => DocumentUpdateWithoutProprietaireInputSchema), z.lazy(() => DocumentUncheckedUpdateWithoutProprietaireInputSchema) ]),
}).strict();

export const DocumentUpdateManyWithWhereWithoutProprietaireInputSchema: z.ZodType<Prisma.DocumentUpdateManyWithWhereWithoutProprietaireInput> = z.object({
  where: z.lazy(() => DocumentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => DocumentUpdateManyMutationInputSchema), z.lazy(() => DocumentUncheckedUpdateManyWithoutProprietaireInputSchema) ]),
}).strict();

export const DocumentScalarWhereInputSchema: z.ZodType<Prisma.DocumentScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => DocumentScalarWhereInputSchema), z.lazy(() => DocumentScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DocumentScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DocumentScalarWhereInputSchema), z.lazy(() => DocumentScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  idProprietaire: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  nomFichier: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  urlStockage: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  idGridFs: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  type: z.union([ z.lazy(() => EnumDocumentTypeFilterSchema), z.lazy(() => DocumentTypeSchema) ]).optional(),
  statut: z.union([ z.lazy(() => EnumDocumentStatutFilterSchema), z.lazy(() => DocumentStatutSchema) ]).optional(),
  tags: z.lazy(() => StringNullableListFilterSchema).optional(),
  dateUpload: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  size: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  dossierIds: z.lazy(() => StringNullableListFilterSchema).optional(),
}).strict();

export const DossierUpsertWithWhereUniqueWithoutProprietaireInputSchema: z.ZodType<Prisma.DossierUpsertWithWhereUniqueWithoutProprietaireInput> = z.object({
  where: z.lazy(() => DossierWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => DossierUpdateWithoutProprietaireInputSchema), z.lazy(() => DossierUncheckedUpdateWithoutProprietaireInputSchema) ]),
  create: z.union([ z.lazy(() => DossierCreateWithoutProprietaireInputSchema), z.lazy(() => DossierUncheckedCreateWithoutProprietaireInputSchema) ]),
}).strict();

export const DossierUpdateWithWhereUniqueWithoutProprietaireInputSchema: z.ZodType<Prisma.DossierUpdateWithWhereUniqueWithoutProprietaireInput> = z.object({
  where: z.lazy(() => DossierWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => DossierUpdateWithoutProprietaireInputSchema), z.lazy(() => DossierUncheckedUpdateWithoutProprietaireInputSchema) ]),
}).strict();

export const DossierUpdateManyWithWhereWithoutProprietaireInputSchema: z.ZodType<Prisma.DossierUpdateManyWithWhereWithoutProprietaireInput> = z.object({
  where: z.lazy(() => DossierScalarWhereInputSchema),
  data: z.union([ z.lazy(() => DossierUpdateManyMutationInputSchema), z.lazy(() => DossierUncheckedUpdateManyWithoutProprietaireInputSchema) ]),
}).strict();

export const DossierScalarWhereInputSchema: z.ZodType<Prisma.DossierScalarWhereInput> = z.object({
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
}).strict();

export const DemarcheUtilisateurUpsertWithWhereUniqueWithoutUtilisateurInputSchema: z.ZodType<Prisma.DemarcheUtilisateurUpsertWithWhereUniqueWithoutUtilisateurInput> = z.object({
  where: z.lazy(() => DemarcheUtilisateurWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => DemarcheUtilisateurUpdateWithoutUtilisateurInputSchema), z.lazy(() => DemarcheUtilisateurUncheckedUpdateWithoutUtilisateurInputSchema) ]),
  create: z.union([ z.lazy(() => DemarcheUtilisateurCreateWithoutUtilisateurInputSchema), z.lazy(() => DemarcheUtilisateurUncheckedCreateWithoutUtilisateurInputSchema) ]),
}).strict();

export const DemarcheUtilisateurUpdateWithWhereUniqueWithoutUtilisateurInputSchema: z.ZodType<Prisma.DemarcheUtilisateurUpdateWithWhereUniqueWithoutUtilisateurInput> = z.object({
  where: z.lazy(() => DemarcheUtilisateurWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => DemarcheUtilisateurUpdateWithoutUtilisateurInputSchema), z.lazy(() => DemarcheUtilisateurUncheckedUpdateWithoutUtilisateurInputSchema) ]),
}).strict();

export const DemarcheUtilisateurUpdateManyWithWhereWithoutUtilisateurInputSchema: z.ZodType<Prisma.DemarcheUtilisateurUpdateManyWithWhereWithoutUtilisateurInput> = z.object({
  where: z.lazy(() => DemarcheUtilisateurScalarWhereInputSchema),
  data: z.union([ z.lazy(() => DemarcheUtilisateurUpdateManyMutationInputSchema), z.lazy(() => DemarcheUtilisateurUncheckedUpdateManyWithoutUtilisateurInputSchema) ]),
}).strict();

export const DemarcheUtilisateurScalarWhereInputSchema: z.ZodType<Prisma.DemarcheUtilisateurScalarWhereInput> = z.object({
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
}).strict();

export const NotificationUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.NotificationUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => NotificationWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => NotificationUpdateWithoutUserInputSchema), z.lazy(() => NotificationUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => NotificationCreateWithoutUserInputSchema), z.lazy(() => NotificationUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const NotificationUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.NotificationUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => NotificationWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => NotificationUpdateWithoutUserInputSchema), z.lazy(() => NotificationUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const NotificationUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.NotificationUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => NotificationScalarWhereInputSchema),
  data: z.union([ z.lazy(() => NotificationUpdateManyMutationInputSchema), z.lazy(() => NotificationUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const NotificationScalarWhereInputSchema: z.ZodType<Prisma.NotificationScalarWhereInput> = z.object({
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
}).strict();

export const DonneesExtraitesCreatedatesInputSchema: z.ZodType<Prisma.DonneesExtraitesCreatedatesInput> = z.object({
  set: z.coerce.date().array(),
}).strict();

export const DonneesExtraitesCreatemontantsInputSchema: z.ZodType<Prisma.DonneesExtraitesCreatemontantsInput> = z.object({
  set: z.number().array(),
}).strict();

export const DonneesExtraitesCreatenomsInputSchema: z.ZodType<Prisma.DonneesExtraitesCreatenomsInput> = z.object({
  set: z.string().array(),
}).strict();

export const DonneesExtraitesCreateadressesInputSchema: z.ZodType<Prisma.DonneesExtraitesCreateadressesInput> = z.object({
  set: z.string().array(),
}).strict();

export const UserCreateWithoutDocumentsInputSchema: z.ZodType<Prisma.UserCreateWithoutDocumentsInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  nom: z.string(),
  urlAvatar: z.string().optional().nullable(),
  googleId: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  dateInscription: z.coerce.date().optional(),
  preferences: z.union([ z.lazy(() => UserPreferencesNullableCreateEnvelopeInputSchema), z.lazy(() => UserPreferencesCreateInputSchema) ]).optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  dossiers: z.lazy(() => DossierCreateNestedManyWithoutProprietaireInputSchema).optional(),
  demarchesUtilisateur: z.lazy(() => DemarcheUtilisateurCreateNestedManyWithoutUtilisateurInputSchema).optional(),
  notifications: z.lazy(() => NotificationCreateNestedManyWithoutUserInputSchema).optional(),
}).strict();

export const UserUncheckedCreateWithoutDocumentsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutDocumentsInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  nom: z.string(),
  urlAvatar: z.string().optional().nullable(),
  googleId: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  dateInscription: z.coerce.date().optional(),
  preferences: z.union([ z.lazy(() => UserPreferencesNullableCreateEnvelopeInputSchema), z.lazy(() => UserPreferencesCreateInputSchema) ]).optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  dossiers: z.lazy(() => DossierUncheckedCreateNestedManyWithoutProprietaireInputSchema).optional(),
  demarchesUtilisateur: z.lazy(() => DemarcheUtilisateurUncheckedCreateNestedManyWithoutUtilisateurInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
}).strict();

export const UserCreateOrConnectWithoutDocumentsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutDocumentsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutDocumentsInputSchema), z.lazy(() => UserUncheckedCreateWithoutDocumentsInputSchema) ]),
}).strict();

export const DossierCreateWithoutDocumentsInputSchema: z.ZodType<Prisma.DossierCreateWithoutDocumentsInput> = z.object({
  id: z.string().optional(),
  nom: z.string(),
  couleur: z.string().optional(),
  icone: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  proprietaire: z.lazy(() => UserCreateNestedOneWithoutDossiersInputSchema),
}).strict();

export const DossierUncheckedCreateWithoutDocumentsInputSchema: z.ZodType<Prisma.DossierUncheckedCreateWithoutDocumentsInput> = z.object({
  id: z.string().optional(),
  idProprietaire: z.string(),
  nom: z.string(),
  idsDocuments: z.union([ z.lazy(() => DossierCreateidsDocumentsInputSchema), z.string().array() ]).optional(),
  couleur: z.string().optional(),
  icone: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}).strict();

export const DossierCreateOrConnectWithoutDocumentsInputSchema: z.ZodType<Prisma.DossierCreateOrConnectWithoutDocumentsInput> = z.object({
  where: z.lazy(() => DossierWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DossierCreateWithoutDocumentsInputSchema), z.lazy(() => DossierUncheckedCreateWithoutDocumentsInputSchema) ]),
}).strict();

export const NotificationCreateWithoutDocumentLieInputSchema: z.ZodType<Prisma.NotificationCreateWithoutDocumentLieInput> = z.object({
  id: z.string().optional(),
  type: z.lazy(() => NotificationTypeSchema),
  message: z.string(),
  lu: z.boolean().optional(),
  dateCreation: z.coerce.date().optional(),
  priorite: z.lazy(() => NotificationPrioriteSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutNotificationsInputSchema),
}).strict();

export const NotificationUncheckedCreateWithoutDocumentLieInputSchema: z.ZodType<Prisma.NotificationUncheckedCreateWithoutDocumentLieInput> = z.object({
  id: z.string().optional(),
  idUser: z.string(),
  type: z.lazy(() => NotificationTypeSchema),
  message: z.string(),
  lu: z.boolean().optional(),
  dateCreation: z.coerce.date().optional(),
  priorite: z.lazy(() => NotificationPrioriteSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}).strict();

export const NotificationCreateOrConnectWithoutDocumentLieInputSchema: z.ZodType<Prisma.NotificationCreateOrConnectWithoutDocumentLieInput> = z.object({
  where: z.lazy(() => NotificationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => NotificationCreateWithoutDocumentLieInputSchema), z.lazy(() => NotificationUncheckedCreateWithoutDocumentLieInputSchema) ]),
}).strict();

export const NotificationCreateManyDocumentLieInputEnvelopeSchema: z.ZodType<Prisma.NotificationCreateManyDocumentLieInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => NotificationCreateManyDocumentLieInputSchema), z.lazy(() => NotificationCreateManyDocumentLieInputSchema).array() ]),
}).strict();

export const DonneesExtraitesUpsertInputSchema: z.ZodType<Prisma.DonneesExtraitesUpsertInput> = z.object({
  set: z.lazy(() => DonneesExtraitesCreateInputSchema).nullable(),
  update: z.lazy(() => DonneesExtraitesUpdateInputSchema),
}).strict();

export const DocumentFourniUpdateManyInputSchema: z.ZodType<Prisma.DocumentFourniUpdateManyInput> = z.object({
  where: z.lazy(() => DocumentFourniWhereInputSchema),
  data: z.lazy(() => DocumentFourniUpdateInputSchema),
}).strict();

export const DocumentFourniDeleteManyInputSchema: z.ZodType<Prisma.DocumentFourniDeleteManyInput> = z.object({
  where: z.lazy(() => DocumentFourniWhereInputSchema),
}).strict();

export const UserUpsertWithoutDocumentsInputSchema: z.ZodType<Prisma.UserUpsertWithoutDocumentsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutDocumentsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutDocumentsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutDocumentsInputSchema), z.lazy(() => UserUncheckedCreateWithoutDocumentsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional(),
}).strict();

export const UserUpdateToOneWithWhereWithoutDocumentsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutDocumentsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutDocumentsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutDocumentsInputSchema) ]),
}).strict();

export const UserUpdateWithoutDocumentsInputSchema: z.ZodType<Prisma.UserUpdateWithoutDocumentsInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  urlAvatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  googleId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateInscription: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  preferences: z.union([ z.lazy(() => UserPreferencesNullableUpdateEnvelopeInputSchema), z.lazy(() => UserPreferencesCreateInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dossiers: z.lazy(() => DossierUpdateManyWithoutProprietaireNestedInputSchema).optional(),
  demarchesUtilisateur: z.lazy(() => DemarcheUtilisateurUpdateManyWithoutUtilisateurNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUpdateManyWithoutUserNestedInputSchema).optional(),
}).strict();

export const UserUncheckedUpdateWithoutDocumentsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutDocumentsInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  urlAvatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  googleId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateInscription: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  preferences: z.union([ z.lazy(() => UserPreferencesNullableUpdateEnvelopeInputSchema), z.lazy(() => UserPreferencesCreateInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dossiers: z.lazy(() => DossierUncheckedUpdateManyWithoutProprietaireNestedInputSchema).optional(),
  demarchesUtilisateur: z.lazy(() => DemarcheUtilisateurUncheckedUpdateManyWithoutUtilisateurNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
}).strict();

export const DossierUpsertWithWhereUniqueWithoutDocumentsInputSchema: z.ZodType<Prisma.DossierUpsertWithWhereUniqueWithoutDocumentsInput> = z.object({
  where: z.lazy(() => DossierWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => DossierUpdateWithoutDocumentsInputSchema), z.lazy(() => DossierUncheckedUpdateWithoutDocumentsInputSchema) ]),
  create: z.union([ z.lazy(() => DossierCreateWithoutDocumentsInputSchema), z.lazy(() => DossierUncheckedCreateWithoutDocumentsInputSchema) ]),
}).strict();

export const DossierUpdateWithWhereUniqueWithoutDocumentsInputSchema: z.ZodType<Prisma.DossierUpdateWithWhereUniqueWithoutDocumentsInput> = z.object({
  where: z.lazy(() => DossierWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => DossierUpdateWithoutDocumentsInputSchema), z.lazy(() => DossierUncheckedUpdateWithoutDocumentsInputSchema) ]),
}).strict();

export const DossierUpdateManyWithWhereWithoutDocumentsInputSchema: z.ZodType<Prisma.DossierUpdateManyWithWhereWithoutDocumentsInput> = z.object({
  where: z.lazy(() => DossierScalarWhereInputSchema),
  data: z.union([ z.lazy(() => DossierUpdateManyMutationInputSchema), z.lazy(() => DossierUncheckedUpdateManyWithoutDocumentsInputSchema) ]),
}).strict();

export const NotificationUpsertWithWhereUniqueWithoutDocumentLieInputSchema: z.ZodType<Prisma.NotificationUpsertWithWhereUniqueWithoutDocumentLieInput> = z.object({
  where: z.lazy(() => NotificationWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => NotificationUpdateWithoutDocumentLieInputSchema), z.lazy(() => NotificationUncheckedUpdateWithoutDocumentLieInputSchema) ]),
  create: z.union([ z.lazy(() => NotificationCreateWithoutDocumentLieInputSchema), z.lazy(() => NotificationUncheckedCreateWithoutDocumentLieInputSchema) ]),
}).strict();

export const NotificationUpdateWithWhereUniqueWithoutDocumentLieInputSchema: z.ZodType<Prisma.NotificationUpdateWithWhereUniqueWithoutDocumentLieInput> = z.object({
  where: z.lazy(() => NotificationWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => NotificationUpdateWithoutDocumentLieInputSchema), z.lazy(() => NotificationUncheckedUpdateWithoutDocumentLieInputSchema) ]),
}).strict();

export const NotificationUpdateManyWithWhereWithoutDocumentLieInputSchema: z.ZodType<Prisma.NotificationUpdateManyWithWhereWithoutDocumentLieInput> = z.object({
  where: z.lazy(() => NotificationScalarWhereInputSchema),
  data: z.union([ z.lazy(() => NotificationUpdateManyMutationInputSchema), z.lazy(() => NotificationUncheckedUpdateManyWithoutDocumentLieInputSchema) ]),
}).strict();

export const UserCreateWithoutDossiersInputSchema: z.ZodType<Prisma.UserCreateWithoutDossiersInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  nom: z.string(),
  urlAvatar: z.string().optional().nullable(),
  googleId: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  dateInscription: z.coerce.date().optional(),
  preferences: z.union([ z.lazy(() => UserPreferencesNullableCreateEnvelopeInputSchema), z.lazy(() => UserPreferencesCreateInputSchema) ]).optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  documents: z.lazy(() => DocumentCreateNestedManyWithoutProprietaireInputSchema).optional(),
  demarchesUtilisateur: z.lazy(() => DemarcheUtilisateurCreateNestedManyWithoutUtilisateurInputSchema).optional(),
  notifications: z.lazy(() => NotificationCreateNestedManyWithoutUserInputSchema).optional(),
}).strict();

export const UserUncheckedCreateWithoutDossiersInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutDossiersInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  nom: z.string(),
  urlAvatar: z.string().optional().nullable(),
  googleId: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  dateInscription: z.coerce.date().optional(),
  preferences: z.union([ z.lazy(() => UserPreferencesNullableCreateEnvelopeInputSchema), z.lazy(() => UserPreferencesCreateInputSchema) ]).optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  documents: z.lazy(() => DocumentUncheckedCreateNestedManyWithoutProprietaireInputSchema).optional(),
  demarchesUtilisateur: z.lazy(() => DemarcheUtilisateurUncheckedCreateNestedManyWithoutUtilisateurInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
}).strict();

export const UserCreateOrConnectWithoutDossiersInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutDossiersInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutDossiersInputSchema), z.lazy(() => UserUncheckedCreateWithoutDossiersInputSchema) ]),
}).strict();

export const DocumentCreateWithoutDossiersInputSchema: z.ZodType<Prisma.DocumentCreateWithoutDossiersInput> = z.object({
  id: z.string().optional(),
  nomFichier: z.string(),
  urlStockage: z.string().optional().nullable(),
  idGridFs: z.string().optional().nullable(),
  type: z.lazy(() => DocumentTypeSchema),
  statut: z.lazy(() => DocumentStatutSchema).optional(),
  tags: z.union([ z.lazy(() => DocumentCreatetagsInputSchema), z.string().array() ]).optional(),
  donneesExtraites: z.union([ z.lazy(() => DonneesExtraitesNullableCreateEnvelopeInputSchema), z.lazy(() => DonneesExtraitesCreateInputSchema) ]).optional().nullable(),
  dateUpload: z.coerce.date().optional(),
  size: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  documentsFournis: z.union([ z.lazy(() => DocumentFourniListCreateEnvelopeInputSchema), z.lazy(() => DocumentFourniCreateInputSchema), z.lazy(() => DocumentFourniCreateInputSchema).array() ]).optional(),
  proprietaire: z.lazy(() => UserCreateNestedOneWithoutDocumentsInputSchema),
  notifications: z.lazy(() => NotificationCreateNestedManyWithoutDocumentLieInputSchema).optional(),
}).strict();

export const DocumentUncheckedCreateWithoutDossiersInputSchema: z.ZodType<Prisma.DocumentUncheckedCreateWithoutDossiersInput> = z.object({
  id: z.string().optional(),
  idProprietaire: z.string(),
  nomFichier: z.string(),
  urlStockage: z.string().optional().nullable(),
  idGridFs: z.string().optional().nullable(),
  type: z.lazy(() => DocumentTypeSchema),
  statut: z.lazy(() => DocumentStatutSchema).optional(),
  tags: z.union([ z.lazy(() => DocumentCreatetagsInputSchema), z.string().array() ]).optional(),
  donneesExtraites: z.union([ z.lazy(() => DonneesExtraitesNullableCreateEnvelopeInputSchema), z.lazy(() => DonneesExtraitesCreateInputSchema) ]).optional().nullable(),
  dateUpload: z.coerce.date().optional(),
  size: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  dossierIds: z.union([ z.lazy(() => DocumentCreatedossierIdsInputSchema), z.string().array() ]).optional(),
  documentsFournis: z.union([ z.lazy(() => DocumentFourniListCreateEnvelopeInputSchema), z.lazy(() => DocumentFourniCreateInputSchema), z.lazy(() => DocumentFourniCreateInputSchema).array() ]).optional(),
  notifications: z.lazy(() => NotificationUncheckedCreateNestedManyWithoutDocumentLieInputSchema).optional(),
}).strict();

export const DocumentCreateOrConnectWithoutDossiersInputSchema: z.ZodType<Prisma.DocumentCreateOrConnectWithoutDossiersInput> = z.object({
  where: z.lazy(() => DocumentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DocumentCreateWithoutDossiersInputSchema), z.lazy(() => DocumentUncheckedCreateWithoutDossiersInputSchema) ]),
}).strict();

export const UserUpsertWithoutDossiersInputSchema: z.ZodType<Prisma.UserUpsertWithoutDossiersInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutDossiersInputSchema), z.lazy(() => UserUncheckedUpdateWithoutDossiersInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutDossiersInputSchema), z.lazy(() => UserUncheckedCreateWithoutDossiersInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional(),
}).strict();

export const UserUpdateToOneWithWhereWithoutDossiersInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutDossiersInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutDossiersInputSchema), z.lazy(() => UserUncheckedUpdateWithoutDossiersInputSchema) ]),
}).strict();

export const UserUpdateWithoutDossiersInputSchema: z.ZodType<Prisma.UserUpdateWithoutDossiersInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  urlAvatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  googleId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateInscription: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  preferences: z.union([ z.lazy(() => UserPreferencesNullableUpdateEnvelopeInputSchema), z.lazy(() => UserPreferencesCreateInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  documents: z.lazy(() => DocumentUpdateManyWithoutProprietaireNestedInputSchema).optional(),
  demarchesUtilisateur: z.lazy(() => DemarcheUtilisateurUpdateManyWithoutUtilisateurNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUpdateManyWithoutUserNestedInputSchema).optional(),
}).strict();

export const UserUncheckedUpdateWithoutDossiersInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutDossiersInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  urlAvatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  googleId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateInscription: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  preferences: z.union([ z.lazy(() => UserPreferencesNullableUpdateEnvelopeInputSchema), z.lazy(() => UserPreferencesCreateInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  documents: z.lazy(() => DocumentUncheckedUpdateManyWithoutProprietaireNestedInputSchema).optional(),
  demarchesUtilisateur: z.lazy(() => DemarcheUtilisateurUncheckedUpdateManyWithoutUtilisateurNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
}).strict();

export const DocumentUpsertWithWhereUniqueWithoutDossiersInputSchema: z.ZodType<Prisma.DocumentUpsertWithWhereUniqueWithoutDossiersInput> = z.object({
  where: z.lazy(() => DocumentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => DocumentUpdateWithoutDossiersInputSchema), z.lazy(() => DocumentUncheckedUpdateWithoutDossiersInputSchema) ]),
  create: z.union([ z.lazy(() => DocumentCreateWithoutDossiersInputSchema), z.lazy(() => DocumentUncheckedCreateWithoutDossiersInputSchema) ]),
}).strict();

export const DocumentUpdateWithWhereUniqueWithoutDossiersInputSchema: z.ZodType<Prisma.DocumentUpdateWithWhereUniqueWithoutDossiersInput> = z.object({
  where: z.lazy(() => DocumentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => DocumentUpdateWithoutDossiersInputSchema), z.lazy(() => DocumentUncheckedUpdateWithoutDossiersInputSchema) ]),
}).strict();

export const DocumentUpdateManyWithWhereWithoutDossiersInputSchema: z.ZodType<Prisma.DocumentUpdateManyWithWhereWithoutDossiersInput> = z.object({
  where: z.lazy(() => DocumentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => DocumentUpdateManyMutationInputSchema), z.lazy(() => DocumentUncheckedUpdateManyWithoutDossiersInputSchema) ]),
}).strict();

export const DemarcheUtilisateurCreateWithoutModeleInputSchema: z.ZodType<Prisma.DemarcheUtilisateurCreateWithoutModeleInput> = z.object({
  id: z.string().optional(),
  documentsFournis: z.union([ z.lazy(() => DocumentFourniListCreateEnvelopeInputSchema), z.lazy(() => DocumentFourniCreateInputSchema), z.lazy(() => DocumentFourniCreateInputSchema).array() ]).optional(),
  complete: z.boolean().optional(),
  dateDebut: z.coerce.date().optional(),
  dateCompletion: z.coerce.date().optional().nullable(),
  statut: z.lazy(() => DemarcheStatutSchema).optional(),
  notes: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  utilisateur: z.lazy(() => UserCreateNestedOneWithoutDemarchesUtilisateurInputSchema),
}).strict();

export const DemarcheUtilisateurUncheckedCreateWithoutModeleInputSchema: z.ZodType<Prisma.DemarcheUtilisateurUncheckedCreateWithoutModeleInput> = z.object({
  id: z.string().optional(),
  idUtilisateur: z.string(),
  documentsFournis: z.union([ z.lazy(() => DocumentFourniListCreateEnvelopeInputSchema), z.lazy(() => DocumentFourniCreateInputSchema), z.lazy(() => DocumentFourniCreateInputSchema).array() ]).optional(),
  complete: z.boolean().optional(),
  dateDebut: z.coerce.date().optional(),
  dateCompletion: z.coerce.date().optional().nullable(),
  statut: z.lazy(() => DemarcheStatutSchema).optional(),
  notes: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}).strict();

export const DemarcheUtilisateurCreateOrConnectWithoutModeleInputSchema: z.ZodType<Prisma.DemarcheUtilisateurCreateOrConnectWithoutModeleInput> = z.object({
  where: z.lazy(() => DemarcheUtilisateurWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DemarcheUtilisateurCreateWithoutModeleInputSchema), z.lazy(() => DemarcheUtilisateurUncheckedCreateWithoutModeleInputSchema) ]),
}).strict();

export const DemarcheUtilisateurCreateManyModeleInputEnvelopeSchema: z.ZodType<Prisma.DemarcheUtilisateurCreateManyModeleInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => DemarcheUtilisateurCreateManyModeleInputSchema), z.lazy(() => DemarcheUtilisateurCreateManyModeleInputSchema).array() ]),
}).strict();

export const DemarcheUtilisateurUpsertWithWhereUniqueWithoutModeleInputSchema: z.ZodType<Prisma.DemarcheUtilisateurUpsertWithWhereUniqueWithoutModeleInput> = z.object({
  where: z.lazy(() => DemarcheUtilisateurWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => DemarcheUtilisateurUpdateWithoutModeleInputSchema), z.lazy(() => DemarcheUtilisateurUncheckedUpdateWithoutModeleInputSchema) ]),
  create: z.union([ z.lazy(() => DemarcheUtilisateurCreateWithoutModeleInputSchema), z.lazy(() => DemarcheUtilisateurUncheckedCreateWithoutModeleInputSchema) ]),
}).strict();

export const DemarcheUtilisateurUpdateWithWhereUniqueWithoutModeleInputSchema: z.ZodType<Prisma.DemarcheUtilisateurUpdateWithWhereUniqueWithoutModeleInput> = z.object({
  where: z.lazy(() => DemarcheUtilisateurWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => DemarcheUtilisateurUpdateWithoutModeleInputSchema), z.lazy(() => DemarcheUtilisateurUncheckedUpdateWithoutModeleInputSchema) ]),
}).strict();

export const DemarcheUtilisateurUpdateManyWithWhereWithoutModeleInputSchema: z.ZodType<Prisma.DemarcheUtilisateurUpdateManyWithWhereWithoutModeleInput> = z.object({
  where: z.lazy(() => DemarcheUtilisateurScalarWhereInputSchema),
  data: z.union([ z.lazy(() => DemarcheUtilisateurUpdateManyMutationInputSchema), z.lazy(() => DemarcheUtilisateurUncheckedUpdateManyWithoutModeleInputSchema) ]),
}).strict();

export const UserCreateWithoutDemarchesUtilisateurInputSchema: z.ZodType<Prisma.UserCreateWithoutDemarchesUtilisateurInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  nom: z.string(),
  urlAvatar: z.string().optional().nullable(),
  googleId: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  dateInscription: z.coerce.date().optional(),
  preferences: z.union([ z.lazy(() => UserPreferencesNullableCreateEnvelopeInputSchema), z.lazy(() => UserPreferencesCreateInputSchema) ]).optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  documents: z.lazy(() => DocumentCreateNestedManyWithoutProprietaireInputSchema).optional(),
  dossiers: z.lazy(() => DossierCreateNestedManyWithoutProprietaireInputSchema).optional(),
  notifications: z.lazy(() => NotificationCreateNestedManyWithoutUserInputSchema).optional(),
}).strict();

export const UserUncheckedCreateWithoutDemarchesUtilisateurInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutDemarchesUtilisateurInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  nom: z.string(),
  urlAvatar: z.string().optional().nullable(),
  googleId: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  dateInscription: z.coerce.date().optional(),
  preferences: z.union([ z.lazy(() => UserPreferencesNullableCreateEnvelopeInputSchema), z.lazy(() => UserPreferencesCreateInputSchema) ]).optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  documents: z.lazy(() => DocumentUncheckedCreateNestedManyWithoutProprietaireInputSchema).optional(),
  dossiers: z.lazy(() => DossierUncheckedCreateNestedManyWithoutProprietaireInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
}).strict();

export const UserCreateOrConnectWithoutDemarchesUtilisateurInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutDemarchesUtilisateurInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutDemarchesUtilisateurInputSchema), z.lazy(() => UserUncheckedCreateWithoutDemarchesUtilisateurInputSchema) ]),
}).strict();

export const ModeleDemarcheCreateWithoutDemarchesUtilisateurInputSchema: z.ZodType<Prisma.ModeleDemarcheCreateWithoutDemarchesUtilisateurInput> = z.object({
  id: z.string().optional(),
  titre: z.string(),
  description: z.string().optional().nullable(),
  typesDocumentsRequis: z.union([ z.lazy(() => ModeleDemarcheCreatetypesDocumentsRequisInputSchema), z.string().array() ]).optional(),
  categorie: z.lazy(() => DemarcheCategorieSchema).optional(),
  actif: z.boolean().optional(),
  ordre: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}).strict();

export const ModeleDemarcheUncheckedCreateWithoutDemarchesUtilisateurInputSchema: z.ZodType<Prisma.ModeleDemarcheUncheckedCreateWithoutDemarchesUtilisateurInput> = z.object({
  id: z.string().optional(),
  titre: z.string(),
  description: z.string().optional().nullable(),
  typesDocumentsRequis: z.union([ z.lazy(() => ModeleDemarcheCreatetypesDocumentsRequisInputSchema), z.string().array() ]).optional(),
  categorie: z.lazy(() => DemarcheCategorieSchema).optional(),
  actif: z.boolean().optional(),
  ordre: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}).strict();

export const ModeleDemarcheCreateOrConnectWithoutDemarchesUtilisateurInputSchema: z.ZodType<Prisma.ModeleDemarcheCreateOrConnectWithoutDemarchesUtilisateurInput> = z.object({
  where: z.lazy(() => ModeleDemarcheWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ModeleDemarcheCreateWithoutDemarchesUtilisateurInputSchema), z.lazy(() => ModeleDemarcheUncheckedCreateWithoutDemarchesUtilisateurInputSchema) ]),
}).strict();

export const UserUpsertWithoutDemarchesUtilisateurInputSchema: z.ZodType<Prisma.UserUpsertWithoutDemarchesUtilisateurInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutDemarchesUtilisateurInputSchema), z.lazy(() => UserUncheckedUpdateWithoutDemarchesUtilisateurInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutDemarchesUtilisateurInputSchema), z.lazy(() => UserUncheckedCreateWithoutDemarchesUtilisateurInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional(),
}).strict();

export const UserUpdateToOneWithWhereWithoutDemarchesUtilisateurInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutDemarchesUtilisateurInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutDemarchesUtilisateurInputSchema), z.lazy(() => UserUncheckedUpdateWithoutDemarchesUtilisateurInputSchema) ]),
}).strict();

export const UserUpdateWithoutDemarchesUtilisateurInputSchema: z.ZodType<Prisma.UserUpdateWithoutDemarchesUtilisateurInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  urlAvatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  googleId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateInscription: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  preferences: z.union([ z.lazy(() => UserPreferencesNullableUpdateEnvelopeInputSchema), z.lazy(() => UserPreferencesCreateInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  documents: z.lazy(() => DocumentUpdateManyWithoutProprietaireNestedInputSchema).optional(),
  dossiers: z.lazy(() => DossierUpdateManyWithoutProprietaireNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUpdateManyWithoutUserNestedInputSchema).optional(),
}).strict();

export const UserUncheckedUpdateWithoutDemarchesUtilisateurInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutDemarchesUtilisateurInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  urlAvatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  googleId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateInscription: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  preferences: z.union([ z.lazy(() => UserPreferencesNullableUpdateEnvelopeInputSchema), z.lazy(() => UserPreferencesCreateInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  documents: z.lazy(() => DocumentUncheckedUpdateManyWithoutProprietaireNestedInputSchema).optional(),
  dossiers: z.lazy(() => DossierUncheckedUpdateManyWithoutProprietaireNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
}).strict();

export const ModeleDemarcheUpsertWithoutDemarchesUtilisateurInputSchema: z.ZodType<Prisma.ModeleDemarcheUpsertWithoutDemarchesUtilisateurInput> = z.object({
  update: z.union([ z.lazy(() => ModeleDemarcheUpdateWithoutDemarchesUtilisateurInputSchema), z.lazy(() => ModeleDemarcheUncheckedUpdateWithoutDemarchesUtilisateurInputSchema) ]),
  create: z.union([ z.lazy(() => ModeleDemarcheCreateWithoutDemarchesUtilisateurInputSchema), z.lazy(() => ModeleDemarcheUncheckedCreateWithoutDemarchesUtilisateurInputSchema) ]),
  where: z.lazy(() => ModeleDemarcheWhereInputSchema).optional(),
}).strict();

export const ModeleDemarcheUpdateToOneWithWhereWithoutDemarchesUtilisateurInputSchema: z.ZodType<Prisma.ModeleDemarcheUpdateToOneWithWhereWithoutDemarchesUtilisateurInput> = z.object({
  where: z.lazy(() => ModeleDemarcheWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ModeleDemarcheUpdateWithoutDemarchesUtilisateurInputSchema), z.lazy(() => ModeleDemarcheUncheckedUpdateWithoutDemarchesUtilisateurInputSchema) ]),
}).strict();

export const ModeleDemarcheUpdateWithoutDemarchesUtilisateurInputSchema: z.ZodType<Prisma.ModeleDemarcheUpdateWithoutDemarchesUtilisateurInput> = z.object({
  titre: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  typesDocumentsRequis: z.union([ z.lazy(() => ModeleDemarcheUpdatetypesDocumentsRequisInputSchema), z.string().array() ]).optional(),
  categorie: z.union([ z.lazy(() => DemarcheCategorieSchema), z.lazy(() => EnumDemarcheCategorieFieldUpdateOperationsInputSchema) ]).optional(),
  actif: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  ordre: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ModeleDemarcheUncheckedUpdateWithoutDemarchesUtilisateurInputSchema: z.ZodType<Prisma.ModeleDemarcheUncheckedUpdateWithoutDemarchesUtilisateurInput> = z.object({
  titre: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  typesDocumentsRequis: z.union([ z.lazy(() => ModeleDemarcheUpdatetypesDocumentsRequisInputSchema), z.string().array() ]).optional(),
  categorie: z.union([ z.lazy(() => DemarcheCategorieSchema), z.lazy(() => EnumDemarcheCategorieFieldUpdateOperationsInputSchema) ]).optional(),
  actif: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  ordre: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateWithoutNotificationsInputSchema: z.ZodType<Prisma.UserCreateWithoutNotificationsInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  nom: z.string(),
  urlAvatar: z.string().optional().nullable(),
  googleId: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  dateInscription: z.coerce.date().optional(),
  preferences: z.union([ z.lazy(() => UserPreferencesNullableCreateEnvelopeInputSchema), z.lazy(() => UserPreferencesCreateInputSchema) ]).optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  documents: z.lazy(() => DocumentCreateNestedManyWithoutProprietaireInputSchema).optional(),
  dossiers: z.lazy(() => DossierCreateNestedManyWithoutProprietaireInputSchema).optional(),
  demarchesUtilisateur: z.lazy(() => DemarcheUtilisateurCreateNestedManyWithoutUtilisateurInputSchema).optional(),
}).strict();

export const UserUncheckedCreateWithoutNotificationsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutNotificationsInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  nom: z.string(),
  urlAvatar: z.string().optional().nullable(),
  googleId: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  dateInscription: z.coerce.date().optional(),
  preferences: z.union([ z.lazy(() => UserPreferencesNullableCreateEnvelopeInputSchema), z.lazy(() => UserPreferencesCreateInputSchema) ]).optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  documents: z.lazy(() => DocumentUncheckedCreateNestedManyWithoutProprietaireInputSchema).optional(),
  dossiers: z.lazy(() => DossierUncheckedCreateNestedManyWithoutProprietaireInputSchema).optional(),
  demarchesUtilisateur: z.lazy(() => DemarcheUtilisateurUncheckedCreateNestedManyWithoutUtilisateurInputSchema).optional(),
}).strict();

export const UserCreateOrConnectWithoutNotificationsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutNotificationsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutNotificationsInputSchema), z.lazy(() => UserUncheckedCreateWithoutNotificationsInputSchema) ]),
}).strict();

export const DocumentCreateWithoutNotificationsInputSchema: z.ZodType<Prisma.DocumentCreateWithoutNotificationsInput> = z.object({
  id: z.string().optional(),
  nomFichier: z.string(),
  urlStockage: z.string().optional().nullable(),
  idGridFs: z.string().optional().nullable(),
  type: z.lazy(() => DocumentTypeSchema),
  statut: z.lazy(() => DocumentStatutSchema).optional(),
  tags: z.union([ z.lazy(() => DocumentCreatetagsInputSchema), z.string().array() ]).optional(),
  donneesExtraites: z.union([ z.lazy(() => DonneesExtraitesNullableCreateEnvelopeInputSchema), z.lazy(() => DonneesExtraitesCreateInputSchema) ]).optional().nullable(),
  dateUpload: z.coerce.date().optional(),
  size: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  documentsFournis: z.union([ z.lazy(() => DocumentFourniListCreateEnvelopeInputSchema), z.lazy(() => DocumentFourniCreateInputSchema), z.lazy(() => DocumentFourniCreateInputSchema).array() ]).optional(),
  proprietaire: z.lazy(() => UserCreateNestedOneWithoutDocumentsInputSchema),
  dossiers: z.lazy(() => DossierCreateNestedManyWithoutDocumentsInputSchema).optional(),
}).strict();

export const DocumentUncheckedCreateWithoutNotificationsInputSchema: z.ZodType<Prisma.DocumentUncheckedCreateWithoutNotificationsInput> = z.object({
  id: z.string().optional(),
  idProprietaire: z.string(),
  nomFichier: z.string(),
  urlStockage: z.string().optional().nullable(),
  idGridFs: z.string().optional().nullable(),
  type: z.lazy(() => DocumentTypeSchema),
  statut: z.lazy(() => DocumentStatutSchema).optional(),
  tags: z.union([ z.lazy(() => DocumentCreatetagsInputSchema), z.string().array() ]).optional(),
  donneesExtraites: z.union([ z.lazy(() => DonneesExtraitesNullableCreateEnvelopeInputSchema), z.lazy(() => DonneesExtraitesCreateInputSchema) ]).optional().nullable(),
  dateUpload: z.coerce.date().optional(),
  size: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  dossierIds: z.union([ z.lazy(() => DocumentCreatedossierIdsInputSchema), z.string().array() ]).optional(),
  documentsFournis: z.union([ z.lazy(() => DocumentFourniListCreateEnvelopeInputSchema), z.lazy(() => DocumentFourniCreateInputSchema), z.lazy(() => DocumentFourniCreateInputSchema).array() ]).optional(),
  dossiers: z.lazy(() => DossierUncheckedCreateNestedManyWithoutDocumentsInputSchema).optional(),
}).strict();

export const DocumentCreateOrConnectWithoutNotificationsInputSchema: z.ZodType<Prisma.DocumentCreateOrConnectWithoutNotificationsInput> = z.object({
  where: z.lazy(() => DocumentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DocumentCreateWithoutNotificationsInputSchema), z.lazy(() => DocumentUncheckedCreateWithoutNotificationsInputSchema) ]),
}).strict();

export const UserUpsertWithoutNotificationsInputSchema: z.ZodType<Prisma.UserUpsertWithoutNotificationsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutNotificationsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutNotificationsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutNotificationsInputSchema), z.lazy(() => UserUncheckedCreateWithoutNotificationsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional(),
}).strict();

export const UserUpdateToOneWithWhereWithoutNotificationsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutNotificationsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutNotificationsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutNotificationsInputSchema) ]),
}).strict();

export const UserUpdateWithoutNotificationsInputSchema: z.ZodType<Prisma.UserUpdateWithoutNotificationsInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  urlAvatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  googleId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateInscription: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  preferences: z.union([ z.lazy(() => UserPreferencesNullableUpdateEnvelopeInputSchema), z.lazy(() => UserPreferencesCreateInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  documents: z.lazy(() => DocumentUpdateManyWithoutProprietaireNestedInputSchema).optional(),
  dossiers: z.lazy(() => DossierUpdateManyWithoutProprietaireNestedInputSchema).optional(),
  demarchesUtilisateur: z.lazy(() => DemarcheUtilisateurUpdateManyWithoutUtilisateurNestedInputSchema).optional(),
}).strict();

export const UserUncheckedUpdateWithoutNotificationsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutNotificationsInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  urlAvatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  googleId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateInscription: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  preferences: z.union([ z.lazy(() => UserPreferencesNullableUpdateEnvelopeInputSchema), z.lazy(() => UserPreferencesCreateInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  documents: z.lazy(() => DocumentUncheckedUpdateManyWithoutProprietaireNestedInputSchema).optional(),
  dossiers: z.lazy(() => DossierUncheckedUpdateManyWithoutProprietaireNestedInputSchema).optional(),
  demarchesUtilisateur: z.lazy(() => DemarcheUtilisateurUncheckedUpdateManyWithoutUtilisateurNestedInputSchema).optional(),
}).strict();

export const DocumentUpsertWithoutNotificationsInputSchema: z.ZodType<Prisma.DocumentUpsertWithoutNotificationsInput> = z.object({
  update: z.union([ z.lazy(() => DocumentUpdateWithoutNotificationsInputSchema), z.lazy(() => DocumentUncheckedUpdateWithoutNotificationsInputSchema) ]),
  create: z.union([ z.lazy(() => DocumentCreateWithoutNotificationsInputSchema), z.lazy(() => DocumentUncheckedCreateWithoutNotificationsInputSchema) ]),
  where: z.lazy(() => DocumentWhereInputSchema).optional(),
}).strict();

export const DocumentUpdateToOneWithWhereWithoutNotificationsInputSchema: z.ZodType<Prisma.DocumentUpdateToOneWithWhereWithoutNotificationsInput> = z.object({
  where: z.lazy(() => DocumentWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => DocumentUpdateWithoutNotificationsInputSchema), z.lazy(() => DocumentUncheckedUpdateWithoutNotificationsInputSchema) ]),
}).strict();

export const DocumentUpdateWithoutNotificationsInputSchema: z.ZodType<Prisma.DocumentUpdateWithoutNotificationsInput> = z.object({
  nomFichier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  urlStockage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  idGridFs: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => DocumentTypeSchema), z.lazy(() => EnumDocumentTypeFieldUpdateOperationsInputSchema) ]).optional(),
  statut: z.union([ z.lazy(() => DocumentStatutSchema), z.lazy(() => EnumDocumentStatutFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => DocumentUpdatetagsInputSchema), z.string().array() ]).optional(),
  donneesExtraites: z.union([ z.lazy(() => DonneesExtraitesNullableUpdateEnvelopeInputSchema), z.lazy(() => DonneesExtraitesCreateInputSchema) ]).optional().nullable(),
  dateUpload: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  documentsFournis: z.union([ z.lazy(() => DocumentFourniListUpdateEnvelopeInputSchema), z.lazy(() => DocumentFourniCreateInputSchema), z.lazy(() => DocumentFourniCreateInputSchema).array() ]).optional(),
  proprietaire: z.lazy(() => UserUpdateOneRequiredWithoutDocumentsNestedInputSchema).optional(),
  dossiers: z.lazy(() => DossierUpdateManyWithoutDocumentsNestedInputSchema).optional(),
}).strict();

export const DocumentUncheckedUpdateWithoutNotificationsInputSchema: z.ZodType<Prisma.DocumentUncheckedUpdateWithoutNotificationsInput> = z.object({
  idProprietaire: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nomFichier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  urlStockage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  idGridFs: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => DocumentTypeSchema), z.lazy(() => EnumDocumentTypeFieldUpdateOperationsInputSchema) ]).optional(),
  statut: z.union([ z.lazy(() => DocumentStatutSchema), z.lazy(() => EnumDocumentStatutFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => DocumentUpdatetagsInputSchema), z.string().array() ]).optional(),
  donneesExtraites: z.union([ z.lazy(() => DonneesExtraitesNullableUpdateEnvelopeInputSchema), z.lazy(() => DonneesExtraitesCreateInputSchema) ]).optional().nullable(),
  dateUpload: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dossierIds: z.union([ z.lazy(() => DocumentUpdatedossierIdsInputSchema), z.string().array() ]).optional(),
  documentsFournis: z.union([ z.lazy(() => DocumentFourniListUpdateEnvelopeInputSchema), z.lazy(() => DocumentFourniCreateInputSchema), z.lazy(() => DocumentFourniCreateInputSchema).array() ]).optional(),
  dossiers: z.lazy(() => DossierUncheckedUpdateManyWithoutDocumentsNestedInputSchema).optional(),
}).strict();

export const DateTimeNullableListFilterSchema: z.ZodType<Prisma.DateTimeNullableListFilter> = z.object({
  equals: z.coerce.date().array().optional().nullable(),
  has: z.coerce.date().optional().nullable(),
  hasEvery: z.coerce.date().array().optional(),
  hasSome: z.coerce.date().array().optional(),
  isEmpty: z.boolean().optional(),
}).strict();

export const FloatNullableListFilterSchema: z.ZodType<Prisma.FloatNullableListFilter> = z.object({
  equals: z.number().array().optional().nullable(),
  has: z.number().optional().nullable(),
  hasEvery: z.number().array().optional(),
  hasSome: z.number().array().optional(),
  isEmpty: z.boolean().optional(),
}).strict();

export const JsonNullableFilterSchema: z.ZodType<Prisma.JsonNullableFilter> = z.object({
  equals: InputJsonValueSchema.optional().nullable(),
  not: InputJsonValueSchema.optional().nullable(),
  isSet: z.boolean().optional(),
}).strict();

export const DocumentCreateManyProprietaireInputSchema: z.ZodType<Prisma.DocumentCreateManyProprietaireInput> = z.object({
  id: z.string().optional(),
  nomFichier: z.string(),
  urlStockage: z.string().optional().nullable(),
  idGridFs: z.string().optional().nullable(),
  type: z.lazy(() => DocumentTypeSchema),
  statut: z.lazy(() => DocumentStatutSchema).optional(),
  tags: z.union([ z.lazy(() => DocumentCreatetagsInputSchema), z.string().array() ]).optional(),
  donneesExtraites: z.union([ z.lazy(() => DonneesExtraitesNullableCreateEnvelopeInputSchema), z.lazy(() => DonneesExtraitesCreateInputSchema) ]).optional().nullable(),
  dateUpload: z.coerce.date().optional(),
  size: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  dossierIds: z.union([ z.lazy(() => DocumentCreatedossierIdsInputSchema), z.string().array() ]).optional(),
  documentsFournis: z.union([ z.lazy(() => DocumentFourniListCreateEnvelopeInputSchema), z.lazy(() => DocumentFourniCreateInputSchema), z.lazy(() => DocumentFourniCreateInputSchema).array() ]).optional(),
}).strict();

export const DossierCreateManyProprietaireInputSchema: z.ZodType<Prisma.DossierCreateManyProprietaireInput> = z.object({
  id: z.string().optional(),
  nom: z.string(),
  idsDocuments: z.union([ z.lazy(() => DossierCreateidsDocumentsInputSchema), z.string().array() ]).optional(),
  couleur: z.string().optional(),
  icone: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}).strict();

export const DemarcheUtilisateurCreateManyUtilisateurInputSchema: z.ZodType<Prisma.DemarcheUtilisateurCreateManyUtilisateurInput> = z.object({
  id: z.string().optional(),
  idModele: z.string(),
  documentsFournis: z.union([ z.lazy(() => DocumentFourniListCreateEnvelopeInputSchema), z.lazy(() => DocumentFourniCreateInputSchema), z.lazy(() => DocumentFourniCreateInputSchema).array() ]).optional(),
  complete: z.boolean().optional(),
  dateDebut: z.coerce.date().optional(),
  dateCompletion: z.coerce.date().optional().nullable(),
  statut: z.lazy(() => DemarcheStatutSchema).optional(),
  notes: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}).strict();

export const NotificationCreateManyUserInputSchema: z.ZodType<Prisma.NotificationCreateManyUserInput> = z.object({
  id: z.string().optional(),
  type: z.lazy(() => NotificationTypeSchema),
  message: z.string(),
  idDocumentLie: z.string().optional().nullable(),
  lu: z.boolean().optional(),
  dateCreation: z.coerce.date().optional(),
  priorite: z.lazy(() => NotificationPrioriteSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}).strict();

export const UserPreferencesUpdateInputSchema: z.ZodType<Prisma.UserPreferencesUpdateInput> = z.object({
  notifications: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  language: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DocumentUpdateWithoutProprietaireInputSchema: z.ZodType<Prisma.DocumentUpdateWithoutProprietaireInput> = z.object({
  nomFichier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  urlStockage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  idGridFs: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => DocumentTypeSchema), z.lazy(() => EnumDocumentTypeFieldUpdateOperationsInputSchema) ]).optional(),
  statut: z.union([ z.lazy(() => DocumentStatutSchema), z.lazy(() => EnumDocumentStatutFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => DocumentUpdatetagsInputSchema), z.string().array() ]).optional(),
  donneesExtraites: z.union([ z.lazy(() => DonneesExtraitesNullableUpdateEnvelopeInputSchema), z.lazy(() => DonneesExtraitesCreateInputSchema) ]).optional().nullable(),
  dateUpload: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  documentsFournis: z.union([ z.lazy(() => DocumentFourniListUpdateEnvelopeInputSchema), z.lazy(() => DocumentFourniCreateInputSchema), z.lazy(() => DocumentFourniCreateInputSchema).array() ]).optional(),
  dossiers: z.lazy(() => DossierUpdateManyWithoutDocumentsNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUpdateManyWithoutDocumentLieNestedInputSchema).optional(),
}).strict();

export const DocumentUncheckedUpdateWithoutProprietaireInputSchema: z.ZodType<Prisma.DocumentUncheckedUpdateWithoutProprietaireInput> = z.object({
  nomFichier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  urlStockage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  idGridFs: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => DocumentTypeSchema), z.lazy(() => EnumDocumentTypeFieldUpdateOperationsInputSchema) ]).optional(),
  statut: z.union([ z.lazy(() => DocumentStatutSchema), z.lazy(() => EnumDocumentStatutFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => DocumentUpdatetagsInputSchema), z.string().array() ]).optional(),
  donneesExtraites: z.union([ z.lazy(() => DonneesExtraitesNullableUpdateEnvelopeInputSchema), z.lazy(() => DonneesExtraitesCreateInputSchema) ]).optional().nullable(),
  dateUpload: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dossierIds: z.union([ z.lazy(() => DocumentUpdatedossierIdsInputSchema), z.string().array() ]).optional(),
  documentsFournis: z.union([ z.lazy(() => DocumentFourniListUpdateEnvelopeInputSchema), z.lazy(() => DocumentFourniCreateInputSchema), z.lazy(() => DocumentFourniCreateInputSchema).array() ]).optional(),
  dossiers: z.lazy(() => DossierUncheckedUpdateManyWithoutDocumentsNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedUpdateManyWithoutDocumentLieNestedInputSchema).optional(),
}).strict();

export const DocumentUncheckedUpdateManyWithoutProprietaireInputSchema: z.ZodType<Prisma.DocumentUncheckedUpdateManyWithoutProprietaireInput> = z.object({
  nomFichier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  urlStockage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  idGridFs: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => DocumentTypeSchema), z.lazy(() => EnumDocumentTypeFieldUpdateOperationsInputSchema) ]).optional(),
  statut: z.union([ z.lazy(() => DocumentStatutSchema), z.lazy(() => EnumDocumentStatutFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => DocumentUpdatetagsInputSchema), z.string().array() ]).optional(),
  donneesExtraites: z.union([ z.lazy(() => DonneesExtraitesNullableUpdateEnvelopeInputSchema), z.lazy(() => DonneesExtraitesCreateInputSchema) ]).optional().nullable(),
  dateUpload: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dossierIds: z.union([ z.lazy(() => DocumentUpdatedossierIdsInputSchema), z.string().array() ]).optional(),
  documentsFournis: z.union([ z.lazy(() => DocumentFourniListUpdateEnvelopeInputSchema), z.lazy(() => DocumentFourniCreateInputSchema), z.lazy(() => DocumentFourniCreateInputSchema).array() ]).optional(),
}).strict();

export const DossierUpdateWithoutProprietaireInputSchema: z.ZodType<Prisma.DossierUpdateWithoutProprietaireInput> = z.object({
  nom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  couleur: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  icone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  documents: z.lazy(() => DocumentUpdateManyWithoutDossiersNestedInputSchema).optional(),
}).strict();

export const DossierUncheckedUpdateWithoutProprietaireInputSchema: z.ZodType<Prisma.DossierUncheckedUpdateWithoutProprietaireInput> = z.object({
  nom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  idsDocuments: z.union([ z.lazy(() => DossierUpdateidsDocumentsInputSchema), z.string().array() ]).optional(),
  couleur: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  icone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  documents: z.lazy(() => DocumentUncheckedUpdateManyWithoutDossiersNestedInputSchema).optional(),
}).strict();

export const DossierUncheckedUpdateManyWithoutProprietaireInputSchema: z.ZodType<Prisma.DossierUncheckedUpdateManyWithoutProprietaireInput> = z.object({
  nom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  idsDocuments: z.union([ z.lazy(() => DossierUpdateidsDocumentsInputSchema), z.string().array() ]).optional(),
  couleur: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  icone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DemarcheUtilisateurUpdateWithoutUtilisateurInputSchema: z.ZodType<Prisma.DemarcheUtilisateurUpdateWithoutUtilisateurInput> = z.object({
  documentsFournis: z.union([ z.lazy(() => DocumentFourniListUpdateEnvelopeInputSchema), z.lazy(() => DocumentFourniCreateInputSchema), z.lazy(() => DocumentFourniCreateInputSchema).array() ]).optional(),
  complete: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  dateDebut: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dateCompletion: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  statut: z.union([ z.lazy(() => DemarcheStatutSchema), z.lazy(() => EnumDemarcheStatutFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  modele: z.lazy(() => ModeleDemarcheUpdateOneRequiredWithoutDemarchesUtilisateurNestedInputSchema).optional(),
}).strict();

export const DemarcheUtilisateurUncheckedUpdateWithoutUtilisateurInputSchema: z.ZodType<Prisma.DemarcheUtilisateurUncheckedUpdateWithoutUtilisateurInput> = z.object({
  idModele: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  documentsFournis: z.union([ z.lazy(() => DocumentFourniListUpdateEnvelopeInputSchema), z.lazy(() => DocumentFourniCreateInputSchema), z.lazy(() => DocumentFourniCreateInputSchema).array() ]).optional(),
  complete: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  dateDebut: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dateCompletion: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  statut: z.union([ z.lazy(() => DemarcheStatutSchema), z.lazy(() => EnumDemarcheStatutFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DemarcheUtilisateurUncheckedUpdateManyWithoutUtilisateurInputSchema: z.ZodType<Prisma.DemarcheUtilisateurUncheckedUpdateManyWithoutUtilisateurInput> = z.object({
  idModele: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  documentsFournis: z.union([ z.lazy(() => DocumentFourniListUpdateEnvelopeInputSchema), z.lazy(() => DocumentFourniCreateInputSchema), z.lazy(() => DocumentFourniCreateInputSchema).array() ]).optional(),
  complete: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  dateDebut: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dateCompletion: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  statut: z.union([ z.lazy(() => DemarcheStatutSchema), z.lazy(() => EnumDemarcheStatutFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NotificationUpdateWithoutUserInputSchema: z.ZodType<Prisma.NotificationUpdateWithoutUserInput> = z.object({
  type: z.union([ z.lazy(() => NotificationTypeSchema), z.lazy(() => EnumNotificationTypeFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lu: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  dateCreation: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  priorite: z.union([ z.lazy(() => NotificationPrioriteSchema), z.lazy(() => EnumNotificationPrioriteFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  documentLie: z.lazy(() => DocumentUpdateOneWithoutNotificationsNestedInputSchema).optional(),
}).strict();

export const NotificationUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.NotificationUncheckedUpdateWithoutUserInput> = z.object({
  type: z.union([ z.lazy(() => NotificationTypeSchema), z.lazy(() => EnumNotificationTypeFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  idDocumentLie: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lu: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  dateCreation: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  priorite: z.union([ z.lazy(() => NotificationPrioriteSchema), z.lazy(() => EnumNotificationPrioriteFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NotificationUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.NotificationUncheckedUpdateManyWithoutUserInput> = z.object({
  type: z.union([ z.lazy(() => NotificationTypeSchema), z.lazy(() => EnumNotificationTypeFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  idDocumentLie: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lu: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  dateCreation: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  priorite: z.union([ z.lazy(() => NotificationPrioriteSchema), z.lazy(() => EnumNotificationPrioriteFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NotificationCreateManyDocumentLieInputSchema: z.ZodType<Prisma.NotificationCreateManyDocumentLieInput> = z.object({
  id: z.string().optional(),
  idUser: z.string(),
  type: z.lazy(() => NotificationTypeSchema),
  message: z.string(),
  lu: z.boolean().optional(),
  dateCreation: z.coerce.date().optional(),
  priorite: z.lazy(() => NotificationPrioriteSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}).strict();

export const DonneesExtraitesUpdateInputSchema: z.ZodType<Prisma.DonneesExtraitesUpdateInput> = z.object({
  dates: z.union([ z.lazy(() => DonneesExtraitesUpdatedatesInputSchema), z.coerce.date().array() ]).optional(),
  montants: z.union([ z.lazy(() => DonneesExtraitesUpdatemontantsInputSchema), z.number().array() ]).optional(),
  noms: z.union([ z.lazy(() => DonneesExtraitesUpdatenomsInputSchema), z.string().array() ]).optional(),
  adresses: z.union([ z.lazy(() => DonneesExtraitesUpdateadressesInputSchema), z.string().array() ]).optional(),
  autres: z.union([ InputJsonValueSchema,InputJsonValueSchema ]).optional().nullable(),
}).strict();

export const DocumentFourniUpdateInputSchema: z.ZodType<Prisma.DocumentFourniUpdateInput> = z.object({
  typeDocument: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  idDocument: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dateAjout: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DossierUpdateWithoutDocumentsInputSchema: z.ZodType<Prisma.DossierUpdateWithoutDocumentsInput> = z.object({
  nom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  couleur: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  icone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  proprietaire: z.lazy(() => UserUpdateOneRequiredWithoutDossiersNestedInputSchema).optional(),
}).strict();

export const DossierUncheckedUpdateWithoutDocumentsInputSchema: z.ZodType<Prisma.DossierUncheckedUpdateWithoutDocumentsInput> = z.object({
  idProprietaire: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  idsDocuments: z.union([ z.lazy(() => DossierUpdateidsDocumentsInputSchema), z.string().array() ]).optional(),
  couleur: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  icone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DossierUncheckedUpdateManyWithoutDocumentsInputSchema: z.ZodType<Prisma.DossierUncheckedUpdateManyWithoutDocumentsInput> = z.object({
  idProprietaire: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nom: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  idsDocuments: z.union([ z.lazy(() => DossierUpdateidsDocumentsInputSchema), z.string().array() ]).optional(),
  couleur: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  icone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NotificationUpdateWithoutDocumentLieInputSchema: z.ZodType<Prisma.NotificationUpdateWithoutDocumentLieInput> = z.object({
  type: z.union([ z.lazy(() => NotificationTypeSchema), z.lazy(() => EnumNotificationTypeFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lu: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  dateCreation: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  priorite: z.union([ z.lazy(() => NotificationPrioriteSchema), z.lazy(() => EnumNotificationPrioriteFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutNotificationsNestedInputSchema).optional(),
}).strict();

export const NotificationUncheckedUpdateWithoutDocumentLieInputSchema: z.ZodType<Prisma.NotificationUncheckedUpdateWithoutDocumentLieInput> = z.object({
  idUser: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => NotificationTypeSchema), z.lazy(() => EnumNotificationTypeFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lu: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  dateCreation: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  priorite: z.union([ z.lazy(() => NotificationPrioriteSchema), z.lazy(() => EnumNotificationPrioriteFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NotificationUncheckedUpdateManyWithoutDocumentLieInputSchema: z.ZodType<Prisma.NotificationUncheckedUpdateManyWithoutDocumentLieInput> = z.object({
  idUser: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => NotificationTypeSchema), z.lazy(() => EnumNotificationTypeFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lu: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  dateCreation: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  priorite: z.union([ z.lazy(() => NotificationPrioriteSchema), z.lazy(() => EnumNotificationPrioriteFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DocumentUpdateWithoutDossiersInputSchema: z.ZodType<Prisma.DocumentUpdateWithoutDossiersInput> = z.object({
  nomFichier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  urlStockage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  idGridFs: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => DocumentTypeSchema), z.lazy(() => EnumDocumentTypeFieldUpdateOperationsInputSchema) ]).optional(),
  statut: z.union([ z.lazy(() => DocumentStatutSchema), z.lazy(() => EnumDocumentStatutFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => DocumentUpdatetagsInputSchema), z.string().array() ]).optional(),
  donneesExtraites: z.union([ z.lazy(() => DonneesExtraitesNullableUpdateEnvelopeInputSchema), z.lazy(() => DonneesExtraitesCreateInputSchema) ]).optional().nullable(),
  dateUpload: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  documentsFournis: z.union([ z.lazy(() => DocumentFourniListUpdateEnvelopeInputSchema), z.lazy(() => DocumentFourniCreateInputSchema), z.lazy(() => DocumentFourniCreateInputSchema).array() ]).optional(),
  proprietaire: z.lazy(() => UserUpdateOneRequiredWithoutDocumentsNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUpdateManyWithoutDocumentLieNestedInputSchema).optional(),
}).strict();

export const DocumentUncheckedUpdateWithoutDossiersInputSchema: z.ZodType<Prisma.DocumentUncheckedUpdateWithoutDossiersInput> = z.object({
  idProprietaire: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nomFichier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  urlStockage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  idGridFs: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => DocumentTypeSchema), z.lazy(() => EnumDocumentTypeFieldUpdateOperationsInputSchema) ]).optional(),
  statut: z.union([ z.lazy(() => DocumentStatutSchema), z.lazy(() => EnumDocumentStatutFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => DocumentUpdatetagsInputSchema), z.string().array() ]).optional(),
  donneesExtraites: z.union([ z.lazy(() => DonneesExtraitesNullableUpdateEnvelopeInputSchema), z.lazy(() => DonneesExtraitesCreateInputSchema) ]).optional().nullable(),
  dateUpload: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dossierIds: z.union([ z.lazy(() => DocumentUpdatedossierIdsInputSchema), z.string().array() ]).optional(),
  documentsFournis: z.union([ z.lazy(() => DocumentFourniListUpdateEnvelopeInputSchema), z.lazy(() => DocumentFourniCreateInputSchema), z.lazy(() => DocumentFourniCreateInputSchema).array() ]).optional(),
  notifications: z.lazy(() => NotificationUncheckedUpdateManyWithoutDocumentLieNestedInputSchema).optional(),
}).strict();

export const DocumentUncheckedUpdateManyWithoutDossiersInputSchema: z.ZodType<Prisma.DocumentUncheckedUpdateManyWithoutDossiersInput> = z.object({
  idProprietaire: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nomFichier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  urlStockage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  idGridFs: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => DocumentTypeSchema), z.lazy(() => EnumDocumentTypeFieldUpdateOperationsInputSchema) ]).optional(),
  statut: z.union([ z.lazy(() => DocumentStatutSchema), z.lazy(() => EnumDocumentStatutFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => DocumentUpdatetagsInputSchema), z.string().array() ]).optional(),
  donneesExtraites: z.union([ z.lazy(() => DonneesExtraitesNullableUpdateEnvelopeInputSchema), z.lazy(() => DonneesExtraitesCreateInputSchema) ]).optional().nullable(),
  dateUpload: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dossierIds: z.union([ z.lazy(() => DocumentUpdatedossierIdsInputSchema), z.string().array() ]).optional(),
  documentsFournis: z.union([ z.lazy(() => DocumentFourniListUpdateEnvelopeInputSchema), z.lazy(() => DocumentFourniCreateInputSchema), z.lazy(() => DocumentFourniCreateInputSchema).array() ]).optional(),
}).strict();

export const DemarcheUtilisateurCreateManyModeleInputSchema: z.ZodType<Prisma.DemarcheUtilisateurCreateManyModeleInput> = z.object({
  id: z.string().optional(),
  idUtilisateur: z.string(),
  documentsFournis: z.union([ z.lazy(() => DocumentFourniListCreateEnvelopeInputSchema), z.lazy(() => DocumentFourniCreateInputSchema), z.lazy(() => DocumentFourniCreateInputSchema).array() ]).optional(),
  complete: z.boolean().optional(),
  dateDebut: z.coerce.date().optional(),
  dateCompletion: z.coerce.date().optional().nullable(),
  statut: z.lazy(() => DemarcheStatutSchema).optional(),
  notes: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}).strict();

export const DemarcheUtilisateurUpdateWithoutModeleInputSchema: z.ZodType<Prisma.DemarcheUtilisateurUpdateWithoutModeleInput> = z.object({
  documentsFournis: z.union([ z.lazy(() => DocumentFourniListUpdateEnvelopeInputSchema), z.lazy(() => DocumentFourniCreateInputSchema), z.lazy(() => DocumentFourniCreateInputSchema).array() ]).optional(),
  complete: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  dateDebut: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dateCompletion: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  statut: z.union([ z.lazy(() => DemarcheStatutSchema), z.lazy(() => EnumDemarcheStatutFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  utilisateur: z.lazy(() => UserUpdateOneRequiredWithoutDemarchesUtilisateurNestedInputSchema).optional(),
}).strict();

export const DemarcheUtilisateurUncheckedUpdateWithoutModeleInputSchema: z.ZodType<Prisma.DemarcheUtilisateurUncheckedUpdateWithoutModeleInput> = z.object({
  idUtilisateur: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  documentsFournis: z.union([ z.lazy(() => DocumentFourniListUpdateEnvelopeInputSchema), z.lazy(() => DocumentFourniCreateInputSchema), z.lazy(() => DocumentFourniCreateInputSchema).array() ]).optional(),
  complete: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  dateDebut: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dateCompletion: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  statut: z.union([ z.lazy(() => DemarcheStatutSchema), z.lazy(() => EnumDemarcheStatutFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DemarcheUtilisateurUncheckedUpdateManyWithoutModeleInputSchema: z.ZodType<Prisma.DemarcheUtilisateurUncheckedUpdateManyWithoutModeleInput> = z.object({
  idUtilisateur: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  documentsFournis: z.union([ z.lazy(() => DocumentFourniListUpdateEnvelopeInputSchema), z.lazy(() => DocumentFourniCreateInputSchema), z.lazy(() => DocumentFourniCreateInputSchema).array() ]).optional(),
  complete: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  dateDebut: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dateCompletion: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  statut: z.union([ z.lazy(() => DemarcheStatutSchema), z.lazy(() => EnumDemarcheStatutFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DonneesExtraitesUpdatedatesInputSchema: z.ZodType<Prisma.DonneesExtraitesUpdatedatesInput> = z.object({
  set: z.coerce.date().array().optional(),
  push: z.union([ z.coerce.date(),z.coerce.date().array() ]).optional(),
}).strict();

export const DonneesExtraitesUpdatemontantsInputSchema: z.ZodType<Prisma.DonneesExtraitesUpdatemontantsInput> = z.object({
  set: z.number().array().optional(),
  push: z.union([ z.number(),z.number().array() ]).optional(),
}).strict();

export const DonneesExtraitesUpdatenomsInputSchema: z.ZodType<Prisma.DonneesExtraitesUpdatenomsInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const DonneesExtraitesUpdateadressesInputSchema: z.ZodType<Prisma.DonneesExtraitesUpdateadressesInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

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
  limit: z.number().optional(),
}).strict();

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(), 
  limit: z.number().optional(),
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
  limit: z.number().optional(),
}).strict();

export const DocumentDeleteManyArgsSchema: z.ZodType<Prisma.DocumentDeleteManyArgs> = z.object({
  where: DocumentWhereInputSchema.optional(), 
  limit: z.number().optional(),
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
  limit: z.number().optional(),
}).strict();

export const DossierDeleteManyArgsSchema: z.ZodType<Prisma.DossierDeleteManyArgs> = z.object({
  where: DossierWhereInputSchema.optional(), 
  limit: z.number().optional(),
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
  limit: z.number().optional(),
}).strict();

export const ModeleDemarcheDeleteManyArgsSchema: z.ZodType<Prisma.ModeleDemarcheDeleteManyArgs> = z.object({
  where: ModeleDemarcheWhereInputSchema.optional(), 
  limit: z.number().optional(),
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
  limit: z.number().optional(),
}).strict();

export const DemarcheUtilisateurDeleteManyArgsSchema: z.ZodType<Prisma.DemarcheUtilisateurDeleteManyArgs> = z.object({
  where: DemarcheUtilisateurWhereInputSchema.optional(), 
  limit: z.number().optional(),
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
  limit: z.number().optional(),
}).strict();

export const NotificationDeleteManyArgsSchema: z.ZodType<Prisma.NotificationDeleteManyArgs> = z.object({
  where: NotificationWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();