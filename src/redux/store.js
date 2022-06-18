import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { superadminReducer } from './superadmin/reducers';
import { tasksReducer } from './tasks/reducer';
import { projectsReducer } from './projects/reducer';
import { employeesReducer } from './employees/reducer';

const rootReducer = combineReducers({
  superadmins: superadminReducer,
  tasks: tasksReducer,
  projects: projectsReducer,
  employees: employeesReducer
});

const configureStore = () => {
  const enhancer = composeWithDevTools(applyMiddleware(thunk));
  return createStore(rootReducer, enhancer);
};

const store = configureStore();

export default store;
