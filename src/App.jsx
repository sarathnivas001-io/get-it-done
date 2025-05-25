import { useState, useEffect } from "react";
import { TodoForm } from "./components/TodoForm/TodoForm";
import { TodoList } from "./components/TodoList/TodoList";
import styles from "./App.module.css";


function App() {
  const [todos, setTodos] = useState([]);

  function fetchTodos() {
    fetch(`${import.meta.env.VITE_MOCKAPI_BASE_URL}/todos`, {
      method: "GET",
      headers: { "content-type": "application/json" },
    })
      .then((response) => !!response.ok && response.json())
      .then(setTodos);
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  function handleCreate(newTodo) {
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: `${prevTodos.length + 1}`, ...newTodo },
    ]);
  }

  function handleUpdate(id, newTodo) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? newTodo : todo))
    );
  }

  function handleDelete(id){
    setTodos((prevtodos)=> prevtodos.filter((todo)=> todo.id !== id))
  }

  return (
    <div className={styles.App}>
      <header className={styles.Header}>
        <img className={styles.Logo} src="\src\assets\to-do-list (1).png" />
      </header>

      <div className={styles.AppContainer}>
        <TodoForm onCreate={handleCreate} />
        <TodoList todos={todos} onUpdate={handleUpdate} onDelete={handleDelete} />
      </div>
    </div>
  );
}

export default App;
