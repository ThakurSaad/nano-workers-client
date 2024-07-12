import { useState } from "react";
import { FaBell } from "react-icons/fa";
import useNotifications from "../../../hooks/useNotifications";
import Loader from "../../../components/Loader";
import styles from "./notification.module.css";

const Notification = () => {
  const { notifications, isLoading } = useNotifications();
  const [open, setOpen] = useState(false);

  const handleNotification = () => {
    setOpen(!open);
    console.log(notifications);
    console.log("click");
  };

  if (isLoading) {
    return <Loader height="min-h-full" />;
  }

  return (
    <div>
      <button className="ml-5 flex" tabIndex={3} onClick={handleNotification}>
        <FaBell className="text-5xl hover:scale-105 duration-75 bg-orange-200 border-2 rounded-full w-12 h-12 sm:w-14 sm:h-14 p-2 sm:p-3" />
        <div className="relative z-50 badge badge-sm sm:badge-md bg-error text-white -ml-3">
          99
        </div>
      </button>
      {open ? (
        <ul
          tabIndex={3}
          className={`${styles.notification} shadow rounded-box bg-orange-50 mr-2 mt-2 xs:mt-3 z-[1] p-2 max-w-md`}
        >
          {notifications.map((notification) => (
            <li key={notification._id}>
              <span>{notification.message}</span>
            </li>
          ))}
        </ul>
      ) : (
        ""
      )}
    </div>
  );
};

export default Notification;
