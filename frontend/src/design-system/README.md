# Frontend Design System

このディレクトリは、アプリ全体で再利用する視覚的な基準とUI primitiveのsource of truthです。

## Layers

1. **Tokens**
   - `../styles/global.css` の Tailwind CSS v4 `@theme` に定義する。
   - color / typography / radius / shadow など、複数componentで共有する値を置く。
2. **Primitives**
   - Button、Inputなど、feature非依存で再利用する最小UIを置く。
   - API通信や業務ロジックは持たない。
3. **Stories**
   - Design System componentにはStorybook storyを用意する。
   - variant、disabled、error等の重要状態をstoryで見えるようにする。

## Rules

- tokenがある値をfeature側で生のhex値や独自spacingとして増殖させない。
- Design System componentはsemantic HTMLとkeyboard accessibilityを維持する。
- visual variantを追加したらStorybookも更新する。
- project固有の複雑なUIは `features/` または `components/` に置き、primitiveへ無理に押し込まない。
- 外部component libraryを追加する場合も、このprojectのtokenとpublic component APIを境界として扱う。
