// @flow strict
import { type Node as ReactNode, useEffect, useRef } from 'react';
import Box from '../Box';
import { useDefaultLabelContext } from '../contexts/DefaultLabelProvider';
import Flex from '../Flex';
import LegacyController from '../LegacyController';
import InternalDismissButton from '../shared/InternalDismissButton';

type Color = 'blue' | 'white' | 'darkGray';
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'flexible' | number;
type Role = 'dialog' | 'listbox' | 'menu' | 'tooltip';

type Props = {|
  accessibilityLabel?: string,
  accessibilityDismissButtonLabel?: string,
  anchor: ?HTMLElement,
  children?: ReactNode,
  color?: Color,
  onKeyDown?: ({| event: SyntheticKeyboardEvent<HTMLElement> |}) => void,
  id?: string,
  idealDirection?: 'up' | 'right' | 'down' | 'left' | 'forceDown',
  onDismiss: () => void,
  positionRelativeToAnchor?: boolean,
  role?: Role,
  shouldFocus?: boolean,
  showCaret?: boolean,
  showDismissButton?: boolean,
  size?: Size,
  __dangerouslySetMaxHeight?: '30vh',
|};

export default function InternalPopover({
  accessibilityLabel,
  accessibilityDismissButtonLabel,
  anchor,
  children,
  showDismissButton,
  onKeyDown,
  id,
  idealDirection,
  onDismiss,
  positionRelativeToAnchor = false,
  color = 'white',
  role,
  shouldFocus,
  showCaret,
  size = 'sm',
  __dangerouslySetMaxHeight,
}: Props): null | ReactNode {
  const { accessibilityDismissButtonLabel: accessibilityDismissButtonLabelDefault } =
    useDefaultLabelContext('Popover');

  const dismissButtonRef = useRef<null | HTMLAnchorElement | HTMLButtonElement>(null);

  useEffect(() => {
    dismissButtonRef.current?.focus();
  }, []);

  if (!anchor) {
    return null;
  }

  return (
    <LegacyController
      accessibilityLabel={accessibilityLabel}
      anchor={anchor}
      bgColor={color}
      border
      caret={showCaret}
      onKeyDown={onKeyDown}
      id={id}
      idealDirection={idealDirection}
      onDismiss={onDismiss}
      positionRelativeToAnchor={positionRelativeToAnchor}
      role={role}
      rounding={4}
      shouldFocus={shouldFocus}
      size={size === 'flexible' ? null : size}
      __dangerouslyIgnoreScrollBoundaryContainerSize={__dangerouslySetMaxHeight === '30vh'}
    >
      {showDismissButton ? (
        <Flex direction="column">
          <Box alignSelf="end" padding={2}>
            <InternalDismissButton
              accessibilityLabel={
                accessibilityDismissButtonLabel ?? accessibilityDismissButtonLabelDefault
              }
              onClick={onDismiss}
              size="xs"
              ref={dismissButtonRef}
              iconColor={color === 'white' ? 'darkGray' : 'white'}
            />
          </Box>
          {children}
        </Flex>
      ) : (
        children
      )}
    </LegacyController>
  );
}
