DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'testUser') THEN
        CREATE ROLE testUser WITH LOGIN PASSWORD 'test@1234';
    END IF;
END $$;

\c userDB

CREATE TABLE IF NOT EXISTS Users (
    Id SERIAL PRIMARY KEY,
    FirstName TEXT NOT NULL,
    LastName TEXT NOT NULL,
    Email TEXT NOT NULL,
    PasswordHash TEXT NOT NULL,
    Issue TEXT NOT NULL
);

ALTER TABLE "Users"
ADD CONSTRAINT "UC_Email" UNIQUE ("Email");

