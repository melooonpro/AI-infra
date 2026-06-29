import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Boxes,
  BrainCircuit,
  ChevronRight,
  CircleCheck,
  Code2,
  Database,
  FileSearch,
  GitBranch,
  Globe2,
  GraduationCap,
  Layers3,
  Link2,
  MessageSquareText,
  Network,
  PenLine,
  PlayCircle,
  Route,
  Search,
  ServerCog,
  Sparkles,
  Terminal,
  Users,
  Workflow,
  Wrench,
} from "lucide-react";
import React, { useMemo, useState } from "react";

const sourceProfile = "https://xhslink.com/m/8pqg9cyBVTS";
const ragNote = "http://xhslink.com/o/5QHrrvBB9RP";
const referencePage =
  "https://b.intsig.com/solution/knowledge-base?from=Bintsig-bingsem-PC-dmxzsk-C57-d0tn9z5lie-yg&msclkid=7dea70335b2510eacea01a728a22af29";

const navItems = [
  ["overview", "总览"],
  ["tracks", "课程路径"],
  ["knowledge", "知识体系"],
  ["rag", "RAG工程"],
  ["catalog", "视频索引"],
];

const heroStats = [
  { value: "36", label: "篇笔记", note: "全部归档", icon: BookOpen },
  { value: "26", label: "条视频", note: "约 194 分钟", icon: PlayCircle },
  { value: "5", label: "条学习路径", note: "从小白到 Agent", icon: Route },
  { value: "82.6K", label: "赞藏量级", note: "优质 AI 内容源", icon: BadgeCheck },
];

const architecture = [
  { title: "资料输入", text: "视频、图文、笔记、私有文档", icon: FileSearch },
  { title: "结构化", text: "抽取主题、术语、步骤、例子", icon: Layers3 },
  { title: "知识索引", text: "按 Skill、Agent、RAG、Vibe Coding 编排", icon: Database },
  { title: "学习应用", text: "检索、路径、复盘、实践项目", icon: BrainCircuit },
];

const tracks = [
  {
    id: "ai-basic",
    title: "AI 基础路径",
    subtitle: "先建立模型、token、向量和提示词的底层心智模型。",
    icon: GraduationCap,
    stat: "9篇笔记",
    points: ["大模型是什么", "Token 与上下文", "文字如何变成向量", "提示词怎么写", "如何去除 AI 味"],
  },
  {
    id: "skill",
    title: "Skill 专题",
    subtitle: "理解 Skill 为什么能提升 Agent 和日常工作效率。",
    icon: Boxes,
    stat: "5篇笔记",
    points: ["Skill 解决重复任务", "目录结构与编写方式", "Agent 如何选择 Skill", "为什么不只是提示词封装"],
  },
  {
    id: "agent",
    title: "Agent 能力栈",
    subtitle: "从聊天机器人进化到可调用工具、可协作的智能体。",
    icon: Network,
    stat: "11篇笔记",
    points: ["Agent 发送什么给模型", "工具如何被模型使用", "MCP/CLI/RAG 的位置", "SubAgent 与 MultiAgent"],
  },
  {
    id: "rag",
    title: "RAG 知识库工程",
    subtitle: "把私有数据检索出来，再增强提示词，让答案有依据。",
    icon: Database,
    stat: "1条核心长视频",
    points: ["私有数据盲区", "向量化与语义检索", "检索增强生成三步", "工具触发 RAG 流程"],
  },
  {
    id: "vibe",
    title: "Vibe Coding 路线",
    subtitle: "用自然语言驱动开发，同时补齐工程常识。",
    icon: Code2,
    stat: "8条视频",
    points: ["什么是 Vibe Coding", "网页/App/后端", "编程语言与网络", "GitHub/API/SDK", "和 AI 聊产品"],
  },
];

