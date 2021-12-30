/* tslint:disable */
/* eslint-disable */
/**
* @param {Uint8Array} bytes
* @returns {boolean}
*/
export function check_if_valid_qoif(bytes: Uint8Array): boolean;
/**
* @param {Uint8Array} bytes
* @param {number} size
* @returns {QoiImage}
*/
export function decode_qoi(bytes: Uint8Array, size: number): QoiImage;
/**
*/
export class QoiImage {
  free(): void;
/**
*/
  constructor();
/**
* @returns {number}
*/
  get_width(): number;
/**
* @returns {number}
*/
  get_height(): number;
/**
* @returns {number}
*/
  get_channels(): number;
/**
* @returns {Uint8Array}
*/
  get_bytes(): Uint8Array;
}
