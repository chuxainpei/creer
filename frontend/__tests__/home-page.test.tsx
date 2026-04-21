import { render, screen } from '@testing-library/react';

import HomePage from '@/app/page';

test('renders homepage hero and entry call to action', () => {
  render(<HomePage />);
  expect(screen.getByText('UI/UX PRO MAX 方案')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: '进入决策驾驶舱' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 2, name: '演示主线' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 2, name: '产品价值' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 2, name: '可信度边界' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 2, name: '后续升级路线' })).toBeInTheDocument();
});
