import { ResponseData } from '@/app/types';
import { prisma } from '@/utils/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request): Promise<NextResponse<ResponseData>> 
{
  const token = request.headers.get('authorization')?.replace('Bearer ', '');

  if (!token) {
    return NextResponse.json({ success: false, message: 'Not authenticated', valid: false }, { status: 401 });
  }

   const dbSession = await prisma.sessions.findUnique({
      where: {
        token: token,
        revokedAt: null,
        expiresAt: {
          gt: new Date(),
        }
      },
  });

  if(dbSession){
    return NextResponse.json({ success: true, message: 'Token valido', valid: true }, { status: 200 });
  }else{
    return NextResponse.json({ success: false, message: 'Token invalido', valid: false }, { status: 401 });
  }
}