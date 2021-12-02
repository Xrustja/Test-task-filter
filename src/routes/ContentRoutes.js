import {Navigate, Route, Routes} from "react-router-dom";
import Home from "../components/Home";
import Table from "../components/Table";

const ContentRoutes = () => {
    return (
        <Routes>
            <Route exact path='/' element={<Navigate to="/home" replace/>}/>
            <Route exact path='/home' element={<Home/>}/>
            <Route exact path='/table' element={<Table/>}/>
        </Routes>
    )
}
export default ContentRoutes;
