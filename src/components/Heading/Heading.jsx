import React, { useState } from "react";
import { Editable, EditableInput, EditablePreview } from "@chakra-ui/react";

const Heading = () => {
  const [content, setContent] = useState("");

  return (
    <Editable defaultValue="Take some chakra">
      <EditablePreview />
      <EditableInput />
    </Editable>
  );
};

export default Heading;
