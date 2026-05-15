import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(cors());
app.use(express.json());

const OUTPUT_DIR = path.join(__dirname, "output");
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// ═══════════════════════════════════════════════════════════════════
//  PROGRAMMING LANGUAGES
// ═══════════════════════════════════════════════════════════════════
const PROG_LANGS = {
  python:     { label:"Python",        ext:".py",     install:"pip install -r requirements.txt", run:"python main.py",      test:"pytest",          color:"3776AB", logo:"python",     sample:"print(\"Hello, World!\")" },
  javascript: { label:"JavaScript",    ext:".js",     install:"npm install",                      run:"node index.js",        test:"npm test",        color:"F7DF1E", logo:"javascript", sample:"console.log(\"Hello, World!\");" },
  typescript: { label:"TypeScript",    ext:".ts",     install:"npm install",                      run:"npx ts-node index.ts", test:"npm test",        color:"3178C6", logo:"typescript", sample:"const greet = (name: string): string => `Hello, ${name}!`;\nconsole.log(greet(\"World\"));" },
  java:       { label:"Java",          ext:".java",   install:"mvn install",                      run:"java -jar app.jar",    test:"mvn test",        color:"ED8B00", logo:"java",       sample:"System.out.println(\"Hello, World!\");" },
  go:         { label:"Go",            ext:".go",     install:"go mod download",                  run:"go run main.go",       test:"go test ./...",   color:"00ADD8", logo:"go",         sample:"fmt.Println(\"Hello, World!\")" },
  rust:       { label:"Rust",          ext:".rs",     install:"cargo build",                      run:"cargo run",            test:"cargo test",      color:"000000", logo:"rust",       sample:"println!(\"Hello, World!\");" },
  ruby:       { label:"Ruby",          ext:".rb",     install:"bundle install",                   run:"ruby main.rb",         test:"bundle exec rspec",color:"CC342D",logo:"ruby",       sample:"puts \"Hello, World!\"" },
  php:        { label:"PHP",           ext:".php",    install:"composer install",                 run:"php index.php",        test:"phpunit",         color:"777BB4", logo:"php",        sample:"echo \"Hello, World!\\n\";" },
  csharp:     { label:"C#",            ext:".cs",     install:"dotnet restore",                   run:"dotnet run",           test:"dotnet test",     color:"239120", logo:"csharp",     sample:"Console.WriteLine(\"Hello, World!\");" },
  cpp:        { label:"C++",           ext:".cpp",    install:"cmake .. && make",                 run:"./app",               test:"ctest",            color:"00599C", logo:"cplusplus",  sample:"std::cout << \"Hello, World!\" << std::endl;" },
  kotlin:     { label:"Kotlin",        ext:".kt",     install:"gradle build",                     run:"gradle run",           test:"gradle test",     color:"7F52FF", logo:"kotlin",     sample:"println(\"Hello, World!\")" },
  swift:      { label:"Swift",         ext:".swift",  install:"swift package resolve",            run:"swift run",            test:"swift test",      color:"FA7343", logo:"swift",      sample:"print(\"Hello, World!\")" },
  dart:       { label:"Dart",          ext:".dart",   install:"dart pub get",                     run:"dart run main.dart",   test:"dart test",       color:"0175C2", logo:"dart",       sample:"print('Hello, World!');" },
  scala:      { label:"Scala",         ext:".scala",  install:"sbt update",                       run:"sbt run",              test:"sbt test",        color:"DC322F", logo:"scala",      sample:"println(\"Hello, World!\")" },
  r:          { label:"R",             ext:".r",      install:"Rscript install.R",                run:"Rscript main.R",       test:"testthat::test_dir('tests')", color:"276DC3", logo:"r", sample:"cat(\"Hello, World!\\n\")" },
  elixir:     { label:"Elixir",        ext:".ex",     install:"mix deps.get",                     run:"mix run",              test:"mix test",        color:"4B275F", logo:"elixir",     sample:"IO.puts \"Hello, World!\"" },
  haskell:    { label:"Haskell",       ext:".hs",     install:"cabal install",                    run:"cabal run",            test:"cabal test",      color:"5D4F85", logo:"haskell",     sample:"main = putStrLn \"Hello, World!\"" },
  lua:        { label:"Lua",           ext:".lua",    install:"luarocks install dependencies",    run:"lua main.lua",         test:"busted",          color:"000080", logo:"lua",        sample:"print(\"Hello, World!\")" },
};

