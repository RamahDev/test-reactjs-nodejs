import {capitalizeFirstLetter} from '../../services/technique/utils';

const data = require('./Fragment.json');

const toDefault = (type, defaultValue) => {
  switch (type) {
    case 'String':
    case 'string':
    case String:
      return {
        type: String,
        default: defaultValue || '',
      };
    case Array:
    case 'Array':
      return {
        type: Array,
        default: defaultValue || [],
      };
    case Object:
    case 'Object':
      return {
        type: Object,
        default: defaultValue || {},
      };
    default:
      return {
        type: String,
        default: defaultValue || '',
      };
  }
};
const initialAttributs = name => ({
  ['list' + capitalizeFirstLetter(name)]: {
    type: Array,
    default: [],
  },
  [name]: {
    type: Object,
    default: {},
  },
});

export const UMLClass =
  data && data.ownedElements
    ? data.ownedElements
        .filter(i => i._type === 'UMLClass')
        .map(className => {
          const {attributes, operations} = className;
          const name = className.name.toLowerCase();
          const model = operations
            ? operations.map(operation => {
                const {specification, ...all} = operation;
                let urlAndMethod = {};
                const documentation = specification;
                if (
                  documentation &&
                  documentation.split('&&') &&
                  documentation.split('&&').length > 0
                ) {
                  urlAndMethod = documentation
                    .split('&&')
                    .reduce((acc, curr) => {
                      const val = curr.split('=');
                      if (val && val.length > 1) {
                        return {
                          ...acc,
                          [val[0]]: val[1],
                        };
                      }
                      return acc;
                    }, {});
                }
                return {
                  ...all,
                  ...urlAndMethod,
                };
              })
            : [];

          const attributs = attributes.reduce((acc, curr) => {
            const {name, type, documentation} = curr;
            let defaultValue;
            if (documentation) {
              defaultValue = documentation;
            }
            return {
              ...acc,
              [name]: toDefault(type, defaultValue),
            };
          }, initialAttributs(name));
          return {
            ...className,
            model,
            entity: name,
            name,
            attributs,
          };
        })
    : [];

const objectClass = UMLClass.reduce((acc, curr) => {
  const {name} = curr;
  return {
    ...acc,
    [name]: curr,
  };
}, {});

export default objectClass;
