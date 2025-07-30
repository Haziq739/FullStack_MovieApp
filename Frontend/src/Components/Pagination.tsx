// src/components/Pagination.tsx
import React from 'react';
import { Box, Pagination, PaginationItem, useTheme } from '@mui/material';

interface Props {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
  onPageChange: (event: React.ChangeEvent<unknown>, newPage: number) => void;
}

const CustomPagination: React.FC<Props> = ({ page, setPage, totalPages, onPageChange }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

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
              color: theme.palette.text.primary, // dynamic text color
              borderColor: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)', // dynamic border
              '&:hover': {
                backgroundColor: isDark
                  ? 'rgba(183, 28, 28, 0.3)'
                  : 'rgba(183, 28, 28, 0.1)', // lighter for light mode
              },
              '&.Mui-selected': {
                backgroundColor: 'transparent',
                borderColor: theme.palette.primary.main,
              },
              '&.Mui-selected:hover': {
                backgroundColor: isDark
                  ? 'rgba(183, 28, 28, 0.3)'
                  : 'rgba(183, 28, 28, 0.1)',
              },
            }}
          />
        )}
        sx={{
          backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)', // adaptive bg
          px: 2,
          py: 1,
          borderRadius: 2,
        }}
      />
    </Box>
  );
};

export default CustomPagination;
