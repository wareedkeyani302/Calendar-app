import React, { useState } from 'react';
import { Modal, Button, Input } from 'antd';

const EventModal = ({ visible, onCancel, selectedDate, addEvent, events }) => {
  const [eventTitle, setEventTitle] = useState('');

  const handleEventTitleChange = (e) => {
    setEventTitle(e.target.value);
  };

  const handleAddEvent = () => {
    if (eventTitle.trim() !== '') {
      addEvent(selectedDate, eventTitle);
      setEventTitle('');
    }
  };

  return (
    <Modal
      title="Add Event"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="add" type="primary" onClick={handleAddEvent}>
          Add Event
        </Button>,
      ]}
    >
      <p>{selectedDate ? selectedDate.toDateString() : ''}</p>
      <label>
        Event Title:
        <Input type="text" value={eventTitle} onChange={handleEventTitleChange} />
      </label>

      <div>
        <h3>Events for {selectedDate ? selectedDate.toDateString() : ''}</h3>
        <ul>
          {events
            .filter(event => event.date.toDateString() === (selectedDate && selectedDate.toDateString()))
            .map((event, index) => (
              <li key={index}>{event.title}</li>
            ))}
        </ul>
      </div>
    </Modal>
  );
};

export default EventModal;



