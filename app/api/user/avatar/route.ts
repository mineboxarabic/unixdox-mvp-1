import { NextResponse } from 'next/server';
import { prisma } from '@/shared/config/prisma';
import { auth } from '@/auth';
import { isPrismaConnectivityError } from '@/shared/utils/prisma-errors';

export async function GET() {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: { image: true },
        });

        if (!user?.image) {
            return new NextResponse('Not found', { status: 404 });
        }

        const matches = user.image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

        if (!matches || matches.length !== 3) {
            if (user.image.startsWith('http')) {
                return NextResponse.redirect(user.image);
            }
            return new NextResponse('Invalid image data', { status: 400 });
        }

        const type = matches[1];
        const buffer = Buffer.from(matches[2], 'base64');

        return new NextResponse(buffer, {
            headers: {
                'Content-Type': type,
                'Cache-Control': 'no-cache, no-store, must-revalidate',
            },
        });
    } catch (error) {
        if (isPrismaConnectivityError(error)) {
            console.warn('Avatar unavailable: database is temporarily unreachable.');
            return new NextResponse(null, {
                status: 204,
                headers: {
                    'Cache-Control': 'no-cache, no-store, must-revalidate',
                },
            });
        }

        console.error('Failed to fetch user avatar', error);
        return new NextResponse('Internal server error', { status: 500 });
    }
}
