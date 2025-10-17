# Event-management

<!-- Environment variable: -->

PORT=3000

# This was inserted by `prisma init`:

# Environment variables declared in this file are automatically made available to Prisma.

# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.

# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

# The following `prisma+postgres` URL is similar to the URL produced by running a local Prisma Postgres

# server with the `prisma dev` CLI command, when not choosing any non-default ports or settings. The API key, unlike the

# one found in a remote Prisma Postgres URL, does not contain any sensitive information.

DATABASE_URL="postgres://postgres:user@localhost:5432/omnify"

<!-- ------------------------- -->




Inside this we have two folders:
1. frontend
2. backend

<!-- To start frontend -->

step 1: cd ./frontend
step 2: npm i
step 3 npm run dev


<!-- To start backend-->

step 1: cd ./backend
step 2: npm i
step 3: before running the npm run start, create the .env file in the backend in root path, and COPY the Environment varable at the top as given.
step 4: npx prisma generate
step 5: npx prisma migrate dev
step 6: npm run start


<!-- To Look through the apis inside the swagger-->
Once the backend is running,
go to http://localhost:3000/api-docs



