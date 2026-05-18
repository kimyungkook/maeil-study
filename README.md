# 📚 매일-스터디 — 배포 가이드

> 하은이 가족 강제 학습 앱 | 수학·영어 + 보상 시스템 | PWA

---

## 📁 파일 목록

```
maeil-study/
├── index.html          ← 앱 전체 (이 파일 하나로 앱 작동)
├── manifest.json       ← PWA 설치 정보
├── service-worker.js   ← 오프라인 캐시
├── icons/
│   ├── icon-192.png    ← 앱 아이콘 (직접 추가 필요)
│   └── icon-512.png    ← 앱 아이콘 (직접 추가 필요)
└── README.md           ← 이 파일
```

---

## 🚀 배포 방법 (3단계, 무료)

### ① Vercel 가입 (무료)
1. https://vercel.com 접속 → **Sign Up** → **GitHub으로 로그인**
2. 상단 **Add New → Project** 클릭

### ② 파일 업로드
- **"or deploy without Git"** 클릭
- `maeil-study` 폴더 전체를 드래그 앤 드롭
- **Deploy** 버튼 클릭

### ③ 주소 확인
- 배포 완료 후 주소 예시: `https://maeil-study-xxx.vercel.app`
- 이 주소를 가족 핸드폰에 보내주세요!

---

## 📱 하은이 핸드폰에 앱 설치하기

### 삼성 갤럭시 (크롬 브라우저)
1. 크롬으로 앱 주소 접속
2. 주소창 오른쪽 **⋮ 메뉴** → **홈 화면에 추가**
3. **추가** 클릭 → 앱 아이콘이 홈화면에 생김!

---

## 🔒 화면 고정 (키오스크 모드) 설정

> 이 설정을 해야 하은이가 학습 중 다른 앱으로 못 빠져나가요!

### 삼성 갤럭시 설정 순서
```
설정 → 생체인식 및 보안 → 기타 보안 설정
     → 앱 고정 → 켜기
```

### 사용 방법
1. 학습 앱 실행
2. 최근 앱 버튼(■) 길게 누르기
3. 앱 아이콘에서 **핀/고정** 아이콘 탭
4. → 홈 버튼, 뒤로가기 버튼 잠금!
5. 해제: **뒤로가기 + 최근앱** 동시에 길게 누르기

---

## 🔥 Firebase 설정 (실시간 동기화 - 선택사항)

> Firebase를 연결하면 아빠/엄마 폰과 하은이 폰이 실시간으로 연동돼요!
> Firebase 없이도 앱은 정상 작동합니다 (같은 폰 안에서만 저장)

### 1단계: Firebase 프로젝트 생성
1. https://console.firebase.google.com 접속
2. **프로젝트 추가** → 이름: `maeil-study`
3. Google Analytics: **사용 안 함** 선택 → **프로젝트 만들기**

### 2단계: 웹 앱 추가
1. 프로젝트 홈 → **</>** (웹) 아이콘 클릭
2. 앱 닉네임: `maeil-study-web`
3. **앱 등록** 클릭
4. `firebaseConfig` 값 복사

### 3단계: index.html 수정
`index.html` 파일에서 아래 부분을 찾아 교체:
```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",           ← 복사한 값으로 교체
  authDomain: "YOUR_PROJECT...",    ← 복사한 값으로 교체
  projectId: "YOUR_PROJECT_ID",     ← 복사한 값으로 교체
  storageBucket: "YOUR_PROJECT...", ← 복사한 값으로 교체
  messagingSenderId: "YOUR_...",    ← 복사한 값으로 교체
  appId: "YOUR_APP_ID"              ← 복사한 값으로 교체
};
```

### 4단계: Firestore 데이터베이스 생성
1. Firebase 콘솔 → **Firestore Database** → **데이터베이스 만들기**
2. **프로덕션 모드** 선택
3. 위치: `asia-northeast3 (서울)` 선택

---

## ⚠️ 앱 설치 후 필수 변경 사항

### 관리자 비밀번호 변경
`index.html`에서 아래 줄을 찾아 변경:
```javascript
adminPassword: '1234',  ← 반드시 바꾸세요!
```
예: `adminPassword: '용국0517',`

### 긴급 해제 코드 변경
관리자 → 스케줄 탭 → 긴급 해제 코드 변경

---

## 📲 앱 아이콘 만들기 (무료)

1. https://favicon.io 접속
2. **Favicon Generator** → **Text** 탭
3. 텍스트: `📚`, 배경색: `#D85A30`
4. **Generate** → 다운로드
5. `icon-192.png`, `icon-512.png` 파일을 `icons/` 폴더에 넣기

---

## 🔔 푸시 알림 설정 (학습 시간 알림)

앱 첫 실행 시 **알림 허용** 클릭 시 자동 설정됩니다.
- 설정한 시간에 하은이 폰으로 자동 알림 발송
- 알림 클릭 시 바로 학습 화면으로 이동

---

## 🛠️ 향후 개발 예정

- [ ] AI 수학 문제 자동 생성 (Gemini/Groq API)
- [ ] 영어 단어 학습 모듈 (TTS 음성)
- [ ] 파일 업로드 OCR (PDF/사진 → 영어 변환)
- [ ] Firebase 실시간 동기화 완전 연동
- [ ] 구글 플레이스토어 정식 앱 전환

---

## 💬 문의

이 앱은 은하(Claude AI)가 용국 아버지를 위해 제작했습니다.
추가 기능 요청이나 오류 발생 시 은하에게 알려주세요! 😊
