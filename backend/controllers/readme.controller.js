// ──────────────────────────────────────────────────────────────────────────────
// README Generator Controller
// Supports 10 languages: en, es, fr, de, zh, ja, pt, ar, hi, ru
// ──────────────────────────────────────────────────────────────────────────────

const buildContent = (project, sections) => {
  const { title, description, features, repoName, license } = project;
  const slug = repoName || title.toLowerCase().replace(/\s+/g, "-");
  const featureList = features && features.length ? features : sections.defaultFeatures;
  const lic = license || "MIT";

  return `# ${title}

## ${sections.overview}
${description || sections.defaultDescription}

## ${sections.features}
${featureList.map((f) => `- ${f}`).join("\n")}

## ${sections.installation}
\`\`\`bash
git clone https://github.com/your-username/${slug}.git
cd ${slug}
npm install
\`\`\`

## ${sections.usage}
\`\`\`bash
npm start
\`\`\`

## ${sections.contributing}
${sections.contributingText}

## ${sections.license}
${sections.licenseText(lic)}
`;
};

const TEMPLATES = {
  en: {
    name: "English",
    sections: {
      overview: "Overview",
      features: "Features",
      installation: "Installation",
      usage: "Usage",
      contributing: "Contributing",
      license: "License",
      defaultDescription: "A brief description of the project.",
      defaultFeatures: ["Feature 1", "Feature 2", "Feature 3"],
      contributingText: "Contributions are welcome! Please open an issue or submit a pull request.",
      licenseText: (lic) => `This project is licensed under the ${lic} License.`,
    },
  },
  es: {
    name: "Spanish",
    sections: {
      overview: "Descripción general",
      features: "Características",
      installation: "Instalación",
      usage: "Uso",
      contributing: "Contribuciones",
      license: "Licencia",
      defaultDescription: "Una breve descripción del proyecto.",
      defaultFeatures: ["Característica 1", "Característica 2", "Característica 3"],
      contributingText: "¡Las contribuciones son bienvenidas! Por favor, abre un issue o envía un pull request.",
      licenseText: (lic) => `Este proyecto está bajo la licencia ${lic}.`,
    },
  },
  fr: {
    name: "French",
    sections: {
      overview: "Présentation",
      features: "Fonctionnalités",
      installation: "Installation",
      usage: "Utilisation",
      contributing: "Contributions",
      license: "Licence",
      defaultDescription: "Une brève description du projet.",
      defaultFeatures: ["Fonctionnalité 1", "Fonctionnalité 2", "Fonctionnalité 3"],
      contributingText: "Les contributions sont les bienvenues ! Veuillez ouvrir une issue ou soumettre une pull request.",
      licenseText: (lic) => `Ce projet est sous licence ${lic}.`,
    },
  },
  de: {
    name: "German",
    sections: {
      overview: "Übersicht",
      features: "Funktionen",
      installation: "Installation",
      usage: "Verwendung",
      contributing: "Mitwirken",
      license: "Lizenz",
      defaultDescription: "Eine kurze Beschreibung des Projekts.",
      defaultFeatures: ["Funktion 1", "Funktion 2", "Funktion 3"],
      contributingText: "Beiträge sind willkommen! Bitte öffne ein Issue oder sende einen Pull Request.",
      licenseText: (lic) => `Dieses Projekt steht unter der ${lic}-Lizenz.`,
    },
  },
  zh: {
    name: "Chinese (Simplified)",
    sections: {
      overview: "项目概述",
      features: "功能特性",
      installation: "安装",
      usage: "使用方法",
      contributing: "贡献",
      license: "许可证",
      defaultDescription: "项目的简要描述。",
      defaultFeatures: ["功能 1", "功能 2", "功能 3"],
      contributingText: "欢迎贡献！请提交 Issue 或 Pull Request。",
      licenseText: (lic) => `本项目基于 ${lic} 许可证。`,
    },
  },
  ja: {
    name: "Japanese",
    sections: {
      overview: "概要",
      features: "機能",
      installation: "インストール",
      usage: "使い方",
      contributing: "コントリビューション",
      license: "ライセンス",
      defaultDescription: "プロジェクトの簡単な説明。",
      defaultFeatures: ["機能 1", "機能 2", "機能 3"],
      contributingText: "コントリビューションを歓迎します！Issue を開くか Pull Request を送ってください。",
      licenseText: (lic) => `このプロジェクトは ${lic} ライセンスの下に公開されています。`,
    },
  },
  pt: {
    name: "Portuguese",
    sections: {
      overview: "Visão Geral",
      features: "Funcionalidades",
      installation: "Instalação",
      usage: "Uso",
      contributing: "Contribuições",
      license: "Licença",
      defaultDescription: "Uma breve descrição do projeto.",
      defaultFeatures: ["Funcionalidade 1", "Funcionalidade 2", "Funcionalidade 3"],
      contributingText: "Contribuições são bem-vindas! Abra uma issue ou envie um pull request.",
      licenseText: (lic) => `Este projeto está licenciado sob a licença ${lic}.`,
    },
  },
  ar: {
    name: "Arabic",
    sections: {
      overview: "نظرة عامة",
      features: "الميزات",
      installation: "التثبيت",
      usage: "الاستخدام",
      contributing: "المساهمة",
      license: "الرخصة",
      defaultDescription: "وصف مختصر للمشروع.",
      defaultFeatures: ["الميزة 1", "الميزة 2", "الميزة 3"],
      contributingText: "المساهمات مرحب بها! يرجى فتح issue أو إرسال pull request.",
      licenseText: (lic) => `هذا المشروع مرخص بموجب رخصة ${lic}.`,
    },
  },
  hi: {
    name: "Hindi",
    sections: {
      overview: "अवलोकन",
      features: "विशेषताएं",
      installation: "इंस्टॉलेशन",
      usage: "उपयोग",
      contributing: "योगदान",
      license: "लाइसेंस",
      defaultDescription: "प्रोजेक्ट का संक्षिप्त विवरण।",
      defaultFeatures: ["विशेषता 1", "विशेषता 2", "विशेषता 3"],
      contributingText: "योगदान स्वागत योग्य है! कृपया एक issue खोलें या pull request सबमिट करें।",
      licenseText: (lic) => `यह प्रोजेक्ट ${lic} लाइसेंस के अंतर्गत है।`,
    },
  },
  ru: {
    name: "Russian",
    sections: {
      overview: "Обзор",
      features: "Возможности",
      installation: "Установка",
      usage: "Использование",
      contributing: "Участие в разработке",
      license: "Лицензия",
      defaultDescription: "Краткое описание проекта.",
      defaultFeatures: ["Возможность 1", "Возможность 2", "Возможность 3"],
      contributingText: "Вклад приветствуется! Пожалуйста, откройте issue или отправьте pull request.",
      licenseText: (lic) => `Этот проект распространяется под лицензией ${lic}.`,
    },
  },
};