const knowledgeBlocks = [
  {
    id: "basic",
    title: "AI 小白先补的基础",
    icon: Sparkles,
    color: "blue",
    summary:
      "视频把抽象 AI 概念拆成故事化类比：模型像全能学生，Token 像阅读和收费单位，向量像把语义映射到坐标空间。",
    points: [
      "大模型适合处理通用知识、文本、图片、视频、音乐等不同模态任务，选择时要看任务类型、成本、可访问性和效果上限。",
      "Token 是模型读写内容的基本单位，输入 token 和输出 token 都会影响上下文长度、响应速度和费用。",
      "上下文窗口不是无限记忆，塞太多内容会增加成本，也可能让模型注意力分散。",
      "文字向量化是语义检索的基础，相近意思会在向量空间里更接近。",
      "提示词不是玄学，它就是你交给模型的全部输入，质量会直接影响模型能否理解任务边界。",
    ],
  },
  {
    id: "skill",
    title: "Skill 不是提示词外壳",
    icon: Boxes,
    color: "green",
    summary:
      "Skill 的价值在于把稳定流程、领域知识、约束和可复用资源打包，让 Agent 在合适场景自动取用。",
    points: [
      "Skill 要先说明自己解决什么问题，触发边界越清楚，Agent 越容易选对。",
      "一个好的 Skill 通常包含入口说明、步骤、注意事项、脚本、模板、示例和资产，而不是只写一段提示词。",
      "Agent 使用 Skill 时，会把 Skill 的规则并入当前任务上下文，再按步骤执行。",
      "可复用 Skill 能把经验沉淀下来，减少每次从零解释需求的成本。",
      "写 Skill 的关键是把隐性经验显性化：何时用、怎么做、哪些坑要避开、结果如何验收。",
    ],
  },
  {
    id: "agent",
    title: "Agent 从聊天到行动",
    icon: BrainCircuit,
    color: "cyan",
    summary:
      "Agent 的核心不是会聊天，而是让大模型在历史消息、工具、记忆、Skill 和外部知识的帮助下持续思考、执行、观察。",
    points: [
      "Agent 每次请求模型时，通常会发送系统提示词、历史消息、工具信息、模型配置和当前用户任务。",
      "工具会以名称、描述和参数结构暴露给模型；模型判断要不要调用，Agent 负责真实执行。",
      "有了工具后，处理流程从一次问答变成思考、执行、观察、再思考的循环。",
      "记忆让 Agent 能带上历史上下文，RAG 让 Agent 能查私有或实时知识，CLI 让 Agent 能操作本地软件能力。",
      "SubAgent 更像把子任务交给专门角色独立处理；MultiAgent 更强调多个 Agent 之间的协作和信息交换。",
    ],
  },
  {
    id: "vibe",
    title: "Vibe Coding 的正确姿势",
    icon: Terminal,
    color: "amber",
    summary:
      "Vibe Coding 不是完全不懂工程就交给 AI，而是用自然语言持续描述目标、检查结果、补充约束，并用基础工程知识兜底。",
    points: [
      "先用产品语言把目标说清楚：用户是谁、页面做什么、数据从哪里来、交互怎么走。",
      "网页、App、小程序、后端不是同一种东西，开工前要先判断要构建的产品形态。",
      "编程语言、HTTP/HTTPS、API、域名、Git/GitHub 是和 AI 协作开发时最该补齐的工程常识。",
      "API 更像别人开放的功能入口，SDK 更像把一组 API 和调用方式打包成开发工具。",
      "AI 生成代码后要运行、看效果、报错回填、继续迭代，把对话变成一个开发闭环。",
    ],
  },
  {
    id: "writing",
    title: "提示词与去 AI 味",
    icon: PenLine,
    color: "rose",
    summary:
      "写作类视频强调：提示词要给足上下文和标准，去 AI 味要处理高频词、模板句、空泛表达和缺少个人细节的问题。",
    points: [
      "好提示词通常包含角色、任务、背景、素材、限制条件、输出格式和可参考示例。",
      "不要只说“写好一点”，要明确读者、语气、长度、平台、禁用词和必须保留的信息。",
      "AI 味常见表现是高频套话、同质化句式、过度总结、过度平衡和缺少真实细节。",
      "去 AI 味不是简单降重，而是补事实、补场景、补个人判断，并让句式长短更自然。",
      "让模型先列结构，再逐段改写，最后人工做口吻和事实校准，效果通常更稳。",
    ],
  },
];

const ragFlow = [
  {
    title: "1. 为什么需要 RAG",
    text: "大模型主要基于公开数据训练，且有知识截止点。企业私有制度、最新信息和实时资料没有进入参数，直接问容易不知道或编造。",
  },
  {
    title: "2. 为什么不能全塞上下文",
    text: "把所有私有数据都发给模型会浪费 token，触碰上下文限制，还会把无关材料带进去，增加幻觉概率。",
  },
  {
    title: "3. 私有数据先向量化",
    text: "把文档切成块，再把每个块转成向量并存入向量数据库。向量让“退商品”“退东西”“退货规则”这类相近表达能被语义匹配。",
  },
  {
    title: "4. 检索最相关 TopK",
    text: "用户问题也会被向量化，再和库里的向量做相似度计算，找出最接近的知识片段，而不是把全部资料都交给模型。",
  },
  {
    title: "5. 增强提示词",
    text: "把用户问题和检索出的证据重新组织成增强提示词，带上来源、约束和回答要求。",
  },
  {
    title: "6. 生成并返回",
    text: "检索和增强发生在 RAG/Agent 侧，最终生成发生在大模型侧。模型基于增强后的上下文回答，答案更省 token、更有依据。",
  },
];

