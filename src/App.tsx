import axios from 'axios';
import './App.css';
import { useQuery } from 'react-query';

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const fetchUserData = async (): Promise<Todo> => {
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
  return data;
}

function App() {
  const {data, error, isLoading} = useQuery<Todo>('todo', fetchUserData, {
    onError: (err: unknown) => {
      console.log(err);
    }
  });

  if(isLoading) {
    return <p>Carregando...</p>
  }

  if(error) {
    return <p>Erro ao carregar dados...</p>
  }


  return (
      <div className="App">
        <h1>Dados da Empresa</h1>
        <p>User ID: {data?.userId}</p>
        <p>ID: {data?.id}</p>
        <p>Title: {data?.title}</p>
      </div>
  );
}

export default App;
