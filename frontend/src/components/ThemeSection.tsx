import { FlipColorCard } from './FlipColorCard';
import { getCulturalTheme } from '../data/culturalPalettes';

interface ThemeSectionProps {
  styleId: string;
  reduceMotion: boolean;
}

/**
 * 展示当前选中主题下的三张传统色翻转卡，并附主题副标题说明。
 */
export function ThemeSection({ styleId, reduceMotion }: ThemeSectionProps) {
  const theme = getCulturalTheme(styleId);

  return (
    <div className="space-y-5">
      <div className="rounded-sm border border-jian-teal/25 bg-gradient-to-br from-jian-paper/95 via-jian-paper-warm/40 to-jian-teal/5 px-4 py-3.5 md:px-5 shadow-scroll-inner">
        <p className="text-sm md:text-[15px] text-jian-ink-soft leading-relaxed tracking-wide font-serif">
          <span className="text-jian-cinnabar font-heading font-semibold tracking-[0.08em]">{theme.shortTitle}</span>
          <span className="mx-2 text-jian-gold/60">·</span>
          {theme.subtitle}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
        {theme.swatches.map((swatch) => (
          <FlipColorCard key={`${theme.id}-${swatch.name}`} swatch={swatch} reduceMotion={reduceMotion} />
        ))}
      </div>
    </div>
  );
}
