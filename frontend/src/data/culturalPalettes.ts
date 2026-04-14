/**
 * 传统色主题数据：与后端 style_id（"1"|"2"|"3"）一一对应。
 * 文案采用科普与可查典故口径，避免无法考证的「史上首次」等绝对表述。
 */

export type ThemeId = '1' | '2' | '3';

/** 上色等待时轮播的一句：与某一张传统色卡意象呼应 */
export interface LoadingCue {
  /** 词句（多为含色彩/物象的唐宋名句） */
  text: string;
  /** 对应本主题 swatches 的下标 0/1/2，与界面三色卡顺序一致 */
  swatchIndex: 0 | 1 | 2;
}

/** 单色卡：展示色值 + 来源 + 文史叙事 */
export interface ColorSwatch {
  /** 传统色名 */
  name: string;
  /** 界面展示用十六进制色值 */
  hex: string;
  /** 颜料/工艺来源（矿物、冶炼等） */
  source: string;
  /** 文史与诗词典故（典出、多见于等措辞） */
  literature: string;
}

/** 单个文化主题（含三色卡与 Loading 词句） */
export interface CulturalTheme {
  id: ThemeId;
  /** 完整标题 */
  title: string;
  /** 短标题，用于紧凑 UI */
  shortTitle: string;
  /** 一句话意象说明 */
  subtitle: string;
  /** 主题强调色（用于水墨晕染主调） */
  accentHex: string;
  /** 固定三色 */
  swatches: [ColorSwatch, ColorSwatch, ColorSwatch];
  /** 点睛框内轮播：每句绑定一色，便于与色卡对照 */
  loadingCues: LoadingCue[];
}

