// src/Components/SearchBar.tsx

import { Box, InputBase, IconButton, useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface Props {
  query: string;
  setQuery: (value: string) => void;
  onSearch: () => void;
  onEnterKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<Props> = ({ query, setQuery, onSearch, onEnterKeyDown }) => {
  const theme = useTheme();

  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        bgcolor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)', // adaptive background
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
        sx={{
          color: theme.palette.text.primary, // adaptive text color
          flex: 1,
          '&::placeholder': {
            color: theme.palette.text.secondary, // optional placeholder styling
            opacity: 1,
          },
        }}
      />
      <IconButton onClick={onSearch} sx={{ color: theme.palette.text.primary }}>
        <SearchIcon />
      </IconButton>
    </Box>
  );
};

export default SearchBar;
