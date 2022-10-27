import './stylesheet/todo.css';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { useState } from 'react';

function Todo({ content, methods }) {
  const { id, todo, isDone } = content;
  const { delHandler, checkHandler, todoHandler } = methods;

  //console.log({ methods });

  const spanStyle = { textDecoration: 'line-through', color: 'grey' };

  const [inputEdit, setInputEdit] = useState(false);
  const [todoContent, setTodoContent] = useState(todo);

  const sbmNewTodoContent = (e) => {
    e.preventDefault();
    fetch(`http://localhost:1025/todo-api/set-element/${id}`, {
      method: 'POST',
      body: JSON.stringify({ newTodo: todoContent }),
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => {
      if(res.ok){
        todoHandler(todoContent, id);
      }
    });

    setInputEdit((prev) => !prev);
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
            onChange={(e) => setTodoContent(e.target.value)}
            className="todoContent"
          />
        </form>
      ) : (
        <span style={isDone ? spanStyle : {}}>{todo}</span>
      )}
      <div className="icons">
        <FaEdit color="white" onClick={() => setInputEdit(prev => !prev)} />
        <FaTrash color="white" onClick={() => delHandler(id)} />
      </div>
    </div>
  );
}

export default Todo;
