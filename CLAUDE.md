# Chat Rooms — Real-time Chat App

## Stack

- **Client**: Preact + Vite + Tailwind CSS v4 + React Router + Axios + Supabase JS
- **Server**: Express v5 + TypeScript + PostgreSQL (via pg) + Supabase Realtime + JWT Auth
- **Monorepo**: root `package.json` with `concurrently`

## Commands

```bash
npm run dev          # runs server + client in parallel
npm run dev:server   # server only (nodemon, port 3000)
npm run dev:client   # client only (vite, port 5173)
npm run install:all  # installs dependencies for server and client
```

## Environment Variables

### Server (`server/.env`)
```
PORT=3000
NODE_ENV=development
DB_HOST=
DB_PORT=6543
DB_USER=
DB_PASSWORD=
DB_NAME=postgres
SUPABASE_URL=
SUPABASE_KEY=
```

### Client (`client/.env`)
```
VITE_SUPABASE_URL=
VITE_SUPABASE_KEY=
VITE_API_URL=        # production only, dev uses vite proxy
```

## Architecture

### Server

```
server/src/
  app.ts                          # Express app, routes, middleware
  config/
    index.ts                      # environment variables
    database.ts                   # pg Pool + initDb()
    supabase.ts                   # Supabase client (server-side)
  shared/
    types/
      creator.ts                  # Creator { userName, email } — shared type across features
  middlewares/
    authMiddleware.ts             # validates Bearer token with supabase.auth.getUser()
    errorsMiddleware.ts           # error handling with @hapi/boom
  features/
    auth/
      auth.router.ts             # POST /login, POST /register, POST /refresh
      auth.controller.ts
      auth.service.ts            # login, register, refreshSession via Supabase Auth
      auth.types.ts
    rooms/
      room.router.ts             # GET /, POST /, GET /:id, DELETE /:id
      room.controller.ts
      room.service.ts            # CRUD rooms + broadcast room-created/room-deleted via Supabase
      room.types.ts              # Room, RoomWithCreator
    messages/
      message.router.ts          # GET /, POST / (mounted at /api/rooms/:roomId/messages)
      message.controller.ts
      message.service.ts         # create/list messages + broadcast new-message via Supabase
      message.types.ts           # Message, MessageWithCreator
```

**Pattern**: each feature has router → controller → service → types. Controllers validate input, services hold business logic and SQL queries.

**Routes mounted in app.ts**:
- `/api/auth` → auth.router
- `/api/rooms` → room.router
- `/api/rooms/:roomId/messages` → message.router (with `mergeParams: true`)

**Supabase Realtime (server → client, fire-and-forget)**:
- Channel `rooms`: events `room-created`, `room-deleted` (global room list)
- Channel `room:{roomId}`: events `new-message`, `room-deleted` (inside a room)

**Database**: PostgreSQL via Supabase. Tables in `public` schema (always use `public.` prefix). Auth in `auth.users` schema (Supabase Auth).

### Client

```
client/src/
  main.tsx                             # render
  app.tsx                              # BrowserRouter + routes with auth guards
  types.ts                             # AuthData, Creator, Room, Message
  hooks/
    useSupabase.tsx                    # Supabase client (client-side)
  utils/
    storage.ts                        # localStorage helpers for auth
  providers/
    UserProvider.tsx                    # auth state (login/logout), reads/writes localStorage
    AxiosProvider.tsx                   # axios instance with baseURL, auto token refresh
    ToastProvider.tsx                   # toast notifications with auto-dismiss
    RoomsProvider.tsx                   # room list state: fetch, create, delete, broadcast subscription
    ChatProvider.tsx                    # chat state: messages, room, send, broadcast subscription
  pages/
    LoginPage.tsx                      # login form
    RegisterPage.tsx                   # register form
    RoomsPage.tsx                      # room list (consumes useRooms)
    ChatPage.tsx                       # room chat (consumes useChat)
  components/
    AuthForm/AuthForm.tsx              # auth layout wrapper
    AuthInput/AuthInput.tsx            # labeled input field
    SubmitButton/SubmitButton.tsx      # submit button with loading state
    RoomForm/RoomForm.tsx              # create room form
    RoomList/RoomList.tsx              # room list with loading/empty states
    RoomItem/RoomItem.tsx              # single room row with QR and delete buttons
    QrModal/QrModal.tsx                # QR code modal for sharing room URL
    ChatHeader/ChatHeader.tsx          # chat header with back button and room info
    ChatInput/ChatInput.tsx            # message input with internal state
    MessageList/MessageList.tsx        # message list with empty state
    MessageBubble/MessageBubble.tsx    # single message bubble
    EmptyState/EmptyState.tsx          # reusable empty state with icon, title, subtitle
```

**Provider pattern**: each provider encapsulates state + fetch + Supabase subscription. Pages only consume hooks (`useRooms`, `useChat`) and render JSX.

**Routes** (in app.tsx):
- `/login` → LoginPage (no auth)
- `/register` → RegisterPage (no auth)
- `/rooms` → RoomsProvider > RoomsPage (requires auth)
- `/rooms/:id` → ChatProvider > ChatPage (requires auth)

**Dev proxy**: vite.config.ts proxies `/api` → `http://localhost:3000`. In production uses `VITE_API_URL`.

## Conventions

- Use `export const X = () =>` for all components, providers, and hooks (not `export function`)
- **One component per file**. Each `.tsx` file must export exactly one component. Split into separate files when a component grows sub-components.
- **No DOM events in callback props**. Props like `onDelete`, `onSubmit`, `onQr` must not receive `Event` objects. Handle `e.stopPropagation()` / `e.preventDefault()` at the call site (inside the component that owns the DOM element), then call the clean callback with only data arguments.
- Preact: use `preact/hooks`, `preact/compat` for React libraries
- CSS: Tailwind CSS v4 with `@import "tailwindcss"` + CSS variables for design system
- HTTP errors: `@hapi/boom` on the server
- SQL queries: use `json_build_object` for JOINs returning nested objects
- Supabase broadcasts: fire-and-forget from the server (no await at the caller)
- Client dedup: use setState callback (`prev.some(...)`) to avoid duplicates from broadcast

## Deploy

- **Client**: Vercel (SPA with rewrites in `client/vercel.json`)
- **Server**: Vercel as serverless (exports `app` from app.ts, no `listen` in production)
