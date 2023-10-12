-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('STANDARD', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "uid" TEXT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(512) NOT NULL,
    "name" VARCHAR(255),
    "account_type" "AccountType" NOT NULL DEFAULT 'STANDARD',

    CONSTRAINT "User_pkey" PRIMARY KEY ("uid")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "email_idx" ON "User"("email");
