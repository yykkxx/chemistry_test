
// chemistry_challenge_contest/frontend/js/questions.js
const questionGenerators = {
  easy: [
    // 元素周期表相关
    () => {
      const elements = [
        { symbol: 'H', name: '氢', group: '非金属' },
        { symbol: 'O', name: '氧', group: '非金属' },
        { symbol: 'C', name: '碳', group: '非金属' },
        { symbol: 'Na', name: '钠', group: '碱金属' },
        { symbol: 'Cl', name: '氯', group: '卤素' }
      ];
      const element = elements[Math.floor(Math.random() * elements.length)];
      const wrongElements = elements.filter(e => e.symbol !== element.symbol);
      
      return {
        question: `${element.name}的化学符号是什么？`,
        options: [
          { text: element.symbol, correct: true },
          { text: wrongElements[Math.floor(Math.random() * wrongElements.length)].symbol, correct: false },
          { text: wrongElements[Math.floor(Math.random() * wrongElements.length)].symbol, correct: false },
          { text: wrongElements[Math.floor(Math.random() * wrongElements.length)].symbol, correct: false }
        ],
        explanation: `${element.name}是${element.group}元素，其化学符号为${element.symbol}。`,
        uniqueId: `element-symbol-${element.symbol}`
      };
    }
  ],
  medium: [
    // 实验室操作
    () => ({
      question: "实验室制取二氧化碳的原料组合正确的是：",
      options: [
        { text: "碳酸钠粉末和稀硫酸", correct: false },
        { text: "石灰石和稀盐酸", correct: true },
        { text: "大理石和浓盐酸", correct: false },
        { text: "小苏打和稀硝酸", correct: false }
      ],
      explanation: "石灰石（CaCO₃）与稀盐酸反应速率适中，浓盐酸易挥发导致气体不纯，硫酸会生成CaSO₄沉淀阻碍反应。",
      uniqueId: "co2-production"
    }),
    // 物质分类
    () => ({
      question: "下列物质属于纯净物的是：",
      options: [
        { text: "生铁", correct: false },
        { text: "干冰", correct: true },
        { text: "盐酸", correct: false },
        { text: "洁净的空气", correct: false }
      ],
      explanation: "干冰是固态CO₂，为纯净物；其他选项均为混合物。",
      uniqueId: "pure-substance"
    }),
    // 酸碱中和
    () => ({
      question: "某溶液的pH=3，若使其变为中性，应加入：",
      options: [
        { text: "pH=5的溶液", correct: false },
        { text: "氢氧化钠溶液", correct: true },
        { text: "大量水", correct: false },
        { text: "稀盐酸", correct: false }
      ],
      explanation: "酸性溶液（pH<7）需加碱性物质（如NaOH）中和至pH=7。",
      uniqueId: "ph-neutralization"
    }),
    // 化学反应
    () => ({
      question: "铁在氧气中燃烧的产物是：",
      options: [
        { text: "FeO", correct: false },
        { text: "Fe₂O₃", correct: false },
        { text: "Fe₃O₄", correct: true },
        { text: "Fe(OH)₃", correct: false }
      ],
      explanation: "铁在纯氧中剧烈燃烧生成黑色固体Fe₃O₄。",
      uniqueId: "iron-combustion"
    }),
    // 金属活动性
    () => ({
      question: "下列金属活动性最弱的是：",
      options: [
        { text: "铜", correct: false },
        { text: "银", correct: true },
        { text: "铁", correct: false },
        { text: "锌", correct: false }
      ],
      explanation: "金属活动性顺序：Zn>Fe>Cu>Ag，银最不活泼。",
      uniqueId: "metal-activity"
    }),
    // 电解实验
    () => ({
      question: "电解水实验的结论是：",
      options: [
        { text: "水由氢气和氧气组成", correct: false },
        { text: "水由氢、氧元素组成", correct: true },
        { text: "水分子间有间隙", correct: false },
        { text: "水是混合物", correct: false }
      ],
      explanation: "电解水生成H₂和O₂，证明水含H、O两种元素。",
      uniqueId: "water-electrolysis"
    }),
    // 气体收集
    () => ({
      question: "下列气体能用向下排空气法收集的是：",
      options: [
        { text: "O₂", correct: false },
        { text: "CO₂", correct: false },
        { text: "H₂", correct: true },
        { text: "NH₃", correct: false }
      ],
      explanation: "H₂密度小于空气且不与空气反应，可用向下排空气法。",
      uniqueId: "gas-collection"
    }),
    // 溶液浓度
    () => ({
      question: "将浓硫酸敞口放置，其溶质质量分数会：",
      options: [
        { text: "增大", correct: false },
        { text: "减小", correct: true },
        { text: "不变", correct: false },
        { text: "先增大后减小", correct: false }
      ],
      explanation: "浓硫酸具有吸水性，会吸收空气中水分导致浓度降低。",
      uniqueId: "sulfuric-acid-concentration"
    }),
    // 元素分析
    () => ({
      question: "某物质燃烧生成CO₂和H₂O，该物质一定含有的元素是：",
      options: [
        { text: "C、H", correct: true },
        { text: "C、O", correct: false },
        { text: "H、O", correct: false },
        { text: "C、H、O", correct: false }
      ],
      explanation: "根据质量守恒，生成物含C、H、O，反应物氧气含O，故该物质必含C、H，可能含O。",
      uniqueId: "elemental-analysis"
    }),
    // 反应类型
    () => ({
      question: "下列反应属于置换反应的是：",
      options: [
        { text: "2H₂O₂ → 2H₂O + O₂↑", correct: false },
        { text: "Fe + CuSO₄ → FeSO₄ + Cu", correct: true },
        { text: "CaCO₃ → CaO + CO₂↑", correct: false },
        { text: "HCl + NaOH → NaCl + H₂O", correct: false }
      ],
      explanation: "置换反应形式为单质+化合物→新单质+新化合物，B符合。",
      uniqueId: "replacement-reaction"
    })
  ],
  hard: [
    // 电子排布
    () => ({
      question: "基态铬（Cr）原子的电子排布式正确的是：",
      options: [
        { text: "[Ar]3d⁴4s²", correct: false },
        { text: "[Ar]3d⁵4s¹", correct: true },
        { text: "[Ar]3d⁶", correct: false },
        { text: "[Ar]3d⁵4s⁰", correct: false }
      ],
      explanation: "铬原子为半充满稳定结构，电子优先填入3d轨道，正确排布为[Ar]3d⁵4s¹。",
      uniqueId: "electron-configuration"
    }),
    // 分子结构
    () => ({
      question: "下列分子中，所有原子共平面的是：",
      options: [
        { text: "CH₄", correct: false },
        { text: "C₂H₄", correct: true },
        { text: "C₃H₈", correct: false },
        { text: "CCl₄", correct: false }
      ],
      explanation: "乙烯（C₂H₄）为平面结构，所有原子共平面。",
      uniqueId: "molecular-geometry"
    }),
    // 化学平衡
    () => ({
      question: "某温度下反应2NO₂(g) ⇌ N₂O₄(g) ΔH<0，达到平衡后，升高温度，平衡常数K的变化是：",
      options: [
        { text: "增大", correct: false },
        { text: "减小", correct: true },
        { text: "不变", correct: false },
        { text: "先增大后减小", correct: false }
      ],
      explanation: "升温使平衡向吸热方向（逆反应）移动，K减小。",
      uniqueId: "equilibrium-constant"
    }),
    // 滴定分析
    () => ({
      question: "用0.1mol/L NaOH溶液滴定20mL 0.1mol/L HCl，达到中和点时溶液的pH为：",
      options: [
        { text: "1", correct: false },
        { text: "7", correct: true },
        { text: "13", correct: false },
        { text: "9", correct: false }
      ],
      explanation: "强酸强碱完全中和生成NaCl，溶液呈中性，pH=7。",
      uniqueId: "acid-base-titration"
    }),
    // 分子间作用力
    () => ({
      question: "下列物质中，存在分子间氢键的是：",
      options: [
        { text: "CH₃CH₂OH", correct: true },
        { text: "CH₄", correct: false },
        { text: "CCl₄", correct: false },
        { text: "CO₂", correct: false }
      ],
      explanation: "乙醇（CH₃CH₂OH）含羟基，可形成分子间氢键。",
      uniqueId: "hydrogen-bonding"
    }),
    // 电化学
    () => ({
      question: "电解饱和食盐水时，阳极产物是：",
      options: [
        { text: "H₂", correct: false },
        { text: "Cl₂", correct: true },
        { text: "O₂", correct: false },
        { text: "NaOH", correct: false }
      ],
      explanation: "阳极发生氧化反应，Cl⁻失去电子生成Cl₂。",
      uniqueId: "electrolysis"
    }),
    // 有机化学
    () => ({
      question: "某烷烃的同分异构体数目为3种，其结构是：",
      options: [
        { text: "丁烷", correct: false },
        { text: "2-甲基丙烷", correct: false },
        { text: "戊烷", correct: true },
        { text: "2-甲基戊烷", correct: false }
      ],
      explanation: "戊烷（C₅H₁₂）有3种异构体：正戊烷、异戊烷、新戊烷。",
      uniqueId: "isomerism"
    }),
    // 反应速率
    () => ({
      question: "已知反应：2SO₂(g)+O₂(g)⇌2SO₃(g) ΔH=-196kJ/mol。为提高SO₂转化率，应采取的措施是：",
      options: [
        { text: "升高温度", correct: false },
        { text: "增大压强", correct: true },
        { text: "使用催化剂", correct: false },
        { text: "充入He气体", correct: false }
      ],
      explanation: "增大压强使平衡向气体体积减小的正反应方向移动。",
      uniqueId: "reaction-rate"
    }),
    // 晶体结构
    () => ({
      question: "下列晶体中，熔点最高的是：",
      options: [
        { text: "金刚石", correct: true },
        { text: "NaCl", correct: false },
        { text: "干冰", correct: false },
        { text: "金属铜", correct: false }
      ],
      explanation: "金刚石为原子晶体，熔点高于离子晶体（NaCl）、金属晶体（Cu）和分子晶体（干冰）。",
      uniqueId: "crystal-structure"
    }),
    // 元素周期律
    () => ({
      question: "某元素最高正价与最低负价代数和为4，其位于第几周期？",
      options: [
        { text: "二", correct: false },
        { text: "三", correct: true },
        { text: "四", correct: false },
        { text: "五", correct: false }
      ],
      explanation: "最高正价+最低负价=4，可能为硫（+6-2=4），硫位于第三周期。",
      uniqueId: "periodic-trends"
    })
  ],
  expert: [
    // 配合物化学
    () => ({
      question: "某配合物的实验式为CoCl₃·5NH₃，1mol该物质与AgNO₃溶液反应生成2mol AgCl沉淀，其正确结构式是：",
      options: [
        { text: "[Co(NH₃)₅Cl]Cl₂", correct: true },
        { text: "[Co(NH₃)₄Cl₂]Cl", correct: false },
        { text: "[Co(NH₃)₃Cl₃]·2NH₃", correct: false },
        { text: "[Co(NH₃)₅]Cl₃", correct: false }
      ],
      explanation: "生成2mol Cl⁻，说明外界有2个Cl⁻，内界1个Cl⁻，配位数为6（5NH₃+1Cl⁻）。",
      uniqueId: "coordination-compound"
    }),
    // 反应动力学
    () => ({
      question: "某反应速率方程为 v = k[NO]²[O₂]，当反应容器体积缩小为原来的1/2时，速率变为原来的多少倍？",
      options: [
        { text: "2", correct: false },
        { text: "4", correct: false },
        { text: "8", correct: true },
        { text: "16", correct: false }
      ],
      explanation: "浓度变为2倍，v' = k(2[NO])²(2[O₂]) = 8k[NO]²[O₂]。",
      uniqueId: "reaction-kinetics"
    }),
    // 电化学
    () => ({
      question: "已知 E°(Fe³⁺/Fe²⁺)=0.77V，E°(I₂/I⁻)=0.54V。将Fe³⁺溶液与KI溶液混合，反应方向是：",
      options: [
        { text: "自发进行", correct: true },
        { text: "非自发进行", correct: false },
        { text: "达平衡", correct: false },
        { text: "无法判断", correct: false }
      ],
      explanation: "E°cell = 0.77 - 0.54 = 0.23 V > 0，反应自发（Fe³⁺氧化I⁻）。",
      uniqueId: "electrochemistry"
    }),
    // 晶体场理论
    () => ({
      question: "某晶体场中，八面体配合物 [CoF₆]³⁻ 的CFSE（晶体场稳定化能）为（Δ₀为分裂能）：",
      options: [
        { text: "0.4Δ₀", correct: true },
        { text: "0.6Δ₀", correct: false },
        { text: "1.2Δ₀", correct: false },
        { text: "1.6Δ₀", correct: false }
      ],
      explanation: "Co³⁺为d⁶弱场（高自旋），CFSE= (-0.4Δ₀ × 4) + (0.6Δ₀ × 2) = 0.4Δ₀。",
      uniqueId: "crystal-field-theory"
    }),
    // 有机分析
    () => ({
      question: "某有机物分子式为C₅H₁₀O，能与Fehling试剂反应生成砖红色沉淀，其可能的结构是：",
      options: [
        { text: "戊醛", correct: true },
        { text: "2-戊酮", correct: false },
        { text: "环戊醇", correct: false },
        { text: "乙酸丙酯", correct: false }
      ],
      explanation: "只有醛（含-CHO）能与Fehling试剂反应生成Cu₂O沉淀。",
      uniqueId: "organic-analysis"
    }),
    // 酸碱滴定
    () => ({
      question: "用0.100mol/L NaOH滴定0.100mol/L某弱酸HA（Ka = 1.0 × 10⁻⁵），中和点的pH约为：",
      options: [
        { text: "7.0", correct: false },
        { text: "8.7", correct: true },
        { text: "9.0", correct: false },
        { text: "10.5", correct: false }
      ],
      explanation: "中和点生成NaA，水解计算：pH = 7 + ½(pKa + log c) ≈ 8.7。",
      uniqueId: "weak-acid-titration"
    }),
    // 核化学
    () => ({
      question: "某同位素样品经过20天后衰变剩余1/8，其半衰期为：",
      options: [
        { text: "5天", correct: true },
        { text: "10天", correct: false },
        { text: "7.5天", correct: false },
        { text: "6.67天", correct: false }
      ],
      explanation: "剩余1/8 = (1/2)³，3个半衰期对应20天 → T½ = 20/4 = 5天。",
      uniqueId: "nuclear-chemistry"
    }),
    // 化学平衡计算
    () => ({
      question: "某气相反应 2A(g) ⇌ B(g) 的 Kp = 10 atm⁻¹。当总压为2atm时，A的转化率约为：",
      options: [
        { text: "50%", correct: false },
        { text: "66.7%", correct: true },
        { text: "75%", correct: false },
        { text: "80%", correct: false }
      ],
      explanation: "设初始A为1mol，转化率α：Kp = (α/(2-α)) / [2(1-α)/(2-α)]² = 10，解得α≈66.7%。",
      uniqueId: "equilibrium-calculation"
    }),
    // 芳香性
    () => ({
      question: "下列化合物中，具有芳香性的是：",
      options: [
        { text: "环戊二烯负离子", correct: false },
        { text: "环丙烯正离子", correct: true },
        { text: "环辛四烯", correct: false },
        { text: "苯", correct: false }
      ],
      explanation: "环丙烯正离子（3个π电子，符合4n+2，n=0）具有芳香性。",
      uniqueId: "aromaticity"
    }),
    // 配合物磁性
    () => ({
      question: "某配合物磁矩为 μ = 3.87 B.M.，其中心离子的d电子数为：",
      options: [
        { text: "d³", correct: false },
        { text: "d⁴", correct: true },
        { text: "d⁵", correct: false },
        { text: "d⁶", correct: false }
      ],
      explanation: "μ = √n(n+2) ≈ 3.87 → n=3，但高自旋d⁴（3未成对电子）也可能符合条件。",
      uniqueId: "magnetic-properties"
    })
  ],
  unlimited: [
    // 无时间限制模式使用中等难度题目
    () => {
      const mediumQuestion = questionGenerators.medium[Math.floor(Math.random() * questionGenerators.medium.length)]();
      return {
        ...mediumQuestion,
        uniqueId: `unlimited-${mediumQuestion.uniqueId}`
      };
    }
  ]
};

const usedQuestions = {
  easy: new Set(),
  medium: new Set(),
  hard: new Set(),
  expert: new Set(),
  unlimited: new Set()
};

function generateChemistryQuestion(difficulty) {
  const generators = questionGenerators[difficulty];
  let question;
  let attempts = 0;
  const maxAttempts = 20;
  
  do {
    const randomGenerator = generators[Math.floor(Math.random() * generators.length)];
    question = randomGenerator();
    attempts++;
    
    if (attempts >= maxAttempts) {
      usedQuestions[difficulty].clear();
      break;
    }
  } while (usedQuestions[difficulty].has(question.uniqueId));
  
  usedQuestions[difficulty].add(question.uniqueId);
  return question;
}

function resetUsedQuestions(difficulty) {
  if (difficulty) {
    usedQuestions[difficulty].clear();
  } else {
    Object.keys(usedQuestions).forEach(diff => {
      usedQuestions[diff].clear();
    });
  }
}
