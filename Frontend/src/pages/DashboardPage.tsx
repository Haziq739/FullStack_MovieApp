import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Sidebar from '../Components/Sidebar';
import TopBar from '../Components/TopBar';
import SearchBar from '../Components/SearchBar';
import MovieCard from '../Components/MovieCard';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CustomPagination from '../Components/Pagination';
import type { OMDbSearchResult } from '../types/omdb';
import { useTheme } from '@mui/material/styles';

const DashboardPage = () => {
  const theme = useTheme();

  const [movies, setMovies] = useState<OMDbSearchResult[]>([]);
  const [searchQuery, setSearchQuery] = useState('batman');
  const [inputQuery, setInputQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [initialLoading, setInitialLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [userName, setUserName] = useState('');

  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const isFetching = useRef(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const fetchMovies = async () => {
    if (!searchQuery || isFetching.current) return;

    isFetching.current = true;
    setInitialLoading(true);

    try {
      const response = await axios.get('http://localhost:5000/api/movies/search', {
        params: { query: searchQuery, page },
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.Search) {
        setMovies(response.data.Search);
        setTotalResults(parseInt(response.data.totalResults || '0'));
      } else {
        setMovies([]);
        setTotalResults(0);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setInitialLoading(false);
      isFetching.current = false;
    }
  };

  const fetchUserName = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserName(res.data.name);
    } catch (err) {
      console.error('Failed to fetch user info:', err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchMovies();
    }
  }, [searchQuery, page, token]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/favorites/list', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavorites(res.data.favorites || []);
      } catch (err) {
        console.error('Failed to fetch favorites:', err);
      }
    };

    if (token) {
      fetchFavorites();
      fetchUserName();
    }
  }, [token]);

  const handleSearch = () => {
    const trimmedQuery = inputQuery.trim();
    if (trimmedQuery && trimmedQuery !== searchQuery) {
      setMovies([]);
      setPage(1);
      setSearchQuery(trimmedQuery);
      setInitialLoading(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setInitialLoading(true);
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        fontFamily: '"Poppins", sans-serif',
      }}
    >
      <Sidebar />
      <Box
        sx={{
          flex: 1,
          p: 4,
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(to right, rgba(0,0,0,0.9), rgba(139,0,0,0.7))'
            : theme.palette.background.default,
          color: theme.palette.text.primary,
          overflowY: 'auto',
          maxHeight: '100vh',
          scrollBehavior: 'smooth',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <TopBar />
          <Button
            onClick={handleLogout}
            variant="contained"
            color="error"
            sx={{
              textTransform: 'none',
              fontWeight: 'bold',
              ml: 2,
              px: 3,
              py: 1,
              borderRadius: 2,
            }}
          >
            Logout
          </Button>
        </Box>

        <Typography variant="h5" fontWeight="bold" mt={1} mb={2}>
          Welcome{userName ? `, ${userName}` : ''}
        </Typography>

        <SearchBar
          query={inputQuery}
          setQuery={setInputQuery}
          onSearch={handleSearch}
          onEnterKeyDown={handleKeyDown}
        />

        <Box display="flex" flexWrap="wrap" gap={3} mt={2} minHeight="400px">
          {initialLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <Box key={index} width={{ xs: '100%', sm: '48%', md: '31%', lg: '23%' }}>
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={350}
                  sx={{
                    borderRadius: 2,
                    bgcolor: theme.palette.mode === 'dark' ? '#2c2c2c' : '#ccc',
                  }}
                />
                <Skeleton variant="text" sx={{ bgcolor: theme.palette.mode === 'dark' ? '#2c2c2c' : '#ccc' }} />
                <Skeleton variant="text" sx={{ bgcolor: theme.palette.mode === 'dark' ? '#2c2c2c' : '#ccc' }} />
              </Box>
            ))
          ) : movies.length === 0 ? (
            <Box width="100%" textAlign="center" mt={4} fontSize="1.2rem" fontWeight="bold" color="gray">
              No movies found for your search.
            </Box>
          ) : (
            movies.map((movie) => (
              <Box key={movie.imdbID} width={{ xs: '100%', sm: '48%', md: '31%', lg: '23%' }}>
                <MovieCard movie={movie} favorites={favorites} setFavorites={setFavorites} />
              </Box>
            ))
          )}
        </Box>

        {!initialLoading && movies.length > 0 && totalResults > 10 && (
          <CustomPagination
            page={page}
            setPage={setPage}
            totalPages={Math.ceil(totalResults / 12)}
            onPageChange={handlePageChange}
          />
        )}
      </Box>
    </Box>
  );
};

export default DashboardPage;
