/* eslint-disable no-confusing-arrow */
/* eslint-disable react/jsx-indent */
/* eslint-disable function-paren-newline */
/* eslint-disable indent */
import * as React from 'react';
import * as PropTypes from 'prop-types';
import { useTable, usePagination, useRowSelect, useSortBy } from 'react-table';

import { TablePagination } from './TablePagination';
import sortIcon from '../../assets/img/sort_icon.svg';
import { ObjectComparator } from '../../constraint/comparator/object.comparator';
import { Spinner } from './Spinner';

const IndeterminateCheckbox = (props) => {
  const defaultRef = React.useRef() || { current: { indeterminate: null } };
  // eslint-disable-next-line react/prop-types
  const { indeterminate, ...rest } = props;

  React.useEffect(() => {
    defaultRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return <input type="checkbox" className="rounded" ref={defaultRef} {...rest} />;
};

const rowSelectionId = 'selection';

export const Table = (props) => {
  const {
    data,
    columns,
    pageCount: controlledPageCount,
    fetchData,
    actions,
    defaultSort,
    resetPageIndex,
    loading,
    onSelectedChange,
    idKey,
  } = props;
  const [filter, setFilter] = React.useState({
    page: 1,
    rowPerPage: 10,
    ...(defaultSort || { desc: false, id: '' }),
  });
  const [isFirst, setIsFirst] = React.useState(true);
  const [selectedRowsId, setSelectedRowsId] = React.useState([]);
  const isPaginated = !Number.isNaN(controlledPageCount) && fetchData;
  const isRowSelectable = Boolean(actions?.length);
  const hasMultipleSelection = actions.some(({ multipleSelection }) => multipleSelection);
  const tablePlugins = [
    useSortBy,
    ...(isPaginated ? [usePagination] : []),
    ...(isRowSelectable
      ? [
        useRowSelect,
        (hooks) => {
          hooks.visibleColumns.push((cols) => [
            {
              id: rowSelectionId,
              ...(hasMultipleSelection
                ? {
                  // eslint-disable-next-line react/prop-types
                  Header: ({ getToggleAllPageRowsSelectedProps }) => (
                    <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
                  ),
                }
                : {}),
              // eslint-disable-next-line react/prop-types
              Cell: ({ row }) => (
                <IndeterminateCheckbox
                  // eslint-disable-next-line react/prop-types
                  {...row.getToggleRowSelectedProps()}
                  onChange={(event) => {
                    if (!hasMultipleSelection) {
                      // eslint-disable-next-line @typescript-eslint/no-use-before-define
                      toggleAllPageRowsSelected(false);
                    }

                    // eslint-disable-next-line react/prop-types
                    row.toggleRowSelected(event.target.checked);
                  }}
                />
              ),
            },
            ...cols,
          ]);
        },
      ]
      : []),
  ];
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    rows,

    // Pagination
    canPreviousPage,
    canNextPage,
    // pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    selectedFlatRows,
    isAllRowsSelected,

    // Row Selection
    toggleAllPageRowsSelected,
    // eslint-disable-next-line no-unused-vars
    state: { pageIndex, pageSize, sortBy },
  } = useTable(
    {
      data,
      columns,
      initialState: { pageIndex: 0, sortBy: [defaultSort] },
      manualSortBy: true,
      disableSortRemove: true,
      autoResetSelectedRows: false,
      ...(isPaginated
        ? { pageCount: controlledPageCount, manualPagination: true, autoResetPage: false }
        : {}),
    },
    ...tablePlugins,
  );

  React.useEffect(() => {
    const { id, desc } = sortBy[0];
    const newFilter = { id, desc, page: pageIndex + 1, rowPerPage: pageSize };
    const mapFilter = (f) => ({
      sortField: f.id,
      direction: f.desc ? 'DESC' : 'ASC',
      page: f.page,
      rowPerPage: f.rowPerPage,
    });

    if (isRowSelectable) {
      const newSelectedRowsId = selectedFlatRows.map(({ original }: any) => original[idKey]);
      const selectionChanged = selectedRowsId?.length !== selectedFlatRows?.length;

      if (selectionChanged) {
        setSelectedRowsId(newSelectedRowsId);
        onSelectedChange(newSelectedRowsId, isAllRowsSelected);
      }
    }

    if (resetPageIndex) {
      gotoPage(0);
      // return;
    }

    if (isFirst) {
      setIsFirst(false);
      fetchData(mapFilter(filter));

      return;
    }

    if (!ObjectComparator.isEqual(newFilter, filter)) {
      setFilter(newFilter);
      fetchData(mapFilter(newFilter));
    }

    // if ()
  }, [pageSize, pageIndex, sortBy, resetPageIndex, selectedFlatRows]);

  return (
    <div className="flex flex-col items-center">
      {data && data.length ? (
        <div className={isRowSelectable ? 'h-16 self-start' : ''}>
          {selectedFlatRows?.length
            ? actions.map((action) => (
              // <ConditionalTooltip
              //   condition={Boolean(action.tooltip)}
              //   label={action.tooltip}
              //   key={index}
              // >
              <span key={action.elementKey}>
                {/* eslint-disable-next-line no-nested-ternary */}
                {action.multipleSelection
                  ? action.control
                  : selectedFlatRows.length <= 1
                    ? action.control
                    : ''}
              </span>
              // </ConditionalTooltip>
            ))
            : actions.map((action) =>
              action.alwaysShow ? <span key={action.elementKey}>{action.control}</span> : '',
            )}
        </div>
      ) : (
        ''
      )}

      <div className="w-full overflow-auto bkg-custom-table">
        {/* <table {...getTableProps()} className="w-full divide-y"> */}
        <table {...getTableProps()} className="visualisation-table w-full">
          <thead className="uppercase">
            {/* <thead className="text-left uppercase "> */}
            {headerGroups.map((headerGroup) => (
              <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(
                  (column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className="px-4 sticky top-0 bg-white shadow-md"
                    >
                      <span className="flex">
                        <span className="w-auto font-medium text-back mr-2">
                          {' '}
                          {column.render('Header')}
                        </span>
                        {column.isSorted ? <img src={sortIcon} alt="sort" /> : ''}
                      </span>
                    </th>
                  ),
                )}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {(page || rows).map((row) => {
              prepareRow(row);
              return (
                // eslint-disable-next-line react/prop-types
                <tr key={row.id} {...row.getRowProps()}>
                  {/* eslint-disable-next-line react/prop-types */}
                  {row.cells.map((cell) => (
                    <td
                      className={`border-b ${cell.column.noDefaultStyle ? 'p-0 h-10' : ''
                        } ${`${cell.getCellProps().key}`.includes(rowSelectionId)
                          ? 'select-row'
                          : 'simple-row'
                        }`}
                      key={cell.value}
                      {...cell.getCellProps()}
                    >
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* eslint-disable-next-line no-nested-ternary */}
      {loading ? (
        <Spinner className="border-gray-400 border-t-2 mt-2" />
      ) : data.length ? (
        ''
      ) : (
        <p className="text-center text-sm py-4">Aucun résultat</p>
      )}
      {isPaginated && (
        <div className="self-end mt-2">
          <TablePagination
            canNextPage={canNextPage}
            canPreviousPage={canPreviousPage}
            nextPage={nextPage}
            pageCount={pageCount}
            pageIndex={pageIndex}
            pageSize={parseInt(`${pageSize}`, 10)}
            previousPage={previousPage}
            setPageSize={setPageSize}
          // searchPage={(item) => {
          //   const _filter = { ...filter, page: item };
          //   fetchData(mapFilter(_filter));
          //   setSearchPage(item);
          // }}
          />
        </div>
      )}
    </div>
  );
};

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  columns: PropTypes.arrayOf(PropTypes.any).isRequired,
  pageCount: PropTypes.number,
  fetchData: PropTypes.func,
  isRowSelectable: PropTypes.bool,
  resetPageIndex: PropTypes.bool,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      // icon: PropTypes.any,
      // onClick: PropTypes.func,
      // tooltip: PropTypes.string,
      alwaysShow: PropTypes.bool,
      elementKey: PropTypes.string.isRequired,
      // eslint-disable-next-line react/forbid-prop-types
      control: PropTypes.any.isRequired,
      multipleSelection: PropTypes.bool,
    }),
  ),
  hideHeader: PropTypes.bool,
  onSelectedChange: PropTypes.func,
  defaultSort: PropTypes.shape({
    id: PropTypes.string,
    desc: PropTypes.bool,
  }),
  loading: PropTypes.bool,
  idKey: PropTypes.string,
};

Table.defaultProps = {
  pageCount: 0,
  fetchData: () => { },
  isRowSelectable: false,
  actions: [],
  hideHeader: false,
  resetPageIndex: false,
  onSelectedChange: () => { },
  defaultSort: { id: 'id', desc: true },
  loading: false,
  idKey: 'id',
};
