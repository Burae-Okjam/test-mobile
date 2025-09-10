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
      { id: 1, text: '샘플 질문입니다. 예/아니오 중 선택하세요.', options: ['예', '아니오'] }
    ];
  }
}

