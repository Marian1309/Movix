### Prerequisites

**Node version >= 16.x**

### Cloning the repository

```shell
git clone https://github.com/Marian1309/Movix
```

### Install packages

```shell
npm i
```

### Setup .env file

```js
# ------------------
# Database
# ------------------

DATABASE_URL = ""

# ------------------
# Auth
# ------------------

GOOGLE_CLIENT_ID = ""
GOOGLE_CLIENT_SECRET = ""

GITHUB_CLIENT_ID = ""
GITHUB_CLIENT_SECRET = ""

NEXTAUTH_SECRET = ""
```

### Setup Prisma

```shell
npx prisma db push
```

### Start the app

```shell
npm run dev
```

## Stack:

- **Framework**:
  [Next.js](https://nextjs.org)
- **Database Providers**:
  [Railway](https://railway.app) | [Supabase](https://supabase.com) |
  [MongoDB](https://www.mongodb.com) | [PlanetScale](https://planetscale.com)
- **ORM**:
  [Prisma](https://www.prisma.io)
- **State Management**:
  [Zustand](https://zustand-demo.pmnd.rs) & [TanStack Query](https://tanstack.com/query)
- **Authentication**:
  [NextAuth.js](https://next-auth.js.org)
- **UI**
  [React-icons](https://react-icons.github.io/react-icons), [React-toastify](https://fkhadra.github.io/react-toastify),
- **Work with Forms**:
  [React-hook-form](https://react-hook-form.com) & [Zod](https://zod.dev)
- **Styling**:
  [Tailwind CSS](https://tailwindcss.com) & [Sass](https://sass-lang.com)
- **Deployment**:
  [Vercel](https://vercel.com) | [Netlify](https://app.netlify.com)
- **Others**:
  [Axios](https://axios-http.com), [Bcrypt](https://github.com/kelektiv/node.bcrypt.js)
