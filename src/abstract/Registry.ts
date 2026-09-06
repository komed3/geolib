export abstract class Registry< T > {
  private readonly entries = new Map< string, T >();

  public register ( key: string, value: T ) : void {
    if ( this.entries.has( key ) ) throw new Error( `Entry already registered: ${ key }` );
    this.entries.set( key, value );
  }
}
