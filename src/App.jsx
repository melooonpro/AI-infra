import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  CircleDot,
  Code2,
  Database,
  FileSearch,
  Gauge,
  GitBranch,
  Layers3,
  Moon,
  Network,
  PanelLeft,
  PenLine,
  PlayCircle,
  RefreshCcw,
  Search,
  Settings2,
  Sparkles,
  Sun,
  Target,
  TestTube2,
  Workflow,
} from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";

const navGroups = [
  {
    label: "学习中心",
    items: [
      { label: "首页", icon: BookOpen },
      { label: "学习路径", icon: Workflow },
      { label: "收藏", icon: CircleDot },
      { label: "笔记", icon: PenLine },
    ],
  },
  {
    label: "知识体系",
    items: [
      { label: "大模型基础", icon: Sparkles },
      { label: "RAG 检索增强生成", icon: FileSearch, active: true },
      { label: "Agent 开发", icon: Network },
      { label: "提示工程", icon: Code2 },
      { label: "工具与生态", icon: Settings2 },
    ],
  },
  {
    label: "资源库",
    items: [
      { label: "文档库", icon: Database },
      { label: "代码库", icon: Code2 },
      { label: "数据集", icon: Layers3 },
    ],
  },
];

const anchors = [
  ["why", "为什么需要 RAG"],
  ["vector", "向量化与语义检索"],
  ["data", "数据治理与 Chunk"],
  ["retrieval", "检索、改写与重排"],
  ["context", "上下文工程"],
  ["eval", "评估闭环"],
  ["practice", "生产落地清单"],
];

const pipeline = [
  { title: "文档解析", sub: "PDF / HTML / 表格", icon: FileSearch, phase: "offline" },
  { title: "切块", sub: "语义完整片段", icon: Layers3, phase: "offline" },
  { title: "向量化", sub: "Embedding", icon: Sparkles, phase: "offline" },
  { title: "检索", sub: "向量 + 关键词", icon: Search, phase: "online" },
  { title: "重排", sub: "Rerank TopK", icon: GitBranch, phase: "online" },
  { title: "上下文", sub: "组装提示词", icon: PanelLeft, phase: "online" },
  { title: "生成", sub: "LLM 答案", icon: PlayCircle, phase: "online" },
  { title: "评估回放", sub: "质量与成本", icon: Gauge, phase: "feedback" },
];

const compareRows = [
  ["知识来源", "训练数据，且受截止时间限制", "训练数据 + 外部知识库，可持续更新"],
  ["回答依据", "依赖参数记忆，容易编造", "先检索证据，再基于证据生成"],
  ["上下文成本", "把资料全部塞进去，成本不可控", "只把相关 TopK 片段放入上下文"],
  ["可解释性", "难知道答案从哪里来", "可展示引用片段、分数和来源"],
  ["适用场景", "通用问答、开放闲聊", "企业知识库、客服、审计、投研、代码问答"],
];

const embeddingRows = [
  ["Chunk", "一段可检索的知识片段", "不要机械截断，优先保证单块语义完整。"],
  ["Embedding", "把文本映射成高维数字向量", "语义相近的文本在向量空间距离更近。"],
  ["余弦相似度", "衡量两个向量方向相近程度", "越接近 1，语义越相近；检索时常用来排序。"],
  ["TopK", "召回分数最高的 K 条候选", "K 不是越大越好，过大会带来噪声和成本。"],
];

const chunkRows = [
  ["清洗", "去广告、页眉页脚、目录噪声、重复模板", "统一编码，保留标题层级与来源"],
  ["切块", "按标题、段落、语义边界拆分", "常见 200-800 token，重叠 50-120 token 起步"],
  ["元数据", "来源、时间、权限、章节、业务标签", "用于过滤、引用、回放和权限控制"],
  ["索引", "向量索引 + 关键词索引", "为混合检索、增量更新和删除留接口"],
  ["版本", "文档版本、切块版本、embedding 模型版本", "评估问题时能复现当时检索结果"],
];

