"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocketController = void 0;
const tslib_1 = require("tslib");
const socket_io_1 = require("socket.io");
const websocket_decorator_1 = require("../decorators/websocket.decorator");
/**
 * A demo controller for websocket
 */
let WebSocketController = class WebSocketController {
    constructor(socket) {
        this.socket = socket;
    }
    /**
     * The method is invoked when a client connects to the server
     * @param socket
     */
    connect(socket) {
        console.log('Client connected: %s', this.socket.id);
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        socket.join('room 1');
    }
    /**
     * Register a handler for 'chat message' events
     * @param msg
     */
    // @ws.emit('namespace' | 'requestor' | 'broadcast')
    handleChatMessage(msg) {
        console.log('Chat message: %s', msg);
        this.socket.nsp.emit('chat message', `[${this.socket.id}] ${msg}`);
    }
    /**
     * Register a handler for all events
     * @param msg
     */
    logMessage(...args) {
        console.log('Message: %s', args);
    }
    /**
     * The method is invoked when a client disconnects from the server
     * @param socket
     */
    disconnect() {
        console.log('Client disconnected: %s', this.socket.id);
    }
};
tslib_1.__decorate([
    websocket_decorator_1.ws.connect(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [socket_io_1.Socket]),
    tslib_1.__metadata("design:returntype", void 0)
], WebSocketController.prototype, "connect", null);
tslib_1.__decorate([
    websocket_decorator_1.ws.subscribe('chat message'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], WebSocketController.prototype, "handleChatMessage", null);
tslib_1.__decorate([
    websocket_decorator_1.ws.subscribe(/.+/),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], WebSocketController.prototype, "logMessage", null);
tslib_1.__decorate([
    websocket_decorator_1.ws.disconnect(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], WebSocketController.prototype, "disconnect", null);
WebSocketController = tslib_1.__decorate([
    (0, websocket_decorator_1.ws)('/chats'),
    tslib_1.__param(0, websocket_decorator_1.ws.socket()),
    tslib_1.__metadata("design:paramtypes", [socket_io_1.Socket])
], WebSocketController);
exports.WebSocketController = WebSocketController;
//# sourceMappingURL=websocket.controller.js.map