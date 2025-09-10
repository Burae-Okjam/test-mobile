// API 관련 함수들을 모아둔 모듈

/**
 * 서버에서 질문 목록을 가져옵니다.
 * 실패할 경우 기본 샘플 데이터를 반환합니다.
 */
export async function fetchQuestions() {
  try {
    const response = await fetch('/api/questions');
    if (!response.ok) throw new Error('질문을 불러오지 못했습니다.');
    return await response.json();
  } catch (err) {
    console.error(err);
    // 개발용 기본 질문
    return [
      {
        id: 1,
        text: '새 프로젝트를 시작할 때 가장 먼저 하는 것은?',
        options: ['떠오르는 대로 일단 해본다', '전체 계획을 세부적으로 정리한다'],
        scores: ['에', '테']
      },
      {
        id: 2,
        text: '중요한 결정을 할 때 더 믿는 것은?',
        options: ['감(직관)', '데이터와 근거'],
        scores: ['에', '테']
      },
      {
        id: 3,
        text: '친구와 갈등이 생기면?',
        options: ['감정을 솔직히 표현한다', '감정을 숨기고 분석한다'],
        scores: ['에', '테']
      },
      {
        id: 4,
        text: '모르는 사람과도 쉽게 이야기한다',
        options: ['그렇다', '그렇지 않다'],
        scores: ['에', '테']
      },
      {
        id: 5,
        text: '주말 계획은 보통?',
        options: ['즉흥적으로 움직인다', '미리 꼼꼼하게 계획한다'],
        scores: ['겐', '토']
      },
      {
        id: 6,
        text: '작업 공간을 정리하는 방식은?',
        options: ['필요할 때만 정리한다', '항상 정돈된 상태를 유지한다'],
        scores: ['겐', '토']
      },
      {
        id: 7,
        text: '새로운 도전을 대하는 태도는?',
        options: ['느긋하게 탐색하며 진행한다', '목표를 정해 단계적으로 진행한다'],
        scores: ['겐', '토']
      },
      {
        id: 8,
        text: '여행을 떠날 때 보통?',
        options: ['즉흥 여행을 즐긴다', '세부 일정표를 만든다'],
        scores: ['겐', '토']
      }
    ];
  }
}

