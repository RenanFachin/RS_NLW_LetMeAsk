import { Route, Routes } from "react-router-dom";

// Components
import { Home } from '../pages/Home'
import { NewRoom } from "../pages/NewRoom";
import { Room } from "../pages/Room";

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

                <Route
                    path="/rooms/:id" // Precisa do parâmetro id no envio da requisição
                    element={<Room />}
                />
            </Routes>
        </AuthContextProvider>
    )
}