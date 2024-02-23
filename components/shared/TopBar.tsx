import Image from "next/image";
import Link from "next/link";
import { SignedIn, SignOutButton, OrganizationSwitcher, currentUser } from "@clerk/nextjs";
import { dark } from '@clerk/themes';

export default async function TopBar() {
    const user = await currentUser();
    return (
        <nav className="fixed top-0 z-30 flex w-full items-center justify-between bg-dark-2 px-6 py-3">
            <Link className="flex items-center gap-4" href="/">
                <Image src='/assets/logo.svg' alt="logo" width={28} height={28} />
                <p className="font-bold text-light-1 max-xs:hidden">Threads</p>
            </Link>
            <div className="flex items-center gap-1">
                <div className="block md:hidden">
                    <SignedIn>
                        <SignOutButton>
                            <div className="flex cursor-pointer">
                                <Image src="/assets/logout.svg" width={24} height={24} alt="logout" />
                            </div>
                        </SignOutButton>
                    </SignedIn>
                </div>
                {user ?
                    <OrganizationSwitcher
                        appearance={{
                            baseTheme: dark,
                            elements: {
                                organizationSwitcherTrigger: "py-2 px-4"
                            }
                        }}
                    /> : 
                    <Link href={'/sign-in'} className="flex cursor-pointer gap-4 p-4">
                        <Image src="/assets/logout.svg" width={24} height={24} alt="logout" />
                        <p className="text-light-2 max-lg:hidden">Login</p>
                    </Link>
                    }
            </div>
        </nav>
    )
}
