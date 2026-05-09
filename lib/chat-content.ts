// ── Chat Mode Types ──
export type ChatMode = "postgraduate" | "employment";

// ── Mode Definition ──
export interface ModeDefinition {
  id: ChatMode;
  label: string;
  shortLabel: string;
  icon: string;
  subtitle: string;
  description: string;
  heroTitle: string;
  quickPrompts: string[];
  recommendedActions: string[];
  trustedSources: Array<{
    title: string;
    url: string;
  }>;
  systemPrompt: string;
}

// ── Postgraduate (升学规划) ──
const postgraduateSystemPrompt = `你是专业的升学规划顾问，名为 Creator（创导），专注于帮助中国学生制定研究生申请策略。

你的核心职责：
1. 把复杂的升学决策拆解为可执行的阶段和步骤
2. 帮助用户理解判断维度，而非替他们做决定
3. 给出有优先级、带时间节点的行动计划
4. 基于已知信息给出结构化建议，不编造用户背景

回答结构要求：
- 结论先行：用户最该先做什么
- 判断维度：从哪些角度评估
- 执行计划：分阶段、分周的具体动作
- 下一步：明确的下一步行动
- 注意事项：常见的坑和规避方法

回答风格：
- 中文输出，分点清晰
- 结构化、有优先级、有下一步
- 避免空泛鼓励（不要说"你一定可以的"）
- 不要假装知道用户没有提供的信息
- 不给医疗、法律、金融等高风险建议
- 不把"建议咨询专业人士"当作主要回答

业务领域覆盖：
- 申请时间线规划
- 院校和项目筛选
- 冲刺/稳妥/保底分层策略
- GPA、科研、实习、文书权重分析
- 推荐信准备
- 申请材料版本管理与时间节点
- 奖学金申请策略
- 面试准备
- 跨专业申请策略`;

// ── Employment (就业指导) ──
const employmentSystemPrompt = `你是专业的就业指导顾问，名为 Creator（创导），专注于帮助中国学生和初级求职者制定职业发展策略。

你的核心职责：
1. 把求职过程拆解为可执行的阶段和步骤
2. 帮助用户做岗位定位和匹配分析
3. 给出具体的简历、作品集、面试优化建议
4. 关注节奏和反馈闭环，而非泛泛而谈

回答结构要求：
- 结论先行：用户当前最该做什么
- 岗位定位：目标岗位的核心要求和匹配度分析
- 执行计划：分阶段的具体动作（通常按周规划）
- 材料优化：简历/作品集/面试的针对性建议
- 投递策略：时间节奏、渠道选择、优先级排序
- 下一步：明确的下一步行动
- 反馈闭环：如何根据投递结果调整策略

回答风格：
- 中文输出，分点清晰
- 可执行、关注岗位匹配、关注材料表达
- 避免泛泛职业鸡汤
- 不要假装知道用户没有提供的信息
- 不给医疗、法律、金融等高风险建议
- 不把"建议咨询专业人士"当作主要回答

业务领域覆盖：
- 岗位定位与行业分析
- 求职时间线规划
- 简历优化与岗位匹配
- 作品集表达与项目经历包装
- 投递策略与渠道选择
- 投递复盘与反馈调整
- 面试准备（行为面、技术面、案例面）
- 薪资谈判与offer选择
- 实习转正策略
- 校招流程与时间节点`;

// ── Mode Configurations ──
export const modeDefinitions: Record<ChatMode, ModeDefinition> = {
  postgraduate: {
    id: "postgraduate",
    label: "升学规划",
    shortLabel: "升学",
    icon: "🎓",
    subtitle: "AI 升学规划顾问",
    description:
      "面向研究生申请，帮你理清申请时间线、院校筛选、材料准备和决策优先级，把复杂问题拆成可执行的行动计划。",
    heroTitle: "把升学困惑，变成清晰的行动计划。",
    quickPrompts: [
      "帮我按 2026 申请季做一个硕士申请时间线。",
      "如何用 5 个指标快速筛选研究生项目？",
      "GPA、科研和文书该怎么做权重分配？",
      "冲刺/稳妥/保底怎么分？帮我搭一个申请组合。",
      "跨专业申请需要注意什么？给我一个准备框架。",
      "推荐信该找谁写？怎么开口？时间节奏怎么安排？",
    ],
    recommendedActions: [
      "先确定目标专业方向",
      "整理已有硬性条件（GPA、标化成绩）",
      "列出初步院校清单",
      "开始准备推荐人名单",
    ],
    trustedSources: [
      { title: "中国研究生招生信息网", url: "https://yz.chsi.com.cn" },
      { title: "U.S. News 研究生院排名", url: "https://www.usnews.com/best-graduate-schools" },
      { title: "QS World University Rankings", url: "https://www.topuniversities.com" },
      { title: "THE World University Rankings", url: "https://www.timeshighereducation.com" },
    ],
    systemPrompt: postgraduateSystemPrompt,
  },

  employment: {
    id: "employment",
    label: "就业指导",
    shortLabel: "就业",
    icon: "💼",
    subtitle: "AI 就业指导顾问",
    description:
      "面向实习、校招和初级岗位求职，帮你做岗位定位、简历优化、投递策略和面试准备，建立可执行的求职节奏。",
    heroTitle: "把求职焦虑，变成可执行的节奏。",
    quickPrompts: [
      "帮我制定 AI 产品实习的 8 周准备计划。",
      "初级开发者 2026 届求职该怎么安排节奏？",
      "简历和作品集怎么改得更像产品岗位候选人？",
      "没有相关实习经验，简历该怎么写？",
      "面试总是挂在一面，问题可能出在哪？",
      "拿到两个 offer 怎么选？给我一个决策框架。",
    ],
    recommendedActions: [
      "明确目标岗位和行业方向",
      "梳理已有项目经历和可迁移技能",
      "对目标岗位写一份针对性的简历",
      "制定投递节奏和目标数量",
    ],
    trustedSources: [
      { title: "牛客网", url: "https://www.nowcoder.com" },
      { title: "BOSS 直聘", url: "https://www.zhipin.com" },
      { title: "脉脉", url: "https://maimai.cn" },
      { title: "LinkedIn", url: "https://www.linkedin.com" },
    ],
    systemPrompt: employmentSystemPrompt,
  },
};
