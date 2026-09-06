type ProjectionParams = Readonly< Record< string, number > >;


export class Projection {
  public constructor (
    public readonly name: string,
    public readonly method: string,
    public readonly parameters: ProjectionParams = {}
  ) {}
}
