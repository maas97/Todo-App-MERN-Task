import { useQuery } from 'react-query';
import {getAllTodos} from '../../constants/API';
import { ClipLoader } from 'react-spinners';
import List from '../../components/ui/Lists/List'
import TodoForm from '../../components/forms/TodoForm'


function Home() {

  const { isLoading, data: todos} = useQuery<[], Error>(
    'todos', () => getAllTodos(),
    {
        staleTime: 0, refetchOnMount: false, refetchOnWindowFocus: false
    }
);
 
  return (
    <div className='flex flex-col justify-center  h-full'>
      <TodoForm />
      <div className='w-full p-8 flex flex-col justify-center items-center '>
        { isLoading ? 
            <ClipLoader className='' color='orange' size={150}/>
            :
              todos && 
                todos.data && 
                  todos.data.map((todo) => (
                      <List key={`randomTodo-${todo._id}`} todo={todo} />
        ))
        }
      </div>
      
    </div>
  );
}

export default Home;
