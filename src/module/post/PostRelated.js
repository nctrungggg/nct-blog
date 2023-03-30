import Heading from "components/layout/Heading";
import { db } from "firebase-app/firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import PostItem from "./PostItem";

const PostRelated = ({ postId = "", categoryName }) => {
  console.log(categoryName);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const docRef = query(
      collection(db, "posts"),
      where("category.name", "==", categoryName)
    );

    onSnapshot(docRef, (snapshot) => {
      const results = [];

      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      // eslint-disable-next-line array-callback-return
      const filterResult = results.filter((item) => {
        return item.id !== postId;
      });

      setPosts(filterResult);
    });
  }, [categoryName, postId]);

  if (posts.length <= 0) return null;

  return (
    <div className="post-related">
      <Heading>Bài viết liên quan</Heading>

      <div className="grid-layout grid-layout--primary">
        {posts.map((item) => (
          <PostItem key={item.id} data={item}></PostItem>
        ))}
      </div>
    </div>
  );
};

export default PostRelated;
