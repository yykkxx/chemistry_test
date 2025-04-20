
// chemistry_challenge_contest/frontend/js/questions.js
const questionConfig = {
  elements: [
    { symbol: 'H', name: '氢', group: '非金属' },
    { symbol: 'O', name: '氧', group: '非金属' },
    { symbol: 'C', name: '碳', group: '非金属' },
    { symbol: 'Na', name: '钠', group: '碱金属' },
    { symbol: 'Cl', name: '氯', group: '卤素' }
  ],
  maxAttempts: 20,
  defaultQuestions: {
    easy: {
      question: "水的化学式是什么？",
      options: [
        { text: "H2O", correct: true },
        { text: "CO2", correct: false },
        { text: "NaCl", correct: false },
        { text: "O2", correct: false }
      ],
      explanation: "水由两个氢原子和一个氧原子组成，化学式为H₂O。",
      uniqueId: "default-water-question"
    },
    medium: {
      question: "下列物质属于纯净物的是：",
      options: [
        { text: "生铁", correct: false },
        { text: "干冰", correct: true },
        { text: "盐酸", correct: false },
        { text: "洁净的空气", correct: false }
      ],
      explanation: "干冰是固态CO₂，为纯净物；其他选项均为混合物。",
      uniqueId: "pure-substance-default"
    },
    hard: {
      question: "下列分子中，所有原子共平面的是：",
      options: [
        { text: "CH₄", correct: false },
        { text: "C₂H₄", correct: true },
        { text: "C₃H₈", correct: false },
        { text: "CCl₄", correct: false }
      ],
      explanation: "乙烯（C₂H₄）为平面结构，所有原子共平面。",
      uniqueId: "molecular-geometry-default"
    },
    expert: {
      question: "某反应速率方程为 v = k[NO]²[O₂]，当反应容器体积缩小为原来的1/2时，速率变为原来的多少倍？",
      options: [
        { text: "2", correct: false },
        { text: "4", correct: false },
        { text: "8", correct: true },
        { text: "16", correct: false }
      ],
      explanation: "浓度变为2倍，v' = k(2[NO])²(2[O₂]) = 8k[NO]²[O₂]。",
      uniqueId: "reaction-kinetics-default"
    }
  }
};

