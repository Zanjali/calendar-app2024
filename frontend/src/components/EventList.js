import { format } from 'date-fns';

const EventList = ({ events, onEventDelete }) => {
  return (
    <div className="event-list">
      <h3>Events</h3>
      {events.length === 0 ? (
        <p>No events scheduled</p>
      ) : (
        <ul>
          {events.map(event => (
            <li key={event.id} className="event-item">
              <div>
                <strong>{event.title}</strong>
                <p>{event.description}</p>
                <small>{format(new Date(event.date), 'MMMM d, yyyy')}</small>
              </div>
              <button onClick={() => onEventDelete(event.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventList;