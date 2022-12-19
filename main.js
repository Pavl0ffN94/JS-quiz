const questions = [
  {
    question: "Какой язык работает в браузере?",
    answers: ["Java", "C", "Python", "JavaScript"],
    correct: 4,
  },
  {
    question: "Что означает CSS?",
    answers: [
      "Central Style Sheets",
      "Cascading Style Sheets",
      "Cascading Simple Sheets",
      "Cars SUVs Sailboats",
    ],
    correct: 2,
  },
  {
    question: "Что означает HTML?",
    answers: [
      "Hypertext Markup Language",
      "Hypertext Markdown Language",
      "Hyperloop Machine Language",
      "Helicopters Terminals Motorboats Lamborginis",
    ],
    correct: 1,
  },
  {
    question: "В каком году был создан JavaScript?",
    answers: ["1996", "1995", "1994", "все ответы неверные"],
    correct: 2,
  },
];

const headerContainer = document.querySelector("#header");
const listContainer = document.querySelector("#list");
const submitBtn = document.querySelector("#submit");

let score = 0;
let questionindex = 0;

headerContainer.innerHTML = "";
listContainer.innerHTML = "";

clearPage();
showQuestion();
submitBtn.onclick = checkAnswer;

function clearPage() {
  headerContainer.innerHTML = "";
  listContainer.innerHTML = "";
}

function showQuestion() {
  console.log("showQuestion star");
  //  выводит вопрос
  const headerTemlate = `<h2 class="title">%title%</h2>`;
  const title = headerTemlate.replace(
    "%title%",
    questions[questionindex]["question"]
  );
  headerContainer.innerHTML = title;
  // выводит варианты ответов
  let answerNumber = 1;
  for (answerText of questions[questionindex]["answers"]) {
    const questionTemplate = `<li>
	<label>
	 <input value="%number%" type="radio" class="answer" name="C" />
	 <span>%answer%</span>
	</label>
 	</li>`;
    const answerHTML = questionTemplate
      .replace("%answer%", answerText)
      .replace("%number%", answerNumber);
    listContainer.innerHTML += answerHTML;
    answerNumber++;
  }
}
function checkAnswer() {
  console.log("checkAnswer start");
  // находим выбраную кнопку
  const checedRadio = listContainer.querySelector(
    'input[type="radio"]:checked'
  );
  //если ответ не выбран, то ничего не происходит
  if (!checedRadio) {
    submitBtn.blur();
    return;
  }
  //Узнаем что ответил пользователь
  const userAnswerd = parseInt(checedRadio.value);

  //Если ответ верный - увеличиваем счет
  questions[questionindex]["correct"];
  if (userAnswerd === questions[questionindex]["correct"]) {
    score++;
  }
  if (questionindex !== questions.length - 1) {
    questionindex++;
    clearPage();
    showQuestion();
  } else {
    clearPage();
    showResalts();
  }
}

function showResalts() {
  console.log("showResalts star");
  console.log(score);

  const resultTemplate = `
  <h2 class="title">%title%</h2>
  <h3 class="summary">%message%</h3>
  <p class="result">%resault%</p>
  `;
  let title, message;
  if (score === questions.length) {
    title = "Поздравляем🔥🎆";
    message = "Вы ответили верно на все вопросы!👍🙀";
  } else if ((score * 100) / questions.length >= 50) {
    title = "Неплохой результат 😉";
    message = "Вы дали более половины правильных ответов 👍";
  } else {
    title = "Стоит постораться 👺";
    message = "Пока у вас менее половины правильных ответов 👀";
  }

  // Результат
  let result = `${score} из ${questions.length}`;

  // Финальный ответ, подстовляем данные в шаблон
  const finalMessage = resultTemplate
    .replace(`%title%`, title)
    .replace(`%message%`, message)
    .replace(`%resault%`, result);

  headerContainer.innerHTML = finalMessage;

  // Меняем кнопку на "играть снова"
  submitBtn.blur();
  submitBtn.innerText = "Начать заново";
  submitBtn.onclick = () => history.go();
}
