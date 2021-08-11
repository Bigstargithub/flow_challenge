# 파일 확장자 차단 과제
고정 확장자와 커스텀 확장자를 추가하는 기능을 구현했습니다.

## 개발 언어
back : node.js 

front : html, css, javascript 

database: mysql

## 파일 실행하는 법
1. git을 clone한다. (명령 프롬프트 or 터미널 -> 원하는 폴더로 이동 -> git clone https://github.com/Bigstargithub/flow_challenge.git 입력)
2. npm i 입력
3. config/config.json에서 development의 password를 바꿔야한다. (local mysql 비밀번호로 변경)
4. npx sequelize db:create입력
5. npm start 입력한 후 브라우저에서 localhost:8000 입력

## Table 구조
1. ban_list (커스텀 확장자 테이블)
Columns : number(int(11), primaryKey, autoIncrement), ban_extention(varchar(20), not null)

2. fix_ban_list (고정 확장자 테이블)
Columns : number(int(11), primaryKey, autoIncrement), ban_extention(varchar(20), not null)

## 요구사항
1. 고정확장자의 default value는 unchecked여야 하고, check or uncheck를 할 때에 db에 저장되어야 한다.
2. 커스텀 확장자의 최대 길이는 20자리여야 한다.
3. 커스텀 확장자는 최대 200개까지 추가가 가능해야 한다. X 클릭 시 db에서 삭제해야 한다. 중복 추가는 불가능해야 한다.

## 그 외에 고려했던 사항들
1. 커스텀확장자를 추가할 때 비동기식으로 해야할 지, 동기식으로 해야할 지 고민. (동기식으로 진행 시 url이 달라지기 때문에, 오류 발생 시 다시 redirection이 발생하기 때문에 잠시 하얀 화면이 나타날 확률이 높기 때문에 비동기식으로 추가. 오류 발생 시 alert발생)
2. 커스텀 확장자를 한 개도 입력을 하지 않았을 때 -> 입력해달라는 경고문구 발생하게 짰다.

