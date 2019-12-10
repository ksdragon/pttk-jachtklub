import { DeltaStatic } from 'quill';

export class ArticleContent {

  constructor(
  public name: string,
  public title: string,
  public content: DeltaStatic,
  ) {}

}
