const container = document.getElementById('app');

/** 질문 화면을 렌더링합니다. */
export function renderQuestion(question, onAnswer) {
  container.innerHTML = `
    <div class="question">
      <p>${question.text}</p>
      ${question.options
        .map(
          (opt, idx) =>
            `<button class="answer" data-value="${idx}">${opt}</button>`
        )
        .join('')}
    </div>
  `;

  container.querySelectorAll('.answer').forEach((btn) => {
    btn.addEventListener('click', () => onAnswer(Number(btn.dataset.value)));
  });
}

/** 제출 버튼을 렌더링합니다. */
export function renderSubmit(onSubmit) {
  container.innerHTML = `
    <div class="submit">
      <button id="submit-btn" class="primary">제출하기</button>
    </div>
  `;

  document
    .getElementById('submit-btn')
    .addEventListener('click', onSubmit);
}

/** 결과 화면을 렌더링합니다. */
export function renderResult(resultText) {
  container.innerHTML = `
    <div class="result">
      <p>${resultText}</p>
      <button id="share-btn" class="primary">공유하기</button>
      <button id="restart-btn" class="primary">다시하기</button>
    </div>
  `;

  document.getElementById('share-btn').addEventListener('click', async () => {
    const shareData = {
      title: '에겐/테토 테스트 결과',
      text: resultText,
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error(err);
      }
    } else {
      await navigator.clipboard.writeText(`${resultText} ${window.location.href}`);
      alert('결과 링크가 복사되었습니다.');
    }
  });

  document
    .getElementById('restart-btn')
    .addEventListener('click', () => window.location.reload());
}

