// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Flex, IconButton, SelectList, Text } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex gap={2} direction="column">
        <Flex gap={1} alignItems="center">
          <Text weight="bold" size="300">
            Date range
          </Text>
          <IconButton
            accessibilityLabel="Info"
            icon="info-circle"
            size="sm"
            tooltip={{
              text: 'Options available are based on your usage.',
              idealDirection: 'right',
            }}
          />
        </Flex>

        <SelectList
          id="selectlistexampleHiddenLabel"
          label="Date range"
          labelDisplay="hidden"
          onChange={() => {}}
          size="lg"
        >
          {[
            { label: 'Last 5 days', value: '5' },
            { label: 'Last week', value: '7' },
            { label: 'Last 30 days', value: '30' },
            { label: 'Last sixth months', value: '6m' },
            { label: 'Last year', value: '365' },
          ].map(({ label, value }) => (
            <SelectList.Option key={label} label={label} value={value} />
          ))}
        </SelectList>
      </Flex>
    </Box>
  );
}
