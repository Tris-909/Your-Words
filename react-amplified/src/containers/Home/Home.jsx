import React, { useEffect } from "react";
import { useDisclosure } from "@chakra-ui/react";
import Note from "components/Note/Note";
import SideHelp from "components/Note/components/SideHelp";
import { useSelector, useDispatch } from "react-redux";
import { fetchListNotes } from "redux/features/notes/note";

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { list } = useSelector((state) => state.notes);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchLists();
  }, []);

  const fetchLists = async () => {
    dispatch(fetchListNotes());
  };

  return (
    <>
      {list.data.map((singleTodo) => {
        return (
          <Note
            key={singleTodo.noteId}
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
