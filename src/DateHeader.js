import React from 'react';
import './DateHeader.css';

function DateHeader(props) {
    const date = new Date();
    return (
        <div className="header">
            <div className="date">
                <div className="day">{ date.getDate() }</div>
                <div className="month-year-wrapper">
                    <div className="month">{ printMonth(date.getMonth()) }</div>
                    <div className="year">{ date.getFullYear() }</div>
                </div>
            </div>
            <div className="weekday">{ printDay(date.getDay()) }</div>
        </div>
    )
}

function printMonth(ind) {
    switch (ind) {
        case 0: return 'jan';
        case 1: return 'feb';
        case 2: return 'mar';
        case 3: return 'apr';
        case 4: return 'may';
        case 5: return 'jun';
        case 6: return 'jul';
        case 7: return 'aug';
        case 8: return 'sep';
        case 9: return 'oct';
        case 10: return 'nov';
        case 11: return 'dec';
        default: return '';
    }
}

function printDay(ind) {
    switch (ind) {
        case 1: return 'monday';
        case 2: return 'tuesday';
        case 3: return 'wednesday';
        case 4: return 'thursday';
        case 5: return 'friday';
        case 6: return 'saturday';
        case 0: return 'sunday';
        default: return '';
    }
}

export default DateHeader;