const questionGenerators = {
  easy: [
    () => createElementSymbolQuestion(questionConfig.elements),
    () => ({
      question: "下列属于物理变化的是：",
      options: [
        { text: "铁生锈", correct: false },
        { text: "酒精挥发", correct: true },
        { text: "食物", correct: false },
        { text: "木材燃烧", correct: false }
      ],
      explanation: "酒精挥发只是状态改变，没有新物质生成，属于物理变化。",
      uniqueId: "physical-change"
    })
  ],
  medium: [
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
    () => createElementGroupQuestion(questionConfig.elements),
    () => ({
      question: "标准状况下，22.4L氧气的质量是多少克？（O₂摩尔质量32g/mol）",
      options: [
        { text: "32g", correct: true },
        { text: "16g", correct: false },
        { text: "64g", correct: false },
        { text: "22.4g", correct: false }
      ],
      explanation: "标准状况下1mol气体体积为22.4L，故质量为1mol×32g/mol=32g",
      uniqueId: "gas-mass-calculation"
    }),
    () => ({
      question: "下列物质属于离子晶体的是：",
      options: [
        { text: "金刚石", correct: false },
        { text: "干冰", correct: false },
        { text: "氯化钠", correct: true },
        { text: "铜", correct: false }
      ],
      explanation: "NaCl由Na⁺和Cl⁻通过离子键结合形成离子晶体",
      uniqueId: "crystal-type-identification"
    }),
    () => ({
      question: "实验室收集氢气的最佳方法是：",
      options: [
        { text: "向上排空气法", correct: false },
        { text: "排水法", correct: true },
        { text: "向下排空气法", correct: true },
        { text: "排饱和食盐水法", correct: false }
      ],
      explanation: "氢气密度小且难溶于水，可用排水法或向下排空气法收集",
      uniqueId: "hydrogen-collection-method",
      multipleCorrect: true
    }),
    () => ({
      question: "下列变化属于化学变化的是：",
      options: [
        { text: "石油分馏", correct: false },
        { text: "煤的干馏", correct: true },
        { text: "碘升华", correct: false },
        { text: "金属导电", correct: false }
      ],
      explanation: "煤干馏生成焦炭等新物质，为化学变化；其他均为物理变化",
      uniqueId: "chemical-change-identification"
    }),
    () => ({
      question: "0.1mol/L NaOH溶液的pH值为：",
      options: [
        { text: "1", correct: false },
        { text: "7", correct: false },
        { text: "13", correct: true },
        { text: "14", correct: false }
      ],
      explanation: "强碱溶液pH=-log(0.1)=13",
      uniqueId: "strong-base-ph-calculation"
    }),
    () => ({
      question: "下列试剂需要保存在棕色瓶中的是：",
      options: [
        { text: "浓硫酸", correct: false },
        { text: "硝酸银溶液", correct: true },
        { text: "氢氧化钠溶液", correct: false },
        { text: "碳酸钠溶液", correct: false }
      ],
      explanation: "AgNO₃见光易分解，需避光保存",
      uniqueId: "reagent-storage-method"
    }),
    () => ({
      question: "下列各组物质互为同素异形体的是：",
      options: [
        { text: "氧气和臭氧", correct: true },
        { text: "水和重水", correct: false },
        { text: "甲烷和乙烷", correct: false },
        { text: "金刚石和石墨", correct: true }
      ],
      explanation: "O₂与O₃、金刚石与石墨均为同素异形体",
      uniqueId: "allotrope-identification",
      multipleCorrect: true
    }),
    () => ({
      question: "下列反应能产生氢气的是：",
      options: [
        { text: "铁与浓硫酸常温接触", correct: false },
        { text: "铝与氢氧化钠溶液反应", correct: true },
        { text: "铜与稀盐酸反应", correct: false },
        { text: "锌与稀硫酸反应", correct: true }
      ],
      explanation: "Al与强碱、Zn与稀酸均产H₂",
      uniqueId: "hydrogen-production-reaction",
      multipleCorrect: true
    }),
    () => ({
      question: "配制100mL 0.5mol/L CuSO₄溶液需胆矾（CuSO₄·5H₂O）的质量是：（摩尔质量250g/mol）",
      options: [
        { text: "12.5g", correct: true },
        { text: "25g", correct: false },
        { text: "7.5g", correct: false },
        { text: "16g", correct: false }
      ],
      explanation: "0.5mol/L×0.1L×250g/mol=12.5g",
      uniqueId: "hydrate-solution-preparation"
    }),
    () => ({
      question: "下列气体不能用碱石灰干燥的是：",
      options: [
        { text: "NH₃", correct: false },
        { text: "Cl₂", correct: true },
        { text: "CO₂", correct: true },
        { text: "H₂", correct: false }
      ],
      explanation: "Cl₂（酸性）、CO₂（酸性）会与碱石灰反应",
      uniqueId: "gas-drying-limitation",
      multipleCorrect: true
    }),
    // 新增20道中级题目
    () => ({
      question: "下列物质中，属于弱电解质的是：",
      options: [
        { text: "氯化钠", correct: false },
        { text: "醋酸", correct: true },
        { text: "氢氧化钠", correct: false },
        { text: "硫酸", correct: false }
      ],
      explanation: "醋酸在水中部分电离，属于弱电解质",
      uniqueId: "weak-electrolyte-identification"
    }),
    () => ({
      question: "下列离子方程式书写正确的是：",
      options: [
        { text: "铁与稀盐酸反应：2Fe + 6H⁺ → 2Fe³⁺ + 3H₂↑", correct: false },
        { text: "氢氧化钡与硫酸反应：Ba²⁺ + SO₄²⁻ → BaSO₄↓", correct: false },
        { text: "碳酸钙与盐酸反应：CaCO₃ + 2H⁺ → Ca²⁺ + CO₂↑ + H₂O", correct: true },
        { text: "铝与氢氧化钠溶液反应：Al + 2OH⁻ → AlO₂⁻ + H₂↑", correct: false }
      ],
      explanation: "碳酸钙是难溶物应保留化学式，其他选项电荷或产物不正确",
      uniqueId: "ionic-equation-validation"
    }),
    () => ({
      question: "下列实验操作正确的是：",
      options: [
        { text: "用pH试纸测定浓硫酸的pH值", correct: false },
        { text: "用碱式滴定管盛放高锰酸钾溶液", correct: false },
        { text: "用分液漏斗分离乙醇和水的混合物", correct: false },
        { text: "用湿润的红色石蕊试纸检验氨气", correct: true }
      ],
      explanation: "氨气能使湿润红色石蕊试纸变蓝，其他操作均错误",
      uniqueId: "experimental-operation-correctness"
    }),
    () => ({
      question: "下列各组离子能在pH=1的溶液中大量共存的是：",
      options: [
        { text: "K⁺、Cl⁻、SO₄²⁻、Na⁺", correct: true },
        { text: "HCO₃⁻、K⁺、Cl⁻、Na⁺", correct: false },
        { text: "Ba²⁺、AlO₂⁻、NO₃⁻、K⁺", correct: false },
        { text: "Ag⁺、NH₄⁺、NO₃⁻、I⁻", correct: false }
      ],
      explanation: "pH=1为强酸性环境，HCO₃⁻、AlO₂⁻不能存在，Ag⁺与I⁻生成沉淀",
      uniqueId: "ion-coexistence-acidic"
    }),
    () => ({
      question: "下列有关化学键的叙述正确的是：",
      options: [
        { text: "离子化合物中一定含有金属元素", correct: false },
        { text: "共价化合物中可能含有离子键", correct: false },
        { text: "非极性键只存在于双原子单质分子中", correct: false },
        { text: "含有共价键的化合物不一定是共价化合物", correct: true }
      ],
      explanation: "如NaOH含共价键但属离子化合物，其他选项均有反例",
      uniqueId: "chemical-bond-description"
    }),
    () => ({
      question: "下列实验现象描述正确的是：",
      options: [
        { text: "铜与浓硫酸反应生成无色气体", correct: false },
        { text: "钠在氧气中燃烧发出黄色火焰，生成白色固体", correct: false },
        { text: "向FeCl₃溶液中滴加KSCN溶液，溶液变红色", correct: true },
        { text: "将铜丝插入浓硝酸中，产生无色气体，溶液变蓝", correct: false }
      ],
      explanation: "Fe³⁺与SCN⁻生成红色络合物，其他现象描述不准确",
      uniqueId: "experimental-phenomenon-description"
    }),
    () => ({
      question: "下列有关元素周期表的说法错误的是：",
      options: [
        { text: "元素周期表有7个周期，16个族", correct: true },
        { text: "第ⅠA族元素都是金属元素", correct: false },
        { text: "过渡元素都是金属元素", correct: false },
        { text: "主族元素原子的最外层电子数等于族序数", correct: false }
      ],
      explanation: "第ⅠA族含氢（非金属），周期表有18纵列7周期",
      uniqueId: "periodic-table-misconception"
    }),
    () => ({
      question: "下列有关化学反应速率的说法正确的是：",
      options: [
        { text: "增大反应物浓度一定能加快反应速率", correct: false },
        { text: "升高温度一定能加快反应速率", correct: true },
        { text: "使用催化剂一定能加快反应速率", correct: false },
        { text: "增大压强一定能加快气体反应速率", correct: false }
      ],
      explanation: "温度升高分子运动加快，其他情况需考虑具体反应条件",
      uniqueId: "reaction-rate-principle"
    }),
    () => ({
      question: "下列有关化学平衡的说法错误的是：",
      options: [
        { text: "平衡时正逆反应速率相等", correct: false },
        { text: "平衡时各组分浓度不再变化", correct: false },
        { text: "平衡时反应物完全转化为生成物", correct: true },
        { text: "平衡是动态平衡", correct: false }
      ],
      explanation: "平衡时反应物和生成物共存，转化不完全",
      uniqueId: "chemical-equilibrium-misconception"
    }),
    () => ({
      question: "下列有关原电池的叙述正确的是：",
      options: [
        { text: "原电池是将化学能转化为电能的装置", correct: true },
        { text: "原电池的正极发生氧化反应", correct: false },
        { text: "电子从负极经电解质溶液流向正极", correct: false },
        { text: "任何氧化还原反应都能设计成原电池", correct: false }
      ],
      explanation: "原电池基本原理是自发氧化还原反应产生电流",
      uniqueId: "galvanic-cell-principle"
    }),
    () => ({
      question: "下列有关电解的叙述错误的是：",
      options: [
        { text: "电解是将电能转化为化学能的过程", correct: false },
        { text: "电解时阳极发生氧化反应", correct: false },
        { text: "电解氯化钠溶液可制取金属钠", correct: true },
        { text: "电解精炼铜时粗铜作阳极", correct: false }
      ],
      explanation: "电解NaCl溶液得NaOH、Cl₂和H₂，不能得到Na",
      uniqueId: "electrolysis-misconception"
    }),
    () => ({
      question: "下列有关有机物的说法正确的是：",
      options: [
        { text: "甲烷与氯气在光照下反应属于取代反应", correct: true },
        { text: "乙烯能使酸性高锰酸钾溶液褪色是因其漂白性", correct: false },
        { text: "苯分子中含有碳碳双键", correct: false },
        { text: "乙醇与钠反应比水与钠反应剧烈", correct: false }
      ],
      explanation: "甲烷氯代是取代反应，其他选项均有概念错误",
      uniqueId: "organic-chemistry-principle"
    }),
    () => ({
      question: "下列有关同分异构体的叙述正确的是：",
      options: [
        { text: "分子式相同，结构不同的化合物互称同分异构体", correct: true },
        { text: "相对分子质量相同，结构不同的化合物互称同分异构体", correct: false },
        { text: "同分异构体的物理性质相同", correct: false },
        { text: "同分异构体的化学性质相同", correct: false }
      ],
      explanation: "同分异构体定义强调分子式相同结构不同",
      uniqueId: "isomer-definition"
    }),
    () => ({
      question: "下列有关糖类的说法错误的是：",
      options: [
        { text: "葡萄糖和果糖互为同分异构体", correct: false },
        { text: "蔗糖和麦芽糖互为同分异构体", correct: false },
        { text: "淀粉和纤维素互为同分异构体", correct: true },
        { text: "糖类不一定都有甜味", correct: false }
      ],
      explanation: "淀粉和纤维素分子式不同，不是同分异构体",
      uniqueId: "carbohydrate-misconception"
    }),
    () => ({
      question: "下列有关蛋白质的说法正确的是：",
      options: [
        { text: "蛋白质水解的最终产物是氨基酸", correct: true },
        { text: "所有蛋白质遇浓硝酸都变黄", correct: false },
        { text: "蛋白质溶液中加入硫酸铵溶液会产生沉淀", correct: true },
        { text: "蛋白质的变性是可逆的", correct: false }
      ],
      explanation: "蛋白质水解得氨基酸，盐析可逆但变性不可逆",
      uniqueId: "protein-properties",
      multipleCorrect: true
    }),
    () => ({
      question: "下列有关高分子材料的说法错误的是：",
      options: [
        { text: "聚乙烯是热塑性塑料", correct: false },
        { text: "酚醛树脂是热固性塑料", correct: false },
        { text: "天然橡胶的主要成分是聚异戊二烯", correct: false },
        { text: "合成纤维都是线型高分子", correct: true }
      ],
      explanation: "合成纤维也有支链型和网状结构",
      uniqueId: "polymer-misconception"
    }),
    () => ({
      question: "下列实验能达到预期目的的是：",
      options: [
        { text: "用乙醇萃取碘水中的碘", correct: false },
        { text: "用分液漏斗分离苯和水的混合物", correct: true },
        { text: "用加热法分离氯化钠和碘的混合物", correct: false },
        { text: "用过滤法除去食盐水中的泥沙", correct: true }
      ],
      explanation: "苯与水不互溶可分液，泥沙不溶可过滤",
      uniqueId: "experimental-purpose-achievement",
      multipleCorrect: true
    }),
    () => ({
      question: "下列有关化学与生活的说法正确的是：",
      options: [
        { text: "福尔马林是甲醛的水溶液，可用于食品保鲜", correct: false },
        { text: "小苏打可用于治疗胃酸过多", correct: true },
        { text: "聚乙烯塑料可用来包装食品", correct: true },
        { text: "绿色食品是指颜色为绿色的食品", correct: false }
      ],
      explanation: "小苏打中和胃酸，聚乙烯无毒可包装食品",
      uniqueId: "chemistry-life-application",
      multipleCorrect: true
    })
  ],
  hard: [
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
    () => createChemicalReactionQuestion()
  ],
  expert: [
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
    () => createReactionKineticsQuestion()
  ]
};

