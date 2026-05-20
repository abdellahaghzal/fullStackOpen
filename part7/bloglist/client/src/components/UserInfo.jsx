import { removeUser } from "../services/persistentUser";

const UserInfo = ({ user, setUser }) => {
  return (
    <p>
      {user.username} logged in
      <button
        onClick={() => {
          removeUser();
          setUser(null);
        }}
      >
        logout
      </button>
    </p>
  );
};

export default UserInfo;
