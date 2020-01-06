import React, { useState } from 'react';
import './App.css';
import FloatButton from './FloatButton';
import DateHeader from './DateHeader';
import TodoList from './TodoList';

function App() {

  const [ addNewTodo, setAddNewTodo ] = useState(0);

  function handleAddNewTodo() {
    console.log("click!");
    setAddNewTodo(addNewTodo + 1);
  }

  return (
    <div className="app">
      <div className="container">
        <DateHeader/>
        <TodoList addNewTodo={ addNewTodo } />
      </div>
        <FloatButton handleClick={ handleAddNewTodo }/>
      
    </div>
  );
}

export default App;
