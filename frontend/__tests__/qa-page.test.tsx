import { render, screen } from '@testing-library/react';

import QaPage from '@/app/qa/page';

test('renders recommended employment questions', () => {
  render(<QaPage />);
  expect(screen.getByRole('heading', { level: 1, name: '就业中心智能问答' })).toBeInTheDocument();
  expect(screen.getByText('三方协议怎么办')).toBeInTheDocument();
  expect(screen.getByText('双选会报名流程')).toBeInTheDocument();
});

test('renders source tags area', () => {
  render(<QaPage />);
  expect(screen.getAllByText('官方优先').length).toBeGreaterThan(0);
});
