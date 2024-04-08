# Base

## Getting Started

Create supabase project and set the environment variables:

※ Copy the Database password

```bash
cp .env.example .env.local
```

※ You can get the `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` from the supabase project settings.

Login to supabase and run the migrations:

```bash
supabase login
supabase migration up --linked
```

First, run the development server:

```bash
pnpm dev
pnpm storybook
```

### Prerequisites

- NodeJS v20+
- pnpm v8+

## Build With

- [nextjs](https://nextjs.org/)
- [tailwindcss](https://tailwindcss.com/)
- [daisyui](https://daisyui.com/)
- [pnpm](https://pnpm.io/)
- [typescript](https://www.typescriptlang.org/)
- [react](https://reactjs.org/)
- [zx](https://github.com/google/zx)
- [storybook](https://storybook.js.org/)
