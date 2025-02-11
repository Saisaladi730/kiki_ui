import React, { lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, RouterProvider } from "react-router-dom";
import Page1 from './Components/Page1';
import Page2 from './Components/Page2';


const page1 = lazy(()=>import("./Components/Page1"))



// window.addEventListener("unload",()=>{
//     localStorage.clear();
// })


function Main() {
    return (
        
            <Router>
                <Routes>
                <Route path='/' element={<Page2/>} />
                    <Route path='/page1' element={<Page1/>} />
                </Routes>
            </Router>
    )

}
export default Main