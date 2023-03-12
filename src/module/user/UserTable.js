import { Table } from "components/table";
import { db } from "firebase-app/firebase-config";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import UserItem from "./UserItem";

const UserTable = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const colRef = collection(db, "users");

    onSnapshot(colRef, (snapshot) => {
      const results = [];

      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setUserList(results);
    });
  }, []);

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Info</th>
            <th>Username</th>
            <th>Email address</th>
            <th>Status</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userList.length > 0 &&
            userList.map((user) => <UserItem user={user} key={user.id} />)}
        </tbody>
      </Table>
    </div>
  );
};

export default UserTable;
