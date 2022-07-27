import React from 'react';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
import Modal from 'Components/Shared/Modal';
import styles from './calendar.module.css';

const Calendario = ({ timesheetForCalendar }) => {
  const handleDateClick = (e) => {
    console.log(e);
  };
  console.log('timesheeetForCalendar', timesheetForCalendar);
  const eventList = timesheetForCalendar.map((timesheet) => ({
    ...timesheet,
    title: `${timesheet.hoursWorked} hours on ${timesheet.projectName}`,
    date: new Date(timesheet.date),
    allDay: true
  }));

  return (
    <div className={styles.container}>
      {timesheetForCalendar && (
        <FullCalendar
          events={eventList}
          plugins={[dayGridPlugin, interactionPlugin]}
          dateClick={handleDateClick}
        />
      )}
      <Modal />
    </div>
  );
};

export default Calendario;
