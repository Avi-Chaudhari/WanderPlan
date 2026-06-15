import Login from "./pages/Login"
import Register from "./pages/Register"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import ProtectedRoute from "./routes/ProtectedRouets"
import Dashboard from "./pages/Dashboard"
import ExpensePanel from "./components/trip-workspace/ExpensePanel"
import TripCreate from "./components/TripCreate"

function App() {

  return (
    <>
      <BrowserRouter >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/trip" element={<TripCreate/>}></Route>

          <Route path="/dash" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } >
          </Route>


          <Route path="/trip/:tripId" element={
             <ProtectedRoute>
              <ExpensePanel />
            </ProtectedRoute>
          } >
          </Route>

        </Routes>
      </BrowserRouter>
    </>

  )
}

export default App


// tripId="2e058a19-0606-45a7-a4e4-87091cc1be0f"