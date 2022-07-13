const prefersDark = window.matchMedia('(prefers-color-scheme: darkmode)');

toggleDarkTheme(prefersDark.matches);

prefersDark.addListener((mediaQuery) => toggleDarkTheme(mediaQuery.matches));

function toggleDarkTheme(shouldAdd) {
  document.body.classList.toggle('darkmode', shouldAdd);
}