const optimizationCards = [
  {
    title: "Hybrid Search",
    text: "向量检索擅长语义，BM25 擅长精确词。生产环境常把两路召回合并，再用 RRF 等方法融合排名。",
  },
  {
    title: "Query Rewrite",
    text: "把口语、缩写、指代不清的问题改写成更适合检索的查询，也可以生成多路查询提升召回率。",
  },
  {
    title: "HyDE",
    text: "先让模型猜一个假想答案，再用假想答案去检索。它适合问题和知识库文本表达差异很大的场景。",
  },
  {
    title: "Rerank",
    text: "用更强的重排模型逐条判断 query 与候选片段的相关性，提高最终放入上下文的证据质量。",
  },
  {
    title: "Context Compression",
    text: "对召回结果去重、摘要、裁剪，保留回答所需证据，减少无关文本占用上下文窗口。",
  },
];

const evalRows = [
  ["Faithfulness", "答案是否忠于检索到的证据", "引用检查、事实一致性打分"],
  ["Answer Relevance", "答案是否真正回答用户问题", "人工标注集 + LLM-as-judge"],
  ["Context Precision", "放进上下文的片段是否相关", "TopK 命中率、噪声比例"],
  ["Context Recall", "关键证据是否被召回", "黄金问题集、人工答案来源"],
  ["Latency / Cost", "响应速度和调用成本是否可接受", "分阶段耗时、token、缓存命中率"],
];

const glossary = [
  ["RAG", "Retrieval-Augmented Generation，检索增强生成。核心是先检索外部知识，再增强提示词，让模型基于证据生成。"],
  ["Embedding", "把文本变成向量的过程。它让机器可以用数学距离描述语义相似度。"],
  ["向量数据库", "保存向量、原文片段和元数据，并支持相似度检索的数据库或索引系统。"],
  ["Rerank", "对召回候选进行二次排序，通常比初召模型更准，但成本更高。"],
  ["Chunk", "从文档中切出来的知识片段。Chunk 的质量直接影响检索和生成质量。"],
  ["RRF", "Reciprocal Rank Fusion，一种融合多路检索排名的方法。"],
  ["Groundedness", "答案是否有证据支撑，也常称 grounded generation 的忠实度。"],
];

