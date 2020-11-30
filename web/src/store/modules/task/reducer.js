export default function task(state = [], action) {
  switch (action.type) {
    case '@task/ADD_SUCCESS':
      return [...state, action.task];

    case '@task/REMOVE':
      return state.filter((task) => task.id !== action.id);

    case '@task/UPDATE_SUCCESS':
      return state.map((item) =>
        item.id === action.id ? { ...item, task: action.task } : item
      );

    default:
      return state;
  }
}
