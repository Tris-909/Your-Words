/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo {
    onCreateTodo {
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
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo {
    onUpdateTodo {
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
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo {
    onDeleteTodo {
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
export const onCreateHeading = /* GraphQL */ `
  subscription OnCreateHeading {
    onCreateHeading {
      id
      userId
      content
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
export const onUpdateHeading = /* GraphQL */ `
  subscription OnUpdateHeading {
    onUpdateHeading {
      id
      userId
      content
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
export const onDeleteHeading = /* GraphQL */ `
  subscription OnDeleteHeading {
    onDeleteHeading {
      id
      userId
      content
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
