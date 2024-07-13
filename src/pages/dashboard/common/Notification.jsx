import { useState } from "react";
import { FaBell } from "react-icons/fa";
import useNotifications from "../../../hooks/useNotifications";
import Loader from "../../../components/Loader";
import styles from "./notification.module.css";
import useFilterNotifications from "../../../hooks/useFilterNotifications";

const Notification = () => {
  const { isLoading } = useNotifications();
  const [open, setOpen] = useState(false);
  const unreadNotifications = useFilterNotifications("unread");

  if (isLoading) {
    return <Loader height="min-h-full" />;
  }

  return (
    <div>
      <button
        className="relative flex ml-5"
        tabIndex={3}
        onClick={() => setOpen(!open)}
      >
        <FaBell className="text-5xl hover:scale-105 duration-75 bg-gray-50 border-2 rounded-full w-12 h-12 sm:w-14 sm:h-14 p-2 sm:p-3" />
        {unreadNotifications.length ? (
          <div className="absolute -right-[15px] z-50 badge badge-sm sm:badge-md bg-red-600 text-white -ml-3">
            +{unreadNotifications.length}
          </div>
        ) : (
          ""
        )}
      </button>
      {open ? (
        <div
          tabIndex={3}
          className={`${styles.notification} shadow-lg text-gray-500 rounded-box bg-gray-50 mr-2 mt-2 xs:mt-3 z-[1] p-4 max-w-md`}
        >
          {unreadNotifications.length ? (
            unreadNotifications.map((notification) => (
              <div key={notification._id} className="text-sm font-semibold">
                <div className="my-2">
                  <span>{notification.message}</span> <br />
                  <span className="text-customOrange text-xs font-normal">
                    {notification.current_time}
                  </span>
                </div>
                <hr />
              </div>
            ))
          ) : (
            <span>You have no unread notifications.</span>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Notification;
