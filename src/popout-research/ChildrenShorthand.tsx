import React, { forwardRef, ReactNode, Ref, HTMLAttributes } from 'react';
import { Icon } from 'antd';
import { IconProps } from 'antd/lib/icon';

export type ChildrenShorthandProps = {
  /**
   * Shorthand for primary content.
   */
  content?: ReactNode;
  /**
   * Shorthand for icon `type` or the full `<Icon>` props.
   */
  icon?: string | IconProps;
  /**
   * Position of the icon if `icon` is provided. Defaults to `"left"`.
   */
  iconPosition?: 'left' | 'right';
}

export type ChildrenShorthandState = {};

export const getChildrenShorthandProps = <Props extends ChildrenShorthandProps & { [key: string]: any }>(props: Props): {
  childrenShorthandProps: ChildrenShorthandProps;
  rest: Omit<Props, keyof ChildrenShorthandProps>;
} => {
  const {
    content,
    icon,
    iconPosition,
    ...rest
  } = props;

  const childrenShorthandProps: ChildrenShorthandProps = {
    content,
    icon,
    iconPosition,
  };

  return {
    childrenShorthandProps,
    rest,
  };
};

export const ChildrenShorthand = forwardRef(({
  content,
  icon = {},
  iconPosition = 'left',
  children, // Let's not pass this to the <span> element...
  ...rest
}: ChildrenShorthandProps & HTMLAttributes<HTMLSpanElement>, ref?: Ref<HTMLSpanElement>) => {
  const iconProps = typeof icon === 'string' ? { type: icon } : icon;

  return (
    <span ref={ref} {...rest}>
      {icon && iconPosition === 'left' && <Icon {...iconProps} />}
      {content}
      {icon && iconPosition === 'right' && <Icon {...iconProps} />}
    </span>
  )
});
