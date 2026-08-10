import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

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
      company = 'TechCorp Inc.',
      division = 'Engineering',
      role = 'Software Engineer (Backend)',
      university = '',
      major = '',
      gpa = 3.8,
      languages = [],
      certifications = [],
      projects = [],
      selfIntro = '',
    } = req.body;

    const ai = getGeminiAI();

    if (ai) {
      try {
        const prompt = `
You are Nexus Career AI, a strict, cold, objective expert recruitment analyst for top Korean corporate conglomerates (Samsung, SK Hynix, Hyundai, LG, Kakao, NAVER, etc.).
CRITICAL REQUIREMENT: All evaluation output, titles, summary quotes, insights, descriptions, and recommendations MUST be written in fluent, professional KOREAN (한국어).

CRITICAL EVALUATION PHILOSOPHY: You MUST evaluate strictly, realistically, and objectively ('냉철하고 현실적인 냉정한 평가'). Do NOT give artificially inflated scores.
- Average/basic candidates (e.g. GPA < 3.5, 0 certifications, basic language, short self-intro) SHOULD receive 25% ~ 48% probability and "보완 필요" or "보통".
- Missing certifications, missing or short self-introductions (< 400 chars), low GPA (< 3.3), or lack of practical project/internship experience MUST be heavily penalized with specific risk warnings.
- Candidates with GPA >= 3.7, OPIc IH/AL, 2+ relevant projects/internships, and certifications should receive 60% ~ 75% ("높음").
- Only exceptional candidates (GPA 4.0+, top tier language, major lab/intern experience, certifications, detailed self-intro) should receive >80% ("매우 높음").

Analyze the following candidate profile:
Company: ${company}
Division: ${division}
Role: ${role}

Academic:
- University: ${university || '미입력'}
- Major: ${major || '전공'}
- GPA: ${gpa} / 4.5

Languages:
${JSON.stringify(languages, null, 2)}

Certifications:
${JSON.stringify(certifications, null, 2)}

Major Projects / Internships:
${JSON.stringify(projects, null, 2)}

Self Introduction (${selfIntro.length} characters):
"${selfIntro || '자기소개서 미입력'}"

Generate a strict evaluation in Korean with:
1. Overall success probability (percentage integer 15-92%)
2. Alignment level ("매우 높음", "높음", "보통", 또는 "보완 필요")
3. Honest, objective summary quote in Korean highlighting both strengths and realistic bottlenecks.
4. Radar chart comparison scores (0 to 100) for GPA, Language, Experience, Certificates, ResumeScore for candidate ("mySpecs") and top 10% passers ("avgPassers").
5. Key insight explanation about the radar chart comparison in Korean, pointing out specs needing improvement.
6. Core Strengths (2-3 items with title and description in Korean).
7. Strength Hashtags (2-3 Korean tags, e.g., "#백엔드아키텍처", "#실무경험").
8. Areas for Optimization in Korean (2-3 actionable points with title, description, and exact probability impact, e.g., "+6%").
9. Recommended Study Resources (2-3 items in Korean).
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
                level: { type: Type.STRING, description: 'High, Moderate, or Low' },
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
    const gpaNormalized = Math.min(100, Math.round((numGpa / 4.5) * 100));
    const langCount = Array.isArray(languages) ? languages.length : 0;
    const certCount = Array.isArray(certifications) ? certifications.length : 0;
    const projCount = Array.isArray(projects) ? projects.length : 0;
    const introLen = (selfIntro || '').length;

    // Strict baseline calculation
    let baseProb = 30; // Objective starting base for top conglomerates

    if (numGpa >= 4.0) baseProb += 12;
    else if (numGpa >= 3.6) baseProb += 8;
    else if (numGpa >= 3.2) baseProb += 3;
    else baseProb -= 10;

    if (langCount >= 2) baseProb += 10;
    else if (langCount === 1) baseProb += 4;
    else baseProb -= 10;

    if (certCount >= 2) baseProb += 10;
    else if (certCount === 1) baseProb += 4;
    else baseProb -= 10; // Penalty for missing certifications

    if (projCount >= 3) baseProb += 16;
    else if (projCount >= 1) baseProb += 8;
    else baseProb -= 12; // Penalty for lack of project experience

    if (introLen > 800) baseProb += 12;
    else if (introLen > 400) baseProb += 5;
    else if (introLen < 200) baseProb -= 15;

    const probability = Math.min(88, Math.max(18, baseProb));
    const level = probability >= 75 ? '매우 높음' : probability >= 60 ? '높음' : probability >= 45 ? '보통' : '보완 필요';

    const result = {
      probability,
      level,
      summaryQuote: probability >= 60
        ? `"${company} ${role} 직무 지원자 중 경쟁력 있는 수준이나, 대기업 합격 안정권 진입을 위해 직무 자격증 및 수치화된 성과 보완이 요구됩니다."`
        : `"${company} ${role} 합격을 위해서는 자격증, 공인 어학 및 자기소개서 내용의 정밀한 스펙 강화가 시급히 필요합니다."`,
      radar: {
        mySpecs: {
          gpa: gpaNormalized,
          language: Math.min(100, Math.max(20, langCount * 38)),
          experience: Math.min(100, Math.max(20, projCount * 32)),
          certificates: Math.min(100, Math.max(15, certCount * 35)),
          resumeScore: Math.min(100, Math.max(20, Math.floor(introLen / 12))),
        },
        avgPassers: {
          gpa: 82,
          language: 80,
          experience: 72,
          certificates: 65,
          resumeScore: 80,
        },
      },
      radarInsight: certCount === 0 || projCount === 0
        ? `핵심 스펙 요소(자격증 및 실무 경험)의 미비로 인해 ${company} 평균 합격자 대비 서류 통과 위험도가 존재합니다.`
        : `실무 프로젝트 이력이 존재하나, 공인 자격증 및 서류 완성도를 추가 보완 시 합격 확률이 대폭 향상됩니다.`,
      coreStrengths: [
        {
          title: '학업 및 기초 전공 성취도',
          description: `전공 학점 ${numGpa}/4.5 로 ${company} ${division} 지원을 위한 базо 기초 지식을 보유함.`,
        },
        {
          title: '실무 프로젝트 수행 경험',
          description: projCount > 0
            ? `${projCount}건의 관련 프로젝트 경험을 통해 직무 연관성을 입증했습니다.`
            : '전공 지식을 바탕으로 한 실무 적용 사례 작성이 추가로 필요합니다.',
        },
      ],
      strengthTags: [
        `#${division.replace(/\s+/g, '')}`,
        '#직무적합도',
        '#냉정진단',
      ],
      areasForOptimization: [
        {
          title: certCount === 0 ? '공인 직무 자격증 취득 필수' : '전문 자격증 추가 확보',
          description: certCount === 0
            ? `${company} 합격자의 70% 이상이 직무 관련 공인 자격증(기사/클라우드 등)을 최소 1개 이상 보유하고 있습니다.`
            : '상위 등급 자격증 보유 시 서류 심사 가산점 확보가 가능합니다.',
          impact: '+8%',
        },
        {
          title: introLen < 500 ? '자기소개서 작성 분량 및 구체성 보완' : '자기소개서 수치화 및 STAR 기법 적용',
          description: introLen < 500
            ? '자기소개서 분량이 부족하여 서류 평가 시 감점 요인이 될 수 있습니다. 구체적 성과 중심으로 최소 800자 이상 작성을 권장합니다.'
            : '프로젝트 성과를 정량 수치(% 및 백엔드 지표)로 표현 시 서류 평가 점수가 상승합니다.',
          impact: '+6%',
        },
      ],
      studyResources: [
        {
          title: `${company} 최신 채용 트렌드 및 기출 분석집`,
          category: '기출족보',
          url: '#',
        },
        {
          title: 'AWS / GCP 클라우드 자격증 핵심 대비 키트',
          category: '자격증',
          url: '#',
        },
        {
          title: 'STAR 기법 기반 자기소개서 및 면접 완성 가이드',
          category: '면접가이드',
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