const usedQuestions = {
  easy: new Set(),
  medium: new Set(),
  hard: new Set(),
  expert: new Set()
};

function createElementSymbolQuestion(elements) {
  const element = elements[Math.floor(Math.random() * elements.length)];
  const wrongElements = elements.filter(e => e.symbol !== element.symbol);
  
  return {
    question: `${element.name}的化学符号是什么？`,
    options: [
      { text: element.symbol, correct: true },
      { text: wrongElements[0].symbol, correct: false },
      { text: wrongElements[1].symbol, correct: false },
      { text: wrongElements[2].symbol, correct: false }
    ],
    explanation: `${element.name}是${element.group}元素，其化学符号为${element.symbol}。`,
    uniqueId: `element-symbol-${element.symbol}`
  };
}

function createElementGroupQuestion(elements) {
  const element = elements[Math.floor(Math.random() * elements.length)];
  const wrongGroups = ['碱金属', '卤素', '过渡金属', '惰性气体'];
  const filteredGroups = wrongGroups.filter(g => g !== element.group);
  
  return {
    question: `${element.name}属于哪一类元素？`,
    options: [
      { text: element.group, correct: true },
      { text: filteredGroups[0], correct: false },
      { text: filteredGroups[1], correct: false },
      { text: filteredGroups[2], correct: false }
    ],
    explanation: `${element.name}（${element.symbol}）属于${element.group}元素。`,
    uniqueId: `element-group-${element.symbol}`
  };
}

