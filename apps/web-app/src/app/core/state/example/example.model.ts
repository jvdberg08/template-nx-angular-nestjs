export class Example {
  id!: number;
  exampleProperty!: string;

  constructor(example: Partial<Example>) {
    Object.assign(this, example);
  }
}
