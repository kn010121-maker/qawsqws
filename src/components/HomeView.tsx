import React from 'react';
import { AppView } from '../types';

interface HomeViewProps {
  onStartAnalysis: () => void;
  onSelectView: (view: AppView) => void;
  onViewSampleReport: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onStartAnalysis,
  onSelectView,
  onViewSampleReport,
}) => {
  return (
    <div className="bg-[#f7f9fb] text-[#191c1e] min-h-screen flex flex-col font-body">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-4 bg-white/90 backdrop-blur-md shadow-xs border-b border-[#e0e3e5]">
        <div className="flex items-center gap-8">
          <div 
            className="font-headline text-xl md:text-2xl font-bold text-[#002068] flex items-center gap-2.5 cursor-pointer"
            onClick={() => onSelectView('home')}
          >
            <span className="material-symbols-outlined fill-icon text-2xl md:text-3xl text-[#003399]">
              insights
            </span>
            <span>Nexus Career AI</span>
          </div>

          <div className="hidden md:flex gap-6 items-center font-headline text-sm">
            <button 
              onClick={() => onSelectView('home')} 
              className="text-[#002068] border-b-2 border-[#002068] font-bold pb-0.5 px-2 py-1 cursor-pointer"
            >
              홈
            </button>
            <button 
              onClick={() => onSelectView('history')} 
              className="text-[#444653] hover:text-[#002068] transition-colors px-2 py-1 cursor-pointer"
            >
              진단 이력
            </button>
            <button 
              onClick={() => onSelectView('community')} 
              className="text-[#444653] hover:text-[#002068] transition-colors px-2 py-1 cursor-pointer"
            >
              합격자 샘플
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => alert("알림 센터: 2024년 하반기 대기업 합격 분석 데이터가 새로 업데이트되었습니다.")}
            className="text-[#444653] hover:text-[#002068] p-2 rounded-full hover:bg-[#f2f4f6] transition-colors cursor-pointer"
            title="알림"
          >
            <span className="material-symbols-outlined text-2xl">notifications</span>
          </button>

          <button 
            onClick={onStartAnalysis}
            className="hidden sm:flex px-4 py-2 bg-[#003399] text-white font-headline font-semibold text-xs md:text-sm rounded-lg hover:bg-[#002068] transition-all shadow-sm cursor-pointer"
          >
            합격 진단 시작
          </button>

          <div className="w-9 h-9 rounded-full overflow-hidden border border-[#c4c5d5] shadow-xs cursor-pointer hover:scale-105 transition-transform">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBeUuJtuxD3N5Om36nfwwF7deM1oAQh-bmFHbTOHuu-LDqigxkry-v70nKX1588q2o_fKpIVUYVTHxhHPXad2dcHrRcA2wgfDrwgbz3dxTkRXLfSi7UhtZXXrJDDUzWnWmKgVV617uSfjBPqArgmLfuXNXLVYDbrwMNsPjlNFBbxYKDjOClfzO_uOU5BBjs4NmGPDoId-95mnzfLTm2pQHUtzuOvX-OjdFkQsVj2gjfHe9m7cqbTH_e"
              alt="User profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </nav>

      {/* Main Hero Section */}
      <main className="flex-grow">
        <section className="relative pt-12 md:pt-20 pb-20 md:pb-28 px-6 md:px-12 overflow-hidden">
          <div className="absolute inset-0 hero-glow -z-10" />

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="flex flex-col gap-6 relative z-10">
              <div className="inline-flex items-center gap-2 bg-[#dce1ff] px-3.5 py-1.5 rounded-full w-fit">
                <span className="material-symbols-outlined fill-icon text-[#002068] text-base">
                  rocket_launch
                </span>
                <span className="font-headline text-xs md:text-sm text-[#002068] font-bold">
                  2024년 하반기 채용 데이터 업데이트 완료
                </span>
              </div>

              <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold text-[#0A192F] leading-tight">
                AI가 예측하는 나의<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#002068] via-[#003399] to-[#006875]">
                  대기업 합격 가능성
                </span>
              </h1>

              <p className="font-body text-base md:text-lg text-[#444653] leading-relaxed max-w-lg">
                과거 합격 데이터 50,000건 기반 정밀 분석. 당신의 이력서와 스펙을 입력하고 넥서스 AI만의 객관적이고 과학적인 합격 전략을 확인하세요.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  onClick={onStartAnalysis}
                  className="bg-[#002068] hover:bg-[#003399] text-white font-headline font-bold text-base px-8 py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#002068]/20 hover:-translate-y-0.5 transition-all cursor-pointer group"
                >
                  합격 가능성 진단하기
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </button>

                <button
                  onClick={onViewSampleReport}
                  className="bg-white border-2 border-[#002068] text-[#002068] hover:bg-[#f2f4f6] font-headline font-bold text-base px-8 py-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  샘플 리포트 보기
                </button>
              </div>

              {/* User proof */}
              <div className="flex items-center gap-4 mt-4 pt-6 border-t border-[#e0e3e5]">
                <div className="flex -space-x-3">
                  <img
                    className="w-10 h-10 rounded-full border-2 border-white object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-1ZMtnbLylZZ79efahLtyyRYxVRVROAnpMabwqCZJql9J3IcXCZgx8riJj2rbg6l6ngzZC7bQela98T_wpKnYWZfClgH7nV5Dz2jwy9afFelZol9fiyd2j4hhtHnSx3NhsksWGsamHcKgYOYDsXZ4duYvfcXrmGkkrV8n0UlbWdiAoi-NNrc6mAJxNCWsD8qX_BnoibeF9HsDEszOEzhWltbHcln7f8G8xMOID4WwnoWdJz6DAfYY"
                    alt="User 1"
                  />
                  <img
                    className="w-10 h-10 rounded-full border-2 border-white object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKVPlu_KxTibDGW7r79qtEMSkWPzkSI8pThWbpFnjLQD0k4e_Zy8ojGI8gC8BiHQCnRct36ZaSWrESRNVOnO-gidaNROlnM6ugH-Onblm9qmUlZjR2zuWWOmTx-CyjiTv8sZzknXAluuGp-GPYveEuO271OFO3r5RAuDDIVLK-quPqwyezxWeQhNyRzpqqrqgCFQVYBjp85t74LmuhwjzJKNTLqu1eaOlb8te-50CCtj0q4lh4jaPh"
                    alt="User 2"
                  />
                  <img
                    className="w-10 h-10 rounded-full border-2 border-white object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfGWJdEPokSmYqgT51_EeZJ1HBya2IoXyFHAJQ8BvmdwEAdDDoRm_8gr5oXlrhY5hX3Gy55AGNj2dENm8j16htMzwUks8vTEUaywacIqv2BFE32JA2u2LrpiWBhzNNvOEpIiimH5-uBdpIcvBSKD0SrRMDXpNTJf49sWQkVBSoa6roFySId6rhqcw3hl4SmvOJkU3TrVBndfU_2RCljgq1GHRA0VzSxJtcu5XcxuRoZ9Sro_d2zm_w"
                    alt="User 3"
                  />
                </div>
                <div className="font-body text-sm text-[#444653]">
                  <span className="font-bold text-[#002068]">12,400+</span>명의 취업 준비생이 사용 중
                </div>
              </div>
            </div>

            {/* Right Visual Graphic */}
            <div className="relative hidden md:block">
              <div className="relative w-full aspect-square max-w-lg mx-auto flex items-center justify-center">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgXDKzlz6I4YFfX5p6A0hEuhajYffTtrrdk8aYm2kkRPRboxlLPHXVBHDoKw8c3frMoj6CVX8QKIBl3plVPb1mSvKcjETDLVyEki_66HziV94wKUAlZ-G2X4dTva22rzZ-35fkzmYvkgoUnpOMWUkBS8OadLNru07R7WIyrMhWiQtQPNH1EPObSma4NqLH8bLztVtHC8YMrPlOqU_iPPauesFNKf6P52ram_uEi8PfNt7Wg6NEHKjo"
                  alt="3D Translucent AI Brain"
                  className="w-full h-full object-contain drop-shadow-2xl animate-float z-10"
                />

                {/* Floating Glass Card 1 - Probability */}
                <div 
                  onClick={onViewSampleReport}
                  className="absolute top-8 -left-6 glass-card p-4 rounded-xl flex items-center gap-3 animate-float cursor-pointer hover:scale-105 transition-transform z-20"
                >
                  <div className="w-10 h-10 bg-[#10B981]/20 rounded-full flex items-center justify-center text-[#10B981]">
                    <span className="material-symbols-outlined fill-icon text-xl">
                      check_circle
                    </span>
                  </div>
                  <div>
                    <div className="font-headline text-xs font-bold text-[#0A192F]">
                      삼성전자 합격률
                    </div>
                    <div className="font-headline font-bold text-[#002068] text-2xl">
                      78%
                    </div>
                  </div>
                </div>

                {/* Floating Glass Card 2 - Weakness Alert */}
                <div className="absolute bottom-12 -right-4 glass-card p-4 rounded-xl flex flex-col gap-2 animate-float-delayed z-20">
                  <div className="font-headline text-xs font-bold text-[#0A192F] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#F59E0B] text-base">
                      bolt
                    </span>
                    보완 필요 스펙
                  </div>
                  <div className="flex gap-1.5">
                    <span className="bg-[#eceef0] text-[#444653] text-[11px] font-medium px-2 py-0.5 rounded">
                      어학성적
                    </span>
                    <span className="bg-[#eceef0] text-[#444653] text-[11px] font-medium px-2 py-0.5 rounded">
                      직무경험
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Logo Slider Section */}
        <section className="py-10 bg-white border-y border-[#e0e3e5] overflow-hidden">
          <div className="max-w-6xl mx-auto px-6 mb-6 text-center">
            <h3 className="font-headline text-xs text-[#747684] tracking-widest font-bold uppercase">
              분석 가능한 목표 기업
            </h3>
          </div>

          <div className="relative w-full overflow-hidden">
            <div className="animate-marquee flex items-center gap-12">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1C4CEV_CJs8g2_P35bQhuyo6Zhyl4PjMeEq90SUxCVgPMq66Yj3HDxULmxXFsUkozEPSYXWluFKWTnDZs4WCESJx6RDDNAD9Wyoms7KoTv8ei8yvK8TJhuJPW5LiXxCGog1YQ-QIhLIz8yjKVib1bw2iummaNUv6oQ3ApNKTZywl_VwmAAsC4bpR2i2dNjEH-qKJRD8_WOpaDvf42Pr-v7XgugCGosLBbZIeB4oXs_gHoYBLzoHoX" 
                alt="Aethel Electronics" 
                className="h-10 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer"
              />
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwvM-vI81l-cvaVypV_k1yYrm5e2D-EzN1JN4sVofz3meIm3s6l47Er7Z6u30gmmIc62vFVTMWTeHnwdw-EkXisslPCQ-2QUtba5aZ1WinAojIew0x6eYSmScp_rAexKV5Y4mI4_WK3u8GFxNE93ESMy-_1ADWfq98rU5xLiWTYLjrYvbpZsxwzO5_VgJSAtRQPfXuybOZ6yH6yN6azvYGrdrAAgAonUgPWr8cDA7v7crKN0El-ucP" 
                alt="Kaelen Hynix" 
                className="h-10 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer"
              />
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9M6uHJP6UQSezIn9aAO8-M6T-9p-XrKt75IDHIWdYgao6bx5tjGiNvGQRHmwP_nlXwrafaVjXPOuYy-fgi6s57b07ZXUlvhGWu57YuuVRoDdto8KVBpGcUgT5wi7IKgJ_2x1u2FeX1xWu__aAd75O_DXA7t2YDasLcGqKB9zBphIG9OrSTUaCG9vhPrsaJBngiBwV3DCl0xg0Bsvk6SZDbARBdLs276qBF72n0naXBAFyGnxwLgpq" 
                alt="Vela Motors" 
                className="h-10 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer"
              />
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLbrGCiQFD7PpF7AfI0m2TlRPLoT4Xq_M8YANjFJUhDvZ-gfYd9AWH5u1uMb6YaRyB-3sGf-wW5sEEyOJW1TdRajlVjxGOKwVKz1xKCdYt-ipJ4PCjpLquEBOXI3Tu4IwuaOyLpxg27Y4DYqzn1V30iL4EkHmryRmS62zJI3nJ54oeFR39i9KIn6MCvioQGEM3tQaPjewfvaLN_Nykmb1EBdUi4mhhUJlm5J09eJi_aKMJoRrKL5ql" 
                alt="Lumina Corp" 
                className="h-10 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer"
              />
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFF5XHnP3TzfE8v56e-JectMC_UPzsdbqtAkXw1aJS-xmc4ZhhwOt2dvAXZKcHNoAhnA-pbMM5UzkQnk_EpeBa7AFWgH8scBoH_vRA6qDlwjNHDgqkrrlmPf8P_Q_EouPCz003q1O8zR_Ve8lEhecvogV5Jn_49-sW-_dAW7Pa2M1f2UoAm7Ebalk1PVDQl_HEeL38LdneH7_IldcmfoA7wtu8O216g-mTJ5B_JmosG7dovDiWC6YJ" 
                alt="Ferrum" 
                className="h-10 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer"
              />
              {/* Duplicate loop */}
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1C4CEV_CJs8g2_P35bQhuyo6Zhyl4PjMeEq90SUxCVgPMq66Yj3HDxULmxXFsUkozEPSYXWluFKWTnDZs4WCESJx6RDDNAD9Wyoms7KoTv8ei8yvK8TJhuJPW5LiXxCGog1YQ-QIhLIz8yjKVib1bw2iummaNUv6oQ3ApNKTZywl_VwmAAsC4bpR2i2dNjEH-qKJRD8_WOpaDvf42Pr-v7XgugCGosLBbZIeB4oXs_gHoYBLzoHoX" 
                alt="Aethel Electronics" 
                className="h-10 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer"
              />
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwvM-vI81l-cvaVypV_k1yYrm5e2D-EzN1JN4sVofz3meIm3s6l47Er7Z6u30gmmIc62vFVTMWTeHnwdw-EkXisslPCQ-2QUtba5aZ1WinAojIew0x6eYSmScp_rAexKV5Y4mI4_WK3u8GFxNE93ESMy-_1ADWfq98rU5xLiWTYLjrYvbpZsxwzO5_VgJSAtRQPfXuybOZ6yH6yN6azvYGrdrAAgAonUgPWr8cDA7v7crKN0El-ucP" 
                alt="Kaelen Hynix" 
                className="h-10 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer"
              />
            </div>
          </div>
        </section>

        {/* 3 Step Process Section */}
        <section className="py-20 px-6 md:px-12 bg-[#f7f9fb]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-headline text-2xl md:text-3xl font-bold text-[#0A192F] mb-3">
                단 3단계로 확인하는 나의 위치
              </h2>
              <p className="font-body text-base md:text-lg text-[#444653] max-w-2xl mx-auto">
                복잡한 입력 과정 없이, 핵심 스펙과 경험만으로 AI가 수만 건의 데이터와 비교 분석하여 객관적인 지표를 제공합니다.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Step 1 */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#e0e3e5] relative group hover:-translate-y-1.5 transition-transform">
                <div className="w-14 h-14 bg-[#003399] text-white rounded-2xl flex items-center justify-center mb-6 shadow-xs">
                  <span className="material-symbols-outlined text-2xl">edit_document</span>
                </div>
                <div className="absolute -top-3.5 -left-3.5 w-8 h-8 bg-[#002068] text-white rounded-full flex items-center justify-center font-bold font-headline text-sm shadow-xs">
                  1
                </div>
                <h3 className="font-headline text-xl font-bold text-[#0A192F] mb-2">
                  스펙 및 경험 입력
                </h3>
                <p className="font-body text-sm text-[#444653] leading-relaxed">
                  학점, 어학, 자격증 등 정량적 스펙과 직무 관련 경험을 간단한 폼에 입력합니다.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#e0e3e5] relative group hover:-translate-y-1.5 transition-transform">
                <div className="w-14 h-14 bg-[#003496] text-white rounded-2xl flex items-center justify-center mb-6 shadow-xs">
                  <span className="material-symbols-outlined text-2xl">smart_toy</span>
                </div>
                <div className="absolute -top-3.5 -left-3.5 w-8 h-8 bg-[#002166] text-white rounded-full flex items-center justify-center font-bold font-headline text-sm shadow-xs">
                  2
                </div>
                <h3 className="font-headline text-xl font-bold text-[#0A192F] mb-2">
                  AI 딥러닝 분석
                </h3>
                <p className="font-body text-sm text-[#444653] leading-relaxed">
                  5만 건 이상의 대기업 합격자 빅데이터를 기반으로 넥서스 AI가 당신의 경쟁력을 다각도로 분석합니다.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#e0e3e5] relative group hover:-translate-y-1.5 transition-transform">
                <div className="w-14 h-14 bg-[#00e3fd] text-[#00616d] rounded-2xl flex items-center justify-center mb-6 shadow-xs">
                  <span className="material-symbols-outlined text-2xl">pie_chart</span>
                </div>
                <div className="absolute -top-3.5 -left-3.5 w-8 h-8 bg-[#006875] text-white rounded-full flex items-center justify-center font-bold font-headline text-sm shadow-xs">
                  3
                </div>
                <h3 className="font-headline text-xl font-bold text-[#0A192F] mb-2">
                  리포트 및 전략 확인
                </h3>
                <p className="font-body text-sm text-[#444653] leading-relaxed">
                  합격 확률, 부족한 역량, 맞춤형 보완 전략이 담긴 상세 리포트를 통해 합격 가능성을 높입니다.
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <button
                onClick={onStartAnalysis}
                className="bg-white border-2 border-[#002068] text-[#002068] hover:bg-[#f2f4f6] font-headline font-bold text-sm px-8 py-3.5 rounded-full inline-flex items-center gap-2 transition-all cursor-pointer shadow-xs"
              >
                내 합격 가능성 진단하기
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-10 px-6 md:px-12 bg-[#0A192F] text-white mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="font-headline text-lg font-bold flex items-center gap-2">
              <span className="material-symbols-outlined fill-icon text-white text-xl">insights</span>
              Nexus Career AI
            </div>
            <p className="font-body text-xs text-[#c4c5d5]">
              © 2024 Nexus Career AI. 취준생을 위한 스마트 합격 전략 파트너.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 font-headline text-xs text-[#c4c5d5]">
            <a href="#" className="hover:text-white transition-colors">서비스 소개</a>
            <a href="#" className="hover:text-white transition-colors">개인정보 처리방침</a>
            <a href="#" className="hover:text-white transition-colors">이용약관</a>
            <a href="#" className="hover:text-white transition-colors">고객 지원</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
