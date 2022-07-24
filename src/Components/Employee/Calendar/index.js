// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import moment from 'moment';
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
  // console.log(handleDateClick);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTimesheets());
  }, []);
  const userLogged = useSelector((state) => state.auth.authenticated.data);
  const timesheets = useSelector((state) => state.timesheets.list);
  // console.log(timesheets);

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
  console.log(timesheetForCalendar);

  const eventList = timesheets.map((timesheet) => ({
    ...timesheet,
    title: `${timesheet.hoursWorked} hours on ${timesheet.project.name}`,
    date: new Date(timesheet.date),
    allDay: true
  }));
  console.log(eventList);
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
  //   // require('moment/locale/en.js');

  //   console.log(timesheets);
  //   console.log(userLogged);
  //   return (
  //     <div style={{ height: '400px' }} className="bigCalendar-container">
  //       <Calendar localizer={localizer} events={eventList} startAccessor="start" endAccessor="end" />
  //     </div>
  //   );
};

export default Calendario;

// export default class DemoApp extends React.Component {

//   render() {

//   }

// }
