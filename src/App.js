import React, { useState } from 'react';
import './App.css';
import FloatButton from './FloatButton';
import DateHeader from './DateHeader';
import TodoList from './TodoList';

function App() {

  const [ addNewTodo, setAddNewTodo ] = useState(false);

  function handleAddNewTodo() {
    console.log("click!")
    setAddNewTodo(true);
  }

  function addedTodo() {
      setAddNewTodo(false);
  }

  return (
    <div className="app">
      <div className="container">
        <DateHeader/>
        <TodoList addNewTodo={ addNewTodo } addedTodo={ addedTodo } />
      </div>
      <FloatButton handleClick={ handleAddNewTodo }/>
    </div>
  );
}

export default App;
