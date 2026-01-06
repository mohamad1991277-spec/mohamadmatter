-- CreateTable
CREATE TABLE "Citizen" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fullName" TEXT NOT NULL,
    "dob" DATETIME NOT NULL,
    "gender" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "need" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
