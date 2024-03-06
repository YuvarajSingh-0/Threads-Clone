import { currentUser } from "@clerk/nextjs";
import { redirect } from 'next/navigation'
import { fetchUser, getReplies } from "@/lib/actions/user.actions";
import Image from "next/image";
import UserCard from "@/components/cards/UserCard";
import Link from "next/link";

async function Page() {
    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetchUser(user.id);
    if (!userInfo.onboarded) redirect('/onboarding');

    const activity = await getReplies(userInfo._id);
    return (
        <section>
            <h1 className="text-heading2-bold text-light-1">Activity</h1>
            <section className='mt-10 flex flex-col gap-5'>
                {activity.length > 0 ? (
                    <>
                        {activity.map((activity) => (

                            <Link key={activity._id} href={`/thread/${activity.parentId}`}>
                                <article className="flex items-center gap-2 rounded-md bg-dark-2 px-7 py-4">
                                    <Image src={activity.author.image} alt="profile pic" width={20} height={20} className="rounded-full object-cover" />
                                    <p className="!text-small-regular text-light-1">
                                        <span className="mr-1 text-primary-500">{activity.author.name}</span>{" "}
                                        replied to your thread
                                    </p>
                                </article>
                            </Link>
                        ))}
                    </>
                ) : <p>No Activity yet</p>}
            </section>
        </section>
    )
}

export default Page;