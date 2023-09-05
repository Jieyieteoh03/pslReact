import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Home";
import ItemsAdd from "./ItemsAdd";
import ItemsEdit from "./ItemsEdit";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/items_add" element={<ItemsAdd />} />
        <Route path="/items/:id" element={<ItemsEdit />} />
      </Routes>
    </Router>
  );
}

export default App;
