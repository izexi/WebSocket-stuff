import * as uWS from 'uWebSockets.js';
import Logger from './Logger';
import Clients from './Clients';

export default class Server {
	public clients = new Clients();

	public start() {
		const port = 3000;
		uWS.App().ws('/*', {
			compression: 0,
			maxPayloadLength: 16 * 1024 * 1024,
			open: (ws, req) => {
				this.clients.add(ws, req);
				Logger.connected(ws);
			},
			message: (ws, message) => {
				const decoded = this.decodeMessage(message);
				Logger.info(`Recieved message from ${ws.ip}: ${decoded}`);
				this.clients.in(ws.room).forEach(client => {
					try {
						client.send(message);
					} catch (error) {
						Logger.error(`Error while sending "${decoded}" to ${ws.ip}`, error);
					}
				});
			},
			close: ws => {
				this.clients.remove(ws);
				Logger.disconnected(ws);
			}
		}).listen(port, token => Logger.status(token ? `Listening to port ${port}` : `Failed to listen to port ${port}`));
	}

	public decodeMessage(message: ArrayBuffer) {
		return Buffer.from(message).toString('utf8');
	}
}
