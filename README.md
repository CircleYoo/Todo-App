# React로 TodoList 만들기
**배포 주소** : https://strong-douhua-85a247.netlify.app/ <br />
### 프로젝트 목표
- useState, useEffect, useContext 등 **리액트 훅을 사용**
- creact-react-app으로 기본 탑재되어 있는 **PostCSS**를 사용
  
**현재 날짜**
- moment.js를 사용하여 현재 날짜, 요일 출력
  
**목록 추가 및 삭제**

**목록 필터링**
  - 총 3가지 필터링 구현  |  전체보기, 진행 중, 완료
  - 버큰 클릭 시, 해당 필터링 옵션에 맞는 배열로 상태 변경
  
**Local Storage에 데이터 저장하기**
- useEffect를 사용해 할일 목록이 업데이트 될 때마다 로컬 스토리지에 데이터 저장

**다크모드 구현**
  - useContext를 사용해 다크모드 상태를 토글하는 버튼 렌더링
