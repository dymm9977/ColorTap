/**
 * 等待生成时轮播的传统文化意象图（public 下静态资源，体量小、可离线）。
 * 可按需替换为自采版权图，保持路径与 alt 即可。
 */
export interface LoadingCulturalImage {
  /** 相对站点根路径 */
  src: string;
  /** 无障碍说明 */
  alt: string;
}

export const LOADING_CULTURAL_IMAGES: LoadingCulturalImage[] = [
  { src: '/loading/mountain-mist.svg', alt: '青绿山水意象线描' },
  { src: '/loading/cloud-scroll.svg', alt: '祥云卷草意象' },
  { src: '/loading/lotus-line.svg', alt: '莲纹线描意象' },
  { src: '/loading/cloisonne-pattern.svg', alt: '珐琅团花意象' },
  { src: '/loading/dunhuang-ribbon.svg', alt: '飞天飘带意象' },
];
