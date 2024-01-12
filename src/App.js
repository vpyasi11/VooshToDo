import {BrowserRouter,Routes,Route} from "react-router-dom"
export default function App() {
  const [user, setUser] = useState(false);

  const checkLogin = async () => {
    let temp = await AsyncStorage.getItem('access_token');
    if (temp) {
      setUser(true);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []); // Ensure that this useEffect runs only once on component mount

  return (
    <BrowserRouter>
    <Routes>
      <Route initialRouteName={user ? 'TodoList' : 'Login'}>
        <Route name="Login" component={LoginScreen} />
        <Route name="Profile" component={ProfileScreen} />
        <Route name="TodoList" component={TodoListScreen} />
        <Route name="AddTask" component={AddTaskScreen} />
        <Route name="TaskDetail" component={TaskDetailScreen} />
      </Route>

    </Routes>
    </BrowserRouter>
  );
}
  