import Loader from "../../../components/Loader";
import useUser from "../../../hooks/useUser";

const Profile = () => {
  const { user, isLoading } = useUser();
  console.log(user);

  if (isLoading) {
    return <Loader height="min-h-full" />;
  }

  return (
    <div>
      <h1>My Profile</h1>
    </div>
  );
};

export default Profile;
