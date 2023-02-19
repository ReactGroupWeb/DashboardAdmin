import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
function Calendars() {
  const localizer = momentLocalizer(moment);
  // BigCalendar.momentLocalizer(moment)
  const [events, setEvents] = useState([
    {
      start: new Date(),
      end: new Date(moment().add(1, "days")),
      title: "Some title",
    },
  ]);

  {
    /* <BigCalendar
              events={events}
              startAccessor="start"
              endAccessor="end"
            /> */
  }
  return <Calendar localizer={localizer} />;
}
export default Calendars;
