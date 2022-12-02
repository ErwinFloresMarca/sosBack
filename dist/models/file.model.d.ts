import { Entity } from '@loopback/repository';
export declare class File extends Entity {
    id?: number;
    mimeType: string;
    originalName: string;
    size: number;
    fileName: string;
    constructor(data?: Partial<File>);
}
export interface FileRelations {
}
export declare type FileWithRelations = File & FileRelations;
