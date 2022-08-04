/* eslint-disable react/prop-types */
import * as React from 'react';
import { useCustomSnackbar } from '../hooks/Snackbar';
import {
  ConfirmationTitle,
  FeedbackMessage,
  MessageConfirmation,
} from '../../data/constants/MessageConfirmation';

import { Button } from '../../presentation/component/Button';
import { ConfirmModal } from '../../presentation/component/ConfirmModal';
import { Input } from '../../presentation/component/Input';
import { Modal } from '../../presentation/component/Modal';
import { Table } from '../../presentation/component/Table';
import { CreateUpdate } from './CreateUpdate';
import { ReactComponent as SearchIcon } from '../../assets/img/search_icon.svg';
import { Columns } from '../../presentation/component/Columns';

export const EntityContainer = ({ currententity, transformValue = (
  res,
) => res, relation, getInitialValue, properties, useEntitySA, entityUrl,
defaultSort = {} }) => {
  const { getAll, remove } = useEntitySA();
  const [open, setOpen] = React.useState(false);
  const [entity, setEntity] = React.useState<any>({});
  const [pageCount, setPageCount] = React.useState(0);
  const [resetPageIndex, setResetPageIndex] = React.useState(false);
  const [openSnackbar] = useCustomSnackbar();
  const [entitys, setEntitys] = React.useState([]);
  const data = React.useMemo(() => entitys, [entitys]);
  const [selectedEntity, setSelectedEntity] = React.useState(null);
  const [toDeleteEntity, setToDeleteEntity] = React.useState(null);
  const [filter, setFilter] = React.useState({
    page: 1,
    rowPerPage: 10,
    direction: 'ASC',
    recherche: '',
    light: false,
    // ...customFiltre,
  });

  React.useEffect(() => {
    initialValue();
  }, []);

  const initialValue = async () => {
    const res: any = await getInitialValue();
    setEntity(res);
  };

  const getEntitys = async (currentFilter) => {
    try {
      const { data: _data } = await getAll({ params: relation
        ? ({ ...currentFilter, ...relation }) : currentFilter });
      if (_data) {
        const { items, totalCount } = _data;
        setPageCount(Math.ceil(
          totalCount || 0 / currentFilter.rowPerPage,
        ));
        setEntitys(items);
      } else {
        setEntitys([]);
      }
    } catch (error) {
      console.log(error);
      openSnackbar(error?.message);
    } finally {
      if (resetPageIndex) {
        setResetPageIndex(false);
      }
    }
  };
  const handleCreateUpdate = (_entity = null) => () => {
    setSelectedEntity(_entity);
    setOpen(true);
  };
  const handleDeleteConfirmation = (_entity) => () => setToDeleteEntity(_entity);
  const handleDeleteConfirmationClose = async (ok) => {
    if (ok) {
      try {
        await remove({ customUrl: `${entityUrl}/${toDeleteEntity?.id}` });

        getEntitys(filter);
        openSnackbar(FeedbackMessage.delete);
      } catch (error) {
        console.log(error);
        openSnackbar(error?.message);
      }
    }

    setToDeleteEntity(null);
  };
  const columns = Columns({
    properties: properties.slice(0, 8), handleCreateUpdate, handleDeleteConfirmation });

  const handleSearch = () => {
    setResetPageIndex(() => true);
    getEntitys({ ...filter, page: 1 });
  };
  const handleSearchChange = (e) => setFilter((f) => ({ ...f, email: e.target.value }));
  const fetchData = (params) => {
    const newFilter = { ...filter, ...params };
    setFilter(newFilter);
    getEntitys(newFilter);
  };
  const handleClose = (_entity) => {
    if (_entity) {
      getEntitys(filter);
    }
    setOpen(false);
  };

  return (
    <div>
      <div className="flex items-center justify-center">
        <p className="title-one">
          Gestion
          {' '}
          {currententity}
        </p>
      </div>
      <div className="flex flex-col-left justify-between items-center mb-6">
        <div className="flex searchInput">
          <Input
            name="recherche"
            placeholder="recherche par email ..."
            value={filter.recherche}
            onChange={handleSearchChange}
            onEnterPress={handleSearch}
          />
          <Button variant="icon" className="ml-2 hover:text-green-900" onClick={handleSearch}>
            {/* <Search className="w-6" /> */}
            <SearchIcon />
          </Button>
        </div>
        <Button onClick={handleCreateUpdate()}>{`Ajouter ${currententity}` || ''}</Button>
      </div>
      <Table
        resetPageIndex={resetPageIndex}
        columns={columns}
        pageCount={pageCount}
        fetchData={fetchData}
        data={data || []}
        defaultSort={defaultSort}
      />
      <Modal
        title={selectedEntity?.id ? `Modification ${currententity}` : `Ajout ${currententity}`}
        onClose={() => setOpen(false)}
        open={open}
      >
        <CreateUpdate
        // @ts-ignore
          transformValue={transformValue}
          initial={entity}
          entity={selectedEntity}
          onClose={handleClose}
          useEntitySA={useEntitySA}
          properties={properties}
        />
      </Modal>
      <ConfirmModal
        open={Boolean(toDeleteEntity)}
        title={ConfirmationTitle.delete}
        onClose={handleDeleteConfirmationClose}
      >
        {`${MessageConfirmation.delete} '${toDeleteEntity?.name}' ?`}
      </ConfirmModal>
    </div>
  );
};
