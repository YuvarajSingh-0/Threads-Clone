import { currentUser } from "@clerk/nextjs";
import { redirect } from 'next/navigation'
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import Image from "next/image";
import UserCard from "@/components/cards/UserCard";


async function page() {
    const user = await currentUser();
    if (!user) return null;
    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect('/onboarding')
    const result=await fetchUsers({
        userId:user.id,
        pageNumber:1,
        pageSize:10,
        searchString:'',
    });
  return (
    <section>
          <h1 className="text-heading2-bold text-light-1">Search</h1>
        {/* search bar */}
          <div className='mt-14 flex flex-col gap-9'>
              {result.users.length === 0 ? (
                  <p className='no-result'>No Result</p>
              ) : (
                  <>
                      {result.users.map((person) => (
                          <UserCard
                              key={person.id}
                              id={person.id}
                              name={person.name}
                              username={person.username}
                              imgUrl={person.image}
                              personType='User'
                          />
                      ))}
                  </>
              )}
          </div>

    </section>
  )
}

export default page