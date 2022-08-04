/* eslint-disable no-nested-ternary */
import * as React from 'react';
import { ActionBtn } from './Action';
import { Checkbox } from './Checkbox';
import { Image } from './Image';

export const Columns = ({
  properties, handleCreateUpdate, handleDeleteConfirmation }) => React.useMemo(
  () => [
    ...properties.filter(({ columns, form }) => columns && form)
      .map(({ columns, key, type, objectID, sortField, route, isID }) => ({ accessor: key,
        ...columns,
        ...(isID
          // @ts-ignore
          // eslint-disable-next-line react/prop-types
          ? { Cell: ({ cell: { row: { original } } }) => {
            const vals = original[key];
            let val = '';
            if (Array.isArray(vals)) {
              // eslint-disable-next-line react/prop-types
              val = vals.reduce((acc, curr) => `${acc} ${curr[route]}`, val);
            } else if (vals && vals[route]) {
              val = vals[route];
            }
            return <p>{val}</p>;
          } }
          // eslint-disable-next-line react/prop-types
          : {}),
        ...(type === 'file'
          // @ts-ignore
          // eslint-disable-next-line react/prop-types
          ? { Cell: ({ cell: { row: { original } } }) => <Image value={original[key]} /> }
          // eslint-disable-next-line react/prop-types
          : type === 'boolean' ? { Cell: ({ cell: { row: { original } } }) => {
            const vl = original ? original[key] : undefined;
            return <Checkbox name={key} checked={vl} />;
          } }
            // eslint-disable-next-line react/prop-types
            : objectID ? { Cell: ({ cell: { row: { original } } }) => {
              const vl = original ? original[key] : undefined;
              const vl1 = vl ? vl[0] : undefined;
              return <p>{vl1 ? vl1[sortField] : ''}</p>;
            } } : {}),
      })),
    {
      accessor: 'actions',
      Cell: ({
        // eslint-disable-next-line react/prop-types
        cell: {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars, react/prop-types
          row: { original },
        },
      }) => (
        <ActionBtn
          handleCreateUpdate={handleCreateUpdate}
          original={original}
          handleDeleteConfirmation={handleDeleteConfirmation}
        />
      ),
    },
  ],
  [],
);
