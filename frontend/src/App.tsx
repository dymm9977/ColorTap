import { useEffect, useState, type ChangeEvent } from 'react';
import { UploadCloud, Paintbrush, Wand2, Image as ImageIcon } from 'lucide-react';
import {
  CULTURAL_THEMES,
  THEME_IDS,
  THEME_LABEL_UI,
  type ThemeId,
} from './data/culturalPalettes';
import { ThemeSection } from './components/ThemeSection';
import { InkBloomPanel } from './components/InkBloomPanel';
import { MusicToggle } from './components/MusicToggle';
import { BGM_CONFIG } from './config/audio';
import { getColorizeApiUrl } from './apiBase';

export default function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [styleId, setStyleId] = useState<string>('1');
  const [isColorizing, setIsColorizing] = useState<boolean>(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReduceMotion(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResultUrl(null);
    }
  };

  const handleColorize = async () => {
    if (!selectedFile) return;
    setIsColorizing(true);
    setResultUrl(null);

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('style_id', styleId);

    try {
      const apiUrl = getColorizeApiUrl();

      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.url) {
        setResultUrl(data.url);
      } else {
        alert(`渲染失败: ${data.detail || '未知错误'}`);
      }
    } catch (error) {
      console.error('请求报错:', error);
      alert(
        '网络请求失败：请确认后端已启动（开发时需在 8000 端口运行 FastAPI，或由 Vite 代理 /api）。'
      );
    } finally {
      setIsColorizing(false);
    }
  };

  const activeTheme = CULTURAL_THEMES[styleId as ThemeId] ?? CULTURAL_THEMES['1'];

  return (
    <div className="xuan-page min-h-screen text-jian-ink relative overflow-hidden">
      <MusicToggle />

      {/* 远景：黛青雾 + 当前主题矿物色晕（低饱和，不抢卷面） */}
      <div
        className="absolute -top-36 -right-32 w-[30rem] h-[30rem] rounded-full mix-blend-multiply filter blur-3xl opacity-[0.28] pointer-events-none transition-colors duration-[900ms]"
        style={{ backgroundColor: activeTheme.accentHex }}
      />
      <div className="absolute -bottom-40 -left-40 w-[28rem] h-[28rem] bg-jian-teal/25 rounded-full mix-blend-multiply filter blur-3xl opacity-35 pointer-events-none" />
      {/* 极淡祥云纹：铺底不抢眼 */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'%3E%3Cpath fill='%232a2622' d='M20 70c8-18 28-22 40-10 6-14 22-20 36-14-4-10 4-22 16-24-6-8 2-20 14-20 10 0 16 8 14 18 12 2 20 14 16 26 10 4 14 18 6 28-10 12-30 10-40-2-10 14-32 16-44 4-8 8-22 8-30-2-6-8-4-18 4-24z'/%3E%3C/svg%3E")`,
          backgroundSize: '220px 220px',
        }}
        aria-hidden
      />

      <div className="max-w-6xl mx-auto relative z-10 px-5 md:px-8 py-8 md:py-12">
        {/* 页眉：题签式 — 不对称留白、泥金点缀 */}
        <header className="mb-11 md:mb-14 text-center relative">
          <div className="inline-flex flex-col items-center gap-5">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-jian-gold/55 bg-gradient-to-b from-jian-paper to-jian-paper-warm shadow-scroll-inner"
              aria-hidden
            >
              <Paintbrush className="h-8 w-8 text-jian-cinnabar" strokeWidth={1.75} />
            </div>
            <div>
              <p className="heading-rule text-[11px] tracking-[0.65em] text-jian-ink-soft/90 font-heading mb-3 uppercase">
                矿物设色 · 卷轴成画
              </p>
              <h1 className="font-display text-[clamp(2.25rem,6vw,3.75rem)] text-jian-ink tracking-[0.28em] drop-shadow-[0_1px_0_rgba(255,253,248,0.9)]">
                画龙点睛
              </h1>
              <p className="mt-4 text-jian-teal-soft text-base md:text-lg tracking-[0.22em] font-heading">
                AI 驱动的传统文化线稿上色
              </p>
            </div>
          </div>
          <p className="mt-8 max-w-2xl mx-auto text-sm text-jian-ink-faint leading-[1.85] font-serif px-1 border-t border-jian-gold-dim pt-6">
            以传统矿物色与工艺意象为线索，呈现中华色彩文化；适用于课程中对
            <span className="text-jian-cinnabar font-semibold not-italic">非物质文化遗产</span>
            与数字传播的思考。
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* 左栏：操作 — 自上而下如批注 */}
          <div className="lg:col-span-4 space-y-7">
            <section className="scroll-card p-6 md:p-7 relative z-[1]">
              <h2 className="font-heading text-lg md:text-xl mb-5 flex items-center gap-2.5 text-jian-ink tracking-[0.12em]">
                <UploadCloud className="w-5 h-5 text-jian-cinnabar shrink-0" aria-hidden />
                一 · 上传白描
              </h2>
              <div className="relative border-2 border-dashed border-jian-teal/35 rounded-sm p-8 hover:border-jian-cinnabar/45 transition-colors text-center cursor-pointer bg-jian-paper/80 hover:bg-jian-paper-warm/50 shadow-scroll-inner">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                {!previewUrl ? (
                  <div className="flex flex-col items-center justify-center text-jian-ink-faint font-sans">
                    <ImageIcon className="w-10 h-10 mb-2 opacity-45 text-jian-teal" aria-hidden />
                    <span className="text-sm tracking-[0.15em]">点击或拖拽上传线稿</span>
                  </div>
                ) : (
                  <div className="text-jian-cinnabar font-semibold text-sm tracking-[0.2em] font-sans">
                    重新选择图片
                  </div>
                )}
              </div>
            </section>

            <section className="scroll-card p-6 md:p-7 relative z-[1]">
              <h2 className="font-heading text-lg md:text-xl mb-5 flex items-center gap-2.5 text-jian-ink tracking-[0.12em]">
                <Paintbrush className="w-5 h-5 text-jian-cinnabar shrink-0" aria-hidden />
                二 · 择色定调
              </h2>
              <div className="space-y-3 font-sans">
                {THEME_IDS.map((id) => (
                  <label
                    key={id}
                    className={`flex items-center p-3.5 rounded-sm border cursor-pointer transition-all duration-300 ${
                      styleId === id
                        ? 'bg-jian-cinnabar/10 border-jian-cinnabar text-jian-ink shadow-[inset_0_0_0_1px_rgba(180,60,43,0.25)]'
                        : 'bg-jian-paper/60 border-jian-line/80 text-jian-ink-soft hover:border-jian-gold/50 hover:bg-jian-paper'
                    }`}
                  >
                    <input
                      type="radio"
                      name="style"
                      value={id}
                      checked={styleId === id}
                      onChange={(e) => setStyleId(e.target.value)}
                      className="sr-only"
                    />
                    <span className="font-medium tracking-[0.06em] text-sm md:text-[15px] leading-snug">
                      {THEME_LABEL_UI[id]}
                    </span>
                  </label>
                ))}
              </div>
            </section>

            <button
              type="button"
              onClick={handleColorize}
              disabled={!selectedFile || isColorizing}
              className={`relative z-[1] w-full py-4 rounded-sm font-heading text-lg flex items-center justify-center gap-2.5 transition-all tracking-[0.35em] border overflow-hidden ${
                !selectedFile || isColorizing
                  ? 'bg-jian-paper-warm text-jian-ink-faint cursor-not-allowed border-jian-line shadow-none'
                  : 'text-[#fdf8f3] bg-gradient-to-b from-jian-cinnabar to-jian-cinnabar-deep border-black/10 shadow-cinnabar-glow hover:brightness-[1.03] active:scale-[0.99]'
              }`}
            >
              {isColorizing ? (
                <span className="font-sans tracking-[0.25em] text-[15px]">施彩中…</span>
              ) : (
                <>
                  <Wand2 className="w-5 h-5 opacity-95" aria-hidden />
                  <span className="font-display text-xl tracking-[0.2em] pt-0.5">画龙点睛</span>
                </>
              )}
            </button>
          </div>

          {/* 右栏：画卷对幅 — 加高画幅比例，减少两侧大块留白 */}
          <section className="lg:col-span-8 scroll-card p-4 sm:p-5 md:p-6 flex flex-col relative z-[1] min-h-0">
            <div className="heading-rule mb-3 md:mb-4 text-jian-gold/80 shrink-0">
              <h2 className="font-display text-xl md:text-2xl text-jian-ink tracking-[0.45em] whitespace-nowrap">
                画卷展示
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 lg:gap-8 items-stretch flex-1 min-h-0">
              <div className="flex flex-col items-center min-h-0">
                <span className="px-4 py-1.5 bg-jian-paper-warm/90 border border-jian-line text-jian-ink-soft rounded-sm text-xs mb-3 tracking-[0.35em] font-heading shadow-sm shrink-0">
                  原白描稿
                </span>
                <div className="w-full max-w-[600px] mx-auto aspect-[3/4] max-h-[min(75vh,700px)] rounded-sm bg-jian-paper/90 border border-jian-line/90 flex items-center justify-center overflow-hidden shadow-scroll-inner p-2 sm:p-3">
                  {previewUrl ? (
                    <img src={previewUrl} alt="上传的线稿原图" className="w-full h-full object-contain rounded-[2px]" />
                  ) : (
                    <span className="text-jian-mist text-sm tracking-[0.25em] font-serif">等待卷宗展开…</span>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-center relative min-h-0">
                <span className="px-4 py-1.5 bg-jian-cinnabar/12 text-jian-cinnabar-deep border border-jian-cinnabar/25 rounded-sm text-xs mb-3 tracking-[0.35em] font-heading font-semibold shadow-sm shrink-0">
                  点睛之作
                </span>
                <div className="w-full max-w-[600px] mx-auto aspect-[3/4] max-h-[min(75vh,700px)] rounded-sm bg-jian-paper/90 border border-jian-line/90 flex items-center justify-center overflow-hidden relative group shadow-scroll-inner p-2 sm:p-3">
                  {isColorizing ? (
                    <InkBloomPanel theme={activeTheme} reduceMotion={reduceMotion} />
                  ) : resultUrl ? (
                    <>
                      <img
                        src={resultUrl}
                        alt="AI 上色后的画卷"
                        className="w-full h-full object-contain rounded-[2px] transform transition-transform duration-700 group-hover:scale-[1.015]"
                      />
                      <a
                        href={resultUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="absolute bottom-5 right-5 bg-jian-ink/88 backdrop-blur-sm border border-jian-gold/35 text-jian-paper px-5 py-2.5 rounded-sm text-xs opacity-0 group-hover:opacity-100 transition-opacity hover:bg-jian-ink tracking-[0.35em] font-heading shadow-lg"
                      >
                        保存画卷
                      </a>
                    </>
                  ) : (
                    <span className="text-jian-mist text-sm tracking-[0.25em] font-serif">等待上色…</span>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* 传统色卡：全宽一行，避免挤在窄左栏内 */}
        <section className="scroll-card p-5 sm:p-6 md:p-8 relative z-[1] mt-8 lg:mt-10">
          <h2 className="font-heading text-base md:text-lg mb-2 text-jian-ink tracking-[0.12em] flex items-center gap-2.5 flex-wrap">
            <span
              className="inline-block h-2 w-2 rounded-full ring-2 ring-jian-gold/50 ring-offset-2 ring-offset-jian-paper shrink-0"
              style={{ backgroundColor: activeTheme.accentHex }}
              aria-hidden
            />
            三 · 传统色卡
          </h2>
          <p className="text-xs text-jian-ink-faint mb-5 md:mb-6 font-serif leading-relaxed border-l-2 border-jian-gold/35 pl-3 max-w-3xl">
            下列三色为本主题代表性传统色。点击卡片翻面，了解颜料来源与文史典故。
          </p>
          <ThemeSection styleId={styleId} reduceMotion={reduceMotion} />
        </section>

        <footer className="mt-12 md:mt-14 pt-8 md:pt-9 border-t border-jian-gold-dim text-center text-[11px] md:text-xs text-jian-ink-faint space-y-3 font-sans leading-relaxed max-w-3xl mx-auto">
          <p>
            背景音乐：「{BGM_CONFIG.title}」by {BGM_CONFIG.artist} ·{' '}
            <a
              href={BGM_CONFIG.licenseUrl}
              className="text-jian-cinnabar underline-offset-4 hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              CC BY 4.0
            </a>
            · 来源{' '}
            <a
              href={BGM_CONFIG.providerUrl}
              className="text-jian-cinnabar underline-offset-4 hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              Incompetech
            </a>
          </p>
          <p className="text-jian-mist/90">
            本页为课程演示用途；生成结果版权归平台与模型服务条款约束，请及时保存临时链接。
          </p>
        </footer>
      </div>
    </div>
  );
}
