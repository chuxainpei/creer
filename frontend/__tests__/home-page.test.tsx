import { render, screen } from '@testing-library/react';

import HomePage from '@/app/page';

test('renders homepage hero and entry call to action', () => {
  render(<HomePage />);
  expect(screen.getByText('2026 参赛版 · Industrial')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: '进入决策台' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 2, name: '演示逻辑' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 2, name: '产品定位' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 2, name: '可信度声明' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 2, name: '下一步扩展' })).toBeInTheDocument();
});
