# Démarches Feature

This feature implements the "Mes Démarches" (My Procedures) page for managing administrative procedures.

## 📁 Structure

```
features/demarches/
├── actions.ts                    # Server actions for data fetching
├── index.ts                      # Barrel exports
├── services/
│   └── demarche.service.ts      # Business logic
├── types/
│   └── schemas.ts               # TypeScript types & Zod schemas
└── ui/
    ├── components/
    │   ├── DemarcheCard.tsx     # Folder-style card component
    │   └── DemarcheGrid.tsx     # Grid layout container
    └── pages/
        └── DemarchesPage.tsx    # Main page component
```

## 🎯 Features

- **Grid View**: Displays procedures in a responsive grid (5 columns on desktop)
- **Folder Design**: Cards styled as blue folders matching Figma design
- **Status Badges**: 
  - "Vide" (Empty) for EN_COURS status
  - "Vidé" (Completed) for COMPLETE status
  - "Expirée" (Expired) for ABANDONNEE status
- **File Count**: Shows number of files per procedure
- **Search**: Real-time search filtering
- **Stats**: Quick overview cards showing totals and status counts

## 🔧 Components

### DemarcheCard
Individual folder-style card matching Figma specifications:
- Width: 181px
- Height: 160px
- Blue gradient folder background
- Status and file count badges
- Clickable to navigate to detail page

### DemarcheGrid
Responsive grid container:
- 5 columns on XL screens
- 4 columns on LG screens
- 3 columns on MD screens
- 2 columns on base/SM screens
- Empty state when no demarches

### DemarchesPage
Main page with:
- Header with folder icon and title
- "Commencer une démarche" button
- Search bar
- Statistics cards
- Grid of procedure cards

## 🎨 Design Tokens

Colors from theme:
- Folder background: `primary.400` → `primary.500` gradient
- Status badges: White background with colored text
- Text: `neutral.700` for titles

## 🗄️ Database

Uses existing Prisma models:
- `ModeleDemarche`: Procedure templates
- `DemarcheUtilisateur`: User procedure instances

## 🚀 Usage

### Route
Access at `/demarches`

### Seeding Test Data
```bash
npx tsx prisma/seed-demarches.ts
```

This creates:
- 5 procedure models (AAH, Visa, Location, Autoentreprise, CAF)
- 15 sample procedure instances for the first user

## 📝 TODO / Future Enhancements

- [ ] Demarche detail page (`/demarches/[id]`)
- [ ] Modal for starting new demarche (select from models)
- [ ] Document linking to procedures
- [ ] Progress tracking/stepper
- [ ] Advanced filtering (by category, status)
- [ ] Sorting options
- [ ] Bulk actions
- [ ] Archive functionality

## 🔗 Related Features

- `/features/admin` - ModeleDemarche management
- `/features/documents` - Document management
- `/features/search` - Already integrated with demarches
