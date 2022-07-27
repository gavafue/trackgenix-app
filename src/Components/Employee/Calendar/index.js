import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import styles from './calendar.module.css';
import { useState } from 'react';
import Modal from 'Components/Shared/Modal';
import { useLocation } from 'react-router-dom';

const Calendario = ({ timesheetForCalendar, setShowForm, reset }) => {
  const [showEvent, setShowEvent] = useState(false);
  const [eventInfo, setEventInfo] = useState('');
  const location = useLocation().pathname;
  const handleEventClick = (e) => {
    setEventInfo(e.event._def.extendedProps);
    console.log(e);
    setShowEvent(true);
  };
  const handleDateClick = (event) => {
    console.log(event);
    const date = event.dateStr;
    reset &&
      reset({
        date: date
      });

    setShowForm && setShowForm(true);
  };
  console.log('timesheeetForCalendar', timesheetForCalendar);

  const eventList = timesheetForCalendar.map((timesheet) => {
    const date = new Date(timesheet.date);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    return {
      ...timesheet,
      title: location.includes('/addNewTimesheet')
        ? `${timesheet.hoursWorked} Hours`
        : timesheet.projectName,
      date: date,
      allDay: true,
      color: '#aace9b'
    };
  });

  console.log(eventList);

  return (
    <div className={styles.container}>
      {timesheetForCalendar && (
        <FullCalendar
          eventClick={handleEventClick}
          events={eventList}
          plugins={[dayGridPlugin, interactionPlugin]}
          dateClick={handleDateClick}
        />
      )}
      <Modal isOpen={showEvent} handleClose={() => setShowEvent(false)}>
        <div className={styles.eventContainer}>
          <h2>{eventInfo.projectName}</h2>
          <span>
            <b>Hours Worked: </b>
            {eventInfo.hoursWorked}
          </span>
          <span>
            <b>Task description: </b>
            {eventInfo.workDescription}
          </span>
        </div>
      </Modal>
    </div>
  );
};

export default Calendario;
