import {
  ArrowRight,
  BookOpen,
  Boxes,
  BrainCircuit,
  CheckCircle2,
  Code2,
  Database,
  FileSearch,
  GitBranch,
  Layers3,
  ListChecks,
  MessageSquareText,
  Network,
  PenLine,
  Search,
  ServerCog,
  Sparkles,
  TerminalSquare,
  Workflow,
  Wrench,
} from "lucide-react";
import React, { useMemo, useState } from "react";

const chapters = [
  {
    id: "map",
    label: "总览",
    title: "先把 AI 应用的知识地图搭起来",
    icon: BrainCircuit,
    intro:
      "学习 AI 应用开发时，最容易混在一起的词是 Skill、Tool、MCP、CLI、RAG、Agent。它们不是同一层东西：有的是可复用经验，有的是外部能力，有的是连接协议，有的是命令入口，有的是知识检索方法，最终都服务于 Agent 完成任务。",
    blocks: [
      {
        heading: "一条主线",
        text:
          "可以先从一个普通聊天机器人开始理解：它只会把当前问题发给大模型，再把回复展示出来。加上历史消息后，它有了短期记忆；加上工具后，它能读文件、写文件、搜索、调用 API；加上 Skill 后，它能复用稳定流程；加上 MCP 或 CLI 后，它能接入更多软件能力；加上 RAG 后，它能查询私有知识；把这些能力组织成循环执行结构后，就变成了 Agent。",
      },
      {
        heading: "学习顺序",
        list: [
          "先懂大模型、Token、上下文、向量和提示词，建立基本语言。",
          "再懂 Skill 与 Tool：一个沉淀流程，一个提供动作能力。",
          "接着懂 MCP 与 CLI：它们都是让 Agent 使用外部软件能力的连接方式。",
          "然后懂 RAG：它解决模型不知道私有数据、实时数据的问题。",
          "最后回到 Agent：看它如何把记忆、工具、Skill、MCP、CLI、RAG 串成完整工作流。",
        ],
      },
    ],
  },
  {
    id: "model",
    label: "模型与Token",
    title: "大模型、Token、上下文与向量",
    icon: Sparkles,
    intro:
      "大模型可以理解和生成文字、代码、图片、音频、视频等内容，但它不是无限知识库，也不是无限记忆体。它每次处理任务，都受训练数据、上下文窗口、输入输出 token 和外部能力限制。",
    blocks: [
      {
        heading: "大模型是什么",
        text:
          "可以把大模型理解成一个知识覆盖面很广的“大脑”。它擅长理解语言、生成内容、总结、改写、推理和写代码。不同模型的侧重点不同：有的偏文本，有的偏图片，有的偏视频，有的偏代码；有的效果强但成本高，有的便宜但能力边界更明显。选择模型时，不要只看名气，要看任务类型、稳定性、价格、速度、上下文长度和可用工具生态。",
      },
      {
        heading: "Token 与上下文限制",
        list: [
          "Token 是模型读写内容时使用的基本单位，输入内容会消耗 input token，模型回复会消耗 output token。",
          "上下文窗口决定一次请求里最多能放多少信息。超过窗口后，模型要么无法处理，要么必须丢弃一部分信息。",
          "把大量材料一股脑塞给模型，不但成本高，还会增加噪声，让模型更难抓住重点。",
          "长任务要学会压缩上下文：保留目标、约束、关键证据、当前进度和下一步，不要保留所有过程废话。",
        ],
      },
      {
        heading: "文字如何变成向量",
        text:
          "向量是一组数字，能够表示文本的语义特征。语义相近的文本，在向量空间里距离更近。比如“退货规则”“退东西怎么处理”“商品不想要了怎么办”字面不同，但意思接近，向量检索就能把它们联系起来。RAG 的语义搜索、知识库问答、相似问题匹配，都依赖这个能力。",
      },
    ],
  },
  {
    id: "prompt",
    label: "提示词",
    title: "提示词不是咒语，而是任务说明书",
    icon: MessageSquareText,
    intro:
      "提示词就是你交给模型的输入。它可以是一句话，也可以是一整套任务说明。提示词写得好不好，会直接影响模型是否理解目标、边界、素材、格式和质量标准。",
    blocks: [
      {
        heading: "好提示词的基本结构",
        list: [
          "角色：告诉模型以什么身份工作，例如产品经理、编辑、工程师、面试官。",
          "任务：明确要完成什么，不要只说“优化一下”“写好一点”。",
          "背景：补充读者、场景、业务目标、已有素材和限制条件。",
          "标准：说明风格、长度、口吻、禁用内容、必须保留的信息。",
          "格式：指定输出为表格、清单、文章、JSON、步骤说明还是代码。",
          "示例：给一个好例子或坏例子，比抽象描述更容易让模型对齐。",
        ],
      },
      {
        heading: "提示词迭代方法",
        text:
          "不要期待一次提示词就得到最终结果。更稳定的方式是先让模型列提纲，再补素材，再逐段生成，最后让模型按质量标准自查。对复杂任务，可以把“生成”和“审校”拆成两个步骤：第一步只产出内容，第二步专门检查事实、结构、重复、语气和遗漏。",
      },
      {
        heading: "去 AI 味的关键",
        list: [
          "减少高频套话和模板句，例如空泛的“众所周知”“总而言之”“值得一提的是”。",
          "加入具体场景、真实细节、个人判断和取舍理由。",
          "让句子长短有变化，避免每段都像标准议论文。",
          "不要只做同义词替换，真正要改的是信息密度、叙述视角和表达节奏。",
        ],
      },
    ],
  },
  {
    id: "skill",
    label: "Skill",
    title: "Skill：把稳定经验封装成可复用能力",
    icon: Boxes,
    intro:
      "Skill 解决的是重复解释、重复操作、重复犯错的问题。它不是简单保存一段提示词，而是把一类任务的触发条件、处理步骤、领域知识、脚本、模板、素材和验收标准打包起来，让 Agent 在合适场景自动使用。",
    blocks: [
      {
        heading: "为什么需要 Skill",
        text:
          "如果每次写文章、做封面、整理资料、生成报告，都要重新告诉 Agent 规则、步骤、格式和注意事项，就会浪费时间，也容易遗漏。Skill 的价值是把这些隐性经验显性化：以后遇到同类任务，Agent 不需要从零理解，只要读取 Skill，就能按既定流程工作。",
      },
      {
        heading: "一个 Skill 通常包含什么",
        list: [
          "入口说明：这个 Skill 叫什么，解决什么问题，什么时候该触发。",
          "执行步骤：任务要分几步做，每一步的输入、输出和注意事项是什么。",
          "知识规则：领域术语、判断标准、禁止事项、常见错误。",
          "可复用资源：模板、示例、脚本、图片、表格、配置文件等。",
          "验收标准：完成后要检查什么，怎样才算合格。",
        ],
      },
      {
        heading: "Skill 与提示词的区别",
        text:
          "提示词更像一次性的任务说明；Skill 更像长期可维护的操作手册。一个简单 Skill 可能只有一份说明文件，看起来像提示词封装；但复杂 Skill 会包含脚本、模板、素材和多步工作流。判断一个 Skill 好不好，不是看它写得多漂亮，而是看它是否稳定减少重复沟通、减少错误、提升任务质量。",
      },
    ],
  },
  {
    id: "tool",
    label: "Tool",
    title: "Tool：让大模型从“会说”变成“会做”",
    icon: Wrench,
    intro:
      "大模型本身像一个很聪明的大脑，但没有手脚。它知道很多知识，却不能直接读取本地文件、访问数据库、调用接口、点击网页或发送消息。Tool 就是给模型连接外部动作能力的方式。",
    blocks: [
      {
        heading: "没有工具时，模型做不了什么",
        list: [
          "不能直接读取你电脑上的某个文件，除非文件内容被传进上下文。",
          "不能真正执行代码、验证结果、写入目标文件。",
          "不能访问私有系统、数据库、浏览器、设计软件或命令行。",
          "不能确认外部世界的实时状态，只能根据已有上下文回答。",
        ],
      },
      {
        heading: "工具信息如何交给模型",
        text:
          "每个工具都要以结构化信息暴露给模型，通常包括工具名称、工具描述和参数。名称让模型识别工具；描述告诉模型什么时候该用；参数告诉模型调用时需要提供哪些输入。模型并不是凭空知道工具怎么用，而是根据这些说明判断是否调用。",
      },
      {
        heading: "工具调用的基本循环",
        list: [
          "思考：模型读取用户任务、历史消息、工具列表和约束，判断下一步要做什么。",
          "行动：如果需要外部能力，模型发起工具调用，由 Agent 真正执行。",
          "观察：Agent 把工具执行结果整理回传给模型。",
          "继续思考：模型基于新结果决定继续调用工具，还是生成最终答案。",
        ],
      },
    ],
  },
  {
    id: "mcp",
    label: "MCP",
    title: "MCP：让 AI 应用按统一协议接入外部软件",
    icon: ServerCog,
    intro:
      "MCP 可以理解为 AI 应用和外部软件之间的一套沟通协议。它解决的问题是：不同软件都有自己的能力，AI 应用怎样用一种相对统一、可描述、可调用的方式发现并使用这些能力。",
    blocks: [
      {
        heading: "MCP 解决什么问题",
        text:
          "如果每个软件都用完全不同的方式暴露功能，Agent 想接入设计工具、文档工具、数据库、项目管理系统，就要为每个工具单独适配。MCP 的思路是让软件把能力以协议规定的形式暴露出来，AI 应用按协议读取工具、资源和上下文，再把调用请求发回去。",
      },
      {
        heading: "可以怎样理解 MCP",
        list: [
          "软件一侧提供能力，像服务方。",
          "AI 应用一侧需要能力，像调用方。",
          "MCP 规定双方如何描述能力、如何传递参数、如何返回结果。",
          "一旦协议稳定，Agent 就能更容易接入更多外部软件。",
        ],
      },
      {
        heading: "MCP 与普通 Tool 的关系",
        text:
          "从模型视角看，MCP 暴露出来的能力最终仍然会表现为可调用工具或资源；从工程视角看，MCP 更关注“外部软件如何标准化接入”。Tool 是模型能调用的具体能力，MCP 是让这些能力被发现、描述和调用的一套连接方式。",
      },
    ],
  },
  {
    id: "cli",
    label: "CLI",
    title: "CLI：把命令行能力交给 Agent 使用",
    icon: TerminalSquare,
    intro:
      "CLI 是命令行交互界面。普通用户通过点击按钮使用软件，命令行用户通过输入命令使用软件。Agent 如果能理解并执行命令，就能更快、更直接地使用许多开发工具和系统能力。",
    blocks: [
      {
        heading: "CLI 的本质",
        text:
          "CLI 不是神秘黑框，它只是另一种软件交互方式。图形界面靠按钮、菜单、输入框；命令行靠命令和参数。例如 Git 的 add、commit、push 都是命令。要使用某个命令，前提是对应程序已经安装，并且命令格式正确。",
      },
      {
        heading: "为什么 Agent 喜欢 CLI",
        list: [
          "命令可以被文本清晰描述，适合模型生成和解释。",
          "命令执行结果通常也是文本，方便回传给模型继续分析。",
          "许多开发工具、部署工具、测试工具、数据处理工具都提供 CLI。",
          "相比模拟点击界面，CLI 更稳定、更快、更容易自动化。",
        ],
      },
      {
        heading: "CLI 与 MCP 的区别",
        text:
          "CLI 更像直接使用一个程序提供的命令入口；MCP 更像一套标准化协议，让外部软件把能力包装后交给 AI 应用。CLI 的优势是简单、直接、生态成熟；MCP 的优势是协议化、可发现、适合多工具统一接入。两者都能帮助 Agent 使用外部软件能力，只是连接方式不同。",
      },
    ],
  },
  {
    id: "rag",
    label: "RAG",
    title: "RAG：先检索证据，再让模型生成",
    icon: Database,
    intro:
      "RAG 是 Retrieval-Augmented Generation，中文常叫检索增强生成。它解决的是大模型不知道私有数据、实时数据、企业内部数据的问题。核心不是让模型“记住更多”，而是在回答前先把相关资料检索出来，再作为上下文交给模型。",
    blocks: [
      {
        heading: "为什么需要 RAG",
        text:
          "大模型主要基于公开数据训练，并且有知识截止时间。企业制度、内部文档、最新公告、实时数据、个人资料库等内容，模型可能根本没见过。直接问它，它可能不知道，也可能编造。RAG 的作用就是在生成前补充外部证据。",
      },
      {
        heading: "为什么不能把资料全塞给模型",
        list: [
          "资料太多会浪费 token，成本高，速度慢。",
          "上下文窗口有限，超过限制就放不下。",
          "无关信息太多会制造噪声，让模型更容易答偏。",
          "所有资料都发送给模型，也不利于权限控制和结果追溯。",
        ],
      },
      {
        heading: "RAG 的完整流程",
        list: [
          "资料处理：清洗文档，按章节、段落或语义边界切成块。",
          "向量化：把每个知识块转成向量，并连同原文、标题、权限标记等元数据存入数据库。",
          "问题向量化：用户提问后，把问题也转成向量。",
          "检索：计算问题向量与知识库向量的相似度，找出最相关的 TopK 片段。",
          "增强：把用户问题、检索证据和回答要求重新组织成提示词。",
          "生成：大模型基于增强后的上下文生成答案，必要时给出引用或不确定说明。",
        ],
      },
      {
        heading: "RAG 与 Agent 的关系",
        text:
          "RAG 可以作为 Agent 的一个工具。当用户问题触发了知识库需求，模型会选择调用检索工具；Agent 执行检索，把结果回传；模型再基于结果回答。这样一来，Agent 不需要把全部资料长期塞在上下文里，只在需要时取最相关的证据。",
      },
    ],
  },
  {
    id: "agent",
    label: "Agent",
    title: "Agent：把记忆、工具、Skill 和知识库组织成执行系统",
    icon: Network,
    intro:
      "Agent 不是单纯更会聊天的模型，而是围绕大模型搭建的一套任务执行系统。它会把用户任务、系统规则、历史消息、工具信息、Skill、模型配置和外部知识组织起来，让模型多轮思考和行动。",
    blocks: [
      {
        heading: "Agent 每次会给模型什么",
        list: [
          "系统提示词：稳定规则、角色、边界、安全要求和工作方式。",
          "历史消息：用户与模型此前的对话内容。",
          "工具信息：可调用工具的名称、描述、参数结构。",
          "Skill 信息：当前任务可能需要使用的流程、模板和领域规则。",
          "模型信息：模型能力、上下文限制、调用配置等。",
          "任务输入：用户当下真正要解决的问题。",
        ],
      },
      {
        heading: "Agent 启动时做什么",
        text:
          "Agent 启动时，会加载系统规则、可用工具、Skill、模型配置、工作目录、会话历史和必要上下文。它不是等用户发来一句话才临时知道自己能做什么，而是在启动阶段就把可用能力准备好。用户任务进入后，Agent 才能把这些能力按格式交给模型选择。",
      },
      {
        heading: "从聊天机器人到 Agent",
        list: [
          "普通聊天机器人：只处理当前问答，没有外部动作能力。",
          "有记忆的聊天机器人：会带上历史消息，能保持上下文连续。",
          "带工具的 Agent：模型能选择工具，Agent 执行工具，再把结果给模型。",
          "带 Skill 的 Agent：能够复用稳定流程，不用每次重讲规则。",
          "带 RAG 的 Agent：能查询私有知识库，减少胡编和过度塞上下文。",
          "带 MCP/CLI 的 Agent：能接入更多软件和本地系统能力。",
        ],
      },
    ],
  },
  {
    id: "multi",
    label: "多智能体",
    title: "SubAgent 与 MultiAgent：拆任务与协作",
    icon: GitBranch,
    intro:
      "当任务变复杂后，一个 Agent 可能需要把部分工作拆出去。SubAgent 和 MultiAgent 都和多角色协作有关，但侧重点不同：前者强调子任务委派，后者强调多个智能体之间的协同。",
    blocks: [
      {
        heading: "SubAgent",
        text:
          "SubAgent 更像把一个任务拆成子任务，交给专门角色独立处理。主 Agent 给出目标和上下文，SubAgent 负责完成某个局部工作，最后把结果交回主 Agent。它适合代码审查、资料检索、测试验证、文案润色等边界较清晰的子任务。",
      },
      {
        heading: "MultiAgent",
        text:
          "MultiAgent 更强调多个 Agent 之间的信息交换、分工讨论和协同决策。它适合任务本身需要不同视角：例如产品、工程、测试、运营共同评估一个方案。缺点是沟通成本更高，如果任务很简单，强行多智能体反而会变慢。",
      },
      {
        heading: "什么时候用",
        list: [
          "任务可拆分、每部分目标清楚时，适合 SubAgent。",
          "任务需要多视角判断、互相审校时，适合 MultiAgent。",
          "任务简单、上下文少、一步就能完成时，不要过度设计。",
        ],
      },
    ],
  },
  {
    id: "vibe",
    label: "Vibe Coding",
    title: "Vibe Coding：用自然语言驱动开发，但不能放弃工程常识",
    icon: Code2,
    intro:
      "Vibe Coding 的核心是把开发过程变成和 AI 的连续协作：你用自然语言描述目标、约束和反馈，AI 生成代码，你运行和验收，再把问题回填给 AI 继续修改。它降低了门槛，但并不意味着完全不用懂工程。",
    blocks: [
      {
        heading: "先学会和 AI 聊产品",
        list: [
          "要做什么：网页、App、小程序、后端服务还是自动化脚本。",
          "给谁用：用户角色、使用场景、核心流程。",
          "长什么样：页面结构、交互状态、数据展示方式。",
          "怎么验收：运行命令、测试方式、浏览器效果、错误边界。",
        ],
      },
      {
        heading: "必须补齐的工程常识",
        list: [
          "网页、App、小程序、后端是不同产品形态，不要混成一个词。",
          "编程语言决定代码写法，框架决定项目结构，运行环境决定怎么启动。",
          "HTTP/HTTPS、域名、API 是网络应用互相通信的基础。",
          "Git 和 GitHub 用来保存版本、回退错误、协作和发布代码。",
          "API 是别人开放的功能入口，SDK 是把一组 API 和使用方法打包成开发工具。",
        ],
      },
      {
        heading: "正确工作流",
        text:
          "先说清楚目标，再让 AI 拆任务；先做最小可运行版本，再逐步加细节；每次改完都运行检查；报错时把完整错误、期望行为和当前现象一起给 AI。不要只说“还是不行”，要让 AI 拿到足够的诊断信息。",
      },
    ],
  },
];

