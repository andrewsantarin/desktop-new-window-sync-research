import React, { Key, ReactNode } from 'react';
import { Menu } from 'antd';
import { MenuProps } from 'antd/lib/menu';
import { MenuItemProps } from 'antd/lib/menu/MenuItem';
import { SubMenuProps } from 'antd/lib/menu/SubMenu';
import { ChildrenShorthand, ChildrenShorthandProps, getChildrenShorthandProps } from './ChildrenShorthand';

const reactNodeToMaybeString = (node: ReactNode): string | undefined => {
  if (typeof node === 'number') {
    return node.toString();
  }

  if (typeof node === 'string') {
    return node;
  }
}

export type MenuItemTemplate = MenuItemProps & ChildrenShorthandProps & {
  key?: Key;
  /**
   * Primary content. When this is specified, `content`, `icon`, `iconPosition` props are ignored.
   */
  children?: ReactNode;
};

export type SubMenuTemplate = SubMenuProps & ChildrenShorthandProps & {
  key?: Key;
  /**
   * Primary content. When this is specified, `content`, `icon`, `iconPosition` props are ignored.
   */
  title?: ReactNode;
  /**
   * Indicates explicitly that this template will generate a `<Menu.SubMenu>`.
   */
  submenu: 'submenu'; // Enforce this so that we have a defining characteristic which identifies a <SubMenu>.
  childrenTemplate?: (MenuItemTemplate | SubMenuTemplate)[];
};

export type MenuTemplate = MenuProps & {
  key?: Key;
  childrenTemplate?: (MenuItemTemplate | SubMenuTemplate)[];
};

export const createMenu = (menuTemplate: MenuTemplate | SubMenuTemplate) => {
  const { childrenTemplate = [], ...menuOrSubmenuProps } = menuTemplate;

  // Children can be either items or more menus within menus.
  const menuChildren = childrenTemplate.map((childTemplate, index) => {
    if ('submenu' in childTemplate) {
      return createMenu({
        ...childTemplate,
        key: childTemplate.key || index,
      });
    }

    const { childrenShorthandProps, rest } = getChildrenShorthandProps(childTemplate as MenuItemTemplate);
    const { key, children: itemChildrenProp, ...itemProps } = rest;
    const children = itemChildrenProp ? itemChildrenProp : <ChildrenShorthand {...childrenShorthandProps} />;
    const menuItemNode = (
      <Menu.Item key={key || index} {...itemProps as Partial<MenuItemProps>}>
        {children}
      </Menu.Item>
    );

    return menuItemNode;
  });

  // So, if the user explicitly declared that this is a "submenu", then we treat it as a <SubMenu>.
  if ('submenu' in menuTemplate) {
    const { childrenShorthandProps, rest } = getChildrenShorthandProps(menuOrSubmenuProps as SubMenuTemplate);
    const { childrenTemplate, submenu: _, title: submenuTitleProp, ...submenuProps } = rest;
    const title = submenuTitleProp ? submenuTitleProp : (
      <ChildrenShorthand
        {...childrenShorthandProps}
        // antd@3.x.x uses `<Menu.SubMenu>['title']` as a tooltip if it's text. Let's not lose that feature.
        title={reactNodeToMaybeString(childrenShorthandProps.content)}
      />
    );

    const submenu = (
      <Menu.SubMenu {...submenuProps} title={title}>
        {menuChildren}
      </Menu.SubMenu>
    );

    return submenu;
  }

  // Or else, convert it to a <Menu>.
  const menu = (
    <Menu {...menuOrSubmenuProps}>
      {menuChildren}
    </Menu>
  );

  return menu;
};
