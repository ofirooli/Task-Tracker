import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const TaskPriorityChart = ({ tasks }) => {
  const priorityCounts = {
    low: tasks.filter(task => task.priority === 'low').length,
    medium: tasks.filter(task => task.priority === 'medium').length,
    high: tasks.filter(task => task.priority === 'high').length,
  };

  const data = {
    labels: ['Low', 'Medium', 'High'],
    datasets: [
      {
        data: [priorityCounts.low, priorityCounts.medium, priorityCounts.high],
        backgroundColor: ['#64ffda', '#ff9800', '#f44336'],
      },
    ],
  };

  return (
    <div style={{ width: '300px', height: '300px', margin: '0 auto' }}>
      <Pie data={data} />
    </div>
  );
};

export default TaskPriorityChart;
