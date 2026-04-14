import { useCallback, useEffect, useRef, useState } from 'react';
import { Music, Music2 } from 'lucide-react';
import { BGM_CONFIG, BGM_STORAGE_KEY } from '../config/audio';

/**
 * 背景音乐开关：默认不自动出声；用户点击后播放并写入 localStorage。
 * 浏览器可能拦截自动播放，故从存储恢复「开」状态时，仍可能在首次交互后才真正出声。
 */
export function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(BGM_STORAGE_KEY);
    if (saved === '1') setOn(true);
  }, []);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.loop = true;
    el.volume = 0.35;
    if (on) {
      const p = el.play();
      if (p !== undefined) {
        p.catch(() => {
          /* 自动播放受限时静默失败，待用户再次点击 */
        });
      }
    } else {
      el.pause();
    }
    window.localStorage.setItem(BGM_STORAGE_KEY, on ? '1' : '0');
  }, [on]);

  const toggle = useCallback(() => {
    setOn((v) => !v);
  }, []);

  return (
    <>
      <audio ref={audioRef} src={BGM_CONFIG.url} preload="none" />
      <button
        type="button"
        onClick={toggle}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-sm border border-jian-gold/45 bg-jian-paper/95 px-4 py-2.5 text-sm text-jian-ink-soft shadow-scroll-soft backdrop-blur-sm hover:bg-jian-paper-warm/90 hover:border-jian-cinnabar/35 transition-colors font-heading tracking-[0.12em]"
        aria-pressed={on}
        title={on ? '关闭背景音乐' : '开启背景音乐'}
      >
        {on ? <Music2 className="h-4 w-4 text-jian-cinnabar" /> : <Music className="h-4 w-4 text-jian-mist" />}
        <span>{on ? '琴音开' : '琴音关'}</span>
      </button>
    </>
  );
}
