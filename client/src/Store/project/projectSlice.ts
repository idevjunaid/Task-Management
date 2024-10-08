// src/features/projects/projectSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the shape of the project state
interface Project {
  id: string; // Project ID
  name: string;
  description: string;
  status: 'not started' | 'in progress' | 'completed' | 'on hold';
  priority: 'low' | 'medium' | 'high';
  startDate?: string; // Using string to handle dates easily
  endDate?: string;
  assignedUsers: string[]; // Array of user IDs
}

interface ProjectState {
  projects: Project[];
}

// Initial state
const initialState: ProjectState = {
  projects: [],
};

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    // Add a new project
    addProject(state, action: PayloadAction<Project>) {
      state.projects.push(action.payload);
    },
    // Update an existing project
    updateProject(state, action: PayloadAction<Project>) {
      const index = state.projects.findIndex(
        (project) => project.id === action.payload.id
      );
      if (index !== -1) {
        state.projects[index] = action.payload;
      }
    },
    // Remove a project by ID
    removeProject(state, action: PayloadAction<string>) {
      state.projects = state.projects.filter(
        (project) => project.id !== action.payload
      );
    },
    // Set all projects (useful for initializing the state from backend data)
    setProjects(state, action: PayloadAction<Project[]>) {
      state.projects = action.payload;
    },
  },
});

// Export actions for use in components
export const { addProject, updateProject, removeProject, setProjects } = projectSlice.actions;

// Export the reducer to be added to the store
export default projectSlice.reducer;
