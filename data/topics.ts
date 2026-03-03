export interface Topic {
  id: string
  title: string
  description: string
  icon: string
  prevTopic: string | null
  nextTopic: string | null
  prevRelation: string | null
  nextRelation: string
  content: string
  sections: TopicSection[]
  terms: Term[]
  quiz: QuizQuestion[]
}

export interface TopicSection {
  title: string
  content: string
}

export interface Term {
  term: string
  definition: string
}

export interface QuizQuestion {
  id: string
  type: 'single' | 'multiple' | 'truefalse'
  question: string
  options: string[]
  answer: number | number[] | boolean
  explanation: string
}

export const topics: Topic[] = [
  {
    id: 'currency',
    title: '货币基础',
    description: '了解货币的职能、流通与货币政策',
    icon: '💵',
    prevTopic: null,
    nextTopic: 'banking',
    prevRelation: null,
    nextRelation: '货币通过银行系统进入存贷市场',
    content: '货币是现代经济运行的基础，了解货币的本质和职能是金融学习的起点。',
    sections: [
      {
        title: '货币的定义与职能',
        content: `货币是从商品中分离出来固定的充当一般等价物的商品。货币具有五大职能：

**价值尺度**：货币作为衡量商品价值的尺度，如标价。
**流通手段**：货币作为商品交换的媒介。
**贮藏手段**：货币作为价值贮藏手段。
**支付手段**：货币用于清偿债务、支付租金、工资等。
**世界货币**：货币在国际间充当一般等价物。`
      },
      {
        title: '货币流通规律',
        content: `流通中需要的货币量取决于三个因素：
- 商品价格总额
- 货币流通速度
- 货币流通量

公式：流通中需要的货币量 = 商品价格总额 / 货币流通速度`
      },
      {
        title: '货币政策',
        content: `货币政策是中央银行调控货币供应量的手段，主要工具包括：

**法定存款准备金率**：商业银行必须存入中央银行的准备金比例。
**再贴现率**：中央银行向商业银行提供贷款的利率。
**公开市场操作**：中央银行买卖政府债券来调节货币供应量。`
      }
    ],
    terms: [
      { term: 'M0', definition: '流通中的现金' },
      { term: 'M1', definition: 'M0 + 商业银行活期存款' },
      { term: 'M2', definition: 'M1 + 储蓄存款 + 定期存款' },
      { term: '通货膨胀', definition: '货币供应量过多导致物价持续上涨' },
      { term: '货币政策', definition: '中央银行调控货币供应量的政策' }
    ],
    quiz: [
      {
        id: 'currency-1',
        type: 'single',
        question: '货币的核心职能是什么？',
        options: ['价值尺度', '贮藏手段', '支付手段', '世界货币'],
        answer: 0,
        explanation: '价值尺度是货币的核心职能，其他职能都是在此基础上发展的。'
      },
      {
        id: 'currency-2',
        type: 'single',
        question: 'M1包括哪些内容？',
        options: ['流通中现金', '现金+活期存款', '现金+所有存款', '储蓄存款'],
        answer: 1,
        explanation: 'M1 = M0 + 商业银行活期存款，反映现实购买力。'
      },
      {
        id: 'currency-3',
        type: 'truefalse',
        question: '通货膨胀一定是有害的。',
        options: ['正确', '错误'],
        answer: 1,
        explanation: '温和的通货膨胀（2-3%）可以刺激经济增长，只有恶性通胀才有害。'
      },
      {
        id: 'currency-4',
        type: 'single',
        question: '下列哪个不是货币政策工具？',
        options: ['存款准备金率', '再贴现率', '公开市场操作', '利率上限'],
        answer: 3,
        explanation: '利率上限是行政管制手段，不是典型的货币政策工具。'
      }
    ]
  },
  {
    id: 'banking',
    title: '银行存贷',
    description: '学习存款、贷款与利率知识',
    icon: '🏦',
    prevTopic: 'currency',
    nextTopic: 'stock',
    prevRelation: '货币通过银行系统进入存贷市场',
    nextRelation: '银行储蓄是股票投资的基础',
    content: '银行是金融体系的核心，存贷业务是银行最基础的业务。',
    sections: [
      {
        title: '银行存款业务',
        content: `银行存款是指银行接受客户存入的货币资金，并负责保管的业务。

**主要存款类型**：
- 活期存款：可随时存取，流动性高
- 定期存款：约定存期，利率较高
- 储蓄存款：针对个人的存款产品

**存款利息计算**：
利息 = 本金 × 利率 × 存期`
      },
      {
        title: '银行贷款业务',
        content: `银行贷款是银行将资金贷放给借款人，并收取利息的业务。

**主要贷款类型**：
- 信用贷款：无需担保，凭信用
- 抵押贷款：以资产抵押作为担保
- 质押贷款：以动产或权利作为质押

**贷款还款方式**：
- 等额本息：每月还款金额相同
- 等额本金：每月还本金相同，利息递减`
      },
      {
        title: '利率知识',
        content: `利率是资金的价格，反映了借贷成本。

**利率分类**：
- 基准利率：由央行制定
- 市场利率：由市场供求决定
- 名义利率：票面标注的利率
- 实际利率：名义利率 - 通货膨胀率

**利率公式**：
实际利率 = 名义利率 - 通货膨胀率`
      }
    ],
    terms: [
      { term: '基准利率', definition: '央行制定的指导性利率' },
      { term: '存款准备金', definition: '商业银行存入央行的准备金' },
      { term: '不良贷款', definition: '借款人无法偿还的贷款' },
      { term: '存贷比', definition: '贷款余额/存款余额的比例' }
    ],
    quiz: [
      {
        id: 'banking-1',
        type: 'single',
        question: '下列哪种存款利率最高？',
        options: ['活期存款', '定期一年', '定期三年', '定期五年'],
        answer: 3,
        explanation: '存期越长，利率越高，定期五年利率通常最高。'
      },
      {
        id: 'banking-2',
        type: 'single',
        question: '等额本息还款方式的特点是？',
        options: ['每月还本金相同', '每月还款额相同', '利息递增', '总利息最少'],
        answer: 1,
        explanation: '等额本息每月还款金额相同，但前期利息占比高。'
      },
      {
        id: 'banking-3',
        type: 'truefalse',
        question: '实际利率等于名义利率。',
        options: ['正确', '错误'],
        answer: 1,
        explanation: '实际利率 = 名义利率 - 通货膨胀率。'
      }
    ]
  },
  {
    id: 'stock',
    title: '股票入门',
    description: '掌握股票基本概念与交易规则',
    icon: '📈',
    prevTopic: 'banking',
    nextTopic: 'bond',
    prevRelation: '银行储蓄是股票投资的基础',
    nextRelation: '股票和债券都是重要的融资工具',
    content: '股票是股份公司发行的所有权凭证，代表持有者对公司的股权。',
    sections: [
      {
        title: '股票基础知识',
        content: `股票是股份有限公司发行的，证明股东身份和权益的凭证。

**股票特征**：
- 收益性：可获得股息和资本增值
- 风险性：价格可能下跌
- 流动性：可转让变现
- 永久性：无到期日

**股票分类**：
- 普通股：享有投票权和分红权
- 优先股：优先获得股息，无投票权`
      },
      {
        title: '股票交易规则',
        content: `A股交易规则：

**交易时间**：
- 上午：9:30-11:30
- 下午：13:00-15:00

**交易单位**：
- 买入：100股为1手
- 卖出：可以零股

**涨跌幅限制**：
- 普通股票：10%
- ST股票：5%
- 科创板/创业板：20%`
      },
      {
        title: '股票投资风险',
        content: `股票投资面临多种风险：

**系统性风险**：
- 市场风险：整体行情下跌
- 政策风险：宏观调控影响
- 利率风险：利率变动影响

**非系统性风险**：
- 公司经营风险
- 财务风险
- 操作风险

**风险管理**：
- 分散投资
- 设置止损
- 长期投资`
      }
    ],
    terms: [
      { term: '股息', definition: '公司分配给股东的利润' },
      { term: '市盈率', definition: '股价/每股收益' },
      { term: '涨停板', definition: '股票当日涨幅上限' },
      { term: 'A股', definition: '人民币计价的股票' }
    ],
    quiz: [
      {
        id: 'stock-1',
        type: 'single',
        question: 'A股每次买卖的最低单位是？',
        options: ['1股', '10股', '100股', '1000股'],
        answer: 2,
        explanation: 'A股市场以100股为1手，是最低交易单位。'
      },
      {
        id: 'stock-2',
        type: 'single',
        question: '普通股票的特点是？',
        options: ['优先获得股息', '没有投票权', '享有分红和投票权', '无风险'],
        answer: 2,
        explanation: '普通股股东享有公司决策投票权和利润分红权。'
      },
      {
        id: 'stock-3',
        type: 'single',
        question: '股票跌停板是多少？',
        options: ['5%', '10%', '15%', '20%'],
        answer: 1,
        explanation: '普通股票跌幅达到10%时停止交易，形成跌停板。'
      }
    ]
  },
  {
    id: 'bond',
    title: '债券基础',
    description: '了解国债、企业债与收益率',
    icon: '📜',
    prevTopic: 'stock',
    nextTopic: 'fund',
    prevRelation: '股票和债券都是重要的融资工具',
    nextRelation: '债券和基金都是固定收益类产品',
    content: '债券是债务人发行的到期还本付息的债权凭证。',
    sections: [
      {
        title: '债券基础知识',
        content: `债券是固定收益证券，代表债权债务关系。

**债券要素**：
- 面值：债券的票面金额
- 票面利率：债券年利息率
- 到期日：债券偿还本金日期
- 发行价格：债券发售价格

**债券分类**：
- 政府债券：国债、地方政府债
- 金融债券：银行、保险公司发行
- 企业债券：公司发行的债券`
      },
      {
        title: '债券收益率',
        content: `债券收益率衡量债券投资回报：

**票面利率**：债券上标注的利率

**到期收益率**：
- 持有到期的实际收益率
- 考虑利息和资本损益

**收益率计算**：
YTM = (利息 + (面值-价格)/年数) / ((面值+价格)/2)`
      },
      {
        title: '债券风险',
        content: `债券投资风险：

**利率风险**：
- 利率上升，债券价格下跌
- 期限越长，风险越大

**信用风险**：
- 发行人违约风险
- 信用评级越低，风险越高

**流动性风险**：
- 难以快速变现的风险

**通货膨胀风险**：
- 实际收益可能为负`
      }
    ],
    terms: [
      { term: '国债', definition: '国家发行的债券' },
      { term: '企业债', definition: '企业发行的债券' },
      { term: '到期收益率', definition: '持有到期的收益率' },
      { term: '债券评级', definition: '对债券信用的评级' }
    ],
    quiz: [
      {
        id: 'bond-1',
        type: 'single',
        question: '下列哪种债券风险最低？',
        options: ['国债', '企业债', '垃圾债', '可转债'],
        answer: 0,
        explanation: '国债由国家信用担保，风险最低。'
      },
      {
        id: 'bond-2',
        type: 'single',
        question: '债券价格与利率的关系是？',
        options: ['正相关', '负相关', '无关', '不确定'],
        answer: 1,
        explanation: '利率上升时，新债券票面利率更高，原债券价格下跌。'
      }
    ]
  },
  {
    id: 'fund',
    title: '基金投资',
    description: '学习基金类型、净值与定投',
    icon: '💼',
    prevTopic: 'bond',
    nextTopic: 'analysis',
    prevRelation: '债券和基金都是固定收益类产品',
    nextRelation: '基金投资需要分析方法支撑',
    content: '基金是一种集合投资方式，由专业机构管理。',
    sections: [
      {
        title: '基金基础知识',
        content: `基金是将投资者资金集合起来，由专业机构进行投资管理的工具。

**基金特点**：
- 集合投资：汇集小资金做大投资
- 专业管理：由基金经理操作
- 分散风险：投资多只标的
- 流动性好：可随时赎回

**基金当事人**：
- 基金管理人：负责投资运作
- 基金托管人：保管基金资产
- 基金份额持有人：投资者`
      },
      {
        title: '基金分类',
        content: `基金按不同标准分类：

**按投资标的**：
- 股票型基金：80%以上投资股票
- 债券型基金：80%以上投资债券
- 混合型基金：股票债券混合
- 货币型基金：投资货币市场

**按运作方式**：
- 开放式基金：可随时申购赎回
- 封闭式基金：固定期限不可赎回`
      },
      {
        title: '基金定投',
        content: `定期定额投资基金：

**定投优势**：
- 平均成本：分散买入时机风险
- 强制储蓄：培养理财习惯
- 复利效应：长期收益可观

**定投技巧**：
- 选择波动较大的基金
- 坚持长期投资
- 适时止盈赎回

**定投收益计算**：
最终金额 = 每月投入 × ((1+r)^n - 1) / r
其中 r 为月收益率，n 为月数`
      }
    ],
    terms: [
      { term: '基金净值', definition: '每份基金的价值' },
      { term: '定投', definition: '定期定额投资基金' },
      { term: '夏普比率', definition: '风险调整后的收益指标' },
      { term: '基金规模', definition: '基金管理的资金总额' }
    ],
    quiz: [
      {
        id: 'fund-1',
        type: 'single',
        question: '股票型基金股票投资比例是多少？',
        options: ['50%以上', '60%以上', '80%以上', '100%'],
        answer: 2,
        explanation: '股票型基金要求80%以上资产投资于股票。'
      },
      {
        id: 'fund-2',
        type: 'single',
        question: '基金定投的主要优势是？',
        options: ['一定赚钱', '平均成本', '无需选择时机', '高收益'],
        answer: 1,
        explanation: '定投通过分散买入时机，平滑成本，降低风险。'
      }
    ]
  },
  {
    id: 'analysis',
    title: '市场分析',
    description: '学习K线、技术分析与基本面',
    icon: '🔍',
    prevTopic: 'fund',
    nextTopic: 'planning',
    prevRelation: '基金投资需要分析方法支撑',
    nextRelation: '分析能力是理财规划的基础',
    content: '市场分析是投资决策的基础，包括技术分析和基本面分析。',
    sections: [
      {
        title: 'K线基础',
        content: `K线又称蜡烛图，反映价格变动：

**K线组成**：
- 实体：开盘价到收盘价
- 上影线：最高价到实体上端
- 下影线：实体下端到最低价

**K线颜色**：
- 阳线（红/绿）：收盘价 > 开盘价
- 阴线（绿/红）：收盘价 < 开盘价

**常见形态**：
- 锤子线：下跌后反转信号
- 吞没形态：趋势反转信号
- 十字星：多空平衡信号`
      },
      {
        title: '技术分析',
        content: `技术分析基于历史数据预测未来：

**主要指标**：
- 移动平均线(MA)：趋势指标
- 相对强弱指数(RSI)：超买超卖
- MACD：趋势和动量
- 布林带：波动性指标

**技术理论**：
- 道氏理论：趋势分析基础
- 波浪理论：五浪上升三浪下跌
- 斐波那契：回撤和预测`
      },
      {
        title: '基本面分析',
        content: `基本面分析研究公司价值：

**财务指标**：
- 每股收益(EPS)
- 净资产收益率(ROE)
- 市盈率(PE)
- 市净率(PB)

**分析方法**：
- 行业分析：发展空间和竞争格局
- 公司分析：竞争优势和盈利能力
- 财务分析：盈利能力和偿债能力

**价值投资**：
- 寻找被低估的股票
- 长期持有等待价值回归`
      }
    ],
    terms: [
      { term: 'K线', definition: '反映价格变动的蜡烛图' },
      { term: '均线', definition: '移动平均线' },
      { term: '市盈率', definition: '股价与每股收益比率' },
      { term: '基本面', definition: '公司经营和财务状况' }
    ],
    quiz: [
      {
        id: 'analysis-1',
        type: 'single',
        question: '阳线表示什么？',
        options: ['价格下跌', '价格上涨', '价格不变', '波动剧烈'],
        answer: 1,
        explanation: '阳线收盘价高于开盘价，表示价格上涨。'
      },
      {
        id: 'analysis-2',
        type: 'single',
        question: 'RSI指标用于判断什么？',
        options: ['趋势', '超买超卖', '成交量', '波动率'],
        answer: 1,
        explanation: 'RSI衡量股票超买超卖状态，70以上超买，30以下超卖。'
      }
    ]
  },
  {
    id: 'planning',
    title: '理财规划',
    description: '掌握资产配置与风险管理',
    icon: '🎯',
    prevTopic: 'analysis',
    nextTopic: null,
    prevRelation: '分析能力是理财规划的基础',
    nextRelation: '',
    content: '理财规划是根据个人目标进行的系统性财富安排。',
    sections: [
      {
        title: '理财规划基础',
        content: `理财规划是对个人财务的全面安排：

**规划步骤**：
1. 了解现状：收入、支出、资产、负债
2. 设定目标：短期、中期、长期
3. 制定方案：投资、保险、储蓄组合
4. 执行与调整：定期检视和优化

**理财目标**：
- 紧急备用金：3-6个月生活费
- 购房规划：首付款积累
- 子女教育：教育金储备
- 退休规划：养老金准备`
      },
      {
        title: '资产配置',
        content: `资产配置是分散投资的核心：

**经典模型**：
- 100年龄法则：股票比例 = (100 - 年龄)%
- 生命周期：年轻时高风险，年老时低风险

**配置原则**：
- 分散化：不同资产类别
- 再平衡：定期调整比例
- 流动性：保持一定现金

**风险等级**：
- 保守型：债券为主
- 平衡型：股债混合
- 激进型：股票为主`
      },
      {
        title: '风险管理',
        content: `风险管理是理财的重要组成部分：

**风险类型**：
- 疾病风险：医疗费用
- 意外风险：身故或残疾
- 财务风险：收入中断
- 投资风险：资产缩水

**风险管理工具**：
- 保险：转移风险
- 应急金：应对突发
- 分散投资：降低波动
- 止损纪律：控制损失

**保险配置原则**：
- 先保障后理财
- 先大人后小孩
- 保障要全面`
      }
    ],
    terms: [
      { term: '资产配置', definition: '资金在不同资产间的分配' },
      { term: '紧急备用金', definition: '用于应急的现金储备' },
      { term: '复利', definition: '利滚利的收益方式' },
      { term: '风险承受能力', definition: '能承受的损失程度' }
    ],
    quiz: [
      {
        id: 'planning-1',
        type: 'single',
        question: '紧急备用金建议是多少个月生活费？',
        options: ['1-2个月', '3-6个月', '12个月', '24个月'],
        answer: 1,
        explanation: '建议储备3-6个月生活费作为紧急备用金。'
      },
      {
        id: 'planning-2',
        type: 'single',
        question: '根据100法则，30岁应该配置多少股票？',
        options: ['30%', '50%', '70%', '100%'],
        answer: 2,
        explanation: '100-30=70，30岁应配置70%股票。'
      },
      {
        id: 'planning-3',
        type: 'truefalse',
        question: '保险应该先给小孩买。',
        options: ['正确', '错误'],
        answer: 1,
        explanation: '应该先给家庭经济支柱购买保险。'
      }
    ]
  }
]

export function getTopicById(id: string): Topic | undefined {
  return topics.find(topic => topic.id === id)
}

export function getAllTopicIds(): string[] {
  return topics.map(topic => topic.id)
}
