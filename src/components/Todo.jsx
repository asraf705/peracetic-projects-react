import React, { useEffect, useRef, useState } from "react";
import todo_icon from "../assets/todo_icon.png";
import TodoLists from "./TodoList";

const Todo = () => {
  const [todoItem, setTodoItem] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );
  const inputRef = useRef();
  // const [to]

  const add = () => {
    const inputText = inputRef.current.value.trim();
    console.log(inputText);

    if (inputText === "") {
      return null;
    }
    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };

    setTodoItem((prev) => [...prev, newTodo]);
    inputRef.current.value = "";
  };

  const deleteTodo = (id) => {
    setTodoItem((prvTodos) => {
      return prvTodos.filter((todo) => todo.id !== id);
    });
  };

  const toggle = (id) => {
    setTodoItem((prvTodos) => {
      return prvTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isComplete: !todo.isComplete };
        }
        return todo;
      });
    });
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoItem));
    console.log(todoItem);
  }, [todoItem]);

  return (
    <div className="bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl">
      {/* title */}
      <div className="flex items-center mt-7 gap-2">
        <img src={todo_icon} alt="" className="w-7 " />
        <h1 className="text-3xl font-semibold ">To Do List</h1>
      </div>

      <div>
        <div className="flex items-center my-8 bg-gray-200 rounded-full">
          <input
            className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600"
            type="text"
            ref={inputRef}
            placeholder="Add Task"
          />
          <button
            onClick={add}
            className="text-white border-none rounded-full bg-teal-600 w-32 h-14 font-medium cursor-pointer"
          >
            Add
          </button>
        </div>
      </div>

      <div>
        {todoItem.map((item, index) => {
          return (
            <TodoLists
              key={index}
              text={item.text}
              id={item.id}
              isComplete={item.isComplete}
              deleteTodo={deleteTodo}
              toggle={toggle}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Todo;
