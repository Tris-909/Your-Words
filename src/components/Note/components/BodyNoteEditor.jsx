import React, { useState, useEffect } from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import TextEditor from "components/Note/components/TextEditor";
import EmojiPicker from "components/Note/components/EmojiPicker";

const BodyNoteEditor = ({ content, setContent }) => {
  const [loadingEmoji, setLoadingEmoji] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoadingEmoji(true);
    }, 500);
  }, []);

  return (
    <Grid templateColumns="repeat(5, 1fr)" gap={3} position="relative">
      <GridItem colSpan={3}>
        <TextEditor content={content} setContent={setContent} />
      </GridItem>
      {loadingEmoji && (
        <GridItem colStart={4} colEnd={6} height="100%">
          <EmojiPicker content={content} setContent={setContent} />
        </GridItem>
      )}
    </Grid>
  );
};

export default BodyNoteEditor;
