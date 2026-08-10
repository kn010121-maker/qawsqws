import React from 'react';
import { AppView } from '../types';

interface SidebarNavProps {
  currentView: AppView;
  onSelectView: (view: AppView) => void;
  onStartNewAnalysis: () => void;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  currentView,
  onSelectView,
  onStartNewAnalysis,
}) => {
  return (
    <>
      {/* Mobile Top Header */}
      <header className="md:hidden sticky top-0 w-full z-50 flex justify-between items-center px-4 py-3 bg-white border-b border-[#e0e3e5] shadow-xs">
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => onSelectView('home')}
        >
          <div className="w-8 h-8 rounded-full bg-[#003399] flex items-center justify-center text-white font-bold text-sm">
            N
          </div>
          <div>
            <span className="font-headline font-bold text-[#002068] text-lg">Nexus AI</span>
            <span className="block text-[10px] text-[#444653] leading-none">대기업 합격 진단 솔루션</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={onStartNewAnalysis}
            className="px-3 py-1.5 bg-[#00e3fd] text-[#00616d] text-xs font-semibold rounded-lg flex items-center gap-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            새 진단
          </button>
          <button 
            onClick={() => onSelectView('home')}
            className="p-1.5 text-[#444653] hover:text-[#002068] cursor-pointer"
            title="홈으로 이동"
          >
            <span className="material-symbols-outlined">home</span>
          </button>
        </div>
      </header>

      {/* Desktop Fixed Side Navigation Bar */}
      <nav className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 bg-white border-r border-[#c4c5d5] p-4 gap-2 z-40 shadow-sm">
        {/* Brand Header */}
        <div 
          className="mb-6 mt-2 px-2 flex items-center gap-3 cursor-pointer group"
          onClick={() => onSelectView('home')}
        >
          <div className="w-10 h-10 rounded-full bg-[#003399] flex items-center justify-center overflow-hidden border border-[#dce1ff] shadow-sm group-hover:scale-105 transition-transform">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXRkD0iHG0XyONptfRwm2BxDPcHi3Nx2ANNw6gPnZsKMUlWyZ_bVf_NwpzCLv8IrnTrOu-JkcDxCqi8RNjKU6kOlTx_bJ6lrwRBadq4lMSJ1d_DfNQI5GVCWUN82eALSPBKmTlp90_ztuZUbxgbwaOMNYm8eL8Mkyk2uiEXjq_lLPMLxnvTI3t35Gscr23LGISbx34xjvgiFn4fE9Sp3_kMQbnTF1hMrQziLAWGn9TkISNTWS56O5W"
              alt="Nexus AI Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="font-headline text-xl font-bold text-[#002068] tracking-tight group-hover:text-[#003399] transition-colors">
              Nexus AI
            </h1>
            <p className="font-body text-xs text-[#444653] font-medium opacity-80">
              대기업 합격 진단 솔루션
            </p>
          </div>
        </div>

        {/* Navigation Items */}
        <ul className="flex flex-col gap-1.5 flex-grow">
          <li>
            <button
              onClick={() => onSelectView('goal_spec')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-headline text-sm font-semibold transition-all cursor-pointer ${
                currentView === 'goal_spec'
                  ? 'bg-[#003399] text-white shadow-md translate-x-1'
                  : 'text-[#444653] hover:bg-[#eceef0] hover:text-[#002068]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: currentView === 'goal_spec' ? "'FILL' 1" : "'FILL' 0" }}>
                target
              </span>
              <span>목표 기업 및 직무</span>
            </button>
          </li>

          <li>
            <button
              onClick={() => onSelectView('goal_spec')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-headline text-sm font-semibold transition-all cursor-pointer ${
                currentView === 'goal_spec'
                  ? 'bg-[#003399]/90 text-white shadow-sm translate-x-1'
                  : 'text-[#444653] hover:bg-[#eceef0] hover:text-[#002068]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">list_alt</span>
              <span>학점/어학/자격증</span>
            </button>
          </li>

          <li>
            <button
              onClick={() => onSelectView('experience')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-headline text-sm font-semibold transition-all cursor-pointer ${
                currentView === 'experience'
                  ? 'bg-[#003399] text-white shadow-md translate-x-1'
                  : 'text-[#444653] hover:bg-[#eceef0] hover:text-[#002068]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: currentView === 'experience' ? "'FILL' 1" : "'FILL' 0" }}>
                work_history
              </span>
              <span>직무 경험 및 자소서</span>
            </button>
          </li>

          <li>
            <button
              onClick={() => onSelectView('analysis')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-headline text-sm font-semibold transition-all cursor-pointer ${
                currentView === 'analysis'
                  ? 'bg-[#003399] text-white shadow-md translate-x-1'
                  : 'text-[#444653] hover:bg-[#eceef0] hover:text-[#002068]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: currentView === 'analysis' ? "'FILL' 1" : "'FILL' 0" }}>
                analytics
              </span>
              <span>AI 합격 리포트</span>
            </button>
          </li>

          <div className="my-2 border-t border-[#e0e3e5]" />

          <li>
            <button
              onClick={() => onSelectView('history')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-headline text-sm font-medium transition-all cursor-pointer ${
                currentView === 'history'
                  ? 'bg-[#dce1ff] text-[#00164e] font-semibold'
                  : 'text-[#444653] hover:bg-[#eceef0]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">history</span>
              <span>진단 이력 관리</span>
            </button>
          </li>

          <li>
            <button
              onClick={() => onSelectView('community')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-headline text-sm font-medium transition-all cursor-pointer ${
                currentView === 'community'
                  ? 'bg-[#dce1ff] text-[#00164e] font-semibold'
                  : 'text-[#444653] hover:bg-[#eceef0]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">groups</span>
              <span>합격자 리포트 샘플</span>
            </button>
          </li>
        </ul>

        {/* Start New Analysis Button */}
        <div className="mt-auto pt-4 border-t border-[#e0e3e5]">
          <button
            onClick={onStartNewAnalysis}
            className="w-full py-3 px-4 bg-[#00e3fd] text-[#00616d] font-headline font-bold text-sm rounded-xl hover:bg-[#00daf3] transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow active:scale-98 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            새 합격 진단 시작
          </button>
        </div>
      </nav>
    </>
  );
};
