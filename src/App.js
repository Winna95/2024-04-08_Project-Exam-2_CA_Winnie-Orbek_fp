import logo from './logo.svg';
import './App.css';
import Venues from "./components/homepage/homepage";
import './Custom.scss';
import './App.scss'
import {Route, Routes} from "react-router-dom";
import Layout from "./components/common/Layout";


function App() {
  return (
    <div className="light-blue-bg">
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Venues />} />
                <Route path="*" element={<div>Route not found</div>} />
            </Route>
        </Routes>
    </div>
  );
}

export default App;
