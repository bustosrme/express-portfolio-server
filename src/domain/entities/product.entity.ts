import { CustomError } from '../errors/custom.error';


export class ProductEntity {

  constructor(
    public id: string,
    public name: string,
    public available: boolean,
    public description: string,
    public price: number,
    public user: string,
    public category: string,
    public img?: string,
  ) { }

  static fromObject( object: { [ key: string ]: any; } ) {
    const { id, _id, name, available, description, price, user, category, img } = object;

    if ( !_id && !id ) {
      throw CustomError.badRequest( 'Missing id' );
    }

    if ( !name ) throw CustomError.badRequest( 'Missing name' );
    if ( available === undefined ) throw CustomError.badRequest( 'Missing available' );
    if ( !description ) throw CustomError.badRequest( 'Missing description' );
    if ( !price ) throw CustomError.badRequest( 'Missing price' );
    if ( !user ) throw CustomError.badRequest( 'Missing user' );
    if ( !category ) throw CustomError.badRequest( 'Missing category' );

    return new ProductEntity( _id || id, name, available, description, price, user, category, img);

  }


}