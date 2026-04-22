import { render, screen } from '@testing-library/react';

import SiteHeader from '@/src/components/layout/SiteHeader';

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

test('does not expose admin entry in public header', () => {
  render(<SiteHeader />);
  expect(screen.getByRole('link', { name: /能力亮点/ })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /问答中心/ })).toBeInTheDocument();
  expect(screen.queryByRole('link', { name: /管理后台/ })).not.toBeInTheDocument();
});
