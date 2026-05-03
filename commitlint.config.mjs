const Configuration = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // 타입 종류 정의
    'type-enum': [2, 'always', ['feat', 'fix', 'chore', 'refactor', 'docs', 'style', 'design']],
    // 타입은 항상 소문자여야 함
    'type-case': [2, 'always', 'lower-case'],
    // 제목 케이스 제한 없음 (한국어 사용을 위해 0으로 설정)
    'subject-case': [0],
    // 제목 비어있으면 안됨
    'subject-empty': [2, 'never'],
    // 제목 끝에 마침표 금지
    'subject-full-stop': [2, 'never', '.'],
    // 커스텀 규칙: 이슈 번호 검사
    'header-match-team-pattern': [2, 'always'],
  },
  plugins: [
    {
      rules: {
        'header-match-team-pattern': (parsed) => {
          const { type, subject } = parsed;
          if (type === null || subject === null) {
            return [false, '메시지 형식이 잘못되었습니다. (예: feat: 로그인 기능 구현 (#12))'];
          }
          const issueTicketPattern = /\s\(#\d+\)$/;
          if (issueTicketPattern.test(subject)) {
            return [true];
          }
          return [false, '메시지 끝에 이슈 번호를 포함해주세요. (예: (#12))'];
        },
      },
    },
  ],
};

export default Configuration;
