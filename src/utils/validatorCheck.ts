/**
 * Kraken Node
 * @author Copyright(c) 2021 by Restu wahyu saputra
 * MIT Licensed
 */

import fs from 'fs'
import path from 'path'
import { isType } from 'is-any-type'
import { matchProperty, matchPropertyDeep, matchFirstProperty } from './matchProperty'
import { KrakenError } from './customError'

export const validatorCheck = (option: Record<string, any>): boolean | Promise<Error> => {
	let defaultProperty: Record<string, any> = { directory: undefined }
	let inOption: boolean = matchProperty(defaultProperty, option)
	let fileExist: boolean

	if (option.directory !== undefined && isType(option.directory) !== 'undefined') {
		fileExist = fs.existsSync(path.resolve(process.cwd(), `${option.directory}/kraken.config.json`))
	} else {
		fileExist = fs.existsSync(path.resolve(process.cwd(), 'kraken.config.json'))
	}

	if (!fileExist) {
		return Promise.reject(new KrakenError('kraken.config.json not exist in directory'))
	} else if (inOption !== true) {
		return Promise.reject(new KrakenError('option property not exist'))
	} else {
		return true
	}
}

export const configValidator = (config: Record<string, any>): boolean | Promise<Error> => {
	const inConfig: boolean = matchPropertyDeep(config.packages)

	if (inConfig !== true) {
		return Promise.reject(new KrakenError('kraken.config.json property not exist'))
	} else {
		config.packages.forEach((v) => {
			const patternName = /^[$]+[_a-zA-Z.-]+$/gi
			const patternModule = /^[a-zA-Z.-]+$/gi
			const patternInject = /(true|false)/gi

			if (patternName.test(v.name) !== true) {
				return Promise.reject(new KrakenError('kraken.config.json name must be string and before string include $'))
			} else if (patternModule.test(v.module) !== true) {
				return Promise.reject(new KrakenError('kraken.config.json module must be string'))
			} else if (patternInject.test(v.inject) !== true && isType(v.inject) !== 'boolean') {
				return Promise.reject(new KrakenError('kraken.config.json inject must be boolean'))
			}
		})
	}
	return true
}

export const allConfigValidator = (config: Record<string, any>): boolean | Promise<Error> => {
	const inAllConfig: boolean = matchFirstProperty(config)
	if (inAllConfig !== true) {
		return Promise.reject(new KrakenError('kraken.config.json format not valid'))
	}
	return true
}