function buildProgReadme(opts) {
  const { projectName, language, description, author="your-username", license="MIT",
          features=[], prerequisites=[], envVars=[], githubUser="your-username",
          repoName, includeContributing=true, includeChangelog=false } = opts;
  const cfg = PROG_LANGS[language];
  const repo = repoName || projectName.toLowerCase().replace(/\s+/g,"-");
  const featureList = features.length
    ? features.map(f=>`- ${f}`).join("\n")
    : `- Core ${cfg.label} functionality\n- Easy to extend and configure\n- Comprehensive test coverage`;
  const prereqList = prerequisites.length
    ? prerequisites.map(p=>`- ${p}`).join("\n")
    : `- ${cfg.label} installed\n- Git`;
  const envBlock = envVars.length
    ? `\n## Environment Variables\n\nCreate a \`.env\` file:\n\n\`\`\`env\n${envVars.map(e=>`${e}=value`).join("\n")}\n\`\`\`\n`
    : "";
  const contribBlock = includeContributing ? `
## Contributing

1. Fork the repo
2. Create your feature branch (\`git checkout -b feature/my-feature\`)
3. Commit your changes (\`git commit -m 'Add my feature'\`)
4. Push to the branch (\`git push origin feature/my-feature\`)
5. Open a Pull Request
` : "";
  const changelogBlock = includeChangelog ? `
## Changelog

### [1.0.0] - ${new Date().toISOString().split("T")[0]}
- Initial release
` : "";

  return `# ${projectName}

![${cfg.label}](https://img.shields.io/badge/${cfg.label.replace(/ /g,"_")}-${cfg.color}?style=for-the-badge&logo=${cfg.logo}&logoColor=white)
![License](https://img.shields.io/badge/License-${license}-green?style=for-the-badge)

> ${description || `A ${cfg.label} project.`}

---

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)${envVars.length?"\n- [Environment Variables](#environment-variables)":""}${includeContributing?"\n- [Contributing](#contributing)":""}${includeChangelog?"\n- [Changelog](#changelog)":""}
- [License](#license)

---

## Features

${featureList}

---

## Prerequisites

${prereqList}

---

## Installation

\`\`\`bash
git clone https://github.com/${githubUser}/${repo}.git
cd ${repo}
${cfg.install}
\`\`\`
${envBlock}
---

## Usage

\`\`\`bash
# Run the project
${cfg.run}

# Run tests
${cfg.test}
\`\`\`

### Example

\`\`\`${language === "csharp" ? "csharp" : language}
${cfg.sample}
\`\`\`

---

## Project Structure

\`\`\`
${repo}/
├── src/
│   └── main${cfg.ext}
├── tests/
│   └── test_main${cfg.ext}
└── README.md
\`\`\`

---
${contribBlock}${changelogBlock}
## License

This project is licensed under the **${license} License** — see [LICENSE](LICENSE) for details.

---

*Made with ❤️ by [${author}](https://github.com/${githubUser})*
`;
}

