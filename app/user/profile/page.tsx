import { auth } from '@/auth';
import { Metadata } from 'next';
import {SessionProvider} from 'next-auth/react'
import ProfileForm from './profile-form';

export const metadata: Metadata = {
    title: 'User Profile'
}

const ProfilePage = async () => {
    const session = await auth();
    return ( 
        <SessionProvider session={session}>
            <div className='max-w-md mx-auto space-y-4 p-5'>
                <h2 className='hero-title text-5xl'> 
                    Profile
                </h2>
                <ProfileForm/>
            </div>
        </SessionProvider>
     );
}
 
export default ProfilePage;