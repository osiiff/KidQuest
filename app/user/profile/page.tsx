import { auth } from '@/auth';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import ProfileForm from './profile-form';

export const metadata: Metadata = {
    title: 'User Profile'
}

const ProfilePage = async () => {
    const session = await auth();
    if (!session?.user?.id) redirect('/sign-in');
    return ( 
            <div className='max-w-md mx-auto space-y-4 p-5'>
                <h2 className='hero-title text-5xl'> 
                    Profile
                </h2>
                <ProfileForm user={{name: session.user.name ?? '', email: session.user.email ?? ''}}/>
            </div>
     );
}
 
export default ProfilePage;
