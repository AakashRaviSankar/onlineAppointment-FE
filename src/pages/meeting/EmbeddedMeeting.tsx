import { useLocation } from "react-router-dom";

export default function EmbeddedMeeting() {
  const { state } = useLocation();
  const proxyUrl = `https://meeting.zoho.in/meeting/login/embedmeeting.jsp?meetingKey=${state?.meetingKey}&t=${state?.encryptPwd}`;

  return <iframe src={proxyUrl} width="100%" height="600px" frameBorder="0" />;
}
