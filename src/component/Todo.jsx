import './stylesheet/todo.css';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { useState } from 'react';

function Todo({ content, methods }) {
  const { id, todo, isDone } = content;
  const { delHandler, checkHandler } = methods;

  //console.log({ methods });

  const spanStyle = { textDecoration: 'line-through', color: 'grey' };

  const [inputEdit, setInputEdit] = useState(false);
  const [todoContent, setTodoContent] = useState(todo);

  const editHandler = () => {
    setInputEdit((prev) => !prev);
  };

  const todoHandler = (e) => {
    setTodoContent((prev) => e.target.value);
  };

  const sbmNewTodoContent = (e) => {
    console.log({newTodo: todoContent})
    e.preventDefault();
    fetch(`http://localhost:1025/todo-api/set-element/${id}`, {
      method: 'POST',
      body: JSON.stringify({newTodo: todoContent}),
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => console.log(res));

    setInputEdit(prev => !prev);
    setTodoContent(todoContent);
  };

  return (
    <div className="todo-container">
      <input
        type="checkbox"
        name=""
        checked={isDone}
        onChange={() => checkHandler(id)}
      />
      {inputEdit ? (
        <form className="edit-form" onSubmit={sbmNewTodoContent}>
          <input
            type="text"
            name="newTodo"
            value={todoContent}
            onChange={todoHandler}
            className="todoContent"
          />
        </form>
      ) : (
        <span style={isDone ? spanStyle : {}}>{todo}</span>
      )}
      <div className="icons">
        <FaEdit color="white" onClick={editHandler} />
        <FaTrash color="white" onClick={() => delHandler(id)} />
      </div>
    </div>
  );
}

export default Todo;
