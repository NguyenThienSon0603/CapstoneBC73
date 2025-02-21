export type TaskType = {
    taskId: number;
    taskName: string;
    alias: string;
    description: string;
    statusId: string;
    originalEstimate: number;
    timeTrackingSpent: number;
    timeTrackingRemaining: number;
    typeId: number;
    priorityId: number;
    projectId: number;
    priorityTask: {
      priorityId: number;
      priority: string;
    };
    taskTypeDetail: {
      id: number;
      taskType: string;
    };
    assigness: {
      id: number;
      avatar: string;
      name: string;
      alias: string;
    }[];
    lstComment: [];
  };
  
  export type TaskStatusType = {
    statusId: string;
    statusName: string;
    alias: string;
    lstTaskDeTail: TaskType[];
  };
  
  export type ProjectDetailType = {
    statusCode: number;
    message: string;
    content: {
      lstTask: TaskStatusType[];
      members: [];
      creator: {
        id: number;
        name: string;
      };
      id: number;
      projectName: string;
      description: string;
      projectCategory: {
        id: number;
        name: string;
      };
      alias: string;
    };
    dateTime: string;
  };
  