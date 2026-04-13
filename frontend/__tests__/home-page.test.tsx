import { render, screen } from '@testing-library/react';

import HomePage from '@/app/page';

test('renders homepage hero and entry call to action', () => {
  render(<HomePage />);
  expect(screen.getByText('就业服务 AI 助手')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: '进入问答中心' })).toBeInTheDocument();
});
