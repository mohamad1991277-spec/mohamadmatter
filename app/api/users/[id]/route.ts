import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.citizen.delete({
            where: { id },
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting record' }, { status: 500 });
    }
}
