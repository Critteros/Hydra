CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;
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
-- CreateTable
CREATE TABLE "RolesOnUser" (
    "user_uid" VARCHAR(256) NOT NULL,
    "role_uid" VARCHAR(256) NOT NULL,
    "assigned_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assigned_by_uid" VARCHAR(256),
    CONSTRAINT "RolesOnUser_pkey" PRIMARY KEY ("user_uid", "role_uid")
);
-- CreateTable
CREATE TABLE "Role" (
    "uid" VARCHAR(256) NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "description" VARCHAR(1024) NOT NULL,
    CONSTRAINT "Role_pkey" PRIMARY KEY ("uid")
);
-- CreateTable
CREATE TABLE "PermissionsOnRoles" (
    "role_uid" VARCHAR(256) NOT NULL,
    "permission_id" VARCHAR(512) NOT NULL,
    "assigned_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assigned_by_uid" VARCHAR(256),
    CONSTRAINT "PermissionsOnRoles_pkey" PRIMARY KEY ("role_uid", "permission_id")
);
-- CreateTable
CREATE TABLE "Permission" (
    "id" VARCHAR(512) NOT NULL,
    "description" VARCHAR(1024) NOT NULL,
    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "Computer" (
    "uid" VARCHAR(256) NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "mac" CITEXT NOT NULL,
    "ipv4" VARCHAR(32),
    "computer_group_id" VARCHAR(256),
    "strategy_uid" TEXT,
    CONSTRAINT "Computer_pkey" PRIMARY KEY ("uid")
);
-- CreateTable
CREATE TABLE "ComputerViewOptions" (
    "id" SERIAL NOT NULL,
    "computer_id" VARCHAR(256) NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "ComputerViewOptions_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "ComputerGroup" (
    "uid" VARCHAR(256) NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "strategy_uid" TEXT,
    CONSTRAINT "ComputerGroup_pkey" PRIMARY KEY ("uid")
);
-- CreateTable
CREATE TABLE "ComputerGroupViewOptions" (
    "id" SERIAL NOT NULL,
    "computer_group_id" VARCHAR(256) NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "ComputerGroupViewOptions_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "IpxeAssets" (
    "uid" VARCHAR(256) NOT NULL,
    "resource_id" VARCHAR(512) NOT NULL,
    "original_filename" VARCHAR(256) NOT NULL,
    "media_path" VARCHAR(256) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,
    "sha256" VARCHAR(256) NOT NULL,
    "file_size" INTEGER NOT NULL,
    "is_entry_valid" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "IpxeAssets_pkey" PRIMARY KEY ("uid")
);
-- CreateTable
CREATE TABLE "IpxeStrategyTemplate" (
    "id" VARCHAR(256) NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "description" VARCHAR(1024) NOT NULL,
    CONSTRAINT "IpxeStrategyTemplate_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "IpxeStrategy" (
    "uid" VARCHAR(256) NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "description" TEXT NOT NULL,
    "strategy_template_id" TEXT NOT NULL,
    "configuration_data" JSON NOT NULL,
    CONSTRAINT "IpxeStrategy_pkey" PRIMARY KEY ("uid")
);
-- CreateTable
CREATE TABLE "GlobalIpxeStrategy" (
    "id" INTEGER NOT NULL DEFAULT 0,
    "strategy_uid" TEXT,
    CONSTRAINT "GlobalIpxeStrategy_pkey" PRIMARY KEY ("id")
);
-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
-- CreateIndex
CREATE INDEX "email_idx" ON "User"("email");
-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");
-- CreateIndex
CREATE UNIQUE INDEX "Computer_name_key" ON "Computer"("name");
-- CreateIndex
CREATE UNIQUE INDEX "Computer_mac_key" ON "Computer"("mac");
-- CreateIndex
CREATE UNIQUE INDEX "Computer_ipv4_key" ON "Computer"("ipv4");
-- CreateIndex
CREATE UNIQUE INDEX "ComputerViewOptions_computer_id_key" ON "ComputerViewOptions"("computer_id");
-- CreateIndex
CREATE UNIQUE INDEX "ComputerGroup_name_key" ON "ComputerGroup"("name");
-- CreateIndex
CREATE UNIQUE INDEX "ComputerGroupViewOptions_computer_group_id_key" ON "ComputerGroupViewOptions"("computer_group_id");
-- CreateIndex
CREATE UNIQUE INDEX "IpxeAssets_resource_id_key" ON "IpxeAssets"("resource_id");
-- CreateIndex
CREATE UNIQUE INDEX "IpxeStrategyTemplate_name_key" ON "IpxeStrategyTemplate"("name");
-- CreateIndex
CREATE UNIQUE INDEX "IpxeStrategy_name_key" ON "IpxeStrategy"("name");
-- CreateIndex
CREATE UNIQUE INDEX "GlobalIpxeStrategy_strategy_uid_key" ON "GlobalIpxeStrategy"("strategy_uid");
-- AddForeignKey
ALTER TABLE "RolesOnUser"
ADD CONSTRAINT "RolesOnUser_user_uid_fkey" FOREIGN KEY ("user_uid") REFERENCES "User"("uid") ON DELETE CASCADE ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "RolesOnUser"
ADD CONSTRAINT "RolesOnUser_role_uid_fkey" FOREIGN KEY ("role_uid") REFERENCES "Role"("uid") ON DELETE CASCADE ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "RolesOnUser"
ADD CONSTRAINT "RolesOnUser_assigned_by_uid_fkey" FOREIGN KEY ("assigned_by_uid") REFERENCES "User"("uid") ON DELETE
SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "PermissionsOnRoles"
ADD CONSTRAINT "PermissionsOnRoles_role_uid_fkey" FOREIGN KEY ("role_uid") REFERENCES "Role"("uid") ON DELETE CASCADE ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "PermissionsOnRoles"
ADD CONSTRAINT "PermissionsOnRoles_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "Permission"("id") ON DELETE CASCADE ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "PermissionsOnRoles"
ADD CONSTRAINT "PermissionsOnRoles_assigned_by_uid_fkey" FOREIGN KEY ("assigned_by_uid") REFERENCES "User"("uid") ON DELETE
SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "Computer"
ADD CONSTRAINT "Computer_computer_group_id_fkey" FOREIGN KEY ("computer_group_id") REFERENCES "ComputerGroup"("uid") ON DELETE
SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "Computer"
ADD CONSTRAINT "Computer_strategy_uid_fkey" FOREIGN KEY ("strategy_uid") REFERENCES "IpxeStrategy"("uid") ON DELETE
SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "ComputerViewOptions"
ADD CONSTRAINT "ComputerViewOptions_computer_id_fkey" FOREIGN KEY ("computer_id") REFERENCES "Computer"("uid") ON DELETE CASCADE ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "ComputerGroup"
ADD CONSTRAINT "ComputerGroup_strategy_uid_fkey" FOREIGN KEY ("strategy_uid") REFERENCES "IpxeStrategy"("uid") ON DELETE
SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "ComputerGroupViewOptions"
ADD CONSTRAINT "ComputerGroupViewOptions_computer_group_id_fkey" FOREIGN KEY ("computer_group_id") REFERENCES "ComputerGroup"("uid") ON DELETE CASCADE ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "IpxeStrategy"
ADD CONSTRAINT "IpxeStrategy_strategy_template_id_fkey" FOREIGN KEY ("strategy_template_id") REFERENCES "IpxeStrategyTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "GlobalIpxeStrategy"
ADD CONSTRAINT "GlobalIpxeStrategy_strategy_uid_fkey" FOREIGN KEY ("strategy_uid") REFERENCES "IpxeStrategy"("uid") ON DELETE
SET NULL ON UPDATE CASCADE;