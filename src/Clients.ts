import * as uWS from 'uWebSockets.js';

export function formatAddress(ws: uWS.WebSocket) {
	return new Uint8Array(ws.getRemoteAddress()).toString();
}

export default class Clients extends Map<string, uWS.WebSocket> {
	public add(ws: uWS.WebSocket) {
		return this.set(formatAddress(ws), ws);
	}

	public remove(ws: uWS.WebSocket) {
		return this.delete(formatAddress(ws));
	}

	public in(room: string) {
		return [...this.values()].filter(ws => ws.room === room);
	}
}
