'use client';

import React from 'react';
import { useDebounce } from '@uidotdev/usehooks';
import { useSearchParams } from 'next/navigation';

/* MATERIAL UI */
import { styled } from '@mui/material/styles';
import { alpha, InputBase } from '@mui/material';
// Icons
import SearchIcon from '@mui/icons-material/Search';

/* COMPONENTS */
import { StyledForm } from '@/components/themes/styled';
import { textTitleLarge, textTitleMedium } from '@/components/themes/utilities';

/* TYPES */
interface HomeSearchProps {
  query?: string;
}

export const SearchInput = styled(InputBase)(({ theme }) => ({
  flex: '1 1 0%',
  width: '100%',
  height: 'auto',
  outline: 'none',
  fontSize: 'inherit',
  input: {
    '&::placeholder': {
      color: theme.palette.text.secondary,
      opacity: 1
    }
  }
}));

export default function HomeSearch({ query }: HomeSearchProps) {
  const searchParams = useSearchParams();

  const [init, setInit] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const debouncedSearchTerm = useDebounce(searchQuery, 500);

  React.useEffect(() => {
    if (!init) {
      setInit(true);
      setSearchQuery(query || '');
    } else {
      const params = new URLSearchParams(searchParams.toString());

      if (debouncedSearchTerm !== '') {
        params.set('query', debouncedSearchTerm);
        window.history.replaceState(null, '', `?${params.toString()}`);
      } else {
        params.delete('query');
        window.history.replaceState(null, '', '?');
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm, searchParams, init]);

  return (
    <StyledForm
      sx={(theme) => ({
        mt: 4,
        px: 2.5,
        gap: 1.5,
        minHeight: 64,
        borderRadius: 7.5,
        width: '100%',
        display: 'flex',
        maxWidth: 'md',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: alpha(theme.palette.primary.main, 0.125),
        ...textTitleLarge,
        [theme.breakpoints.down('sm')]: {
          minHeight: 56,
          ...textTitleMedium
        }
      })}
    >
      <SearchIcon
        sx={(theme) => ({
          fontSize: 30,
          [theme.breakpoints.down('sm')]: {
            fontSize: 24
          }
        })}
      />
      <SearchInput
        name="query"
        placeholder="Search through thousands of movies"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
      />
    </StyledForm>
  );
}