// GET /api/readme/languages
export const getLanguages = (req, res) => {
  const languages = Object.entries(TEMPLATES).map(([code, lang]) => ({
    code,
    name: lang.name,
  }));
  res.json({ success: true, count: languages.length, languages });
};

// POST /api/readme/generate  — single language
export const generateReadme = (req, res) => {
  try {
    const { language, title, description, features, repoName, license } = req.body;

    if (!language) {
      return res.status(400).json({
        success: false,
        message:
          'The "language" field is required. Call GET /api/readme/languages for supported codes.',
      });
    }
    if (!title) {
      return res.status(400).json({ success: false, message: 'The "title" field is required.' });
    }

    const code = language.toLowerCase();
    const template = TEMPLATES[code];

    if (!template) {
      return res.status(400).json({
        success: false,
        message: `Unsupported language code: "${language}".`,
        supportedCodes: Object.keys(TEMPLATES),
      });
    }

    const content = buildContent(
      { title, description, features, repoName, license },
      template.sections
    );

    res.status(200).json({
      success: true,
      language: { code, name: template.name },
      filename: `README_${code}.md`,
      content,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/readme/generate-all  — all languages at once
export const generateAllReadmes = (req, res) => {
  try {
    const { title, description, features, repoName, license } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, message: 'The "title" field is required.' });
    }

    const project = { title, description, features, repoName, license };
    const readmes = Object.entries(TEMPLATES).map(([code, lang]) => ({
      language: { code, name: lang.name },
      filename: `README_${code}.md`,
      content: buildContent(project, lang.sections),
    }));

    res.status(200).json({ success: true, count: readmes.length, readmes });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
