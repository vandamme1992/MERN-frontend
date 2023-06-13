import React, {useEffect} from 'react';

import PopularPosts from "../components/PopularPosts";
import {useDispatch, useSelector} from "react-redux";
import {getAllPost} from "../redux/features/post/postSlice";
import PostItem from "../components/PostItem";



const MainPage = () => {

    const dispatch = useDispatch()
    const {posts, popularPosts} = useSelector((state) => state.posts || '')


    useEffect(() => {
        dispatch(getAllPost())
    }, [dispatch]);

    if (!posts.length) {
        return (
            <div className='text-xl text-white text-center py-10'>Постов не существует</div>
        )
    }

    return (
        <div className='max-w-4xl mx-auto py-10'>
            <div className="flex justify-between gap-8">
                <div className='flex flex-col gap-10 basis-4/5 text-gray-700'>
                    { posts?.map((post, idx)=> <PostItem post={post} key={idx}/>)
                    }

                </div>
                <div className="basis-1/5 text-gray-400">
                    <div className='text-xs uppercase text-white'>Популярное:</div>
                    {
                        popularPosts?.map((post, idx) => (
                            <PopularPosts key={idx} post={post} />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default MainPage;
