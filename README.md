# 디자이너 포트폴리오 웹사이트 (Designer Portfolio)

본 프로젝트는 Creatorlink 기반 디자이너 포트폴리오 사이트([latte.creatorlink.net](https://latte.creatorlink.net/))의 데이터를 순수 콘텐츠로 정제하고, 빠르고 유려한 사용자 경험을 제공하는 **React 19 + TypeScript + Vite** 기반으로 재구축한 포트폴리오 웹 애플리케이션입니다.

---

## 📌 주요 특징 및 기능

### 1) 115개 전체 프로젝트 아카이빙 (Gallery & Viewer)
- **실시간 검색 & 필터링**: 프로젝트 타이틀/설명 실시간 검색 및 24개 단위 무한 로드모어(Load More) 페이징
- **인터랙티브 갤러리 카드**: 호버 시 부드러운 이미지 줌, 다크 그라디언트 및 골드 태그/캡션 슬라이드 오버레이
- **고해상도 상세 뷰어 (Modal)**: 클릭 시 모든 고해상도 상세 이미지(`detailImages`)가 세로로 펼쳐지는 전용 뷰어
  - 상단 플로팅 컨트롤 바 (목록 복귀, 이전/다음 프로젝트 탐색, 닫기, 카운터)
  - 키보드 네비게이션 지원 (`ESC`: 닫기, `←` / `→`: 이전/다음 프로젝트 이동)

### 2) 에디토리얼 히어로 & 디자이너 소개 (About)
- **히어로 섹션**: 실시간 상태 펄스 인디케이터, 4대 핵심 스탯 카드, 전문 역량 뱃지, 퀵 액션 CTA
- **스킬 & 툴**: Photoshop, Illustrator, Premiere Pro, After Effects, InDesign, Lightroom, VS Code 등 인터랙티브 뱃지
- **파트너십 클라이언트**: SAMSUNG, HYUNDAI, SK telecom 등 39개 주요 클라이언트 그리드
- **경력 타임라인**: 2002년부터 2018년까지의 상세 프로젝트/경력 히스토리 (기본 전체 펼침 상태, 원클릭 전체 펼치기/접기 토글)

### 3) 라이트 & 다크 테마 시스템
- **라이트 모드(기본값)**: 화이트 & 소프트 그레이 배경, 섬세한 보더와 딥 슬레이트 폰트
- **다크 모드**: 딥 블랙 & 징크 배경, 은은한 앰비언트 글로우의 몰입감 높은 럭셔리 스타일
- `localStorage`를 통해 사용자가 선택한 테마 설정 영구 유지

### 4) 원클릭 연락처 기능 (Contact)
- 이메일(`inexpert@nate.com`) 원클릭 복사 및 실시간 토스트 피드백 알림, 메일 클라이언트 바로 발송 지원

### 5) 단일 원본 데이터 관리 (Single Source of Truth)
- 모든 프로젝트와 소개 데이터가 **`public/data/portfolio.json`** 하나로 단일화되어 유지보수 용이

### 6) 반응형 디자인 & 타이포그래피
- `Pretendard`, `Plus Jakarta Sans`, `Space Grotesk` 웹폰트 적용
- 한글 단어 끊김 방지(`keep-all`) 및 모바일(320px~640px) 완벽 대응

---

## 🛠 기술 스택

| 분류 | 기술 |
| :--- | :--- |
| **Core** | React 19, TypeScript 5.7, Vite 6 |
| **Styling** | Vanilla CSS (CSS Variables, Glassmorphism, Responsive) |
| **Icons** | Lucide React |
| **Data Source** | Static JSON (`public/data/portfolio.json`) |
| **Typography** | Pretendard, Plus Jakarta Sans, Space Grotesk |
| **Deployment** | GitHub Pages (`base: './'`), GitHub Actions |

---

## 📁 프로젝트 구조

```
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Pages 자동 배포 워크플로우
├── public/
│   ├── data/
│   │   └── portfolio.json          # ⭐ 단일 원본 데이터 (115개 프로젝트, About, Contact)
│   ├── images/
│   │   └── about/                  # 프로필 이미지
│   └── favicon.svg                 # 파비콘
├── src/
│   ├── components/
│   │   ├── Header.tsx              # 상단 고정 헤더, 네비게이션, 테마 스위처
│   │   ├── HeroSection.tsx         # 에디토리얼 히어로 헤더 & 스탯
│   │   ├── ProjectCard.tsx          # 갤러리 카드 (호버 인터랙션, 썸네일 Fallback)
│   │   ├── ProjectGrid.tsx          # 115개 프로젝트 검색 & 그리드 & 로드모어
│   │   ├── ProjectModal.tsx         # 고해상도 상세 이미지 세로 스크롤 뷰어
│   │   ├── AboutSection.tsx        # 프로필, 스킬/툴, 클라이언트, 경력 타임라인
│   │   ├── ContactSection.tsx      # 이메일 복사 & 연락처 카드
│   │   └── Footer.tsx              # 푸터 & Back to Top 버튼
│   ├── hooks/
│   │   ├── usePortfolio.ts         # portfolio.json 데이터 로드 훅 (Fallback 처리)
│   │   └── useTheme.ts             # 라이트/다크 테마 상태 관리 훅 (localStorage)
│   ├── types/
│   │   └── portfolio.ts            # TypeScript 인터페이스 정의
│   ├── App.tsx                     # 메인 애플리케이션 레이아웃
│   ├── index.css                   # 전역 테마 변수, 유틸리티, 반응형 스타일
│   ├── main.tsx                    # React 엔트리포인트
│   └── vite-env.d.ts               # Vite 환경 타입
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 시작하기

### 1. 의존성 설치
```bash
npm install
```

### 2. 로컬 개발 서버 실행
```bash
npm run dev
```

### 3. 프로덕션 빌드 & 미리보기
```bash
npm run build
npm run preview
```

---

## ✏️ 콘텐츠 및 데이터 수정 가이드

모든 포트폴리오 콘텐츠는 `public/data/portfolio.json` 파일에서 직접 수정할 수 있습니다.

1. **프로젝트 내용 추가 및 수정**:
   - `portfolio.json`의 `projects` 배열에서 `title`, `caption`, `category`, `date` 등을 수정합니다.
2. **프로젝트 로컬 이미지 교체**:
   - 썸네일 교체: `public/images/projects/`에 이미지를 넣고 `customImage: "images/projects/sample.jpg"`로 지정
   - 상세 이미지 교체: `customDetailImages: ["images/projects/detail-1.jpg", "images/projects/detail-2.jpg"]`로 지정
3. **About 프로필 및 소개 정보 수정**:
   - 프로필 이미지: `public/images/about/` 폴더에 이미지를 추가하고 `about.image` 경로 수정
   - 소개글, 사용 툴, 보유 스킬, 파트너사 목록, 연도별 경력 타임라인 항목 수정
