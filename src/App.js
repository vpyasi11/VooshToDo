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
        <Route path="/Login" element={LoginScreen} />
        <Route path="/Profile" element={ProfileScreen} />
        <Route path="/TodoList" element={TodoListScreen} />
        <Route name="/AddTask" element={AddTaskScreen} />
        <Route name="/TaskDetail" element={TaskDetailScreen} />
      </Route>

    </Routes>
    </BrowserRouter>
  );
}
  