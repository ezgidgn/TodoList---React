import React, { useState } from 'react'
import { FaEdit, FaCheck, FaRegTrashAlt } from "react-icons/fa"
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

const style= {
    li: "flex justify-between bg-slate-200 p-4 my-2 capitalize",
    liComplete: "flex justify-between bg-slate-400 p-4 my-2 capitalize",
    row: "flex items-center",
    text: "ml-2 cursor-pointer",
    textComplete: "ml-2 cursor-pointer line-through",
    buttonContainer: "flex",
    button: "cursor-pointer flex items-center ml-2",
}

const Todo = ({todo, toggleComplete, deleteTodo}) => {
  const [editing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  const handleEdit = async () => {
    if (editedText.trim() === "") {
      alert("Please enter a valid text");
      return;
    }

    await updateDoc(doc(db, "todos", todo.id), {
      text: editedText
    });

    setEditing(false);
  }

  return (
    <li className={todo.completed ? style.liComplete : style.li}>
      <div className={style.row}>
        <input
          onChange={() => toggleComplete(todo)}
          type="checkbox"
          checked={todo.completed ? 'checked': ''}
        />
        {editing ? (
          <>
            <input
              type="text"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              autoFocus
            />
            <button className={style.button} onClick={handleEdit}>
              <FaCheck />
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
      <div className={style.buttonContainer}>
  <button className={style.button} onClick={() => setEditing(true)} disabled={editing}>
    <FaEdit />
  </button>
  <button className={style.button} onClick={() => deleteTodo(todo.id)}>
    <FaRegTrashAlt />
  </button>
</div>

    </li>
  )
}

export default Todo
