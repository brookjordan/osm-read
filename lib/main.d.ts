declare module "osm-read-bj" {
  type EmptyObject = Record<never, never>;

  type NodeId = `-${number}`;

  interface Node<Tags extends object = EmptyObject> {
    id: NodeId;
    lat: number;
    lon: number;
    tags: Tags;
  }

  interface Way<Tags extends object = EmptyObject> {
    tags: Tags;
  }

  interface BaseOptions<
    NodeTags extends object = EmptyObject,
    WayTags extends object = EmptyObject
  > {
    // testing
    headers: [string, string][];

    format?: "xml" | "pbf";
    endDocument: () => void;
    node?: (node: Node<NodeTags>) => void;
    way?: (way: Way<WayTags>) => void;
    relation?: (relation: unknown) => void;
    bounds?: (bounds: unknown) => void;
    error?: (msg: string) => void;
  }

  type DataOptions =
    | {
        filePath: string;
        buffer?: never;
        file?: never;
      }
    | { filePath?: never; buffer: ArrayBuffer; file?: never }
    | {
        filePath: never;
        buffer?: never;
        file?: unknown;
      };

  interface Parser {
    pause: () => void;
    resume: () => void;
  }

  export function parse<
    NodeTags extends object = EmptyObject,
    WayTags extends object = EmptyObject
  >(
    options: { format?: "xml" | "pbf" } & BaseOptions<NodeTags, WayTags> &
      DataOptions
  ): Parser;

  export function parseXml<
    NodeTags extends object = EmptyObject,
    WayTags extends object = EmptyObject
  >(options: BaseOptions<NodeTags, WayTags> & DataOptions): Parser;

  export function parsePbf<
    NodeTags extends object = EmptyObject,
    WayTags extends object = EmptyObject
  >(options: BaseOptions<NodeTags, WayTags> & DataOptions): Parser;

  // export function getFileType
  // export function createPbfParser
}
