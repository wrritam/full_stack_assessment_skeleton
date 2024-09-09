-- CreateTable
CREATE TABLE "home" (
    "id" SERIAL NOT NULL,
    "street_address" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "sqft" DOUBLE PRECISION,
    "beds" INTEGER,
    "baths" INTEGER,
    "list_price" DOUBLE PRECISION,
    "userid" INTEGER NOT NULL,

    CONSTRAINT "home_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_home" (
    "username" VARCHAR(100),
    "email" VARCHAR(100),
    "street_address" VARCHAR(255),
    "state" VARCHAR(50),
    "zip" VARCHAR(10),
    "sqft" DOUBLE PRECISION,
    "beds" INTEGER,
    "baths" INTEGER,
    "list_price" DOUBLE PRECISION
);

-- AddForeignKey
ALTER TABLE "home" ADD CONSTRAINT "home_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
