// src/components/Pagination.tsx
// For pagination having 10 movies on 1 page displayed
// Importing third party package
import React from 'react';
import { Box, Pagination } from '@mui/material'; // importing third party package

interface Props {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
  onPageChange: (event: React.ChangeEvent<unknown>, newPage: number) => void; // FIXED here
}

const CustomPagination: React.FC<Props> = ({ page, setPage, totalPages, onPageChange }) => {
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    onPageChange(event, value); 
  };

  if (totalPages <= 1) return null;

  return (
    <Box mt={4} display="flex" justifyContent="center">
      <Pagination
        count={totalPages}
        page={page}
        onChange={handleChange}
        variant="outlined"
        shape="rounded"
        color="primary"
        size="large"
        sx={{
          backgroundColor: 'rgba(255,255,255,0.1)',
          px: 2,
          py: 1,
          borderRadius: 2,
        }}
      />
    </Box>
  );
};

export default CustomPagination;
