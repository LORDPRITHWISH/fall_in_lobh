-- CreateTable
CREATE TABLE "website" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "moods" TEXT[],
    "messages" TEXT[],
    "celebrationMediaUrl" TEXT NOT NULL DEFAULT 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExOXdweTYyYWk3ZGp2bDNjcGo5c2QwdnNmN3U0dWFucHo2dmZ1Z2dyMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/DorxfW5xBGSG8bVxRa/giphy.gif',
    "celebrationMessage" TEXT NOT NULL DEFAULT 'Congratulations! we have a date! 🎉',
    "noButtonMessages" TEXT[],
    "webUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "website_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "website_webUrl_key" ON "website"("webUrl");
