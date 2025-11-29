-- CreateEnum
CREATE TYPE "MessageRole" AS ENUM ('USER', 'ASSISTANT');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "email" VARCHAR(250),
    "created_at_utc" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at_utc" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rooms" (
    "id" TEXT NOT NULL,
    "owner_id" TEXT,
    "userId" TEXT,
    "name" VARCHAR(100) NOT NULL,
    "created_at_utc" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at_utc" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" TEXT NOT NULL,
    "room_id" TEXT NOT NULL,
    "user_id" TEXT,
    "content" TEXT NOT NULL,
    "role" "MessageRole" NOT NULL DEFAULT 'USER',
    "created_at_utc" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at_utc" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ideas" (
    "id" TEXT NOT NULL,
    "room_id" TEXT NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "description" TEXT NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,
    "ai_summary" TEXT,
    "created_at_utc" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at_utc" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ideas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "created_at_utc" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at_utc" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "message_tags" (
    "message_id" TEXT NOT NULL,
    "tag_id" TEXT NOT NULL,

    CONSTRAINT "message_tags_pkey" PRIMARY KEY ("message_id","tag_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "rooms_name_key" ON "rooms"("name");

-- CreateIndex
CREATE INDEX "rooms_owner_id_idx" ON "rooms"("owner_id");

-- CreateIndex
CREATE INDEX "messages_room_id_idx" ON "messages"("room_id");

-- CreateIndex
CREATE INDEX "messages_user_id_idx" ON "messages"("user_id");

-- CreateIndex
CREATE INDEX "ideas_room_id_idx" ON "ideas"("room_id");

-- CreateIndex
CREATE UNIQUE INDEX "tags_name_key" ON "tags"("name");

-- AddForeignKey
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ideas" ADD CONSTRAINT "ideas_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message_tags" ADD CONSTRAINT "message_tags_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "messages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message_tags" ADD CONSTRAINT "message_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
