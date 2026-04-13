import { render, screen } from '@testing-library/react';

import AdminPage from '@/app/admin/page';

test('renders upload actions for official and graduate data', () => {
  render(<AdminPage />);
  expect(screen.getByText('上传官方资料')).toBeInTheDocument();
  expect(screen.getByText('上传毕业去向数据')).toBeInTheDocument();
});
