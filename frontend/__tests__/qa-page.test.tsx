import { render, screen } from '@testing-library/react';

import QaPage from '@/app/qa/page';

test('renders recommended employment questions', () => {
  render(<QaPage />);
  expect(screen.getByRole('heading', { level: 1, name: '把问题交给系统，把路径带走' })).toBeInTheDocument();
  expect(screen.getByText('我该主攻产品运营还是数据分析岗位？')).toBeInTheDocument();
  expect(screen.getByText('我目前背景适合冲刺哪些计算机硕士项目？')).toBeInTheDocument();
});

test('renders source tags area', () => {
  render(<QaPage />);
  expect(screen.getAllByText('官方优先').length).toBeGreaterThan(0);
});
