import React from 'react';
import { Button, Dropdown, Icon, Menu } from 'antd';

export const ThisMenuMustWork = () => {
  return (
    <Dropdown
      trigger={['click']}
      overlay={(
        <Menu>
          <Menu.Item key="1">
            <Icon type="user" />
            1st menu item
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="user" />
            2nd menu item
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="user" />
            3rd item
          </Menu.Item>
        </Menu>
      )}
    >
      <Button>
        Menu
        {' '}
        <Icon type="down" />
      </Button>
    </Dropdown>
  );
}
