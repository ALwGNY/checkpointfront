import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_COUNTRY } from "../api/queries";
import "./AddCountryForm.css";

type Props = {
  onAdd?: (name: string, emoji: string, code: string) => void;
};

export function AddCountryForm({ onAdd }: Props) {
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("");
  const [code, setCode] = useState("");
  const [formError, setFormError] = useState("");

  const [addCountry, { loading, error }] = useMutation(ADD_COUNTRY, {
    onCompleted: () => {
      setName("");
      setEmoji("");
      setCode("");
      setFormError("");
    },
    variables: {
      data: { name, emoji, code },
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !emoji || !code) {
      setFormError("Tous les champs sont obligatoires.");
      return;
    }

    try {
      await addCountry();
      onAdd?.(name, emoji, code);
    } catch {}
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
      <button type="submit" disabled={loading}>
        {loading ? "Ajout..." : "Add"}
      </button>

      {formError && <p style={{ color: "red" }}>{formError}</p>}
      {error && <p style={{ color: "red" }}>{error.message}</p>}
    </form>
  );
}
