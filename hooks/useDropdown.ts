import {Dispatch, SetStateAction, useState} from "react";

export interface DropdownItem {
  value: string | number;
  label: string;
}

interface DropdownHookReturn {
  dropdownOpen: boolean;
  setIsDropdownOpen: Dispatch<SetStateAction<boolean>>;
  dropdownValue: string | null;
  setDropdownValue: Dispatch<SetStateAction<string | null>>;
  items: DropdownItem[];
  setItems: Dispatch<SetStateAction<DropdownItem[]>>;
}

export const useDropdown = (
  dropdownItems: DropdownItem[]
): DropdownHookReturn => {
  const [dropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownValue, setDropdownValue] = useState<string | null>(null);
  const [items, setItems] = useState(dropdownItems);

  return {
    dropdownOpen,
    setIsDropdownOpen,
    dropdownValue,
    setDropdownValue,
    items,
    setItems
  };
};
