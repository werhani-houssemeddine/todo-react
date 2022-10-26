import { useState, useEffect } from 'react';
import TodoList from './TodoList';
import Form from './Form';

function Main() {
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    fetch('http://localhost:1025/todo-api')
      .then((res) => res.json())
      .then(({ data }) => setTodo(data))
      .catch((err) => console.error(err));
  }, []);

  function getUpdate(data) {
    setTodo((prev) => [...prev, data]);
  }

  return (
    <main>
      <Form set={getUpdate} />
      <TodoList todo={todo} setTodo={setTodo} />
    </main>
  );
}

export default Main;
