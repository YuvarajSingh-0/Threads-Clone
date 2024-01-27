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

export async function fetchPosts(pageNumber = 1, pageSize = 20) {
    connectToDB();
    const skipAmount = (pageNumber - 1) * pageSize;
    const postsQuery = Thread.find({ parentId: { $in: [null, undefined] } })
        .sort({ createdAt: 'desc' })
        .skip(skipAmount)
        .limit(pageSize)
        .populate({ path: 'author', model: User })
        .populate({
            path: 'children', populate: {
                path: 'author',
                model: User,
                select: '_id name parentId image'
            }
        })
    const totalPostsCount = await Thread.countDocuments({ parentId: { $in: [null, undefined] } })
    const posts = await postsQuery.exec(); //since there os populate in the query, that should be followed by this exec() method
    const isNext = totalPostsCount > skipAmount + posts.length;
    return { posts, isNext }

}

export async function fetchThreadById(threadId: string) {
    connectToDB();
    try {
        const thread = await Thread.findById(threadId)
            .populate({ path: 'author', model: User, select: "_id id name image" })
            .populate({
                path: 'children', populate: [{ path: 'author', model: User, select: "_id id name parentId image" },
                { path: 'children', model: Thread, populate: { path: 'author', model: User, select: "_id id name parentId image" } }]
            }).exec();
        return thread;
    } catch (err) {
        console.log(err);
        return null;
    }
}

export async function addCommentToThread(threadId: string, commentText: string, userId: string, path: string) {
    connectToDB();
    try{
        const thread = await Thread.findById(threadId);
        if(!thread) {
            throw new Error("Thread not found");
        }
        const commentThread=new Thread({
            text: commentText,
            author:userId,
            parentId: threadId

        })
        const savedCommentThread=await commentThread.save();
        thread.children.push(savedCommentThread._id);
        await thread.save();
        revalidatePath(path);
    }catch(err){
        console.log(err);
        return null;
    }
}