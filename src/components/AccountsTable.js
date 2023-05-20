import { Card, List, Spin } from "antd";
import { useEffect, useState } from "react";

export const AccountsTable = () => {
  const [users, setUsers] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        setLoadingData(true);
        const response = await fetch("/users", { method: "GET" });
        const dat = await response.text();
        const parsed = JSON.parse(dat);
        setUsers(parsed);
      } catch (e) {
        console.log("error", e); // could use this to set errors
      } finally {
        setLoadingData(false);
      }
    })();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h1>Users</h1>
      {loadingData ? (
        <Spin spinning={true} />
      ) : (
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={users}
          renderItem={(user) => (
            <List.Item itemID={user.username}>
              <Card title={user.username}>
                <p>Account Type: {user.accountType}</p>
                <p>Server Address: {user.serverAddress}</p>
                {/* Add more details here */}
              </Card>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};
