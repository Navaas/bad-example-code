import { useState } from "react";

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Simskola tisdagar 16.00" },
  ]);
  const [inputText, setInputText] = useState("");
  const [t, setT] =
    useState(""); /* ESLint, Variabeln deklareras men den används inte. */

  /* ESLint: 't' is assigned a value but never used. */
  interface t {
    id: string;
    text: string;
  }

  const addTodo = () => {
    console.log(
      "Lägger till att göra" + inputText
    ); /* Man bör undvika att använda console.log() med strängar, det kan orsaka problem i produktionsmiljöer. (Bulletproof React) */
    todos.push({
      id: todos.length + 1,
      text: inputText,
    }); /* Man bör undvika att använda push direkt på arrayen. Det är bättre att skapa en ny array. (Bulletproof React) */
    setTodos([
      ...todos,
    ]); /* Det är bättre att skapa en ny array för att vara säker på att komponenten renderas om korrekt. (Bulletproof React)*/
    setInputText("");
    saveToLocalStorage();
    // loadFromLocalStorage();
  };

  const removeTodo = (idToRemove: string | number) => {
    console.log("Tar bort en todo med id:" + idToRemove);
    const update = todos.filter(
      (todos) => todos.id !== idToRemove
    ); /* Använd mer beskrivande variabelnamn som tex "updatedTodos" (Bulletproof React)*/
    setTodos(update);
    localStorage.setItem("todos", JSON.stringify(update));
  };

  const saveToLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
    console.log("Todos saved to localStorage.");
  };

  /* ESLint: Funktionen är deklarerad men den används inte */
  const loadFromLocalStorage = () => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
      console.log("Todos loaded from localStorage.");
    } else {
      console.log("No todos found in localStorage.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        background: "#ECD9DF",
      }}
    >
      {/* ESLint Använda tomma html element utan innehåll. */}
      <h3></h3>
      <div>
        <div>
          <h3 style={{ fontFamily: "Roboto" }}>Lägg till..</h3>
          <input
            type="text"
            placeholder="Skriv här"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            style={{
              width: "340px",
              padding: "10px",
              borderRadius: "5px",
              border: "solid 1px lightgrey",
              fontFamily: "Roboto",
            }}
          />
        </div>
        <div>
          <button
            onClick={addTodo}
            style={{
              padding: "7px",
              width: "70px",
              marginTop: "10px",
              borderRadius: "5px ",
              border: "none",
              background: "#DAB8C2",
              fontFamily: "Roboto",
            }}
          >
            Spara
          </button>
        </div>
      </div>
      <div style={{ marginTop: "50px" }}>
        <h3 style={{ fontFamily: "Roboto" }}>Dina todos..</h3>
        <ul style={{ margin: "0", padding: "0" }}>
          {todos.map((todos, index) => (
            <li
              key={index}
              style={{
                listStyle: "none",
                background: "#DAB8C2",
                marginBottom: "10px",
                width: "350px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "5px",
                borderRadius: "5px",
                fontFamily: "Roboto",
                color: "black",
              }}
            >
              {" "}
              {/* Att använda index som en nuik nyckel är inte att föredra. Bättre att använda todos.id. (Bulletproof React)*/}
              {todos.text}
              {/* ESLint: Inline-stilar bör undvikas. Externa CSS-filer eller styled components för att separera stilar.*/}
              <button
                onClick={() => removeTodo(todos.id)}
                style={{
                  border: "none",
                  cursor: "pointer",
                  background: "none",
                }}
              >
                <span className="material-symbols-outlined">delete</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
