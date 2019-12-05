import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';

function TodoList(props) {

    const [ todoList, setTodoList ] = useState( getMockItems() );

    useEffect(() =>{
        console.log("re-render TodoList")
        console.log(todoList)        
        if(props.addNewTodo) {
            addNewTodoToList();
            props.addedTodo();
        }
    })

    function addNewTodoToList() {
        setTodoList([
            { 'text': "", 'date': Date.now() },
            ...todoList
          ])
    }

    function updateItemState(text) {
        console.log("updateing!")
        setTodoList( todoList.map( (item) => { 
            if( item.date == this.date )
                item.text = text;
            return item;
        } ))

        //Upsert database

    }

    function deleteItemFromList() {
        console.log(this.date)
        console.log("deleting!" + this.date)
        setTodoList(todoList.filter( (item) => { 
            console.log(item.date)
            return item.date != this.date;
        }))
        console.log(todoList)
    }

    const renderList = todoList.map( item => {
            console.log(item)
            return <TodoItem text={ item.text } 
                             key={ item.date } 
                             date = { item.date }
                             update={ updateItemState }
                             delete={ deleteItemFromList }/> })

    return (
        <div className="todolist">
            { renderList }
        </div>
    )
}

function getListItems() {

}



function getMockItems() {
    let list = [];
    list.push( { 'text': "Read a booooook", 'date': 1 });
    list.push( { 'text': "Turn in assignment", 'date': 2 });
    list.push( { 'text': "Shop groceries", 'date': 3 });
    return list;
}

export default TodoList;