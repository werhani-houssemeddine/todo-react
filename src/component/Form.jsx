import { useRef, useState } from 'react';
import './stylesheet/form.css'

function Form() {

  const [isBlur, setIsBlur] = useState(false);

  function formHandler(e) {
    e.preventDefault();
    console.log('Send Form');
  }

  function inputHandler(e) {
    setIsBlur(() => e.target.value === '' ? false : true);
  }

  return (
    <form onSubmit={formHandler}>
      <div className="input-container" >
        <input
          type='text'
          id='todo'
          name='todo'
          className='text-input'
          placeholder="Your todo"
          onChange={inputHandler}
        />
        <label htmlFor="todo" className={isBlur ? 'filled' : ''}>Todo</label>
      </div>
    </form>
  );
}

export default Form;
