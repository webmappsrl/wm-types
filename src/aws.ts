// Versione di un tipo di file pubblicato dal backend su awsApi (oggi solo `tracks/<id>.json`).
// Il backend versiona file per file: ogni shard dichiara in `Shard.awsVersions` la versione di
// ciascun tipo di file che pubblica; un tipo non dichiarato è il file senza versione (oc:8998).
export type AwsVersion = 'v1';

// Versioni dichiarate da uno shard, per tipo di file. Si aggiunge un tipo (es. `pois`) quando il
// backend comincia a versionarlo.
export interface AwsVersions {
  tracks?: AwsVersion;
}

// La versione in cui il frontend lavora, per tipo di file: il codice segue sempre questa, e
// l'adapter porta qui i dati più vecchi.
export const CURRENT_AWS_VERSIONS: Required<AwsVersions> = {tracks: 'v1'};
