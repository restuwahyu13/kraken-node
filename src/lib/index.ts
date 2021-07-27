/**
 * Kraken Node
 * @author Copyright(c) 2021 by Restu wahyu saputra
 * MIT Licensed
 */

import path from 'path'
import { readFileSync } from 'fs'
import zlib from 'zlib'
import { isType } from 'is-any-type'
import { validatorCheck, configValidator, allConfigValidator } from '../utils/validatorCheck'
import { mergeProperty } from '../utils/mergeProperty'
import { OptionConfig } from '../types'

class KrakenNode {
	private configs: any = {}
	private module: any[] = []
	private input: any[] = []
	private moduleStore: any = []
	private inputStore: any = []

	constructor(input: Record<string, any>[], module: Record<string, any>[]) {
		this.input = input
		this.module = module
	}

	registerModule(): any {
		if (
			this.input.length > 0 &&
			this.module.length > 0 &&
			isType(this.input) === 'array' &&
			isType(this.module) === 'array'
		) {
			this.moduleStore = this.injectModule(this.module)
			this.input.forEach((modules: any) => {
				this.inputStore = this.input.indexOf(modules)
				this.configs[modules] = {
					value: this.moduleStore[this.inputStore],
					writable: true,
					enumerable: true
				}
			})

			if (isType(global) !== 'undefined') Object.defineProperties(global, this.configs)
			if (isType(this) !== 'undefined') Object.defineProperties(this, this.configs)
		}
	}

	injectModule(module: any): Record<string, any>[] {
		if (module.length > 0 && isType(module) === 'array') {
			this.moduleStore = module
				.filter((v, i) => module.indexOf(v === i))
				.join()
				.replace(/ /gi, '')
				.split(',')
				.map((v) => require(`${v}`))
		}

		return this.moduleStore
	}
}

function krakenNode(options: any): void {
	let module: Record<string, any>[] = []
	let input: Record<string, any>[] = []

	options.packages.forEach((v) => {
		module.push(v.module)
		input.push(v.name)
	})
	new KrakenNode(input, module).registerModule()
}

/**
 * config to load each given module from kraken.config.json, without the need to rewrite require, then module can also be accessed as a global in every file or route, you haven't to register the same module as you want to use it.
 *
 * @param options - Object
 */
export function config(options?: OptionConfig): void {
	let option: OptionConfig
	options === undefined ? (option = { directory: undefined }) : (option = options)

	let validator: any = validatorCheck(option)
	let readFile: any
	let compress: any
	let response: any

	if (isType(validator) === 'boolean') {
		if (option.directory !== undefined) {
			readFile = readFileSync(path.resolve(process.cwd(), `${option.directory}/kraken.config.json`)).toString('utf-8')
			compress = zlib.brotliCompressSync(readFile, { chunkSize: 999999999, maxOutputLength: 999999999 })
			response = zlib.brotliDecompressSync(compress, { maxOutputLength: 999999999 }).toString('utf-8')
		} else {
			readFile = readFileSync(path.resolve(process.cwd(), 'kraken.config.json'))
			compress = zlib.brotliCompressSync(readFile, { chunkSize: 999999999, maxOutputLength: 999999999 })
			response = zlib.brotliDecompressSync(compress, { maxOutputLength: 999999999 }).toString('utf-8')
		}

		let isAllConfigValidator = allConfigValidator(JSON.parse(response))
		if (isType(isAllConfigValidator) === 'boolean') {
			let isConfigValidator = configValidator(mergeProperty(JSON.parse(response)))
			if (isType(isConfigValidator) === 'boolean') {
				krakenNode(mergeProperty(JSON.parse(response)))
			}
		}
	}
}
