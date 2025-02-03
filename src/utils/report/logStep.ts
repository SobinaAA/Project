import { test } from '@playwright/test';

export function logStep<This, Args extends unknown[], Return>(
  message?: string
) {
  return function actualDecorator(
    target: (this: This, ...args: Args) => Promise<Return>,
    context: ClassMethodDecoratorContext<
      This,
      (this: This, ...args: Args) => Promise<Return>
    >
  ) {
    function replacementMethod(this: unknown, ...args: Args) {
      const name =
        message ?? `${this!.constructor.name}.${context.name as string}`;
      return test.step(name, async () => target.call(this as This, ...args), {
        box: false
      });
    }
    return replacementMethod;
  };
}
