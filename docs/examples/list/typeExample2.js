// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, List, Text } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <List label={<Text weight="bold">Ordered list</Text>} type="ordered">
        <List.Item text="List item text" />
        <List.Item text="List item text" />
        <List.Item text="List item text" />
        <List.Item text="List item text" />
      </List>
    </Box>
  );
}
