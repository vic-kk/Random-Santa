### [[EN] README version](README.en.md)

# 🎁 Random Santa

A project for automatically drawing Secret Santas based on responses from Google Forms.

## 🚀 Quick Start

The main use case is to run the draw and publish the results.

0. **Installing Dependencies**
```bash
npm i
```

1. **Prepare the Data**
* Export the responses from Google Forms to a file and rename it `SANTA.csv`.
* Place this file in the `_local/` folder in the root of the project.

```js
// Project structure after preparation:

├─📂 _local/
│ ├─ SANTA.csv // your responses from Google Forms
│ └─ tip.txt
└─ ...
```

2. **Run automatic processing**
```bash
npm run santa_auto
```

> [!TIP]
> The `santa_auto` command will perform the draw and immediately create a ready-to-publish project build for publishing on GitHub Pages.

```js
/*
All files and folders are generated automatically
Project structure after running the script:
*/

├─📂 _local/
│ ├─📂 backups/ // optional
│ │ └─ addresses_2025....ts // Backup of the early draw addresses.ts
│ ├─📂 parced/
│ │ └─ data.js // Contents of SANTA.csv in JS array format.
│ ├─ SANTA.csv
│ └─ tip.txt
├─ ...
├─📂 docs/ // compiled project for publishing on GitHub Pages
├─ ...
├─📂 src/data
│ └─ addresses.ts // project draw file
└─ ...
```

## ⚙️ Advanced Usage

These commands are useful for debugging, making changes, or running individual steps of a process.

### 🔧 Manual Stage Management

If you need to separate stages (for example, to test the draw before building), use the following commands separately:

```bash
# 1. Run only the draw based on the SANTA.csv file
# The existing draw version will be moved to _local/backups
npm run santa

# 2. Run locally for preview
npm run dev

# 3. Build the project for deployment (GitHub Pages)
npm run build
```

### 🧪 Generate test data
>[!WARNING]
>Warning! Generating test data will completely overwrite the _local/SANTA.csv file. Make sure to back up any important data.

For development and testing, you can generate a CSV file with fake participant data:

```bash
# Full cycle: generating 15 entries and drawing lots
npm run mock_auto
```

Separate file generation:

```bash
# Generating a CSV (default: 15 entries)
npm run mock_csv

# Generating a CSV with 50 entries
npm run mock_csv:50

# Generating a CSV with 200 entries
npm run mock_csv:200
```

## 📋 Command Reference (NPM Scripts)

| Command | Action | Typical Scenario |
| :--- | :--- | :--- |
| **`santa_auto`** | **🎯 Основная команда.** Запускает жеребьёвку и сборку для публикации. | Быстрый запуск для деплоя. |
| **`santa`** | Запускает только жеребьёвку получателей из `SANTA.csv`. | Новая жеребьёвка. |
| **`dev`** | Запускает локальный dev-сервер для просмотра. | Разработка и отладка интерфейса. |
| **`build`** | Собирает production-версию проекта. | Подготовка к публикации. |
| **`mock_auto`** | Генерирует тестовый CSV (15 записей) и запускает жеребьёвку. | Тестирование полного цикла. |
| **`mock_csv[:N]`** | Генерирует только тестовый CSV файл. | Создание данных для отладки. |