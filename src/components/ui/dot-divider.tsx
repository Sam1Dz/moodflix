/* COMPONENTS */
import { StyledSpan } from '@/components/themes/styled';

interface DotDividerProps {
  color?: string;
}

export default function DotDivider({
  color = '--mui-palette-text-secondary'
}: DotDividerProps) {
  return (
    <StyledSpan sx={{ color }} aria-hidden="true">
      •
    </StyledSpan>
  );
}
