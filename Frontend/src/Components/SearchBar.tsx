// src/Components/SearchBar.tsx
// Importing third party package
// Adding Search bar on dashboard
import { Box, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface Props {
  query: string;
  setQuery: (value: string) => void;
  onSearch: () => void;
  onEnterKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<Props> = ({ query, setQuery, onSearch, onEnterKeyDown }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        bgcolor: 'rgba(255, 255, 255, 0.1)',
        px: 2,
        borderRadius: 2,
        width: '100%',
        maxWidth: 500,
        mx: 'auto',
        mt: 2,
      }}
    >
      <InputBase
        fullWidth
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={onEnterKeyDown}
        sx={{ color: 'white', flex: 1 }}
      />
      <IconButton onClick={onSearch} sx={{ color: 'white' }}>
        <SearchIcon />
      </IconButton>
    </Box>
  );
};

export default SearchBar;
