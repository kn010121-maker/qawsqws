import React from 'react';
import { AnalysisResult } from '../types';

interface HistoryViewProps {
  history: AnalysisResult[];
  onSelectReport: (report: AnalysisResult) => void;
  onDeleteReport: (id: string) => void;
  onStartNewAnalysis: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  history,
  onSelectReport,
  onDeleteReport,
  onStartNewAnalysis,
}) => {
  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-5xl mx-auto w-full pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="font-headline text-2xl md:text-3xl font-bold text-[#002068]">
            합격 진단 이력
          </h2>
          <p className="font-body text-xs md:text-sm text-[#444653] mt-1">
            이전에 진행한 진단 리포트를 확인하고 합격 확률 변화를 트래킹하세요.
          </p>
        </div>

        <button
          onClick={onStartNewAnalysis}
          className="px-5 py-2.5 bg-[#002068] text-white font-headline font-bold text-xs md:text-sm rounded-xl hover:bg-[#003399] transition-all flex items-center gap-2 cursor-pointer shadow-sm"
        >
          <span className="material-symbols-outlined text-base">add</span>
          새 진단 실행
        </button>
      </div>

      {history.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#e0e3e5] p-12 text-center max-w-lg mx-auto shadow-xs">
          <div className="w-16 h-16 bg-[#eceef0] rounded-full flex items-center justify-center mx-auto mb-4 text-[#002068]">
            <span className="material-symbols-outlined text-3xl">history_toggle_off</span>
          </div>
          <h3 className="font-headline text-lg font-bold text-[#191c1e] mb-2">
            저장된 진단 이력이 없습니다
          </h3>
          <p className="font-body text-xs text-[#444653] mb-6">
            목표 기업 스펙과 자기소개서를 입력하고 첫 번째 AI 진단 리포트를 생성해보세요.
          </p>
          <button
            onClick={onStartNewAnalysis}
            className="px-6 py-3 bg-[#002068] text-white font-headline font-bold text-xs rounded-xl shadow-md hover:bg-[#003399] cursor-pointer"
          >
            첫 진단 시작하기
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {history.map((report) => (
            <div
              key={report.id || Math.random().toString()}
              className="bg-white rounded-2xl p-5 border border-[#e0e3e5] shadow-xs hover:border-[#002068] hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex justify-between items-start gap-2 mb-3">
                  <div>
                    <span className="text-[10px] font-headline font-bold uppercase text-[#003399] bg-[#dce1ff] px-2.5 py-0.5 rounded-full">
                      {report.company}
                    </span>
                    <h3 className="font-headline font-bold text-base text-[#191c1e] mt-1.5 group-hover:text-[#002068] transition-colors">
                      {report.role}
                    </h3>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="font-headline font-bold text-2xl text-[#002068]">
                      {report.probability}%
                    </div>
                    <span className="font-headline text-[10px] font-bold text-[#10B981]">
                      {report.level}
                    </span>
                  </div>
                </div>

                <p className="font-body text-xs text-[#747684] line-clamp-2 italic mb-4">
                  {report.summaryQuote}
                </p>
              </div>

              <div className="pt-3 border-t border-[#e0e3e5] flex justify-between items-center text-xs">
                <span className="font-body text-[#747684]">
                  {report.timestamp ? new Date(report.timestamp).toLocaleDateString('ko-KR') : '최근'}
                </span>

                <div className="flex gap-2">
                  <button
                    onClick={() => report.id && onDeleteReport(report.id)}
                    className="p-1.5 text-[#747684] hover:text-[#ba1a1a] transition-colors cursor-pointer"
                    title="삭제"
                  >
                    <span className="material-symbols-outlined text-base">delete</span>
                  </button>

                  <button
                    onClick={() => onSelectReport(report)}
                    className="px-3 py-1.5 bg-[#002068] text-white font-headline font-bold rounded-lg hover:bg-[#003399] transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    리포트 보기
                    <span className="material-symbols-outlined text-xs">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