const checkpoints = [
  "为什么大模型不知道企业私有知识",
  "向量化如何支撑语义搜索",
  "Chunk 为什么要保持语义完整",
  "TopK、重排和上下文压缩的关系",
  "如何评估 RAG 是否真的变好",
  "生产上线前需要监控什么",
];

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function App() {
  const [activeId, setActiveId] = useState("why");
  const [mode, setMode] = useState("优化视图");
  const [openTerm, setOpenTerm] = useState("RAG");
  const [quiz, setQuiz] = useState("A");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max <= 0 ? 0 : Math.round((doc.scrollTop / max) * 100));

      let current = anchors[0][0];
      for (const [id] of anchors) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 220) current = id;
      }
      setActiveId(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const completed = useMemo(() => Math.max(2, Math.round((progress / 100) * checkpoints.length)), [progress]);

  return (
    <div className="app-shell">
      <TopBar />
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-icon"><BookOpen size={22} /></span>
          <span>AI知识大全</span>
        </div>
        <div className="sidebar-groups">
          {navGroups.map((group) => (
            <nav className="nav-group" key={group.label} aria-label={group.label}>
              <p>{group.label}</p>
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <button className={item.active ? "nav-item active" : "nav-item"} key={item.label}>
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          ))}
        </div>
        <button className="feedback"><PenLine size={15} /> 反馈与建议</button>
      </aside>

      <main className="content">
        <article>
          <header className="article-header">
            <div>
              <h1>RAG：从入门到生产优化</h1>
              <p>
                把外部知识“检索出来”，作为上下文补充给模型，从而提升准确性、降低幻觉，并让答案可追溯。
                本页从基础心智模型讲到生产调优链路。
              </p>
            </div>
            <button className="bookmark"><CircleDot size={16} /> 收藏</button>
          </header>

          <section className="pipeline" aria-label="RAG pipeline">
            {pipeline.map((step, index) => {
              const Icon = step.icon;
              return (
                <div className="pipeline-item-wrap" key={step.title}>
                  <div className={`pipeline-card ${step.phase}`}>
                    <Icon size={24} />
                    <strong>{step.title}</strong>
                    <span>{step.sub}</span>
                  </div>
                  {index < pipeline.length - 1 && <ArrowRight className="pipe-arrow" size={18} />}
                </div>
              );
            })}
          </section>

          <div className="phase-legend">
            <span><i className="offline-dot" /> 离线知识构建</span>
            <span><i className="online-dot" /> 在线检索生成</span>
            <span><i className="feedback-dot" /> 反馈优化</span>
          </div>

          <Segmented value={mode} onChange={setMode} />

          <Section id="why" number="1" title="为什么需要 RAG">
            <p>
              大模型的训练数据主要来自公开资料，而且有时间截止点。企业内部制度、实时价格、最新公告、私有客服文档，
              都不一定存在于模型参数里。直接问模型，它可能“不知道却硬答”。
            </p>
            <DataTable
              headers={["维度", "纯大模型", "RAG"]}
              rows={compareRows}
            />
            <Callout icon={Target} title="心智模型">
              不要把 RAG 理解成“让模型记住更多东西”。它更像给模型开卷考试：先找资料，再带着资料作答。
            </Callout>
          </Section>

          <Section id="vector" number="2" title="向量化与语义检索">
            <p>
              RAG 的基础是语义搜索。用户说“退东西”，文档写“退货规则”，关键词未必完全一致，但语义应当匹配。
              Embedding 会把文本映射成向量，再用相似度找到意思最接近的片段。
            </p>
            <DataTable headers={["概念", "作用", "实践提醒"]} rows={embeddingRows} />
            <div className="example-strip">
              <div>
                <strong>二维直觉示例</strong>
                <p>苹果 [0.9, 0.7]、梨 [0.9, 0.5] 更接近；手机 [0, 0] 与它们距离更远。</p>
              </div>
              <div className="axis-card">
                <span>水果属性</span>
                <div className="axis">
                  <i style={{ left: "12%" }}>手机</i>
                  <i style={{ left: "70%" }}>梨</i>
                  <i style={{ left: "82%" }}>苹果</i>
                </div>
              </div>
            </div>
          </Section>

          <Section id="data" number="3" title="数据治理与 Chunk">
            <p>
              生产 RAG 的质量上限通常由数据决定。脏数据、重复段落、权限缺失、错误切块，会让再强的模型也答不好。
              Chunk 的关键不是切得越碎越好，而是让每一块都能独立表达清楚。
            </p>
            <DataTable headers={["治理动作", "关键点", "建议"]} rows={chunkRows} />
          </Section>

          <Section id="retrieval" number="4" title="检索、改写与重排">
            <p>
              单一路向量召回往往不够。生产系统通常会组合关键词检索、向量检索、查询改写、重排和过滤策略，
              用“多路召回 + 精排”的方式提升证据质量。
            </p>
            <div className="strategy-grid">
              {optimizationCards.map((card, index) => (
                <div className="strategy-card" key={card.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section id="context" number="5" title="上下文工程">
            <p>
              检索到资料只是中间结果。真正喂给模型的增强提示词，需要控制顺序、引用、长度和冲突处理。
              好的上下文工程会把“证据、任务、约束、输出格式”分清楚。
            </p>
            <div className="context-layout">
              <div className="prompt-block">
                <span>增强提示词结构</span>
                <pre>{`任务：回答用户问题，只能依据证据。
用户问题：{question}
证据片段：
1. {chunk.source} - {chunk.text}
2. {chunk.source} - {chunk.text}
输出要求：
- 不确定时说明缺少证据
- 引用来源
- 简洁回答`}</pre>
              </div>
              <ul className="context-checklist">
                <li><Check size={16} /> 相关片段放前面，低分片段裁剪。</li>
                <li><Check size={16} /> 冲突证据显式交给模型判断。</li>
                <li><Check size={16} /> 保留来源，方便引用和追溯。</li>
                <li><Check size={16} /> 对长片段做去重与压缩。</li>
              </ul>
            </div>
          </Section>

          <Section id="eval" number="6" title="评估闭环">
            <p>
              RAG 需要被量化评估。只看“肉眼觉得变好”很容易误判：召回率、忠实度、成本、延迟都要拆开看。
              每一次切块、embedding、TopK、rerank 或 prompt 变更，都应在同一批问题集上回放。
            </p>
            <DataTable headers={["指标", "看什么", "常见方法"]} rows={evalRows} />
          </Section>

          <Section id="practice" number="7" title="生产落地清单">
            <div className="production-flow">
              {[
                "准备黄金问题集",
                "清洗并版本化知识库",
                "设计 Chunk 与元数据",
                "建立混合检索",
                "引入 Rerank",
                "压缩上下文",
                "评估与监控",
                "持续回放优化",
              ].map((item) => (
                <div key={item}><RefreshCcw size={15} /> {item}</div>
              ))}
            </div>
          </Section>

          <section className="references" aria-label="参考与延伸">
            <h2>参考与延伸</h2>
            <p>
              本页基于 RAG 基础视频内容整理，并参考 JavaGuide 的 RAG 优化思路扩展了数据治理、检索增强、重排、
              上下文工程和评估闭环。
            </p>
            <div>
              <a href="https://javaguide.cn/ai/rag/rag-optimization.html" target="_blank" rel="noreferrer">
                JavaGuide：RAG 优化
              </a>
              <a href="http://xhslink.com/o/5QHrrvBB9RP" target="_blank" rel="noreferrer">
                小红书原始笔记
              </a>
            </div>
          </section>
        </article>
      </main>

      <aside className="right-rail">
        <div className="rail-card progress-card">
          <h2>学习进度</h2>
          <div className="ring" style={{ "--progress": `${Math.max(progress, 36) * 3.6}deg` }}>
            <span>{Math.max(progress, 36)}%</span>
          </div>
          <div className="progress-line"><i style={{ width: `${Math.max(progress, 42)}%` }} /></div>
          <p>建议阅读 28 分钟，完成后进入 RAG 项目实践。</p>
        </div>

        <div className="rail-card">
          <h2>学习检查点</h2>
          <ol className="checkpoint-list">
            {checkpoints.map((item, index) => (
              <li className={index < completed ? "done" : ""} key={item}>
                <span>{index + 1}</span>
                {item}
                {index < completed && <Check size={14} />}
              </li>
            ))}
          </ol>
        </div>

        <div className="rail-card toc-card">
          <h2>本页目录</h2>
          {anchors.map(([id, label]) => (
            <button
              key={id}
              className={activeId === id ? "toc-link active" : "toc-link"}
              onClick={() => scrollToId(id)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="rail-card">
          <h2>术语速查</h2>
          <div className="glossary">
            {glossary.map(([term, desc]) => (
              <button
                className={openTerm === term ? "term open" : "term"}
                key={term}
                onClick={() => setOpenTerm(openTerm === term ? "" : term)}
              >
                <span>{term}<ChevronDown size={14} /></span>
                {openTerm === term && <p>{desc}</p>}
              </button>
            ))}
          </div>
        </div>

        <div className="rail-card quiz">
          <h2>随堂小测</h2>
          <p>RAG 中 “A” 的含义最接近哪一项？</p>
          {[
            ["A", "把检索片段加入提示词"],
            ["B", "训练新的大模型"],
            ["C", "只做关键词匹配"],
          ].map(([value, text]) => (
            <label className={quiz === value ? "selected" : ""} key={value}>
              <input
                type="radio"
                name="quiz"
                value={value}
                checked={quiz === value}
                onChange={() => setQuiz(value)}
              />
              {value}. {text}
            </label>
          ))}
          <button>{quiz === "A" ? "回答正确" : "查看解析"}</button>
        </div>
      </aside>
    </div>
  );
}

function TopBar() {
  return (
    <header className="topbar">
      <div className="traffic" aria-hidden="true">
        <span className="red" />
        <span className="yellow" />
        <span className="green" />
      </div>
      <label className="searchbox">
        <Search size={16} />
        <input placeholder="搜索知识点、文档、术语..." />
        <kbd>⌘K</kbd>
      </label>
      <div className="top-actions">
        <button aria-label="浅色模式"><Sun size={16} /></button>
        <button aria-label="深色模式"><Moon size={16} /></button>
        <span>A</span>
      </div>
    </header>
  );
}

function Segmented({ value, onChange }) {
  return (
    <div className="segmented" role="tablist" aria-label="学习视图">
      {["基础视图", "优化视图", "评估视图"].map((item) => (
        <button
          className={value === item ? "active" : ""}
          key={item}
          onClick={() => onChange(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

function Section({ id, number, title, children }) {
  return (
    <section id={id} className="article-section">
      <h2><span>{number}.</span> {title}</h2>
      {children}
    </section>
  );
}

function DataTable({ headers, rows }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>{headers.map((h) => <th key={h}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join("-")}>
              {row.map((cell) => <td key={cell}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Callout({ icon: Icon, title, children }) {
  return (
    <div className="callout">
      <Icon size={18} />
      <div>
        <strong>{title}</strong>
        <p>{children}</p>
      </div>
    </div>
  );
}

export default App;
