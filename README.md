# Starter

## 코딩 컨벤션

- SMASS 방법론 지지
- 코드 규칙을 통일하기 위해 에디터 확장플러그인 editorconfig, prettier 설치 권고

## 프로젝트 구성

- Gulp
  - **File Include** <br>효율적인 웹사이트 운영을 위한 Include 라이브러리
  - **SASS** <br>안정적인 서비스 운영를 위한 CSS 추상화, 캡슐화 사용
- CSS3
  - 에릭마이어의 [reset.css](https://meyerweb.com/eric/tools/css/reset/)
  - 니콜라스의 [normalize.css](https://necolas.github.io/normalize.css/)
  - SASS 전처리기 사용. 컴파일러는 `node-sass` 사용

## 설치방법

1. 처음 프로젝트 시작 시 `$ npm install` 모듈 설치
1. 작업 시작 시 `$ npm dev` 로 로컬웹서버 실행

## 빌드방법

1. `$ npm run build` 빌드 시작
1. `build/` 폴더 확인
