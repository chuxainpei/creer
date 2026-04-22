import { render, screen } from '@testing-library/react';

import HomePage from '@/app/page';

test('renders homepage hero and entry call to action', () => {
  render(<HomePage />);
  expect(screen.getByText('由星图决策引擎驱动')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: '立即开始问答' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 2, name: '为真实决策系统而设计' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 2, name: '透明简单，按需升级' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 2, name: '现在就把你的系统做成可演示产品' })).toBeInTheDocument();
});
