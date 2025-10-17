# Unidox - Modèle de Données (MongoDB)

Ce document décrit les principales entités de la base de données pour le MVP Unidox, inspirées des besoins fonctionnels et du design Figma.

---


## Utilisateur
- _id
- email
- nom
- urlAvatar
- authentification (OAuth Google, JWT)
- dateInscription
- preferences

## Document
- _id
- idProprietaire (référence Utilisateur)
- nomFichier
- urlStockage / idGridFs
- type (facture, contrat, carte d'identité, etc.)
- statut (vérifié, en attente, expiré)
- tags (tableau)
- donneesExtraites (dates, montants, noms, adresses, etc. — via Gemini)
- apercu (miniature, preview)
- dateUpload

## Dossier
- _id
- idProprietaire (référence Utilisateur)
- nom
- idsDocuments (tableau de références Document)

## ModeleDemarche (admin)
- _id
- titre
- typesDocumentsRequis (tableau de strings)

## DemarcheUtilisateur (instance utilisateur)
- _id
- idUtilisateur (référence Utilisateur)
- idModele (référence ModeleDemarche)
- documentsFournis (tableau d'objets { typeDocument, idDocument })
- complete (booléen)

> Les **ModeleDemarche** sont créés par les admins. Les utilisateurs créent une **DemarcheUtilisateur** à partir d'un modèle pour fournir les documents requis. Quand tous les types requis sont fournis, `complete=true` et le téléchargement est disponible.


## Notification
- _id
- idUser (référence Utilisateur)
- type (expiration, rappel, info)
- message
- idDocumentLie (optionnel)
- lu (booléen)
- dateCreation

---

## Relations entre Utilisateur, Dossier, Document et Démarche

- Un **Utilisateur** possède ses propres **Dossiers**, **Documents** et **Démarches** (champ `idProprietaire`).
- Un **Dossier** regroupe plusieurs **Documents** appartenant au même utilisateur.
- Une **Démarche** est liée à un utilisateur et peut contenir plusieurs documents (champ `idsDocumentsAttaches`).
- Les **Notifications** sont associées à l'utilisateur et peuvent pointer vers un document spécifique.

Chaque entité est reliée à l'utilisateur via une référence (`idProprietaire` ou `idUtilisateur`).

---

Ce modèle est volontairement simple et pourra évoluer selon les retours utilisateurs et les besoins du produit.
