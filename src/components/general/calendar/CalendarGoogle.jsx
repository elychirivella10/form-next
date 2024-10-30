import React, {useState, memo} from 'react'

//calendar
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

//moment
import moment from 'moment'
const localizer = momentLocalizer(moment) // or globalizeLocalizer

const CalendarGoogle =({getCalendar, data})=>{

  const getFirstDayOfMonth = () => {
    const currentDate = moment();
    const firstDayOfMonth = currentDate.startOf('month').toDate();
    return firstDayOfMonth;
  };

  const getLastDayOfMonth = () => {
    const currentDate = moment();
    const lastDayOfMonth = currentDate.endOf('month').toDate();
    return lastDayOfMonth;
  };
  return(
      <div className="myCustomHeight is-height-100">
        <Calendar
          localizer={localizer}
          events={data}
          startAccessor="start"
          endAccessor="end"
          showMultiDayTimes
          messages={{next:"Siguiente",previous:"Atrás",today:"Ahora", month:"Mes", week:'Semana', day:"Dia", date:"Fecha", time:"Hora", event:"Eventos"}}
          eventPropGetter={(event) => {
            let backgroundColor = ''
            switch (event.id_estado) {
              case 5:
                backgroundColor = '#ffd000'
                break;
              case 4:
                backgroundColor = '#0055B8'
                break;
              case 3:
                backgroundColor = '#d7272f'
                break;
            
              default:
                break;
            }
            return { style: { backgroundColor } }
          }}
          onNavigate={date => {
              getCalendar(date); // but here I still get the current date
        }}
        defaultDate={getFirstDayOfMonth()}
        min={getFirstDayOfMonth()}
        max={getLastDayOfMonth()}
        views={['month', 'agenda']}
        />
      </div>
)}
export default React.memo(CalendarGoogle)