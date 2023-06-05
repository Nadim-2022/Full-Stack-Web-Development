
const Notification = ({ message }) => {
    return <div className="notification">{message.message}</div>;
  }

const ErrorNotification = ({ message }) => {
    return <div className="error">{message.message}</div>;
  }

export {Notification, ErrorNotification}