const agentStack = [
  { title: "系统提示词", text: "稳定规则、身份、边界和任务方式。", icon: MessageSquareText },
  { title: "历史消息", text: "当前会话中用户与模型来回交流的上下文。", icon: BookOpen },
  { title: "记忆", text: "跨轮次、跨任务可复用的信息沉淀。", icon: BrainCircuit },
  { title: "工具", text: "文件、搜索、浏览器、数据库、API 等外部能力。", icon: Wrench },
  { title: "Skill", text: "封装好的领域流程、模板和实践经验。", icon: Boxes },
  { title: "MCP", text: "让工具和资源以统一协议暴露给 AI 应用。", icon: ServerCog },
  { title: "CLI", text: "让 Agent 调用命令行，从而使用本地软件功能。", icon: Terminal },
  { title: "RAG", text: "从外部知识库检索证据，再交给模型生成。", icon: FileSearch },
];

const catalog = [
  {
    title: "skill｜AI基础知识 第一节",
    type: "视频",
    duration: "8:38",
    topic: "Skill",
    points: ["Skill 解决什么问题", "为什么能提升效率", "用问题驱动理解新概念"],
  },
  {
    title: "skill 二｜AI基础知识第二节",
    type: "视频",
    duration: "5:37",
    topic: "Skill",
    points: ["Skill 目录结构", "如何写 Skill", "如何安装和复用别人的 Skill"],
  },
  {
    title: "skill三｜AI基础知识第三节",
    type: "视频",
    duration: "9:21",
    topic: "Skill",
    points: ["大模型如何识别 Skill", "Agent 如何把 Skill 放进任务流程", "Skill 和工具的区别"],
  },
  {
    title: "skill不单单只是对提示词的封装",
    type: "视频",
    duration: "2:26",
    topic: "Skill",
    points: ["Skill 包含流程和资源", "不是复制提示词", "沉淀可复用经验"],
  },
  {
    title: "AI第一讲 | 文字是如何变成向量的",
    type: "图文",
    duration: "图文",
    topic: "Token/向量",
    points: ["文本向量化", "语义相似度", "向量检索的前置知识"],
  },
  {
    title: "Token上下文限制",
    type: "图文",
    duration: "图文",
    topic: "Token/向量",
    points: ["上下文窗口", "为什么不能无限塞资料", "长文本任务的边界"],
  },
  {
    title: "input token和output token到底是啥",
    type: "图文",
    duration: "图文",
    topic: "Token/向量",
    points: ["输入 token", "输出 token", "费用和响应长度"],
  },
  {
    title: "小眼怪介绍Token",
    type: "图文",
    duration: "图文",
    topic: "Token/向量",
    points: ["用图文理解 token", "模型阅读单位", "上下文成本"],
  },
  {
    title: "如何写好提示词｜AI小白入门第二节",
    type: "视频",
    duration: "7:34",
    topic: "Prompt",
    points: ["提示词是什么", "影响输出质量的关键变量", "任务、背景、格式要明确"],
  },
  {
    title: "AI基础知识第十一节｜去除文章AI味（上）",
    type: "视频",
    duration: "7:37",
    topic: "Prompt",
    points: ["AI 味的常见表现", "高频词与模板句", "从问题定位到改写策略"],
  },
  {
    title: "大模型和agent的选择｜AI小白入门",
    type: "视频",
    duration: "8:40",
    topic: "AI基础",
    points: ["大模型分类", "国内外模型选择", "按任务选择模型或 Agent"],
  },
  {
    title: "给ai小白的一些小小的学习建议",
    type: "视频",
    duration: "5:54",
    topic: "AI基础",
    points: ["入门顺序", "不要盲目追热点", "边学边做项目"],
  },
  {
    title: "1节｜agent到底发送哪些数据给大模型",
    type: "视频",
    duration: "9:59",
    topic: "Agent",
    points: ["系统提示词", "历史消息", "工具信息", "模型信息"],
  },
  {
    title: "2节｜agent的工具如何被大模型使用",
    type: "视频",
    duration: "7:59",
    topic: "Agent",
    points: ["工具 schema", "模型选择工具", "Agent 执行工具并返回结果"],
  },
  {
    title: "tool工具｜AI基础知识第四节",
    type: "视频",
    duration: "13:37",
    topic: "Agent",
    points: ["工具把聊天机器人变成 Agent", "工具名称、描述、参数", "思考、执行、观察循环"],
  },
  {
    title: "mcp｜AI基础知识第五节",
    type: "视频",
    duration: "6:18",
    topic: "Agent",
    points: ["MCP 是连接工具和 AI 应用的协议", "Server 暴露能力", "Client 统一调用"],
  },
  {
    title: "cli | Al基础知识 第六节",
    type: "视频",
    duration: "10:26",
    topic: "Agent",
    points: ["CLI 让 Agent 使用软件功能", "命令行作为工具入口", "连接本地能力"],
  },
  {
    title: "RAG｜AI基础知识第七节",
    type: "视频",
    duration: "12:07",
    topic: "RAG",
    points: ["私有数据盲区", "向量化与语义检索", "检索、增强、生成"],
  },
  {
    title: "agent知识总结｜AI基础知识第八节",
    type: "视频",
    duration: "10:10",
    topic: "Agent",
    points: ["聊天机器人到 Agent", "记忆、工具、Skill、CLI、MCP、RAG 的关系", "完整能力栈"],
  },
  {
    title: "subAgent multiAgent｜AI基础第九节",
    type: "视频",
    duration: "8:02",
    topic: "Agent",
    points: ["SubAgent 的独立任务处理", "MultiAgent 的协作", "何时使用多智能体"],
  },
  {
    title: "AI知识第十节｜agent启动时做了哪些事情",
    type: "视频",
    duration: "5:45",
    topic: "Agent",
    points: ["Agent 启动加载哪些信息", "系统提示词、历史、工具、模型区域", "启动后的任务准备"],
  },
  {
    title: "达尔文进化论的方式讲解Agent",
    type: "视频",
    duration: "9:29",
    topic: "Agent",
    points: ["从简单能力到复杂能力的演化", "为什么工具和记忆让 Agent 变强", "用类比理解架构升级"],
  },
  {
    title: "用图文故事漫画方式讲解清楚Agent是啥",
    type: "图文",
    duration: "图文",
    topic: "Agent",
    points: ["Demo 到 Agent 的变化", "工具如何被使用", "Skill 如何被使用"],
  },
  {
    title: "vibe coding是啥",
    type: "视频",
    duration: "4:42",
    topic: "Vibe Coding",
    points: ["不用深编程经验也能让 AI 写代码", "通过对话持续迭代", "人负责目标和验收"],
  },
  {
    title: "5节｜vibe coding第二节",
    type: "视频",
    duration: "7:15",
    topic: "Vibe Coding",
    points: ["小程序、App、网页、后端", "先判断产品形态", "不同形态对应不同技术栈"],
  },
  {
    title: "6节｜vibe coding 第三节",
    type: "视频",
    duration: "4:49",
    topic: "Vibe Coding",
    points: ["编程语言基础", "和 AI 讨论技术方案", "知道代码属于哪一层"],
  },
  {
    title: "6｜vibe coding 第四节",
    type: "视频",
    duration: "6:46",
    topic: "Vibe Coding",
    points: ["HTTP/HTTPS", "API", "域名", "网页服务的基础连接方式"],
  },
  {
    title: "6｜vibe coding第五节",
    type: "视频",
    duration: "4:56",
    topic: "Vibe Coding",
    points: ["Git 与 GitHub", "版本管理", "协作和部署前的代码保存"],
  },
  {
    title: "9｜vibe coding第六节",
    type: "视频",
    duration: "7:20",
    topic: "Vibe Coding",
    points: ["和 AI 聊产品", "把业务目标翻译成开发任务", "减少返工"],
  },
  {
    title: "Api｜vibe coding第七节",
    type: "视频",
    duration: "5:44",
    topic: "Vibe Coding",
    points: ["API 是功能入口", "接口输入输出", "AI 开发中如何调用外部能力"],
  },
  {
    title: "sdk ｜vibe coding第八节",
    type: "视频",
    duration: "2:53",
    topic: "Vibe Coding",
    points: ["SDK 是开发工具包", "封装 API 调用", "降低接入复杂度"],
  },
  {
    title: "又看到似曾相识的场景-使用codex",
    type: "图文",
    duration: "图文",
    topic: "Vibe Coding",
    points: ["不要盲目跟风安装工具", "先评估需求", "Agent 强弱取决于底层模型和工作流"],
  },
  {
    title: "推荐一个为文章配图的开源库",
    type: "图文",
    duration: "图文",
    topic: "Prompt",
    points: ["文章配图资源", "开源插图库", "内容创作辅助"],
  },
  {
    title: "小红书阅读量/赞藏里程碑",
    type: "图文",
    duration: "图文",
    topic: "AI基础",
    points: ["账号内容影响力", "AI 知识系列持续更新", "适合作为学习素材源"],
  },
];

