// @flow strict
import { type Node as ReactNode } from 'react';
import { Flex, HelpButton } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Flex height="100%" justifyContent="center" alignItems="center">
      <HelpButton
        accessibilityLabel="Click to learn more about help button"
        accessibilityPopoverLabel="Expanded information about help button"
        text="Informational context that's displayed on click"
        idealDirection="right"
      />
    </Flex>
  );
}
