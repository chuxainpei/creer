import { render, screen } from '@testing-library/react';

import HomePage from '@/app/page';

test('renders homepage hero and entry call to action', () => {
  render(<HomePage />);
  expect(screen.getByText('星图 beta')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: '打开问答体验' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 2, name: '告别复制粘贴，所有背景资料，一键引用' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 2, name: '像真实产品一样，被不同角色自然接受' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 2, name: '常见问题' })).toBeInTheDocument();
});