function createChemicalReactionQuestion() {
  const reactions = [
    {
      question: "下列反应中，属于置换反应的是：",
      options: [
        { text: "2H₂ + O₂ → 2H₂O", correct: false },
        { text: "Zn + 2HCl → ZnCl₂ + H₂↑", correct: true },
        { text: "CaCO₃ → CaO + CO₂↑", correct: false },
        { text: "NaOH + HCl → NaCl + H₂O", correct: false }
      ],
      explanation: "置换反应是一种单质与一种化合物反应生成另一种单质和另一种化合物。",
      uniqueId: "replacement-reaction"
    }
  ];
  return reactions[Math.floor(Math.random() * reactions.length)];
}

function createReactionKineticsQuestion() {
  const questions = [
    {
      question: "某反应速率方程为 v = k[A]²[B]，当[A]变为原来的3倍，[B]减半时，反应速率变为原来的多少倍？",
      options: [
        { text: "1.5", correct: false },
        { text: "2.25", correct: false },
        { text: "4.5", correct: true },
        { text: "9", correct: false }
      ],
      explanation: "v' = k(3[A])²(0.5[B]) = 4.5k[A]²[B] = 4.5v。",
      uniqueId: "kinetics-calculation"
    }
  ];
  return questions[Math.floor(Math.random() * questions.length)];
}

function generateChemistryQuestion(difficulty) {
  try {
    if (!questionGenerators[difficulty] || questionGenerators[difficulty].length === 0) {
      console.error(`No question generators found for difficulty: ${difficulty}`);
      return getDefaultQuestion(difficulty);
    }

    const generators = questionGenerators[difficulty];
    let question;
    let attempts = 0;
    
    do {
      const randomGenerator = generators[Math.floor(Math.random() * generators.length)];
      question = randomGenerator();
      attempts++;
      
      if (attempts >= questionConfig.maxAttempts) {
        usedQuestions[difficulty].clear();
        break;
      }
    } while (!question || usedQuestions[difficulty].has(question.uniqueId));
    
    if (!question) {
      console.error('Failed to generate question after max attempts');
      return getDefaultQuestion(difficulty);
    }
    
    usedQuestions[difficulty].add(question.uniqueId);
    return question;
  } catch (error) {
    console.error('Error generating question:', error);
    return getDefaultQuestion(difficulty);
  }
}

function getDefaultQuestion(difficulty) {
  return questionConfig.defaultQuestions[difficulty] || questionConfig.defaultQuestions.easy;
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
