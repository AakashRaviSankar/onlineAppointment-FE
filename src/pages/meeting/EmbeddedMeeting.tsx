import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function EmbeddedMeeting() {
  const { state } = useLocation();

  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const fetchMeeting = async () => {
      try {
        const response = await fetch(
          "https://onlineappointment.onrender.com/embedded",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              meetingKey: state?.meetingKey,
              encryptPwd: state?.encryptPwd,
            }),
          }
        );

        const data = await response.text();

        const iframe = iframeRef.current;

        if (iframe) {
          const doc = iframe.contentDocument || iframe.contentWindow?.document;
          if (doc) {
            doc.open();
            doc.write(data);
            doc.close();
          } else {
            console.error("Could not access the iframe's document.");
          }
        } else {
          console.error("Iframe reference is null.");
        }
      } catch (error) {
        console.error("Error fetching the meeting:", error);
      }
    };

    fetchMeeting();
  }, [state?.meetingKey, state?.encryptPwd]);

  return (
    <iframe
      ref={iframeRef}
      title="Zoho Meeting"
      width="100%"
      height="600px"
      frameBorder="0"
    ></iframe>
  );
}