// ═══════════════════════════════════════════════════════════════════
//  SPOKEN LANGUAGES
// ═══════════════════════════════════════════════════════════════════
const SPOKEN_LANGS = {
  en: { name:"English",                dir:"ltr", s:{ title:"Overview", features:"Features", install:"Installation", usage:"Usage", contrib:"Contributing", license:"License", contribText:"Contributions are welcome! Please open an issue or submit a pull request.", licenseText:l=>`This project is licensed under the ${l} License.` } },
  es: { name:"Spanish (Español)",      dir:"ltr", s:{ title:"Descripción", features:"Características", install:"Instalación", usage:"Uso", contrib:"Contribuciones", license:"Licencia", contribText:"¡Las contribuciones son bienvenidas! Abre un issue o envía un pull request.", licenseText:l=>`Este proyecto está bajo la Licencia ${l}.` } },
  fr: { name:"French (Français)",      dir:"ltr", s:{ title:"Présentation", features:"Fonctionnalités", install:"Installation", usage:"Utilisation", contrib:"Contributions", license:"Licence", contribText:"Les contributions sont les bienvenues !", licenseText:l=>`Ce projet est sous licence ${l}.` } },
  de: { name:"German (Deutsch)",       dir:"ltr", s:{ title:"Übersicht", features:"Funktionen", install:"Installation", usage:"Verwendung", contrib:"Mitwirken", license:"Lizenz", contribText:"Beiträge sind willkommen!", licenseText:l=>`Dieses Projekt steht unter der ${l}-Lizenz.` } },
  zh: { name:"Chinese Simplified (中文)",dir:"ltr",s:{ title:"概述", features:"功能", install:"安装", usage:"使用", contrib:"贡献", license:"许可证", contribText:"欢迎贡献！", licenseText:l=>`本项目基于 ${l} 许可证。` } },
  ja: { name:"Japanese (日本語)",       dir:"ltr", s:{ title:"概要", features:"機能", install:"インストール", usage:"使い方", contrib:"コントリビューション", license:"ライセンス", contribText:"コントリビューションを歓迎します！", licenseText:l=>`このプロジェクトは ${l} ライセンスです。` } },
  ko: { name:"Korean (한국어)",          dir:"ltr", s:{ title:"개요", features:"기능", install:"설치", usage:"사용법", contrib:"기여", license:"라이선스", contribText:"기여를 환영합니다!", licenseText:l=>`이 프로젝트는 ${l} 라이선스입니다.` } },
  pt: { name:"Portuguese (Português)", dir:"ltr", s:{ title:"Visão Geral", features:"Funcionalidades", install:"Instalação", usage:"Uso", contrib:"Contribuindo", license:"Licença", contribText:"Contribuições são bem-vindas!", licenseText:l=>`Este projeto está sob a licença ${l}.` } },
  hi: { name:"Hindi (हिंदी)",            dir:"ltr", s:{ title:"अवलोकन", features:"विशेषताएं", install:"इंस्टॉलेशन", usage:"उपयोग", contrib:"योगदान", license:"लाइसेंस", contribText:"योगदान का स्वागत है!", licenseText:l=>`यह प्रोजेक्ट ${l} लाइसेंस के तहत है।` } },
  ar: { name:"Arabic (العربية)",        dir:"rtl", s:{ title:"نظرة عامة", features:"الميزات", install:"التثبيت", usage:"الاستخدام", contrib:"المساهمة", license:"الترخيص", contribText:"المساهمات مرحب بها!", licenseText:l=>`هذا المشروع مرخص بموجب ${l}.` } },
  ru: { name:"Russian (Русский)",       dir:"ltr", s:{ title:"Обзор", features:"Функции", install:"Установка", usage:"Использование", contrib:"Вклад", license:"Лицензия", contribText:"Мы рады вкладу!", licenseText:l=>`Проект лицензирован под ${l}.` } },
  it: { name:"Italian (Italiano)",     dir:"ltr", s:{ title:"Panoramica", features:"Funzionalità", install:"Installazione", usage:"Utilizzo", contrib:"Contribuire", license:"Licenza", contribText:"I contributi sono benvenuti!", licenseText:l=>`Questo progetto è sotto licenza ${l}.` } },
  nl: { name:"Dutch (Nederlands)",     dir:"ltr", s:{ title:"Overzicht", features:"Functies", install:"Installatie", usage:"Gebruik", contrib:"Bijdragen", license:"Licentie", contribText:"Bijdragen zijn welkom!", licenseText:l=>`Dit project valt onder de ${l}-licentie.` } },
  tr: { name:"Turkish (Türkçe)",        dir:"ltr", s:{ title:"Genel Bakış", features:"Özellikler", install:"Kurulum", usage:"Kullanım", contrib:"Katkı", license:"Lisans", contribText:"Katkılar memnuniyetle karşılanır!", licenseText:l=>`Bu proje ${l} lisansı altındadır.` } },
  pl: { name:"Polish (Polski)",         dir:"ltr", s:{ title:"Przegląd", features:"Funkcje", install:"Instalacja", usage:"Użycie", contrib:"Współpraca", license:"Licencja", contribText:"Wkład jest mile widziany!", licenseText:l=>`Ten projekt jest objęty licencją ${l}.` } },
};

