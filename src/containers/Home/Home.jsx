import React, { useState, useEffect } from "react";
import { useDisclosure } from "@chakra-ui/react";
import Note from "components/Note/Note";
import SideHelp from "components/Note/components/SideHelp";
import { useSelector, useDispatch } from "react-redux";
import { fetchListNotes } from "redux/features/notes/note";
import { fetchHeadings } from "redux/features/heading/heading";
import { getUserInfo, getAuth } from "redux/features/user/userInfo";
import { Auth } from "aws-amplify";

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { list } = useSelector((state) => state.notes);
  const { userInfo } = useSelector((state) => state.user);
  const [username, setUsername] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    getUserName();
    dispatch(getAuth());
  }, []);

  useEffect(() => {
    if (username) {
      dispatch(getUserInfo(username));
    }
  }, [username]);

  useEffect(() => {
    fetchLists();
  }, [userInfo]);

  const getUserName = async () => {
    const res = await Auth.currentUserInfo();
    setUsername(res.username);
  };

  const fetchLists = () => {
    if (userInfo.data) {
      dispatch(fetchListNotes(userInfo.data.id));
      dispatch(fetchHeadings(userInfo.data.id));
    }
  };

  return (
    <>
      {list.data &&
        list.data.map((singleTodo) => {
          return (
            <Note
              key={singleTodo.id}
              note={singleTodo}
              fetchLists={fetchLists}
            />
          );
        })}
      <SideHelp
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        fetchLists={fetchLists}
      />
    </>
  );
};

export default Home;
