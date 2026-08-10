export interface CompanyConfig {
  id: string;
  name: string;
  divisions: string[];
  roles: string[];
  benchmark: {
    avgGpa: number; // 4.5 기준 합격자 평균 학점
    reqLanguageScore: number; // 어학 지수 (0~100)
    reqLanguageText: string;
    reqCertCount: number; // 권장 자격증 개수
    reqProjectCount: number; // 권장 실무/프로젝트 개수
    preferredCerts: string[]; // 우대 자격증 키워드
    difficultyWeight: number; // 합격 난이도 가중치 (기본 1.0)
    focusFactor: 'experience' | 'gpa' | 'balanced' | 'cert_language'; // 핵심 평가 요소
  };
}

export const COMPANY_CONFIGS: Record<string, CompanyConfig> = {
  '삼성전자': {
    id: 'samsung',
    name: '삼성전자 (Samsung Electronics)',
    divisions: [
      '메모리사업부',
      '파운드리사업부',
      'System LSI사업부',
      'MX사업부 (모바일)',
      'VD사업부 (디스플레이)',
      'SAIT (종합기술원)',
      'DA사업부 (생활가전)',
      '경영지원실',
    ],
    roles: [
      'SW개발 (백엔드/임베디드)',
      '회로설계 / 반도체설계',
      '반도체 공정기술 / 설비기술',
      'AI / 데이터 알고리즘',
      '품질관리 / 신뢰성성',
      '영업마케팅 / 경영지원',
    ],
    benchmark: {
      avgGpa: 3.75,
      reqLanguageScore: 80,
      reqLanguageText: 'OPIc IH 이상 / TOEIC 850+',
      reqCertCount: 1,
      reqProjectCount: 2,
      preferredCerts: ['정보처리기사', 'ADsP', 'SQLD', '무선설비기사'],
      difficultyWeight: 1.1,
      focusFactor: 'balanced',
    },
  },
  'SK하이닉스': {
    id: 'sk_hynix',
    name: 'SK하이닉스 (SK Hynix)',
    divisions: [
      'DRAM개발담당',
      'NAND개발담당',
      '제조/기술담당',
      'AI Infra (HBM개발)',
      'P&T (Package & Test)',
      'R&D공정연구소',
    ],
    roles: [
      '소자 / 설계를 위한 SW개발',
      '반도체 공정 (Photo/Etch/ThinFilm)',
      '제품(DRAM/NAND/HBM) 테스트 및 수율개선',
      '패키징 기설 개발',
      'AI 기반 품질/수율 데이터 분석',
    ],
    benchmark: {
      avgGpa: 3.80,
      reqLanguageScore: 82,
      reqLanguageText: 'OPIc IH/AL / TOEIC 880+',
      reqCertCount: 1,
      reqProjectCount: 2,
      preferredCerts: ['정보처리기사', '반도체장비유지보수', 'ADsP'],
      difficultyWeight: 1.15,
      focusFactor: 'gpa',
    },
  },
  '현대자동차': {
    id: 'hyundai',
    name: '현대자동차 (Hyundai Motor)',
    divisions: [
      'AVP본부 (자율주행/SW)',
      'R&D본부 (차량개발)',
      '제조/생산기술본부',
      '구매 / 공급망관리(SCM)',
      '국내/해외 영업마케팅',
      '경영지원본부',
    ],
    roles: [
      '자율주행 SW & ROS2 개발',
      '차량 제어 알고리즘 (C++/C)',
      '파워트레인 / 전동화 제어',
      '샤시/바디 설계 및 해석',
      '생산기술 및 스마트팩토리',
      '국내/글로벌 마케팅 기획',
    ],
    benchmark: {
      avgGpa: 3.70,
      reqLanguageScore: 78,
      reqLanguageText: 'TOEIC Speaking AL(160) / OPIc IH',
      reqCertCount: 2,
      reqProjectCount: 2,
      preferredCerts: ['자동차정비기사', '정보처리기사', '일반기계기사', 'AUTOSAR'],
      difficultyWeight: 1.08,
      focusFactor: 'experience',
    },
  },
  'LG전자': {
    id: 'lg_electronics',
    name: 'LG전자 (LG Electronics)',
    divisions: [
      'H&A사업본부 (가전)',
      'HE사업본부 (TV/webOS)',
      'VS사업본부 (전장부품)',
      'BS사업본부 (B2B솔루션)',
      'CTO부문 (인공지능연구소)',
    ],
    roles: [
      'webOS 플랫폼 SW 개발',
      '전장 ECU 제어 SW (AUTOSAR)',
      'AI/Vision 알고리즘 엔지니어',
      'H/W 회로설계 및 기구설계',
      '가전 스마트홈 IoT 개발',
    ],
    benchmark: {
      avgGpa: 3.65,
      reqLanguageScore: 75,
      reqLanguageText: 'TOEIC 820+ / OPIc IM3+',
      reqCertCount: 1,
      reqProjectCount: 2,
      preferredCerts: ['정보처리기사', '전자기사', 'AWS Architect'],
      difficultyWeight: 1.05,
      focusFactor: 'balanced',
    },
  },
  'LG에너지솔루션': {
    id: 'lg_ensol',
    name: 'LG에너지솔루션 (LG Energy Solution)',
    divisions: [
      '배터리 연구소',
      '개발센터 (셀/팩개발)',
      '글로벌 생산기술센터',
      '품질보증센터',
      '경영전략 / SCM',
    ],
    roles: [
      '배터리 셀(Cell) 설계를 위한 화학 R&D',
      'BMS (배터리 관리시스템) SW 개발',
      '배터리 공정 및 스마트팩토리 엔지니어',
      '배터리 안전성/신뢰성 평가',
    ],
    benchmark: {
      avgGpa: 3.72,
      reqLanguageScore: 80,
      reqLanguageText: 'OPIc IH 이상 / TOEIC 850+',
      reqCertCount: 1,
      reqProjectCount: 2,
      preferredCerts: ['화학분석기사', '정보처리기사', '위험물산업기사'],
      difficultyWeight: 1.1,
      focusFactor: 'cert_language',
    },
  },
  '네이버': {
    id: 'naver',
    name: '네이버 (NAVER)',
    divisions: [
      'Search CIC (검색)',
      'Commerce CIC (쇼핑)',
      'Clova / HyperCLOVA AI',
      'NAVER Cloud Platforms',
      'Webtoon / Content CIC',
    ],
    roles: [
      'Search & AI 플랫폼 엔지니어',
      '백엔드 / 분산시스템 개발자',
      '프론트엔드 (React/Next.js) 엔지니어',
      '데이터 엔지니어 / Vector DB',
      '서비스 기획 / Product Owner',
    ],
    benchmark: {
      avgGpa: 3.50,
      reqLanguageScore: 70,
      reqLanguageText: 'OPIc IM2 이상 (어학보다 코딩/프로젝트 비중 극대)',
      reqCertCount: 0,
      reqProjectCount: 3,
      preferredCerts: ['AWS Certified', 'CKA (Kubernetes)', 'SQLD'],
      difficultyWeight: 1.25,
      focusFactor: 'experience',
    },
  },
  '카카오': {
    id: 'kakao',
    name: '카카오 (Kakao)',
    divisions: [
      '플랫폼기술그룹',
      '카카오톡 서비스개발팀',
      'AI R&D 센터 (Kana)',
      'Commerce Tech',
      'Infra & SRE 센터',
    ],
    roles: [
      '카카오톡 대용량 서버 / 백엔드 개발자',
      'iOS / Android 모바일 앱 개발자',
      'AI 서비스 / NLP 엔지니어',
      '인프라 / SRE / DevOps 엔지니어',
      '데이터 플랫폼 개발자',
    ],
    benchmark: {
      avgGpa: 3.45,
      reqLanguageScore: 70,
      reqLanguageText: '어학 제한 없음 (오직 코딩테스트 및 프로젝트 실무)',
      reqCertCount: 0,
      reqProjectCount: 3,
      preferredCerts: ['AWS Certified', '정보처리기사'],
      difficultyWeight: 1.2,
      focusFactor: 'experience',
    },
  },
  '현대모비스': {
    id: 'mobis',
    name: '현대모비스 (Hyundai Mobis)',
    divisions: [
      '전동화BU',
      '자율주행BU',
      'IVI BU (인포테인먼트)',
      '연구개발본부 (전장연구)',
      '글로벌 영업본부',
    ],
    roles: [
      'ADAS / 자율주행 센서 퓨전 알고리즘',
      '차량용 인포테인먼트 (IVI) Android/Linux 개발',
      '전동화 구동계 제어 SW',
      '차량용 제어기 회로설계',
    ],
    benchmark: {
      avgGpa: 3.68,
      reqLanguageScore: 78,
      reqLanguageText: 'TOEIC Speaking AL / OPIc IH',
      reqCertCount: 1,
      reqProjectCount: 2,
      preferredCerts: ['정보처리기사', '자동차정비기사', '전자기사'],
      difficultyWeight: 1.08,
      focusFactor: 'balanced',
    },
  },
  '포스코': {
    id: 'posco',
    name: '포스코 (POSCO)',
    divisions: [
      '제철소 생산기술부',
      '철강기획본부',
      '포스코 기술연구원 (RIST)',
      '디지털혁신실 (스마트팩토리)',
      '해외영업본부',
    ],
    roles: [
      '제철 생산 공정 제어 및 개선',
      '스마트팩토리 AI/IoT 시스템 구축',
      '금속 / 재료 R&D 연구원',
      '설비 자동화 및 전기 제어',
      '글로벌 철강 해외 영업',
    ],
    benchmark: {
      avgGpa: 3.75,
      reqLanguageScore: 82,
      reqLanguageText: 'TOEIC 850+ / OPIc IH',
      reqCertCount: 2,
      reqProjectCount: 1,
      preferredCerts: ['금속재료기사', '일반기계기사', '전기기사', '정보처리기사'],
      difficultyWeight: 1.1,
      focusFactor: 'gpa',
    },
  },
  '쿠팡': {
    id: 'coupang',
    name: '쿠팡 (Coupang)',
    divisions: [
      'E-Commerce Tech',
      'Logistics Engineering (풀필먼트)',
      'Coupang Pay (핀테크)',
      'Search & Discovery',
      'Retail Operations',
    ],
    roles: [
      'Back-end Software Engineer (Java/Kotlin)',
      'Data Engineer & Analytics',
      'Front-end Engineer (React/TypeScript)',
      'Technical Product Manager (TPM)',
      'Fulfilment System Optimization Engineer',
    ],
    benchmark: {
      avgGpa: 3.40,
      reqLanguageScore: 85,
      reqLanguageText: '영어 비즈니스 회화 가능 우대 (글로벌 팀 협업)',
      reqCertCount: 0,
      reqProjectCount: 3,
      preferredCerts: ['AWS Certified', 'CKA', 'Data Science'],
      difficultyWeight: 1.22,
      focusFactor: 'experience',
    },
  },
  '토스': {
    id: 'toss',
    name: '토스 (Toss / 비바리퍼블리카)',
    divisions: [
      'Toss Core (금융 플랫폼)',
      'Toss Bank (토스뱅크)',
      'Toss Securities (토스증권)',
      'Toss Payments (결제)',
    ],
    roles: [
      'Server Developer (Node.js/Java/Kotlin)',
      'Frontend Developer (React/Next.js)',
      'Data Scientist / ML Engineer',
      'Product Owner (PO)',
      'Financial Risk & Compliance Specialist',
    ],
    benchmark: {
      avgGpa: 3.35,
      reqLanguageScore: 70,
      reqLanguageText: '어학보다 문제해결 및 제품 임팩트 경험 위주',
      reqCertCount: 0,
      reqProjectCount: 3,
      preferredCerts: ['AWS', 'SQLD', '정보처리기사'],
      difficultyWeight: 1.25,
      focusFactor: 'experience',
    },
  },
  'CJ제일제당': {
    id: 'cj',
    name: 'CJ제일제당 (CJ CheilJedang)',
    divisions: [
      '식품 R&D 연구소',
      'BIO 사업부문',
      '글로벌 SCM / 물류',
      '식품 마케팅 및 브랜드기획',
      '생산기술 및 품질관리',
    ],
    roles: [
      '신제품 식품 개발 및 가공 R&D',
      '바이오 발효 및 미생물 연구원',
      '글로벌 SCM 운영 및 수요 예측',
      '브랜드 마케팅 및 마켓 리서치',
      'HACCP 및 글로벌 품질 보증',
    ],
    benchmark: {
      avgGpa: 3.65,
      reqLanguageScore: 82,
      reqLanguageText: 'OPIc IH 이상 / TOEIC 850+',
      reqCertCount: 2,
      reqProjectCount: 1,
      preferredCerts: ['식품기사', '위생사', 'CPIM', 'ADsP'],
      difficultyWeight: 1.05,
      focusFactor: 'cert_language',
    },
  },
  'TechCorp Inc.': {
    id: 'default_tech',
    name: '기타 대기업 / 외국계 / 중견기업',
    divisions: [
      'R&D 본부',
      'SW 개발센터',
      '기획 / 경영지원',
      '영업 / 마케팅',
      '생산 / 품질 관리',
    ],
    roles: [
      '소프트웨어 개발 (풀스택/백엔드)',
      '데이터 분석 및 AI 모델링',
      '기획 및 프로젝트 관리',
      '마케팅 및 영업',
      '엔지니어링 및 생산기술',
    ],
    benchmark: {
      avgGpa: 3.60,
      reqLanguageScore: 75,
      reqLanguageText: 'TOEIC 800+ / OPIc IM2+',
      reqCertCount: 1,
      reqProjectCount: 2,
      preferredCerts: ['정보처리기사', 'ADsP', 'SQLD'],
      difficultyWeight: 1.0,
      focusFactor: 'balanced',
    },
  },
};

