// Tasks.js
import React, { useState, useEffect, useCallback } from 'react';
import './CSS/Tasks.css';
import { BiChevronUp, BiChevronDown } from 'react-icons/bi';
import { AiOutlineCheck } from 'react-icons/ai';
import List from './List';
import Header from './Header'; // Assuming Header.js is in the same directory
import Footer from './Footer'; // Assuming Footer.js is in the same directory

const BASE_URL = 'http://127.0.0.1:5000';

export function Task({ taskData, fetchTasks, level = 0, list, listsArr }) {
    const [newSubtask, setNewSubtask] = useState('');
    const [expanded, setExpanded] = useState(false);
    const [moving, setMoving] = useState(false);
    const [subtasks, setSubtasks] = useState([]);

    const fetchSubtasks = useCallback(async () => {
        const token = sessionStorage.getItem('token');
        const response = await fetch(`${BASE_URL}/task/${taskData.id}/subtasks`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        setSubtasks(data);
    }, [taskData.id]);

    useEffect(() => {
        if (expanded) {
            fetchSubtasks();
        }
    }, [expanded, fetchSubtasks]);

    const addSubtask = async () => {
        const token = sessionStorage.getItem('token');
        const response = await fetch(`${BASE_URL}/task/${taskData.id}/subtask`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ title: newSubtask, content: '', list_id: list.id })
        });

        if (response.ok) {
            setNewSubtask('');
            fetchSubtasks();
        }
    };

    const deleteTask = async () => {
        const token = sessionStorage.getItem('token');
        await fetch(`${BASE_URL}/task/${taskData.id}/${list.id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        fetchTasks();
    };

    const moveTask = () => {
        setMoving(prevMoving => !prevMoving);
    };

    const submitChange = async (newList) => {
        const token = sessionStorage.getItem('token');
        const response = await fetch(`${BASE_URL}/task/${taskData.id}/move`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ new_list_id: newList })
        });

        if (response.ok) {
            fetchTasks();
        }
    };

    return (
        <li className='task' style={{ marginLeft: `${level * 20}px` }}>
            <h5>{taskData.title}</h5>
            <div className='buttons'>
                <button onClick={deleteTask}><AiOutlineCheck /></button>
                {(listsArr && listsArr.length) && <button onClick={moveTask}>Move</button>}
                <button onClick={() => setExpanded(!expanded)}>
                    {expanded ? <BiChevronUp /> : <BiChevronDown />}
                </button>
            </div>
            {moving && (
                <select onChange={(e) => submitChange(e.target.value)} defaultValue={list.id}>
                    {listsArr.map((listItem) => (
                        <option key={listItem.id} value={listItem.id}>{listItem.title}</option>
                    ))}
                </select>
            )}
            {expanded && (
                <>
                    <input
                        type="text"
                        placeholder="Add subtask"
                        value={newSubtask}
                        onChange={(e) => setNewSubtask(e.target.value)}
                    />
                    <button onClick={addSubtask}>Add Subtask</button>
                    <ul>
                        {subtasks.map(sub => (
                            <Task key={sub.id} taskData={sub} fetchTasks={fetchSubtasks} level={level + 1} list={list} listsArr={listsArr} />
                        ))}
                    </ul>
                </>
            )}
        </li>
    );
}

function Tasks() {
    const [lists, setLists] = useState([]);
    const [newList, setNewList] = useState('');
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchLists();
    }, []);

    const fetchLists = async () => {
        const token = sessionStorage.getItem('token');
        const response = await fetch(`${BASE_URL}/lists`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        setLists(data);
    };

    const handleAddList = async () => {
        const token = sessionStorage.getItem('token');
        const response = await fetch(`${BASE_URL}/list`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ title: newList })
        });

        if (response.ok) {
            setNewList('');
            fetchLists();
        }
    };

    return (
        <>
            <Header />
            <div className="tasks-bg">
                <button onClick={() => setShowForm(!showForm)}>Add List</button>
                {showForm && (
                    <div>
                        <input
                            type="text"
                            placeholder="New List"
                            value={newList}
                            onChange={(e) => setNewList(e.target.value)}
                        />
                        <button onClick={handleAddList}>Submit</button>
                    </div>
                )}
                <ul>
                    {lists.map(list => (
                        <List key={list.id} list={list} onAddTask={fetchLists} listsArr={lists} />
                    ))}
                </ul>
            </div>
            <Footer />
        </>
    );
}

export default Tasks;
