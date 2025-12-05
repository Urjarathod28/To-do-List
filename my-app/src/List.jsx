import React, { useState } from "react";

function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
    setNewTask("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const startEditing = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };

  const saveEdit = (id) => {
    if (!editingText.trim()) return;
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, text: editingText } : t))
    );
    setEditingId(null);
    setEditingText("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText("");
  };

  const styles = {
    pageContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "40vh",
      background: "#f5f7fa",
      fontFamily: "Arial, sans-serif",
    },

    card: {
      width: "420px",
      padding: "30px",
      borderRadius: "15px",
      background: "white",
      boxShadow: "0 4px 18px rgba(0,0,0,0.1)",
      textAlign: "center",
    },

    heading: {
      fontSize: "28px",
      fontWeight: "700",
      marginBottom: "20px",
      color: "#222",
    },

    input: {
      padding: "12px",
      width: "100%",
      borderRadius: "10px",
      border: "1px solid #ccc",
      fontSize: "16px",
    },

    addButton: {
      marginTop: "10px",
      width: "100%",
      padding: "12px",
      background: "#111",
      color: "white",
      border: "none",
      borderRadius: "10px",
      fontSize: "16px",
      cursor: "pointer",
      transition: "0.3s",
    },

    taskBox: {
      marginTop: "20px",
      listStyle: "none",
      padding: 0,
    },

    taskItem: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "12px",
      marginBottom: "12px",
      background: "#f1f4ff",
      borderRadius: "10px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
    },

    taskText: {
      flex: 1,
      fontSize: "20px",
      fontWeight: "600",
      cursor: "pointer",
    },

    editBtn: {
      background: "#2a4fff",
      color: "white",
      border: "none",
      padding: "8px 16px",
      marginRight: "10px",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "600",
      transition: "0.2s",
    },

    deleteBtn: {
      background: "#d40032",
      color: "white",
      border: "none",
      padding: "8px 16px",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "600",
      transition: "0.2s",
    },

    saveBtn: {
      background: "#009e4f",
      color: "white",
      border: "none",
      padding: "8px 12px",
      borderRadius: "8px",
      marginRight: "8px",
      cursor: "pointer",
      fontWeight: "600",
    },

    cancelBtn: {
      background: "#555",
      color: "white",
      border: "none",
      padding: "8px 12px",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "600",
    },
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.card}>
        <h2 style={styles.heading}>My To-Do List</h2>

        <form onSubmit={addTask}>
          <input
            type="text"
            placeholder="Enter a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            style={styles.input}
          />

          <button type="submit" style={styles.addButton}>
            Add Task
          </button>
        </form>

        <ul style={styles.taskBox}>
          {tasks.map((t) => (
            <li key={t.id} style={styles.taskItem}>
              {editingId === t.id ? (
                <>
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    style={{
                      flex: 1,
                      marginRight: "10px",
                      padding: "8px",
                      borderRadius: "8px",
                      border: "1px solid #aaa",
                    }}
                  />

                  <button
                    onClick={() => saveEdit(t.id)}
                    style={styles.saveBtn}
                  >
                    Save
                  </button>

                  <button onClick={cancelEdit} style={styles.cancelBtn}>
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <span
                    onClick={() => toggleComplete(t.id)}
                    style={{
                      ...styles.taskText,
                      textDecoration: t.completed ? "line-through" : "none",
                      color: t.completed ? "#888" : "#222",
                    }}
                  >
                    {t.text}
                  </span>

                  <button
                    onClick={() => startEditing(t.id, t.text)}
                    style={styles.editBtn}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteTask(t.id)}
                    style={styles.deleteBtn}
                  >
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoApp;
