import "vitest";

interface CustomMatchers<R = unknown> {
   toBeInTheDocument(): R;
   toBeDisabled(): R;
   toBeEnabled(): R;
   toHaveValue(value: string | number | string[] | null): R;
   toHaveAttribute(attr: string, value?: string): R;
   toHaveClass(...classNames: string[]): R;
   toBeVisible(): R;
   toBeChecked(): R;
   toBeEmptyDOMElement(): R;
   toBeInvalid(): R;
   toBeRequired(): R;
   toBeValid(): R;
   toContainElement(element: HTMLElement | null): R;
   toContainHTML(html: string): R;
   toHaveAccessibleDescription(description?: string): R;
   toHaveAccessibleName(name?: string): R;
   toHaveErrorMessage(message?: string): R;
   toHaveFocus(): R;
   toHaveFormValues(values: Record<string, any>): R;
   toHaveStyle(css: string | Record<string, any>): R;
   toHaveTextContent(
      text: string | RegExp,
      options?: { normalizeWhitespace: boolean }
   ): R;
   toBePartiallyChecked(): R;
}

declare module "vitest" {
   interface Assertion<T = any> extends CustomMatchers<T> {}
   interface AsymmetricMatchersContaining extends CustomMatchers {}
}

// Declare global for test environment
declare global {
   var global: typeof globalThis;
   var fetch: typeof globalThis.fetch;
}
