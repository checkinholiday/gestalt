// @flow strict
import {
  type AbstractComponent,
  forwardRef,
  Fragment,
  type Node as ReactNode,
  useImperativeHandle,
  useRef,
} from 'react';
import classnames from 'classnames';
import NewTabAccessibilityLabel from './accessibility/NewTabAccessibilityLabel';
import styles from './Button.css';
import { useColorScheme } from './contexts/ColorSchemeProvider';
import Flex from './Flex';
import focusStyles from './Focus.css';
import Icon, { type IconColor } from './Icon';
import icons from './icons/index';
import touchableStyles from './TapArea.css';
import Text from './Text';
import useFocusVisible from './useFocusVisible';
import useTapFeedback from './useTapFeedback';

const DEFAULT_TEXT_COLORS = {
  blue: 'inverse',
  gray: 'default',
  red: 'inverse',
  transparent: 'default',
  semiTransparentWhite: 'default',
  transparentWhiteText: 'inverse',
  white: 'default',
};

const SIZE_NAME_TO_PIXEL = {
  sm: 10,
  md: 12,
  lg: 12,
};

type Target = null | 'self' | 'blank';

type Props = {
  /**
   * Specifies the `id` of an associated element (or elements) whose contents or visibility are controlled by Button so that screen reader users can identify the relationship between elements. See the [Accessibility guidelines](https://gestalt.pinterest.systems/web/button#ARIA-attributes) for details on proper usage.
   */
  accessibilityControls?: string,
  /**
   * Indicates that Button hides or exposes collapsible components and expose whether they are currently expanded or collapsed. See the [Accessibility guidelines](https://gestalt.pinterest.systems/web/button#ARIA-attributes) for details on proper usage.
   */
  accessibilityExpanded?: boolean,
  /**
   * Indicates that a component controls the appearance of interactive popup elements, such as menu or dialog. See the [Accessibility guidelines](https://gestalt.pinterest.systems/web/button#ARIA-attributes) for details on proper usage.
   */
  accessibilityHaspopup?: boolean,
  /**
   * Label for screen readers to announce Button. See the [Accessibility guidelines](https://gestalt.pinterest.systems/web/button#ARIA-attributes) for details on proper usage.
   */
  accessibilityLabel?: string,
  /**
   * The background color of Button.
   * See the [color on white backgrounds variant](https://gestalt.pinterest.systems/web/button#Color-on-white-backgrounds) and the [color on color/image backgrounds variant](https://gestalt.pinterest.systems/web/button#Color-on-colorimage-backgrounds)
   */
  color?:
    | 'gray'
    | 'red'
    | 'blue'
    | 'transparent'
    | 'semiTransparentWhite'
    | 'transparentWhiteText'
    | 'white',
  /**
   * Available for testing purposes, if needed. Consider [better queries](https://testing-library.com/docs/queries/about/#priority) before using this prop.
   */
  dataTestId?: string,
  /**
   * Indicates if Button is disabled. Disabled Buttons are inactive and cannot be interacted with. See the [state variant](https://gestalt.pinterest.systems/web/button#State) for details on proper usage.
   */
  disabled?: boolean,
  /**
   * Default Buttons are sized by the text within the Button whereas full-width Buttons expand to the full width of their container. See the [width variant](https://gestalt.pinterest.systems/web/button#Size) variant to learn more.
   */
  fullWidth?: boolean,
  /**
   * An icon displayed after the text to help clarify the usage of Button. See the [icon variant](https://gestalt.pinterest.systems/web/button#Icons) to learn more.
   */
  iconEnd?: $Keys<typeof icons>,
  /**
   * The name attribute specifies the name of the button element. The name attribute is used to reference form-data after the form has been submitted and for [testing](https://testing-library.com/docs/queries/about/#priority).
   */
  name?: string,
  /**
   * Callback invoked when the user clicks (press and release) on Button with the mouse or keyboard.
   */
  onClick?: ({
    event: SyntheticMouseEvent<HTMLButtonElement> | SyntheticKeyboardEvent<HTMLButtonElement>,
  }) => void,
  /**
   * Toggles between binary states: on/off, selected/unselected, open/closed. See the [selected](#Selected-state) variant to learn more. See the [state variant](https://gestalt.pinterest.systems/web/button#State) for details on proper usage.
   */
  selected?: boolean,
  /**
   * sm: 32px, md: 40px, lg: 48px
   *
   * See the [size variant](https://gestalt.pinterest.systems/web/button#Size) variant to learn more.
   */
  size?: 'sm' | 'md' | 'lg',
  /**
   * Use "-1" to remove Button from keyboard navigation. See the [Accessibility guidelines](https://gestalt.pinterest.systems/foundations/accessibility) to learn more.
   */
  tabIndex?: -1 | 0,
  /**
   * Text to render inside the Button to convey the function and purpose of the Button.
   */
  text: string,
  /**
   * Use "submit" if Button is used within or associated with a form.
   */
  type?: 'button' | 'submit',
};

