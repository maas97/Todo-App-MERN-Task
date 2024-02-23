import axios from 'axios';

// Initialize Axios instance with the base URL
const api = axios.create({
  baseURL: 'http://localhost:8090',
});

// Category Interface and Function
export interface Todo {
  _id: string,
  todoTitle: string;
  todoDetails: string;
  isCompleted?: boolean;
}

// Function for todoId
export interface TodoId {
  id: string;
}

export const getAllTodos = async (): Promise<[]> => {
  const response = await api.get('/');
  return response.data;
};

// In case if we want to get a single todo
export const getTodo = async (TodoID: TodoId): Promise<Todo[] | undefined> => {
  if (TodoID) {
    try {
      const response = await api.get(`/${TodoID}`);
      return response.data;
    } catch (error) {
      // Handle error here if needed
      console.error('Error getting todo:', error);
      throw error;
    }
  }
};

export const addTodo = async (todoData: Todo): Promise<number> => {
  try {
    const response = await api.post('/addTodo', todoData);
    return response.data;
  } catch (error) {
    console.error('Error adding todo:', error);
    throw error;
  }
};

export const updateTodo = async (todo: Todo): Promise<boolean> => {
  try {
    const response = await api.put(`/${todo._id}`, {
      todoTitle: todo.todoTitle,
      todoDetails: todo.todoDetails,
      isCompleted: todo.isCompleted
    });
    return response.data;
  } catch (error) {
    // Handle error here if needed
    console.error('Error updating todo:', error);
    throw error;
  }
};

// Function for DeleteTodo endpoint
export const deleteTodo = async (todoId: TodoId): Promise<boolean> => {
  try {
    const response = await api.delete(`/${todoId}`);
    return response.data;
  } catch (error) {
    // Handle error here if needed
    console.error('Error deleting todo:', error);
    throw error;
  }
};
