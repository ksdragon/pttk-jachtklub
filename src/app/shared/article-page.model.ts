import { Quill, Delta } from 'quill';

export class ArticlePage {
  public id?: any;
  public header?: string;
  public uid?: string;
  public createDate?: string;
  public editDate?: string;
  public articlePage?: Delta;
  public articleLayout?: Delta;
  public category?: string [];

  constructor() {}
}
