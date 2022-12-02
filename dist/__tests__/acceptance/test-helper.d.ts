import { Client } from '@loopback/testlab';
import { DocumentosAplication } from '../..';
export declare function setupApplication(): Promise<AppWithClient>;
export interface AppWithClient {
    app: DocumentosAplication;
    client: Client;
}
