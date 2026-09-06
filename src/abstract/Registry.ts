export abstract class Registry< T > {
  private readonly entries = new Map< string, T >();

  public add ( key: string, value: T ) : void {
    if ( this.entries.has( key ) ) throw new Error( `Entry already registered: ${ key }` );
    this.entries.set( key, value );
  }

  public get ( key: string ) : T {
    const value = this.entries.get( key );
    if ( value === undefined ) throw new Error( `Entry not found: ${ key }` );

    return value;
  }

  public has ( key: string ) : boolean {
    return this.entries.has( key );
  }

  public remove ( key: string ) : boolean {
    return this.entries.delete( key );
  }

  public keys () : string[] {
    return [ ...this.entries.keys() ];
  }

  public values () : T[] {
    return [ ...this.entries.values() ];
  }

  public clear () : void {
    this.entries.clear();
  }

  public get size () : number {
    return this.entries.size;
  }
}
