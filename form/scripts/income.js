const output = document.querySelector("#output");
const income = document.querySelector("#income");

output.textContent = `${income.value}K`;

const initProgress = (income.value / income.max) * 100;
income.style.background = `linear-gradient(to left, #D64200 ${initProgress}%, #E6E4EA ${initProgress}%)`;

income.addEventListener("input", (event) => {
  const tempIncomeValue = event.target.value;
  output.textContent = `${tempIncomeValue}K`;

  const progress = (tempIncomeValue / income.max) * 100;
  income.style.background = `linear-gradient(to left, #D64200 ${progress}%, #E6E4EA ${progress}%)`;
});
