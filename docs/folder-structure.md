# Folder structure

- src 下的 components, utils, libs, constants 不應該撰寫任何用於特定業務場景邏輯的程式。
- 任何關於業務邏輯均需要放在 modules 底下進行引用
- modules/* 底下可以建立完整的檔案結構，建立自己的 domain knowhow
- modules/* 之間不可相互引用，必須解耦其關聯性
- modules/Shared 可以放置共用的功能可以任意被其他 module 引用
- pages 不放任何 UI 資訊，純粹表達頁面結構，可以任意引用 module
- 前後端共用的 models, dto 相關資料結構可以包去 @ease-trip/common
- UI Component 一律在 @ease-trip/easy-ui 加工後引出

```md
frontend
  ├── src
  │   ├── constants
  │   ├── libs
  │   ├── api
  │   ├── utils
  │   ├── components
  │   │   ├── **/*.tsx
  │   ├── modules
  │   │   ├── [Module]
  │   │   ├── Shared
  │   ├── pages
  │   │   ├── api
  │   │   │   ├── **/*.tsx
  │   │   ├── _app.tsx
  │   │   ├── _document.tsx
  │   │   ├── **/*.tsx
  │   ├── model
  │   ├── index.js
  ├── public
  ├── scripts
  ├── package.json
```
