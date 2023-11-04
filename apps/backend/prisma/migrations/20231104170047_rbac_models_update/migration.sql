-- DropForeignKey
ALTER TABLE "PermissionsOnRoles" DROP CONSTRAINT "PermissionsOnRoles_permission_id_fkey";

-- DropForeignKey
ALTER TABLE "PermissionsOnRoles" DROP CONSTRAINT "PermissionsOnRoles_role_uid_fkey";

-- CreateTable
CREATE TABLE "RolesOnUser" (
    "user_uid" VARCHAR(256) NOT NULL,
    "role_uid" VARCHAR(256) NOT NULL,
    "assigned_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assigned_by_uid" VARCHAR(256),

    CONSTRAINT "RolesOnUser_pkey" PRIMARY KEY ("user_uid","role_uid")
);

-- AddForeignKey
ALTER TABLE "RolesOnUser" ADD CONSTRAINT "RolesOnUser_user_uid_fkey" FOREIGN KEY ("user_uid") REFERENCES "User"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolesOnUser" ADD CONSTRAINT "RolesOnUser_role_uid_fkey" FOREIGN KEY ("role_uid") REFERENCES "Role"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolesOnUser" ADD CONSTRAINT "RolesOnUser_assigned_by_uid_fkey" FOREIGN KEY ("assigned_by_uid") REFERENCES "User"("uid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermissionsOnRoles" ADD CONSTRAINT "PermissionsOnRoles_role_uid_fkey" FOREIGN KEY ("role_uid") REFERENCES "Role"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermissionsOnRoles" ADD CONSTRAINT "PermissionsOnRoles_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "Permission"("id") ON DELETE CASCADE ON UPDATE CASCADE;
