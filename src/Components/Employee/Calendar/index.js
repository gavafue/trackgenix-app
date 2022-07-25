import { useDispatch } from 'react-redux';
import { getTimesheets } from 'redux/timesheet/thunks';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import React from 'react';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
import Modal from 'Components/Shared/Modal';

const Calendario = ({ setShowForm }) => {
  const handleDateClick = () => {
    setShowForm(true);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTimesheets());
  }, []);
  const userLogged = useSelector((state) => state.auth.authenticated.data);
  const timesheets = useSelector((state) => state.timesheets.list);

  const timesheetForCalendar = timesheets.reduce((acc, timesheet) => {
    if (timesheet.employee?._id === userLogged?._id) {
      return [
        ...acc,
        {
          projectName: timesheet?.project?.name || 'Project not found',
          date: timesheet.date,
          hours: timesheet.hoursWorked
        }
      ];
    }
    return acc;
  }, []);
  console.log('calendar', timesheetForCalendar);

  const eventList = timesheetForCalendar.map((timesheet) => ({
    ...timesheet,
    title: `${timesheet.hours} hours on ${timesheet.projectName}`,
    date: new Date(timesheet.date),
    allDay: true
  }));

  return (
    <div>
      <FullCalendar
        events={eventList}
        plugins={[dayGridPlugin, interactionPlugin]}
        dateClick={handleDateClick}
      />
      <Modal />
    </div>
  );
};

export default Calendario;
