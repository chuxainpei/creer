(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,95057,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={formatUrl:function(){return i},formatWithValidation:function(){return c},urlObjectKeys:function(){return o}};for(var s in n)Object.defineProperty(r,s,{enumerable:!0,get:n[s]});let a=e.r(90809)._(e.r(98183)),l=/https?|ftp|gopher|file/;function i(e){let{auth:t,hostname:r}=e,n=e.protocol||"",s=e.pathname||"",i=e.hash||"",o=e.query||"",c=!1;t=t?encodeURIComponent(t).replace(/%3A/i,":")+"@":"",e.host?c=t+e.host:r&&(c=t+(~r.indexOf(":")?`[${r}]`:r),e.port&&(c+=":"+e.port)),o&&"object"==typeof o&&(o=String(a.urlQueryToSearchParams(o)));let d=e.search||o&&`?${o}`||"";return n&&!n.endsWith(":")&&(n+=":"),e.slashes||(!n||l.test(n))&&!1!==c?(c="//"+(c||""),s&&"/"!==s[0]&&(s="/"+s)):c||(c=""),i&&"#"!==i[0]&&(i="#"+i),d&&"?"!==d[0]&&(d="?"+d),s=s.replace(/[?#]/g,encodeURIComponent),d=d.replace("#","%23"),`${n}${c}${s}${d}${i}`}let o=["auth","hash","host","hostname","href","path","pathname","port","protocol","query","search","slashes"];function c(e){return i(e)}},18581,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"useMergedRef",{enumerable:!0,get:function(){return s}});let n=e.r(71645);function s(e,t){let r=(0,n.useRef)(null),s=(0,n.useRef)(null);return(0,n.useCallback)(n=>{if(null===n){let e=r.current;e&&(r.current=null,e());let t=s.current;t&&(s.current=null,t())}else e&&(r.current=a(e,n)),t&&(s.current=a(t,n))},[e,t])}function a(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let r=e(t);return"function"==typeof r?r:()=>e(null)}}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},73668,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"isLocalURL",{enumerable:!0,get:function(){return a}});let n=e.r(18967),s=e.r(52817);function a(e){if(!(0,n.isAbsoluteUrl)(e))return!0;try{let t=(0,n.getLocationOrigin)(),r=new URL(e,t);return r.origin===t&&(0,s.hasBasePath)(r.pathname)}catch(e){return!1}}},84508,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"errorOnce",{enumerable:!0,get:function(){return n}});let n=e=>{}},22016,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={default:function(){return b},useLinkStatus:function(){return g}};for(var s in n)Object.defineProperty(r,s,{enumerable:!0,get:n[s]});let a=e.r(90809),l=e.r(43476),i=a._(e.r(71645)),o=e.r(95057),c=e.r(8372),d=e.r(18581),u=e.r(18967),m=e.r(5550);e.r(33525);let h=e.r(88540),p=e.r(91949),x=e.r(73668),f=e.r(9396);function b(t){var r,n;let s,a,b,[g,j]=(0,i.useOptimistic)(p.IDLE_LINK_STATUS),v=(0,i.useRef)(null),{href:w,as:N,children:k,prefetch:S=null,passHref:P,replace:C,shallow:O,scroll:T,onClick:A,onMouseEnter:R,onTouchStart:_,legacyBehavior:E=!1,onNavigate:L,transitionTypes:I,ref:M,unstable_dynamicOnHover:U,...D}=t;s=k,E&&("string"==typeof s||"number"==typeof s)&&(s=(0,l.jsx)("a",{children:s}));let $=i.default.useContext(c.AppRouterContext),W=!1!==S,B=!1!==S?null===(n=S)||"auto"===n?f.FetchStrategy.PPR:f.FetchStrategy.Full:f.FetchStrategy.PPR,K="string"==typeof(r=N||w)?r:(0,o.formatUrl)(r);if(E){if(s?.$$typeof===Symbol.for("react.lazy"))throw Object.defineProperty(Error("`<Link legacyBehavior>` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's `<a>` tag."),"__NEXT_ERROR_CODE",{value:"E863",enumerable:!1,configurable:!0});a=i.default.Children.only(s)}let F=E?a&&"object"==typeof a&&a.ref:M,G=i.default.useCallback(e=>(null!==$&&(v.current=(0,p.mountLinkInstance)(e,K,$,B,W,j)),()=>{v.current&&((0,p.unmountLinkForCurrentNavigation)(v.current),v.current=null),(0,p.unmountPrefetchableInstance)(e)}),[W,K,$,B,j]),q={ref:(0,d.useMergedRef)(G,F),onClick(t){E||"function"!=typeof A||A(t),E&&a.props&&"function"==typeof a.props.onClick&&a.props.onClick(t),!$||t.defaultPrevented||function(t,r,n,s,a,l,o){if("u">typeof window){let c,{nodeName:d}=t.currentTarget;if("A"===d.toUpperCase()&&((c=t.currentTarget.getAttribute("target"))&&"_self"!==c||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey||t.nativeEvent&&2===t.nativeEvent.which)||t.currentTarget.hasAttribute("download"))return;if(!(0,x.isLocalURL)(r)){s&&(t.preventDefault(),location.replace(r));return}if(t.preventDefault(),l){let e=!1;if(l({preventDefault:()=>{e=!0}}),e)return}let{dispatchNavigateAction:u}=e.r(99781);i.default.startTransition(()=>{u(r,s?"replace":"push",!1===a?h.ScrollBehavior.NoScroll:h.ScrollBehavior.Default,n.current,o)})}}(t,K,v,C,T,L,I)},onMouseEnter(e){E||"function"!=typeof R||R(e),E&&a.props&&"function"==typeof a.props.onMouseEnter&&a.props.onMouseEnter(e),$&&W&&(0,p.onNavigationIntent)(e.currentTarget,!0===U)},onTouchStart:function(e){E||"function"!=typeof _||_(e),E&&a.props&&"function"==typeof a.props.onTouchStart&&a.props.onTouchStart(e),$&&W&&(0,p.onNavigationIntent)(e.currentTarget,!0===U)}};return(0,u.isAbsoluteUrl)(K)?q.href=K:E&&!P&&("a"!==a.type||"href"in a.props)||(q.href=(0,m.addBasePath)(K)),b=E?i.default.cloneElement(a,q):(0,l.jsx)("a",{...D,...q,children:s}),(0,l.jsx)(y.Provider,{value:g,children:b})}e.r(84508);let y=(0,i.createContext)(p.IDLE_LINK_STATUS),g=()=>(0,i.useContext)(y);("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},18566,(e,t,r)=>{t.exports=e.r(76562)},41222,e=>{"use strict";var t=e.i(43476),r=e.i(71645),n=e.i(18566),s=e.i(46932),a=e.i(88653),l=e.i(22016);let i={postgraduate:{id:"postgraduate",label:"升学规划",shortLabel:"升学",icon:"🎓",subtitle:"AI 升学规划顾问",description:"面向研究生申请，帮你理清申请时间线、院校筛选、材料准备和决策优先级，把复杂问题拆成可执行的行动计划。",heroTitle:"把升学困惑，变成清晰的行动计划。",quickPrompts:["帮我按 2026 申请季做一个硕士申请时间线。","如何用 5 个指标快速筛选研究生项目？","GPA、科研和文书该怎么做权重分配？","冲刺/稳妥/保底怎么分？帮我搭一个申请组合。","跨专业申请需要注意什么？给我一个准备框架。","推荐信该找谁写？怎么开口？时间节奏怎么安排？"],recommendedActions:["先确定目标专业方向","整理已有硬性条件（GPA、标化成绩）","列出初步院校清单","开始准备推荐人名单"],trustedSources:[{title:"中国研究生招生信息网",url:"https://yz.chsi.com.cn"},{title:"U.S. News 研究生院排名",url:"https://www.usnews.com/best-graduate-schools"},{title:"QS World University Rankings",url:"https://www.topuniversities.com"},{title:"THE World University Rankings",url:"https://www.timeshighereducation.com"}],systemPrompt:`你是专业的升学规划顾问，名为 智升学，专注于帮助中国学生制定研究生申请策略。

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
- 跨专业申请策略`},employment:{id:"employment",label:"就业指导",shortLabel:"就业",icon:"💼",subtitle:"AI 就业指导顾问",description:"面向实习、校招和初级岗位求职，帮你做岗位定位、简历优化、投递策略和面试准备，建立可执行的求职节奏。",heroTitle:"把求职焦虑，变成可执行的节奏。",quickPrompts:["帮我制定 AI 产品实习的 8 周准备计划。","初级开发者 2026 届求职该怎么安排节奏？","简历和作品集怎么改得更像产品岗位候选人？","没有相关实习经验，简历该怎么写？","面试总是挂在一面，问题可能出在哪？","拿到两个 offer 怎么选？给我一个决策框架。"],recommendedActions:["明确目标岗位和行业方向","梳理已有项目经历和可迁移技能","对目标岗位写一份针对性的简历","制定投递节奏和目标数量"],trustedSources:[{title:"牛客网",url:"https://www.nowcoder.com"},{title:"BOSS 直聘",url:"https://www.zhipin.com"},{title:"脉脉",url:"https://maimai.cn"},{title:"LinkedIn",url:"https://www.linkedin.com"}],systemPrompt:`你是专业的就业指导顾问，名为 智升学，专注于帮助中国学生和初级求职者制定职业发展策略。

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
- 校招流程与时间节点`}},o=`## 结论

你现在最应该先做的是：**锁定申请方向，并倒推时间线。**

很多同学一开始就查院校、写文书，但如果专业方向还没想清楚，后面所有工作都会反复推翻。所以第一步是明确你要申请什么专业、为什么申请、这个方向和你已有的背景是否匹配。

---

## 判断维度

从以下 5 个维度来评估你的申请准备度：

**1. 专业方向匹配度**
你的本科专业、科研经历、实习经历和目标专业的吻合程度。

**2. 硬性条件门槛**
GPA、语言成绩（托福/雅思）、GRE/GMAT 等标化成绩是否达到目标院校的最低要求。

**3. 软性背景深度**
科研项目、论文发表、竞赛获奖、实习经历的深度和相关性。深度 > 广度。

**4. 时间节奏**
距离申请截止还有多少个月，每个阶段需要完成什么任务。

**5. 财务准备**
学费、生活费、申请费用、考试费用的预算是否到位。

---

## 执行计划

下面是一个按 2026 Fall 入学的参考时间线（假设你从 2025 年 5 月开始准备）：

### 第 1–2 周：方向锁定
- 列出 2–3 个感兴趣的专业方向
- 每个方向找 3 篇目标院校的项目介绍，对比课程设置和就业去向
- 如果跨专业，确认先修课程要求
- 写出你的"申请动机一句话"：你为什么要读这个方向？

### 第 3–4 周：条件扫描
- 确认你的 GPA 在目标院校的哪个区间（对比历年录取数据）
- 如果标化还没考，制定备考计划并报名考试
- 列出已有的科研/实习/项目经历，标记哪些和申请方向相关

### 第 2–3 个月：背景提升
- 补充和申请方向相关的经历：科研、实习、线上项目
- 开始接触推荐人，提前建立关系
- 持续关注目标院校的动态

### 第 4–6 个月：材料准备
- 完成标化考试
- 确定最终院校清单（冲刺/稳妥/保底各 3–5 所）
- 文书初稿（个人陈述、简历）
- 推荐信确认和跟进

### 第 7–8 个月：提交与跟进
- 完成所有申请提交
- 准备面试
- 等待结果并做出选择

---

## 下一步

请你先做一件事：**写下你的目标专业方向（1–2 个）和你目前最大的不确定性。** 告诉我这些信息后，我可以帮你做更具体的定位分析。

---

> 💡 提示：申请的核心不是"我有多优秀"，而是"我为什么适合这个项目"。所有材料都应该围绕这个核心展开。`,c=`## 结论

你现在最应该先做的是：**确定一个清晰的目标岗位，然后围绕它构建 8 周准备计划。**

很多求职者的问题不是能力不够，而是目标太分散。今天投产品，明天投运营，后天投数据分析——每份简历都像通用模板，面试官看不出你的专注点。

---

## 判断维度

从以下 4 个维度来评估你的求职准备度：

**1. 岗位匹配度**
你的技能、项目经历和目标岗位 JD 的重合程度。建议用"逐条对标法"：把 JD 的每一条要求对应到你的具体经历上。

**2. 材料竞争力**
简历、作品集、GitHub/LinkedIn 主页是否让面试官在 10 秒内抓住重点。

**3. 投递节奏**
每周投递数量、渠道选择、优先级排序是否合理。建议：冲刺岗 20%、匹配岗 50%、保底岗 30%。

**4. 面试准备度**
行为面故事储备、技术面熟练度、案例面框架是否到位。

---

## 执行计划 — AI 产品实习 8 周准备计划

### 第 1 周：目标锁定
- 分析 10 份目标岗位 JD，提取共同的关键要求
- 确定你的 3 个核心卖点（技能/经验/特质）
- 把每个卖点对应到具体的项目或经历上

### 第 2–3 周：简历重写
- 按 STAR 法则重写每段经历
- 每个 bullet point 包含：做了什么 + 怎么做 + 结果（带数据）
- 找 3 个人给你的简历提意见
- 准备中英文两个版本

### 第 4 周：作品集/项目展示
- 整理 2–3 个最相关的项目
- 每个项目写一段背景说明：问题、方案、结果、你的贡献
- 如果项目有线上 demo，确保可以访问

### 第 5–6 周：集中投递
- 每周投 10–15 份，优先内推和内推码
- 记录每次投递的岗位、渠道、日期
- 对收到的反馈做分类：简历关挂了？笔试挂了？一面挂了？

### 第 7 周：面试冲刺
- 准备 5 个行为面故事（团队协作、项目难点、冲突处理、失败经历、学习能力）
- 对每个故事写 2 分钟的 STAR 版本
- 做 3 次模拟面试

### 第 8 周：复盘与调整
- 分析投递数据：哪个渠道转化最好？哪个岗位类型反馈最多？
- 根据反馈调整简历和投递策略
- 进入持续优化循环

---

## 投递策略建议

| 类型 | 比例 | 说明 |
|------|------|------|
| 冲刺岗 | 20% | 大厂核心组，竞争激烈，碰运气 |
| 匹配岗 | 50% | 你的背景刚好对口的岗位，重点投入 |
| 保底岗 | 30% | 中小厂或非核心组，确保有 offer |

---

## 下一步

请你做三件事：
1. 写下你的目标岗位（精确到岗位名称，如"AI 产品实习生"）
2. 列出你已有的 3 段最强经历（项目/实习/科研）
3. 告诉我你最大的求职卡点是什么

有了这些信息，我可以帮你做更精准的岗位匹配和简历优化。

---

> 💡 提示：求职不是"展示你有多全能的展览"，而是"解决对方问题的提案"。每份简历都应该回答一个核心问题：为什么是你？`;function d({message:e}){let n="user"===e.role,s=(0,r.useMemo)(()=>n?null:function(e){if(!e)return null;let r=e.split("\n"),n=[],s=0;for(;s<r.length;){let e=r[s];if(e.startsWith("## ")){n.push((0,t.jsx)("h2",{className:"text-lg font-bold mt-5 mb-2 text-accent-navy",children:e.slice(3)},s)),s++;continue}if(e.startsWith("### ")){n.push((0,t.jsx)("h3",{className:"text-base font-semibold mt-4 mb-1.5 text-text-primary",children:e.slice(4)},s)),s++;continue}if("---"===e.trim()){n.push((0,t.jsx)("hr",{className:"border-border my-4"},s)),s++;continue}if(e.startsWith("> ")){n.push((0,t.jsx)("blockquote",{className:"border-l-[3px] border-accent-amber pl-4 py-1 my-2 bg-surface-hover/50 rounded-r text-sm text-text-secondary italic",children:e.slice(2)},s)),s++;continue}if(e.startsWith("|")&&e.endsWith("|")){let e=[];for(;s<r.length&&r[s].startsWith("|");)e.push(r[s]),s++;let a=e[0],l=e[1],i=e.slice(2);if(a&&l&&l.includes("---")){let e=a.split("|").filter(Boolean).map(e=>e.trim());n.push((0,t.jsx)("div",{className:"overflow-x-auto my-3",children:(0,t.jsxs)("table",{className:"w-full text-sm border-collapse",children:[(0,t.jsx)("thead",{children:(0,t.jsx)("tr",{children:e.map((e,r)=>(0,t.jsx)("th",{className:"text-left p-2 border-b-2 border-border font-semibold text-text-secondary bg-surface-hover/50",children:e},r))})}),(0,t.jsx)("tbody",{children:i.map((e,r)=>{let n=e.split("|").filter(Boolean).map(e=>e.trim());return(0,t.jsx)("tr",{children:n.map((e,r)=>(0,t.jsx)("td",{className:"p-2 border-b border-border/50",children:e},r))},r)})})]})},`table-${s}`))}else for(let r of e)n.push((0,t.jsx)("p",{className:"text-sm font-mono text-text-secondary/70",children:r},`${s}-${r}`));continue}let a=e.split(/(\*\*[^*]+\*\*)/g),l=[];if(a.forEach((e,r)=>{e.startsWith("**")&&e.endsWith("**")?l.push((0,t.jsx)("strong",{className:"font-semibold",children:e.slice(2,-2)},r)):e&&l.push(e)}),e.match(/^[\s]*[\-\d]+[\.\)]\s/)){n.push((0,t.jsx)("li",{className:"ml-5 mb-0.5 list-disc",children:(0,t.jsx)("span",{children:l})},s)),s++;continue}if(""===e.trim()){n.push((0,t.jsx)("div",{className:"h-2"},s)),s++;continue}n.push((0,t.jsx)("p",{className:"mb-1 leading-relaxed",children:l.length>0?l:e},s)),s++}return(0,t.jsx)(t.Fragment,{children:n})}(e.content),[e.content,e.id,n]);return(0,t.jsxs)("div",{className:`flex gap-3 ${n?"justify-end":"justify-start"}`,children:[!n&&(0,t.jsx)("div",{className:"flex-shrink-0 w-8 h-8 rounded-full bg-accent-navy/10 flex items-center justify-center text-sm mt-1","aria-hidden":"true",children:"🎓"}),(0,t.jsx)("div",{className:`max-w-[85%] sm:max-w-[75%] ${n?"bg-accent-navy text-white px-5 py-3":"bg-white border border-border/60 px-6 py-4"}`,children:n?(0,t.jsx)("p",{className:"text-[15px] leading-relaxed whitespace-pre-wrap",children:e.content}):(0,t.jsxs)("div",{className:"chat-markdown text-[15px] leading-relaxed text-text-primary",children:[s,e.isStreaming&&(0,t.jsx)("span",{className:"inline-block w-1.5 h-4 bg-accent-navy/50 animate-pulse ml-0.5 align-text-bottom","aria-hidden":"true"})]})}),n&&(0,t.jsx)("div",{className:"flex-shrink-0 w-8 h-8 rounded-full bg-accent-amber/15 flex items-center justify-center text-sm mt-1","aria-hidden":"true",children:"👤"})]})}function u({onSend:e,onStop:n,isStreaming:s,placeholder:a="输入你的问题..."}){let[l,i]=(0,r.useState)(""),o=(0,r.useRef)(null),c=(0,r.useId)();(0,r.useEffect)(()=>{let e=o.current;e&&(e.style.height="auto",e.style.height=Math.min(e.scrollHeight,160)+"px")},[l]);let d=(0,r.useCallback)(()=>{l.trim()&&!s&&(e(l),i(""),o.current&&(o.current.style.height="auto"))},[l,s,e]),m=(0,r.useCallback)(e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),d())},[d]);return(0,t.jsxs)("div",{className:"py-3 sm:py-4",children:[(0,t.jsxs)("div",{className:"flex items-end gap-3 bg-white border border-border/60 px-4 py-2",children:[(0,t.jsx)("label",{htmlFor:c,className:"sr-only",children:"输入你的问题"}),(0,t.jsx)("textarea",{ref:o,id:c,value:l,onChange:e=>i(e.target.value),onKeyDown:m,placeholder:a,rows:1,maxLength:8e3,className:"flex-1 resize-none bg-transparent text-[15px] text-text-primary placeholder:text-text-secondary/40 outline-none py-2 leading-relaxed max-h-[160px]",disabled:s}),(0,t.jsx)("div",{className:"flex-shrink-0 pb-1",children:s?(0,t.jsx)("button",{onClick:n,className:"w-9 h-9 flex items-center justify-center border border-accent-navy/30 text-accent-navy hover:bg-accent-navy/5 transition-colors",title:"停止生成","aria-label":"停止生成",children:(0,t.jsx)("span",{className:"block w-3 h-3 bg-accent-navy"})}):(0,t.jsx)("button",{onClick:d,disabled:!l.trim(),className:"w-9 h-9 flex items-center justify-center border border-accent-navy text-accent-navy hover:bg-accent-navy hover:text-white transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed",title:"发送 (Enter)","aria-label":"发送消息",children:(0,t.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,t.jsx)("line",{x1:"12",y1:"19",x2:"12",y2:"5"}),(0,t.jsx)("polyline",{points:"5 12 12 5 19 12"})]})})})]}),(0,t.jsx)("p",{className:"text-xs text-text-secondary/30 font-mono mt-2 text-center",children:"Enter 发送 · Shift+Enter 换行"})]})}let m=["postgraduate","employment"];function h({currentMode:e,onSwitch:n}){let a=(0,r.useId)();return(0,t.jsxs)("div",{role:"group","aria-labelledby":a,className:"flex bg-surface-hover border border-border/40",children:[(0,t.jsx)("span",{id:a,className:"sr-only",children:"选择规划模式"}),m.map(r=>{let a=i[r],l=e===r;return(0,t.jsxs)("button",{onClick:()=>n(r),role:"tab","aria-selected":l,"aria-pressed":l,className:`relative px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${l?"text-accent-navy":"text-text-secondary/50 hover:text-text-secondary/80"}`,children:[l&&(0,t.jsx)(s.motion.div,{layoutId:"mode-switch-bg",className:"absolute inset-0 bg-white border border-border/60 shadow-sm",transition:{type:"spring",stiffness:400,damping:30}}),(0,t.jsxs)("span",{className:"relative z-10 flex items-center gap-1.5",children:[(0,t.jsx)("span",{className:"text-sm","aria-hidden":"true",children:a.icon}),(0,t.jsx)("span",{className:"hidden sm:inline",children:a.shortLabel})]})]},r)})]})}function p({prompts:e,onSelect:r}){return(0,t.jsxs)("div",{className:"space-y-2",children:[(0,t.jsx)("span",{className:"text-xs font-mono text-text-secondary/40 uppercase tracking-wider block text-center mb-3",children:"快捷提问"}),(0,t.jsx)("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-2xl mx-auto",children:e.map((e,n)=>(0,t.jsxs)(s.motion.button,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},transition:{duration:.3,delay:.06*n},onClick:()=>r(e),className:"text-left px-4 py-3 text-sm bg-white border border-border/60 hover:border-accent-navy/30 hover:bg-surface-hover transition-all duration-200 text-text-secondary hover:text-text-primary leading-relaxed group",children:[(0,t.jsx)("span",{className:"text-accent-navy/30 mr-2 group-hover:text-accent-navy/60 transition-colors",children:"—"}),e]},n))})]})}function x({initialMode:e}){let[n,m]=(0,r.useState)(e||"postgraduate"),[f,b]=(0,r.useState)([]),[y,g]=(0,r.useState)(!1),[j,v]=(0,r.useState)(null),w=(0,r.useRef)(null),N=(0,r.useRef)(null),k=i[n];(0,r.useEffect)(()=>{w.current?.scrollIntoView({behavior:"smooth"})},[f]);let S=(0,r.useCallback)(e=>{y&&(N.current?.abort(),g(!1),v(null)),m(e),b([])},[y]),P=(0,r.useRef)(f);(0,r.useEffect)(()=>{P.current=f},[f]);let C=(0,r.useCallback)(async e=>{if(!e.trim()||y)return;let t=P.current,r={id:crypto.randomUUID(),role:"user",content:e.trim()},s={id:crypto.randomUUID(),role:"assistant",content:"",isStreaming:!0};b(e=>[...e,r,s]),g(!0),v(s.id);let a=new AbortController;N.current=a;let l="",i=0;function d(){if(!l)return;let e=l;l="",b(t=>t.map(t=>t.id===s.id?{...t,content:t.content+e}:t))}try{let e=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({mode:n,messages:t.map(e=>({id:e.id,role:e.role,content:e.content}))}),signal:a.signal});if(!e.ok)throw Error("Request failed");let r=e.body?.getReader();if(!r)throw Error("No response body");let o=new TextDecoder,c="";for(;;){let{done:e,value:t}=await r.read();if(e)break;let n=(c+=o.decode(t,{stream:!0})).split("\n");for(let e of(c=n.pop()||"",n)){let t=e.trim();if(t&&t.startsWith("data: "))try{let e=JSON.parse(t.slice(6));if("chunk"===e.type&&e.content){l+=e.content;let t=Date.now();t-i>=50&&(d(),i=t)}else"error"===e.type&&(l=e.content||"处理出错，请重试。",d())}catch{}}}d(),b(e=>e.map(e=>e.id===s.id?{...e,isStreaming:!1}:e))}catch(e){if(e instanceof Error&&"AbortError"===e.name)d(),b(e=>e.map(e=>e.id===s.id?{...e,isStreaming:!1}:e));else{for(let e of function(e){let t=[],r=0;for(;r<e.length;){let n=e.slice(r,r+12),s=Math.min(...[n.indexOf(" ")+1,n.indexOf("\n")+1,n.indexOf("。")+1,n.indexOf("，")+1,n.indexOf("、")+1,n.indexOf("？")+1,n.indexOf("！")+1].filter(e=>e>0),12),a=s>0?s:3;t.push(e.slice(r,r+a)),r+=a}return t}("postgraduate"===n?o:c)){if(a.signal.aborted)break;l+=e;let t=Date.now();t-i>=50&&(d(),i=t);let r=e.length<=2?15:25+20*Math.random();await new Promise(e=>setTimeout(e,r))}d(),b(e=>e.map(e=>e.id===s.id?{...e,isStreaming:!1}:e))}}finally{g(!1),v(null),N.current=null}},[n,y]),O=(0,r.useCallback)(()=>{N.current?.abort()},[]),T=(0,r.useCallback)(()=>{y&&(N.current?.abort(),g(!1),v(null)),b([])},[y]);return(0,t.jsxs)("div",{className:"flex flex-col h-screen bg-bg-warm",children:[(0,t.jsx)("header",{className:"flex-shrink-0 border-b border-border bg-bg-warm/80 backdrop-blur-sm z-10",children:(0,t.jsxs)("div",{className:"mx-auto max-w-[900px] px-4 sm:px-6 h-14 flex items-center justify-between",children:[(0,t.jsxs)("div",{className:"flex items-center gap-4",children:[(0,t.jsx)(l.default,{href:"/",className:"font-serif font-bold text-xl text-text-primary hover:text-accent-navy transition-colors",children:"智升学"}),(0,t.jsx)(h,{currentMode:n,onSwitch:S})]}),(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[f.length>0&&(0,t.jsx)("button",{onClick:T,className:"text-sm text-text-secondary/60 hover:text-text-secondary transition-colors",children:"新对话"}),(0,t.jsx)(l.default,{href:"/",className:"text-sm text-text-secondary/40 hover:text-text-secondary transition-colors hidden sm:inline",children:"← 返回首页"})]})]})}),(0,t.jsx)("div",{className:"flex-1 overflow-y-auto",children:(0,t.jsx)("div",{className:"mx-auto max-w-[900px] px-4 sm:px-6",children:0===f.length?(0,t.jsxs)(s.motion.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},className:"py-16 sm:py-24",children:[(0,t.jsxs)("div",{className:"text-center mb-10",children:[(0,t.jsx)("span",{className:"text-4xl mb-4 block",children:k.icon}),(0,t.jsx)("h1",{className:"font-serif font-bold text-[clamp(28px,3.5vw,44px)] leading-[1.2] text-text-primary mb-3",children:k.heroTitle}),(0,t.jsx)("p",{className:"text-lg text-text-secondary max-w-lg mx-auto",children:k.description})]}),(0,t.jsx)(p,{prompts:k.quickPrompts,onSelect:C}),(0,t.jsxs)("div",{className:"mt-10",children:[(0,t.jsx)("span",{className:"text-xs font-mono text-text-secondary/40 uppercase tracking-wider mb-3 block text-center",children:"建议先做"}),(0,t.jsx)("div",{className:"flex flex-wrap justify-center gap-2",children:k.recommendedActions.map(e=>(0,t.jsx)("span",{className:"px-3 py-1.5 text-sm border border-border/60 bg-white text-text-secondary/70",children:e},e))})]})]}):(0,t.jsxs)("div",{className:"py-6 space-y-6",children:[(0,t.jsx)(a.AnimatePresence,{children:f.map(e=>(0,t.jsx)(s.motion.div,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.3},children:(0,t.jsx)(d,{message:e})},e.id))}),(0,t.jsx)("div",{ref:w})]})})}),(0,t.jsx)("div",{className:"flex-shrink-0 border-t border-border bg-bg-warm",children:(0,t.jsx)("div",{className:"mx-auto max-w-[900px] px-4 sm:px-6",children:(0,t.jsx)(u,{onSend:C,onStop:O,isStreaming:y,placeholder:`向 ${k.shortLabel} 顾问提问...`})})})]})}function f(){let e=(0,n.useSearchParams)().get("mode");return(0,t.jsx)(x,{initialMode:"employment"===e?"employment":"postgraduate"})}e.s(["default",0,function(){return(0,t.jsx)(r.Suspense,{fallback:(0,t.jsx)("div",{className:"h-screen bg-bg-warm flex items-center justify-center",children:(0,t.jsx)("div",{className:"text-text-secondary/40 font-mono text-sm",children:"加载中..."})}),children:(0,t.jsx)(f,{})})}],41222)}]);