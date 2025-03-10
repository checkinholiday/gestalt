// @flow strict
import { type Node as ReactNode } from 'react';
import { Flex, Link, Text } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Flex height="100%" alignItems="center" justifyContent="center">
      <Text>
        For more information,{' '}
        <Text inline>
          <Link
            accessibilityLabel="visit https://pinterest.com"
            display="inline"
            href="https://pinterest.com"
          >
            click here
          </Link>
        </Text>
      </Text>
    </Flex>
  );
}
