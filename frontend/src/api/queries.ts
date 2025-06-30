import { gql } from "@apollo/client";

export const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      code
      name
      emoji
    }
  }
`;

export const GET_COUNTRY_BY_CODE = gql`
  query GetCountry($code: String!) {
    country(code: $code) {
      name
      code
      emoji
      continent {
        name
      }
    }
  }
`;

export const ADD_COUNTRY = gql`
  mutation AddCountry($data: NewCountryInput!) {
    addCountry(data: $data) {
      code
      name
      emoji
      continent {
        name
      }
    }
  }
`;

export const GET_CONTINENTS = gql`
  query GetContinents {
    continents {
      code
      name
    }
  }
`;

export const ADD_CONTINENT = gql`
  mutation AddContinent($data: NewContinentInput!) {
    addContinent(data: $data) {
      code
      name
    }
  }
`;
