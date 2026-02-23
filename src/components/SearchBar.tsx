import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = "Search for answers..." }: SearchBarProps) {
  return (
    <div className="search-container">
      <div className="search-wrapper">
        <Search className="search-icon" size={20} />
        <input
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}