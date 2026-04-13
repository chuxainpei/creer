import type { AskResponse } from '@/src/lib/types';

function pickOfficialSnippet(question: string): string {
  const lowered = question.toLowerCase();
  if (question.includes('双选会') || lowered.includes('job fair')) {
    return '双选会报名需登录学校就业系统，按公告时间完成报名与材料提交。';
  }
  if (question.includes('三方') || question.includes('协议')) {
    return '三方协议需在学校就业系统内提交，审核与签章进度以就业中心官网通知为准。';
  }
  if (question.includes('档案')) {
    return '毕业生档案去向以学校就业系统与学院通知为准，办理前需确认派遣信息。';
  }
  if (question.includes('补贴')) {
    return '求职补贴申请需满足当年政策条件，并在学校公布时间窗口内提交证明材料。';
  }
  return '该问题建议优先依据学校就业中心官网最新公告执行，必要时联系学院就业老师复核。';
}

export function buildDemoAskResponse(question: string): AskResponse {
  const snippet = pickOfficialSnippet(question);
  return {
    answer: `【演示模式】根据学校就业中心官方资料，${snippet} 如与经验信息冲突，请以官方口径为准。`,
    source_tags: [
      { label: '官方资料', source_type: 'official' },
      { label: '经验参考', source_type: 'graduate_reference' },
    ],
    evidence: [
      {
        source_type: 'official',
        source_name: '就业中心官网公告（演示数据）',
        snippet,
      },
    ],
    used_official: true,
  };
}
