import './App.css';
import 'antd/dist/antd.css';
import TabForm from "./components/TabForm"
import dotenv from "dotenv";
dotenv.config();

function App() {
  return (
    <div className="App">
      <TabForm></TabForm>
    </div>
  );
}

export default App;