function buildSpokenReadme(opts, langCode) {
  const { projectName, description="A great project.", license="MIT",
          features=[], author="your-username", runCmd="npm start" } = opts;
  const L = SPOKEN_LANGS[langCode].s;
  const featureList = features.length
    ? features.map(f=>`- ${f}`).join("\n")
    : `- Feature one\n- Feature two\n- Feature three`;
  return `# ${projectName}

> ${description}

## ${L.title}

${description}

## ${L.features}

${featureList}

## ${L.install}

\`\`\`bash
git clone <repo-url>
cd ${projectName.toLowerCase().replace(/\s+/g,"-")}
npm install
\`\`\`

## ${L.usage}

\`\`\`bash
${runCmd}
\`\`\`

## ${L.contrib}

${L.contribText}

## ${L.license}

${L.licenseText(license)}
`;
}

// ═══════════════════════════════════════════════════════════════════
//  ROUTES
// ═══════════════════════════════════════════════════════════════════

// Root — API index
app.get("/", (req, res) => {
  res.json({
    name: "README Generator API",
    version: "4.0.0",
    description: "Generate professional README files for any programming language or in any spoken language.",
    routes: {
      "GET  /languages/programming": "List all supported programming languages (18 total)",
      "GET  /languages/spoken":      "List all supported spoken languages (15 total)",
      "POST /generate/programming":  "Generate README for a programming language",
      "POST /generate/spoken":       "Generate README in a spoken language",
      "GET  /generate/programming?language=python&projectName=MyApp": "Quick GET for programming lang README",
      "GET  /generate/spoken?language=es&projectName=MyApp": "Quick GET for spoken lang README",
      "POST /generate/bulk":         "Generate README in multiple spoken languages at once",
      "POST /generate/all-spoken":   "Generate README in all 15 spoken languages",
    },
    supportedProgrammingLanguages: Object.keys(PROG_LANGS),
    supportedSpokenLanguages: Object.keys(SPOKEN_LANGS),
  });
});

// List programming languages
app.get("/languages/programming", (req, res) => {
  const list = Object.entries(PROG_LANGS).map(([id, c]) => ({
    id, label: c.label, extension: c.ext, runCommand: c.run, testCommand: c.test,
  }));
  res.json({ success:true, count:list.length, languages:list });
});

// List spoken languages
app.get("/languages/spoken", (req, res) => {
  const list = Object.entries(SPOKEN_LANGS).map(([code, c]) => ({
    code, name:c.name, direction:c.dir,
  }));
  res.json({ success:true, count:list.length, languages:list });
});

// POST /generate/programming
app.post("/generate/programming", (req, res) => {
  const { language, projectName, save=false, ...rest } = req.body;
  if (!projectName) return res.status(400).json({ success:false, error:"`projectName` is required." });
  if (!language)    return res.status(400).json({ success:false, error:"`language` is required." });
  const lang = language.toLowerCase();
  if (!PROG_LANGS[lang]) return res.status(400).json({ success:false, error:`Unknown programming language "${language}". Supported: ${Object.keys(PROG_LANGS).join(", ")}` });
  const readme = buildProgReadme({ language:lang, projectName, ...rest });
  if (save) {
    const fname = `${projectName.replace(/\s+/g,"-")}_${lang}_README.md`;
    fs.writeFileSync(path.join(OUTPUT_DIR, fname), readme);
  }
  res.json({ success:true, language:PROG_LANGS[lang].label, projectName, charCount:readme.length, lineCount:readme.split("\n").length, readme });
});

