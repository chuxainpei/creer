import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import ChatShell from '@/src/components/qa/ChatShell';
import { streamQuestion } from '@/src/lib/api';

jest.mock('@/src/lib/api', () => ({
  streamQuestion: jest.fn(),
}));

test('streams assistant output and final source tags', async () => {
  const mockedStreamQuestion = streamQuestion as jest.MockedFunction<typeof streamQuestion>;
  mockedStreamQuestion.mockImplementation(async (_question, handlers) => {
    handlers.onDelta('根据学校就业中心官方资料，');
    handlers.onDelta('请在系统内提交三方协议。');
    handlers.onMetadata({
      source_tags: [{ label: '官方资料', source_type: 'official' }],
      used_official: true,
      evidence: [
        {
          source_type: 'official',
          source_name: '双选会指南',
          snippet: '双选会报名需登录学校就业系统，按公告时间完成报名与材料提交。',
        },
      ],
    });
  });

  render(<ChatShell initialPrompts={['三方协议怎么办']} />);

  fireEvent.change(screen.getByLabelText('输入问题'), {
    target: { value: '三方协议怎么提交？' },
  });
  fireEvent.click(screen.getByRole('button', { name: '发送问题' }));

  await waitFor(() => {
    expect(screen.getByText(/请在系统内提交三方协议/)).toBeInTheDocument();
  });
  expect(screen.getByText('官方资料')).toBeInTheDocument();
  expect(screen.getByText('双选会指南')).toBeInTheDocument();
  expect(screen.getByText(/按公告时间完成报名与材料提交/)).toBeInTheDocument();
});
