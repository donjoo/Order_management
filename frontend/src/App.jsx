import { BrowserRouter, Route, Routes } from 'react-router-dom'
import OrderForm from './pages/Form'

function App() {

  return (

<div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f9fafb",
        padding: "1rem",
      }}
    >
   
  

    <BrowserRouter>
    <Routes>

      <Route path='/'  element={


            <OrderForm />
   
        } />


    </Routes>
    </BrowserRouter>
  </div>
  )
}

export default App
