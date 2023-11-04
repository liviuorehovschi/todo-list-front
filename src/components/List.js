import React, { useEffect, useState } from "react"
import "./CSS/List.css"
import { Task } from "./Tasks";

const BASE_URL = 'http://127.0.0.1:5000';

export default function List({list, onAddTask, listsArr}) {
    const [newTask, setNewTask] = useState('');
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        console.log(list)
    }, [list])

    const handleAddTask = async () => {
        const token = sessionStorage.getItem('token');
        const response = await fetch(`${BASE_URL}/task`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ title: newTask, content: '', list_id: list.id })
        });

        if (response.ok) {
            setNewTask('');
            onAddTask();
        }
    };

    return (
        <div className="list">
            <h3>{list.title}</h3>
            <button onClick={() => setShowForm(!showForm)}>{showForm ? "Close" : "Add Task"}</button>
            {showForm && (
                <div>
                    <input
                        type="text"
                        placeholder="New List"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                    />
                    <button onClick={handleAddTask}>Submit</button>
                </div>
            )}
            <div className="task_list">
                {list.tasks.map((task) => (
                    <Task key={task.id} taskData={task} fetchTasks={onAddTask} list={list} listsArr={listsArr} />
                ))}
            </div>
        </div>
    )
}