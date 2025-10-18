# Unidox Backend API Documentation

## Base URL
```
http://localhost:5000/api
```

## Response Format

All API responses follow this standard format:

```json
{
  "success": true|false,
  "message": "Optional message",
  "data": {}, // Response data
  "count": 0, // For list endpoints
  "error": "Error details if any"
}
```

---

## Users API

### Get All Users
```
GET /api/users
```

**Response:**
```json
{
  "success": true,
  "data": [...],
  "count": 10
}
```

### Get User by ID
```
GET /api/users/:id
```

### Get User Profile (with documents)
```
GET /api/users/:id/profile
```

### Create User
```
POST /api/users
Content-Type: application/json

{
  "email": "user@example.com",
  "nom": "John Doe",
  "password": "securepassword",
  "urlAvatar": "https://example.com/avatar.jpg"
}
```

### Update User
```
PUT /api/users/:id
Content-Type: application/json

{
  "nom": "Jane Doe",
  "urlAvatar": "https://example.com/new-avatar.jpg"
}
```

### Delete User
```
DELETE /api/users/:id
```

---

## Documents API

### Get User Documents
```
GET /api/documents?userId=USER_ID
```

### Search Documents
```
GET /api/documents/search?userId=USER_ID&type=FACTURE&statut=VERIFIE&tags=tag1,tag2&search=invoice
```

**Query Parameters:**
- `userId` (required): User ID
- `type`: Document type (FACTURE, CONTRAT, etc.)
- `statut`: Document status (VERIFIE, EN_ATTENTE, etc.)
- `tags`: Comma-separated tags
- `search`: Search in filename

### Get Document by ID
```
GET /api/documents/:id?userId=USER_ID
```

### Create Document
```
POST /api/documents
Content-Type: application/json

{
  "proprietaire": {
    "connect": { "id": "USER_ID" }
  },
  "nomFichier": "invoice.pdf",
  "type": "FACTURE",
  "size": 1024000,
  "tags": ["invoice", "2024"]
}
```

### Update Document
```
PUT /api/documents/:id
Content-Type: application/json

{
  "userId": "USER_ID",
  "nomFichier": "updated-invoice.pdf",
  "tags": ["invoice", "2024", "paid"]
}
```

### Update Document Status
```
PATCH /api/documents/:id/status
Content-Type: application/json

{
  "userId": "USER_ID",
  "statut": "VERIFIE"
}
```

### Add Tags to Document
```
POST /api/documents/:id/tags
Content-Type: application/json

{
  "userId": "USER_ID",
  "tags": ["new-tag", "another-tag"]
}
```

### Remove Tags from Document
```
DELETE /api/documents/:id/tags
Content-Type: application/json

{
  "userId": "USER_ID",
  "tags": ["tag-to-remove"]
}
```

### Delete Document
```
DELETE /api/documents/:id
Content-Type: application/json

{
  "userId": "USER_ID"
}
```

---

## Dossiers (Folders) API

### Get User Dossiers
```
GET /api/dossiers?userId=USER_ID
```

### Get Dossier Statistics
```
GET /api/dossiers/stats?userId=USER_ID
```

### Get Dossier by ID
```
GET /api/dossiers/:id?userId=USER_ID
```

### Create Dossier
```
POST /api/dossiers
Content-Type: application/json

{
  "proprietaire": {
    "connect": { "id": "USER_ID" }
  },
  "nom": "My Folder",
  "couleur": "#3B82F6",
  "icone": "folder",
  "idsDocuments": []
}
```

### Update Dossier
```
PUT /api/dossiers/:id
Content-Type: application/json

{
  "userId": "USER_ID",
  "nom": "Updated Folder Name",
  "couleur": "#EF4444"
}
```

### Add Documents to Dossier
```
POST /api/dossiers/:id/documents
Content-Type: application/json

{
  "userId": "USER_ID",
  "documentIds": ["DOC_ID_1", "DOC_ID_2"]
}
```

### Remove Documents from Dossier
```
DELETE /api/dossiers/:id/documents
Content-Type: application/json

{
  "userId": "USER_ID",
  "documentIds": ["DOC_ID_1"]
}
```

### Delete Dossier
```
DELETE /api/dossiers/:id
Content-Type: application/json

{
  "userId": "USER_ID"
}
```

---

## Notifications API

### Get User Notifications
```
GET /api/notifications?userId=USER_ID&unreadOnly=true
```

**Query Parameters:**
- `userId` (required): User ID
- `unreadOnly`: Filter unread notifications (true/false)

### Get Unread Count
```
GET /api/notifications/unread-count?userId=USER_ID
```

### Get Notification by ID
```
GET /api/notifications/:id?userId=USER_ID
```

### Create Notification
```
POST /api/notifications
Content-Type: application/json

{
  "user": {
    "connect": { "id": "USER_ID" }
  },
  "type": "EXPIRATION",
  "message": "Your document will expire soon",
  "priorite": "HAUTE"
}
```

### Mark Notification as Read
```
PATCH /api/notifications/:id/read
Content-Type: application/json

{
  "userId": "USER_ID"
}
```

### Mark All Notifications as Read
```
PATCH /api/notifications/read-all
Content-Type: application/json

{
  "userId": "USER_ID"
}
```

### Delete Notification
```
DELETE /api/notifications/:id
Content-Type: application/json

{
  "userId": "USER_ID"
}
```

### Delete All Read Notifications
```
DELETE /api/notifications/read
Content-Type: application/json

{
  "userId": "USER_ID"
}
```

---

## Enums

### DocumentType
- FACTURE
- CONTRAT
- CARTE_IDENTITE
- PASSEPORT
- JUSTIFICATIF_DOMICILE
- ACTE_NAISSANCE
- ACTE_MARIAGE
- DIPLOME
- ATTESTATION_TRAVAIL
- FICHE_PAIE
- RELEVE_BANCAIRE
- ASSURANCE
- PERMIS_CONDUIRE
- CARTE_VITALE
- AUTRE

### DocumentStatut
- VERIFIE
- EN_ATTENTE
- EXPIRE
- REFUSE

### NotificationType
- EXPIRATION
- RAPPEL
- INFO
- ALERTE

### NotificationPriorite
- BASSE
- NORMALE
- HAUTE

---

## Error Handling

All errors follow this format:

```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error information"
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `409` - Conflict (e.g., duplicate entry)
- `500` - Internal Server Error

---

## Health Check

```
GET /health
```

**Response:**
```json
{
  "status": "OK",
  "message": "Unidox API is running"
}
```
