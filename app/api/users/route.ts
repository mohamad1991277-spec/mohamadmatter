import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const userSchema = z.object({
    fullName: z.string().min(2),
    dob: z.string(),
    gender: z.string(),
    city: z.string(),
    area: z.string(),
    mobile: z.string(),
    need: z.string(),
});

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    try {
        const json = await request.json();
        const body = userSchema.parse(json); // Validate

        const citizen = await prisma.citizen.create({
            data: {
                fullName: body.fullName,
                dob: new Date(body.dob),
                gender: body.gender,
                city: body.city,
                area: body.area,
                mobile: body.mobile,
                need: body.need,
            },
        });
        return NextResponse.json(citizen);
    } catch (error: any) {
        console.error("Error creating user:", error);
        return NextResponse.json(
            { error: 'Error creating record', details: error.message },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const citizens = await prisma.citizen.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json(citizens);
    } catch (error: any) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ error: 'Error fetching records', details: error.message }, { status: 500 });
    }
}
