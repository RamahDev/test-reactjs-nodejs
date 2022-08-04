/* eslint-disable no-await-in-loop */
/* eslint-disable react/prop-types */
/* eslint-disable no-loop-func */
import * as React from 'react';
import * as PropTypes from 'prop-types';

import { useForm } from 'react-hook-form';
import { useCustomSnackbar } from '../hooks/Snackbar';
import { Input } from '../../presentation/component/Input';
import { SaveCancel } from '../../presentation/component/SaveCancel';
// import { regexPatterns } from '../../constraint/validator/RegexPattern';
import { FeedbackMessage } from '../../data/constants/MessageConfirmation';
import { useUpload } from '../hooks/Axios';
import { MyDropzone } from '../../presentation/component/MyDropzone';
import { MultiSelect } from '../../presentation/component/MultiSelect';
import { LieuComponent } from '../../presentation/component/lieux';
import { Checkbox } from '../../presentation/component/Checkbox';

export const toDataSelect = (data: any, sortField) => data?.map(
  ({ id, ...all }) => ({ value: id, label: all[sortField] }),
) || [];

export const CreateUpdate = ({
  // eslint-disable-next-line react/prop-types
  initial, entity, onClose, properties, useEntitySA,
}) => {
  const { register, errors, handleSubmit, setValue, control } = useForm({ mode: 'onBlur' });
  const [openSnackbar] = useCustomSnackbar();
  // const { required } = regexPatterns;
  const [loading, setLoading] = React.useState(false);
  const [file, setFile] = React.useState<any>({});
  const [checkbox, setCheckbox] = React.useState<any>({});
  const [locations, setLocations] = React.useState<any>({});
  const { create, update } = useEntitySA();

  const setFiles = (vl, key) => {
    setFile({ ...file, [key]: vl });
  };

  const submit = async (data) => {
    setLoading(true);
    const method = entity?.id ? update : create;
    try {
      let imageUrl = file;
      const files = Object.keys(file);
      if (files?.length > 0) {
        let j = 0;
        do {
          const key = files[j];
          const fls = file[key];
          let k = 0;
          let res = [];
          if (Array.isArray(fls) && fls?.length > 0) {
            do {
              const fl = await useUpload(fls[k]);
              res = [...res, fl];
              k += 1;
            } while (k < fls.length);
          }
          const isExist = properties?.find((propertie) => propertie?.type === 'file' && propertie?.isArray && propertie?.name === key);

          imageUrl = {
            ...imageUrl,
            [key]: isExist ? res : res[0],
          };
          j += 1;
        } while (files[j]);
      }

      const locazion = Object.keys(locations).reduce((acc, attribut) => ({
        ...acc,
        [attribut]: locations[attribut],
      }), {});
      const up = {
        ...(entity?.id ? { id: entity.id } : {}),
        ...data,
        // ...(imageUrl ? { imageUrl } : {}),
        ...imageUrl,
        ...locazion,
        ...checkbox,
      };
      // const test = transformValue(up);
      const body = {
        ...up,
        // categories: initial?.categories,
      };
      let i = 0;
      let newData = entity?.id ? up : body;

      if (initial && Object.keys(initial).length > 0) {
        const selects = properties?.filter((propertie) => propertie?.entity?.name);
        do {
          const current = selects[i];
          if (current?.key && initial[current.key]) {
            if (Array.isArray(newData[current.key])) {
              newData = {
                ...newData,
                [current.key]: initial[current.key].filter(
                  ({ id }) => newData[current.key].map(({ value }) => value).includes(id),
                ).map(({ id }) => id) || [],
              };
            } else {
              newData = {
                ...newData,
                [current.key]: initial[current.key]?.find(
                  ({ id }) => id && newData[current.key]?.value === id,
                )?.id || '',
              };
            }
          }

          i += 1;
        } while (selects[i]);
      }

      const { data: newEntity } = await method({ body: newData });
      openSnackbar(FeedbackMessage.save);
      onClose(newEntity);
    } catch (error) {
      openSnackbar(error?.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (entity) {
      let i = 0;
      do {
        const current = properties[i];
        let value = entity[current.key];
        if (Array.isArray(value) && Array.isArray(initial[current.key])) {
          // eslint-disable-next-line no-underscore-dangle
          const ids = value.map((itm) => itm?._id);
          value = toDataSelect(initial[current.key]
            .filter(({ id }) => ids.includes(id)), current.route) || [];
        } else if (initial[current.key]) {
          // eslint-disable-next-line no-underscore-dangle
          const curr = initial[current.key].find(({ id }) => id === value?._id);
          // eslint-disable-next-line no-unused-expressions
          curr && console.log({ id: curr.id, label: curr[current.route] });

          value = curr ? { value: curr.id, label: curr[current.route] } : value;
        }
        setValue(current.key, value);
        i += 1;
      } while (properties[i]);
      // setValue('name', name);
    }
  }, []);

  // eslint-disable-next-line no-underscore-dangle
  const keys = properties.filter(({ form, notUpdate }) => form && !(entity?._id && notUpdate));

  return (
    <form id="submit-form" onSubmit={handleSubmit(submit)}>
      {
      // eslint-disable-next-line no-underscore-dangle
      ...keys.filter(({ form, notUpdate }) => form && !(entity?._id && notUpdate))
        .map(({ key, type, form, required, route, name, ...propertie }) => {
          if (type === 'boolean') {
            return (
              <Checkbox
                key={key}
                name={key}
                label={form}
                onChange={(e) => setCheckbox({ ...checkbox, [key]: e.target.checked })}
                inputRef={register({ required, maxLength: 100 })}
                checked={checkbox ? checkbox[key] : null}
              />
            );
          } if (type === 'number') {
            return (
              <Input
                type="number"
                key={key}
                label={form}
                name={key}
                inputRef={register({ required, maxLength: 100 })}
                errors={errors}
                autoFocus
                required={required}
              />
            );
          } if (type === 'string') {
            return (
              <Input
                key={key}
                label={form}
                name={key}
                inputRef={register({ required, maxLength: 10000 })}
                errors={errors}
                autoFocus
                required={required}
              />
            );
          } if (type === 'location') {
            return (
              <LieuComponent key={key} placeholder="location ..." title={form} onChage={(res: any) => setLocations({ ...locations, [key]: res })} />
            );
          } if (type === 'file') {
            return (
              <MyDropzone
                keyName={name}
                name={form}
                key={key}
                setFile={setFiles}
                file={entity ? entity[key] : null}
              />
            );
          } if (propertie?.entity?.name) {
            return (
              <MultiSelect
                key={key}
                name={key}
                control={control}
                options={initial ? toDataSelect(initial[key], route) || [] : []}
                isMulti={propertie?.isArray}
                placeholder={`Select ${form}`}
              // defaultValue={'1'}
                rules={{ required }}
                errors={errors}
                label={form}
                required
              />
            );
          }
          return (
            <Input
              key={key}
              label={form}
              name={key}
              inputRef={register({ required, maxLength: 10000 })}
              errors={errors}
              autoFocus
              required={required}
            />
          );
        })
        }

      <SaveCancel key={1} onCancelClick={onClose} loading={loading} />
    </form>
  );
};

CreateUpdate.propTypes = {
  entity: PropTypes.shape({
    id: PropTypes.string,
    // ...properties.reduce((acc, { key, type }) => ({ ...acc, [key]: PropTypes[type] }), {}),
  }),
  onClose: PropTypes.func,
};

CreateUpdate.defaultProps = {
  entity: null,
  onClose: () => {},
};