const comparisons = [
  ["Prompt", "一次性任务说明", "告诉模型这次怎么做", "临时写作、临时问答、单次生成"],
  ["Skill", "可复用流程包", "沉淀稳定经验和工作流", "反复出现的任务、团队规范、领域流程"],
  ["Tool", "外部动作能力", "让模型能读写、搜索、调用接口", "文件操作、浏览器、数据库、API"],
  ["MCP", "连接协议", "让外部软件按统一方式暴露能力", "多软件接入、工具生态、标准化集成"],
  ["CLI", "命令行入口", "用文本命令操作程序", "开发工具、测试、部署、本地自动化"],
  ["RAG", "知识检索方法", "给模型补充私有/实时证据", "企业知识库、文档问答、客服、投研"],
  ["Agent", "任务执行系统", "组织模型、记忆、工具和流程完成任务", "多步任务、自动化工作流、复杂协作"],
];

const glossary = [
  ["Token", "模型处理文本的基本单位，影响上下文长度、速度和费用。"],
  ["Context", "一次请求里交给模型的所有信息，包括任务、历史、工具说明和证据。"],
  ["Embedding", "把文本转换成向量的过程，用于语义相似度计算。"],
  ["TopK", "检索时按相似度取出的前 K 条候选知识片段。"],
  ["Tool Schema", "工具名称、描述、参数结构等可供模型理解的说明。"],
  ["Observation", "工具执行后的结果，被整理回传给模型用于下一步思考。"],
  ["SDK", "开发工具包，通常封装 API、示例、类型和调用方法。"],
];

