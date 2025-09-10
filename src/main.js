import { fetchQuestions } from './api.js';
import { renderQuestion, renderResult, renderSubmit } from './ui.js';
import { score } from './score.js';

const RESULT_DESCRIPTIONS = {
  '포근 감성형': '따뜻한 배려와 공감 능력이 빛나요. 사람들의 마음을 편하게 하는 힘이 크지만, 때론 결단력이 필요할 수 있어요.',
  '직진 추진형': '빠른 판단과 실행력이 강점! 목표 지향적이고 리더십이 돋보여요. 다만 주변의 감정을 한 템포 더 살피면 균형이 좋아져요.',
  '소프트 카리스마형': '공감도 있고 추진력도 있는 다재다능형. 상황에 따라 유연하게 대처할 수 있지만, 자기 에너지 관리가 필수예요.',
  '차분 미니멀형': '단순·안정 지향으로 잔잔한 매력을 지녔어요. 불필요한 갈등을 피하지만, 때론 새로운 도전이 성장의 열쇠가 될 수 있어요.',
  '균형 조화형': '공감과 추진력 모두 적절히 갖춘 안정적 유형. 상황에 따라 무난하게 어울리지만, 때론 자기만의 색을 더하는 게 좋아요.',
  '따뜻한 조율형': '배려심 깊고 갈등 조정에 능숙해요. 리더보다는 조력자에 강점이 있지만, 필요할 땐 확실한 주도권을 잡는 연습이 좋아요.',
  '현실 추진형': '현실 감각과 실행력이 돋보여요. 목표 달성을 위해 앞장서는 스타일이지만, 가끔은 사람들의 감정선을 돌아볼 필요가 있어요.',
  '감성 안정형': '공감은 하지만 큰 결단을 피하는 편이에요. 잔잔한 인간관계에 강점이 있고, 작은 도전을 통해 자신감을 키우면 좋아요.',
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
  const q = questions[current];
  answers.push({ key: q.key, score: value, reverse: q.reverse });
  current += 1;
  showNext();
}

function handleSubmit() {
  const result = score(answers);
  const { E, T } = result;
  const label = getLabel(E, T);
  const description = RESULT_DESCRIPTIONS[label];
  renderResult({ label, description, E, T });
}

function getLabel(E, T) {
  const level = (x) => (x >= 66 ? 'high' : x >= 33 ? 'mid' : 'low');
  const eLevel = level(E);
  const tLevel = level(T);

  if (eLevel === 'high' && tLevel === 'low') return '포근 감성형';
  if (eLevel === 'low' && tLevel === 'high') return '직진 추진형';
  if (eLevel === 'high' && tLevel === 'high') return '소프트 카리스마형';
  if (eLevel === 'low' && tLevel === 'low') return '차분 미니멀형';
  if (eLevel === 'mid' && tLevel === 'mid') return '균형 조화형';
  if (eLevel === 'high' && tLevel === 'mid') return '따뜻한 조율형';
  if (eLevel === 'mid' && tLevel === 'high') return '현실 추진형';
  if (eLevel === 'mid' && tLevel === 'low') return '감성 안정형';
  if (eLevel === 'low' && tLevel === 'mid') return '직진 추진형';
  return '균형 조화형';
}
