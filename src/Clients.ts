import * as uWS from 'uWebSockets.js';

export default class Clients extends Map<string, uWS.WebSocket> {
	public add(ws: uWS.WebSocket, req: uWS.HttpRequest) {
		ws.room = req.getUrl();
		ws.ip = new Uint8Array(ws.getRemoteAddress()).join('.');
		return this.set(ws.ip, ws);
	}

	public remove(ws: uWS.WebSocket) {
		return this.delete(ws.ip);
	}

	public in(room: string) {
		return [...this.values()].filter(ws => ws.room === room);
	}
}
