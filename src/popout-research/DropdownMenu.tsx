import React, { FunctionComponent, ComponentType } from 'react';
import { Dropdown } from 'antd';
import { DropDownProps } from 'antd/lib/dropdown/dropdown';
import { MenuTemplate, createMenu } from './createMenu';
import { ChildrenShorthandProps, getChildrenShorthandProps, ChildrenShorthand } from './ChildrenShorthand';

export type DropdownMenuProps = Partial<Pick<DropDownProps, 'overlay'>> & Omit<DropDownProps, 'overlay'> & ChildrenShorthandProps & {
  as?: any;
  menuTemplate?: MenuTemplate;
  contentWrapper?: ComponentType<any>;
};

export const DropdownMenu: FunctionComponent<DropdownMenuProps> = ({ contentWrapper: ContentWrapper, children, menuTemplate, overlay, ...rest }) => {
  const dropdownMenuOverlay: DropDownProps['overlay'] = !!menuTemplate ? createMenu(menuTemplate) : overlay;
  const { childrenShorthandProps, rest: otherProps } = getChildrenShorthandProps(rest);
  const dropdownMenuChildren = !!children || typeof children === 'number' ? children : (
    <ChildrenShorthand {...childrenShorthandProps} />
  );
  const triggerElement = ContentWrapper && !children && typeof children !== 'number'? (
    <ContentWrapper>{dropdownMenuChildren}</ContentWrapper>
  ) : dropdownMenuChildren;

  return (
    <Dropdown
      trigger={['click']}
      overlay={dropdownMenuOverlay}
      {...otherProps}
    >
      {triggerElement}
    </Dropdown>
  );
}
