# 프로젝트 : QR코드를 통한 주문시스템

고객이 테이블에서 주문할 수 있는 테이블 주문 시스템입니다.

## Pages:
- User
- [x] Home
- [x] Order
- [x] Cart
- [x] MenuDtail
- [x] OrderComplete

<br>

- Admin
- [x] MenuUpload
- [x] orderList

## 사용한 기술 및 모듈
- Node.js
- Express.js
- EJS
- Bootstrap
- MongoDB
- Webpack
- Eslint
- Babel

## 각 페이지별 설명
- User

![이미지 001](https://user-images.githubusercontent.com/47559613/120063663-47b24600-c0a3-11eb-9d48-c0b58b5fb75e.png)

1. 사용자가 QR코드를 찍었을 때 나타나는 화면.
2. 관리자가 업로드한 메뉴들이 나타남.

![이미지 002](https://user-images.githubusercontent.com/47559613/120063664-484adc80-c0a3-11eb-86e3-bc3771d402b5.png)

1. 해당 메뉴를 클릭했을 때 나타나는 메뉴 상세 화면.
2. 메뉴이미지, 메뉴명, 메뉴가격, 메뉴정보가 나타남.
3. 장바구니 담기버튼을 통해 메뉴를 담을 수 있음.

![이미지 003](https://user-images.githubusercontent.com/47559613/120063727-919b2c00-c0a3-11eb-912d-faea33dc1701.png)

1. 장바구니에 담은 메뉴 목록이 나타남.
2. 총 가격이 나타나고 주문하기 버튼을 통해 주문완료 됨.

![이미지 004](https://user-images.githubusercontent.com/47559613/120063660-45e88280-c0a3-11eb-8dcd-44c4ba3f9066.png)

1.주문 완료된 화면.
2. 테이블 번호와 주문번호가 나타남.

- Admin
![이미지 005](https://user-images.githubusercontent.com/47559613/120063661-4719af80-c0a3-11eb-94d3-984d26c5cf96.png)

1. 관리자 화면으로 사용자가 주문한 메뉴리스트 화면.
2. 주문시간, 메뉴명, 개수, 메뉴 가격, 주문한 메뉴 총 합, 주문번호가 나타남.

![이미지 006](https://user-images.githubusercontent.com/47559613/120063662-47b24600-c0a3-11eb-891f-615d45f8ce81.png)

1. 관리자가 메뉴를 업로드하는 화면.
2. 메뉴 이미지, 메뉴명, 메뉴가격, 메뉴설명을 작성하고 메뉴 업로드 버튼을 통해 DB에 메뉴가 저장됨.

