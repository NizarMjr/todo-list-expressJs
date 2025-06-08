import TaskInput from "./components/TaskInput";
import TaskProvider from "./components/TaskProvider";
import Tasks from "./components/Tasks";

const App = () => {

  return (
    <TaskProvider>
      <TaskInput />
      <Tasks />
    </TaskProvider>
  )
}

export default App;