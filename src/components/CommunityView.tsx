import React from 'react';
import { AnalysisResult } from '../types';

interface CommunityViewProps {
  onLoadSample: (sample: AnalysisResult) => void;
}

const SAMPLE_REPORTS: Array<{
  id: string;
  applicant: string;
  company: string;
  role: string;
  probability: number;
  gpa: string;
  language: string;
  experience: string;
  summary: string;
  report: AnalysisResult;
}> = [
  {
    id: 'sample-samsung',
    applicant: '합격자 A (2024.11)',
    company: '삼성전자',
    role: '메모리사업부 회로설계',
    probability: 88,
    gpa: '3.92 / 4.5',
    language: 'OPIc AL, TOEIC 920',
    experience: '반도체 연구실 연구원, VLSI 설계를 주제로 한 프로젝트',
    summary: '높은 학점과 하드웨어 연구실 실무 경험이 결합하여 상위 5% 합격권 스펙을 형성하였습니다.',
    report: {
      company: '삼성전자',
      division: '메모리사업부',
      role: '메모리 회로설계',
      probability: 88,
      level: '매우 높음',
      summaryQuote: '"반도체 하드웨어 연구실 경험 및 VLSI 회로 기초 역량이 매우 뛰어납니다."',
      radar: {
        mySpecs: { gpa: 88, language: 85, experience: 92, certificates: 60, resumeScore: 90 },
        avgPassers: { gpa: 82, language: 80, experience: 70, certificates: 55, resumeScore: 80 },
      },
      radarInsight: '연구실 프로젝트 경험이 삼성전자 메모리사업부 평균 합격자 대비 높은 경쟁력을 가집니다.',
      coreStrengths: [
        {
          title: '우수한 VLSI & 회로설계 역량',
          description: 'Cadence Virtuoso 레이아웃 및 STA 정적 타이밍 분석 경험 보유.',
        },
        {
          title: '탄탄한 기본 스펙',
          description: '학점 3.92와 OPIc AL 조합으로 삼성 R&D 최상위 자격을 충족함.',
        },
      ],
      strengthTags: ['#반도체', '#VLSI', '#삼성전자메모리'],
      areasForOptimization: [
        {
          title: '특허 및 논문 요약 첨부',
          description: '학위 논문 요약본을 자기소개서에 녹여내면 면접 점수가 향상됩니다.',
          impact: '+2%',
        },
      ],
      studyResources: [
        { title: '삼성전자 GSAT 회로/메모리 집중 기출문제집', category: '기출문제', url: '#' },
      ],
    },
  },
  {
    id: 'sample-sk',
    applicant: '합격자 B (2024.10)',
    company: 'SK하이닉스',
    role: '공정통합 (Process Integration)',
    probability: 82,
    gpa: '3.75 / 4.5',
    language: 'TOEIC 880, OPIc IH',
    experience: '클린룸 인턴십, 박막 공정 프로젝트',
    summary: '공정 기술 및 재료 분석 분야에서의 확실한 경험이 돋보이는 합격 리포트입니다.',
    report: {
      company: 'SK하이닉스',
      division: '제조/기술 R&D',
      role: '공정통합',
      probability: 82,
      level: '높음',
      summaryQuote: '"클린룸 박막 증착 및 수율 최적화 실무 배경이 우수합니다."',
      radar: {
        mySpecs: { gpa: 83, language: 78, experience: 85, certificates: 70, resumeScore: 85 },
        avgPassers: { gpa: 80, language: 82, experience: 68, certificates: 60, resumeScore: 78 },
      },
      radarInsight: '클린룸 인턴십 수행 기간이 일반 공학 계열 지원자 대비 명확한 차별점을 제공합니다.',
      coreStrengths: [
        {
          title: '공정 수율 최적화 경험',
          description: '화학기상증착(CVD) 장비 직접 활용 경험 보유.',
        },
      ],
      strengthTags: ['#공정통합', '#수율최적화', '#SK하이닉스'],
      areasForOptimization: [
        {
          title: 'Six Sigma 자격증',
          description: 'GB/BB 자격증 취득 시 공정 품질 관리 스펙을 강화할 수 있습니다.',
          impact: '+4%',
        },
      ],
    },
  },
  {
    id: 'sample-kakao',
    applicant: '합격자 C (2024.09)',
    company: '카카오',
    role: '백엔드 플랫폼 엔지니어',
    probability: 91,
    gpa: '3.60 / 4.5',
    language: 'TOEIC 900',
    experience: '대용량 트래픽 오픈소스 기여, AWS 마이크로서비스',
    summary: '압도적인 오픈소스 및 백엔드 프로젝트 기여 경험으로 평균 학점을 완벽히 커버했습니다.',
    report: {
      company: '카카오',
      division: '소프트웨어 엔지니어링',
      role: '백엔드 플랫폼 엔지니어',
      probability: 91,
      level: '매우 높음',
      summaryQuote: '"최고 수준의 오픈소스 기여 및 마이크로서비스 아키텍처 구축 역량보유."',
      radar: {
        mySpecs: { gpa: 80, language: 82, experience: 98, certificates: 80, resumeScore: 95 },
        avgPassers: { gpa: 78, language: 80, experience: 75, certificates: 65, resumeScore: 82 },
      },
      radarInsight: '실전 GitHub 포트폴리오 및 초당 10만 요청 처리 백엔드 경험이 학점 기준을 압도합니다.',
      coreStrengths: [
        {
          title: '대용량 마이크로서비스 아키텍처',
          description: 'Spring Boot, Redis Caching, Kafka 파이프라인 개발 실무 경험.',
        },
      ],
      strengthTags: ['#백엔드', '#Kafka', '#SpringBoot'],
      areasForOptimization: [
        {
          title: '코딩테스트 속도 향상',
          description: '2차 라이브 코딩 인터뷰 대비 DP 및 그래프 알고리즘 연습 권장.',
          impact: '+2%',
        },
      ],
    },
  },
  {
    id: 'sample-hyundai',
    applicant: '합격자 D (2024.11)',
    company: '현대자동차',
    role: '자율주행 SW 제어 개발',
    probability: 86,
    gpa: '3.81 / 4.5',
    language: 'TOEIC Speaking 160 (AL), TOEIC 890',
    experience: '자작차 동아리 회장, ROS2 기반 센서 퓨전 프로젝트',
    summary: '실제 로봇/자동차 제어 프로젝트와 C++ SW 개발 역량이 돋보이는 합격 리포트입니다.',
    report: {
      company: '현대자동차',
      division: 'R&D 본부',
      role: '자율주행 SW 개발',
      probability: 86,
      level: '매우 높음',
      summaryQuote: '"자작차 제어 실무 경험 및 C++/ROS 기반 자율주행 알고리즘 구현 능력이 우수합니다."',
      radar: {
        mySpecs: { gpa: 85, language: 82, experience: 90, certificates: 75, resumeScore: 88 },
        avgPassers: { gpa: 81, language: 78, experience: 72, certificates: 60, resumeScore: 78 },
      },
      radarInsight: 'ROS2 실체 차량 적용 경험과 C++ 임베디드 코딩 능력으로 면접에서 높은 점수를 획득했습니다.',
      coreStrengths: [
        {
          title: 'ROS2 & C++ 센서 퓨전 알고리즘',
          description: 'LiDAR, Camera 융합 알고리즘 구현 및 실차 실증 테스트 완료.',
        },
        {
          title: '자동차공학 관련 자격 보유',
          description: '자동차정비기사 및 정보처리기사 동시 보유로 실무 이해도 증명.',
        },
      ],
      strengthTags: ['#자율주행', '#현대자동차R&D', '#ROS2'],
      areasForOptimization: [
        {
          title: 'AUTOSAR 표준 이해도 보완',
          description: '차량용 표준 아키텍처(AUTOSAR) 기본 지식 정리 시 실무 질문 완벽 대비 가능.',
          impact: '+3%',
        },
      ],
    },
  },
  {
    id: 'sample-naver',
    applicant: '합격자 E (2024.10)',
    company: '네이버 (NAVER)',
    role: 'Search & AI 서비스 엔지니어',
    probability: 89,
    gpa: '3.68 / 4.5',
    language: 'OPIc IH',
    experience: 'LLM RAG 파이프라인 개발, 학술대회 KCC 논문 게재',
    summary: '최신 AI 기술(RAG, Vector DB)을 검색 엔진 서비스에 결합한 포트폴리오로 최종 합격했습니다.',
    report: {
      company: '네이버',
      division: 'Search CIC',
      role: 'Search & AI 엔지니어',
      probability: 89,
      level: '매우 높음',
      summaryQuote: '"Vector DB 기반 검색 최적화 및 자연어 처리(NLP) 서빙 아키텍처 경험 탁월."',
      radar: {
        mySpecs: { gpa: 82, language: 78, experience: 95, certificates: 70, resumeScore: 92 },
        avgPassers: { gpa: 80, language: 80, experience: 78, certificates: 62, resumeScore: 82 },
      },
      radarInsight: 'RAG 검색 서빙 아키텍처 구축과 KCC 학술 논문 실적이 평균 합격자를 상회합니다.',
      coreStrengths: [
        {
          title: '생성형 AI & 검색 파이프라인',
          description: 'Milvus Vector DB 및 LangChain 기반 지식 검색 시스템 구축.',
        },
      ],
      strengthTags: ['#네이버AI', '#검색엔진', '#RAG파이프라인'],
      areasForOptimization: [
        {
          title: '대용량분산처리(Hadoop/Spark) 실무 정리',
          description: '분산 데이터 처리 경험을 추가 기술하면 면접 우위를 강화할 수 있습니다.',
          impact: '+3%',
        },
      ],
    },
  },
];

