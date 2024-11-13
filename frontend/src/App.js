import React, { useState } from 'react';
import './App.css';
import Calendar from './components/Calendar';
import EventForm from './components/EventForm';
import EventList from './components/EventList';

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleEventAdd = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  const handleEventDelete = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  return (
    <div className="app">
      <h1>Calendar App</h1>
      <div className="app-container">
        <div className="calendar-container">
          <Calendar 
            events={events}
            onDateSelect={handleDateSelect}
          />
        </div>
        <div className="sidebar">
          <EventForm 
            selectedDate={selectedDate}
            onEventAdd={handleEventAdd}
          />
          <EventList 
            events={events}
            onEventDelete={handleEventDelete}
          />
        </div>
      </div>
    </div>
  );
}

export default App;