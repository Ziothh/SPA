import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};


export type Mutation = {
  __typename?: 'Mutation';
  updateTaskPage: TaskPage;
  createTaskPage: TaskPage;
  deleteTaskPage: Scalars['Boolean'];
  createTaskGroup: TaskGroup;
  updateTaskGroup: TaskGroup;
  deleteTaskGroup: Scalars['Boolean'];
  createTask: Task;
  updateTask: Task;
  switchTaskGroup: Task;
  createSubtask: Subtask;
  updateSubtask: Subtask;
  createTaskTag: TaskTag;
  updateTaskTag: TaskTag;
};


export type MutationUpdateTaskPageArgs = {
  colorClass?: Maybe<Scalars['String']>;
  isBookmarked?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
};


export type MutationCreateTaskPageArgs = {
  colorClass: Scalars['String'];
  name: Scalars['String'];
};


export type MutationDeleteTaskPageArgs = {
  id: Scalars['Float'];
};


export type MutationCreateTaskGroupArgs = {
  pageId: Scalars['Float'];
  name: Scalars['String'];
};


export type MutationUpdateTaskGroupArgs = {
  name: Scalars['String'];
  id: Scalars['Float'];
};


export type MutationDeleteTaskGroupArgs = {
  id: Scalars['Float'];
};


export type MutationCreateTaskArgs = {
  groupId: Scalars['Float'];
  data: TaskCreateInput;
};


export type MutationUpdateTaskArgs = {
  data: TaskCreateInput;
  id: Scalars['Float'];
};


export type MutationSwitchTaskGroupArgs = {
  groupId: Scalars['Float'];
  id: Scalars['Float'];
};


export type MutationCreateSubtaskArgs = {
  taskId: Scalars['Float'];
  title: Scalars['String'];
};


export type MutationUpdateSubtaskArgs = {
  isCompleted?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
};


export type MutationCreateTaskTagArgs = {
  taskId: Scalars['Float'];
  color: Scalars['String'];
  title: Scalars['String'];
};


export type MutationUpdateTaskTagArgs = {
  color?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  getAllTaskPages?: Maybe<Array<TaskPage>>;
  getTaskPage?: Maybe<TaskPage>;
  getAllTaskGroups?: Maybe<Array<TaskGroup>>;
  getTaskGroup?: Maybe<TaskGroup>;
  getAllTasks?: Maybe<Array<Task>>;
  getTask?: Maybe<Task>;
  getAllSubtasks?: Maybe<Array<Subtask>>;
  getSubtask?: Maybe<Subtask>;
  getAllTaskTags?: Maybe<Array<TaskTag>>;
  getTaskTag?: Maybe<TaskTag>;
};


export type QueryGetTaskPageArgs = {
  id: Scalars['Float'];
};


export type QueryGetTaskGroupArgs = {
  id: Scalars['Float'];
};


export type QueryGetTaskArgs = {
  id: Scalars['Float'];
};


export type QueryGetSubtaskArgs = {
  id: Scalars['Float'];
};


export type QueryGetTaskTagArgs = {
  id: Scalars['Float'];
};

/** A subtask of a task */
export type Subtask = {
  __typename?: 'Subtask';
  id: Scalars['ID'];
  title: Scalars['String'];
  isCompleted: Scalars['String'];
  task: Task;
};

export type Task = {
  __typename?: 'Task';
  id: Scalars['ID'];
  title: Scalars['String'];
  color: Scalars['String'];
  deadline?: Maybe<Scalars['DateTime']>;
  subtasks: Array<Subtask>;
  tags: Array<TaskTag>;
  group: TaskGroup;
};

/** New Task data */
export type TaskCreateInput = {
  title: Scalars['String'];
  color: Scalars['String'];
  deadline?: Maybe<Scalars['DateTime']>;
};

/** Group of tasks inside a TaskPage */
export type TaskGroup = {
  __typename?: 'TaskGroup';
  id: Scalars['ID'];
  name: Scalars['String'];
  page: TaskPage;
  tasks: Array<Task>;
};

