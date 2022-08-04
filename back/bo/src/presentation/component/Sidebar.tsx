import * as React from 'react';
import * as PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import { Accordion, Item } from './Accordion';
// import { useSidebar } from '../../redux/ducks/sidebar';

export const Sidebar = (props) => {
  const { items, collapse } = props;
  const history = useHistory();
  const goTo = (url) => history.replace(url);
  // const { countNotSeenRdv, countNotSeenAvenantContrat } = useSidebar();

  React.useEffect(() => {
    // countNotSeenRdv();
    // countNotSeenAvenantContrat();
  }, []);
  return (
    <div
      className="sidebar h-screen flex flex-col"
    // style={{ minWidth: '18rem', backgroundColor: '#338554' }}
    >
      {/* <div className="flex items-center px-8 mb-5">
        <img src={logo} alt="Logo BIONEXX" className="w-48" /> */}
      {/* <p className="font-medium ml-4 text-lg">BACK OFFICE</p> */}
      {/* </div> */}
      <div className="overflow-y-auto px-2 maxh-90 minw-100">
        <Accordion items={items as Item[]} onUrlChange={goTo} collapse={collapse} />
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  items: PropTypes.oneOfType([PropTypes.array, PropTypes.arrayOf(PropTypes.instanceOf(Item))]),
  collapse: PropTypes.bool,
};

Sidebar.defaultProps = {
  items: [],
  collapse: true,
};