function InternalButtonContent({
  target,
  text,
  textColor,
  icon,
  size,
}: {
  target?: Target,
  text: ReactNode,
  textColor: IconColor,
  icon?: $Keys<typeof icons>,
  size: string,
}): ReactNode {
  return (
    <Fragment>
      <Flex alignItems="center" gap={{ row: 2, column: 0 }} justifyContent="center">
        {text}
        {icon ? (
          <Icon
            accessibilityLabel=""
            color={textColor}
            icon={icon}
            size={SIZE_NAME_TO_PIXEL[size]}
          />
        ) : null}
      </Flex>
      <NewTabAccessibilityLabel target={target} />
    </Fragment>
  );
}

/**
 * [Buttons](https://gestalt.pinterest.systems/web/button) allow users to perform actions within a surface. They can be used alone for immediate action, or as a trigger for another component, like [Dropdown](https://gestalt.pinterest.systems/web/dropdown) or [Popover](https://gestalt.pinterest.systems/web/popover).
 *
 * ![Button light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Button.spec.mjs-snapshots/Button-chromium-darwin.png)
 * ![Button dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Button-dark.spec.mjs-snapshots/Button-dark-chromium-darwin.png)
 *
 */
const ButtonWithForwardRef: AbstractComponent<Props, HTMLButtonElement> = forwardRef<
  Props,
  HTMLButtonElement,
>(function Button(
  {
    accessibilityLabel,
    color = 'gray',
    dataTestId,
    disabled = false,
    fullWidth = false,
    iconEnd,
    onClick,
    tabIndex = 0,
    selected = false,
    size = 'md',
    text,
    type,
    name,
    accessibilityControls,
    accessibilityExpanded,
    accessibilityHaspopup,
  }: Props,
  ref,
): ReactNode {
  const innerRef = useRef<null | HTMLButtonElement>(null);

  // When using both forwardRef and innerRef, React.useimperativehandle() allows a parent component
  // that renders <Button ref={inputRef} /> to call inputRef.current.focus()
  useImperativeHandle(ref, () => innerRef.current);

  const {
    compressStyle,
    isTapping,
    handleBlur,
    handleMouseDown,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchCancel,
    handleTouchEnd,
  } = useTapFeedback({
    height: innerRef?.current?.clientHeight,
    width: innerRef?.current?.clientWidth,
  });

  const { colorSchemeName } = useColorScheme();
  // We need to make a few exceptions for accessibility reasons in darkMode for red buttons
  const isDarkMode = colorSchemeName === 'darkMode';
  const isDarkModeRed = isDarkMode && color === 'red';

  const colorClass = color === 'transparentWhiteText' ? 'transparent' : color;

  const { isFocusVisible } = useFocusVisible();

  const sharedTypeClasses = classnames(styles.button, focusStyles.hideOutline, {
    [styles.inline]: !fullWidth,
    [styles.block]: fullWidth,
    [focusStyles.accessibilityOutline]: !disabled && isFocusVisible,
  });

  const baseTypeClasses = classnames(sharedTypeClasses, touchableStyles.tapTransition, {
    [styles.sm]: size === 'sm',
    [styles.md]: size === 'md',
    [styles.lg]: size === 'lg',
    // $FlowFixMe[invalid-computed-prop]
    [styles[colorClass]]: !disabled && !selected,
    [styles.selected]: !disabled && selected,
    [styles.disabled]: disabled,
    [styles.enabled]: !disabled,
    [touchableStyles.tapCompress]: !disabled && isTapping,
  });

  const parentButtonClasses = classnames(sharedTypeClasses, styles.parentButton);

  const childrenDivClasses = classnames(baseTypeClasses, styles.childrenDiv);

  const textColor =
    (disabled && 'subtle') ||
    (selected && 'inverse') ||
    (isDarkModeRed && 'default') ||
    DEFAULT_TEXT_COLORS[color];

  const buttonText = (
    <Text
      align="center"
      color={textColor}
      overflow="normal"
      weight="bold"
      size={size === 'sm' ? '200' : '300'}
    >
      {text}
    </Text>
  );

  if (type === 'submit') {
    return (
      <button
        aria-label={accessibilityLabel}
        className={baseTypeClasses}
        data-test-id={dataTestId}
        disabled={disabled}
        name={name}
        onBlur={handleBlur}
        onClick={(event) => onClick?.({ event })}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchCancel={handleTouchCancel}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchStart}
        ref={innerRef}
        style={compressStyle || undefined}
        tabIndex={disabled ? null : tabIndex}
        type="submit"
      >
        <InternalButtonContent text={buttonText} textColor={textColor} icon={iconEnd} size={size} />
      </button>
    );
  }

  return (
    <button
      aria-controls={accessibilityControls}
      aria-expanded={accessibilityExpanded}
      aria-haspopup={accessibilityHaspopup}
      aria-label={accessibilityLabel}
      className={parentButtonClasses}
      data-test-id={dataTestId}
      disabled={disabled}
      name={name}
      onBlur={handleBlur}
      onClick={(event) => onClick?.({ event })}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchCancel={handleTouchCancel}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchStart}
      ref={innerRef}
      tabIndex={disabled ? null : tabIndex}
      type="button"
    >
      <div className={childrenDivClasses} style={compressStyle || undefined}>
        {iconEnd ? (
          <InternalButtonContent
            text={buttonText}
            textColor={textColor}
            icon={iconEnd}
            size={size}
          />
        ) : (
          buttonText
        )}
      </div>
    </button>
  );
});

ButtonWithForwardRef.displayName = 'Button';

export default ButtonWithForwardRef;
