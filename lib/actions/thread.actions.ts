"use server";

import { revalidatePath } from "next/cache";
import { connectToDB } from "../mongoose";
import Thread from "../models/thread.model";
import User from "../models/user.model";

interface params {
    text: string,
    author: string,
    communityId: string | null,
    path: string
}
export async function createThread({ text, author, communityId, path }: params) {
    connectToDB();
    const createdThread = await Thread.create({
        text, author, community: null
    });
    await User.findByIdAndUpdate(author, {
        $push: { threads: createdThread._id }
    })
    revalidatePath(path);
}