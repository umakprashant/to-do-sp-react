import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "./Todocss.css"; // Import the styles

Modal.setAppElement("#root");

const TodoApp = () => {
  const [todo, setData] = useState(() => {
    return JSON.parse(localStorage.getItem("todos")) || [];
  });
  const [currentTodo, setCurrentTodo] = useState({
    id: "",
    title: "",
    description: "",
    status: false,
    date: "",
  });
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todo));
  }, [todo]);

  const openModal = () => {
    setIsOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsOpen(false);
    setIsEdit(false);
    const obj = {
      id: "",
      title: "",
      description: "",
      status: false,
      date: "",
    };
    setCurrentTodo(obj);
  };
  const setEditMode = (obj) => {
    setIsEdit(true);
    setIsOpen(true);
    setCurrentTodo(obj);
  };
  const setDeleteMode = (id) => {
    setData(todo.filter((res) => res.id !== id));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentTodo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleChangeCheck = (e) => {
    const { name, checked } = e.target;
    setCurrentTodo((prev) => ({
      ...prev,
      [name]: checked, // Update the 'status' with true or false
    }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    console.log(todo);
    console.log(currentTodo);
    e.preventDefault();
    if (isEdit) {
      // setData((prev) => [...prev, currentTodo]);
      setData(
        todo.map((res) =>
          res.id === currentTodo.id ? { ...currentTodo } : res
        )
      );
    } else {
      setData((prev) => [...prev, { ...currentTodo, id: Date.now() }]);
    }
    closeModal();
  };

  return (
    <div className="todo-container">
      <h2>Todo Application</h2>
      <button onClick={openModal} className="add-button">
        <b> Add Todo</b>
      </button>

      <table className="todo-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {todo.length > 0 ? (
            todo.map((item, index) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>{item.date}</td>
                <td>
                  {item.status ? (
                    <span className="done-status">Done</span>
                  ) : (
                    <span className="pending-status">Pending</span>
                  )}
                </td>
                <td>
                  <button
                    onClick={(e) => setEditMode(item)}
                    className="submit-button"
                  >
                    Edit
                  </button>
                  <button
                    className="cancel-button"
                    onClick={(e) => setDeleteMode(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td style={{ color: "red" }} colSpan="5">
                No Todos available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add Todo Form"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Add Todos</h2>
        <form onSubmit={handleSubmit} className="todo-form">
          <div className="form-group">
            <label htmlFor="name">Title:</label>
            <input
              type="text"
              name="title"
              value={currentTodo.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="Description">Description:</label>
            <input
              type="text"
              name="description"
              value={currentTodo.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group" style={{ display: "flex" }}>
            <label htmlFor="Description">Status:</label>
            <input
              type="checkbox"
              name="status"
              style={{ width: "20%" }}
              onChange={handleChangeCheck}
              checked={currentTodo.status}
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              name="date"
              value={currentTodo.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-buttons">
            <button type="submit" className="submit-button">
              {isEdit ? "Update" : "Submit"}
            </button>
            <button onClick={closeModal} className="cancel-button">
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default TodoApp;
