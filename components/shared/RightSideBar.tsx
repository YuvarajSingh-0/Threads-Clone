import { recommendProfiles } from '@/lib/actions/user.actions'
import { currentUser } from '@clerk/nextjs';
import mongoose, { Document } from 'mongoose';
import { recommendCommunities } from '@/lib/actions/community.actions';
import Link from 'next/link';

interface IUser extends Document {
  id: string;
  username: string;
  name: string;
  image: string;
  bio: string;
  threads: mongoose.Types.ObjectId[];
  onboarded: boolean;
  communities: mongoose.Types.ObjectId[];
}

export default async function RightSideBar() {
  const user = await currentUser();
  if (!user) return null;
  const suggestedUsers = await recommendProfiles(user.id);
  const suggestedCommunities = await recommendCommunities(user.id);
  return (
    <section className={` ${recommendCommunities.length==0 && recommendProfiles.length==0 ? 'hidden':''} custom-scrollbar sticky right-0 top-0 z-20 flex h-screen w-fit min-w-80 flex-col justify-between gap-12 overflow-auto border-l border-l-dark-4 bg-dark-2 px-8 pb-6 pt-28 max-xl:hidden`}>
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-light-1 text-heading4-medium">Suggested Communities</h3>
        {suggestedCommunities.map((community: any) => (

          <Link href={`/communities/${community.id}`} key={community._id} className="border border-dark-4 hover:bg-dark-3 pl-4 py-3 rounded-lg flex items-center gap-4 mt-4">
            <img src={community.image} alt="community" className="w-12 h-12 rounded-full" />
            <div className="flex flex-col">
              <h4 className="text-light-1 text-heading5-medium">{community.name}</h4>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-light-1 text-heading4-medium">Suggested Users</h3>
        {suggestedUsers.map((user: IUser) => (
          <Link href={`/profile/${user.id}`} key={user._id} className="border border-dark-4 hover:bg-dark-3 pl-4 py-3 rounded-lg flex items-center gap-4 mt-4">
            <img src={user.image} alt="user" className="w-12 h-12 rounded-full" />
            <div className="flex flex-col">
              <h4 className="text-light-1 text-heading5-medium">{user.name}</h4>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
