import { useState } from "react";
import Loader from "../../../components/Loader";
import SectionTitle from "../../../components/SectionTitle";
import useNotifications from "../../../hooks/useNotifications";
import useUser from "../../../hooks/useUser";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useFilterNotifications from "../../../hooks/useFilterNotifications";

const AllNotifications = () => {
  const { isLoading, refetch } = useNotifications();
  const { user, isLoading: userLoading } = useUser();
  const [loading, setLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const readNotifications = useFilterNotifications("read");
  const unreadNotifications = useFilterNotifications("unread");

  const handleMarkAsRead = async () => {
    try {
      setLoading(true);
      await axiosPrivate.patch(
        `/notification/mark-as-read/${user?.user_email}`
      );
      setLoading(false);
      refetch();
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };

  if (isLoading || userLoading) {
    return <Loader height="min-h-full" />;
  }

  return (
    <section>
      <div>
        <SectionTitle
          heading={"All Notifications"}
          subHeading={"Showing both read and unread notifications"}
        />
      </div>

      {unreadNotifications.length > 0 && (
        <button
          className="btn btn-neutral btn-sm w-40 mx-auto uppercase disabled:text-gray-500"
          onClick={handleMarkAsRead}
          disabled={loading}
        >
          {loading ? (
            <>
              Marking
              <div className="flex items-center justify-center">
                <div>
                  <div className="w-6 h-6 border-t-4 border-b-4 border-neutral rounded-full animate-spin"></div>
                </div>
              </div>
            </>
          ) : (
            "Mark as read"
          )}
        </button>
      )}

      <div className={`text-gray-500 max-w-3xl`}>
        {unreadNotifications.length ? (
          unreadNotifications.map((notification) => (
            <SingleNotification
              key={notification._id}
              notification={notification}
              unread={true}
            />
          ))
        ) : (
          <span>You have no unread notifications.</span>
        )}
      </div>
      <div className="flex items-center text-lg mt-5 xs:mt-10">
        <span className="mr-2">Read Notifications</span>
        <hr className="flex-grow" />
      </div>
      <div className={`text-gray-500 max-w-3xl`}>
        {readNotifications.length ? (
          readNotifications.map((notification) => (
            <SingleNotification
              key={notification._id}
              notification={notification}
            />
          ))
        ) : (
          <span>You have no read notifications.</span>
        )}
      </div>
    </section>
  );
};

const SingleNotification = ({ notification, unread }) => {
  return (
    <div
      className={`${unread && "bg-gray-100 font-semibold rounded-md p-2"} my-4`}
    >
      <span>{notification.message}</span> <br />
      <span className="text-customOrange text-xs font-normal">
        {notification.current_time}
      </span>
    </div>
  );
};

export default AllNotifications;
