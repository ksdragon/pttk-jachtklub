import { Quill } from 'quill';

export class ArticlePage {
  public id: number;
  public userName?: string;
  public createDate?: string;
  public editDate?: string;
  public articlePage?: Quill;
  public articleLayout?: Quill;
  public category?: string [];

  constructor() {}
}
