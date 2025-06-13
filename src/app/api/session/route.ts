import { decrypt } from '@/app/login/utils/session';
import { ResponseData } from '@/app/types';
import { prisma } from '@/utils/prisma';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse<ResponseData>>
{
  const cookie = (await cookies()).get("session")?.value;
  const session = cookie ? await decrypt(cookie) : null;

  if (!session) {
    return NextResponse.json({ success: false, message: 'Not authenticated', valid: false, session: null, twofactoreRequired: null }, { status: 401 });
  }

  const systemConfig = await prisma.systemConfigure.findUnique({
    select:{
      twofactoreRequired: true
    },
    where: {
      id: 1
    }
  });

  const dbSession = await prisma.sessions.findUnique({
      where: {
        token: cookie,
        revokedAt: null,
        expiresAt: {
          gt: new Date(),
        }
      },
  });

  if(dbSession){
    return NextResponse.json({ success: true, message: 'Token valido', valid: true, session: session, twofactoreRequired: systemConfig!.twofactoreRequired }, { status: 200 });
  }else{
    return NextResponse.json({ success: false, message: 'Token invalido', valid: false, session: null,  twofactoreRequired: null}, { status: 401 });
  }
}