export class Post{

  constructor(
    public id: number = 1,
    public user_id: number = 1,
    public category_id: number = 1,
    public title: string = '',
    public content: string = '',
    public image: string = '',
    public createdAt: any = null
  ){}

}
