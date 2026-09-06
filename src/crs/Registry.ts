interface RegistryEntry {
  readonly code: string;
}


export abstract class Registry< T extends RegistryEntry > {
  protected readonly entries = new Map< string, T >();

  public values () : T[] {
    return [ ...this.entries.values() ];
  }

  public get size () : number {
    return this.entries.size;
  }

  public register ( entry: T ) : void {
    this.entries.set( entry.code, entry );
  }

  public get ( code: string ) : T | undefined {
    return this.entries.get( code );
  }

  public has ( code: string ) : boolean {
    return this.entries.has( code );
  }

  public remove ( code: string ) : boolean {
    return this.entries.delete( code );
  }
}
