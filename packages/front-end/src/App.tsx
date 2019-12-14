import React from "react";
import "./App.css";
import { Square } from "@cabezonidas/shop-ui";
import { secretSanta } from "@cabezonidas/shop-common";

const myParticipants = [
  { name: "nico", phone: "123456" },
  { name: "lelu", phone: "123456" },
  { name: "fiore", phone: "123456" },
  { name: "ali", phone: "123456" },
  { name: "tia", phone: "123456" },
  { name: "ma", phone: "123456" },
  { name: "dani", phone: "123456" },
  { name: "pa", phone: "123456" },
  { name: "seba", phone: "123456" },
  { name: "cu", phone: "123456" },
];

const App: React.FC = () => {
  const gifts = secretSanta(myParticipants);
  return (
    <div className="App">
      <header className="App-header">
        <table>
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
            </tr>
          </thead>
          <tbody>
            {gifts.map((g, i) => (
              <tr key={i}>
                <td>
                  {g.from.phone} ({g.from.name})
                </td>
                <td>{g.to.name}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <Square />
      </header>
    </div>
  );
};

export default App;
