import { XCircle } from 'lucide-react';
import {Todo} from '../../../constants/API';
import { updateTodo, deleteTodo } from '../../../constants/API';
import { useQueryClient, useMutation } from 'react-query';

function List({todo}: { todo: Todo }) {
   
    const queryClient = useQueryClient();

    const {mutate: updateTodos} = useMutation((updateTodos)=>{
        return updateTodo(updateTodos)
    }, {
        onSettled: ()=>{
            queryClient.invalidateQueries("todos")
        }
    })

    const {mutate: deleteTodos} = useMutation((todoId)=>{
        return deleteTodo(todoId)
    }, {
        onSettled: ()=>{
            queryClient.invalidateQueries("todos")
        }
    })
    

    return (
        <div className={`rounded-large w-full border ${todo.isCompleted ? 'border-primary' : 'border-secondary' } mt-4 flex p-4 items-center justify-around`}>
            {
                todo &&
                <>
                    <input type='checkbox' checked={todo.isCompleted} className='w-6 h-6 accent-primary' onChange={()=>{updateTodos({...todo, isCompleted: !todo.isCompleted})}} />
                    <input title="Click here to edit" type='text' value={todo.todoTitle}  className={`text-primary rounded-medium  w-1/4 text-lg font-bold ${
                                                                            todo.isCompleted ? 'line-through' : 'text-secondary' } `} onChange={(e)=>{updateTodos({...todo, todoTitle: e.target.value})}} />
                    <input title="Click here to edit" type='text' value={todo.todoDetails} className={`text-primary text-sm rounded-medium  w-1/4 font-bold ${
                                                                            todo.isCompleted ? 'line-through' : 'text-secondary' }`} onChange={(e)=>{updateTodos({...todo, todoDetails: e.target.value})}}/>
                    <XCircle className={`cursor-pointer ${todo.isCompleted ? 'text-primary' : 'text-secondary' } `} onClick={()=>{deleteTodos(todo?._id)}}/>
                </> 
            }
        </div>
      );

}

export default List;
