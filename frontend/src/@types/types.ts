export interface checkBoxProps {
  parameters: string[];
}

export interface Home {
  id: number;
  street_address: string;
  list_price: number;
  state: string;
  zip: number;
  sqft: number;
  beds: number;
  baths: number;
}

export interface cardprops {
  home: Home[];
}

export interface User {
  id: number,
  username: string,
  email: string
}
