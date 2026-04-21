import type { AskResponse } from '@/src/lib/types';

function detectDomain(question: string): 'postgraduate' | 'employment' {
  if (/(院校|专业|申请|读研|硕士|博士|保研)/.test(question)) {
    return 'postgraduate';
  }
  return 'employment';
}

function detectIntent(question: string): 'recommend' | 'compare' | 'timeline' {
  if (/(对比|比较|区别|哪个好|怎么选)/.test(question)) {
    return 'compare';
  }
  if (/(时间线|节奏|计划|安排|何时|什么时候)/.test(question)) {
    return 'timeline';
  }
  return 'recommend';
}

function pickOfficialSnippet(question: string, domain: 'postgraduate' | 'employment'): string {
  if (domain === 'postgraduate') {
    if (/(材料|文书|推荐信)/.test(question)) {
      return '申请材料建议按学校研究生院与目标项目清单分阶段准备，并预留审核与返修时间。';
    }
    return '院校与项目选择建议先按官方招生要求完成硬性门槛筛选，再做匹配度排序。';
  }

  if (question.includes('双选会')) {
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
  return '就业问题建议优先依据学校就业中心官网最新公告执行，必要时联系学院就业老师复核。';
}

function buildRecommendationCards(question: string, domain: 'postgraduate' | 'employment', intent: 'recommend' | 'compare' | 'timeline') {
  if (domain === 'postgraduate') {
    if (intent === 'timeline') {
      return [
        {
          id: 'pg-timeline-1',
          title: '冲刺档（2-3 所）',
          fit_reason: '用于保留上限机会，需提前准备科研与文书亮点。',
          action: '本周完成目标项目清单和硬性门槛核对。',
          risk_hint: '时间管理压力较高，需避免材料准备过晚。',
          confidence: 'medium' as const,
        },
        {
          id: 'pg-timeline-2',
          title: '稳妥档（3-4 所）',
          fit_reason: '与你当前背景匹配度更高，是主要录取承接层。',
          action: '两周内完成文书母版并启动推荐信沟通。',
          risk_hint: '要持续跟踪每个项目的截止时间变化。',
          confidence: 'high' as const,
        },
      ];
    }
    return [
      {
        id: 'pg-rec-1',
        title: '研究导向项目优先',
        fit_reason: '若你有科研/竞赛经历，这类项目更易体现优势。',
        action: '把经历整理为可量化证据，放入 SOP 主线。',
        risk_hint: '避免只堆砌经历，需突出研究问题与方法。',
        confidence: 'high' as const,
      },
      {
        id: 'pg-rec-2',
        title: '实践导向项目作为平衡',
        fit_reason: '可提升录取稳定性，兼顾就业转化路径。',
        action: '补齐课程匹配和实习成果，形成完整叙事。',
        risk_hint: '需确认课程背景是否满足前置要求。',
        confidence: 'medium' as const,
      },
    ];
  }

  if (intent === 'compare') {
    return [
      {
        id: 'job-cmp-1',
        title: '岗位 A：产品运营/项目协调',
        fit_reason: '适合表达与协作能力较强、希望快速进入业务场景的人。',
        action: '简历突出跨团队协作、活动执行和结果指标。',
        risk_hint: '需要持续补齐数据分析与复盘能力。',
        confidence: 'medium' as const,
      },
      {
        id: 'job-cmp-2',
        title: '岗位 B：技术支持/实施',
        fit_reason: '适合具备技术基础、愿意贴近客户场景的人。',
        action: '准备项目案例，强调问题定位与解决闭环。',
        risk_hint: '初期出差或现场支持强度可能较高。',
        confidence: 'high' as const,
      },
    ];
  }

  return [
    {
      id: 'job-rec-1',
      title: '主攻岗位：与你经历最匹配的 1-2 条线',
      fit_reason: '先聚焦最可能通过简历筛选的方向，提升投递效率。',
      action: '按岗位 JD 重写简历前三屏，突出可验证成果。',
      risk_hint: '方向过多会导致表达分散，影响命中率。',
      confidence: 'high' as const,
    },
    {
      id: 'job-rec-2',
      title: '保底岗位：相邻能力模型岗位',
      fit_reason: '用于承接不确定性，保证 offer 概率。',
      action: '准备一版偏通用能力的作品/项目陈述。',
      risk_hint: '需避免“只投保底”导致成长空间受限。',
      confidence: 'medium' as const,
    },
  ];
}

function buildAnswer(question: string, domain: 'postgraduate' | 'employment', intent: 'recommend' | 'compare' | 'timeline', snippet: string): string {
  const domainLabel = domain === 'postgraduate' ? '升学' : '就业';
  const intentLabel =
    intent === 'timeline' ? '时间线规划' : intent === 'compare' ? '方案对比' : '推荐排序';

  return `【${domainLabel}建议 · ${intentLabel}】先给结论：围绕“${question}”，建议先做一轮可执行筛选，再按风险和投入排序推进。基于当前规则引擎判断，${snippet}`;
}

export function buildDemoAskResponse(question: string): AskResponse {
  const domain = detectDomain(question);
  const intent = detectIntent(question);
  const snippet = pickOfficialSnippet(question, domain);
  const recommendations = buildRecommendationCards(question, domain, intent);

  return {
    answer: buildAnswer(question, domain, intent, snippet),
    source_tags: [
      { label: '官方资料', source_type: 'official' },
      { label: domain === 'postgraduate' ? '招生参考' : '经验参考', source_type: domain === 'postgraduate' ? 'admission_reference' : 'graduate_reference' },
      { label: '规则引擎', source_type: 'model_rule' },
    ],
    evidence: [
      {
        source_type: 'official',
        source_name: domain === 'postgraduate' ? '研究生院公告（演示数据）' : '就业中心官网公告（演示数据）',
        snippet,
      },
      {
        source_type: domain === 'postgraduate' ? 'admission_reference' : 'job_market_signal',
        source_name: domain === 'postgraduate' ? '项目申请经验库（演示数据）' : '毕业去向经验库（演示数据）',
        snippet: '用于补充官方未覆盖的执行建议，不能替代正式要求。',
      },
    ],
    used_official: true,
    recommendations,
    credibility: [
      {
        label: '官方优先',
        detail: '涉及流程、材料、时间与政策时，优先采用官方口径。',
        level: 'official',
      },
      {
        label: '交叉校验',
        detail: '若官方与经验信息冲突，系统自动降权经验内容。',
        level: 'cross_check',
      },
      {
        label: '演示提醒',
        detail: '当前为参赛演示数据，请在办理前复核最新公告。',
        level: 'experience',
      },
    ],
    response_mode: 'concise_recommendation',
  };
}
