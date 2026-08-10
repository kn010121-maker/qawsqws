import { useState, useEffect } from 'react';
import {
  AppView,
  TargetGoal,
  AcademicCredentials,
  LanguageScore,
  Certification,
  ProjectEntry,
  AnalysisResult,
} from './types';
import { calculateRealisticProbability, COMPANY_CONFIGS } from './data/companyData';

import { SidebarNav } from './components/SidebarNav';
import { HomeView } from './components/HomeView';
import { GoalSpecView } from './components/GoalSpecView';
import { ExperienceView } from './components/ExperienceView';
import { AnalysisResultView } from './components/AnalysisResultView';
import { HistoryView } from './components/HistoryView';
import { CommunityView } from './components/CommunityView';

const STORAGE_KEY_DRAFT = 'nexus_career_draft_v1';
const STORAGE_KEY_HISTORY = 'nexus_career_history_v1';

export function App() {
  const [currentView, setCurrentView] = useState<AppView>('home');

  // Input states
  const [targetGoal, setTargetGoal] = useState<TargetGoal>({
    company: '삼성전자',
    division: '메모리사업부',
    role: '소프트웨어 엔지니어 (백엔드)',
  });

  const [academic, setAcademic] = useState<AcademicCredentials>({
    university: '서울대학교',
    major: '컴퓨터공학부',
    gpa: 3.85,
  });

  const [languages, setLanguages] = useState<LanguageScore[]>([
    { id: '1', testType: 'TOEIC', score: '920' },
    { id: '2', testType: 'OPIc', score: '', grade: 'AL' },
  ]);

  const [certifications, setCertifications] = useState<Certification[]>([
    {
      id: '1',
      name: '정보처리기사',
      issuer: '한국산업인력공단',
      date: '2023.08',
    },
    {
      id: '2',
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2024.02',
    },
  ]);

  const [projects, setProjects] = useState<ProjectEntry[]>([
    {
      id: 'p1',
      role: '백엔드 개발 인턴',
      organization: '테크코프 (TechCorp)',
      impact:
        'Spring Boot 및 Redis 기반 마이크로서비스 구조를 설계하고 API 응답 지연 시간을 32% 단축함.',
    },
    {
      id: 'p2',
      role: '프로젝트 팀장',
      organization: '대학 오픈소스 동아리',
      impact:
        'Kafka 및 PostgreSQL을 활용해 초당 5,000건 이상의 이벤트를 처리하는 실시간 데이터 스트리밍 파이프라인 구축.',
    },
  ]);

  const [selfIntro, setSelfIntro] = useState<string>(
    '대학교 2학년 시절부터 대용량 분산 백엔드 시스템 구축에 매료되어 지속적으로 역량을 쌓아왔습니다. 테크코프 인턴십 기간 동안 쿼리 최적화와 캐싱 레이어 개선을 주도하며 실무 성능 향상에 크게 기여했습니다...'
  );

  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [history, setHistory] = useState<AnalysisResult[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Load saved draft and history on mount
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem(STORAGE_KEY_HISTORY);
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }

      const savedDraft = localStorage.getItem(STORAGE_KEY_DRAFT);
      if (savedDraft) {
        const parsed = JSON.parse(savedDraft);
        if (parsed.targetGoal) setTargetGoal(parsed.targetGoal);
        if (parsed.academic) setAcademic(parsed.academic);
        if (parsed.languages) setLanguages(parsed.languages);
        if (parsed.certifications) setCertifications(parsed.certifications);
        if (parsed.projects) setProjects(parsed.projects);
        if (parsed.selfIntro) setSelfIntro(parsed.selfIntro);
      }
    } catch (e) {
      console.warn('LocalStorage parse warning:', e);
    }
  }, []);

  // Save Draft handler
  const handleSaveDraft = () => {
    try {
      const draftData = {
        targetGoal,
        academic,
        languages,
        certifications,
        projects,
        selfIntro,
      };
      localStorage.setItem(STORAGE_KEY_DRAFT, JSON.stringify(draftData));
      alert('임시저장이 완료되었습니다! 작성된 정보가 브라우저에 안심 저장되었습니다.');
    } catch (e) {
      console.error('Failed to save draft:', e);
    }
  };

  // Run AI Analysis
  const handleStartAIAnalysis = async () => {
    setIsAnalyzing(true);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company: targetGoal.company,
          division: targetGoal.division,
          role: targetGoal.role,
          university: academic.university,
          major: academic.major,
          gpa: academic.gpa,
          languages,
          certifications,
          projects,
          selfIntro,
        }),
      });

      const data = await response.json();

      if (data.success && data.result) {
        const fullResult: AnalysisResult = {
          id: Date.now().toString(),
          timestamp: new Date().toISOString(),
          company: targetGoal.company,
          division: targetGoal.division,
          role: targetGoal.role,
          ...data.result,
        };

        setAnalysisResult(fullResult);

        // Append to history
        const updatedHistory = [fullResult, ...history];
        setHistory(updatedHistory);
        localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(updatedHistory));

        setCurrentView('analysis');
      } else {
        throw new Error('Analysis returned empty result');
      }
    } catch (err) {
      console.error('Analysis error:', err);
      // Fallback calculation using realistic benchmark
      const realisticCalc = calculateRealisticProbability({
        company: targetGoal.company,
        division: targetGoal.division,
        role: targetGoal.role,
        gpa: academic.gpa,
        languages,
        certifications,
        projects,
        selfIntro,
      });

      const config = COMPANY_CONFIGS[targetGoal.company] || COMPANY_CONFIGS['TechCorp Inc.'];
      const bench = config.benchmark;

      const fallbackResult: AnalysisResult = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        company: targetGoal.company,
        division: targetGoal.division,
        role: targetGoal.role,
        probability: realisticCalc.calculatedProb,
        level: realisticCalc.level,
        summaryQuote: `"${targetGoal.company} [${targetGoal.division}] ${targetGoal.role} 직무 지원자 지표 분석 결과 합격 가능성 ${realisticCalc.calculatedProb}% (${realisticCalc.level})로 진단되었습니다."`,
        radar: realisticCalc.radar,
        radarInsight: `${targetGoal.company} 상위 10% 합격자 벤치마크(학점 ${bench.avgGpa}, ${bench.reqLanguageText}) 대비 지원자분의 스펙 지표를 다각도로 비교 분석하였습니다.`,
        coreStrengths: [
          {
            title: `${targetGoal.company} ${targetGoal.role} 직무 적합성`,
            description: `주요 학점(${academic.gpa}/4.5) 및 이수한 전공 과목이 ${targetGoal.company} 채용 요구 사항에 잘 부합합니다.`,
          },
          {
            title: '실무 프로젝트 및 경험 보유',
            description: projects.length > 0
              ? `${projects.length}건의 실무/프로젝트 수행 경험을 바탕으로 역량을 어필하였습니다.`
              : '추가적인 직무 프로젝트 수행 및 수치화된 성과 작성을 권장합니다.',
          },
        ],
        strengthTags: [
          `#${targetGoal.company}`,
          `#${targetGoal.division.replace(/\s+/g, '')}`,
          `#${targetGoal.role.replace(/\s+/g, '')}`,
        ],
        areasForOptimization: [
          {
            title: `${targetGoal.company} 우대 자격증 보완`,
            description: `${bench.preferredCerts.join(', ')} 자격증 취득 시 가산점이 적용됩니다.`,
            impact: '+8%',
          },
          {
            title: '자기소개서 STAR 성과 정량화',
            description: '프로젝트 성과를 숫자로 수치화 시 서류 평가 점수가 상승합니다.',
            impact: '+6%',
          },
        ],
      };

      setAnalysisResult(fallbackResult);
      const updatedHistory = [fallbackResult, ...history];
      setHistory(updatedHistory);
      localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(updatedHistory));
      setCurrentView('analysis');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Start New Analysis button handler
  const handleStartNewAnalysis = () => {
    setCurrentView('goal_spec');
  };

  // Delete History item
  const handleDeleteReport = (id: string) => {
    const updated = history.filter((h) => h.id !== id);
    setHistory(updated);
    localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(updated));
  };

  // Select Report from History or Community Sample
  const handleSelectReport = (report: AnalysisResult) => {
    setAnalysisResult(report);
    setCurrentView('analysis');
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb] flex flex-col md:flex-row font-body text-[#191c1e]">
      {/* Sidebar Navigation (hidden on Home view unless desired, visible everywhere else) */}
      {currentView !== 'home' && (
        <SidebarNav
          currentView={currentView}
          onSelectView={setCurrentView}
          onStartNewAnalysis={handleStartNewAnalysis}
        />
      )}

      {/* Main Content View Container */}
      <div
        className={`flex-1 flex flex-col min-h-screen ${
          currentView !== 'home' ? 'md:ml-64' : ''
        }`}
      >
        {currentView === 'home' && (
          <HomeView
            onStartAnalysis={() => setCurrentView('goal_spec')}
            onSelectView={setCurrentView}
            onViewSampleReport={() => {
              // Load default sample analysis report
              if (history.length > 0) {
                setAnalysisResult(history[0]);
              } else {
                setAnalysisResult({
                  company: '삼성전자',
                  division: '메모리사업부',
                  role: '메모리 회로설계',
                  probability: 88,
                  level: '매우 높음',
                  summaryQuote:
                    '"삼성전자 메모리사업부 평균 합격 스펙 대비 우수한 회로 설계 실무 경험과 학점을 바탕으로 최상위권 경쟁력을 확보하고 있습니다."',
                  radar: {
                    mySpecs: { gpa: 88, language: 85, experience: 92, certificates: 60, resumeScore: 90 },
                    avgPassers: { gpa: 82, language: 80, experience: 70, certificates: 55, resumeScore: 80 },
                  },
                  radarInsight:
                    '반도체 하드웨어 연구실 프로젝트 경험이 일반 지원자 대비 독보적인 강점으로 작용하고 있습니다.',
                  coreStrengths: [
                    {
                      title: 'VLSI 및 회로설계 실무 역량',
                      description:
                        'Cadence Virtuoso 레이아웃 시뮬레이션 및 STA 분석 경험이 우수함.',
                    },
                    {
                      title: '탄탄한 학업 성취도',
                      description: '전공 학점 3.92/4.5와 OPIc AL 조합으로 R&D 지원 조건을 완벽히 충족함.',
                    },
                  ],
                  strengthTags: ['#반도체', '#회로설계', '#삼성전자메모리'],
                  areasForOptimization: [
                    {
                      title: '논문/특허 실적 기술',
                      description: '학위 논문 요약 내용을 자기소개서에 추가 반영할 경우 면접 가산점 확보 가능.',
                      impact: '+2%',
                    },
                  ],
                });
              }
              setCurrentView('analysis');
            }}
          />
        )}

        {currentView === 'goal_spec' && (
          <GoalSpecView
            targetGoal={targetGoal}
            academic={academic}
            languages={languages}
            certifications={certifications}
            onUpdateTargetGoal={setTargetGoal}
            onUpdateAcademic={setAcademic}
            onUpdateLanguages={setLanguages}
            onUpdateCertifications={setCertifications}
            onProceedToExperience={() => setCurrentView('experience')}
            onSaveDraft={handleSaveDraft}
          />
        )}

        {currentView === 'experience' && (
          <ExperienceView
            projects={projects}
            selfIntro={selfIntro}
            onUpdateProjects={setProjects}
            onUpdateSelfIntro={setSelfIntro}
            onStartAnalysis={handleStartAIAnalysis}
            isAnalyzing={isAnalyzing}
          />
        )}

        {currentView === 'analysis' && analysisResult && (
          <AnalysisResultView
            result={analysisResult}
            onEditAndReanalyze={() => setCurrentView('goal_spec')}
          />
        )}

        {currentView === 'history' && (
          <HistoryView
            history={history}
            onSelectReport={handleSelectReport}
            onDeleteReport={handleDeleteReport}
            onStartNewAnalysis={handleStartNewAnalysis}
          />
        )}

        {currentView === 'community' && (
          <CommunityView onLoadSample={handleSelectReport} />
        )}
      </div>
    </div>
  );
}

export default App;
