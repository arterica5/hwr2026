# 삼성한우리합창단 · HEAR WE GO!

제21회 정기연주회 홍보용 한국어 반응형 정적 웹사이트입니다. 제공된 2026년 공연 포스터의 색상, 공연 정보, 프로그램과 교통 안내를 반영했습니다.

## 실행

```sh
cd /workspace/hwr2026
python -m http.server 3000 --bind 0.0.0.0
```

별도 설치나 빌드는 필요 없습니다. `index.html`은 공연 정보, `style.css`는 디자인, `script.js`는 카카오톡 채널명 복사를 담당합니다. Google Fonts 연결이 불가능하면 시스템 글꼴을 사용합니다.

공식 예매 링크와 입장권 신청 방법은 미제공 상태입니다. 제공된 Illustrator 파일을 변환한 공식 SVG 앞·뒷면을 `assets/`에 포함합니다. 글자와 도형은 벡터이며 뒷면의 단체 사진은 래스터 이미지입니다. 프로그램의 01~03 표시는 곡 목록의 시각적 구분입니다.

## GitHub Pages 배포

GitHub 저장소 **Settings → Pages → Build and deployment → Source**를 **GitHub Actions**로 설정합니다.
`main` 브랜치에 변경 사항을 push하면 `.github/workflows/pages.yml`이 웹사이트 파일만 배포합니다.
첫 배포가 성공한 뒤 기본 주소는 `https://arterica5.github.io/hwr2026/`입니다.
Actions 탭에서 실행 결과와 배포 주소를 확인할 수 있습니다.
