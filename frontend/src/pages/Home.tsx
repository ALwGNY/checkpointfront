import { useQuery } from "@apollo/client";
import { useState } from "react";
import { GET_COUNTRIES } from "../api/queries";
import { CountryCard } from "../components/countrycard";
import { AddCountryForm } from "../components/addcountryform";
import "./Home.css";


type Country = {
  name: string;
  code: string;
  emoji: string;
};

export function HomePage() {
  const { data, loading, error } = useQuery(GET_COUNTRIES);
  const [localCountries, setLocalCountries] = useState<Country[]>([]);

  const handleAddCountry = (name: string, emoji: string, code: string) => {
    const newCountry = { name, emoji, code };
    setLocalCountries((prev) => [...prev, newCountry]);
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  const allCountries = [...data.countries, ...localCountries];

  return (
    <div>
      <AddCountryForm onAdd={handleAddCountry} />

      <div className="country">
        {allCountries.map((country) => (
          <CountryCard
            key={country.code}
            name={country.name}
            emoji={country.emoji}
            code={country.code}
          />
        ))}
      </div>

    </div>
  );
}
