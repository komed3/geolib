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

  public equals ( { name, method, params }: Projection ) : boolean {
    return this.name === name && this.method === method && Object.keys( this.params ).every(
      k => this.params[ k ] === params[ k ]
    );
  }

  public hasParam ( name: string ) : boolean {
    return name in this.params;
  }

  public getParam ( name: string ) : number | undefined {
    return this.params[ name ];
  }
}
