import React from 'react'
import { useEffect, useState } from 'react'
import axios from '../utils/axios'
import PostItem from "../components/PostItem";

export const PostsPage = () => {
    const [posts, setPosts] = useState([])

    const fetchMyPosts = async () => {
        try {
            const { data } = await axios.get('/posts/user/me')
            setPosts(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchMyPosts()
    }, [])


    return (
        <div className='w-1/2 mx-auto py-10 flex flex-col gap-10'>

                 { posts.length > 0 ? posts?.map((post, idx) => (
                <PostItem post={post} key={idx} />
            )) :  <div className='text-xl text-white text-center py-10'>Пока что постов нету</div>}
        </div>
    )
}