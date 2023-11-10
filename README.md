# Multi-step form

아비커스 프론트엔드 엔지니어 사전 과제는 기본적인 컴포넌트 구현에 익숙한 개발자를 채용하는 것을 목표로 준비되었습니다.

과제는 multi-step form을 구현하는 것입니다. 요구 사항을 최대한 구현하는 것을 목표합니다. **단 디자인은 평가 대상에 포함되지 않습니다.**

- 이 문서가 요구하는 내용에 맞춰 구현합니다.
- 이 프로젝트에서는 UI 라이브러리(MUI, Ant Design, Mantine 등)를 사용할 수 없습니다.
- 원하는 CSS 라이브러리(Styled Components, Tailwind CSS 등)를 사용해도 무방합니다.
- Typescript를 사용합니다.
- 필요한 라이브러리가 있다면 자유롭게 사용할 수 있습니다.

https://github.com/avikus-ai/multi-step-form-project/assets/93635070/6b9032f2-95ae-4f2b-8607-0d7273fd758c


## 실행 방법

이 프로젝트는 vite로 생성되었습니다. Node.js와 NPM을 사용하여 로컬에서 실행할 수 있습니다.
- node version >=18.0.0 <19

```bash
# Install dependencies:
npm install

# Run a development server:
npm run dev
```

## 요구 사항

사용자는 다음의 행동을 할 수 있습니다.

- 각 단계를 완료한다.
- 이전 단계로 돌아가 선택 사항을 변경할 수 있다.
- 아래와 같은 경우 유효성 검사에 따른 에러 메시지가 나타난다.
  - 필수 입력 필드의 값에 누락 있는 경우
  - 다음의 유효한 형식을 벗어나는 경우
    - Length - 숫자, 0 초과, 소숫점이 있다면 첫째 자리 입력만 유효
    - Beam - 숫자, 0 초과, 소숫점이 있다면 첫째 자리 입력만 유효
    - Draft - 숫자, 0 초과, 소숫점이 있다면 첫째 자리 입력만 유효
- 에러 메시지 예시
  - Please enter a Length
  - Please enter a valid number
  - Please enter a number only
  - Please enter a number greater than 0
  - Max precision is 1 decimal places
- 유효성 검사 시점은 해당 필드의 Blur 이벤트가 발생했을 때 입니다.
- 필수 입력 필드를 모두 채우지 않으면 다음 단계로 이동할 수 없다.
- 마지막 단계에서 선택한 항목의 요약을 확인하고 작성한 내용의 제출을 확정한다.
- 옵셔널 필드를 입력하지 않았다면 해당 필드는 요약 항목에 나타나지 않는다.
- 확정(Confirm) 버튼을 누르면 `POST /api/registration`으로 요청한다

  - payload 타입은 아래와 같다.

    json schema

    ```json
    {
      "$schema": "http://json-schema.org/draft-04/schema#",
      "title": "Example Schema",
      "type": "object",
      "properties": {
        "shipType": {
          "type": "string"
        },
        "shipName": {
          "type": "string"
        },
        "callSign": {
          "type": "string"
        },
        "numOfEngines": {
          "type": "number",
          "enum": [1, 2]
        },
        "length": {
          "type": "number",
          "minimum": 0,
          "multipleOf": 0.1,
          "exclusiveMinimum": true
        },
        "beam": {
          "type": "number",
          "minimum": 0,
          "multipleOf": 0.1,
          "exclusiveMinimum": true
        },
        "draft": {
          "type": "number",
          "minimum": 0,
          "multipleOf": 0.1,
          "exclusiveMinimum": true
        }
      },
      "required": ["shipType", "numOfEngines", "length", "beam", "draft"]
    }
    ```

## Design

디자인 예시입니다. 예시는 [아이콘](https://lucide.dev/)을 사용했습니다.

Step1

![step-1](/design/step-1.png)

Step2

![step-2](/design/step-2.png)

Step2 - Error

![step-2-error](/design/step-2-error.png)

Step 3

![step-3](/design/step-3.png)

Step 4

![step-4](/design/step-4.png)
