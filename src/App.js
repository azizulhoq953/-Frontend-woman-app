import './App.css';
import MainDash from './components/MainDash/MainDash';
import RightSide from './components/RightSide/RightSide';
import Sidebar from './components/Sidebar';
import AppRoutes from './routes/Routes';
import ParentComponent from './pages/ParentComponent';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="AppGlass">
          {/* Page content area, ensuring it doesn't get overlapped */}
          <div className="page-content">
            <AppRoutes />
             {/* <ParentComponent />  */}
             <Sidebar />
            {/* // <MainDash />
            <RightSide />  */}
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
