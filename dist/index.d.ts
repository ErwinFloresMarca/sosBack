import { ApplicationConfig, DocumentosAplication } from './application';
export * from './application';
export * from './websocket.server';
export * from './decorators/websocket.decorator';
export * from './websocket-controller-factory';
export declare function main(options?: ApplicationConfig): Promise<DocumentosAplication>;
