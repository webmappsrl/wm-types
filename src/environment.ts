export type Redirects = Readonly<Record<string, Redirect>>;
export type ShardName = 'geohub' | 'geohub2' | 'osm2cai' | 'camminiditalia' | 'camminiditaliadev' | 'carg' | 'cargdev';
export type Shards = Readonly<Record<ShardName, Shard>>;

export interface Environment {
  readonly production: boolean;
  readonly debug?: boolean;
  readonly appId: number;
  readonly shardName: ShardName;
  readonly shards: Shards;
  readonly redirects: Redirects;
}
export interface Shard {
  readonly origin: string;
  readonly elasticApi: string;
  readonly graphhopperHost: string;
  readonly awsApi: string;
}
export interface Redirect {
  readonly shardName: ShardName;
  readonly appId: number;
}
