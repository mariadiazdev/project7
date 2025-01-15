import React, { useState } from "react";
import Banner from "./Banner";
import Home from "./Home"; 
import Login from "./Login"; 

// App Component (Event-driven routing)
function App() {
  const [currentView, setCurrentView] = useState("login");

  const handleLoginSuccess = () => {
    setCurrentView("home"); 
  };

  return (
    <div>
      <Banner /> {/* Add the Banner component here to display it on every page */}

      {currentView === "login" && <Login onLoginSuccess={handleLoginSuccess} />}
      {currentView === "home" && <Home />}
    </div>
  );
}

export default App;