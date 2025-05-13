export type Redirects = Readonly<Record<string, Redirect>>;
export type Shards = Readonly<Record<string, Shard>>;

export interface Environment {
  readonly production: boolean;
  readonly debug?: boolean;
  readonly appId: number;
  readonly shardName: string;
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
  readonly shardName: string;
  readonly appId: number;
}
