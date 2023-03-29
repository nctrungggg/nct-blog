import { Table } from "components/table";
import UserItem from "./UserItem";

const UserTable = ({ userList }) => {
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
