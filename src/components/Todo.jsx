import React, { useState } from 'react';
import { FaEdit, FaCheck, FaRegTrashAlt } from 'react-icons/fa';
import AnimatedPage from './AnimatedPage';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

const style = {
  // li: 'flex justify-between bg-slate-200 p-4 my-2 capitalize',
  // liComplete: 'flex justify-between bg-slate-400 p-4 my-2 capitalize',
  row: 'flex items-center',
  text: 'ml-2 cursor-pointer',
  textComplete: 'ml-2 cursor-pointer line-through',
  button: 'cursor-pointer flex items-center',
};

const Todo = ({ todo, toggleComplete, deleteTodo }) => {
  const [editing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  const handleEdit = async () => {
    if (editedText.trim() === '') {
      alert('Please enter a valid text');
      return;
    }

    await updateDoc(doc(db, 'todos', todo.id), {
      text: editedText,
    });

    setEditing(false);
  };
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
          ></p>

          {editing ? (
            <>
              <input
                type='text'
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                autoFocus
                className='border  text-center w-[200px] min-h-[px] text-xl bg-gray-50 border-gray-300 text-gray-900 rounded-full focus:ring-blue-500 focus:border-blue-500 block'
              />
              <button
                className='cursor-pointer flex items-center hover:scale-110'
                onClick={handleEdit}
              >
                <FaCheck className='ml-2 text-[#ffab3e] ' />
              </button>
            </>
          ) : (
            <p
              onClick={() => toggleComplete(todo)}
              className={todo.completed ? style.textComplete : style.text}
            >
              {todo.text}
            </p>
          )}
        </div>
        <div >
          <button
            className=' hover:scale-125 bg-gradient-to-r from-[#ffdb81] to-[#ffab3e] rounded-full h-9 w-9 flex items-center justify-center text-black text-opacity-80 absolute left-[555px] right-[105px] cursor-pointer'
            onClick={() => setEditing(true)}
            disabled={editing}
          >
            <FaEdit className='h-5 w-5 ' />
          </button>
        </div>
        <button
          onClick={() => {
            deleteTodo(todo.id);
          }}
          className='  hover:scale-125 bg-gradient-to-r from-[#ffdb81] to-[#ffab3e] rounded-full h-9 w-9 flex items-center justify-center text-black text-opacity-80'
        >
          <FaRegTrashAlt className='h-5 w-5' />
        </button>
      </li>
    </AnimatedPage>
  );
};


export default Todo
