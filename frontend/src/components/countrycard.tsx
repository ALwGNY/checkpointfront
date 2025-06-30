import { Link } from "react-router-dom";
import "./CountryCard.css";

type Props = {
  name: string;
  emoji: string;
  code: string;
};

export function CountryCard({ name, emoji, code }: Props) {
  return (
    <Link to={`/country/${code}`} className="country-card">
      <div className="emoji">{emoji}</div>
      <div>{name}</div>
      <div className="code">{code}</div>
    </Link>
  );
}