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
      createdAt
      updatedAt
    }
  }
`;
