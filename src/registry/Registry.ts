export interface RegistryEntry {
  readonly code: string;
}


export abstract class Registry< T extends RegistryEntry > {
  protected readonly entries = new Map< string, T >();

  public get values () : T[] {
    return [ ...this.entries.values() ];
  }

  public get size () : number {
    return this.entries.size;
  }

  protected normalize ( code: string ) : string {
    return code;
  }

  public register ( entry: T ) : void {
    this.entries.set( this.normalize( entry.code ), entry );
  }

  public get ( code: string ) : T | undefined {
    return this.entries.get( this.normalize( code ) );
  }

  public has ( code: string ) : boolean {
    return this.entries.has( this.normalize( code ) );
  }

  public remove ( code: string ) : boolean {
    return this.entries.delete( this.normalize( code ) );
  }
}
