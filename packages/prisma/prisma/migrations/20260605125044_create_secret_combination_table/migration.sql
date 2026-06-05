-- CreateTable
CREATE TABLE "SecretCombination" (
    "id" TEXT NOT NULL,
    "assetOne" "AssetName" NOT NULL,
    "assetTwo" "AssetName",
    "assetThree" "AssetName",
    "assetFour" "AssetName",
    "sound" "Sound" NOT NULL DEFAULT 'NONE',
    "foundById" TEXT,
    "foundByEmail" TEXT,
    "foundAt" TIMESTAMP(3),

    CONSTRAINT "SecretCombination_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SecretCombination_assetOne_assetTwo_assetThree_assetFour_so_key" ON "SecretCombination"("assetOne", "assetTwo", "assetThree", "assetFour", "sound");

-- AddForeignKey
ALTER TABLE "SecretCombination" ADD CONSTRAINT "SecretCombination_foundById_fkey" FOREIGN KEY ("foundById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
