import React, { useState, useEffect } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import Todo from './Todo';
import { db } from '../firebase';
import { BsCalendarCheck } from 'react-icons/bs';
import image from '../assets/images/aaron-burden-xG8IQMqMITM-unsplash.jpg';
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,

  deleteDoc,
} from 'firebase/firestore';
import AnimatedPage from './AnimatedPage';




function Crud() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  //Create todo
  const createTodo = async (e) => {
    e.preventDefault(e);
    if (input === '') {
      alert('Please enter a todo');
      return;
    }
    await addDoc(collection(db, 'todos'), {
      text: input,
      completed: false,
    });
    setInput('');
  };

  //Read to do from firebase
  useEffect(() => {
    const q = query(collection(db, 'todos'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe();
  }, []);

  //Update todo in in firebase
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, 'todos', todo.id), {
      completed: !todo.completed,
    });
  };

  //Delete todo
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos",id ))
  }

  return (

    <div className='text-center flex justify-center '>
      <img className=' w-full h-auto fixed top-0' src={image} alt='back' />
      <div
        className='absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed  '
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
      ></div>
      <AnimatedPage>
        <div className=' flex flex-row justify-between'>
          <BsCalendarCheck className=' relative text-6xl top-[65px] mr-3 text-[#FBBE28]' />
          <h3 className=' text-7xl font-bold text-center top-[50px] relative   p-2 text-transparent bg-clip-text bg-gradient-to-r from-[#FBBE28] to-[#fc8f02]'>
            Todo App
          </h3>
        </div>
      </AnimatedPage>

      <div className='bg-slate-100 max-w-[700px] w-full m-auto rounded-md shadow-xl p-4  absolute left-[27vw] top-[27vh] backdrop-blur-sm bg-white/30'>
        <AnimatedPage>
          <h3 className=' text-3xl mb-5 font-bold text-center text-white top-[50px]'>
            What are you Doing Today?
          </h3>
          <form onSubmit={createTodo} className='flex justify-between '>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className='border  text-center w-[900px] min-h-[62px] text-xl bg-gray-50 border-gray-300 text-gray-900 rounded-full focus:ring-blue-500 focus:border-blue-500 block'
              type='text'
              placeholder='Hint: add your tasks in order of its priority'
            ></input>
            <button className=' p-4 ml-2 bg-gradient-to-r from-[#FBBE28] to-[#fc8f02] text-white rounded-full absolute right-4'>
              <AiOutlinePlus size={30} />
            </button>
          </form>
          <ul className='flex flex-col items-center justify-center mt-3'>
            {todos.map((todo, index) => (
              <Todo
                key={index}
                todo={todo}
                toggleComplete={toggleComplete}
                deleteTodo={deleteTodo}
              />
            ))}
          </ul>
          <p className='text-center p-2'>You have {todos.length} todos</p>
        </AnimatedPage>

      </div>
    </div>
  );
}

export default Crud;
