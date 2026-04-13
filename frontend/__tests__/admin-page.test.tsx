import { render, screen } from '@testing-library/react';

import AdminPage from '@/app/admin/page';

test('renders upload actions for official and graduate data', () => {
  process.env.NEXT_PUBLIC_DEMO_MODE = '0';
  render(<AdminPage />);
  expect(screen.getAllByText('上传官方资料').length).toBeGreaterThan(0);
  expect(screen.getAllByText('上传毕业去向数据').length).toBeGreaterThan(0);
  expect(screen.getByText('系统状态')).toBeInTheDocument();
});

test('renders demo notice instead of admin console in demo mode', () => {
  process.env.NEXT_PUBLIC_DEMO_MODE = '1';
  render(<AdminPage />);
  expect(screen.getByText('演示版不开放管理后台')).toBeInTheDocument();
});
