import { render, screen } from '@testing-library/react';

import QaPage from '@/app/qa/page';

test('renders recommended employment questions', () => {
  render(<QaPage />);
  expect(screen.getByText('三方协议')).toBeInTheDocument();
  expect(screen.getByText('简历优化')).toBeInTheDocument();
});

test('renders source tags area', () => {
  render(<QaPage />);
  expect(screen.getByText('来源')).toBeInTheDocument();
});
