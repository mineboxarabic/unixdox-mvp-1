# Unidox - MVP Documentation

## � Design Figma
Le design de l'application est déjà disponible sur Figma :
[Figma Unidox v.3](https://www.figma.com/design/jwMpm70UOdmUmdB6iPejAt/Unidox-v.3?node-id=1-33&p=f&t=HSrbhGTnCoS20GLm-0)

## �🎯 Objectif
Unidox est une application web qui centralise et automatise la gestion des documents et démarches administratives.  
Le MVP vise à valider l’intérêt utilisateur et poser les bases techniques : import, classification et gestion intelligente des documents.

---

## 🚀 Fonctionnalités Clés du MVP
1. **Gestion Utilisateurs**
   - Connexion/inscription via OAuth Google.
   - Onboarding guidé pour configurer l’espace personnel.

2. **Gestion Documents**
   - Upload de fichiers (glisser-déposer ou sélection via Multer/Express).
   - Stockage sécurisé via **MongoDB** ou **Google Cloud Storage**.
   - **Traitement IA automatique** : Le document uploadé est transmis à **Gemini Flash 1.5** qui analyse le contenu et retourne :
     - Type de document (facture, contrat, carte d'identité, etc.)
     - Dates importantes (échéances, validité)
     - Données structurées (montants, noms, adresses, etc.)
     - Tags et classification automatiques
   - Visualisation des documents (tableau clair : type, date, statut, tags).
   - Vérification documentaire (statut *Vérifié* visible).

3. **Recherche & Organisation**
   - Barre de recherche unifiée (par nom, type, tags).
   - Création de dossiers regroupant plusieurs documents pour une démarche donnée.

4. **Démarches Administratives (POC)**
   - Sélection d’une démarche type depuis une liste.
   - Wizard pour collecter les infos nécessaires.
   - Génération automatique d’un brouillon de courrier/pdf.
   - Possibilité d’attacher les documents existants.

5. **Notifications & Rappels (POC)**
   - Alertes automatiques pour documents arrivant à expiration.
   - Suivi des échéances via le tableau de bord.

---

## 🛠️ Stack Technique (MERN)
- **Frontend** : React + Chakra UI (UI responsive, mobile-first).
- **Backend** : 
  - Node.js + Express.js (API REST).
  - MongoDB (base de données NoSQL pour documents et métadonnées).
- **Langage** : TypeScript (Frontend & Backend).
- **IA / Analyse Documentaire** : 
  - **Gemini Flash 1.5** (Google AI) : Le document uploadé est envoyé à Gemini Flash 1.5 qui extrait automatiquement les données nécessaires (type de document, dates, informations clés, classification).
  - OCR intégré via Gemini pour traitement des documents scannés.
- **Stockage Fichiers** : 
  - MongoDB GridFS ou stockage cloud (Google Cloud Storage / AWS S3).
  - Possibilité d'utiliser Multer pour gérer les uploads côté Express.
- **Authentification** : JWT + Passport.js (OAuth Google).
- **Hébergement** : 
  - Frontend : Vercel ou Netlify.
  - Backend : Railway, Render ou AWS EC2.
  - Database : MongoDB Atlas (cloud managé).
- **Tests** : Jest, React Testing Library, Supertest (API), Playwright (E2E).

---

## 📋 Contraintes
- **RGPD** : Minimisation des données, consentement explicite, droit à l'oubli.
- **Techniques** :
  - Intégration API Gemini Flash 1.5 (quotas, latence, coûts).
  - Gestion de la charge serveur Node.js/Express pour uploads volumineux.
  - Sécurisation des endpoints API (validation, rate limiting).
- **Design** : Chakra UI (adapté à notre identité graphique et aux normes WCAG).

---

## 🗄️ Entités principales (MongoDB)

Voici les entités principales prévues pour la base de données :

- **User** : informations utilisateur, authentification, préférences.
- **Document** : fichier, type, statut, tags, données extraites, propriétaire.
- **Folder** : organisation des documents par dossiers.
- **Procedure** : démarches administratives, étapes, documents liés.
- **Notification** : rappels et alertes pour l'utilisateur.

Chaque entité reste simple et adaptée au MVP.



## Pages
- Accueil / Connexion
- Inscription
- Mot de passe oublié
- Confirmation de réinitialisation
- Tableau de bord
- Dossiers / Documents
- Détails document
- Ajouter un document
- Éditer un document
- Démarches
- Profil utilisateur
- Paramètres
- Page d’erreur / accès refusé
- Chargement (OAuth redirect)
- Déconnexion / session expirée




## infos
- we will have a lists of demarches in the app that are added by the admins and then users will make click on a demarche to get and collect the needed documents for this demarche if we have all the documents we can download if not we need to give the needed documents