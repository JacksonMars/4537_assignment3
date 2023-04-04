import Login from "./Login";
import Search from "./Search";
import Result from "./Result";
import { useState } from "react";

function App() {
  const [selectedTypes, setSelectedTypes] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [user, setUser] = useState(null);

  return (
    <>
      {
        (user === null) &&
        <h1><Login user={user} setUser={setUser}></Login></h1>
      }
      <Search selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes} setCurrentPage={setCurrentPage} />
      <Result selectedTypes={selectedTypes} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </>
  );
}

export default App;
