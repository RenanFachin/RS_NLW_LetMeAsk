import { Route, Routes } from "react-router-dom";

// Components
import { Home } from '../pages/Home'
import { NewRoom } from "../pages/NewRoom";

export function Router() {
    return (
        <Routes>
            <Route
                path="/"  
                element={<Home />}
            />

            <Route
                path="/rooms/new"
                element={<NewRoom />}
            />
        </Routes>

    )
}