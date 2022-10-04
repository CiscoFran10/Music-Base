/* Desenvolva sua lógica aqui ... */

const button = document.getElementById("theme");
const body = document.body;
const theme = "dark-mode";
const themeButtonIcon = [
	"../../assets/img/sun.svg",
	"../../assets/img/moon.svg",
];

let darkMode;

button.addEventListener("click", themeChange);

function themeChange() {
	darkMode = !darkMode;

	body.classList.toggle(theme);

	localStorage.setItem(theme, darkMode);

	themeChangeButtonIcon(button);
}

function themeChangeButtonIcon(button) {
	darkMode
		? (button.querySelector("img").src = themeButtonIcon[0])
		: (button.querySelector("img").src = themeButtonIcon[1]);
}

function themePreferenceAnalysis() {
	darkMode = JSON.parse(localStorage.getItem(theme));

	if (darkMode) {
		themeChangeButtonIcon(button);
		body.classList.add(theme);
	} else {
		themeChangeButtonIcon(button);
	}
}
themePreferenceAnalysis();
