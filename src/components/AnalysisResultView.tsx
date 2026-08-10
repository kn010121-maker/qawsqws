import React, { useState, useRef } from 'react';
import { AnalysisResult } from '../types';

interface AnalysisResultViewProps {
  result: AnalysisResult;
  onEditAndReanalyze: () => void;
}

export const AnalysisResultView: React.FC<AnalysisResultViewProps> = ({
  result,
  onEditAndReanalyze,
}) => {
  const [showResourcesModal, setShowResourcesModal] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [isFullScreenPrint, setIsFullScreenPrint] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  const {
    company = '삼성전자',
    division = 'DS부서',
    role = '소프트웨어 엔지니어 (백엔드)',
    probability = 78,
    level = '높음',
    summaryQuote = '"목표 직무 및 기업 요구 스펙과의 적합도가 우수합니다. 어학 및 직무 맞춤 자격증을 일부 보완하면 상위 10% 지원자군 진입이 가능합니다."',
    radar = {
      mySpecs: { gpa: 84, language: 70, experience: 90, certificates: 50, resumeScore: 80 },
      avgPassers: { gpa: 82, language: 80, experience: 65, certificates: 60, resumeScore: 75 },
    },
    radarInsight = '실무 직무 경험 항목에서 합격자 평균 수치를 크게 상회하고 있어, 약간 부족한 어학 점수를 보완해주는 강력한 강점으로 작용하고 있습니다.',
    coreStrengths = [
      {
        title: '직무 연관 키워드 높은 적합도',
        description: "자기소개서 분석 결과, 대용량 아키텍처 및 API 설계 등 직무 핵심 키워드가 우수하게 반영되어 있습니다.",
      },
      {
        title: '탁월한 실무 프로젝트 경험',
        description: '2개 이상의 관련 프로젝트 및 인턴십 수행 경험으로 상위 지원자 그룹 수준의 실무 역량을 입증했습니다.',
      },
    ],
    strengthTags = ['#백엔드아키텍처', '#문제해결력', '#실무경험'],
    areasForOptimization = [
      {
        title: '클라우드 / 전문 자격증 보완',
        description: '삼성/네이버/카카오 등 주요 기술 기업 합격자 중 약 65%가 AWS나 정보처리기사 등 전문 자격을 보유하고 있습니다.',
        impact: '+4%',
      },
      {
        title: '어학 성적 등급 상향 (권장)',
        description: 'OPIc IH 이상 또는 토익 850점 이상 달성 시 서류전형 및 글로벌 직무 경쟁력이 한층 강화됩니다.',
        impact: '+3%',
      },
    ],
    studyResources = [
      { title: `${company} 최신 채용 트렌드 및 기출 분석집`, category: '족보/기출', url: '#' },
      { title: 'AWS Certified Solutions Architect 자격증 대비 키트', category: '자격증', url: '#' },
      { title: 'STAR 기법 기반 역량면접 자기소개 완성 가이드', category: '면접가이드', url: '#' },
    ],
  } = result;

  // Generate standalone HTML string for Blob / Window printing
  const getPrintableHtml = () => `
    <!DOCTYPE html>
    <html lang="ko">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Nexus AI - ${company} 합격 진단 리포트</title>
        <style>
          @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');
          * { box-sizing: border-box; }
          body { font-family: Pretendard, -apple-system, sans-serif; padding: 40px; color: #191c1e; background: #ffffff; line-height: 1.6; max-width: 800px; margin: 0 auto; }
          .header { border-bottom: 3px solid #002068; padding-bottom: 16px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: flex-end; }
          .brand { font-size: 13px; font-weight: 800; color: #002068; letter-spacing: 1.5px; }
          .title { font-size: 26px; font-weight: 800; color: #002068; margin-top: 4px; }
          .subtitle { font-size: 14px; color: #444653; margin-top: 6px; }
          .badge { display: inline-block; padding: 8px 20px; background: #002068; color: #ffffff; font-weight: 800; font-size: 18px; border-radius: 8px; }
          .card { background: #f7f9fb; border: 1px solid #d2d5d8; padding: 20px; border-radius: 12px; margin-bottom: 20px; page-break-inside: avoid; }
          .section-title { font-size: 16px; font-weight: bold; color: #002068; margin-bottom: 12px; border-bottom: 1px solid #e0e3e5; padding-bottom: 6px; }
          ul { padding-left: 20px; margin: 0; }
          li { margin-bottom: 8px; font-size: 14px; }
          .toolbar { background: #eef2ff; border: 1px solid #c7d2fe; padding: 14px 20px; border-radius: 12px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center; }
          .btn { background: #002068; color: white; padding: 10px 22px; font-weight: bold; border: none; border-radius: 8px; cursor: pointer; font-size: 14px; }
          @media print { .no-print { display: none !important; } body { padding: 0; max-width: 100%; } }
        </style>
      </head>
      <body>
        <div class="toolbar no-print">
          <span style="font-weight:bold; color:#1e1b4b; font-size: 14px;">🖨️ 인쇄 / PDF 저장 준비 완료!</span>
          <button class="btn" onclick="window.focus(); window.print();">지금 인쇄 / PDF로 저장하기</button>
        </div>

        <div class="header">
          <div>
            <div class="brand">NEXUS CAREER AI REPORT</div>
            <div class="title">${company} 합격 진단 리포트</div>
            <div class="subtitle">지원 부서: <strong>${division}</strong> | 지원 직무: <strong>${role}</strong></div>
          </div>
          <div>
            <span class="badge">${probability}% (${level})</span>
          </div>
        </div>

        <div class="card">
          <div class="section-title">1. 최종 진단 총평</div>
          <p style="font-size: 15px; font-weight: 600; color: #002068; margin: 0;">${summaryQuote}</p>
        </div>

        <div class="card">
          <div class="section-title">2. 스펙 레이더 비교 분석 (상위 10% 합격자 대비)</div>
          <p style="margin-bottom: 12px; font-size: 14px; color: #444653;">${radarInsight}</p>
          <ul>
            <li><strong>학점 (GPA):</strong> 지원자 ${radar.mySpecs.gpa}점 / 합격자 평균 ${radar.avgPassers.gpa}점</li>
            <li><strong>공인 어학 성적:</strong> 지원자 ${radar.mySpecs.language}점 / 합격자 평균 ${radar.avgPassers.language}점</li>
            <li><strong>실무/프로젝트 경험:</strong> 지원자 ${radar.mySpecs.experience}점 / 합격자 평균 ${radar.avgPassers.experience}점</li>
            <li><strong>직무 관련 자격증:</strong> 지원자 ${radar.mySpecs.certificates}점 / 합격자 평균 ${radar.avgPassers.certificates}점</li>
            <li><strong>자기소개서 완성도:</strong> 지원자 ${radar.mySpecs.resumeScore}점 / 합격자 평균 ${radar.avgPassers.resumeScore}점</li>
          </ul>
        </div>

        <div class="card">
          <div class="section-title">3. 핵심 직무 강점 (Core Strengths)</div>
          <ul>
            ${coreStrengths.map(s => `<li><strong>${s.title}:</strong> ${s.description}</li>`).join('')}
          </ul>
        </div>

        <div class="card">
          <div class="section-title">4. 합격 가능성 향상 전략 (Areas for Optimization)</div>
          <ul>
            ${areasForOptimization.map(a => `<li><strong>${a.title} (${a.impact}):</strong> ${a.description}</li>`).join('')}
          </ul>
        </div>
      </body>
    </html>
  `;

  // Open Blob URL in a clean standalone tab (bypasses iframe sandbox cross-origin limits)
  const handleOpenBlobInNewTab = () => {
    try {
      const htmlStr = getPrintableHtml();
      const blob = new Blob([htmlStr], { type: 'text/html;charset=utf-8' });
      const blobUrl = URL.createObjectURL(blob);
      const newWin = window.open(blobUrl, '_blank');
      if (!newWin) {
        const a = document.createElement('a');
        a.href = blobUrl;
        a.target = '_blank';
        a.click();
      }
    } catch (e) {
      console.error('Blob URL open failed:', e);
      setIsFullScreenPrint(true);
    }
  };

  // Trigger Print Mode Overlay & Print Dialog
  const handleOpenPrintDialog = () => {
    setIsFullScreenPrint(true);
  };

  // Immediate Print trigger
  const handlePrintNow = () => {
    try {
      window.focus();
      window.print();
    } catch (e) {
      handleOpenBlobInNewTab();
    }
  };

  // Copy plain text summary to clipboard
  const handleCopyReportText = () => {
    const textContent = `
[Nexus AI 합격 진단 리포트]
■ 지원 기업: ${company} (${division})
■ 지원 직무: ${role}
■ 합격 가능성: ${probability}% (${level})

■ 진단 요약:
${summaryQuote}

■ 핵심 직무 강점:
${coreStrengths.map(s => `- ${s.title}: ${s.description}`).join('\n')}

■ 스펙 보완 포인트:
${areasForOptimization.map(a => `- ${a.title} (${a.impact}): ${a.description}`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(textContent).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2500);
    });
  };

  // Convert 0-100 values to SVG Radar points
  const getRadarPoint = (index: number, val: number, maxRadius = 70, cx = 100, cy = 100) => {
    const angle = (Math.PI / 180) * (index * 72 - 90);
    const r = (val / 100) * maxRadius;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  };

  const mySpecsPoints = [
    getRadarPoint(0, radar.mySpecs.gpa),
    getRadarPoint(1, radar.mySpecs.language),
    getRadarPoint(2, radar.mySpecs.experience),
    getRadarPoint(3, radar.mySpecs.certificates),
    getRadarPoint(4, radar.mySpecs.resumeScore),
  ].join(' ');

  const avgPassersPoints = [
    getRadarPoint(0, radar.avgPassers.gpa),
    getRadarPoint(1, radar.avgPassers.language),
    getRadarPoint(2, radar.avgPassers.experience),
    getRadarPoint(3, radar.avgPassers.certificates),
    getRadarPoint(4, radar.avgPassers.resumeScore),
  ].join(' ');

  // Level badge dynamic color
  const getLevelColor = (lvl: string, prob: number) => {
    if (lvl === '매우 높음' || prob >= 75) return 'text-[#10B981] bg-[#d1fae5] border-[#a7f3d0]';
    if (lvl === '높음' || prob >= 60) return 'text-[#002068] bg-[#dce1ff] border-[#b4c6ff]';
    if (lvl === '보통' || prob >= 45) return 'text-[#d97706] bg-[#fef3c7] border-[#fde68a]';
    return 'text-[#e11d48] bg-[#ffe4e6] border-[#fecdd3]';
  };

  // SVG Donut calculation
  const strokeDash = `${probability}, 100`;

  return (
    <div ref={reportRef} className="p-4 sm:p-6 md:p-8 max-w-6xl mx-auto w-full pb-24 bg-[#f7f9fb]">
      {/* Top Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="font-headline text-2xl md:text-3xl font-bold text-[#002068]">
            AI 합격 진단 리포트
          </h1>
          <p className="font-body text-xs md:text-sm text-[#444653] mt-1">
            분석 대상: <strong className="text-[#002068]">{company}</strong> · 희망 직무:{' '}
            <strong className="text-[#002068]">{role}</strong>
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5 no-print">
          <button
            onClick={handleOpenPrintDialog}
            className="px-5 py-2.5 bg-[#002068] text-white font-headline font-semibold text-xs md:text-sm rounded-xl hover:bg-[#003399] transition-colors flex items-center gap-2 cursor-pointer shadow-md"
          >
            <span className="material-symbols-outlined text-base">print</span>
            리포트 인쇄 / PDF 저장
          </button>

          <button
            onClick={onEditAndReanalyze}
            className="px-4 py-2.5 bg-[#f2f4f6] border border-[#d2d5d8] text-[#191c1e] font-headline font-semibold text-xs md:text-sm rounded-xl hover:bg-[#e0e3e5] transition-opacity flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <span className="material-symbols-outlined text-base">edit</span>
            스펙 수정
          </button>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Pass Probability Card (Top/Left) */}
        <div className="lg:col-span-4 bg-white rounded-2xl shadow-ambient p-6 flex flex-col items-center justify-center relative overflow-hidden border border-[#e0e3e5]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#dce1ff]/20 to-transparent pointer-events-none" />

          <h3 className="font-headline text-base font-bold text-[#191c1e] w-full flex items-center gap-2 mb-6 z-10">
            <span className="material-symbols-outlined text-[#002068]">speed</span>
            최종 합격 가능성
          </h3>

          {/* SVG Animated Donut Chart */}
          <div className="relative w-48 h-48 z-10 my-2">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              {/* Background Track Circle */}
              <path
                className="text-[#e0e3e5]"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              />
              {/* Progress Circle */}
              <path
                className="text-[#002068] circular-chart-anim drop-shadow-md"
                style={{ '--target-dash': probability } as React.CSSProperties}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeDasharray={strokeDash}
                strokeLinecap="round"
                strokeWidth="3.5"
              />
            </svg>

            {/* Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-headline font-bold text-4xl text-[#002068]">
                {probability}<span className="text-xl">%</span>
              </span>
              <span className={`font-headline text-xs font-bold px-2.5 py-0.5 rounded-full border mt-1.5 flex items-center gap-0.5 ${getLevelColor(level, probability)}`}>
                <span className="material-symbols-outlined text-xs">analytics</span>
                {level}
              </span>
            </div>
          </div>

          <div className="mt-6 text-center z-10 px-2">
            <p className="font-body text-xs md:text-sm text-[#444653] italic leading-relaxed">
              {summaryQuote}
            </p>
          </div>
        </div>

        {/* Radar Chart Card (Middle/Right) */}
        <div className="lg:col-span-8 bg-white rounded-2xl shadow-ambient p-6 flex flex-col border border-[#e0e3e5]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6">
            <h3 className="font-headline text-base font-bold text-[#191c1e] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#002068]">radar</span>
              합격자 평균 스펙 다각도 비교
            </h3>

            <div className="flex gap-4 font-headline text-xs font-semibold">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#00e3fd] border border-[#003399]" />
                내 스펙
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#e0e3e5] border border-[#747684]" />
                합격자 평균
              </div>
            </div>
          </div>

          {/* Radar Chart Graphic */}
          <div className="flex-grow flex items-center justify-center relative min-h-[280px]">
            <svg className="w-full max-w-[360px] h-auto" viewBox="0 0 200 200">
              {/* Background Grid Polygons */}
              <polygon fill="none" points="100,20 176,75 147,165 53,165 24,75" stroke="#e0e3e5" strokeWidth="1" />
              <polygon fill="none" points="100,40 157,81 135,150 65,150 43,81" stroke="#e0e3e5" strokeWidth="1" />
              <polygon fill="none" points="100,60 138,87 123,135 77,135 62,87" stroke="#e0e3e5" strokeWidth="1" />
              <polygon fill="none" points="100,80 119,94 112,120 88,120 81,94" stroke="#e0e3e5" strokeWidth="1" />

              {/* Axes Lines */}
              <line stroke="#e0e3e5" strokeWidth="1" x1="100" y1="100" x2="100" y2="20" />
              <line stroke="#e0e3e5" strokeWidth="1" x1="100" y1="100" x2="176" y2="75" />
              <line stroke="#e0e3e5" strokeWidth="1" x1="100" y1="100" x2="147" y2="165" />
              <line stroke="#e0e3e5" strokeWidth="1" x1="100" y1="100" x2="53" y2="165" />
              <line stroke="#e0e3e5" strokeWidth="1" x1="100" y1="100" x2="24" y2="75" />

              {/* Average Passers Data Polygon */}
              <polygon
                fill="#e0e3e5"
                fillOpacity="0.4"
                points={avgPassersPoints}
                stroke="#747684"
                strokeDasharray="4,4"
                strokeWidth="1.5"
              />

              {/* User Candidate Data Polygon */}
              <polygon
                fill="#00e3fd"
                fillOpacity="0.35"
                points={mySpecsPoints}
                stroke="#003399"
                strokeWidth="2.5"
              />

              {/* Axes Labels */}
              <text fill="#0A192F" fontFamily="sans-serif" fontSize="9" fontWeight="700" textAnchor="middle" x="100" y="12">학점</text>
              <text fill="#0A192F" fontFamily="sans-serif" fontSize="9" fontWeight="700" textAnchor="start" x="182" y="77">어학성적</text>
              <text fill="#0A192F" fontFamily="sans-serif" fontSize="9" fontWeight="700" textAnchor="start" x="152" y="178">직무경험</text>
              <text fill="#0A192F" fontFamily="sans-serif" fontSize="9" fontWeight="700" textAnchor="end" x="48" y="178">자격증</text>
              <text fill="#0A192F" fontFamily="sans-serif" fontSize="9" fontWeight="700" textAnchor="end" x="18" y="77">자소서</text>
            </svg>
          </div>

          <div className="mt-4 bg-[#f2f4f6] p-4 rounded-xl flex items-start gap-3 border border-[#e0e3e5]">
            <span className="material-symbols-outlined text-[#002068] mt-0.5 text-lg">
              insights
            </span>
            <p className="font-body text-xs md:text-sm text-[#444653] leading-relaxed">
              {radarInsight}
            </p>
          </div>
        </div>
      </div>

      {/* AI Strategic Feedback Section */}
      <div className="mt-8">
        <h2 className="font-headline text-xl md:text-2xl font-bold text-[#002068] mb-6">
          AI 맞춤 합격 전략 피드백
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Core Strengths Card */}
          <div className="bg-white rounded-2xl shadow-ambient p-6 border-t-4 border-[#10B981] border-x border-b border-[#e0e3e5]">
            <h3 className="font-headline text-base font-bold text-[#191c1e] flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-[#10B981]">psychology_alt</span>
              핵심 경쟁력 및 강점
            </h3>

            <ul className="space-y-4">
              {coreStrengths.map((strength, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#10B981] mt-0.5 text-lg">
                    check_circle
                  </span>
                  <div>
                    <h4 className="font-headline text-xs font-bold text-[#191c1e]">
                      {strength.title}
                    </h4>
                    <p className="font-body text-xs text-[#444653] mt-0.5 leading-relaxed">
                      {strength.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-2">
              {strengthTags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-[#dbe1ff] text-[#00174c] font-headline font-medium text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Areas for Optimization Card */}
          <div className="bg-white rounded-2xl shadow-ambient p-6 border-t-4 border-[#F59E0B] glow-accent border-x border-b border-[#e0e3e5]">
            <h3 className="font-headline text-base font-bold text-[#191c1e] flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-[#F59E0B]">build</span>
              우선 보완 권장 항목
            </h3>

            <ul className="space-y-4">
              {areasForOptimization.map((area, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#F59E0B] mt-0.5 text-lg">
                    error
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-headline text-xs font-bold text-[#191c1e]">
                        {area.title}
                      </h4>
                      {area.impact && (
                        <span className="text-[10px] bg-[#F59E0B]/15 text-[#b45309] font-bold px-1.5 py-0.5 rounded">
                          기대 상승분 {area.impact}
                        </span>
                      )}
                    </div>
                    <p className="font-body text-xs text-[#444653] mt-0.5 leading-relaxed">
                      {area.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 text-right no-print">
              <button
                onClick={() => setShowResourcesModal(true)}
                className="text-[#002068] font-headline text-xs font-bold hover:underline flex items-center justify-end gap-1 w-full cursor-pointer"
              >
                추천 맞춤 학습 자료 보기
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Action Bar (Sticky Bottom) */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md p-4 shadow-lg border-t border-[#e0e3e5] flex gap-3 z-50 no-print">
        <button
          onClick={handleOpenPrintDialog}
          className="flex-1 py-3 bg-[#002068] text-white font-headline font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm">print</span>
          PDF 인쇄/저장
        </button>

        <button
          onClick={onEditAndReanalyze}
          className="flex-1 py-3 border-2 border-[#002068] text-[#002068] font-headline font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm">edit</span>
          스펙 수정
        </button>
      </div>

      {/* PDF Print Guide Modal */}
      {showPrintModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 no-print">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#e0e3e5]">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-[#e0e3e5]">
              <h3 className="font-headline font-bold text-lg text-[#002068] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#002068]">print</span>
                리포트 인쇄 및 PDF 저장
              </h3>
              <button
                onClick={() => setShowPrintModal(false)}
                className="p-1 text-[#747684] hover:text-[#191c1e] cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-3 font-body text-xs text-[#444653] mb-6 leading-relaxed">
              <div className="p-3.5 bg-[#eef2ff] border border-[#c7d2fe] rounded-xl text-[#1e1b4b] flex items-start gap-2.5">
                <span className="material-symbols-outlined text-base text-[#4338ca] mt-0.5">picture_as_pdf</span>
                <div>
                  <strong className="text-[#002068] text-xs">PDF 파일 보관 팁 (PDF 저장)</strong>
                  <p className="mt-1 text-[11px] text-[#3730a3] leading-normal">
                    인쇄 창의 <strong>'대상(프린터)'</strong> 메뉴에서 <strong>'PDF로 저장'</strong> 또는 <strong>'Microsoft Print to PDF'</strong>를 선택하시면 본 합격 진단 리포트 전체를 PDF 파일로 즉시 저장하실 수 있습니다.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2.5 pt-2">
                <button
                  onClick={() => {
                    window.focus();
                    window.print();
                  }}
                  className="w-full py-3 bg-[#002068] text-white font-headline font-bold text-xs rounded-xl hover:bg-[#003399] transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">print</span>
                  현재 화면 인쇄 / PDF 저장 창 열기
                </button>

                <button
                  onClick={handleOpenPrintWindow}
                  className="w-full py-2.5 border border-[#002068] text-[#002068] font-headline font-semibold text-xs rounded-xl hover:bg-[#dce1ff]/40 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">open_in_new</span>
                  전용 새 창에서 깔끔하게 인쇄하기
                </button>

                <button
                  onClick={handleCopyReportText}
                  className="w-full py-2.5 bg-[#f2f4f6] text-[#191c1e] border border-[#d2d5d8] font-headline font-semibold text-xs rounded-xl hover:bg-[#e0e3e5] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">content_copy</span>
                  {copySuccess ? '클립보드에 복사되었습니다!' : '리포트 요약 텍스트 전체 복사'}
                </button>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-[#e0e3e5]">
              <button
                onClick={() => setShowPrintModal(false)}
                className="px-5 py-2 bg-[#f2f4f6] text-[#444653] font-headline text-xs font-bold rounded-xl cursor-pointer hover:bg-[#e0e3e5]"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Study Resources Modal */}
      {showResourcesModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4 no-print">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#e0e3e5]">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-[#e0e3e5]">
              <h3 className="font-headline font-bold text-lg text-[#002068] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#002068]">auto_stories</span>
                직무 맞춤 추천 학습 자료
              </h3>
              <button
                onClick={() => setShowResourcesModal(false)}
                className="p-1 text-[#747684] hover:text-[#191c1e] cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <p className="font-body text-xs text-[#444653] mb-4">
              {company} {role} 지원자를 위해 AI가 엄선한 스펙 보완 및 기출 자료 목록입니다:
            </p>

            <div className="space-y-3 mb-6">
              {studyResources.map((res, i) => (
                <a
                  key={i}
                  href={res.url}
                  onClick={(e) => {
                    e.preventDefault();
                    alert(`자료 이동: "${res.title}"`);
                  }}
                  className="flex items-center justify-between p-3.5 bg-[#f7f9fb] border border-[#e0e3e5] rounded-xl hover:border-[#002068] transition-colors group cursor-pointer"
                >
                  <div>
                    <span className="text-[10px] font-headline font-bold uppercase text-[#003399] bg-[#dce1ff] px-2 py-0.5 rounded">
                      {res.category}
                    </span>
                    <h4 className="font-headline text-xs font-bold text-[#191c1e] mt-1.5 group-hover:text-[#002068]">
                      {res.title}
                    </h4>
                  </div>
                  <span className="material-symbols-outlined text-[#747684] group-hover:text-[#002068] text-base">
                    open_in_new
                  </span>
                </a>
              ))}
            </div>

            <div className="text-right">
              <button
                onClick={() => setShowResourcesModal(false)}
                className="px-5 py-2.5 bg-[#002068] text-white font-headline text-xs font-bold rounded-xl cursor-pointer"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Clean Printable View Overlay */}
      {isFullScreenPrint && (
        <div className="fixed inset-0 bg-white z-[100] overflow-y-auto p-4 md:p-8 text-[#191c1e]">
          {/* Top Sticky Control Toolbar (Hidden in Print) */}
          <div className="sticky top-0 bg-[#002068] text-white p-4 rounded-2xl shadow-xl mb-8 flex flex-wrap items-center justify-between gap-3 no-print border border-[#003399]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-2xl text-[#dce1ff]">print</span>
              <div>
                <h3 className="font-headline font-bold text-sm md:text-base">인쇄 및 PDF 저장 전용 모드</h3>
                <p className="text-[11px] text-[#c7d2fe]">인쇄 대화 상자에서 대상(프린터)을 'PDF로 저장'으로 지정해 보세요.</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handlePrintNow}
                className="px-5 py-2.5 bg-white text-[#002068] font-headline font-extrabold text-xs md:text-sm rounded-xl hover:bg-[#dce1ff] transition-all flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span className="material-symbols-outlined text-base">print</span>
                지금 인쇄 / PDF 저장하기
              </button>

              <button
                onClick={handleOpenBlobInNewTab}
                className="px-4 py-2.5 bg-[#003399] text-white font-headline font-semibold text-xs rounded-xl hover:bg-[#002068] transition-all flex items-center gap-1.5 cursor-pointer border border-[#85a0f2]"
              >
                <span className="material-symbols-outlined text-base">open_in_new</span>
                새 탭에서 열기
              </button>

              <button
                onClick={handleCopyReportText}
                className="px-4 py-2.5 bg-[#00174a] text-[#dce1ff] font-headline font-semibold text-xs rounded-xl hover:bg-[#002068] transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">content_copy</span>
                {copySuccess ? '복사 완료!' : '텍스트 복사'}
              </button>

              <button
                onClick={() => setIsFullScreenPrint(false)}
                className="px-4 py-2.5 bg-red-600/90 text-white font-headline font-bold text-xs rounded-xl hover:bg-red-700 transition-all cursor-pointer ml-2"
              >
                ✕ 닫기
              </button>
            </div>
          </div>

          {/* Printable Paper Document Container */}
          <div className="max-w-4xl mx-auto bg-white p-6 md:p-10 border border-[#d2d5d8] shadow-lg rounded-2xl print:shadow-none print:border-none print:p-0">
            <div className="border-b-4 border-[#002068] pb-5 mb-6 flex flex-wrap justify-between items-end gap-4">
              <div>
                <div className="text-xs font-extrabold text-[#002068] tracking-widest uppercase">NEXUS CAREER AI REPORT</div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-[#002068] mt-1">{company} 합격 진단 리포트</h1>
                <p className="text-sm text-[#444653] mt-1">
                  지원 부서: <strong>{division}</strong> | 지원 직무: <strong>{role}</strong>
                </p>
              </div>
              <div className="bg-[#002068] text-white px-6 py-3 rounded-xl text-center">
                <div className="text-[10px] uppercase font-bold text-[#dce1ff]">최종 합격 가능성</div>
                <div className="text-2xl font-black">{probability}% ({level})</div>
              </div>
            </div>

            <div className="bg-[#f7f9fb] border border-[#d2d5d8] p-5 rounded-xl mb-6">
              <h2 className="text-base font-bold text-[#002068] mb-2 border-b border-[#e0e3e5] pb-2">1. 최종 진단 총평</h2>
              <p className="text-sm font-semibold text-[#002068] leading-relaxed">{summaryQuote}</p>
            </div>

            <div className="bg-[#f7f9fb] border border-[#d2d5d8] p-5 rounded-xl mb-6">
              <h2 className="text-base font-bold text-[#002068] mb-2 border-b border-[#e0e3e5] pb-2">2. 스펙 레이더 비교 분석 (상위 10% 합격자 대비)</h2>
              <p className="text-xs text-[#444653] mb-3">{radarInsight}</p>
              <ul className="space-y-2 text-xs md:text-sm pl-4 list-disc text-[#191c1e]">
                <li><strong>학점 (GPA):</strong> 지원자 {radar.mySpecs.gpa}점 / 합격자 평균 {radar.avgPassers.gpa}점</li>
                <li><strong>공인 어학 성적:</strong> 지원자 {radar.mySpecs.language}점 / 합격자 평균 {radar.avgPassers.language}점</li>
                <li><strong>실무/프로젝트 경험:</strong> 지원자 {radar.mySpecs.experience}점 / 합격자 평균 {radar.avgPassers.experience}점</li>
                <li><strong>직무 관련 자격증:</strong> 지원자 {radar.mySpecs.certificates}점 / 합격자 평균 {radar.avgPassers.certificates}점</li>
                <li><strong>자기소개서 완성도:</strong> 지원자 {radar.mySpecs.resumeScore}점 / 합격자 평균 {radar.avgPassers.resumeScore}점</li>
              </ul>
            </div>

            <div className="bg-[#f7f9fb] border border-[#d2d5d8] p-5 rounded-xl mb-6">
              <h2 className="text-base font-bold text-[#002068] mb-3 border-b border-[#e0e3e5] pb-2">3. 핵심 직무 강점 (Core Strengths)</h2>
              <div className="space-y-3">
                {coreStrengths.map((s, i) => (
                  <div key={i} className="text-xs md:text-sm">
                    <strong className="text-[#002068]">• {s.title}:</strong> <span className="text-[#444653]">{s.description}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#f7f9fb] border border-[#d2d5d8] p-5 rounded-xl mb-6">
              <h2 className="text-base font-bold text-[#002068] mb-3 border-b border-[#e0e3e5] pb-2">4. 합격 가능성 향상 전략 (Areas for Optimization)</h2>
              <div className="space-y-3">
                {areasForOptimization.map((a, i) => (
                  <div key={i} className="text-xs md:text-sm">
                    <strong className="text-[#b45309]">• {a.title} ({a.impact}):</strong> <span className="text-[#444653]">{a.description}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center pt-4 border-t border-[#e0e3e5] text-[11px] text-[#747684]">
              본 분석 리포트는 NEXUS CAREER AI의 빅데이터 알고리즘에 의해 자동 생성된 평가 결과서입니다.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

