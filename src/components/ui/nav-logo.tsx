'use client';

/* COMPONENTS */
import { textHeadlineSmall } from '@/components/themes/utilities';
import {
  StyledImage,
  StyledLink,
  StyledSpan
} from '@/components/themes/styled';

export default function UINavLogo() {
  return (
    <StyledLink
      href="/"
      sx={{
        gap: 1,
        cursor: 'pointer',
        alignItems: 'center',
        display: 'inline-flex'
      }}
    >
      <StyledImage
        priority
        src="/images/logo.png"
        alt="Logo"
        width={91}
        height={66}
        sx={(theme) => ({
          width: 55,
          height: 40,
          [theme.breakpoints.down('sm')]: {
            width: 44,
            height: 32
          }
        })}
      />
      <StyledSpan
        sx={{
          fontWeight: 'bold',
          ...textHeadlineSmall
        }}
      >
        Moodflix
      </StyledSpan>
    </StyledLink>
  );
}
