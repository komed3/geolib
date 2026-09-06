type ProjectionParams = Readonly< Record< string, number > >;


export class Projection {
  public constructor (
    public readonly name: string,
    public readonly method: string,
    public readonly params: ProjectionParams = {}
  ) {}

  public clone () : Projection {
    return new Projection( this.name, this.method, { ...this.params } );
  }

  public equals ( other: Projection ) : boolean {
    return this.name === other.name && this.method === other.method &&
      Object.keys( this.params ).length === Object.keys( other.params ).length &&
      Object.keys( this.params ).every( k => this.params[ k ] === other.params[ k ] );
  }

  public hasParam ( name: string ) : boolean {
    return name in this.params;
  }

  public getParam ( name: string ) : number | undefined {
    return this.params[ name ];
  }
}
