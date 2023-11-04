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

    CONSTRAINT "PermissionsOnRoles_pkey" PRIMARY KEY ("role_uid","permission_id")
);

-- CreateTable
CREATE TABLE "Permission" (
    "id" VARCHAR(512) NOT NULL,
    "description" VARCHAR(1024) NOT NULL,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- AddForeignKey
ALTER TABLE "PermissionsOnRoles" ADD CONSTRAINT "PermissionsOnRoles_role_uid_fkey" FOREIGN KEY ("role_uid") REFERENCES "Role"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermissionsOnRoles" ADD CONSTRAINT "PermissionsOnRoles_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "Permission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermissionsOnRoles" ADD CONSTRAINT "PermissionsOnRoles_assigned_by_uid_fkey" FOREIGN KEY ("assigned_by_uid") REFERENCES "User"("uid") ON DELETE SET NULL ON UPDATE CASCADE;
