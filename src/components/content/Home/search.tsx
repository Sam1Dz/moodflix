'use client';

import React from 'react';
import { useDebounce } from '@uidotdev/usehooks';
import { useRouter, useSearchParams } from 'next/navigation';

/* MATERIAL UI */
import { styled } from '@mui/material/styles';
import { InputBase } from '@mui/material';
// Icons
import SearchIcon from '@mui/icons-material/Search';

/* COMPONENTS */
import { StyledForm } from '@/components/themes/styled';
import { textTitleLarge, textTitleMedium } from '@/components/themes/utilities';

export const SearchInput = styled(InputBase)({
  flex: '1 1 0%',
  width: '100%',
  height: 'auto',
  outline: 'none',
  fontSize: 'inherit',
  input: {
    '&::placeholder': {
      color: 'var(--mui-palette-text-secondary)',
      opacity: 1
    }
  }
});

export default function HomeSearch() {
  const Router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';

  const init = React.useRef(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const debouncedSearchTerm = useDebounce(searchQuery, 500);

  React.useEffect(() => {
    if (!init.current) {
      init.current = true;
      setSearchQuery(query);
    } else {
      const params = new URLSearchParams(searchParams.toString());
      params.delete('page');

      if (debouncedSearchTerm !== '') {
        params.set('query', debouncedSearchTerm);
        Router.replace(`?${params.toString()}`, { scroll: false });
      } else {
        params.delete('query');
        Router.replace('?', { scroll: false });
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

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
        backgroundColor: 'rgba(var(--mui-palette-primary-mainChannel) / 0.125)',
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
        defaultValue={query}
        onChange={(event) => setSearchQuery(event.target.value)}
      />
    </StyledForm>
  );
}
