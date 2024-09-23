import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const TaskCalendar = ({ tasks, projects, milestones }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Map tasks, projects, and milestones into events
    const taskEvents = tasks.map(task => ({
      title: `Task: ${task.title}`,
      start: new Date(task.dueDate),
      end: new Date(task.dueDate),
      allDay: true,
      type: 'task'
    }));

    const projectEvents = projects.map(project => ({
      title: `Project: ${project.name}`,
      start: new Date(project.dueDate),
      end: new Date(project.dueDate),
      allDay: true,
      type: 'project'
    }));

    const milestoneEvents = milestones.map(milestone => ({
      title: `Milestone: ${milestone.title}`,
      start: new Date(milestone.dueDate),
      end: new Date(milestone.dueDate),
      allDay: true,
      type: 'milestone'
    }));

    setEvents([...taskEvents, ...projectEvents, ...milestoneEvents]);
  }, [tasks, projects, milestones]);

  return (
    <div style={{ height: 500 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        eventPropGetter={(event) => {
          let backgroundColor = event.type === 'task' ? '#ff9800' :
                               event.type === 'project' ? '#4caf50' : '#00bcd4';
          return { style: { backgroundColor } };
        }}
      />
    </div>
  );
};

export default TaskCalendar;
