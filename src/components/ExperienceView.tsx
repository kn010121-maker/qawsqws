import React, { useState } from 'react';
import { ProjectEntry } from '../types';

interface ExperienceViewProps {
  projects: ProjectEntry[];
  selfIntro: string;
  onUpdateProjects: (projects: ProjectEntry[]) => void;
  onUpdateSelfIntro: (intro: string) => void;
  onStartAnalysis: () => void;
  isAnalyzing: boolean;
}

export const ExperienceView: React.FC<ExperienceViewProps> = ({
  projects,
  selfIntro,
  onUpdateProjects,
  onUpdateSelfIntro,
  onStartAnalysis,
  isAnalyzing,
}) => {
  const maxChars = 3000;
  const currentLength = selfIntro.length;

  const [analyzingStep, setAnalyzingStep] = useState('자기소개서 및 스펙 키워드 추출 중...');

  // Add Project Entry
  const handleAddProject = () => {
    const newProject: ProjectEntry = {
      id: Date.now().toString(),
      role: '',
      organization: '',
      impact: '',
    };
    onUpdateProjects([...projects, newProject]);
  };

  // Remove Project Entry
  const handleRemoveProject = (id: string) => {
    onUpdateProjects(projects.filter((p) => p.id !== id));
  };

  // Update specific Project Entry
  const handleProjectChange = (id: string, field: keyof ProjectEntry, value: string) => {
    onUpdateProjects(
      projects.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  // Trigger analysis with step animations
  const handleStartAnalysisClick = () => {
    if (isAnalyzing) return;
    setAnalyzingStep('자기소개서 및 스펙 키워드 추출 중...');

    setTimeout(() => {
      setAnalyzingStep('5만 건 이상의 대기업 합격자 데이터베이스와 비교 분석 중...');
    }, 1200);

    setTimeout(() => {
      setAnalyzingStep('직무 역량 레이더 차트 및 맞춤형 피드백 리포트 생성 중...');
    }, 2400);

    onStartAnalysis();
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-4xl mx-auto w-full pb-20">
      <header className="mb-8">
        <p className="font-headline font-bold text-xs text-[#747684] uppercase tracking-wider mb-2">
          3단계 중 3단계
        </p>
        <h2 className="font-headline text-2xl md:text-3xl font-bold text-[#191c1e] mb-2">
          직무 경험 및 자기소개서
        </h2>
        <p className="font-body text-sm md:text-base text-[#444653]">
          주요 프로젝트/인턴 경험과 자기소개서를 작성하여 AI 합격 진단을 실행하세요.
        </p>
      </header>

      <div className="space-y-8">
        {/* Major Projects & Internships Section */}
        <section className="glass-card p-6 md:p-8 rounded-2xl border border-white/40 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-headline text-lg font-bold text-[#191c1e] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#002068]">folder_special</span>
                주요 프로젝트 및 인턴 경험
              </h3>
              <p className="font-body text-xs text-[#444653] mt-1">
                직무 관련 실무역량을 어필할 수 있는 경험을 입력해주세요.
              </p>
            </div>

            <button
              onClick={handleAddProject}
              className="text-[#002068] hover:text-[#003399] transition-colors flex items-center gap-1 font-headline font-bold text-xs md:text-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">add_circle</span>
              경험 추가
            </button>
          </div>

          {/* Project Entries */}
          <div className="space-y-4">
            {projects.length === 0 ? (
              <div 
                onClick={handleAddProject}
                className="border-2 border-dashed border-[#c4c5d5] rounded-xl p-6 text-center text-sm text-[#747684] hover:bg-white/60 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-2xl text-[#002068] mb-1">add_task</span>
                <p className="font-headline font-semibold text-[#191c1e]">등록된 프로젝트/인턴 경험이 없습니다</p>
                <p className="text-xs text-[#747684] mt-0.5">이곳을 클릭하여 경험 항목을 추가해보세요.</p>
              </div>
            ) : (
              projects.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-white border border-[#c4c5d5] rounded-xl p-5 relative hover:border-[#002068] transition-colors shadow-xs"
                >
                  <button
                    onClick={() => handleRemoveProject(proj.id)}
                    aria-label="Remove entry"
                    className="absolute top-4 right-4 text-[#747684] hover:text-[#ba1a1a] transition-colors p-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base">close</span>
                  </button>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block font-headline text-xs font-semibold text-[#191c1e] mb-1">
                        역할 / 직책
                      </label>
                      <input
                        type="text"
                        value={proj.role}
                        onChange={(e) => handleProjectChange(proj.id, 'role', e.target.value)}
                        placeholder="예: 데이터 분석 인턴, 팀 리더"
                        className="w-full bg-[#f7f9fb] border border-[#c4c5d5] rounded-lg px-3 py-2 text-sm font-body text-[#191c1e] focus:outline-none focus:border-[#00e3fd]"
                      />
                    </div>

                    <div>
                      <label className="block font-headline text-xs font-semibold text-[#191c1e] mb-1">
                        소속 / 공모전명
                      </label>
                      <input
                        type="text"
                        value={proj.organization}
                        onChange={(e) => handleProjectChange(proj.id, 'organization', e.target.value)}
                        placeholder="예: 테크기업 인턴, 대학 동아리"
                        className="w-full bg-[#f7f9fb] border border-[#c4c5d5] rounded-lg px-3 py-2 text-sm font-body text-[#191c1e] focus:outline-none focus:border-[#00e3fd]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-headline text-xs font-semibold text-[#191c1e] mb-1">
                      핵심 기여도 및 성과 (Impact)
                    </label>
                    <textarea
                      rows={2}
                      value={proj.impact}
                      onChange={(e) => handleProjectChange(proj.id, 'impact', e.target.value)}
                      placeholder="수행한 작업 및 구체적인 성과를 기재하세요 (예: DB 쿼리 최적화로 처리 속도 35% 향상)..."
                      className="w-full bg-[#f7f9fb] border border-[#c4c5d5] rounded-lg px-3 py-2 text-sm font-body text-[#191c1e] focus:outline-none focus:border-[#00e3fd] resize-none"
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Self-Introduction Section */}
        <section className="glass-card p-6 md:p-8 rounded-2xl border border-white/40 shadow-sm">
          <div className="mb-4">
            <h3 className="font-headline text-lg font-bold text-[#191c1e] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#002068]">edit_note</span>
              자기소개서 작성
            </h3>
            <p className="font-body text-xs text-[#444653] mt-1">
              지원동기, 직무 전문성, 강점 등을 작성해주세요. AI가 문맥, 직무 키워드 및 설득력을 분석합니다.
            </p>
          </div>

          <div className="relative">
            <textarea
              id="self-intro-textarea"
              rows={11}
              maxLength={maxChars}
              value={selfIntro}
              onChange={(e) => onUpdateSelfIntro(e.target.value)}
              placeholder="자기소개서 내용을 입력하세요. 지원 직무에 대한 관심, 경험, 문제 해결 사례 등을 상세히 서술해주시면 정확한 AI 분석이 가능합니다..."
              className="w-full bg-white border border-[#c4c5d5] rounded-xl p-5 font-body text-sm md:text-base leading-relaxed focus:outline-none focus:border-[#002068] transition-shadow shadow-inner text-[#191c1e] resize-y"
            />

            {/* Character Counter Badge */}
            <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full border border-[#c4c5d5] text-xs shadow-xs">
              <span className="material-symbols-outlined text-xs text-[#444653]">
                check_circle
              </span>
              <span
                className={`font-headline font-bold text-sm ${
                  currentLength >= maxChars
                    ? 'text-[#EF4444]'
                    : currentLength >= maxChars * 0.9
                    ? 'text-[#F59E0B]'
                    : 'text-[#002068]'
                }`}
              >
                {currentLength}
              </span>
              <span className="font-body text-xs text-[#444653]">/ 3000자</span>
            </div>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <span className="bg-[#003399]/15 text-[#003399] px-3 py-1 rounded-full font-headline font-bold text-xs border border-[#003399]/25 shrink-0">
              AI 작성 팁
            </span>
            <p className="font-body text-xs text-[#444653]">
              STAR 기법(상황-구체적 역할-실행 행동-성과)을 활용하여 구체적으로 작성하면 AI 점수 상승에 도움이 됩니다.
            </p>
          </div>
        </section>

        {/* Action Area */}
        <div className="flex justify-end pt-6 border-t border-[#c4c5d5]">
          <button
            onClick={handleStartAnalysisClick}
            disabled={isAnalyzing}
            className={`bg-[#0A192F] text-white font-headline font-bold text-sm md:text-base px-8 py-3.5 rounded-xl hover:bg-[#00164e] shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 cursor-pointer group ${
              isAnalyzing ? 'opacity-80 cursor-wait' : ''
            }`}
          >
            {isAnalyzing ? (
              <>
                <span className="animate-spin material-symbols-outlined text-lg text-[#9cf0ff]">
                  sync
                </span>
                <span>AI 합격 진단 분석 중...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[#9cf0ff] group-hover:rotate-12 transition-transform">
                  model_training
                </span>
                <span>AI 합격 진단 실행</span>
              </>
            )}
          </button>
        </div>

        {/* Loading Overlay Modal */}
        {isAnalyzing && (
          <div className="fixed inset-0 bg-[#0A192F]/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center shadow-2xl border border-white/60">
              <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-[#dce1ff] border-t-[#003399] animate-spin" />
                <span className="material-symbols-outlined text-3xl text-[#003399] fill-icon">
                  psychology
                </span>
              </div>

              <h3 className="font-headline text-xl font-bold text-[#0A192F] mb-2">
                지원자 스펙 및 역량 분석 중
              </h3>

              <p className="font-body text-xs text-[#444653] animate-pulse h-8">
                {analyzingStep}
              </p>

              <div className="w-full bg-[#eceef0] h-1.5 rounded-full overflow-hidden mt-6">
                <div className="bg-gradient-to-r from-[#003399] to-[#00e3fd] h-full w-3/4 animate-pulse rounded-full" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
