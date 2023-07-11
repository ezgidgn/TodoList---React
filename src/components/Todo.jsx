import React from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa';
import AnimatedPage from './AnimatedPage';

const style = {
  // li: 'flex justify-between bg-slate-200 p-4 my-2 capitalize',
  // liComplete: 'flex justify-between bg-slate-400 p-4 my-2 capitalize',
  row: 'flex items-center',
  text: 'ml-2 cursor-pointer',
  textComplete: 'ml-2 cursor-pointer line-through',
  button: 'cursor-pointer flex items-center',
};

const Todo = ({ todo, toggleComplete, deleteTodo }) => {
  return (
    <AnimatedPage>
      <li className={todo.completed ? 'liComplete' : 'li'}>
        <div className='flex items-center cursor-pointer relative'>
          <input
            id='check-box'
            onChange={() => toggleComplete(todo)}
            type='checkbox'
            checked={todo.completed ? 'checked' : ''}
            className=' appearance-none rounded-3xl h-6 w-6 border-2 border-[#FBBE28] z-12 '
          />
          <FaCheck
            className=' absolute h-4 w-4 left-1 opacity-0 check-1 transition  '
            onClick={() => toggleComplete(todo)}
          />
          <p
            onClick={() => toggleComplete(todo)}
            className={todo.completed ? style.textComplete : style.text}
          >
            {todo.text}
          </p>
        </div>
        <button
          onClick={() => {
            deleteTodo(todo.id);
          }}
          className='bg-gradient-to-r from-[#ffdb81] to-[#ffab3e] rounded-full h-9 w-9 flex items-center justify-center text-black text-opacity-80'
        >
          <FaRegTrashAlt className='h-5 w-5' />
        </button>
      </li>
    </AnimatedPage>
  );
};

export default Todo;
