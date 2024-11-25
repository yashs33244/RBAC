This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started


if you dont have docker use public db url -> from neon db 
-> DATABASE_URL="postgresql://neondb_owner:Hb9NA8CenDyp@ep-royal-poetry-a50hsdgr.us-east-2.aws.neon.tech/neondb?sslmode=require"

### else run 

```
    docker run -d \     
    --name rbac \
    -e POSTGRES_USER=postgres \
    -e POSTGRES_PASSWORD=mysecretpassword \
    -e POSTGRES_DB=rbac \
    -p 5432:5432 \
    postgres
```
and the db url will be -> postgres://postgres:mysecretpassword@localhost:5432/rbac

* cp .env.example .env
 get the                GOOGLE_CLIENT_SECRET=
                        GOOGLE_CLIENT_ID=
                        GOOGLE_API_KEY=
                        DATABASE_URL=

from google 

### Install
* pnpm install
* npx prisma generate

### Run

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.


deployed on vercel
```
https://rbac-assignment-teal.vercel.app/
```



## admin credentials
* admin123@gmail.com
* admin1234

