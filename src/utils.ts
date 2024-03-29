export function copyToClipboard(text: string) {
	navigator.clipboard.writeText(text);
	// toastit('Copied to clipboard.')
}

export function sleepS(seconds: number) {
	return new Promise((r) => setTimeout(r, seconds * 1000));
}

/**
 * Re-dispatches an event from the provided element.
 *
 * This function is useful for forwarding non-composed events, such as `change`
 * events.
 *
 * @example
 * class MyInput extends LitElement {
 *   render() {
 *     return html`<input @change=${this.redispatchEvent}>`;
 *   }
 *
 *   protected redispatchEvent(event: Event) {
 *     redispatchEvent(this, event);
 *   }
 * }
 *
 * @param element The element to dispatch the event from.
 * @param event The event to re-dispatch.
 * @return Whether or not the event was dispatched (if cancelable).
 */
export function redispatchEvent(element: Element, event: Event) {
	// For bubbling events in SSR light DOM (or composed), stop their propagation
	// and dispatch the copy.
	if (event.bubbles && (!element.shadowRoot || event.composed)) {
		event.stopPropagation();
	}

	const copy = Reflect.construct(event.constructor, [event.type, event]);
	const dispatched = element.dispatchEvent(copy);
	if (!dispatched) {
		event.preventDefault();
	}

	return dispatched;
}

export function downloadFile(content: string, filename: string): void {
	const blob = new Blob([content], {type: 'text/plain'});
	const url = URL.createObjectURL(blob);

	const a = document.createElement('a');
	a.href = url;
	a.download = filename;

	document.body.appendChild(a);
	a.click();

	document.body.removeChild(a);
	URL.revokeObjectURL(url);
}

export function firstLetterUpperCase(str: string): string {
	if (typeof str !== 'string' || str.length === 0) {
		// Return the input unchanged if it's not a non-empty string
		return str;
	}

	// Convert the first letter to uppercase and concatenate it with the rest of the string
	return str.charAt(0).toUpperCase() + str.slice(1);
}
