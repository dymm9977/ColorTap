import { useCallback, useId, useState, type KeyboardEvent } from 'react';
import type { ColorSwatch } from '../data/culturalPalettes';

interface FlipColorCardProps {
  swatch: ColorSwatch;
  /** 是否偏好减少动效（由父组件读取 matchMedia 传入） */
  reduceMotion: boolean;
}

/**
 * 传统色翻转卡：正面色块与色名，背面为来源与文史叙事。
 * 支持点击与键盘操作；减少动效时以淡入切换代替 3D 翻转。
 */
export function FlipColorCard({ swatch, reduceMotion }: FlipColorCardProps) {
  const [flipped, setFlipped] = useState(false);
  const id = useId();
  const labelId = `${id}-label`;

  const toggle = useCallback(() => {
    setFlipped((v) => !v);
  }, []);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    },
    [toggle]
  );

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      aria-labelledby={labelId}
      onClick={toggle}
      onKeyDown={onKeyDown}
      className="relative h-[400px] sm:h-[412px] md:h-[424px] w-full cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-jian-cinnabar/50 focus-visible:ring-offset-2 focus-visible:ring-offset-jian-paper rounded-sm"
    >
      <span id={labelId} className="sr-only">
        {swatch.name}，{flipped ? '背面详情' : '正面色样'}，按 Enter 或空格翻转
      </span>

      {reduceMotion ? (
        <div className="h-full rounded-sm border border-jian-line bg-jian-paper/95 p-4 shadow-scroll-inner overflow-hidden flex flex-col">
          {!flipped ? (
            <div className="flex flex-col flex-1 min-h-0">
              <div
                className="flex-1 min-h-[140px] rounded-[2px] shadow-scroll-inner mb-3"
                style={{ backgroundColor: swatch.hex }}
              />
              <p className="text-center font-heading font-semibold text-jian-ink tracking-widest text-base">
                {swatch.name}
              </p>
            </div>
          ) : (
            <div className="flip-card-scroll flex-1 min-h-0 overflow-y-auto overscroll-contain text-left text-[13px] leading-[1.75] text-jian-ink-soft space-y-3 font-serif pr-1">
              <p className="font-heading font-semibold text-jian-ink border-b border-jian-gold/25 pb-1">{swatch.name}</p>
              <p>
                <span className="text-jian-cinnabar font-medium">来源：</span>
                {swatch.source}
              </p>
              <p>
                <span className="text-jian-teal font-medium">文史：</span>
                {swatch.literature}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="relative h-full w-full [perspective:1000px]" style={{ transformStyle: 'preserve-3d' }}>
          <div
            className="relative h-full w-full transition-transform duration-500 ease-out"
            style={{
              transformStyle: 'preserve-3d',
              transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            }}
          >
            {/* 正面 */}
            <div
              className="absolute inset-0 rounded-sm border border-jian-line bg-jian-paper/98 p-4 shadow-scroll-soft [backface-visibility:hidden] flex flex-col overflow-hidden"
              style={{ WebkitBackfaceVisibility: 'hidden' }}
            >
              <div
                className="flex-1 rounded-[2px] shadow-scroll-inner mb-3 min-h-[120px]"
                style={{ backgroundColor: swatch.hex }}
              />
              <p className="text-center font-heading font-semibold text-jian-ink tracking-widest text-base">
                {swatch.name}
              </p>
              <p className="text-center text-[10px] text-jian-mist mt-1.5 font-sans tracking-wider">点击翻转</p>
            </div>
            {/* 背面：加高容器 + 细滚动条，避免正文被裁切 */}
            <div
              className="flip-card-scroll absolute inset-0 rounded-sm border border-jian-teal/30 bg-gradient-to-b from-jian-paper to-jian-paper-warm/85 p-4 shadow-scroll-inner [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-y-auto overscroll-contain"
              style={{ WebkitBackfaceVisibility: 'hidden' }}
            >
              <p className="font-heading font-semibold text-jian-ink text-[15px] mb-2.5 border-b border-jian-gold/30 pb-1.5">
                {swatch.name}
              </p>
              <p className="text-[13px] leading-[1.75] text-jian-ink-soft mb-3 font-serif">
                <span className="text-jian-cinnabar font-medium">来源</span> {swatch.source}
              </p>
              <p className="text-[13px] leading-[1.75] text-jian-ink-faint font-serif">
                <span className="text-jian-teal font-medium">文史</span> {swatch.literature}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