export const CommunityView: React.FC<CommunityViewProps> = ({ onLoadSample }) => {
  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-5xl mx-auto w-full pb-20">
      <div className="mb-8">
        <h2 className="font-headline text-2xl md:text-3xl font-bold text-[#002068]">
          합격자 진단 리포트 샘플
        </h2>
        <p className="font-body text-xs md:text-sm text-[#444653] mt-1">
          국내 주요 대기업 최종 합격자들의 익명 스펙 및 진단 분석 샘플을 살펴보세요.
        </p>
      </div>

      <div className="space-y-6">
        {SAMPLE_REPORTS.map((sample) => (
          <div
            key={sample.id}
            className="bg-white rounded-2xl p-6 border border-[#e0e3e5] shadow-xs hover:border-[#002068] transition-all flex flex-col md:flex-row justify-between gap-6"
          >
            <div className="flex-1 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-headline font-bold uppercase text-[#002068] bg-[#dce1ff] px-2.5 py-0.5 rounded-full">
                  {sample.company}
                </span>
                <span className="font-body text-xs text-[#747684]">
                  {sample.applicant}
                </span>
              </div>

              <h3 className="font-headline text-xl font-bold text-[#191c1e]">
                {sample.role}
              </h3>

              <p className="font-body text-xs text-[#444653] leading-relaxed">
                {sample.summary}
              </p>

              <div className="flex flex-wrap gap-4 text-xs font-body text-[#747684] pt-2 border-t border-[#f2f4f6]">
                <div><strong className="text-[#191c1e]">학점:</strong> {sample.gpa}</div>
                <div><strong className="text-[#191c1e]">어학:</strong> {sample.language}</div>
                <div><strong className="text-[#191c1e]">주요경험:</strong> {sample.experience}</div>
              </div>
            </div>

            <div className="flex flex-col items-start md:items-end justify-between border-t md:border-t-0 md:border-l border-[#e0e3e5] pt-4 md:pt-0 md:pl-6 min-w-[160px]">
              <div className="text-left md:text-right">
                <span className="text-xs font-headline font-semibold text-[#747684]">
                  AI 산출 합격률
                </span>
                <div className="font-headline font-bold text-3xl text-[#002068]">
                  {sample.probability}%
                </div>
                <span className="text-xs font-headline font-bold text-[#10B981]">
                  높은 적합도
                </span>
              </div>

              <button
                onClick={() => onLoadSample(sample.report)}
                className="mt-4 md:mt-0 px-5 py-2.5 bg-[#002068] text-white font-headline font-bold text-xs rounded-xl hover:bg-[#003399] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>전체 리포트 보기</span>
                <span className="material-symbols-outlined text-sm">visibility</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
