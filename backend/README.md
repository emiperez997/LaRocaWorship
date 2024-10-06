# La Roca Worship

## Backend

Entidades

```prisma
model User {
  id        String     @id @default(uuid())
  username  String     @unique
  firstName String
  lastName  String
  email     String     @unique
  password  String
  role      Role
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt
  lists     List[] // Relación con List
  favorites Favorite[] // Relación con Favorite
}

model List {
  id        String     @id @default(uuid())
  title     String
  userId    String
  user      User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt
  songs     ListSong[] // Relación con ListSong
}

model Song {
  id            String     @id @default(uuid())
  title         String
  lyrics        String
  initialPhrase String?
  artist        String
  category      String?
  status        Status
  originalKey   String
  createdAt     DateTime   @default(now())
  updatedAt     DateTime   @updatedAt
  lists         ListSong[] // Relación con ListSong
  favorites     Favorite[] // Relación con Favorite
}

model ListSong {
  id        String   @id @default(uuid())
  listId    String
  songId    String
  list      List     @relation(fields: [listId], references: [id], onDelete: Cascade)
  song      Song     @relation(fields: [songId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
}

model Favorite {
  id        String   @id @default(uuid())
  userId    String
  songId    String
  savedKey  String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  song      Song     @relation(fields: [songId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
}

// Enum para Role
enum Role {
  user
  admin
}

enum Status {
  pending
  approved
  rejected
}
```

## Progreso

**Entities**

- [x] Entity Song
- [x] Entity User
- [x] Entity List
- [x] Entity Favorite
- [x] Entity Auth

**Features**

- [ ] Add Authentication
- [ ] Protect Routes

## Additions

- [ ] Test API with Rest Client
- [x] `dev.nix` config for `idx` editor
- [x] `settings.json` for `vscode/idx`
- [x] `.env.example` for environment variables
- [ ] Testing with `jest`

