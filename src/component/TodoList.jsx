import { useEffect, useState } from 'react';
import Todo from './Todo';

function TodoList() {
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    fetch('http://localhost:1025/todo-api')
      .then((res) => res.json())
      .then(({ data }) => setTodo(data))
      .catch((err) => console.error(err));
  }, []);

  //console.log(todo);

  const fns = () => ({
    editHandler: (id) => {
      console.log('Edit handler fn clicked', id);
    },
    delHandler: (id) => {
      console.log('Delete handler fn clicked', id);
    },

    // To handler the checkbox first we search for the todo with the help of map method
    // and we make a test if the element id is the same we make the change otherwise we 
    // return the same element without any change
    checkHandler: (id) => {
      setTodo((prev) =>
        prev.map((element) => {
          return element.id != id
            ? element
            : { ...element, isDone: !element.isDone };
        })
      );
    },
  });

  return (
    <>
      {todo.length === 0 ? (
        <h1>No Element ...</h1>
      ) : (
        todo.map((ele) => <Todo content={ele} key={ele.id} methods={fns()} />)
      )}
    </>
  );
}

export default TodoList;
