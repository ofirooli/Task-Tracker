const NotificationBell = ({ unreadCount }) => (
    <div className="notification-bell">
      <i className="fas fa-bell"></i>
      {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
    </div>
  );
  
  export default NotificationBell;
  