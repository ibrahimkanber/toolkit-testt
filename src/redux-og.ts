import { Todo } from "./type";
import {v1 as uuid} from "uuid"
import { applyMiddleware, combineReducers, createStore } from "redux";
import {composeWithDevTools} from "redux-devtools-extension"
import logger from "redux-logger";
//constants
const CREATE_TODO= "CREATE_TODO";
const EDIT_TODO="EDIT_TODO";
const TOGGLE_TODO="TOGGLE_TODO";
const DELETE_TODO="DELETE_TODO";
const SELECT_TODO="SELECT_TODO";

//Actions & Action Type

interface CreateTodoActionType{
    type:typeof CREATE_TODO;
    payload:Todo

}

export const createTodoActionCretaor=({desc}:{desc:string}):CreateTodoActionType=>{


    return{
        type:CREATE_TODO,
        payload:{
            id:uuid(),
            desc:desc,
            isCompleted:false

        }
    }
}

interface EditTodoActionType{
    type:typeof EDIT_TODO;
    payload:{id:string,desc:string}

}

export const EditTodoActionCreator=({id,desc}:{id:string,desc:string}):EditTodoActionType=>{

    return{
        type:EDIT_TODO,
        payload:{
            id,
            desc
        }
    }
}

interface ToggleTodoActionType{
    type:typeof TOGGLE_TODO;
    payload:{id:string,isCompleted:boolean}
}

export const toggleTodoActionCreator=({id,isCompleted}:{id:string,isCompleted:boolean}):ToggleTodoActionType=>{

    return{
        type:TOGGLE_TODO,
        payload:{id,isCompleted}

    }
}

interface DeleteTodoActionType{
    type:typeof DELETE_TODO;
    payload:{id:string}
}


export const deleteTodoAction=({id}:{id:string}):DeleteTodoActionType=>{

    return{
        type:DELETE_TODO,
        payload:{id}
    }
}

interface SelectTodoActionType{
    type:typeof SELECT_TODO;
    payload:{id:string}
}


export const SelectTodoActionCreator=({id}:{id:string}):SelectTodoActionType=>{

    return {
        type:SELECT_TODO,
        payload:{id}
    }
}

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

type todoActionTypes=CreateTodoActionType| EditTodoActionType| ToggleTodoActionType| DeleteTodoActionType | SelectTodoActionType

const todosReducer=(state:Todo[]=todos,action:todoActionTypes)=>{
    switch (action.type) {
        case CREATE_TODO:
            return [...state,action.payload]
        case EDIT_TODO:
            return state.map(todo=>todo.id===action.payload.id ? {...todo,desc:action.payload.desc}:todo)
        case TOGGLE_TODO:
            return state.map(todo=>todo.id===action.payload.id? {...todo,isCompleted:action.payload.isCompleted}:todo)
        case DELETE_TODO:
            return state.filter(todo=>todo.id!==action.payload.id)
        default:
            return state;
    }
}

type SelectedTodoActionType=SelectTodoActionType

const selectedTodoReducer=(state :string|null=null,
    action:SelectedTodoActionType)=>{

        switch (action.type) {
            case SELECT_TODO:
                return action.payload.id 
                
            default:
                return state
        }
}
const counterReducer=(state :number=0,
    action:todoActionTypes)=>{

        switch (action.type) {
            case SELECT_TODO:
                return state+1
            case EDIT_TODO:
                return state+1
            case TOGGLE_TODO:
                return state+1
            case DELETE_TODO:
                return state+1  
            default:
                return state
        }
}

const reducers=combineReducers({
    todos:todosReducer,
    selectedTodo:selectedTodoReducer,
    counter:counterReducer
})


export default createStore(reducers,composeWithDevTools(applyMiddleware(logger)))