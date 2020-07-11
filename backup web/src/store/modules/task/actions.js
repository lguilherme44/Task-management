export function addToTaskRequest(id) {
  return {
    type: '@task/ADD_REQUEST',
    id,
  };
}

export function addToTaskSuccess(task) {
  return {
    type: '@task/ADD_SUCCESS',
    task,
  };
}

export function removeFromTask(id) {
  return {
    type: '@task/REMOVE',
    id,
  };
}

export function updateTaskRequest(id, task) {
  return {
    type: '@task/UPDATE_REQUEST',
    id,
    task,
  };
}

export function updateTaskSuccess(id, task) {
  return {
    type: '@task/UPDATE_SUCCESS',
    id,
    task,
  };
}
