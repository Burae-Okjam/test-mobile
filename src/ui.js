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

/** 결과 화면을 렌더링합니다. */
export function renderResult(resultText) {
  container.innerHTML = `
    <div class="result">
      <p>${resultText}</p>
      <button id="restart-btn" class="primary">다시하기</button>
    </div>
  `;

  document
    .getElementById('restart-btn')
    .addEventListener('click', () => window.location.reload());
}

