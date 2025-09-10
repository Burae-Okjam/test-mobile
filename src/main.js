import { fetchQuestions } from './api.js';
import { renderQuestion, renderResult, renderSubmit } from './ui.js';

const RESULT_DESCRIPTIONS = {
  에겐: '감성적·직관적이며 자유로운 성향. 즉흥적 탐색과 타인과의 감정 교류를 즐김',
  에토: '감성적·직관적이지만 계획과 구조를 중시. 감정 표현은 솔직하지만 일상은 체계적으로 운영',
  테겐: '논리적·분석적이면서도 자유로운 성향. 새로운 아이디어에 논리적으로 접근하되 실행은 유연',
  테토: '논리적·분석적이고 계획적인 성향. 데이터를 기반으로 철저한 계획 아래 실행함',
};

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
  answers.push(questions[current].scores[value]);
  current += 1;
  showNext();
}

function handleSubmit() {
  const tally = { 에: 0, 테: 0, 겐: 0, 토: 0 };
  answers.forEach((letter) => {
    tally[letter] += 1;
  });
  const first = tally['에'] >= tally['테'] ? '에' : '테';
  const second = tally['겐'] >= tally['토'] ? '겐' : '토';
  const type = first + second;
  renderResult(type, RESULT_DESCRIPTIONS[type]);
}

