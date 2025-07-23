// src/pages/DashboardPage.tsx
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import Button from '@mui/material/Button';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CustomPagination from '../components/Pagination';
import type { OMDbSearchResult } from '../types/omdb';

const DashboardPage = () => {
  const [movies, setMovies] = useState<OMDbSearchResult[]>([]);
  const [searchQuery, setSearchQuery] = useState('batman');
  const [inputQuery, setInputQuery] = useState('batman');
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [initialLoading, setInitialLoading] = useState(true);

  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const isFetching = useRef(false); // Prevent multiple fetches

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/signup');
  };

  const fetchMovies = async () => {
    if (!searchQuery || isFetching.current) return;

    isFetching.current = true;
    setInitialLoading(true);

    try {
      const response = await axios.get(`http://localhost:5000/api/movies/search`, {
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

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, page]);

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
        backgroundImage: `url('https://wallpapers.com/images/high/caesar-in-war-of-the-planet-of-the-apes-15yh1qci8ttsxmyl.webp')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        overflow: 'hidden',
        fontFamily: '"Poppins", sans-serif',
      }}
    >
      <Sidebar />
      <Box
        sx={{
          flex: 1,
          p: 4,
          color: 'white',
          background: 'linear-gradient(to right, rgba(0,0,0,0.9), rgba(139,0,0,0.7))',
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

        <SearchBar
          query={inputQuery}
          setQuery={setInputQuery}
          onSearch={handleSearch}
          onEnterKeyDown={handleKeyDown}
        />

        <Box display="flex" flexWrap="wrap" gap={3} mt={2}>
          {initialLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <Box
                  key={index}
                  width={{ xs: '100%', sm: '48%', md: '31%', lg: '23%' }}
                >
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={350}
                    sx={{ borderRadius: 2, bgcolor: '#2c2c2c' }}
                  />
                  <Skeleton variant="text" sx={{ bgcolor: '#2c2c2c' }} />
                  <Skeleton variant="text" sx={{ bgcolor: '#2c2c2c' }} />
                </Box>
              ))
            : movies.map((movie) => (
                <Box
                  key={movie.imdbID}
                  width={{ xs: '100%', sm: '48%', md: '31%', lg: '23%' }}
                >
                  <MovieCard movie={movie} />
                </Box>
              ))}
        </Box>

        {!initialLoading && totalResults > 10 && (
          <CustomPagination
            page={page}
            setPage={setPage}
            totalPages={Math.ceil(totalResults / 10)}
            onPageChange={handlePageChange}
          />
        )}
      </Box>
    </Box>
  );
};

export default DashboardPage;
