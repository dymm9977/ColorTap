/**
 * 背景音乐配置：可替换 url；更换时请同步更新署名与许可说明。
 *
 * 当前曲目：Kevin MacLeod — Eastminster
 * 许可：Creative Commons BY 4.0
 * https://creativecommons.org/licenses/by/4.0/
 * https://incompetech.com/music/royalty-free/music.html
 */

export const BGM_CONFIG = {
  /** 外链 MP3（incompetech 官方托管，用于演示；若失效可换为本地 public/bgm.mp3） */
  url: 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/Eastminster.mp3',
  title: 'Eastminster',
  artist: 'Kevin MacLeod',
  /** 署名页或许可说明链接 */
  licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
  providerUrl: 'https://incompetech.com/',
} as const;

/** localStorage 键：用户上次是否开启背景音乐 */
export const BGM_STORAGE_KEY = 'line-color-bgm-enabled';
