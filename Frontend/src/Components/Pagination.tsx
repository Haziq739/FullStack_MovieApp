// src/components/Pagination.tsx
import React from 'react';
import { Box, Pagination, PaginationItem } from '@mui/material';

interface Props {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
  onPageChange: (event: React.ChangeEvent<unknown>, newPage: number) => void;
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
        size="large"
        renderItem={(item) => (
          <PaginationItem
            {...item}
            sx={{
              color: '#fff',
              borderColor: 'rgba(255,255,255,0.3)',
              '&:hover': {
                backgroundColor: 'rgba(183, 28, 28, 0.3)', // red hover effect
              },
              '&.Mui-selected': {
                backgroundColor: 'transparent', // removes solid red
                borderColor: '#B71C1C',
              },
              '&.Mui-selected:hover': {
                backgroundColor: 'rgba(183, 28, 28, 0.3)', // hover effect for selected
              },
            }}
          />
        )}
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
