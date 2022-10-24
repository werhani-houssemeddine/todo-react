import './stylesheet/todo.css';
import { FaTrash, FaEdit } from 'react-icons/fa';

function Todo({ content, methods }) {
  const { id, todo, isDone } = content;
  const { editHandler, delHandler, checkHandler } = methods;

  //console.log({ methods });

  return (
    <div className="todo-container">
      <input type="checkbox" name="" checked={isDone} onChange={() => checkHandler(id)} />
      <span htmlFor="">{todo}</span>
      <div className="icons">
        <FaEdit color="white" onClick={() => editHandler(id)} />
        <FaTrash color="white" onClick={() => delHandler(id)} />
      </div>
    </div>
  );
}

export default Todo;
