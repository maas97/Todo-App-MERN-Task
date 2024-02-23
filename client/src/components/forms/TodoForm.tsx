import { SubmitHandler, useForm } from 'react-hook-form';
import { addTodo } from '../../constants/API';
import { TextInput } from './Inputs';
import { useMutation, useQueryClient } from 'react-query';

  function TodoForm() {

        interface FormInputTypes {
            todoTitle: string;
            todoDetails: string;
          }

          const {
            register,
            handleSubmit,
            formState: { errors },
          } = useForm<FormInputTypes>();

          const queryClient = useQueryClient();

          const {mutate: createTodos} = useMutation((createTodos)=>{
              return addTodo(createTodos)
          }, {
              onSettled: ()=>{
                  queryClient.invalidateQueries("todos")
              }
          })

        const onSubmit: SubmitHandler<FormInputTypes> = async (data) => {
            createTodos(data)
        }

        return (
          
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="my-container mb-2 overflow-x-hidden flex justify-items-around items-center w-full mt-16 h-32"
          noValidate
        >
          
          <h2 className="text-center text-xl font-bold">
            Title
          </h2>
            {/* todoTitle  */}
            <TextInput
              name="todoTitle"
              register={register}
              rules={{
                required: {
                  value: true,
                  message: 'Todo Title is Required',
                },
              }}
              error={errors.todoTitle}
            />
            {/* todoDetails  */}
            <h2 className="text-center text-xl font-bold">
            Details
            </h2>
            <TextInput
              name="todoDetails"
              register={register}
              rules={{
                required: {
                  value: false,
                  message: '',
                },
              }}
              error={errors.todoDetails}
            />
            <button className='border-2 border-secondary rounded-large mx-auto font-bold text-base w-32 h-12 hover:bg-primary hover:text-bright transition-colors duration-500'> Add </button>
        </form>
        );
  }
  
  export default TodoForm;