import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  // Fetch To-Do Items from the API
  useEffect(() => {
    axios.get("http://localhost:5202/api/todo")
      .then(response => setTodos(response.data))
      .catch(error => console.error("Error fetching todos:", error));
  }, []);

  // Add a new To-Do
  const addTodo = () => {
    if (!newTodo) return;

    axios.post("http://localhost:5202/api/todo", { title: newTodo, isCompleted: false })
      .then(response => setTodos([...todos, response.data]))
      .catch(error => console.error("Error adding todo:", error));

    setNewTodo("");
  };

  // Toggle Completion
  const toggleCompletion = (id, isCompleted) => {
    axios.put(`http://localhost:5202/api/todo/${id}`, { isCompleted: !isCompleted })
      .then(() => {
        setTodos(todos.map(todo =>
          todo.id === id ? { ...todo, isCompleted: !isCompleted } : todo
        ));
      })
      .catch(error => console.error("Error updating todo:", error));
  };

  // Delete a To-Do
  const deleteTodo = (id) => {
    axios.delete(`http://localhost:5202/api/todo/${id}`)
      .then(() => setTodos(todos.filter(todo => todo.id !== id)))
      .catch(error => console.error("Error deleting todo:", error));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">To-Do App</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="New To-Do"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
          <button
            onClick={addTodo}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Add To-Do
          </button>
        </div>
        <ul className="space-y-2">
          {todos.map(todo => (
            <li key={todo.id} className="flex items-center justify-between p-2 bg-gray-50 border border-gray-200 rounded">
              <span
                onClick={() => toggleCompletion(todo.id, todo.isCompleted)}
                className={`cursor-pointer ${todo.isCompleted ? "line-through text-gray-400" : ""}`}
              >
                {todo.title}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
