export type Redirects = Readonly<Record<string, Redirect>>;

export type ShardName =
  | 'geohub'
  | 'osm2cai'
  | 'osm2caiprod'
  | 'osm2caiuat'
  | 'osm2caidev'
  | 'osm2cailocal'

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

export const shards: Shards = {
  geohub: {
    origin: 'https://geohub.webmapp.it',
    elasticApi: 'https://elastic-json.webmapp.it/v2/search',
    graphhopperHost: 'https://graphhopper.webmapp.it/',
    awsApi: 'https://wmfe.s3.eu-central-1.amazonaws.com/geohub',
  },
  osm2cai: {
    origin: 'https://osm2cai.cai.it',
    elasticApi: 'https://osm2cai.cai.it/api/v2/elasticsearch',
    graphhopperHost: '',
    awsApi: 'https://r3-it.storage.cloud.it/wmfe/osm2cai2',
  },
  osm2caiprod: {
    origin: 'https://osm2cai.prod.maphub.it',
    elasticApi: 'https://osm2cai.prod.maphub.it/api/v2/elasticsearch',
    graphhopperHost: '',
    awsApi: 'https://r3-it.storage.cloud.it/wmfe/osm2cai2',
  },
  osm2caiuat: {
    origin: 'https://osm2cai.uat.maphub.it',
    elasticApi: 'https://osm2cai.uat.maphub.it/api/v2/elasticsearch',
    graphhopperHost: '',
    awsApi: 'https://wmfe.s3.eu-central-1.amazonaws.com/osm2cai2uat',
  },
  osm2caidev: {
    origin: 'https://osm2cai.dev.maphub.it',
    elasticApi: 'https://osm2cai.dev.maphub.it/api/v2/elasticsearch',
    graphhopperHost: '',
    awsApi: 'https://osm2cai.dev.maphub.it/wmfe/osm2cai2dev',
  },
  osm2cailocal: {
    origin: 'http://127.0.0.1:8000/',
    elasticApi: 'http://localhost:9200/api/v2/search',
    graphhopperHost: '',
    awsApi: 'http://localhost:9002/wmfe/osm2cai2',
  },
};

export const redirects: Redirects = {};
