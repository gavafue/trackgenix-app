import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { superadminReducer } from './superadmin/reducers';
import { tasksReducer } from './tasks/reducer';
import { projectsReducer } from './projects/reducer';
import { employeesReducer } from './employees/reducer';
import { adminsReducer } from './admins/reducer';
import { timesheetsReducer } from './timesheet/reducer';
import { authReducer } from './auth/reducer';

const rootReducer = combineReducers({
  admins: adminsReducer,
  tasks: tasksReducer,
  projects: projectsReducer,
  employees: employeesReducer,
  superadmins: superadminReducer,
  timesheets: timesheetsReducer,
  auth: authReducer
});

const configureStore = () => {
  const enhancer = composeWithDevTools(applyMiddleware(thunk));
  return createStore(rootReducer, enhancer);
};

const store = configureStore();

export default store;
