'use client';

/* MATERIAL UI */
import { Box } from '@mui/material';

export default function HomeDecor() {
  return (
    <Box
      component="div"
      sx={(theme) => ({
        top: 0,
        zIndex: -10,
        width: '100%',
        height: 'calc(730px - 64px)',
        filter: 'blur(64px)',
        position: 'absolute',
        backgroundColor: 'rgba(var(--theme-colorChannel) / 0.5)',
        [theme.breakpoints.down('sm')]: {
          height: 'calc(556px - 56px)'
        }
      })}
    />
  );
}
