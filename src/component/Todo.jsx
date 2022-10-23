import './stylesheet/todo.css';
import { FaTrash, FaEdit } from 'react-icons/fa';

function Todo({ content }) {
  return (
    <div className="todo-container">
      <input type="checkbox" name="" id="" />
      <span htmlFor="">{content}</span>
      <div className="icons">
        <FaEdit color="white" />
        <FaTrash color="white" />
      </div>
    </div>
  );
}

export default Todo;
