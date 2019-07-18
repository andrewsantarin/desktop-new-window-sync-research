import React, { FunctionComponent } from 'react';
import { Button, Dropdown, Icon } from 'antd';
import { DropDownProps } from 'antd/lib/dropdown/dropdown';
import { MenuTemplate, createMenu } from './create-menu';

export type DropdownMenuProps = Partial<Pick<DropDownProps, 'overlay'>> & {
  label?: string;
  menuTemplate?: MenuTemplate;
};

export const DropdownMenu: FunctionComponent<DropdownMenuProps> = ({ label = 'Button', menuTemplate, overlay }) => {
  let dropdownMenuOverlay: DropDownProps['overlay'];
  if (menuTemplate) {
    dropdownMenuOverlay = createMenu(menuTemplate);
  } else if (overlay) {
    dropdownMenuOverlay = overlay;
  }
  return (
    <Dropdown
      trigger={['click']}
      overlay={dropdownMenuOverlay}
    >
      <Button>
        {label}
        {' '}
        <Icon type="down" />
      </Button>
    </Dropdown>
  );
}
