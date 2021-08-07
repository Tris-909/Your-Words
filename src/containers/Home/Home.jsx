import React, { useEffect } from "react";
import { useDisclosure } from "@chakra-ui/react";
import Note from "components/Note/Note";
import SideHelp from "components/Note/components/SideHelp";
import { useSelector, useDispatch } from "react-redux";
import { fetchListNotes } from "redux/features/notes/note";
import { getUserInfo } from "redux/features/user/userInfo";

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { list } = useSelector((state) => state.notes);
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  useEffect(() => {
    fetchLists();
  }, [userInfo]);

  const fetchLists = () => {
    if (userInfo.data) {
      dispatch(fetchListNotes(userInfo.data.id));
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
