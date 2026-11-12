/**
 * Returns the element that matches the selector, or throws if it does not exist.
 * @param selector - CSS selector of the element.
 * @returns The matching element, typed as the element type given at the call.
 */
export function getRequiredElement<ElementType extends Element>(selector: string): ElementType {
  // Ask the page for the first element that matches the selector. The result is the element or null.
  const element: ElementType | null = document.querySelector<ElementType>(selector);

  // If nothing matched, stop here with an error that names the selector, so the cause is easy to find.
  if (!element) {
    throw new Error(`Element not found: ${selector}`);
  }

  // The element exists, so return it. TypeScript now knows it is not null.
  return element;
}
