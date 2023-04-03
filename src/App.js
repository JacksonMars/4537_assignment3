import Login from "./Login";
import Search from "./Search";
import Result from "./Result";
import { useState } from "react";

function App() {
  const [selectedTypes, setSelectedTypes] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  return (
    // <h1><Login></Login></h1>
    <>
      <Search selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes} setCurrentPage={setCurrentPage} />
      <Result selectedTypes={selectedTypes} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </>
  );
}

export default App;
