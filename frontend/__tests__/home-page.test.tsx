import { render, screen } from '@testing-library/react';

import HomePage from '@/app/page';

test('renders homepage hero and entry call to action', () => {
  render(<HomePage />);
  expect(screen.getByText('就业服务 AI 助手')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: '进入问答中心' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 2, name: '服务公告' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 2, name: '使用指南' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 2, name: '常见问题' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 2, name: '支持与反馈' })).toBeInTheDocument();
});
