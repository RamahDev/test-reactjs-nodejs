/* eslint-disable no-plusplus */
/* eslint-disable operator-linebreak */
/* eslint-disable indent */
export class ObjectComparator {
  /**
   * Deep compare two object
   * @author m.andriamahenimanana
   * @param {object} obj1
   * @param {object} obj2
   * @param {boolean} isStronglyTyped
   * @returns {boolean}
   */
  public static isEqual(obj1: object, obj2: object, isStronglyTyped = true): boolean {
    const obj1Keys = Object.keys(obj1 || {});
    const obj2Keys = Object.keys(obj2 || {});
    const { length: obj1Length } = obj1Keys;
    const { length: obj2Length } = obj2Keys;

    if (obj1Length !== obj2Length) {
      return false;
    }

    for (let i = 0; i < obj1Length; i++) {
      const key = obj1Keys[i];
      const value1 = obj1[key];
      const value2 = obj2[key];
      const isObject = typeof value1 === 'object' && typeof value2 === 'object';
      // eslint-disable-next-line no-nested-ternary
      const isDifferent = isStronglyTyped
        ? isObject
          ? !ObjectComparator.isEqual(value1, value2)
          : value1 !== value2
        : isObject
        ? !ObjectComparator.isEqual(value1, value2, isStronglyTyped)
        : // eslint-disable-next-line eqeqeq
          value1 != value2;

      if (isDifferent) {
        return false;
      }
    }

    return true;
  }

  /**
   * Deep compare array
   * @param {array<object>} objs1
   * @param {array<object>} objs2
   * @param {boolean} isStronglyTyped
   * @returns {boolean}
   */
  public static areEquals(objs1: object[], objs2: object[], isStronglyTyped = true): boolean {
    const { length: objs1Length } = objs1;
    const { length: objs2Length } = objs2;

    if (objs1Length !== objs2Length) {
      return false;
    }

    for (let i = 0; i < objs1Length; i++) {
      if (!ObjectComparator.isEqual(objs1[i], objs2[i], isStronglyTyped)) {
        return false;
      }
    }

    return true;
  }
}
