import Image from "next/image"

interface props {
    accountId: string,
    authUserId: string,
    name: string,
    username: string,
    imgUrl: string,
    bio: string,
    type?:string
}

function ProfileHeader({
    accountId,
    authUserId,
    name,
    username,
    imgUrl,
    bio,
    type
}: props) {
    return (
        <div className="flex flex-col w-full justify-start">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="relative rounded-full object-cover h-20 w-20">
                        <Image
                            src={imgUrl}
                            alt="Profile"
                            fill
                            className="rounded-full object-cover"
                        />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-left text-heading3-bold text-light-1">
                            {name}
                        </h2>
                        <p className="text-base-medium text-gray-1">
                            @{username}
                        </p>
                    </div>
                </div>
            </div>
            {/* TODO: Community */}
            <p className="mt-6 text-light-2 max-w-lg text-base-regular ">
                {bio}
            </p>
            <div className="mt-10 bg-dark-3 h-0.5 w-full" />
        </div>
    )
}

export default ProfileHeader