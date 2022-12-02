/// <reference types="express" />
import { Request, Response } from '@loopback/rest';
import { File } from '../models';
import { FileRepository } from '../repositories';
import { FileUploadHandler } from '../types';
/**
 * A controller to handle file uploads using multipart/form-data media type
 */
export declare class FileController {
    private handler;
    private storageDirectory;
    fileRepository: FileRepository;
    /**
     * Constructor
     * @param handler - Inject an express request handler to deal with the request
     */
    constructor(handler: FileUploadHandler, storageDirectory: string, fileRepository: FileRepository);
    fileUpload(request: Request, resp: Response): Promise<object>;
    /**
     * Get files and fields for the request
     * @param request - Http request
     */
    saveFile(request: Request): Promise<{
        files: object[];
    }>;
    listFiles(): Promise<string[]>;
    downloadFile(fileName: string, resp: Response): Response<any, Record<string, any>>;
    fileById(fileId: number): Promise<File & import("../models").FileRelations>;
    downloadFileById(fileId: number, resp: Response): Promise<Response<any, Record<string, any>>>;
    base64FileById(fileId: number): Promise<{
        base64: string;
    }>;
    /**
     * Validate file names to prevent them goes beyond the designated directory
     * @param fileName - File name
     */
    private validateFileName;
}
