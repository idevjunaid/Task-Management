import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Task{
    id: string; // Unique identifier for the task
    title: string; // Title of the task
    description?: string; // Optional description for the task
    project: string; // Project ID (ObjectId reference)
    assignedTo: string; // User ID of the person assigned to the task
    status: 'pending' | 'in-progress' | 'completed' | 'revision'; // Task status
    dueDate?: string; // Optional due date for the task (ISO string format)
    priority: 'low' | 'medium' | 'high'; // Priority of the task
    createdAt: string; // Creation date in ISO string format
    updatedAt: string; // Last updated date in ISO string format
}

interface TaskState {
    tasks: Task[];
}


const initialState:TaskState={
    tasks:[],
}



const taskSlice = createSlice({
    name:'task',
    initialState,
    reducers:{
        addTask(state, action:PayloadAction<Task>){
            state.tasks.push(action.payload)
        },
        updateTask(state, action:PayloadAction<Task>){
            const index = state.tasks.findIndex((task)=>task.id === action.payload.id);
            if(index !== -1){
                state.tasks[index] = action.payload
            }
        },
        removeTask(state,action:PayloadAction<string>){
            state.tasks = state.tasks.filter((task) => task.id !== action.payload)
        },
        setTasks(state, action:PayloadAction<Task[]>){
            state.tasks = action.payload;
        }
    }
})

export const {addTask, updateTask, removeTask, setTasks} = taskSlice.actions;


export default taskSlice.reducer;