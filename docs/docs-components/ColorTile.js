// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Text, useColorScheme } from 'gestalt';
import tokens from 'gestalt-design-tokens/dist/json/variables.json';
import darkModeTokens from 'gestalt-design-tokens/dist/json/variables-dark.json';

type Props = {
  fullTokenName: string,
  description: string,
  number?: number,
  textColor?: 'dark' | 'light' | 'default' | 'inverse',
};

function ColorTile({ description, fullTokenName, number = 400, textColor }: Props): ReactNode {
  const isTransparent = fullTokenName === 'color-transparent';
  const newTextColor = textColor || (number > 400 ? 'light' : 'dark');
  const borderNeeded =
    fullTokenName?.includes('white') ||
    fullTokenName?.includes('black') ||
    fullTokenName?.includes('inverse') ||
    isTransparent;
  const { colorSchemeName } = useColorScheme();

  return (
    <Box
      dangerouslySetInlineStyle={{
        __style: { backgroundColor: `var(--${fullTokenName})` },
      }}
      height={50}
      width={300}
      display="flex"
      alignItems="center"
      justifyContent="between"
      paddingX={2}
      borderStyle={borderNeeded ? 'lg' : 'none'}
    >
      <Box marginEnd={3}>
        <Text weight="bold" color={newTextColor}>
          {description}
        </Text>
      </Box>
      <Text color={newTextColor}>
        {colorSchemeName === 'darkMode' && darkModeTokens[fullTokenName]
          ? darkModeTokens[fullTokenName]?.toUpperCase()
          : tokens[fullTokenName]?.toUpperCase()}
      </Text>
    </Box>
  );
}
export default ColorTile;
