-- CreateTable
CREATE TABLE "Computer" (
    "id" VARCHAR(256) NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "mac" VARCHAR(64) NOT NULL,
    "ipv4" VARCHAR(32),
    "computer_group_id" VARCHAR(256),

    CONSTRAINT "Computer_pkey" PRIMARY KEY ("id")
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
    "id" VARCHAR(256) NOT NULL,
    "name" VARCHAR(256) NOT NULL,

    CONSTRAINT "ComputerGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ComputerGroupViewOptions" (
    "id" SERIAL NOT NULL,
    "computer_group_id" VARCHAR(256) NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ComputerGroupViewOptions_pkey" PRIMARY KEY ("id")
);

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

-- AddForeignKey
ALTER TABLE "Computer" ADD CONSTRAINT "Computer_computer_group_id_fkey" FOREIGN KEY ("computer_group_id") REFERENCES "ComputerGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComputerViewOptions" ADD CONSTRAINT "ComputerViewOptions_computer_id_fkey" FOREIGN KEY ("computer_id") REFERENCES "Computer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComputerGroupViewOptions" ADD CONSTRAINT "ComputerGroupViewOptions_computer_group_id_fkey" FOREIGN KEY ("computer_group_id") REFERENCES "ComputerGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
