// src/pages/DashboardPage.tsx
<<<<<<< HEAD
=======
// Importing third part packages
>>>>>>> f8bf9514a248d80b5da1fc25b2dce9cd64be725b
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import Button from '@mui/material/Button';
<<<<<<< HEAD
import { useEffect, useState, useRef } from 'react';
=======
import { useEffect, useState, useCallback } from 'react';
>>>>>>> f8bf9514a248d80b5da1fc25b2dce9cd64be725b
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
<<<<<<< HEAD
=======
  const [loading, setLoading] = useState(false);
>>>>>>> f8bf9514a248d80b5da1fc25b2dce9cd64be725b
  const [initialLoading, setInitialLoading] = useState(true);

  const token = localStorage.getItem('token');
  const navigate = useNavigate();
<<<<<<< HEAD
  const isFetching = useRef(false); // Prevent multiple fetches
=======
>>>>>>> f8bf9514a248d80b5da1fc25b2dce9cd64be725b

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/signup');
  };

<<<<<<< HEAD
  const fetchMovies = async () => {
    if (!searchQuery || isFetching.current) return;

    isFetching.current = true;
    setInitialLoading(true);

=======
  const fetchMovies = useCallback(async () => {
    if (!searchQuery || loading) return;
    setLoading(true);
>>>>>>> f8bf9514a248d80b5da1fc25b2dce9cd64be725b
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
<<<<<<< HEAD
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
=======
      setLoading(false);
      setInitialLoading(false);
    }
  }, [searchQuery, page, token, loading]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const handleSearch = () => {
    if (inputQuery.trim()) {
      setMovies([]);                //Prevent flicker by clearing old results
      setPage(1);                   // Reset to page 1
      setSearchQuery(inputQuery.trim());  // Trigger new search
      setInitialLoading(true);      // Show loading state
>>>>>>> f8bf9514a248d80b5da1fc25b2dce9cd64be725b
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
<<<<<<< HEAD
        backgroundAttachment: 'fixed',
        overflow: 'hidden',
=======
        backgroundAttachment: 'fixed', // Fix background to prevent shifting
        overflow: 'hidden', // Prevent page-level scrolling
>>>>>>> f8bf9514a248d80b5da1fc25b2dce9cd64be725b
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
<<<<<<< HEAD
          maxHeight: '100vh',
          scrollBehavior: 'smooth',
=======
          maxHeight: '100vh', // Ensure content stays within viewport height
          scrollBehavior: 'smooth', // Smooth scrolling for content
>>>>>>> f8bf9514a248d80b5da1fc25b2dce9cd64be725b
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

<<<<<<< HEAD
export default DashboardPage;
=======
export default DashboardPage;
>>>>>>> f8bf9514a248d80b5da1fc25b2dce9cd64be725b
