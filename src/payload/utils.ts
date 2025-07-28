/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { getPayload as getPayloadBase } from 'payload';
import config from '@payload-config';
import superjson from "superjson";

export function getPayload() {
	return getPayloadBase({ config })
}

export function getCollectionMongooseConfig() {
	return {
		_id: false,
		id: true,
		toJSON: {
			getters: true,
			virtuals: true,
			flattenObjectIds: true,
			transform: (_doc: any, ret: any) => {
				const { json } = superjson.serialize(ret)
				delete (json as any)?._id
				delete (json as any)?.__v
				return json
			},
		},
		toObject: {
			getters: true,
			virtuals: true,
			flattenObjectIds: true,
			transform: (_doc: any, ret: any) => {
				const { json } = superjson.serialize(ret)
				delete (json as any)?._id
				delete (json as any)?.__v
				return json
			},
		}
	}
}

// Serialize MongoDB ObjectIds to strings
export const serializeMongoDocIDs = (doc: any): any => {
	if (!doc) return doc

	// Handle direct ObjectId objects
	if (typeof doc === 'object' && doc.constructor?.name === 'ObjectId') {
		return doc.toString()
	}

	// Handle Buffer objects that represent ObjectIds (12 bytes = ObjectId)
	if (typeof doc === 'object' && doc.type === 'Buffer' && Array.isArray(doc.data) && doc.data.length === 12) {
		// Convert Buffer data to hex string
		const hexString = doc.data.map((byte: string) => parseInt(byte).toString(16).padStart(2, '0')).join('')
		return hexString
	}

	// Handle buffer objects with array format from admin panel
	if (typeof doc === 'object' && Array.isArray(doc.buffer) && doc.buffer.length === 12) {
		// Convert buffer array to hex string
		const hexString = doc.buffer.map((byte: string | number) => {
			const num = typeof byte === 'string' ? parseInt(byte) : byte;
			return num.toString(16).padStart(2, '0');
		}).join('');
		return hexString;
	}

	// Handle objects with ObjectId in the id field
	if (doc?.id && typeof doc.id === 'object') {
		if (doc.id.constructor?.name === 'ObjectId') {
			return { ...doc, id: doc.id.toString() }
		}
		// Handle Buffer ObjectId in id field
		if (doc.id.type === 'Buffer' && Array.isArray(doc.id.data) && doc.id.data.length === 12) {
			const hexString = doc.id.data.map((byte: string) => parseInt(byte).toString(16).padStart(2, '0')).join('')
			return { ...doc, id: hexString }
		}
		// Handle buffer array format in id field
		if (Array.isArray(doc.id.buffer) && doc.id.buffer.length === 12) {
			const hexString = doc.id.buffer.map((byte: string | number) => {
				const num = typeof byte === 'string' ? parseInt(byte) : byte;
				return num.toString(16).padStart(2, '0');
			}).join('');
			return { ...doc, id: hexString };
		}
	}

	if (Array.isArray(doc)) {
		return doc.map(serializeMongoDocIDs)
	}

	if (typeof doc === 'object' && doc !== null) {
		const serialized: any = {}
		for (const key in doc) {
			if (doc.hasOwnProperty(key)) {
				serialized[key] = serializeMongoDocIDs(doc[key])
			}
		}
		return serialized
	}

	return doc as Record<string, unknown>
}

