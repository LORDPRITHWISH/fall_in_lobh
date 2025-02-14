import prisma from "@/app/lib/prisma";
import { websiteSchema } from "@/schema/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = websiteSchema.safeParse(body);

    if (!data.success) {
      return NextResponse.json({ error: data.error.errors }, { status: 400 });
    }

    const domainExists = await prisma.website.findUnique({
      where: {
        webUrl: data.data.webUrl,
      },
      select: {
        webUrl: true,
      },
    });

    if (domainExists) {
      return NextResponse.json({ error: "domain already exists" }, { status: 400 });
    }

    const createWebsite = await prisma.website.create({
      data: data.data,
    });

    return NextResponse.json(
      {
        success: true,
        createWebsite,
        message: "Website created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating website:", error);
    return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ error: "id is missing" }, { status: 400 });
  }
  try {
    const website = await prisma.website.findFirst({
      where: {
        OR: [{ id: !isNaN(Number(query)) ? parseInt(query) : undefined }, { webUrl: `https://${query}.myvalentine.live` }],
      },
    });

    if (!website) {
      return NextResponse.json({ success: false, message: "Website not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, website }, { status: 200 });
  } catch (error) {
    console.error("Error fetching website:", error);
    return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });
  }
}
