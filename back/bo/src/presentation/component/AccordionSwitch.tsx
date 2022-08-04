/* eslint-disable react/require-default-props */
/* eslint-disable react/prop-types */
import * as React from 'react';
import * as PropTypes from 'prop-types';

import '../../assets/css/accordion.css';
import { mergeClassNames } from '../../common/utils/ClassNameMerge';
import Toggle from './Toogle';

import "../../bion.css";

export class Item {
  id: string;

  title: string;

  children?: Item[];

  onClick?: Function;

  badgeKey?: string;
}

export const AccordionSwitchItem = (props) => {
  const {
    active,
    onToggle,
    header,
    children,
    className,
    isChild,
    size = "default",
    // checked,
    // offstyle = "btn-danger",
    // onstyle = "btn-success",
  } = props;
  // const displayStyle = checked ? onstyle : offstyle;
  return (
    <div className={mergeClassNames('my-2 showContainerAccordion', className)}>
      <div
        className={`flex justify-between items-center accordion text-current ${active ? 'active' : ''
        } ${isChild ? 'child' : ''}`}
      >
        <span className="flex items-center">
          {header}
        </span>
        <Toggle
          checked={active}
          size={size}
          disabled={false}
          onChange={onToggle}
          offstyle="disabled"
          onstyle="enabled"
        />
      </div>
      <div className={`panel ${active ? 'show' : ''}`}>{children}</div>
    </div>
  );
};

export const Accordion = (props) => {
  const { items, onUrlChange } = props;
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
    <AccordionSwitchItem
      key={item.id}
      header={item.title}
      isChild={isChild}
      onToggle={() => handleToggle(item)}
      active={toggleState[item.id]}
      badgeKey={item.badgeKey}
    >
      {item.children ? item.children.map((i) => newAccordionItem(i, true)) : ''}
    </AccordionSwitchItem>
  );

  return <div>{items.map((item) => newAccordionItem(item))}</div>;
};

Accordion.propTypes = {
  items: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.instanceOf(Item)])),
  onUrlChange: PropTypes.func,
};

Accordion.defaultProps = {
  items: [],
  onUrlChange: () => { },
};

AccordionSwitchItem.propTypes = {
  active: PropTypes.bool,
  onToggle: PropTypes.func,
  className: PropTypes.string,
  isChild: PropTypes.bool,
  header: PropTypes.oneOfType([PropTypes.elementType, PropTypes.string, PropTypes.element]),
  // eslint-disable-next-line react/no-unused-prop-types
  badgeKey: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.elementType,
    PropTypes.string,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};

AccordionSwitchItem.defaultProps = {
  active: false,
  onToggle: () => { },
  className: '',
  isChild: false,
  header: <div />,
  children: '',
};
