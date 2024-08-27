import React from 'react';
import HomePage from './HomePage/HomePage';
import ViewPage from './ViewPage/ViewPage';
import Form from './Form/Form';
import '../styles.css'
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Update from './Form/Update';
function App(){
    return (
        <Router>
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/view/:id" element={<ViewPage/>}/>
            <Route path="/create" element={<Form/>}/>
            <Route path="/update/:id" element={<Update/>}/>
        </Routes>
       
        </Router>
    );
}
export default App;