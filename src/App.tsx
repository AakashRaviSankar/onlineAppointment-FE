import { useEffect, useState } from "react";
import { fetchZohoData } from "./services/service";

// Define the type for a session object
interface Session {
  meetingKey?: string;
  encryptPwd?: string;
  meetingEmbedUrl: string;
}

interface ZohoData {
  session: Session[];
}

function App() {
  const [data, setData] = useState<ZohoData | null>(null);

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
      {data?.session.map((elem, index) => (
        <iframe
          key={index}
          src={elem?.meetingEmbedUrl}
          width="100%"
          height="100%"
        />
      ))}
    </>
  );
}

export default App;
