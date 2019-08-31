import chalk from 'chalk';
import * as uWS from 'uWebSockets.js';

export default {
	log(text: any, type = '') {
		console.log(`[${chalk(new Date().toLocaleTimeString())}]${type ? ` ${type}` : ''} ${text}`);
	},
	status(text: string) {
		this.log(text, `[${chalk.green('STATUS')}]`);
	},

	info(text: string) {
		this.log(text, `[${chalk.yellow('INFO')}]`);
	},

	connected(ws: uWS.WebSocket) {
		this.log(`${ws.id} (${ws.ip}) in room ${ws.room}`, `[${chalk.bgGreen('CONNECTED')}]`);
	},

	disconnected(ws: uWS.WebSocket) {
		this.log(`${ws.id} in room ${ws.room}`, `[${chalk.bgRed('DISCONNECTED')}]`);
	},

	error(text: string, err: any) {
		this.log(text, `[${chalk.red('ERROR')}]`);
		console.error(err);
	},

	unhandledRejection(rej: any) {
		this.log(`[${chalk.red('UNHANDLEDREJECTION')}]`);
		console.warn(rej);
	}
};
