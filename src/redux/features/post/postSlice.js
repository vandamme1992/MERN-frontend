import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

const initialState = {
    posts: [],
    popularPosts: [],
    loading: false,
}

export const createPost = createAsyncThunk('post/createPost', async (params) => {
    try {
        const {data} = await axios.post('/posts', params)
        return data
    } catch (err) {
        console.log(err)
    }
})

export const getAllPost = createAsyncThunk('post/GetAllPosts', async () => {
    try {
        const {data} = await axios.get('/posts')
        return data
    } catch (err) {
        console.log(err)
    }
})

export const removePost = createAsyncThunk('post/removePost', async (id)=> {
    try {
        const {data} = await axios.delete(`/posts/${id}`, id)
        return data
    }catch (err) {
        console.log(err)
    }
})

export const updatePost = createAsyncThunk('post/updatePost', async (updatedPost)=> {
    try {
        const {data} = await axios.put(`/posts/${updatedPost.id}`, updatedPost)
        return data
    }catch (err) {
        console.log(err)
    }
})


export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: {


        //Create Post
        [createPost.pending]: (state) => {
            state.loading = true
        },
        [createPost.fulfilled]: (state, action) => {
            state.loading = true
            state.posts.push(action.payload)
        },
        [createPost.rejected]: (state) => {
            state.loading = false
        },


        //Get All Posts
        [getAllPost.pending]: (state) => {
            state.loading = true
        },
        [getAllPost.fulfilled]: (state, action) => {
            state.loading = false
            state.posts = action.payload.posts
            state.popularPosts = action.payload.popularPosts
        },
        [getAllPost.rejected]: (state) => {
            state.loading = false
        },

        //Delete Post
        [removePost.pending]: (state) => {
            state.loading = true
        },
        [removePost.fulfilled]: (state, action) => {
            state.loading = false
            state.posts = state.posts.filter(post => post.id !== action.payload._id)
        },
        [removePost.rejected]: (state) => {
            state.loading = false
        },

        //Update Post
        [updatePost.pending]: (state) => {
            state.loading = true
        },
        [updatePost.fulfilled]: (state, action) => {
            state.loading = false
            const index = state.posts.findIndex(post => post._id === action.payload.id)
            state.posts[index] = action.payload
        },
        [updatePost.rejected]: (state) => {
            state.loading = false
        },
    }
})

export default postSlice.reducer