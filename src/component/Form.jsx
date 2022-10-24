import { useRef, useState } from 'react';
import './stylesheet/form.css';

function Form({set}) {
  const [isBlur, setIsBlur] = useState(false);
  const [inputValue, setInputValue] = useState('');

  async function formHandler(e) {
    e.preventDefault();
    console.log('Send Form');


    try {
	    const result = await fetch('http://localhost:1025/todo-api', {
	      method: 'POST',
	      body: JSON.stringify({data: inputValue}),
	      headers: {
	        'Content-Type': 'application/json'
	      }
	    });
	    const data = await result.json();
	    /**
	     * the data object is in the following form {ok, message, data}
	     * the ok is a boolean value indicate if the data received from the server
	     * the message is a string describe the result 
	     */
	
	    if(data.ok){
	      console.log(data.message);
	      set(data.data);
	    }else {
	      console.error(data.message);
	    }
    } catch (error) {
        console.error('Internal Error', error);
    }
  }

  function inputHandler(e) {
    setIsBlur(() => (e.target.value === '' ? false : true));
    setInputValue(prev => e.target.value);
  }

  return (
    <form onSubmit={formHandler}>
      <div className="input-container">
        <input
          type="text"
          id="todo"
          name="todo"
          className="text-input"
          placeholder="Your todo"
          onChange={inputHandler}
          value={inputValue}
        />
        <label htmlFor="todo" className={isBlur ? 'filled' : ''}>
          Todo
        </label>
      </div>
    </form>
  );
}

export default Form;
