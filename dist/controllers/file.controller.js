"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileController = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = tslib_1.__importDefault(require("path"));
const util_1 = require("util");
const keys_1 = require("../keys");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const readdir = (0, util_1.promisify)(fs_1.default.readdir);
/**
 * A controller to handle file uploads using multipart/form-data media type
 */
let FileController = class FileController {
    /**
     * Constructor
     * @param handler - Inject an express request handler to deal with the request
     */
    constructor(handler, storageDirectory, fileRepository) {
        this.handler = handler;
        this.storageDirectory = storageDirectory;
        this.fileRepository = fileRepository;
    }
    async fileUpload(request, resp) {
        return new Promise((resolve, reject) => {
            this.handler(request, resp, (err) => {
                if (err)
                    reject(err);
                else {
                    const resolver = async () => {
                        const respData = await this.saveFile(request);
                        resolve(respData);
                    };
                    resolver().catch(error => reject(error));
                }
            });
        });
    }
    /**
     * Get files and fields for the request
     * @param request - Http request
     */
    async saveFile(request) {
        const uploadedFiles = request.files;
        const mapper = (f) => {
            return new models_1.File({
                fileName: f.filename,
                originalName: f.originalname,
                mimeType: f.mimetype,
                size: f.size,
            });
        };
        let files = [];
        if (Array.isArray(uploadedFiles)) {
            files = uploadedFiles.map(mapper);
        }
        else {
            for (const filename in uploadedFiles) {
                files.push(...uploadedFiles[filename].map(mapper));
            }
        }
        const dbFiles = [];
        for (const f of files) {
            const resp = await this.fileRepository.save(f);
            dbFiles.push(resp);
        }
        return { files: dbFiles };
    }
    // download files
    async listFiles() {
        const files = await readdir(this.storageDirectory);
        return files;
    }
    downloadFile(fileName, resp) {
        const file = this.validateFileName(fileName);
        resp.download(file, fileName);
        return resp;
    }
    fileById(fileId) {
        return this.fileRepository.findById(fileId);
    }
    async downloadFileById(fileId, resp) {
        const fileData = await this.fileRepository.findById(fileId);
        const file = this.validateFileName(fileData.fileName);
        resp.download(file, fileData.fileName);
        return resp;
    }
    async base64FileById(fileId) {
        const fileData = await this.fileRepository.findById(fileId);
        const file = this.validateFileName(fileData.fileName);
        return {
            base64: fs_1.default.readFileSync(file, { encoding: 'base64' }),
        };
    }
    /**
     * Validate file names to prevent them goes beyond the designated directory
     * @param fileName - File name
     */
    validateFileName(fileName) {
        const resolved = path_1.default.resolve(this.storageDirectory, fileName);
        if (resolved.startsWith(this.storageDirectory))
            return resolved;
        // The resolved file is outside sandbox
        throw new rest_1.HttpErrors.BadRequest(`Invalid file name: ${fileName}`);
    }
};
tslib_1.__decorate([
    (0, rest_1.post)('/files', {
        responses: {
            200: {
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                        },
                    },
                },
                description: 'Files and fields',
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody.file()),
    tslib_1.__param(1, (0, core_1.inject)(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FileController.prototype, "fileUpload", null);
tslib_1.__decorate([
    (0, rest_1.get)('/files', {
        responses: {
            200: {
                content: {
                    // string[]
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: {
                                type: 'string',
                            },
                        },
                    },
                },
                description: 'A list of files',
            },
        },
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], FileController.prototype, "listFiles", null);
tslib_1.__decorate([
    (0, rest_1.get)('/files/{filename}'),
    rest_1.oas.response.file(),
    tslib_1.__param(0, rest_1.param.path.string('filename')),
    tslib_1.__param(1, (0, core_1.inject)(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], FileController.prototype, "downloadFile", null);
tslib_1.__decorate([
    (0, rest_1.get)('/files/by-id/{fileId}'),
    (0, rest_1.response)(200, {
        description: 'File model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.File, { includeRelations: true }),
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('fileId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", void 0)
], FileController.prototype, "fileById", null);
tslib_1.__decorate([
    (0, rest_1.get)('/files/download/by-id/{fileId}'),
    (0, rest_1.response)(200, {
        description: 'File model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.File, { includeRelations: true }),
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('fileId')),
    tslib_1.__param(1, (0, core_1.inject)(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FileController.prototype, "downloadFileById", null);
tslib_1.__decorate([
    (0, rest_1.get)('/files/base64/by-id/{fileId}'),
    (0, rest_1.response)(200, {
        description: 'File model instance',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    required: ['base64'],
                    properties: {
                        base64: {
                            type: 'string',
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('fileId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], FileController.prototype, "base64FileById", null);
FileController = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)(keys_1.FILE_UPLOAD_SERVICE)),
    tslib_1.__param(1, (0, core_1.inject)(keys_1.STORAGE_DIRECTORY)),
    tslib_1.__param(2, (0, repository_1.repository)(repositories_1.FileRepository)),
    tslib_1.__metadata("design:paramtypes", [Function, String, repositories_1.FileRepository])
], FileController);
exports.FileController = FileController;
//# sourceMappingURL=file.controller.js.map