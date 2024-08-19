import React from "react";
import Todo from "./components/Todo";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="bg-stone-600 grid py-4 min-h-screen">
      <Todo />
    </div>
  );
};

export default App;
