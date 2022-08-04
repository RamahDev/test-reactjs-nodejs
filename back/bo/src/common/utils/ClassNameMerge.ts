export const mergeClassNames = (baseClassNames: string, customClassName: string) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  `${baseClassNames
    .split(' ')
    .filter((classMember) => !customClassName.includes(classMember.split('-')[0]))
    .join(' ')} ${customClassName}`;