const filters = ["全部", "AI基础", "Skill", "Agent", "RAG", "Vibe Coding", "Prompt", "Token/向量"];

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function App() {
  const [activeFilter, setActiveFilter] = useState("全部");
  const [query, setQuery] = useState("");

  const filteredCatalog = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return catalog.filter((item) => {
      const matchFilter = activeFilter === "全部" || item.topic === activeFilter;
      const haystack = `${item.title} ${item.topic} ${item.points.join(" ")}`.toLowerCase();
      return matchFilter && (!normalized || haystack.includes(normalized));
    });
  }, [activeFilter, query]);

  return (
    <div className="site-shell">
      <Header />

      <main>
        <section className="hero-band" id="overview">
          <div className="container hero">
            <div className="hero-copy">
              <span className="eyebrow">
                <Sparkles size={16} />
                牛哥趣讲AI · 视频知识库
              </span>
              <h1>把优质 AI 视频整理成可检索、可复习、可实践的知识体系</h1>
              <p>
                基于牛哥趣讲AI主页的 36 篇 AI 笔记与 26 条视频，重构为 AI 基础、Skill、Agent、RAG、
                Vibe Coding 和提示词写作的学习路径。
              </p>
              <div className="hero-actions">
                <button onClick={() => scrollTo("tracks")}>
                  查看学习路径
                  <ChevronRight size={18} />
                </button>
                <a href={sourceProfile} target="_blank" rel="noreferrer">
                  打开小红书主页
                  <Link2 size={17} />
                </a>
              </div>
              <div className="search-panel" role="search">
                <Search size={18} />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="搜索 RAG、Agent、Skill、API、Token..."
                />
              </div>
              <div className="hot-tags" aria-label="热门主题">
                {["RAG", "Agent", "MCP", "Skill", "Vibe Coding", "Prompt"].map((tag) => (
                  <button key={tag} onClick={() => setActiveFilter(tag === "MCP" ? "Agent" : tag)}>
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="hero-visual" aria-label="RAG 与 Agent 架构总览">
              <div className="visual-title">
                <BrainCircuit size={20} />
                <div>
                  <strong>RAG + Agent 架构总览</strong>
                  <span>从视频素材到智能问答</span>
                </div>
              </div>
              <div className="architecture-grid">
                {architecture.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div className="architecture-step" key={item.title}>
                      <Icon size={22} />
                      <strong>{item.title}</strong>
                      <p>{item.text}</p>
                      {index < architecture.length - 1 && <ArrowRight size={16} />}
                    </div>
                  );
                })}
              </div>
              <div className="agent-loop">
                <div>思考</div>
                <div>行动</div>
                <div>观察</div>
                <div>再规划</div>
              </div>
              <div className="tool-strip">
                {["Tools", "MCP", "CLI", "RAG", "Skill", "Memory"].map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="stats-band" aria-label="内容统计">
          <div className="container stats-grid">
            {heroStats.map((item) => {
              const Icon = item.icon;
              return (
                <div className="stat-card" key={item.label}>
                  <Icon size={28} />
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                  <p>{item.note}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="section-band" id="tracks">
          <div className="container">
            <SectionHeading
              kicker="Learning paths"
              title="学习路径总览"
              text="先按路径建立整体框架，再进入每条视频的知识点索引。"
            />
            <div className="track-grid">
              {tracks.map((track) => {
                const Icon = track.icon;
                return (
                  <article className="track-card" key={track.id}>
                    <div className="track-icon">
                      <Icon size={24} />
                    </div>
                    <span>{track.stat}</span>
                    <h3>{track.title}</h3>
                    <p>{track.subtitle}</p>
                    <ul>
                      {track.points.map((point) => (
                        <li key={point}>
                          <CircleCheck size={15} />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section-band knowledge-band" id="knowledge">
          <div className="container">
            <SectionHeading
              kicker="Knowledge system"
              title="从视频中抽取出的完整知识体系"
              text="不按发布时间堆叠，而是按学习者真正需要的概念顺序重新组织。"
            />
            <div className="knowledge-grid">
              {knowledgeBlocks.map((block) => {
                const Icon = block.icon;
                return (
                  <article className={`knowledge-card ${block.color}`} key={block.id}>
                    <div className="card-head">
                      <Icon size={23} />
                      <h3>{block.title}</h3>
                    </div>
                    <p>{block.summary}</p>
                    <ul>
                      {block.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section-band rag-band" id="rag">
          <div className="container rag-layout">
            <div>
              <SectionHeading
                kicker="RAG deep dive"
                title="RAG 第七节核心知识点"
                text="这条视频用“公司入职信息”这类私有数据问题，引出检索增强生成的必要性。"
              />
              <div className="rag-flow">
                {ragFlow.map((step) => (
                  <article key={step.title}>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </article>
                ))}
              </div>
            </div>
            <aside className="rag-panel">
              <h3>RAG 三件事</h3>
              <div className="rag-letters">
                <span>R</span>
                <div>
                  <strong>Retrieval 检索</strong>
                  <p>从向量数据库里找最相关的私有知识。</p>
                </div>
              </div>
              <div className="rag-letters">
                <span>A</span>
                <div>
                  <strong>Augmented 增强</strong>
                  <p>把问题与 TopK 证据重新组织成提示词。</p>
                </div>
              </div>
              <div className="rag-letters">
                <span>G</span>
                <div>
                  <strong>Generation 生成</strong>
                  <p>让大模型基于增强上下文生成答案。</p>
                </div>
              </div>
              <a href={ragNote} target="_blank" rel="noreferrer">
                查看 RAG 原笔记
                <ArrowRight size={17} />
              </a>
            </aside>
          </div>
        </section>

        <section className="section-band stack-band">
          <div className="container">
            <SectionHeading
              kicker="Agent stack"
              title="Agent 能力栈如何拼起来"
              text="第八节总结视频把前面的工具、Skill、CLI、MCP、RAG 串成一条从聊天机器人到 Agent 的演化链。"
            />
            <div className="stack-grid">
              {agentStack.map((item) => {
                const Icon = item.icon;
                return (
                  <article className="stack-item" key={item.title}>
                    <Icon size={22} />
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section-band catalog-band" id="catalog">
          <div className="container">
            <div className="catalog-head">
              <SectionHeading
                kicker="Video index"
                title="全部 AI 相关内容索引"
                text="每条内容都被归入主题，并抽出适合复习的知识点。"
              />
              <div className="catalog-controls">
                {filters.map((filter) => (
                  <button
                    className={activeFilter === filter ? "active" : ""}
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
            <div className="catalog-grid">
              {filteredCatalog.map((item) => (
                <article className="lesson-card" key={item.title}>
                  <div className="lesson-meta">
                    <span>{item.type}</span>
                    <span>{item.duration}</span>
                    <span>{item.topic}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <ul>
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-band">
          <div className="container cta">
            <div>
              <span>下一步</span>
              <h2>把知识点变成可练习的 AI 项目路线</h2>
              <p>从 RAG 知识库、Agent 工具调用、MCP 工具箱到 Vibe Coding 项目，形成完整的学习闭环。</p>
            </div>
            <div className="cta-actions">
              <a href={sourceProfile} target="_blank" rel="noreferrer">
                小红书主页
                <ArrowRight size={17} />
              </a>
              <a href={referencePage} target="_blank" rel="noreferrer">
                布局参考页
                <Globe2 size={17} />
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="logo" href="#overview">
          <span>
            <BrainCircuit size={22} />
          </span>
          <strong>牛哥趣讲AI 知识库</strong>
        </a>
        <nav aria-label="主导航">
          {navItems.map(([id, label]) => (
            <button key={id} onClick={() => scrollTo(id)}>
              {label}
            </button>
          ))}
        </nav>
        <a className="header-cta" href={sourceProfile} target="_blank" rel="noreferrer">
          查看来源
        </a>
      </div>
    </header>
  );
}

function SectionHeading({ kicker, title, text }) {
  return (
    <div className="section-heading">
      <span>{kicker}</span>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}

export default App;
