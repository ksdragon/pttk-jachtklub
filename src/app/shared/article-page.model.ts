import { Quill, Delta } from 'quill';

export class ArticlePage {
  public id: number;
  public header?: string;
  public userName?: string;
  public createDate?: Date;
  public editDate?: Date;
  public articlePage?: Delta;
  public articleLayout?: Delta;
  public category?: string [];

  constructor() {}
}
