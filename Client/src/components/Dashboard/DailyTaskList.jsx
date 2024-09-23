const DailyTaskList = ({ tasks }) => {
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
  
    const todayTasks = tasks.filter(task => task.dueDate && task.dueDate.startsWith(today));
  
    return (
      <div>
        <h3>Today's Tasks</h3>
        {todayTasks.length > 0 ? (
          <ul>
            {todayTasks.map(task => (
              <li key={task._id}>{task.title}</li>
            ))}
          </ul>
        ) : (
          <p>No tasks for today</p>
        )}
      </div>
    );
  };
  
  export default DailyTaskList;
  