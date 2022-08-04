/** ********************************************************
 *
 *             Import from react lib
 *
 ********************************************************* */
import * as React from 'react';

import Autocomplete from "react-google-autocomplete";

export interface PropsLieu {
    title: string,
    placeholder?: string,
    zIndex?: number,
    onChage: (place: {
        label: string;
        longitude: any;
        latitude: any;
    }) => void,
}

export const LieuComponent: React.FunctionComponent<PropsLieu> = function (props) {
  // eslint-disable-next-line react/prop-types
  const { onChage, placeholder } = props;
  // eslint-disable-next-line no-irregular-whitespace
  const [, setValue] = React.useState(placeholder || '');

  React.useEffect(() => {
    setValue(placeholder);
  }, [placeholder]);

  // console.log(value);

  return (
    <div>
      <Autocomplete
        apiKey="AIzaSyAcIu31Dymn3-eunlFzz1gWoO9tvNK7gOo"
        language="fr"
        options={{
          fields: ['ALL'],
          types: ["establishment"],
          // componentRestrictions: { country: "fr" },
        }}
        onPlaceSelected={async (data) => {
          const place = {
            label: data?.formatted_address || '',
            longitude: data?.geometry?.location?.lng() || 0,
            latitude: data?.geometry?.location?.lat() || 0,
          };
          onChage(place);
        }}
      />

    </div>
  );
};
