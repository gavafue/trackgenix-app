import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import styles from './calendar.module.css';

const Calendario = ({ timesheetForCalendar, setShowForm, reset }) => {
  const handleEventClick = (e) => {
    console.log(e);
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
      title: `${timesheet.hoursWorked} hours on ${timesheet.projectName}`,
      date: date,
      allDay: true,
      backgroundColor: 'green'
    };
  });

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
    </div>
  );
};

export default Calendario;