/** Pages of tasks, sorted by TaskGroup */
export type TaskPage = {
  __typename?: 'TaskPage';
  id: Scalars['ID'];
  name: Scalars['String'];
  isBookmarked: Scalars['Boolean'];
  colorClass: Scalars['String'];
  taskGroups: Array<TaskGroup>;
};

/** Tasktag of a task */
export type TaskTag = {
  __typename?: 'TaskTag';
  id: Scalars['ID'];
  title: Scalars['String'];
  color: Scalars['String'];
  task: Task;
};

export type CreateTaskMutationVariables = Exact<{
  groupID: Scalars['Float'];
  taskData: TaskCreateInput;
}>;


export type CreateTaskMutation = { __typename?: 'Mutation', createTask: { __typename?: 'Task', id: string, title: string, color: string, deadline?: Maybe<any>, subtasks: Array<{ __typename?: 'Subtask', id: string, isCompleted: string, title: string }>, tags: Array<{ __typename?: 'TaskTag', id: string, title: string, color: string }> } };

export type CreateTaskPageMutationVariables = Exact<{
  name: Scalars['String'];
  colorClass: Scalars['String'];
}>;


export type CreateTaskPageMutation = { __typename?: 'Mutation', createTaskPage: { __typename?: 'TaskPage', id: string } };

export type CreateTaskGroupMutationVariables = Exact<{
  pageId: Scalars['Float'];
  name: Scalars['String'];
}>;


export type CreateTaskGroupMutation = { __typename?: 'Mutation', createTaskGroup: { __typename?: 'TaskGroup', id: string, name: string } };

export type GetTaskPagesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTaskPagesQuery = { __typename?: 'Query', getAllTaskPages?: Maybe<Array<{ __typename?: 'TaskPage', id: string, name: string, isBookmarked: boolean, colorClass: string, taskGroups: Array<{ __typename?: 'TaskGroup', id: string, name: string, tasks: Array<{ __typename?: 'Task', id: string, title: string, color: string, deadline?: Maybe<any>, subtasks: Array<{ __typename?: 'Subtask', id: string, isCompleted: string, title: string }>, tags: Array<{ __typename?: 'TaskTag', id: string, title: string, color: string }> }> }> }>> };


export const CreateTaskDocument = gql`
    mutation CreateTask($groupID: Float!, $taskData: TaskCreateInput!) {
  createTask(groupId: $groupID, data: $taskData) {
    id
    title
    color
    deadline
    subtasks {
      id
      isCompleted
      title
    }
    tags {
      id
      title
      color
    }
  }
}
    `;

export function useCreateTaskMutation() {
  return Urql.useMutation<CreateTaskMutation, CreateTaskMutationVariables>(CreateTaskDocument);
};
export const CreateTaskPageDocument = gql`
    mutation CreateTaskPage($name: String!, $colorClass: String!) {
  createTaskPage(name: $name, colorClass: $colorClass) {
    id
  }
}
    `;

export function useCreateTaskPageMutation() {
  return Urql.useMutation<CreateTaskPageMutation, CreateTaskPageMutationVariables>(CreateTaskPageDocument);
};
export const CreateTaskGroupDocument = gql`
    mutation CreateTaskGroup($pageId: Float!, $name: String!) {
  createTaskGroup(pageId: $pageId, name: $name) {
    id
    name
  }
}
    `;

export function useCreateTaskGroupMutation() {
  return Urql.useMutation<CreateTaskGroupMutation, CreateTaskGroupMutationVariables>(CreateTaskGroupDocument);
};
export const GetTaskPagesDocument = gql`
    query getTaskPages {
  getAllTaskPages {
    id
    name
    isBookmarked
    colorClass
    taskGroups {
      id
      name
      tasks {
        id
        title
        color
        deadline
        subtasks {
          id
          isCompleted
          title
        }
        tags {
          id
          title
          color
        }
      }
    }
  }
}
    `;

export function useGetTaskPagesQuery(options: Omit<Urql.UseQueryArgs<GetTaskPagesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetTaskPagesQuery>({ query: GetTaskPagesDocument, ...options });
};