export const CULTURAL_THEMES: Record<ThemeId, CulturalTheme> = {
  '1': {
    id: '1',
    title: '青绿山水',
    shortTitle: '青绿山水',
    subtitle: '层叠石青、石绿与赭色打底，见诸传世青绿山水与矿物设色传统。',
    accentHex: '#2F6B5A',
    swatches: [
      {
        name: '石青',
        hex: '#2B5F8F',
        source:
          '石青为蓝铜矿一类矿物研磨漂洗所得，传统绘画中常与石绿叠染，形成山石的「青绿」层次。',
        literature:
          '青绿设色在画史中源远流长。苏轼《念奴娇·赤壁怀古》有「江山如画」之叹，后世青绿长卷亦多借矿物色表现千里江山之气韵，意象与此相通。',
      },
      {
        name: '石绿',
        hex: '#3D8E6B',
        source:
          '石绿通常取自孔雀石等含铜矿物，研细为粉后层层罩染，石绿偏翠，与石青相衬，最宜表现坡脚与植被。',
        literature:
          '历代题画诗常写「翠岫」「青峦」。杨万里等宋人绝句中多见山色与行旅之景，读之可与青绿山水的层染意象相印证。',
      },
      {
        name: '赭石',
        hex: '#A0522D',
        source:
          '赭石为含铁矿物色，多作山石土坡的底色或皴擦，使青绿不致浮艳，画面稳重而有土石之气。',
        literature:
          '赭色属「土色」系统，在诗文里常与秋山、古道并置。以赭为底、青绿罩染，近于画论中「可游可居」的山林境界。',
      },
    ],
    loadingCues: [
      { swatchIndex: 0, text: '客路青山外，行舟绿水前。——王湾《次北固山下》' },
      { swatchIndex: 1, text: '东风何时至，已绿湖上山。——丘为《题农父庐舍》' },
      { swatchIndex: 2, text: '荆溪白石出，天寒红叶稀。——王维《山中》' },
      { swatchIndex: 0, text: '青山横北郭，白水绕东城。——李白《送友人》' },
      { swatchIndex: 1, text: '一水护田将绿绕，两山排闼送青来。——王安石《书湖阴先生壁》' },
      { swatchIndex: 2, text: '秋色从西来，苍然满关中。——岑参《与高适薛据同登慈恩寺浮图》' },
    ],
  },
  '2': {
    id: '2',
    title: '敦煌壁画',
    shortTitle: '敦煌',
    subtitle: '矿物颜料厚重艳丽：青金石蓝、石青、丹红等，映现盛唐壁画典雅与风化余韵。',
    accentHex: '#6B2D2D',
    swatches: [
      {
        name: '青金石蓝',
        hex: '#1B2B4D',
        source:
          '青金石研磨可得深蓝近群青之色，古代多自西域传入，用于壁画与装饰，色相如夜空与深海。',
        literature:
          '敦煌地处丝路要冲，壁画颜料融汇东西。唐诗中「明月」「胡天」等意象，常与边地风物并置，可借为观壁画时的心境参照。',
      },
      {
        name: '石青',
        hex: '#5A7D7A',
        source:
          '此处石青偏灰绿调，与壁画中风化、叠染有关；同为蓝铜矿系，与青金石蓝并置时层次更丰富。',
        literature:
          '莫高窟壁画历经千年，色彩与剥落皆成历史。宋人词中「斜阳」「残照」之语，亦宜于静观土色与矿物色交织的斑驳之感。',
      },
      {
        name: '丹红',
        hex: '#8B2F2F',
        source:
          '丹红多关联朱砂、丹砂一类，色艳而覆盖力强，壁画中常见于服饰与庄严相好之处。',
        literature:
          '朱砂入画、入药皆古已有之。宋词中「胭脂」「胭脂雪」等语多写妆色与花影，与壁画中矿物红系的装饰意趣可相发明。',
      },
    ],
    loadingCues: [
      { swatchIndex: 0, text: '明月出天山，苍茫云海间。——李白《关山月》' },
      { swatchIndex: 1, text: '青海长云暗雪山，孤城遥望玉门关。——王昌龄《从军行》' },
      { swatchIndex: 2, text: '晓看红湿处，花重锦官城。——杜甫《春夜喜雨》' },
      { swatchIndex: 0, text: '青天有月来几时，我今停杯一问之。——李白《把酒问月》' },
      { swatchIndex: 1, text: '青山依旧在，几度夕阳红。——杨慎《临江仙》' },
      { swatchIndex: 2, text: '一道残阳铺水中，半江瑟瑟半江红。——白居易《暮江吟》' },
    ],
  },
  '3': {
    id: '3',
    title: '景泰蓝',
    shortTitle: '景泰蓝',
    subtitle: '铜胎掐丝珐琅：天青、锡锑黄、金红胭脂等色在釉料与金属光泽间流转，显宫廷工艺之华贵。',
    accentHex: '#1E3A5F',
    swatches: [
      {
        name: '天青',
        hex: '#3A7BC8',
        source:
          '天青为釉色传统名，多见于青瓷与珐琅釉层；景泰蓝中常与蓝料地色呼应，明净如雨后晴空。',
        literature:
          '「雨过天青云破处」相传与柴窑釉色相关，后世诗文多借天青写瓷色与天色。观珐琅时，此句最宜作审美引子。',
      },
      {
        name: '锡锑黄',
        hex: '#D4A017',
        source:
          '传统黄釉与珐琅黄料常涉锑、锡等呈色元素，色亮而稳定，宜作图案填彩与对比。',
        literature:
          '宫廷器物讲究「黄承天德」。宋词写宫苑、灯市、节庆时，金粉、灯火与黄釉之耀目，可互为联想。',
      },
      {
        name: '金红胭脂',
        hex: '#C76B7E',
        source:
          '金红一类色名多见于釉上彩与珐琅呈色体系，偏胭脂红调，柔而华贵，常与蓝、黄并置。',
        literature:
          '宋词写「胭脂」「檀唇」多关人物与花卉。工艺上的金红胭脂与文学中的胭脂意象并读，可见传统色名在物与词之间的流转。',
      },
    ],
    loadingCues: [
      { swatchIndex: 0, text: '雨过天青云破处，这般颜色做将来。——典传柴窑题句' },
      { swatchIndex: 1, text: '冲天香阵透长安，满城尽带黄金甲。——黄巢《不第后赋菊》' },
      { swatchIndex: 2, text: '胭脂泪，相留醉，几时重。——李煜《相见欢》' },
      { swatchIndex: 0, text: '晴空一鹤排云上，便引诗情到碧霄。——刘禹锡《秋词》' },
      { swatchIndex: 1, text: '蛾儿雪柳黄金缕，笑语盈盈暗香去。——辛弃疾《青玉案·元夕》' },
      { swatchIndex: 2, text: '有胭脂滴滴，征衫泪湿，烂锦开残。——张翥《木兰花慢》' },
    ],
  },
};

/** 供表单与列表遍历的稳定顺序 */
export const THEME_IDS: ThemeId[] = ['1', '2', '3'];

/** 风格单选列表展示用完整标签（中英对照，与后端 README 一致） */
export const THEME_LABEL_UI: Record<ThemeId, string> = {
  '1': '青绿山水 (Blue-Green Landscape)',
  '2': '敦煌壁画 (Dunhuang Mural)',
  '3': '景泰蓝 (Cloisonné Enamel)',
};

export function getCulturalTheme(id: string): CulturalTheme {
  const key = id as ThemeId;
  if (key in CULTURAL_THEMES) return CULTURAL_THEMES[key];
  return CULTURAL_THEMES['1'];
}
