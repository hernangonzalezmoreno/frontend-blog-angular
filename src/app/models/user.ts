export class User{

  public token: string = '';
  public getDecodedToken: any;

  constructor(
    public id: number = 1,
    public name: string = '',
    public surname: string = '',
    public role: string = 'ROLE_USER',
    public email: string = '',
    public password: string = '',
    public description: string = '',
    public image: string = ''
  ){}

}
