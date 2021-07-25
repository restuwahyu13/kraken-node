/**
 * Kraken Node
 * @author Copyright(c) 2021 by Restu wahyu saputra
 * MIT Licensed
 */

export const mergeProperty = (data: Record<string, any>): Record<string, any> => {
	const res: Record<string, any>[] = data.packages
		.filter((v) => {
			if (!Object.keys(v).includes('inject')) {
				Object.defineProperty(v, 'inject', {
					value: true,
					writable: true,
					enumerable: true
				})
			}
			return v
		})
		.filter((v) => v.inject !== false && v)

	return { packages: res }
}
