import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_COUNTRY_BY_CODE } from "../api/queries";

export function CountryPage() {
  const { code } = useParams<{ code: string }>();
  const { data, loading, error } = useQuery(GET_COUNTRY_BY_CODE, {
    variables: { code },
  });

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;
  if (!data?.country) return <p>Pays introuvable.</p>;

  const { name, emoji, continent } = data.country;

  return (
    <div
      style={{
        background: "white",
        padding: "24px",
        borderRadius: "8px",
        boxShadow: "0 2px 4px #ccc",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "8px" }}>
        {emoji} {name}
      </h1>
      <p>
        <strong>Code :</strong> {code}
      </p>
      <p>
        <strong>Continent :</strong> {continent?.name ?? "Non renseigné"}
      </p>
    </div>
  );
}
