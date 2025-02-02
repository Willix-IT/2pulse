import Sample from "./components/Sample";
import { ApiProvider } from "./providers/ApiProvider";
import "./App.css";

function App() {
  return (
    <ApiProvider baseUrl="https://jsonplaceholder.typicode.com/posts">
      <Sample />
    </ApiProvider>
  );
}

export default App;
