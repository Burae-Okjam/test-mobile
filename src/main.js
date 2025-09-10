import { fetchQuestions } from './api.js';
import { renderQuestion, renderResult, renderSubmit } from './ui.js';

let questions = [];
let current = 0;
const answers = [];

document.getElementById('start-btn').addEventListener('click', async () => {
  questions = await fetchQuestions();
  current = 0;
  answers.length = 0;
  showNext();
});

function showNext() {
  if (current < questions.length) {
    renderQuestion(questions[current], handleAnswer);
  } else {
    renderSubmit(handleSubmit);
  }
}

function handleAnswer(value) {
  answers.push(value);
  current += 1;
  showNext();
}

function handleSubmit() {
  const result = `응답: ${answers.join(', ')}`; // 추후 실제 로직으로 교체
  renderResult(result);
}

