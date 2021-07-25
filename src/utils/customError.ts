/**
 * Kraken Injection
 * @author Copyright(c) 2021 by Restu wahyu saputra
 * MIT Licensed
 */

export class KrakenError extends Error {
	public name: string
	public message: string

	constructor(message: string) {
		super(message)
		this.name = this.constructor.name
		this.message = message
		Error.captureStackTrace(this, this.constructor)
	}
}
