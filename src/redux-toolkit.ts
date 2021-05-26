import { Todo } from './type.d';
import { createSlice, PayloadAction, configureStore, getDefaultMiddleware ,createAsyncThunk} from "@reduxjs/toolkit";

import { v1 as uuid } from "uuid";
import logger from 'redux-logger';



const todos: Todo[] = [
    {
        id: uuid(),
        desc: "Learn React",
        isCompleted: true
    },
    {
        id: uuid(),
        desc: "Learn Redux",
        isCompleted: true
    },
    {
        id: uuid(),
        desc: "Learn Redux-ToolKit",
        isCompleted: false
    }
];


const todosSlice = createSlice({
    name: "todos",
    initialState: todos,
    reducers: {
        create: {
            reducer: (state, { payload }: PayloadAction<Todo>) => {
                state.push(payload)
            },
            prepare: ({ desc }: { desc: string }) => ({
                payload: {
                    id: uuid(),
                    desc: desc,
                    isCompleted: false

                }
            })
        },
        edit: (state, { payload }: PayloadAction<{ id: string; desc: string }>) => {
            const todoToEdit = state.find(todo => todo.id === payload.id)
            if (todoToEdit) {
                todoToEdit.desc = payload.desc
            }
        },

        toggle: (state, { payload }: PayloadAction<{ id: string; isCompleted: boolean }>) => {
            const todoToToggle = state.find(todo => todo.id === payload.id)
            if (todoToToggle) {
                todoToToggle.isCompleted = payload.isCompleted
            }
        },

        remove: (state, { payload }: PayloadAction<{ id: string }>) => {
            const index = state.findIndex(todo => todo.id === payload.id)
            if (index !== -1) {
                state.splice(index, 1)
            }
        }
    }
})

const selectedTodoSlice = createSlice({
    name: "selectedTodo",
    initialState: null as string | null,
    reducers: {
        select: (state, { payload }: PayloadAction<{ id: string }>) => {
            return payload.id
        }
    }
})

const counterSlice = createSlice({
    name: "counter",
    initialState: 0,
    reducers: {},
    extraReducers: {
        [todosSlice.actions.create.type]: state => state + 1,
        [todosSlice.actions.edit.type]: state => state + 1,
        [todosSlice.actions.toggle.type]: state => state + 1,
        [todosSlice.actions.toggle.type]: state => state + 1
    }
})

export const getPosts=createAsyncThunk(
    "posts/getPosts",async()=>{
        return fetch("https://jsonplaceholder.typicode.com/posts").then(res=>res.json())
    }
)

type WifiState ={
    list:[],
    status:null | string
}

const initialState: WifiState = {
    list: [],
    status:null
   
  }
const postSlice=createSlice({
    name:"posts",
    initialState,
    reducers:{},
    extraReducers:{
         // @ts-ignore
        [getPosts.pending]:(state,action)=>{
            state.status="loading"
        },
        // @ts-ignore
        [getPosts.fulfilled]:(state,action)=>{
            state.list=action.payload
            state.status="success"
        },
        // @ts-ignore
        /* [getPosts.rejected]:(state,action)=>{
            state.list=action.payload,
            state.status="fail"
        }, */

    }
})


export const {
    create: createTodoActionCretaor,
    remove: deleteTodoAction,
    toggle: toggleTodoActionCreator,
    edit: EditTodoActionCreator,

} = todosSlice.actions

export const {
    select: SelectTodoActionCreator
} = selectedTodoSlice.actions

const reducer = {
    todos: todosSlice.reducer,
    selectedTodo: selectedTodoSlice.reducer,
    counter: counterSlice.reducer,
    post:postSlice.reducer
}


const middleware = [...getDefaultMiddleware(),logger]
//const middleware = [logger]
console.log(middleware.map(s=>s))

export const todoActions=todosSlice.actions
export const counterActions =counterSlice.actions

export default configureStore({
    reducer,
    middleware,
 
})

