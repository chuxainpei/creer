// ── Landing Page Data — centralized content config ──

// Hero Carousel
export const heroSlides = [
  {
    id: 1,
    tagline: "把混乱的升学决策",
    taglineEmphasis: "变成清晰的行动计划",
    description: "AI 升学规划工作台 — 帮你拆解申请时间线、筛选院校、分配权重、管理材料",
    accent: "navy" as const,
  },
  {
    id: 2,
    tagline: "把求职焦虑",
    taglineEmphasis: "变成可执行的节奏",
    description: "AI 就业指导工作台 — 帮你做岗位定位、简历优化、投递策略和面试准备",
    accent: "amber" as const,
  },
  {
    id: 3,
    tagline: "让每一次重要决策",
    taglineEmphasis: "都有判断框架",
    description: "不是给你一个答案，而是帮你建立自己的判断维度——从「不知所措」到「知道该问什么」",
    accent: "navy" as const,
  },
];

// Trust Metrics (count-up stats)
export const trustMetrics = [
  { value: 2, label: "决策模式", sublabel: "升学规划 / 就业指导" },
  { value: 0, prefix: "结构化", label: "回答模板", sublabel: "结论-维度-计划-下一步" },
  { value: 0, prefix: "免费", label: "开放使用", sublabel: "无需登录即可体验" },
  { value: 0, prefix: "AI", label: "驱动规划", sublabel: "基于大模型的深度分析" },
];

// Product Value Proposition
export const valueProps = [
  {
    id: "framework",
    number: "01",
    title: "判断框架",
    subtitle: "不是替你做决定，而是让你知道该从哪些维度思考",
    description:
      "面对几十个学校和项目，最难的往往不是「选哪个」，而是「从哪些角度选」。智升学 为你建立清晰的判断维度——学术声誉、就业数据、项目匹配度、地理偏好、经济考量——让你在信息海洋中建立自己的评估体系。",
    icon: "🔍",
  },
  {
    id: "plan",
    number: "02",
    title: "行动计划",
    subtitle: "把开放式问题拆成阶段、任务、优先级和下一步",
    description:
      "「我要申请研究生」是一个模糊的愿望，不是一个可执行的任务。智升学 把它拆成：第1周锁定方向、第2-3周扫描条件、第1-2个月背景提升、第3-4个月材料准备——每个阶段有明确产出和检查点。",
    icon: "📋",
  },
  {
    id: "trust",
    number: "03",
    title: "可信表达",
    subtitle: "每一份回答都有逻辑、有结构、有来源",
    description:
      "在关键的升学和求职决策中，「感觉」和「听说」不够。智升学 的回答基于判断框架和规划方法论，提供可追溯的参考来源，让你在做决定时有底，而不是靠猜测。",
    icon: "🛡️",
  },
];

// Two Scenes (升学 / 就业)
export const scenes = [
  {
    id: "postgraduate",
    title: "升学规划",
    icon: "🎓",
    accent: "navy" as const,
    forWho: "面向研究生申请者",
    capabilities: [
      "申请时间线规划（从今天到 offer）",
      "院校筛选与冲刺/稳妥/保底分层",
      "GPA、科研、实习、文书权重分析",
      "推荐信策略与时间节奏",
      "跨专业申请路径评估",
      "面试准备与材料版本管理",
    ],
    exampleQuestion: "帮我按 2026 申请季做一个完整的硕士申请规划，从选校到提交材料。",
    cta: "开始升学规划",
  },
  {
    id: "employment",
    title: "就业指导",
    icon: "💼",
    accent: "amber" as const,
    forWho: "面向求职者和初级职场人",
    capabilities: [
      "岗位定位与行业匹配分析",
      "8-12 周结构化求职计划",
      "简历逐条优化与岗位对齐",
      "作品集表达与项目经历包装",
      "投递节奏、渠道选择与复盘框架",
      "面试准备（行为面、技术面、案例面）",
    ],
    exampleQuestion: "我是大三学生想做 AI 产品实习，帮我制定一个 8 周准备计划并优化我的简历。",
    cta: "开始就业指导",
  },
];

