import './App.scss';
import Sidebar from "./components/Sidebar";
import ContentRoutes from "./routes/ContentRoutes";

function App() {
    return (
        <div className="App">
            <Sidebar/>
            <div className='content'>
                <ContentRoutes/>
            </div>
        </div>
    );
}

export default App;
