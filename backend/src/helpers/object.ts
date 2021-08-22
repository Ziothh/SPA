export type AnyObject = { [key: string]: any; }

/** Returns true if the objects are equal else false */
export const objectsAreEqual = (object1: AnyObject, object2: AnyObject): boolean => {
    const firstObjKeys = Object.keys(object1)
    const otherObjEntries = Object.entries(object2)
    
    if (firstObjKeys.length !== otherObjEntries.length) return false

    // If the object is found in the array: return true
    for (const [key, value] of otherObjEntries) {
        if (object1[key] !== value || firstObjKeys.indexOf(key) === -1) return false
    }
    return true
}