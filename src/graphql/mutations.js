/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      username
      type
      boardHeight
      todos {
        items {
          id
          userId
          name
          description
          image
          x
          y
          createdAt
          updatedAt
        }
        nextToken
      }
      lockEdit
      name
      avatarSource
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      username
      type
      boardHeight
      todos {
        items {
          id
          userId
          name
          description
          image
          x
          y
          createdAt
          updatedAt
        }
        nextToken
      }
      lockEdit
      name
      avatarSource
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      username
      type
      boardHeight
      todos {
        items {
          id
          userId
          name
          description
          image
          x
          y
          createdAt
          updatedAt
        }
        nextToken
      }
      lockEdit
      name
      avatarSource
      createdAt
      updatedAt
    }
  }
`;
export const createTodo = /* GraphQL */ `
  mutation CreateTodo(
    $input: CreateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    createTodo(input: $input, condition: $condition) {
      id
      userId
      name
      description
      image
      labels {
        id
        color
        content
      }
      x
      y
      createdAt
      updatedAt
    }
  }
`;
export const updateTodo = /* GraphQL */ `
  mutation UpdateTodo(
    $input: UpdateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    updateTodo(input: $input, condition: $condition) {
      id
      userId
      name
      description
      image
      labels {
        id
        color
        content
      }
      x
      y
      createdAt
      updatedAt
    }
  }
`;
export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo(
    $input: DeleteTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    deleteTodo(input: $input, condition: $condition) {
      id
      userId
      name
      description
      image
      labels {
        id
        color
        content
      }
      x
      y
      createdAt
      updatedAt
    }
  }
`;
export const createHeading = /* GraphQL */ `
  mutation CreateHeading(
    $input: CreateHeadingInput!
    $condition: ModelHeadingConditionInput
  ) {
    createHeading(input: $input, condition: $condition) {
      id
      userId
      content
      type
      x
      y
      width
      height
      color
      fontSize
      rotateDegree
      fontFamily
      bold
      italic
      underline
      strikeThrough
      createdAt
      updatedAt
    }
  }
`;
export const updateHeading = /* GraphQL */ `
  mutation UpdateHeading(
    $input: UpdateHeadingInput!
    $condition: ModelHeadingConditionInput
  ) {
    updateHeading(input: $input, condition: $condition) {
      id
      userId
      content
      type
      x
      y
      width
      height
      color
      fontSize
      rotateDegree
      fontFamily
      bold
      italic
      underline
      strikeThrough
      createdAt
      updatedAt
    }
  }
`;
export const deleteHeading = /* GraphQL */ `
  mutation DeleteHeading(
    $input: DeleteHeadingInput!
    $condition: ModelHeadingConditionInput
  ) {
    deleteHeading(input: $input, condition: $condition) {
      id
      userId
      content
      type
      x
      y
      width
      height
      color
      fontSize
      rotateDegree
      fontFamily
      bold
      italic
      underline
      strikeThrough
      createdAt
      updatedAt
    }
  }
`;
export const createImages = /* GraphQL */ `
  mutation CreateImages(
    $input: CreateImagesInput!
    $condition: ModelImagesConditionInput
  ) {
    createImages(input: $input, condition: $condition) {
      id
      userId
      list {
        id
        source
      }
      type
      x
      y
      width
      height
      createdAt
      updatedAt
    }
  }
`;
export const updateImages = /* GraphQL */ `
  mutation UpdateImages(
    $input: UpdateImagesInput!
    $condition: ModelImagesConditionInput
  ) {
    updateImages(input: $input, condition: $condition) {
      id
      userId
      list {
        id
        source
      }
      type
      x
      y
      width
      height
      createdAt
      updatedAt
    }
  }
`;
export const deleteImages = /* GraphQL */ `
  mutation DeleteImages(
    $input: DeleteImagesInput!
    $condition: ModelImagesConditionInput
  ) {
    deleteImages(input: $input, condition: $condition) {
      id
      userId
      list {
        id
        source
      }
      type
      x
      y
      width
      height
      createdAt
      updatedAt
    }
  }
`;
export const createAudio = /* GraphQL */ `
  mutation CreateAudio(
    $input: CreateAudioInput!
    $condition: ModelAudioConditionInput
  ) {
    createAudio(input: $input, condition: $condition) {
      id
      userId
      source
      x
      y
      type
      createdAt
      updatedAt
    }
  }
`;
export const updateAudio = /* GraphQL */ `
  mutation UpdateAudio(
    $input: UpdateAudioInput!
    $condition: ModelAudioConditionInput
  ) {
    updateAudio(input: $input, condition: $condition) {
      id
      userId
      source
      x
      y
      type
      createdAt
      updatedAt
    }
  }
`;
export const deleteAudio = /* GraphQL */ `
  mutation DeleteAudio(
    $input: DeleteAudioInput!
    $condition: ModelAudioConditionInput
  ) {
    deleteAudio(input: $input, condition: $condition) {
      id
      userId
      source
      x
      y
      type
      createdAt
      updatedAt
    }
  }
`;
export const createSticker = /* GraphQL */ `
  mutation CreateSticker(
    $input: CreateStickerInput!
    $condition: ModelStickerConditionInput
  ) {
    createSticker(input: $input, condition: $condition) {
      id
      userId
      source
      type
      x
      y
      width
      height
      createdAt
      updatedAt
    }
  }
`;
export const updateSticker = /* GraphQL */ `
  mutation UpdateSticker(
    $input: UpdateStickerInput!
    $condition: ModelStickerConditionInput
  ) {
    updateSticker(input: $input, condition: $condition) {
      id
      userId
      source
      type
      x
      y
      width
      height
      createdAt
      updatedAt
    }
  }
`;
export const deleteSticker = /* GraphQL */ `
  mutation DeleteSticker(
    $input: DeleteStickerInput!
    $condition: ModelStickerConditionInput
  ) {
    deleteSticker(input: $input, condition: $condition) {
      id
      userId
      source
      type
      x
      y
      width
      height
      createdAt
      updatedAt
    }
  }
`;
