import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const citizens: any[] = await prisma.citizen.findMany();

        // Total
        const total = citizens.length;

        // Gender
        const males = citizens.filter(c => c.gender === 'MALE').length;
        const females = citizens.filter(c => c.gender === 'FEMALE').length;

        // Age Groups
        const now = new Date();
        const ageGroups = {
            '0-12': 0,
            '13-18': 0,
            '19-30': 0,
            '31-50': 0,
            '50+': 0
        };

        citizens.forEach(c => {
            const birthDate = new Date(c.dob);
            let age = now.getFullYear() - birthDate.getFullYear();
            const m = now.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && now.getDate() < birthDate.getDate())) {
                age--;
            }

            if (age <= 12) ageGroups['0-12']++;
            else if (age <= 18) ageGroups['13-18']++;
            else if (age <= 30) ageGroups['19-30']++;
            else if (age <= 50) ageGroups['31-50']++;
            else ageGroups['50+']++;
        });

        // Location (City) - Top 5
        const cityMap: Record<string, number> = {};
        citizens.forEach(c => {
            cityMap[c.city] = (cityMap[c.city] || 0) + 1;
        });
        const cityStats = Object.entries(cityMap).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);

        // Needs - Top 5
        const needMap: Record<string, number> = {};
        citizens.forEach(c => {
            needMap[c.need] = (needMap[c.need] || 0) + 1;
        });
        const needStats = Object.entries(needMap).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);

        return NextResponse.json({
            total,
            gender: { males, females },
            ageGroups,
            cityStats,
            needStats
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error fetching stats' }, { status: 500 });
    }
}
