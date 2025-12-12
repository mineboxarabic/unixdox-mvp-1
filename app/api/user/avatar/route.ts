import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/shared/config/prisma';
import { auth } from '@/auth';

export async function GET(req: NextRequest) {
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

    // Assuming image is stored as base64 data URI (data:image/jpeg;base64,...)
    // We need to parse it to serve as a proper image response
    const matches = user.image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

    if (!matches || matches.length !== 3) {
        // If it's a URL (e.g. Google), redirect to it OR if it's invalid
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
            'Cache-Control': 'public, max-age=3600, must-revalidate',
        },
    });
}
