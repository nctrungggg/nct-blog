import { Button } from "components/button";
import { useAuth } from "contexts/auth-context";
import { db } from "firebase-app/firebase-config";
import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { debounce } from "lodash";
import DashboardHeading from "module/dashboard/DashboardHeading";
import React, { useState } from "react";
import { useEffect } from "react";
import { userRole, USER_PER_PAGE } from "utils/constants";
import UserTable from "./UserTable";

const UserManage = () => {
  const { userInfo } = useAuth();
  console.log("userInfo", userInfo);

  const [userList, setUserList] = useState([]);
  const [filter, setFilter] = useState(undefined);
  const [lastDoc, setLastDoc] = useState();
  const [totalUser, setTotalUser] = useState(0);

  const handleLoadMoreUser = async () => {
    const nextRef = query(
      collection(db, "users"),
      startAfter(lastDoc || 0),
      limit(USER_PER_PAGE)
    );

    onSnapshot(nextRef, (snapshot) => {
      let results = [];

      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setUserList([...userList, ...results]);
    });

    const documentSnapshots = await getDocs(nextRef);

    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];

    setLastDoc(lastVisible);
  };

  useEffect(() => {
    (async function fetchData() {
      const colRef = collection(db, "users");

      const newRef = filter
        ? query(
            colRef,
            where("fullname", ">=", filter),
            where("fullname", "<=", filter + "utf8")
          )
        : query(colRef, limit(USER_PER_PAGE));

      const documentSnapshots = await getDocs(newRef);
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];

      onSnapshot(colRef, (snapshot) => {
        setTotalUser(snapshot.size);
      });

      onSnapshot(newRef, (snapshot) => {
        let results = [];

        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        setUserList(results);
      });

      setLastDoc(lastVisible);
    })();
  }, [filter]);

  const handleInputFilter = debounce((e) => {
    setFilter(e.target.value);
  }, 500);

  if (userInfo.role !== userRole.ADMIN) return null;

  return (
    <div>
      <div>
        <DashboardHeading title="Users" desc="Manage your user">
          <Button kind="ghost" height="45px" to="/manage/add-user">
            Add new user
          </Button>
        </DashboardHeading>

        <div className="flex md:justify-end mb-10">
          <input
            type="text"
            placeholder="Search user..."
            className=" p-2 md:px-4 md:py-3 border border-gray-300 rounded-lg outline-none"
            onChange={handleInputFilter}
          />
        </div>
      </div>

      <UserTable userList={userList}></UserTable>

      {totalUser > userList.length && (
        <div className="mt-10">
          <Button
            onClick={handleLoadMoreUser}
            className="mx-auto"
            height="50px"
            kind="green"
          >
            Load more
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserManage;
