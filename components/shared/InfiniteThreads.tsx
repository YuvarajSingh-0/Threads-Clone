"use client";

import { fetchPosts } from "@/lib/actions/thread.actions";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import ThreadCard from "../cards/ThreadCard";

function InfiniteThreads({ userId }: { userId: string }) {
    const [page, setPage] = useState(1)
    const [result, setResult] = useState({ posts: [], isNext: true })
    const [ref, inView] = useInView();
    const loadMorePosts = async () => {
        const res = await fetchPosts(page, 5)
        setResult({ posts: result.posts.concat(res.posts), isNext: res.isNext })
        console.log(result.posts)
        setPage(page + 1)
    }
    useEffect(() => {
        if (inView) loadMorePosts()
    }, [inView])

    return (
        <>
            {result.posts.length === 0 ? (
                <p>No threads found</p>
            ) : (
                result.posts.map((post: any) => (
                    <ThreadCard key={post._id} id={post._id} currentUserId={userId || ""} parentId={post.parentId} content={post.text} author={post.author} community={post.community} createdAt={post.createdAt} comments={post.children} likes={post.likes} />
                ))
            )}
            {/* <svg ref={ref} xmlns="http://www.w3.org/2000/svg" version="1.1" width="512px" height="512px" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd" xmlns:xlink="http://www.w3.org/1999/xlink">
                <g><path  fill="#5C5C7B" d="M 94.5,28.5 C 210.5,28.3333 326.5,28.5 442.5,29C 454.53,33.434 455.53,39.7674 445.5,48C 436.981,49.0544 428.481,49.8878 420,50.5C 373.818,120.677 327.651,190.844 281.5,261C 326.703,329.902 372.036,398.736 417.5,467.5C 426.482,468.332 435.482,468.832 444.5,469C 454.139,474.632 454.806,481.299 446.5,489C 328.581,490.663 210.581,490.996 92.5,490C 87.1499,486.629 85.3165,481.796 87,475.5C 87.3459,473.152 88.5125,471.319 90.5,470C 99.3104,468.876 108.144,468.043 117,467.5C 163.043,398.58 209.209,329.747 255.5,261C 208.876,190.919 162.376,120.752 116,50.5C 108.913,49.6851 101.747,49.1851 94.5,49C 87.8521,46.4263 85.3521,41.593 87,34.5C 88.7074,31.4096 91.2074,29.4096 94.5,28.5 Z M 139.5,50.5 C 224.332,49.3343 309.332,49.1676 394.5,50C 352.458,113.919 310.291,177.752 268,241.5C 225.639,177.423 182.806,113.756 139.5,50.5 Z M 267.5,278.5 C 276.557,290.926 285.391,303.592 294,316.5C 327.167,367 360.333,417.5 393.5,468C 309.167,468.667 224.833,468.667 140.5,468C 183.055,404.952 225.388,341.785 267.5,278.5 Z" /></g>
                <g><path  fill="#5C5C7B" d="M 206.5,67.5 C 247.501,67.3333 288.501,67.5 329.5,68C 340.275,74.8169 339.942,81.1502 328.5,87C 288.167,87.6667 247.833,87.6667 207.5,87C 199.299,83.6266 197.465,78.1266 202,70.5C 203.652,69.6006 205.152,68.6006 206.5,67.5 Z" /></g>
                <g><path  fill="#5C5C7B" d="M 228.5,105.5 C 255.502,105.333 282.502,105.5 309.5,106C 315.995,107.846 318.162,112.012 316,118.5C 314.881,122.071 313.215,125.404 311,128.5C 299.422,143.99 288.088,159.657 277,175.5C 273.791,178.688 269.958,180.688 265.5,181.5C 258.586,180.416 255.752,176.416 257,169.5C 266.465,155.403 276.298,141.57 286.5,128C 266.833,127.667 247.167,127.333 227.5,127C 220.68,122.539 219.18,116.706 223,109.5C 224.812,108.023 226.645,106.69 228.5,105.5 Z" /></g>
                <g><path  fill="#5C5C7B" d="M 266.5,338.5 C 276.373,339.925 279.207,345.258 275,354.5C 266.167,366.667 257.333,378.833 248.5,391C 267.833,391.333 287.167,391.667 306.5,392C 308.081,392.707 309.581,393.54 311,394.5C 312.853,398.111 314.02,401.944 314.5,406C 314.097,408.887 312.764,411.221 310.5,413C 282.833,413.667 255.167,413.667 227.5,413C 223.5,411.333 221.5,408.333 221.5,404C 221.952,400.591 223.119,397.424 225,394.5C 236.333,377.167 247.667,359.833 259,342.5C 261.255,340.501 263.755,339.168 266.5,338.5 Z" /></g>
                <g><path  fill="#5C5C7B" d="M 209.5,429.5 C 248.501,429.333 287.501,429.5 326.5,430C 335.921,432.343 338.754,437.843 335,446.5C 333.127,448.709 330.96,450.542 328.5,452C 288.5,452.667 248.5,452.667 208.5,452C 200.114,448.725 197.614,442.892 201,434.5C 203.398,431.892 206.231,430.225 209.5,429.5 Z" /></g>
            </svg> */}
            {result.isNext && <button ref={ref} className="text-[#5C5C7B] mx-auto">Loading...</button>}
        </>

    )
}

export default InfiniteThreads