const coverage = [
  "AI 基础：大模型选择、Token、上下文限制、向量、提示词、去 AI 味。",
  "Skill：为什么需要 Skill、Skill 文件结构、触发描述、脚本/素材目录、工作流封装。",
  "Tool：工具定义、工具描述、参数、模型选择工具、思考-执行-观察循环。",
  "MCP：协议作用、外部软件能力接入、工具暴露、调用与返回。",
  "CLI：命令行交互、命令与程序、把命令能力暴露给 Agent、CLI 与 MCP 区别。",
  "RAG：私有数据盲区、切块、向量化、向量库、检索、增强、生成。",
  "Agent：启动流程、传给模型的数据区域、记忆、工具、Skill、RAG 的整体关系。",
  "SubAgent/MultiAgent：任务拆分、角色协作、适用边界。",
  "Vibe Coding：产品沟通、网页/App/后端、编程语言、HTTP/API/域名、Git/GitHub、SDK。",
];

function App() {
  const [query, setQuery] = useState("");

  const filteredChapters = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    if (!keyword) return chapters;
    return chapters.filter((chapter) => {
      const text = [chapter.label, chapter.title, chapter.intro, ...chapter.blocks.flatMap((block) => [block.heading, block.text, ...(block.list || [])])]
        .join(" ")
        .toLowerCase();
      return text.includes(keyword);
    });
  }, [query]);

  return (
    <div className="doc-shell">
      <aside className="left-nav">
        <a className="brand" href="#top">
          <BrainCircuit size={24} />
          <span>AI基础知识大全</span>
        </a>
        <label className="search-box">
          <Search size={16} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索 Skill / RAG / MCP..." />
        </label>
        <nav aria-label="章节目录">
          {chapters.map((chapter) => (
            <a href={`#${chapter.id}`} key={chapter.id}>
              {chapter.label}
            </a>
          ))}
        </nav>
      </aside>

      <main id="top" className="manual">
        <section className="manual-cover">
          <p className="pretitle">AI Application Manual</p>
          <h1>AI 基础知识完整文字版</h1>
          <p>
            这是一份面向初学者和实践者的系统讲义，按概念层级重新组织 AI 应用开发知识：
            从模型与提示词开始，到 Skill、Tool、MCP、CLI、RAG，再到完整 Agent 工作流。
          </p>
          <div className="cover-flow" aria-label="学习主线">
            {["模型", "提示词", "Skill", "Tool", "MCP / CLI", "RAG", "Agent"].map((item, index) => (
              <React.Fragment key={item}>
                <span>{item}</span>
                {index < 6 && <ArrowRight size={16} />}
              </React.Fragment>
            ))}
          </div>
        </section>

        <section className="comparison-card" aria-label="核心概念对照表">
          <div className="section-title">
            <ListChecks size={20} />
            <h2>核心概念先对齐</h2>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>概念</th>
                  <th>本质</th>
                  <th>解决的问题</th>
                  <th>典型场景</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell) => (
                      <td key={cell}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="chapter-stack">
          {filteredChapters.map((chapter, index) => {
            const Icon = chapter.icon;
            return (
              <article className="chapter" id={chapter.id} key={chapter.id}>
                <div className="chapter-marker">
                  <Icon size={22} />
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h2>{chapter.title}</h2>
                <p className="chapter-intro">{chapter.intro}</p>
                <div className="block-list">
                  {chapter.blocks.map((block) => (
                    <section className="text-block" key={block.heading}>
                      <h3>{block.heading}</h3>
                      {block.text && <p>{block.text}</p>}
                      {block.list && (
                        <ul>
                          {block.list.map((item) => (
                            <li key={item}>
                              <CheckCircle2 size={16} />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </section>
                  ))}
                </div>
              </article>
            );
          })}
        </div>

        <section className="coverage" id="coverage">
          <div className="section-title">
            <BookOpen size={20} />
            <h2>内容覆盖清单</h2>
          </div>
          <p>本页已把相关主题按文字教材方式合并去重，避免按零散条目重复阅读。</p>
          <div className="coverage-grid">
            {coverage.map((item) => (
              <div key={item}>
                <Layers3 size={18} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      <aside className="right-rail">
        <section>
          <h2>阅读顺序</h2>
          <ol>
            <li>模型、Token、向量</li>
            <li>提示词与写作质量</li>
            <li>Skill 与 Tool</li>
            <li>MCP、CLI、RAG</li>
            <li>Agent 与多智能体</li>
          </ol>
        </section>
        <section>
          <h2>术语速查</h2>
          <div className="glossary-list">
            {glossary.map(([term, desc]) => (
              <details key={term}>
                <summary>{term}</summary>
                <p>{desc}</p>
              </details>
            ))}
          </div>
        </section>
        <section className="note-card">
          <Workflow size={20} />
          <h2>一句话记忆</h2>
          <p>Skill 复用经验，Tool 提供动作，MCP 统一接入，CLI 执行命令，RAG 补充知识，Agent 负责把它们组织起来完成任务。</p>
        </section>
      </aside>
    </div>
  );
}

export default App;
