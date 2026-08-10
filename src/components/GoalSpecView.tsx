import React, { useState } from 'react';
import { TargetGoal, AcademicCredentials, LanguageScore, Certification } from '../types';
import { COMPANY_CONFIGS } from '../data/companyData';

interface GoalSpecViewProps {
  targetGoal: TargetGoal;
  academic: AcademicCredentials;
  languages: LanguageScore[];
  certifications: Certification[];
  onUpdateTargetGoal: (goal: TargetGoal) => void;
  onUpdateAcademic: (academic: AcademicCredentials) => void;
  onUpdateLanguages: (langs: LanguageScore[]) => void;
  onUpdateCertifications: (certs: Certification[]) => void;
  onProceedToExperience: () => void;
  onSaveDraft: () => void;
}

export const GoalSpecView: React.FC<GoalSpecViewProps> = ({
  targetGoal,
  academic,
  languages,
  certifications,
  onUpdateTargetGoal,
  onUpdateAcademic,
  onUpdateLanguages,
  onUpdateCertifications,
  onProceedToExperience,
  onSaveDraft,
}) => {
  const [showCertModal, setShowCertModal] = useState(false);
  const [newCertName, setNewCertName] = useState('');
  const [newCertIssuer, setNewCertIssuer] = useState('');
  const [newCertDate, setNewCertDate] = useState('');

  // Add new Language Test entry
  const handleAddLanguage = () => {
    const newLang: LanguageScore = {
      id: Date.now().toString(),
      testType: 'TOEIC',
      score: '900',
      grade: 'AL',
    };
    onUpdateLanguages([...languages, newLang]);
  };

  // Delete Language Test entry
  const handleDeleteLanguage = (id: string) => {
    onUpdateLanguages(languages.filter((l) => l.id !== id));
  };

  // Update specific Language entry
  const handleLanguageChange = (id: string, field: keyof LanguageScore, value: string) => {
    onUpdateLanguages(
      languages.map((l) => (l.id === id ? { ...l, [field]: value } : l))
    );
  };

  // Add new certification
  const handleAddCertSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCertName.trim()) return;
    const newCert: Certification = {
      id: Date.now().toString(),
      name: newCertName.trim(),
      issuer: newCertIssuer.trim() || 'HRDKorea',
      date: newCertDate || '2023.08',
    };
    onUpdateCertifications([...certifications, newCert]);
    setNewCertName('');
    setNewCertIssuer('');
    setNewCertDate('');
    setShowCertModal(false);
  };

  // Remove certification
  const handleDeleteCert = (id: string) => {
    onUpdateCertifications(certifications.filter((c) => c.id !== id));
  };

  // Get current company benchmark & config
  const currentConfig = COMPANY_CONFIGS[targetGoal.company] || COMPANY_CONFIGS['TechCorp Inc.'];

  // Company selection change handler (updates available divisions & roles automatically)
  const handleCompanySelectChange = (companyName: string) => {
    const config = COMPANY_CONFIGS[companyName] || COMPANY_CONFIGS['TechCorp Inc.'];
    const newDivision = config.divisions[0] || 'R&D본부';
    const newRole = config.roles[0] || '소프트웨어 개발';
    onUpdateTargetGoal({
      company: companyName,
      division: newDivision,
      role: newRole,
    });
  };

  // Dynamic AI Insight prompt calculation
  const getAIInsight = () => {
    const bench = currentConfig.benchmark;
    return `${targetGoal.company} [${targetGoal.division}]의 ${targetGoal.role} 직무는 상위 10% 합격자 평균 학점 약 ${bench.avgGpa}점, ${bench.reqLanguageText} 수준 및 주요 우대자격(${bench.preferredCerts.slice(0, 2).join(', ')}) 보유 여부를 핵심으로 평가합니다.`;
  };

  const gpaPercent = Math.min(100, Math.max(0, (academic.gpa / 4.5) * 100));

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-6xl mx-auto w-full pb-20">
      {/* Page Header */}
      <div className="mb-6 md:mb-8">
        <h2 className="font-headline text-2xl md:text-3xl font-bold text-[#002068] mb-1.5">
          목표 설정 및 스펙 입력
        </h2>
        <p className="font-body text-sm md:text-base text-[#444653] max-w-2xl">
          목표 기업, 희망 직무 및 현재 보유한 어학/자격 스펙을 입력하여 AI 진단을 준비하세요.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Panel: Target Goal & AI Insight */}
        <section className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e0e3e5] relative overflow-hidden">
            {/* Background decorative accent */}
            <div className="absolute top-0 right-0 w-28 h-28 bg-[#dce1ff] rounded-bl-full opacity-25 -mr-6 -mt-6 pointer-events-none" />

            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-[#eceef0] flex items-center justify-center text-[#002068]">
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  domain
                </span>
              </div>
              <h3 className="font-headline text-lg font-bold text-[#191c1e]">
                목표 기업 및 직무
              </h3>
            </div>

            <form className="space-y-4 relative z-10" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-1">
                <label className="block font-headline text-xs font-semibold text-[#444653]">
                  목표 기업명
                </label>
                <div className="relative">
                  <select
                    value={targetGoal.company}
                    onChange={(e) => handleCompanySelectChange(e.target.value)}
                    className="w-full rounded-xl px-3.5 py-2.5 bg-[#f7f9fb] border border-[#e2e8f0] text-sm font-body text-[#191c1e] focus:border-[#003399] focus:outline-none appearance-none cursor-pointer font-medium"
                  >
                    {Object.keys(COMPANY_CONFIGS).map((compKey) => (
                      <option key={compKey} value={compKey}>
                        {COMPANY_CONFIGS[compKey].name}
                      </option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#747684] pointer-events-none text-xl">
                    expand_more
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block font-headline text-xs font-semibold text-[#444653]">
                  지원 사업부 / 부서
                </label>
                <div className="relative">
                  <select
                    value={targetGoal.division}
                    onChange={(e) => onUpdateTargetGoal({ ...targetGoal, division: e.target.value })}
                    className="w-full rounded-xl px-3.5 py-2.5 bg-[#f7f9fb] border border-[#e2e8f0] text-sm font-body text-[#191c1e] focus:border-[#003399] focus:outline-none appearance-none cursor-pointer"
                  >
                    {currentConfig.divisions.map((div) => (
                      <option key={div} value={div}>
                        {div}
                      </option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#747684] pointer-events-none text-xl">
                    expand_more
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="block font-headline text-xs font-semibold text-[#444653]">
                    세부 희망 직무
                  </label>
                  <span className="text-[10px] text-[#003399] font-semibold">드롭다운 선택 또는 직접 작성 가능</span>
                </div>
                <div className="space-y-2">
                  <div className="relative">
                    <select
                      value={targetGoal.role}
                      onChange={(e) => onUpdateTargetGoal({ ...targetGoal, role: e.target.value })}
                      className="w-full rounded-xl px-3.5 py-2.5 bg-[#f7f9fb] border border-[#e2e8f0] text-sm font-body text-[#191c1e] focus:border-[#003399] focus:outline-none appearance-none cursor-pointer"
                    >
                      {currentConfig.roles.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#747684] pointer-events-none text-xl">
                      expand_more
                    </span>
                  </div>
                  <input
                    type="text"
                    value={targetGoal.role}
                    onChange={(e) => onUpdateTargetGoal({ ...targetGoal, role: e.target.value })}
                    placeholder="직무 직접 입력 (예: C++ 자율주행 제어 엔지니어)"
                    className="w-full rounded-xl px-3.5 py-2 bg-white border border-[#d2d5d8] text-xs font-body text-[#191c1e] focus:border-[#003399] focus:outline-none"
                  />
                </div>
              </div>
            </form>
          </div>

          {/* AI Insight Mini Card */}
          <div className="bg-[#b5c4ff]/30 rounded-2xl p-5 border border-[#b5c4ff] flex gap-3.5 items-start shadow-xs">
            <span className="material-symbols-outlined text-[#003399] text-xl mt-0.5">
              lightbulb
            </span>
            <div>
              <h4 className="font-headline text-xs font-bold text-[#003399] mb-1">
                AI 직무 분석 가이드
              </h4>
              <p className="font-body text-xs text-[#00164e] leading-relaxed">
                {getAIInsight()}
              </p>
            </div>
          </div>
        </section>

        {/* Right Panel: Academic, Languages, Certifications */}
        <section className="lg:col-span-8 flex flex-col gap-6">
          {/* Academic Credentials Card */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 md:p-7 shadow-sm border border-[#e0e3e5]">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#e0e3e5]">
              <div className="w-10 h-10 rounded-xl bg-[#eceef0] flex items-center justify-center text-[#002068]">
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  school
                </span>
              </div>
              <h3 className="font-headline text-lg font-bold text-[#191c1e]">
                학력 및 학점 정보
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1">
                <label className="block font-headline text-xs font-semibold text-[#444653]">
                  출신 대학교
                </label>
                <input
                  type="text"
                  value={academic.university}
                  onChange={(e) => onUpdateAcademic({ ...academic, university: e.target.value })}
                  placeholder="예: 서울대학교, 한국과학기술원(KAIST)"
                  className="w-full rounded-xl px-3.5 py-2.5 bg-[#f7f9fb] border border-[#e2e8f0] text-sm font-body text-[#191c1e] focus:border-[#003399] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-headline text-xs font-semibold text-[#444653]">
                  전공 / 학과
                </label>
                <input
                  type="text"
                  value={academic.major}
                  onChange={(e) => onUpdateAcademic({ ...academic, major: e.target.value })}
                  placeholder="예: 컴퓨터공학, 전자전기공학"
                  className="w-full rounded-xl px-3.5 py-2.5 bg-[#f7f9fb] border border-[#e2e8f0] text-sm font-body text-[#191c1e] focus:border-[#003399] focus:outline-none"
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="block font-headline text-xs font-semibold text-[#444653]">
                  평점 학점 (4.5 만점 기준)
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="4.5"
                    value={academic.gpa}
                    onChange={(e) =>
                      onUpdateAcademic({
                        ...academic,
                        gpa: Math.min(4.5, Math.max(0, parseFloat(e.target.value) || 0)),
                      })
                    }
                    className="w-28 rounded-xl px-3 py-2 bg-[#f7f9fb] border border-[#e2e8f0] font-headline text-xl font-bold text-center text-[#002068] focus:border-[#003399] focus:outline-none"
                  />
                  <span className="font-body text-sm text-[#747684]">/ 4.5</span>

                  {/* GPA Visual Progress Bar */}
                  <div className="flex-1 h-3 bg-[#eceef0] rounded-full overflow-hidden ml-2">
                    <div
                      className="h-full bg-gradient-to-r from-[#003399] to-[#00e3fd] rounded-full transition-all duration-300"
                      style={{ width: `${gpaPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Language Scores */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e0e3e5]">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#002068]">language</span>
                  <h3 className="font-headline text-base font-bold text-[#191c1e]">어학 성적</h3>
                </div>
                <button
                  onClick={handleAddLanguage}
                  className="text-[#002068] hover:text-[#003399] transition-colors p-1 rounded hover:bg-[#eceef0] flex items-center gap-1 text-xs font-bold font-headline cursor-pointer"
                >
                  <span className="material-symbols-outlined text-lg">add_circle</span>
                  추가
                </button>
              </div>

              <div className="space-y-3">
                {languages.length === 0 ? (
                  <p className="text-xs text-[#747684] italic py-2">
                    등록된 어학 성적이 없습니다. &quot;추가&quot; 버튼을 눌러 토익/OPIc 성적을 추가해보세요.
                  </p>
                ) : (
                  languages.map((lang) => (
                    <div key={lang.id} className="flex items-center gap-2 bg-[#f7f9fb] p-2.5 rounded-xl border border-[#e2e8f0]">
                      <div className="flex-1">
                        <select
                          value={lang.testType}
                          onChange={(e) => handleLanguageChange(lang.id, 'testType', e.target.value)}
                          className="w-full rounded-lg px-2 py-1 bg-white border border-[#e2e8f0] text-xs font-body font-medium"
                        >
                          <option value="TOEIC">TOEIC</option>
                          <option value="OPIc">OPIc</option>
                          <option value="TOEIC Speaking">TOEIC Speaking</option>
                          <option value="TOEFL">TOEFL</option>
                        </select>
                      </div>

                      {lang.testType === 'OPIc' ? (
                        <div className="w-20">
                          <select
                            value={lang.grade || 'AL'}
                            onChange={(e) => handleLanguageChange(lang.id, 'grade', e.target.value)}
                            className="w-full rounded-lg px-2 py-1 bg-white border border-[#e2e8f0] text-xs text-center font-bold font-headline text-[#002068]"
                          >
                            <option value="AL">AL</option>
                            <option value="IH">IH</option>
                            <option value="IM3">IM3</option>
                            <option value="IM2">IM2</option>
                          </select>
                        </div>
                      ) : (
                        <div className="w-20">
                          <input
                            type="text"
                            value={lang.score}
                            onChange={(e) => handleLanguageChange(lang.id, 'score', e.target.value)}
                            placeholder="점수"
                            className="w-full rounded-lg px-2 py-1 bg-white border border-[#e2e8f0] text-xs text-center font-bold font-headline text-[#002068]"
                          />
                        </div>
                      )}

                      <button
                        onClick={() => handleDeleteLanguage(lang.id)}
                        className="p-1 text-[#747684] hover:text-[#ba1a1a] transition-colors cursor-pointer"
                        title="삭제"
                      >
                        <span className="material-symbols-outlined text-lg">delete</span>
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e0e3e5]">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#002068]">workspace_premium</span>
                  <h3 className="font-headline text-base font-bold text-[#191c1e]">자격증 정보</h3>
                </div>
                <button
                  onClick={() => setShowCertModal(true)}
                  className="text-[#002068] hover:text-[#003399] transition-colors p-1 rounded hover:bg-[#eceef0] flex items-center gap-1 text-xs font-bold font-headline cursor-pointer"
                >
                  <span className="material-symbols-outlined text-lg">add_circle</span>
                  추가
                </button>
              </div>

              <div className="space-y-2.5">
                {certifications.map((cert) => (
                  <div
                    key={cert.id}
                    className="flex items-center justify-between p-3 border border-[#e0e3e5] rounded-xl bg-[#f7f9fb]"
                  >
                    <div>
                      <p className="font-body text-xs font-semibold text-[#191c1e]">
                        {cert.name}
                      </p>
                      <p className="font-body text-[11px] text-[#747684] mt-0.5">
                        {cert.issuer} • {cert.date}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteCert(cert.id)}
                      className="text-[#747684] hover:text-[#ba1a1a] transition-colors p-1 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-base">close</span>
                    </button>
                  </div>
                ))}

                {/* Add Certificate Box Button */}
                <div
                  onClick={() => setShowCertModal(true)}
                  className="border border-dashed border-[#c4c5d5] rounded-xl p-3 flex items-center justify-center gap-2 bg-[#f2f4f6] hover:bg-[#eceef0] transition-colors cursor-pointer group"
                >
                  <span className="material-symbols-outlined text-[#747684] group-hover:text-[#002068] text-sm">
                    add
                  </span>
                  <span className="font-headline text-xs font-semibold text-[#444653] group-hover:text-[#002068]">
                    자격증 추가하기
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Bottom Action Bar */}
      <div className="mt-8 flex justify-end gap-3 pt-4 border-t border-[#e0e3e5]">
        <button
          onClick={onSaveDraft}
          className="px-6 py-3 rounded-xl border border-[#002068] text-[#002068] font-headline font-semibold text-sm hover:bg-[#dce1ff]/50 transition-colors cursor-pointer"
        >
          임시 저장
        </button>

        <button
          onClick={onProceedToExperience}
          className="px-8 py-3 rounded-xl bg-[#002068] text-white font-headline font-bold text-sm hover:bg-[#003399] shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
        >
          경험 및 자소서 입력으로 이동
          <span className="material-symbols-outlined text-base">arrow_forward</span>
        </button>
      </div>

      {/* Add Certification Modal */}
      {showCertModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-[#e0e3e5] animate-scale-in">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-headline font-bold text-lg text-[#002068]">자격증 추가</h3>
              <button 
                onClick={() => setShowCertModal(false)}
                className="p-1 text-[#747684] hover:text-[#191c1e] cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleAddCertSubmit} className="space-y-4">
              <div>
                <label className="block font-headline text-xs font-semibold text-[#444653] mb-1">
                  자격증명
                </label>
                <input
                  type="text"
                  placeholder="예: 정보처리기사, AWS Solutions Architect"
                  value={newCertName}
                  onChange={(e) => setNewCertName(e.target.value)}
                  className="w-full rounded-xl px-3.5 py-2 bg-[#f7f9fb] border border-[#e2e8f0] text-sm"
                  required
                />
              </div>

              <div>
                <label className="block font-headline text-xs font-semibold text-[#444653] mb-1">
                  발급 기관
                </label>
                <input
                  type="text"
                  placeholder="예: 한국산업인력공단, Amazon Web Services"
                  value={newCertIssuer}
                  onChange={(e) => setNewCertIssuer(e.target.value)}
                  className="w-full rounded-xl px-3.5 py-2 bg-[#f7f9fb] border border-[#e2e8f0] text-sm"
                />
              </div>

              <div>
                <label className="block font-headline text-xs font-semibold text-[#444653] mb-1">
                  취득 연월
                </label>
                <input
                  type="text"
                  placeholder="예: 2023.08"
                  value={newCertDate}
                  onChange={(e) => setNewCertDate(e.target.value)}
                  className="w-full rounded-xl px-3.5 py-2 bg-[#f7f9fb] border border-[#e2e8f0] text-sm"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCertModal(false)}
                  className="px-4 py-2 rounded-xl border border-[#e2e8f0] text-xs font-headline font-semibold text-[#444653] cursor-pointer"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#002068] text-white text-xs font-headline font-bold cursor-pointer"
                >
                  자격증 등록
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
