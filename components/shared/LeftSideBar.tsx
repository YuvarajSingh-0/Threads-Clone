"use client";

import Link from "next/link";
import { sidebarLinks } from '@/constants';
import Image from "next/image";
import { usePathname, useRouter } from 'next/navigation';
import { SignedIn, SignOutButton, useAuth } from "@clerk/nextjs";

export default function LeftSideBar() {
  const pathname = usePathname();
  const router = useRouter();
  const { userId } = useAuth();

  return (
    <section className=" custom-scrollbar sticky left-0 top-0 z-20 flex h-screen w-fit flex-col justify-between overflow-auto border-r border-r-dark-4 bg-dark-2 pb-5 pt-28 max-md:hidden">
      <div className="flex w-full flex-1 flex-col gap-5 px-5">
        {sidebarLinks.map((link) => {

          const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;
          if (link.route === '/profile') link.route = `/profile/${userId}`;
          return (<Link href={link.route} key={link.label} className={`relative flex justify-start gap-4 rounded-lg p-4 ${isActive && 'bg-primary-500'}`}>
            <Image src={link.imgURL} alt={link.label} width={24} height={24} />
            <p className="text-light-1 max-lg:hidden">{link.label}</p>
          </Link>
          )
        })}
      </div>
      <div className="mt-10 px-6">
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push('sign-in')}>
            <div className="flex cursor-pointer gap-4 p-4">
              <Image src="/assets/logout.svg" width={24} height={24} alt="logout" />
              <p className="text-light-2 max-lg:hidden">Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  )
}