// POST /generate/spoken
app.post("/generate/spoken", (req, res) => {
  const { language, projectName, save=false, ...rest } = req.body;
  if (!projectName) return res.status(400).json({ success:false, error:"`projectName` is required." });
  if (!language)    return res.status(400).json({ success:false, error:"`language` is required." });
  const lang = language.toLowerCase();
  if (!SPOKEN_LANGS[lang]) return res.status(400).json({ success:false, error:`Unknown spoken language "${language}". Supported: ${Object.keys(SPOKEN_LANGS).join(", ")}` });
  const readme = buildSpokenReadme({ projectName, ...rest }, lang);
  if (save) {
    const fname = `${projectName.replace(/\s+/g,"-")}_${lang}_README.md`;
    fs.writeFileSync(path.join(OUTPUT_DIR, fname), readme);
  }
  res.json({ success:true, language:SPOKEN_LANGS[lang].name, languageCode:lang, projectName, charCount:readme.length, lineCount:readme.split("\n").length, readme });
});

// GET /generate/programming (quick)
app.get("/generate/programming", (req, res) => {
  const { language="python", projectName="MyProject", description, author, license, githubUser, raw } = req.query;
  const lang = language.toLowerCase();
  if (!PROG_LANGS[lang]) return res.status(400).json({ success:false, error:`Unknown programming language "${language}".` });
  const readme = buildProgReadme({ language:lang, projectName, description, author, license, githubUser });
  if (raw === "1" || raw === "true") return res.type("text/plain").send(readme);
  res.json({ success:true, language:PROG_LANGS[lang].label, projectName, readme });
});

// GET /generate/spoken (quick)
app.get("/generate/spoken", (req, res) => {
  const { language="en", projectName="MyProject", description, license, author, runCmd, raw } = req.query;
  const lang = language.toLowerCase();
  if (!SPOKEN_LANGS[lang]) return res.status(400).json({ success:false, error:`Unknown spoken language "${language}".` });
  const readme = buildSpokenReadme({ projectName, description, license, author, runCmd }, lang);
  if (raw === "1" || raw === "true") return res.type("text/plain").send(readme);
  res.json({ success:true, language:SPOKEN_LANGS[lang].name, projectName, readme });
});

// POST /generate/bulk — spoken language bulk
app.post("/generate/bulk", (req, res) => {
  const { languages=[], projectName, save=false, ...rest } = req.body;
  if (!projectName) return res.status(400).json({ success:false, error:"`projectName` is required." });
  if (!languages.length) return res.status(400).json({ success:false, error:"`languages` array is required." });
  const results = {};
  const errors = [];
  languages.forEach(lang => {
    const code = lang.toLowerCase();
    if (!SPOKEN_LANGS[code]) { errors.push(`Unknown language: ${lang}`); return; }
    const readme = buildSpokenReadme({ projectName, ...rest }, code);
    if (save) {
      const fname = `${projectName.replace(/\s+/g,"-")}_${code}_README.md`;
      fs.writeFileSync(path.join(OUTPUT_DIR, fname), readme);
    }
    results[code] = { language:SPOKEN_LANGS[code].name, readme, charCount:readme.length };
  });
  res.json({ success:true, projectName, generated:Object.keys(results).length, errors, results });
});

// POST /generate/all-spoken
app.post("/generate/all-spoken", (req, res) => {
  const { projectName, save=false, ...rest } = req.body;
  if (!projectName) return res.status(400).json({ success:false, error:"`projectName` is required." });
  const results = {};
  Object.keys(SPOKEN_LANGS).forEach(code => {
    const readme = buildSpokenReadme({ projectName, ...rest }, code);
    if (save) {
      const fname = `${projectName.replace(/\s+/g,"-")}_${code}_README.md`;
      fs.writeFileSync(path.join(OUTPUT_DIR, fname), readme);
    }
    results[code] = { language:SPOKEN_LANGS[code].name, readme, charCount:readme.length };
  });
  res.json({ success:true, projectName, generated:Object.keys(results).length, results });
});

// ─── Start ─────────────────────────────────────────────────────────
const PORT = 3456;
app.listen(PORT, () => {
  console.log(`README Generator API v4.0.0 running on http://localhost:${PORT}`);
});
