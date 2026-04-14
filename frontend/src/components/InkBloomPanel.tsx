import { useEffect, useState, type CSSProperties } from 'react';
import type { CulturalTheme } from '../data/culturalPalettes';
import { LOADING_CULTURAL_IMAGES } from '../data/loadingCulturalAssets';

interface InkBloomPanelProps {
  /** 当前文化主题（含三色与 loadingCues） */
  theme: CulturalTheme;
  reduceMotion: boolean;
}

/**
 * 仅在「点睛之作」画框内呈现：多层矿物色水墨晕染 + 波纹绽开 + 与色卡绑定的词句轮播。
 * 不遮挡全页，便于同时浏览下方传统色卡。
 */
export function InkBloomPanel({ theme, reduceMotion }: InkBloomPanelProps) {
  const cues = theme.loadingCues;
  const [cueIndex, setCueIndex] = useState(0);
  /** 等待时随机轮播的传统文化意象图索引 */
  const [assetIndex, setAssetIndex] = useState(0);

  useEffect(() => {
    setCueIndex(Math.floor(Math.random() * cues.length));
  }, [theme.id, cues.length]);

  useEffect(() => {
    if (reduceMotion) return;
    const t = window.setInterval(() => {
      setCueIndex((i) => (i + 1) % cues.length);
    }, 4200);
    return () => window.clearInterval(t);
  }, [cues.length, reduceMotion, theme.id]);

  // 意象图：主题切换时重置；减少动效时固定首图，否则随机起点并定时随机切换（与词句轮播节奏略错开）
  useEffect(() => {
    const n = LOADING_CULTURAL_IMAGES.length;
    if (n === 0) return;
    if (reduceMotion) {
      setAssetIndex(0);
    } else {
      setAssetIndex(Math.floor(Math.random() * n));
    }
  }, [theme.id, reduceMotion]);

  useEffect(() => {
    if (reduceMotion || LOADING_CULTURAL_IMAGES.length <= 1) return;
    const tick = window.setInterval(() => {
      setAssetIndex((prev) => {
        const n = LOADING_CULTURAL_IMAGES.length;
        let next = Math.floor(Math.random() * n);
        let guard = 0;
        while (next === prev && guard < 8) {
          next = Math.floor(Math.random() * n);
          guard += 1;
        }
        return next;
      });
    }, 2600);
    return () => window.clearInterval(tick);
  }, [reduceMotion, theme.id]);

  const visibleAssetIndex = reduceMotion ? 0 : assetIndex;

  const cue = cues[cueIndex] ?? cues[0];
  const hueName = theme.swatches[cue.swatchIndex].name;
  const [s0, s1, s2] = theme.swatches;

  const cssVars = {
    '--ink-accent': theme.accentHex,
    '--ink-s0': s0.hex,
    '--ink-s1': s1.hex,
    '--ink-s2': s2.hex,
  } as CSSProperties;

  return (
    <div
      className="absolute inset-0 z-10 flex flex-col overflow-hidden rounded-[2px] ink-bloom-root"
      style={cssVars}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      {/* 水墨与矿物色晕：多层径向 + 绽开波纹 */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {!reduceMotion ? (
          <>
            <div className="ink-bloom-layer ink-bloom-a" />
            <div className="ink-bloom-layer ink-bloom-b" />
            <div className="ink-bloom-layer ink-bloom-c" />
            <div className="ink-bloom-ripple ink-bloom-ripple-1" />
            <div className="ink-bloom-ripple ink-bloom-ripple-2" />
            <div className="ink-bloom-inkwash" />
          </>
        ) : (
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background: `radial-gradient(circle at 45% 42%, ${theme.accentHex}66, transparent 62%)`,
            }}
          />
        )}
      </div>

      {/* 中部：传统文化意象图随机轮播（低对比点缀，不抢水墨层） */}
      <div
        className="relative z-[6] flex min-h-0 flex-1 flex-col items-center justify-center px-2 pt-3"
        aria-hidden
      >
        <div className="relative h-[min(42%,11rem)] w-full max-w-[92%]">
          {LOADING_CULTURAL_IMAGES.map((item, i) => (
            <img
              key={item.src}
              src={item.src}
              alt=""
              width={400}
              height={280}
              decoding="async"
              className={`absolute inset-0 m-auto max-h-full w-full object-contain object-center transition-opacity duration-[900ms] ease-out ${
                i === visibleAssetIndex ? 'opacity-[0.38]' : 'opacity-0'
              }`}
            />
          ))}
        </div>
      </div>

      {/* 底部：笺条式衬底 + 墨色正文，避免浅色底上白字对比不足 */}
      <div className="relative mt-auto z-20 mx-2 mb-2 md:mx-3 md:mb-3 rounded-sm border border-jian-line/90 bg-jian-paper/96 px-3 py-2.5 md:px-3.5 md:py-3 shadow-[0_6px_20px_-4px_rgba(42,38,34,0.18)] ring-1 ring-jian-ink/5">
        <p className="text-[10px] md:text-[11px] tracking-[0.28em] text-jian-cinnabar font-heading mb-1.5">
          映色 · {hueName}
        </p>
        <p className="font-display text-sm md:text-[15px] text-jian-ink leading-snug tracking-wide line-clamp-4 md:line-clamp-5">
          {cue.text}
        </p>
        <p className="mt-2 text-[10px] text-jian-ink-faint font-sans tracking-wider border-t border-jian-gold/25 pt-2">
          墨色晕开，施彩进行中…
        </p>
      </div>
    </div>
  );
}
p>
      </div>
    </div>
  );
}
