import React, { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Calendar = ({ events, onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Get days for current month view
  const getDaysInMonth = () => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    return eachDayOfInterval({ start, end });
  };

  // Navigation handlers
  const previousMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  // Date selection handler
  const handleDateClick = (date) => {
    setSelectedDate(date);
    onDateSelect(date);
  };

  // Get events for a specific date
  const getEventsForDate = (date) => {
    return events.filter(event => 
      isSameDay(new Date(event.date), date)
    );
  };

  const renderCalendarDays = () => {
    const days = getDaysInMonth();
    const startDay = startOfMonth(currentDate).getDay();

    // Create empty cells for days before the first of the month
    const emptyCells = Array(startDay).fill(null);

    return (
      <>
        {emptyCells.map((_, index) => (
          <div key={`empty-${index}`} className="calendar-cell empty"></div>
        ))}
        
        {days.map((day) => {
          const dayEvents = getEventsForDate(day);
          const isSelected = isSameDay(day, selectedDate);
          const isCurrentMonth = isSameMonth(day, currentDate);

          return (
            <div
              key={day.toString()}
              className={`calendar-cell ${isSelected ? 'selected' : ''} 
                         ${isCurrentMonth ? '' : 'different-month'}`}
              onClick={() => handleDateClick(day)}
            >
              <div className="date-number">{format(day, 'd')}</div>
              {dayEvents.length > 0 && (
                <div className="event-indicator">
                  {dayEvents.length} event{dayEvents.length !== 1 ? 's' : ''}
                </div>
              )}
            </div>
          );
        })}
      </>
    );
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={previousMonth}>
          <ChevronLeft size={20} />
        </button>
        <h2>{format(currentDate, 'MMMM yyyy')}</h2>
        <button onClick={nextMonth}>
          <ChevronRight size={20} />
        </button>
      </div>
      
      <div className="calendar-grid">
        {/* Weekday headers */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="weekday-header">{day}</div>
        ))}
        
        {/* Calendar days */}
        {renderCalendarDays()}
      </div>
    </div>
  );
};
export default Calendar;