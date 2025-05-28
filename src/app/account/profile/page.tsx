import { Title } from '@/components/ui/title'
import FormEditProfile from '../components/FormEditProfile'
import { cookies } from 'next/headers';
import { decrypt } from '@/app/login/utils/session';

export default async function ProfilePage() {
  const cookie = (await cookies()).get("session")?.value;
  const session = cookie ? await decrypt(cookie): null;

  return (
    <>
      <Title>Perfil</Title>

      <FormEditProfile user={session!.user}/>
    </>
  )
}
