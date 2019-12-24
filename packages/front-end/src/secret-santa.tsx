import React, { useState } from "react";
import { secretSanta } from "@cabezonidas/shop-common";

const myParticipants = [
  { name: "Nico cuñado", phone: "91122447624", overseas: false, sendsOverseas: false },
  { name: "Fiore", phone: "91162971368", overseas: false, sendsOverseas: false },
  { name: "Seba", phone: "+642102790126", overseas: true, sendsOverseas: true },
  { name: "Lucia", phone: "+6421780906", overseas: true, sendsOverseas: true },
  { name: "Ali", phone: "91161895704", overseas: false, sendsOverseas: true },
  { name: "Claudio", phone: "91169176429", overseas: false, sendsOverseas: true },
  { name: "Gabiruli", phone: "91168207507", overseas: false, sendsOverseas: true },
  { name: "Lelu", phone: "91128873280", overseas: false, sendsOverseas: true },
  { name: "Marce", phone: "91128261139", overseas: false, sendsOverseas: true },
  { name: "Nico primo", phone: "91130783205", overseas: false, sendsOverseas: true },
  { name: "Vicky", phone: "91138480501", overseas: false, sendsOverseas: true },
];
const gifts = secretSanta(myParticipants.sort(() => Math.random() - 0.5));

export const SecretSanta = () => {
  const argentinianDesignations = gifts.filter(g => !g.from.overseas);
  const luciaDesignation = gifts.find(g => g.from.name === "Lucia");
  const sebaDesignation = gifts.find(g => g.from.name === "Seba");

  const [showArgs, setShowArgs] = useState(false);
  const [showSeb, setShowSeb] = useState(false);
  const [showLucia, setShowLucia] = useState(false);
  return (
    <div style={{ display: "flex" }}>
      <div style={{ margin: 20, padding: 20, border: "1px solid white" }}>
        <div style={{ borderBottom: "1px solid white" }}>Participantes Argentila</div>
        <input type="checkbox" onChange={() => setShowArgs(s => !s)} checked={showArgs} />
        {showArgs && (
          <table>
            <thead>
              <tr>
                <th>From</th>
                <th>To</th>
              </tr>
            </thead>
            <tbody>
              {argentinianDesignations.map((g, i) => (
                <tr key={i}>
                  <td>{g.from.phone}</td>
                  <td>{g.to.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div style={{ margin: 20, padding: 20, border: "1px solid white" }}>
        <div style={{ borderBottom: "1px solid white" }}>Lu</div>
        <input type="checkbox" onChange={() => setShowLucia(s => !s)} checked={showLucia} />
        {showLucia && luciaDesignation && <small>{luciaDesignation.to.name}</small>}
      </div>
      <div style={{ margin: 20, padding: 20, border: "1px solid white" }}>
        <div style={{ borderBottom: "1px solid white" }}>Seba</div>
        <input type="checkbox" onChange={() => setShowSeb(s => !s)} checked={showSeb} />
        {showSeb && sebaDesignation && <small>{sebaDesignation.to.name}</small>}
      </div>
    </div>
  );
};
