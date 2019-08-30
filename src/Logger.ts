import chalk from 'chalk';
import * as uWS from 'uWebSockets.js';
import { formatAddress } from './Clients';

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
		this.log(formatAddress(ws), `[${chalk.bgGreen('CONNECTED')}]`);
	},

	disconnected(ws: uWS.WebSocket) {
		this.log(formatAddress(ws), `[${chalk.bgRed('DISCONNECTED')}]`);
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
