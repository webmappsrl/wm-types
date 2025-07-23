export type Redirects = Readonly<Record<string, Redirect>>;
export type ShardName =
  | 'geohub'
  | 'geohubdev'
  | 'geohub2'
  | 'osm2cai'
  | 'osm2caidev'
  | 'camminiditalia'
  | 'camminiditaliadev'
  | 'carg'
  | 'cargdev';
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
    geohubdev: {
    origin: 'https://geohub.dev.maphub.it',
    elasticApi: 'http://geohub.dev.maphub.it:9200/v2/search',
    graphhopperHost: 'https://graphhopper.webmapp.it/',
    awsApi: 'http://geohub.dev.maphub.it:9000/wmfe/geohub',
  },
  geohub2: {
    origin: 'https://geohub2.maphub.it',
    elasticApi: 'https://geohub2.maphub.it/api/v2/elasticsearch',
    graphhopperHost: 'https://graphhopper.webmapp.it/',
    awsApi: 'https://wmfe.s3.eu-central-1.amazonaws.com/geohub2',
  },
  osm2cai: {
    origin: 'https://osm2cai.cai.it',
    elasticApi: 'https://osm2cai.cai.it/api/v2/search',
    graphhopperHost: 'https://graphhopper.webmapp.it/',
    awsApi: 'https://wmfe.s3.eu-central-1.amazonaws.com/osm2cai2',
  },
  osm2caidev: {
    origin: 'https://osm2cai2.dev.maphub.it',
    elasticApi: 'https://osm2cai2.dev.maphub.it/api/v2/elasticsearch',
    graphhopperHost: 'https://graphhopper.webmapp.it/',
    awsApi: 'https://wmfe.s3.eu-central-1.amazonaws.com/osm2cai2dev',
  },
  camminiditalia: {
    origin: 'https://camminiditalia.maphub.it',
    elasticApi: 'https://camminiditalia.maphub.it/api/v2/elasticsearch',
    graphhopperHost: 'https://graphhopper.webmapp.it/',
    awsApi: 'https://wmfe.s3.eu-central-1.amazonaws.com/camminiditalia',
  },
  camminiditaliadev: {
    origin: 'https://camminiditalia.dev.maphub.it',
    elasticApi: 'https://camminiditalia.dev.maphub.it/api/v2/elasticsearch',
    graphhopperHost: 'https://graphhopper.webmapp.it/',
    awsApi: 'https://wmfe.s3.eu-central-1.amazonaws.com/camminiditaliadev',
  },
  carg: {
    origin: 'https://carg.geosciences-ir.it',
    elasticApi: 'https://carg.geosciences-ir.it/api/v2/elasticsearch',
    graphhopperHost: 'https://graphhopper.webmapp.it/',
    awsApi: 'https://carg.geosciences-ir.it/storage/wmfe/carg',
  },
  cargdev: {
    origin: 'https://carg.maphub.it',
    elasticApi: 'https://carg.maphub.it/api/v2/elasticsearch',
    graphhopperHost: 'https://graphhopper.webmapp.it/',
    awsApi: 'https://wmfe.s3.eu-central-1.amazonaws.com/carg',
  },
};

export const redirects: Redirects = {
  'sentieri.caiparma.it': {
    shardName: 'geohub',
    appId: 33,
  },
  'motomappa.motoabbigliamento.it': {
    shardName: 'geohub',
    appId: 53,
  },
  'maps.parcoforestecasentinesi.it': {
    shardName: 'geohub',
    appId: 49,
  },
  'maps.parcopan.org': {
    shardName: 'geohub',
    appId: 63,
  },
  'maps.acquasorgente.cai.it': {
    shardName: 'geohub',
    appId: 58,
  },
  'maps.caipontedera.it': {
    shardName: 'geohub',
    appId: 59,
  },
  'maps.parcapuane.it': {
    shardName: 'geohub',
    appId: 62,
  },
  'fiemaps.it': {
    shardName: 'geohub',
    appId: 29,
  },
  'fiemaps.eu': {
    shardName: 'geohub',
    appId: 29,
  },
  'maps.sentierodeiducati.it': {
    shardName: 'geohub',
    appId: 60,
  },
};
