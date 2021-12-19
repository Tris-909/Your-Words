/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        type
        boardHeight
        todos {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
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
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getHeading = /* GraphQL */ `
  query GetHeading($id: ID!) {
    getHeading(id: $id) {
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
export const listHeadings = /* GraphQL */ `
  query ListHeadings(
    $filter: ModelHeadingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHeadings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getImages = /* GraphQL */ `
  query GetImages($id: ID!) {
    getImages(id: $id) {
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
export const listImages = /* GraphQL */ `
  query ListImages(
    $filter: ModelImagesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listImages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getSticker = /* GraphQL */ `
  query GetSticker($id: ID!) {
    getSticker(id: $id) {
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
export const listStickers = /* GraphQL */ `
  query ListStickers(
    $filter: ModelStickerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStickers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const byUsername = /* GraphQL */ `
  query ByUsername(
    $username: String
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byUsername(
      username: $username
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        username
        type
        boardHeight
        todos {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
