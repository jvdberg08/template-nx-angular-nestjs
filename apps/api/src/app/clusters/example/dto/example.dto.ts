import { IsString } from 'class-validator';

export class ExampleDto {
  @IsString()
  exampleProperty!: string;
}
