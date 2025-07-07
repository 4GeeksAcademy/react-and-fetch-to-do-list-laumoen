import React, { useState } from "react";

const Home = () => {
	
	const [tasks, setTasks] = useState([]);
	const [input, setInput] = useState("");

	const handleKeyDown = (e) => {
		if (e.key === "Enter" && input.trim() !== "") {
      		setTasks([...tasks, input.trim()]);
      		setInput("");
    	}
};

const handleDelete = (index) => {
	setTasks(tasks.filter((_, i) => i !== index));
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
        tasks.map((task, index) => (
            <li key={index}>
            	{task}
              	<span
                className="delete-icon"
                onClick={() => handleDelete(index)}
            >
            🗑️
            </span>
            </li>
        ))
        )}
    </ul>
    <div className="footer">{tasks.length} tasks.</div>
    </div>
  );
};

export default Home;