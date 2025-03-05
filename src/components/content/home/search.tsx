'use client';

import React from 'react';
import { useDebounce } from '@uidotdev/usehooks';
import { useRouter } from 'nextjs-toploader/app';
import { useSearchParams } from 'next/navigation';

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

  // Component Function
  const handleAction = React.useCallback(
    (event?: React.FormEvent<HTMLFormElement>) => {
      if (event) event.preventDefault();

      const params = new URLSearchParams(searchParams.toString());
      params.delete('page');

      if (debouncedSearchTerm !== '') {
        params.set('query', debouncedSearchTerm);
        Router.replace(`?${params.toString()}`, { scroll: false });
      } else {
        params.delete('query');
        Router.replace('?', { scroll: false });
      }
    },
    [Router, debouncedSearchTerm, searchParams]
  );

  React.useEffect(() => {
    if (!init.current) {
      init.current = true;
      setSearchQuery(query);
    } else {
      handleAction();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  return (
    <StyledForm
      onSubmit={handleAction}
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
      role="search"
      aria-label="Movie search form"
    >
      <SearchIcon
        sx={(theme) => ({
          fontSize: 30,
          [theme.breakpoints.down('sm')]: {
            fontSize: 24
          }
        })}
        aria-hidden="true"
      />
      <SearchInput
        name="query"
        placeholder="Search through thousands of movies"
        defaultValue={query}
        onChange={(event) => setSearchQuery(event.target.value)}
        aria-label="Enter movie title to search"
      />
    </StyledForm>
  );
}
