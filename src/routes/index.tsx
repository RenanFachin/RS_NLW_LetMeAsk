import { Route, Routes } from "react-router-dom";

// Components
import { Home } from '../pages/Home'
import { NewRoom } from "../pages/NewRoom";

// Contextos
import { AuthContextProvider } from "../contexts/AuthContext";

export function Router() {
    return (
        <AuthContextProvider>
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
        </AuthContextProvider>
    )
}