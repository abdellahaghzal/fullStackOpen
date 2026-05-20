import { Alert } from "@mui/material";
import { useNotif } from "../stores/notifStore";

const Notification = () => {
  const notif = useNotif();
  if (!notif) {
    return null;
  }
  return (
    <Alert style={{ marginTop: 10, marginBottom: 10 }} severity={notif.type}>
      {notif.message}
    </Alert>
  );
};

export default Notification;
