import { useState } from 'react';
import { format } from 'date-fns';
const EventForm = ({ selectedDate, onEventAdd }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!title.trim()) return;
  
      onEventAdd({
        title,
        description,
        date: selectedDate,
        id: Date.now()
      });
  
      setTitle('');
      setDescription('');
    };
  
    return (
      <form onSubmit={handleSubmit} className="event-form">
        <h3>Add Event for {format(selectedDate, 'MMMM d, yyyy')}</h3>
        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Event Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add Event</button>
      </form>
    );
  };
  export default EventForm;