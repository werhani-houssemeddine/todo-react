import { useEffect, useState } from 'react';
import Todo from './Todo';

function TodoList({ todo, setTodo }) {
  //console.log(todo);

  // fns is a function that returns an object contain methods handlered by the Todo component
  const fns = () => ({
    editHandler: (id) => {
      console.log('Edit handler fn runnig', id);
    },
    delHandler: async (id) => {
      const res = await fetch(`http://localhost:1025/todo-api/del/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      //console.log(data);

      setTodo((prev) => prev.filter((element) => element.id !== id));
    },

    // To handler the checkbox first we search for the todo with the help of map method
    // and we make a test if the element id is the same we make the change otherwise we
    // return the same element without any change
    checkHandler: async (id) => {
      console.log('----');
      setTodo((prev) =>
        prev.map((element) => {
          return element.id != id
            ? element
            : { ...element, isDone: !element.isDone };
        })
      );
      const res = await fetch(`http://localhost:1025/todo-api/check/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
    },
    todoHandler: (newTodo, id) => {
      setTodo((prev) =>
        prev.map((element) => {
          if (element.id === id) return { ...element, todo: newTodo };
          return element;
        })
      );
    }
  })

  return(
    <div id="todos-container">
    {todo.length === 0 ? (
      <h1 style={{ color: 'gray' }}>No Element ...</h1>
    ) : (
      todo.map((ele) => <Todo content={ele} key={ele.id} methods={fns()} />)
    )}
  </div>
  );
}

export default TodoList;