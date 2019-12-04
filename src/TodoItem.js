import React, { useState, useEffect } from 'react';
import './TodoList.css';

function TodoItem(props) {

    const [ isNew, setIsNew ] = useState(false);

    let textField = React.createRef();

    function checkForEnter(event) {
        if (event.key == "Enter") {
            event.preventDefault();
            event.target.blur();
        }
    }

    function focusField() {
        textField.current.focus();
    }

    useEffect(() => {
        if(props.text == ""){ //If item is new
            focusField();
        }
    })

    return (
        <div className="todo-item">
            {/* <div className="todo-text" contentEditable={true} onFocus={toggleFocus} onBlur={toggleFocus}>{props.text}</div> */}
            <div className="todo-text" 
                 contentEditable={true} 
                 onKeyDown={checkForEnter} 
                 ref={textField} 
                 data-placeholder="What needs to be done?" >
                   {props.text}
            </div>
            <div className="delete-btn"></div>
        </div>
    )
}


export default TodoItem;