// Features comparison (why 智升学 vs general ChatGPT)
export const comparisonData = [
  {
    dimension: "回答结构",
    generic: "自由对话，可能散乱",
    zhishengxue: "固定模板：结论 → 维度 → 计划 → 下一步",
  },
  {
    dimension: "领域深度",
    generic: "通用知识，缺乏升学/求职专项",
    zhishengxue: "专注升学与就业场景，系统提示词定向优化",
  },
  {
    dimension: "可执行性",
    generic: "建议偏宏观，缺少具体步骤",
    zhishengxue: "按周拆解任务，每个阶段有明确产出",
  },
  {
    dimension: "上下文管理",
    generic: "可能混淆不同场景的对话",
    zhishengxue: "升学/就业双模式隔离，切换清空上下文",
  },
  {
    dimension: "展示方式",
    generic: "纯聊天界面",
    zhishengxue: "工作台式布局：模式切换 + 快捷入口 + 参考来源",
  },
];

// FAQ
export const faqData = [
  {
    question: "智升学 和通用 ChatGPT 有什么不同？",
    answer:
      "智升学 是一个专门为升学和就业规划设计的 AI 工作台。它有两个核心差异：第一，系统提示词是定向优化的——AI 被训练以「结论先行 → 判断维度 → 执行计划 → 下一步」的结构化模板回答；第二，它提供工作台式的操作界面——模式切换、快捷问题、参考来源、行动建议等，不是简单的聊天框。",
  },
  {
    question: "需要注册或付费吗？",
    answer:
      "当前版本完全免费开放使用，无需注册登录。你可以直接访问聊天工作台，选择升学规划或就业指导模式，立即开始获得 AI 规划建议。未来可能引入更高级的功能，但基础规划功能将保持免费开放。",
  },
  {
    question: "AI 会编造信息吗？回答可信吗？",
    answer:
      "智升学 的系统提示词明确要求 AI 不编造用户背景、不给高风险建议（医疗、法律、金融等）。AI 的回答基于其训练数据中的教育规划知识，但涉及具体的院校录取数据、岗位薪资等时效性信息时，建议交叉验证官方来源。每个回答页面都会展示可信参考来源。",
  },
  {
    question: "适合什么样的学生使用？",
    answer:
      "智升学 面向正在准备研究生申请的大学生、正在找实习和校招的应届生、以及需要规划职业路径的初级职场人。无论你是大二还没开始准备、还是大四正在冲刺申请，都可以通过明确你的当前阶段来获得针对性的规划建议。",
  },
  {
    question: "没有 AI Key 还能用吗？",
    answer:
      "可以使用。当系统检测到没有配置 AI 密钥时，会自动切换到本地演示模式，提供预置的结构化规划回答，你可以完整体验所有界面功能和交互流程。",
  },
];

// ── Target Audience (适用对象) ──
export const targetAudiences = [
  {
    title: "在校学生",
    icon: "👨‍🎓",
    description:
      "正在准备研究生申请或求职的本科生、研究生，需要把模糊目标拆成可执行的阶段计划。",
  },
  {
    title: "升学指导中心",
    icon: "🏫",
    description:
      "高校就业办、招生就业处、学院辅导员团队，需要一个可信的 AI 工具来辅助学生的一对一规划咨询。",
  },
  {
    title: "教育咨询机构",
    icon: "💡",
    description:
      "留学中介、职业规划顾问、教育培训机构，可以用 智升学 为客户提供结构化的规划建议框架。",
  },
  {
    title: "职业发展课程",
    icon: "📚",
    description:
      "高校职业生涯规划课程教师，可以借助 AI 生成的规划模板设计课堂案例和分组讨论素材。",
  },
];

// ── Output Samples (输出样例) ──
export const outputSamples = [
  {
    label: "结论先行",
    content: "你现在最应该先做的是：锁定目标专业方向，并倒推出申请时间线。",
  },
  {
    label: "判断维度",
    content: "从专业匹配度、硬性条件门槛、软性背景深度、时间节奏、财务准备五个维度评估准备度。",
  },
  {
    label: "执行计划",
    content: "第1-2周锁定方向 → 第3-4周条件扫描 → 第2-3月背景提升 → 第4-6月材料准备 → 第7-8月提交与跟进。",
  },
  {
    label: "下一步",
    content: "写下你的目标专业方向和当前最大的不确定性，告诉 智升学，获得更精准的定位分析。",
  },
];

// Footer links
export const footerLinks = {
  product: [
    { label: "升学规划", href: "/chat?mode=postgraduate" },
    { label: "就业指导", href: "/chat?mode=employment" },
    { label: "演示体验", href: "/demo" },
  ],
  resources: [
    { label: "使用指南", href: "#" },
    { label: "常见问题", href: "#faq" },
    { label: "反馈建议", href: "#" },
  ],
  about: [
    { label: "关于 智升学", href: "#" },
    { label: "联系我们", href: "#" },
    { label: "隐私政策", href: "#" },
  ],
};
