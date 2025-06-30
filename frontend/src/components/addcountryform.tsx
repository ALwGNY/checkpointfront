import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_COUNTRY } from "../api/queries";
import "./AddCountryForm.css";

type Props = {
  onAdd?: (name: string, emoji: string, code: string) => void; // ← optionnel maintenant
};

export function AddCountryForm({ onAdd }: Props) {
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("");
  const [code, setCode] = useState("");

  const [addCountry, { error }] = useMutation(ADD_COUNTRY, {
    variables: {
      data: { name, emoji, code },
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !emoji || !code) return;

    try {
      await addCountry(); 
      onAdd?.(name, emoji, code); 
      setName("");
      setEmoji("");
      setCode("");
    } catch (err) {
      console.error("Erreur lors de l'ajout :", err);
    }
  };

  return (
    <form className="add-country-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Emoji"
        value={emoji}
        onChange={(e) => setEmoji(e.target.value)}
      />
      <input
        type="text"
        placeholder="Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button type="submit">Add</button>
      {error && <p style={{ color: "red" }}>Erreur : {error.message}</p>}
    </form>
  );
}
