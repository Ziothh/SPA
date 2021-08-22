import type {AnyObject} from './object'
import {objectsAreEqual} from './object'

/** Returns true if the object has been found in the array */
export const objectInArray = (array: AnyObject[], object: AnyObject): boolean => array.some(arrObj => objectsAreEqual(arrObj, object))
