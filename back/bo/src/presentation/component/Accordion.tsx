/* eslint-disable no-nested-ternary */
import * as React from 'react';
import * as PropTypes from 'prop-types';

import '../../assets/css/accordion.css';
import { ChevronUp } from './icons/ChevronUp';
import { ChevronDown } from './icons/ChevronDown';
import { ChevronRight } from './icons/ChevronRight';
import { mergeClassNames } from '../../common/utils/ClassNameMerge';

export class Item {
  id: string;

  title: string;

  children?: Item[];

  url?: string;

  onClick?: Function;

  showIcon?: boolean;

  icon?: any;

  badgeKey?: string;
}

export const AccordionItem = (props) => {
  const {
    active,
    onToggle,
    header,
    children,
    className,
    showIcon,
    isChild,
    icon,
    badgeKey,
    collapse,
  } = props;
  // const sidebarState = useSelector(({ sidebar }) => sidebar);

  return (
    <div className={mergeClassNames('contain', className)}>
      <button
        className={`flex justify-between items-center accordion text-current ${active ? 'active' : ''
        } ${isChild ? 'child' : ''}`}
        type="button"
        onClick={onToggle}
        style={{ backgroundColor: '#0072B1' }}
      >
        <span className="flex items-center">
          {icon ? <img src={icon} alt="" className="icon-imgMenu" style={{ maxWidth: 'none' }} /> : ''}
          {!collapse && header}
        </span>
        {/* eslint-disable-next-line no-nested-ternary */}
        {showIcon
          ? children
            ? active
              ? !collapse && <ChevronUp />
              : !collapse && <ChevronDown />
            : !collapse && <ChevronRight />
          : ''}
      </button>

      <div className={`panel ${active ? 'show' : ''}`}>{children}</div>
    </div>
    // </div>
  );
};

export const Accordion = (props) => {
  const { items, onUrlChange, collapse } = props;
  const [toggleState, setToggleState] = React.useState({});
  const handleToggle = (item) => {
    if (item.url) {
      onUrlChange(item.url);
    }
    const [parent] = item.id.split('-');
    setToggleState((state) => ({
      [parent]: parent === item.id ? !state[parent] : true,
      ...(item.id !== parent ? { [item.id]: true } : {}),
    }));
  };
  const newAccordionItem = (item, isChild = false) => (
    <AccordionItem
      icon={item.icon}
      collapse={collapse}
      key={item.id}
      header={item.title}
      showIcon={item.showIcon}
      isChild={isChild}
      onToggle={() => handleToggle(item)}
      active={toggleState[item.id]}
      badgeKey={item.badgeKey}
    >
      {item.children ? item.children.map((i) => newAccordionItem(i, true)) : ''}
    </AccordionItem>
  );

  return <div>{items.map((item) => newAccordionItem(item))}</div>;
};

Accordion.propTypes = {
  items: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.instanceOf(Item)])),
  onUrlChange: PropTypes.func,
  collapse: PropTypes.bool,
};

Accordion.defaultProps = {
  items: [],
  onUrlChange: () => { },
  collapse: true,
};

AccordionItem.propTypes = {
  active: PropTypes.bool,
  icon: PropTypes.string,
  onToggle: PropTypes.func,
  collapse: PropTypes.bool,
  className: PropTypes.string,
  isChild: PropTypes.bool,
  header: PropTypes.oneOfType([PropTypes.elementType, PropTypes.string, PropTypes.element]),
  showIcon: PropTypes.bool,
  badgeKey: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.elementType,
    PropTypes.string,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};

AccordionItem.defaultProps = {
  icon: '',
  active: false,
  onToggle: () => { },
  className: '',
  isChild: false,
  header: <div />,
  showIcon: false,
  collapse: true,
  children: '',
  badgeKey: '',
};
