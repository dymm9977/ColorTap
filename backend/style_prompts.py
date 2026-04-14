"""
线稿上色提示词：统一「两步任务 + 结构约束」与各文化风格的美学描述。

说明：模型侧为英文 prompt；此处用英文写清任务与约束，风格段保留原有文化意象关键词。
"""

# 所有风格共用的总任务与注意事项（风格名在下方 STYLE_AESTHETIC 中展开）
LINE_ART_COLOR_PREFIX = (
    "Overall task in two conceptual steps: "
    "(1) First, derive a clean, complete monochrome line-art interpretation of the input: remove flat colors and fills, "
    "so the result reads as faithful line work. "
    "(2) Then colorize that line art strictly in the aesthetic described below (palette, brush texture, atmosphere). "
    "Critical constraints: keep originally continuous lines unbroken—no gaps, breaks, or missing strokes; "
    "preserve all contours, silhouettes, and compositional elements—do not add, remove, or redraw subjects or details; "
    "do not invent objects, text, or features absent from the source; apply only stylistic coloring and rendering. "
    "Style to follow: "
)

# 各风格仅描述「上色风格」，具体约束由前缀统一承担
STYLE_AESTHETIC = {
    "1": (
        "Traditional Chinese blue-green landscape painting (Qinglü Shanshui): "
        "vibrant cinnabar red accents on pavilion roofs, layered azurite blue and malachite green mineral pigments "
        "for mountain slopes with visible textural brushstrokes, subtle ochre underpainting for earthy cliffs, "
        "pale ink-washed mist rendered in diluted indigo-gray, gold leaf highlights on temple eaves and distant peaks, "
        "soft vermillion cloud bands drifting between jade-green ridges, all grounded by warm sienna soil paths "
        "and deep lacquer-black pine trunks. "
        "Palette emphasis (named hues): azurite blue (shiqing), malachite green (shilü), and ochre/sienna (zheshi) "
        "as the mineral backbone of the blue-green idiom."
    ),
    "2": (
        "Traditional Chinese Dunhuang mural style: "
        "rich earthy tones, authentic mineral pigments like faded cinnabar red, oxidized azurite blue, "
        "and malachite green; weathered wall texture, elegant flying apsaras aesthetics, "
        "intricate gold leaf details, ancient, spiritual, and culturally profound, with a slight vintage patina. "
        "Palette emphasis (named hues): lapis-like deep blue, muted azurite teal-gray, and cinnabar/dan red "
        "as signature Dunhuang mineral colors."
    ),
    "3": (
        "Traditional Chinese Cloisonné (Jingtailan) enamel style: "
        "vibrant sapphire blue base, exquisite and precise gold wire cloison outlines, "
        "filled with luminous turquoise, coral red, and imperial yellow enamel; "
        "high gloss, metallic sheen, luxurious, vibrant, and highly decorative. "
        "Palette emphasis (named hues): sky-blue (tianqing) enamel grounds, tin-antimony yellow highlights, "
        "and gold-red rouge pink accents typical of imperial enamel ware."
    ),
}

# API 使用的完整 prompt：前缀 + 风格段
STYLE_PROMPTS: dict[str, str] = {
    k: LINE_ART_COLOR_PREFIX + v for k, v in STYLE_AESTHETIC.items()
}

# 供 CLI / 界面展示的中文名（与前端 STYLES 一致）
STYLE_NAMES: dict[str, str] = {
    "1": "青绿山水 (Blue-Green Landscape)",
    "2": "敦煌壁画 (Dunhuang Mural)",
    "3": "景泰蓝 (Cloisonné Enamel)",
}
