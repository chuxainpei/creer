import { render, screen } from '@testing-library/react';

import AdminPage from '@/app/admin/page';

test('renders upload actions for official and graduate data', () => {
  render(<AdminPage />);
  expect(screen.getAllByText('上传官方资料').length).toBeGreaterThan(0);
  expect(screen.getAllByText('上传毕业去向数据').length).toBeGreaterThan(0);
  expect(screen.getByText('系统状态')).toBeInTheDocument();
});
