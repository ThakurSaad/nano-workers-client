import useNotifications from "./useNotifications";

const useFilterNotifications = (status) => {
  const { notifications } = useNotifications();

  return notifications.filter((notification) => notification.status === status);
};

export default useFilterNotifications;
