window.addEventListener('keydown', async (e) => {
	if (e.altKey || e.ctrlKey) {
		return;
	}
	const target = e.composedPath()[0] as Element;
	if (['TEXTAREA', 'INPUT'].includes(target.tagName)) {
		return;
	}
	if (e.key === 'd') {
		const {themeStore} = await import('./styles/styles.js');
		themeStore.toggleMode();
	}
});

export {};
