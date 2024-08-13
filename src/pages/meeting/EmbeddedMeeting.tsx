import { useLocation } from "react-router-dom";

export default function EmbeddedMeeting() {
  const { state } = useLocation();
  const proxyUrl = `https://onlineappointment.onrender.com/proxy/meeting?meetingKey=${state?.meetingKey}&encryptPwd=${state?.encryptPwd}`;

  return <iframe src={proxyUrl} width="100%" height="600px" frameBorder="0" />;
}
