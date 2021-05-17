export class User{

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

  setValues( json: any ): void{
    if( !json ) return;
    if( json.name ) this.name = json.name;
    if( json.surname ) this.surname = json.surname;
    if( json.email ) this.email = json.email;
    if( json.description ) this.description = json.description;
    if( json.image ) this.image = json.image;
  }

}
