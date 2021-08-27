import React, { useState, useEffect } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { fetchListNotes } from "redux/features/notes/note";
import { fetchHeadings } from "redux/features/heading/heading";
import { fetchImages } from "redux/features/images/images";
import { getUserInfo, getAuth } from "redux/features/user/userInfo";
import { Auth } from "aws-amplify";
import Note from "components/Note/Note";
import SideHelp from "components/Note/components/SideHelp";
import Heading from "components/Heading/Heading";
import Images from "components/Images/Images";
import HeadingSideHelp from "components/Heading/components/SideHelp/HeadingSideHelp";

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { list } = useSelector((state) => state.notes);
  const { headings } = useSelector((state) => state.headings);
  const { editHeading } = useSelector((state) => state.headings);
  const { images } = useSelector((state) => state.images);
  const { userInfo } = useSelector((state) => state.user);
  const [username, setUsername] = useState(null);
  const [showEditHeading, setShowEditHeading] = useState(false);
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
      dispatch(fetchImages(userInfo.data.id));
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
      {headings.data &&
        headings.data.map((singleHeading) => {
          return (
            <Heading
              key={singleHeading.id}
              content={singleHeading.content}
              id={singleHeading.id}
              positionX={singleHeading.x}
              positionY={singleHeading.y}
              headingWidth={singleHeading.width}
              headingHeight={singleHeading.height}
              headingColor={singleHeading.color}
              headingFontsize={singleHeading.fontSize}
              headingRotateDegree={singleHeading.rotateDegree}
              headingFontFamily={singleHeading.fontFamily}
              headingBold={singleHeading.bold}
              headingItalic={singleHeading.italic}
              headingUnderline={singleHeading.underline}
              headingStrikethrough={singleHeading.strikeThrough}
              showEditHeading={singleHeading.id === editHeading?.id}
              setShowEditHeading={setShowEditHeading}
            />
          );
        })}
      {images.data &&
        images.data.map((image) => {
          return <Images key={image.id} image={image} />;
        })}
      <SideHelp
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        fetchLists={fetchLists}
      />
      {showEditHeading && (
        <HeadingSideHelp setShowEditHeading={setShowEditHeading} />
      )}
    </>
  );
};

export default Home;
