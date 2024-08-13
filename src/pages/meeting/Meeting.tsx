import { useEffect, useState } from "react";
import { fetchZohoData } from "../../services/service";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

import SweetAlert from "../../components/sweetalert/SweetAlert";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "/node_modules/primeflex/primeflex.css";
import styles from "./styles.module.css";
import pearl from "../../assets/images/peal.png";
import { useNavigate } from "react-router-dom";

interface Session {
  meetingKey: string;
  encryptPwd: string;
  meetingEmbedUrl: string;
  startTimeMillisec: number;
  duration: number;
}

interface ZohoData {
  session: Session[];
}

function Meeting() {
  const [data, setData] = useState<ZohoData | null>(null);
  const [login, setLogin] = useState<string>("");
  const [filteredData, setFilteredData] = useState<Session | null>(null);

  const navigate = useNavigate();
  const [alert, setAlert] = useState<{
    visible: boolean;
    message1: string;
    message2: string;
    type: "success" | "info" | "warning" | "error";
  }>({
    visible: false,
    message1: "",
    message2: "",
    type: "success",
  });

  const onClose = () => {
    setAlert({ ...alert, visible: false });
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newData = data?.session?.find((elem) => elem?.meetingKey === login);

    if (!login) {
      setAlert({
        ...alert,
        visible: true,
        message1: "Info",
        message2: "Please Enter The Meeting Key",
        type: "warning",
      });
      return;
    } else if (!newData) {
      setAlert({
        ...alert,
        visible: true,
        message1: "Warning",
        message2: "Invalid Meeting Key",
        type: "warning",
      });
      return;
    }

    setFilteredData(newData);

    const currentTime = Date.now();
    const startTimeMillisec = newData.startTimeMillisec;
    const endTimeMillisec = startTimeMillisec + newData.duration;

    const timeDifference = startTimeMillisec - currentTime;

    const fiveMinutesInMillisec = 5 * 60 * 1000;

    if (currentTime > endTimeMillisec) {
      setAlert({
        ...alert,
        visible: true,
        message1: "Sorry",
        message2: "The meeting has already ended.",
        type: "warning",
      });
    } else if (timeDifference > fiveMinutesInMillisec) {
      setAlert({
        ...alert,
        visible: true,
        message1: "Sorry",
        message2:
          "The meeting is scheduled to start in more than 5 minutes. Please ComeBack Later",
        type: "warning",
      });
    } else if (timeDifference > 0 && timeDifference <= fiveMinutesInMillisec) {
      navigate("/embeddedmeeting", {
        state: {
          meetingKey: newData?.meetingKey,
          encryptPwd: newData?.encryptPwd,
        },
      });
    } else if (timeDifference <= 0 && currentTime < endTimeMillisec) {
      console.log(newData?.meetingKey);
      navigate("/embeddedmeeting", {
        state: {
          meetingKey: newData?.meetingKey,
          encryptPwd: newData?.encryptPwd,
        },
      });
    } else {
      setAlert({
        ...alert,
        visible: true,
        message1: "Sorry",
        message2:
          "The meeting is scheduled to start in more than 5 minutes. Please ComeBack Later",
        type: "warning",
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const newData = await fetchZohoData();
      setData(newData);
      console.log(newData);
    };

    fetchData();
  }, []);

  return (
    <>
      <div className={`${styles.bgContainer}`}>
        <div className={`flex flex-column min-h-screen `}>
          <img
            src={pearl}
            alt="pearl health"
            width={"10%"}
            className="align-self-center mt-5 pt-5"
          />
          <div className={styles.card}>
            <h2>
              Transform your appearance and boost your confidence with expert
              care at Pearl Health. Your journey to a better you starts here.
            </h2>

            <div className="flex flex-column  gap-2  ">
              <label style={{ fontWeight: "bold" }}> Enter Meeting Key</label>

              <InputText
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                placeholder="Enter Meeting Key..."
              />
              <Button
                label="Join Meeting"
                className="bg-green-400"
                onClick={handleClick}
              />
            </div>
          </div>
        </div>
      </div>
      <SweetAlert
        type={alert.type}
        visible={alert.visible}
        onClose={onClose}
        message1={alert.message1}
        message2={alert.message2}
        buttonText1="OK"
        onButtonClick1={onClose}
      />
    </>
  );
}

export default Meeting;
