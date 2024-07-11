declare module "osm-read-bj" {
  type OrString<Type extends string> = Type | (string & {});

  type NodeId = `-${number}`;

  interface PbfNode {
    id: NodeId;
    lat: number;
    lon: number;
    tags: Record<never, never>;
  }

  type CreatorId = `${string}-${string}-${string}-${string}-${string}`;
  type StringifiedNumericalBoolean = "0" | "1";
  type StringifiedNumber = `${number}` | "";
  type CommaSeparated<Type extends string> = OrString<
    "" | Type | `${Type},${Type}` | `${Type},${Type},${Type}`
  >;

  type RoadTypeFid = "0";
  type LaneType = "0" | "1" | "2";
  type ServiceTypeFid = "0";
  type LaneDirectionFid = "0" | "2";
  type TurnTypeFid = "0" | "1" | "2" | "3";
  type PathType = "0" | "1" | "2" | "3" | "4";

  interface PropertiesLane {
    creator_id: CreatorId;
    name: string;

    lane_direction_fid: LaneDirectionFid;
    lane_type_fid_v4_5: LaneType;
    road_type_fid: RoadTypeFid;
    left_has_reflectors: StringifiedNumericalBoolean;
    right_has_reflectors: StringifiedNumericalBoolean;

    from_edge_fid: StringifiedNumber;
    lane_fid: StringifiedNumber;
    lane_group_fid: StringifiedNumber;
    lane_index: StringifiedNumber;
    left_boundary_fid: StringifiedNumber;
    max_speed: StringifiedNumber;
    min_speed: StringifiedNumber;
    right_boundary_fid: StringifiedNumber;
    speed_limit_mps: StringifiedNumber;
    to_edge_fid: StringifiedNumber;
    width: StringifiedNumber;

    service_type_fids: CommaSeparated<ServiceTypeFid>;
    turn_type_both_fids: CommaSeparated<TurnTypeFid>;
    turn_type_fids: CommaSeparated<TurnTypeFid>;

    stops: unknown;
    left_offset: unknown;
    right_offset: unknown;

    /** @deprecated */
    lane_type_fid: string;
  }

  interface PropertiesLaneConnector {
    creator_id: CreatorId;
    boundary_fids: CommaSeparated<StringifiedNumber>;
    intersection_group_fid: "";
    intersection_type_fid: "5";
    is_mini: "1";
  }

  interface PropertiesDrivableArea {
    creator_id: CreatorId;
  }

  interface PropertiesBaseline {
    creator_id: CreatorId;
    dubins_node_fids: CommaSeparated<StringifiedNumber>;
    lane_connector_fid: StringifiedNumber;
    lane_fid: StringifiedNumber | "";
    path_type_fid: PathType;
  }

  type Properties =
    | PropertiesLane
    | PropertiesLaneConnector
    | PropertiesDrivableArea
    | PropertiesBaseline;

  interface PbfWayLane extends PbfWayBase {
    tags: PropertiesLane;
  }

  interface PbfWayLaneConnector extends PbfWayBase {
    tags: PropertiesLaneConnector;
  }

  interface PbfWayDrivableArea extends PbfWayBase {
    tags: PropertiesDrivableArea;
  }

  interface PbfWayBaseline extends PbfWayBase {
    tags: PropertiesBaseline;
  }

  type PbfWay =
    | PbfWayLane
    | PbfWayLaneConnector
    | PbfWayDrivableArea
    | PbfWayBaseline;

  interface BaseOptions {
    // testing
    headers: [string, string][];

    format?: "xml" | "pbf";
    endDocument: () => void;
    node?: (node: PbfNode) => void;
    way?: (way: PbfWay) => void;
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

  export function parse(
    options: { format?: "xml" | "pbf" } & BaseOptions & DataOptions
  ): Parser;

  export function parseXml(options: BaseOptions & DataOptions): Parser;

  export function parsePbf(options: BaseOptions & DataOptions): Parser;

  // export function getFileType
  // export function createPbfParser
}
