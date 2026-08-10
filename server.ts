import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import { calculateRealisticProbability, COMPANY_CONFIGS } from './src/data/companyData.js';

const app = express();
const PORT = 3000;

app.use(express.json());

// Server-side Gemini AI setup
function getGeminiAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Health check route
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// AI Analysis Endpoint
app.post('/api/analyze', async (req, res) => {
  try {
    const {
      company = '삼성전자',
      division = '메모리사업부',
      role = 'SW개발',
      university = '',
      major = '',
      gpa = 3.5,
      languages = [],
      certifications = [],
      projects = [],
      selfIntro = '',
    } = req.body;

    const companyConfig = COMPANY_CONFIGS[company] || COMPANY_CONFIGS['TechCorp Inc.'];
    const bench = companyConfig.benchmark;

    // Run deterministic realistic calculator
    const realisticCalc = calculateRealisticProbability({
      company,
      division,
      role,
      gpa,
      languages,
      certifications,
      projects,
      selfIntro,
    });

    const ai = getGeminiAI();

    if (ai) {
      try {
        const prompt = `
You are Nexus Career AI, a strict, cold, objective recruitment analyst for top Korean corporate conglomerates.
TARGET COMPANY BENCHMARK DATA:
Company: ${company} (${companyConfig.name})
Division: ${division}
Role: ${role}
Target Company Passer Benchmark:
- Top 10% Passers Avg GPA: ${bench.avgGpa} / 4.5
- Required Language Benchmark: ${bench.reqLanguageText}
- Required Certifications: ${bench.reqCertCount} item(s) (Preferred: ${bench.preferredCerts.join(', ')})
- Required Practical Projects: ${bench.reqProjectCount} item(s)
- Evaluation Focus Factor: ${bench.focusFactor}

Candidate Profile to Evaluate:
- University: ${university || '미입력'}
- Major: ${major || '전공'}
- GPA: ${gpa} / 4.5 (Target Avg: ${bench.avgGpa})
- Languages: ${JSON.stringify(languages, null, 2)}
- Certifications: ${JSON.stringify(certifications, null, 2)}
- Major Projects / Internships (${projects.length} items): ${JSON.stringify(projects, null, 2)}
- Self Intro Length: ${selfIntro.length} chars

EVALUATION RULES:
1. Compare candidate's specs strictly against ${company} ${division} ${role} passer standards.
2. If GPA < ${bench.avgGpa - 0.3}, or certifications are missing when required, or self-intro is under 400 chars, heavily penalize.
3. Realistic probability range should be calculated around baseline ${realisticCalc.calculatedProb}% (variance allowed ±5% based on self-intro quality).
4. All text MUST be written in fluent, professional KOREAN.
`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.6-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                probability: { type: Type.INTEGER, description: 'Percentage 0-100' },
                level: { type: Type.STRING, description: '매우 높음, 높음, 보통, 보완 필요' },
                summaryQuote: { type: Type.STRING },
                radar: {
                  type: Type.OBJECT,
                  properties: {
                    mySpecs: {
                      type: Type.OBJECT,
                      properties: {
                        gpa: { type: Type.INTEGER },
                        language: { type: Type.INTEGER },
                        experience: { type: Type.INTEGER },
                        certificates: { type: Type.INTEGER },
                        resumeScore: { type: Type.INTEGER },
                      },
                      required: ['gpa', 'language', 'experience', 'certificates', 'resumeScore'],
                    },
                    avgPassers: {
                      type: Type.OBJECT,
                      properties: {
                        gpa: { type: Type.INTEGER },
                        language: { type: Type.INTEGER },
                        experience: { type: Type.INTEGER },
                        certificates: { type: Type.INTEGER },
                        resumeScore: { type: Type.INTEGER },
                      },
                      required: ['gpa', 'language', 'experience', 'certificates', 'resumeScore'],
                    },
                  },
                  required: ['mySpecs', 'avgPassers'],
                },
                radarInsight: { type: Type.STRING },
                coreStrengths: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      title: { type: Type.STRING },
                      description: { type: Type.STRING },
                    },
                    required: ['title', 'description'],
                  },
                },
                strengthTags: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                areasForOptimization: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      title: { type: Type.STRING },
                      description: { type: Type.STRING },
                      impact: { type: Type.STRING },
                    },
                    required: ['title', 'description', 'impact'],
                  },
                },
                studyResources: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      title: { type: Type.STRING },
                      category: { type: Type.STRING },
                      url: { type: Type.STRING },
                    },
                    required: ['title', 'category'],
                  },
                },
              },
              required: [
                'probability',
                'level',
                'summaryQuote',
                'radar',
                'radarInsight',
                'coreStrengths',
                'strengthTags',
                'areasForOptimization',
              ],
            },
          },
        });

        if (response.text) {
          const parsed = JSON.parse(response.text.trim());
          return res.json({ success: true, result: parsed });
        }
      } catch (err) {
        console.warn('Gemini API call warning, using analytical engine fallback:', err);
      }
    }

    // Heuristic deterministic analyzer if API key is not present or failed
    const numGpa = parseFloat(gpa) || 3.5;
    const certCount = Array.isArray(certifications) ? certifications.length : 0;
    const projCount = Array.isArray(projects) ? projects.length : 0;
    const introLen = (selfIntro || '').length;

    const { calculatedProb, level, radar } = realisticCalc;

    const result = {
      probability: calculatedProb,
      level,
      summaryQuote: calculatedProb >= 75
        ? `"${company} [${division}] ${role} 직무 상위 합격자 평균 스펙을 상회하는 우수한 지표를 보여주고 있습니다."`
        : calculatedProb >= 60
        ? `"${company} [${division}] ${role} 지원자 중 경쟁력이 있으나, ${bench.reqLanguageText} 및 자격증 보완 시 합격 가능성이 한층 강화됩니다."`
        : `"${company} [${division}] ${role} 직무 합격을 위해서는 ${bench.reqCertCount > 0 ? '직무 관련 기사/클라우드 자격증' : '실무 프로젝트 경험'} 및 자기소개서 내용의 구체적 보완이 필요합니다."`,
      radar,
      radarInsight: certCount < bench.reqCertCount || projCount < bench.reqProjectCount
        ? `${company} 합격자 평균 기준 대비 자격증 또는 프로젝트 실무 경험 항목이 부족하여 서류 전형 감점 위험이 관측됩니다.`
        : `${company} [${division}] 합격자 벤치마크 대비 핵심 정량/정성 지표가 안정적 범위에 도출되었습니다.`,
      coreStrengths: [
        {
          title: `${company} ${role} 직무 적합도`,
          description: `학점(${numGpa}/4.5) 및 주요 전공 이수 지표가 ${company} [${division}] 채용 요구 조건에 부합합니다.`,
        },
        {
          title: '실무 프로젝트 및 경험 연관성',
          description: projCount > 0
            ? `${projCount}건의 관련 경험을 통해 ${role} 직무에 필요한 실무 역량을 작성했습니다.`
            : '목표 직무와 직결된 프로젝트 경험 및 정량적 성과 작성이 추가로 요구됩니다.',
        },
      ],
      strengthTags: [
        `#${company}`,
        `#${division.replace(/\s+/g, '')}`,
        `#${role.replace(/\s+/g, '')}`,
      ],
      areasForOptimization: [
        {
          title: certCount < bench.reqCertCount ? `${company} 우대 자격증(${bench.preferredCerts[0] || '기사'}) 취득` : '직무 전문성 자격 보완',
          description: `${company} ${role} 합격자 상당수가 ${bench.preferredCerts.join(', ')} 등의 자격증을 보유하고 있습니다.`,
          impact: '+8%',
        },
        {
          title: introLen < 600 ? '자기소개서 작성 수치화 및 분량 확대' : '자기소개서 성과 정량화',
          description: introLen < 600
            ? '자기소개서 분량이 다소 부족합니다. STAR 기법을 활용하여 성과 위주 800자 이상 작성을 권장합니다.'
            : '수행한 프로젝트의 구체적 성과(비율, 수치)를 강조하면 평가 점수가 상승합니다.',
          impact: '+6%',
        },
      ],
      studyResources: [
        {
          title: `${company} ${role} 합격자 스펙 및 최신 면접 기출집`,
          category: '기출분석',
          url: '#',
        },
        {
          title: `${company} 지원자를 위한 ${bench.preferredCerts[0] || '직무'} 자격증 대비 가이드`,
          category: '자격증',
          url: '#',
        },
        {
          title: 'STAR 기법 기반 자소서 정량화 및 직무 면접 노하우',
          category: '자소서',
          url: '#',
        },
      ],
    };

    return res.json({ success: true, result });
  } catch (error) {
    console.error('Error in /api/analyze:', error);
    res.status(500).json({ error: 'Internal server error analyzing resume.' });
  }
});

// Serve Vite frontend in dev vs static files in prod
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Nexus Career AI server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
