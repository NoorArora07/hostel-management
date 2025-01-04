const Notifications = ({ notifications, onClose, onNotificationClick }) => {
  return (
    <div className="absolute right-0 mt-2 w-96 bg-white shadow-lg rounded-lg z-50">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">Notifications</h2>
      </div>
      <ul className="max-h-96 overflow-y-auto">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <li
              key={notification._id}
              className="p-4 border-b cursor-pointer hover:bg-gray-200"
              onClick={() => onNotificationClick(notification._id)}
            >
              <ul>
              <li className="font-bold">{notification.title}</li>
              <li>{notification.message}</li>
              </ul>
              
            </li>
          ))
        ) : (
          <li className="p-4 text-gray-500">No notifications available.</li>
        )}
      </ul>
      <div>
        <button
          onClick={onClose}
          className="text-gray-500 text-center justify-center text-pretty hover:bg-red-300 float-right"
          >
            Close
        </button>
      </div>
    </div>
  );
};

export default Notifications;