// Helper function to calculate precise specs score
export function calculateRealisticProbability(params: {
  company: string;
  division: string;
  role: string;
  gpa: number;
  languages: Array<{ testType: string; score?: string; grade?: string }>;
  certifications: Array<{ name: string; issuer?: string }>;
  projects: Array<{ role: string; organization: string; impact: string }>;
  selfIntro: string;
}) {
  const config = COMPANY_CONFIGS[params.company] || COMPANY_CONFIGS['TechCorp Inc.'];
  const bench = config.benchmark;

  const numGpa = parseFloat(String(params.gpa)) || 3.5;
  const langCount = Array.isArray(params.languages) ? params.languages.length : 0;
  const certCount = Array.isArray(params.certifications) ? params.certifications.length : 0;
  const projCount = Array.isArray(params.projects) ? params.projects.length : 0;
  const introLen = (params.selfIntro || '').length;

  // 1. Academic Score (0~100 normalized)
  const gpaNorm = Math.min(100, Math.round((numGpa / 4.5) * 100));
  let gpaScore = 50;
  const gpaDiff = numGpa - bench.avgGpa;
  if (gpaDiff >= 0.3) gpaScore = 95;
  else if (gpaDiff >= 0.1) gpaScore = 85;
  else if (gpaDiff >= -0.1) gpaScore = 75;
  else if (gpaDiff >= -0.3) gpaScore = 60;
  else gpaScore = 40;

  // 2. Language Score
  let langScore = 40;
  const hasHighLanguage = params.languages.some(l => {
    const val = (l.score || l.grade || '').toUpperCase();
    return val.includes('AL') || val.includes('IH') || parseInt(val) >= 900;
  });
  if (hasHighLanguage) langScore = 90;
  else if (langCount >= 2) langScore = 80;
  else if (langCount === 1) langScore = 65;
  else langScore = 30;

  // 3. Certification Score
  let certScore = 30;
  let hasPreferredCert = false;
  if (params.certifications && params.certifications.length > 0) {
    hasPreferredCert = params.certifications.some(c =>
      bench.preferredCerts.some(kw => c.name.toLowerCase().includes(kw.toLowerCase()))
    );
  }
  if (hasPreferredCert) certScore = 95;
  else if (certCount >= bench.reqCertCount && certCount > 0) certScore = 80;
  else if (certCount === 1) certScore = 60;
  else certScore = 25;

  // 4. Experience & Project Score
  let expScore = 30;
  if (projCount >= bench.reqProjectCount + 1) expScore = 95;
  else if (projCount >= bench.reqProjectCount) expScore = 82;
  else if (projCount === 1) expScore = 60;
  else expScore = 20;

  // 5. Resume & Self Intro Quality Score
  let resumeScore = 30;
  if (introLen >= 800) resumeScore = 92;
  else if (introLen >= 500) resumeScore = 78;
  else if (introLen >= 250) resumeScore = 55;
  else resumeScore = 30;

  // Weighted Total based on Focus Factor
  let weightedSum = 0;
  if (bench.focusFactor === 'experience') {
    weightedSum = expScore * 0.40 + resumeScore * 0.25 + gpaScore * 0.15 + langScore * 0.10 + certScore * 0.10;
  } else if (bench.focusFactor === 'gpa') {
    weightedSum = gpaScore * 0.35 + langScore * 0.25 + certScore * 0.15 + expScore * 0.15 + resumeScore * 0.10;
  } else if (bench.focusFactor === 'cert_language') {
    weightedSum = langScore * 0.30 + certScore * 0.25 + gpaScore * 0.20 + expScore * 0.15 + resumeScore * 0.10;
  } else {
    // balanced
    weightedSum = gpaScore * 0.25 + expScore * 0.25 + resumeScore * 0.20 + langScore * 0.15 + certScore * 0.15;
  }

  // Apply Company Difficulty Calibration
  let calculatedProb = Math.round((weightedSum / bench.difficultyWeight));

  // Dynamic range clamping: realistic spread from 22% to 94%
  calculatedProb = Math.min(94, Math.max(22, calculatedProb));

  const level = calculatedProb >= 82 ? '매우 높음' : calculatedProb >= 68 ? '높음' : calculatedProb >= 50 ? '보통' : '보완 필요';

  return {
    calculatedProb,
    level,
    radar: {
      mySpecs: {
        gpa: gpaNorm,
        language: langScore,
        experience: expScore,
        certificates: certScore,
        resumeScore,
      },
      avgPassers: {
        gpa: Math.round((bench.avgGpa / 4.5) * 100),
        language: bench.reqLanguageScore,
        experience: bench.focusFactor === 'experience' ? 85 : 72,
        certificates: bench.reqCertCount >= 2 ? 80 : 60,
        resumeScore: 80,
      },
    },
    bench,
  };
}
