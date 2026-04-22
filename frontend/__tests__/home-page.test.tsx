import { render, screen } from '@testing-library/react';

import HomePage from '@/app/page';

test('renders homepage hero and entry call to action', () => {
  render(<HomePage />);
  expect(screen.getByText('AI 决策系统官网版')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: '进入问答演示' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 2, name: '你看见的，就是系统的上下文' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 2, name: '和你的项目天然匹配的三种展示方式' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 2, name: '常见问题' })).toBeInTheDocument();
});
