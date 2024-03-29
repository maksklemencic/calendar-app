import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [holidays, setHolidays] = useState<Array<{ date: string, description: string }>>([]);

    useEffect(() => {
        fetchHolidays().then(data => setHolidays(data));
    }, []);

    const fetchHolidays = async () => {
        
        return [];
    };

    const renderDays = () => {
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();
    
        const firstDayOfMonth = new Date(year, month, 1);
        const startingDayOfWeek = firstDayOfMonth.getDay();
    
        const daysInMonth = new Date(year, month + 1, 0).getDate();
    
        const daysJSX = [];
    
        for (let i = 0; i < startingDayOfWeek; i++) {
            daysJSX.push(<div key={`blank-${i}`} className={styles.blank}></div>);
        }
    
        for (let day = 1; day <= daysInMonth; day++) {
            const isHoliday = holidays.some(holiday => {
                const [holidayMonth, holidayDate] = holiday.date.split('-').map(Number);
                return holidayMonth === month + 1 && holidayDate === day;
            });
    
            const dayOfWeek = new Date(year, month, day).getDay();
            const className = `${styles.day} ${dayOfWeek === 0 ? styles.sunday : ""} ${isHoliday ? styles.holiday : ""}`;
            
            daysJSX.push(
                <div key={`day-${day}`} className={className}>
                    {day}
                </div>
            );
        }
    
        return <div className={styles.calendarGrid}>{daysJSX}</div>;
    };

    const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newDate = new Date(currentDate.setMonth(parseInt(e.target.value)));
        setCurrentDate(newDate);
    };

    const handleYearInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = new Date(currentDate.setFullYear(parseInt(e.target.value)));
        setCurrentDate(newDate);
    };

    return (
        <div>
            <select onChange={handleMonthChange} className={styles.select}>
                <option value="0">January</option>
                <option value="1">February</option>
                <option value="2">March</option>
                <option value="3">April</option>
                <option value="4">May</option>
                <option value="5">June</option>
                <option value="6">July</option>
                <option value="7">August</option>
                <option value="8">September</option>
                <option value="9">October</option>
                <option value="10">November</option>
                <option value="11">December</option>
            </select>
            <input type="number" value={currentDate.getFullYear()} onChange={handleYearInput} className={styles.input} />
            {renderDays()}
        </div>
    );
};

export default Calendar;
