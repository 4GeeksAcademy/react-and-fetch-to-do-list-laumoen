import React, { useEffect, useState } from "react";

const username = "laumoen";
const API_URL = `https://playground.4geeks.com/todo/todos/${username}`;

const Home = () => {
	const [tasks, setTasks] = useState([]);
  	const [input, setInput] = useState("");

useEffect(() => {
    fetch(API_URL, {
    	method: "POST",
    	body: JSON.stringify([]),
    	headers: {
        "Content-Type": "application/json"
    }
})
    .then((resp) => {
        if (!resp.ok) throw new Error("User could not be created");
        return resp.json();
    })
    .then(() => {
    	loadTasks();
    })
    .catch((error) => console.error("User initialization error:", error));
  	},
[]);

const loadTasks = () => {
    fetch(API_URL)
    	.then((resp) => resp.json())
      	.then((data) => {
        	if (Array.isArray(data)) {
          		if (data.length === 0) {
            		const defaultTasks = [
              			{ label: "finish the 4geeks bootcamp", done: false },
              			{ label: "start working", done: false },
              			{ label: "be happy", done: false }
            		];
    fetch(API_URL, {
        method: "PUT",
        body: JSON.stringify(defaultTasks),
        headers: {
            "Content-Type": "application/json"
        }
    })
    	.then(() => loadTasks())
        .catch((error) => console.error("saving tasks error:", error));
        } else {
        	setTasks(data);
        }
        }
      	})
    .catch((error) => console.error("loading tasks error:", error));
};

const handleKeyDown = (e) => {
    if (e.key === "Enter" && input.trim() !== "") {
    	const newTask = {
        	label: input.trim(),
        	done: false
      	};
    fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(newTask),
        headers: {
        	"Content-Type": "application/json"
    } 
})
    .then(() => {
        setInput("");
    	loadTasks();
    })
    .catch((error) => console.error("adding tasks error:", error));
    }
};

const handleDelete = (id) => {
    fetch(`https://playground.4geeks.com/todo/todos/${username}/${id}`, {
    	method: "DELETE"
    })
    .then(() => loadTasks())
    .catch((error) => console.error("erasing task error:", error));
};

const handleClearAll = () => {
    fetch(API_URL, {
		method: "DELETE"
    })
    .then(() => setTasks([]))
    .catch((error) => console.error("removing tasks error:", error));
};

return (
	<div className="todo-container">
    	<h1>to-do list</h1>
    	<input
        type="text"
        placeholder="do you have any tasks for me to remind you?"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
    	/>
	<ul>
        {tasks.length === 0 ? (
        	<li>not right now, free time!</li>
        ) : (
        tasks.map((task) => (
            <li key={task.id || task.label}>
            {task.label}
            <span className="delete-icon" onClick={() => handleDelete(task.id)}>
            🗑️
            </span>
            </li>
        ))
        )}
    </ul>

    <div className="footer">
        {tasks.length} tasks.
        {tasks.length > 0 && (
        	<button onClick={handleClearAll}>
            Clear all
          	</button>
        )}
    </div>
    </div>
  );
};

export default Home;