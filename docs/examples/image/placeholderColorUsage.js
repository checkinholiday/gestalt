// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Column, Image } from 'gestalt';
import { TOKEN_COLOR_BACKGROUND_SHOPPING } from 'gestalt-design-tokens';

export default function Example(): ReactNode {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      {['rgb(111, 91, 77)', 'black', TOKEN_COLOR_BACKGROUND_SHOPPING].map((color) => (
        <Column span={3} key={color}>
          <Image
            alt="example.com"
            color={color}
            naturalHeight={1}
            naturalWidth={1}
            src="https://d3cy9zhslanhfa.cloudfront.net/media/BBEEEEC7-E954-4223-B5A061E37D0C03E2/CE43CF95-DE36-465B-956EFB21C9CC9C04/webimage-0311D236-89DC-4404-9D9B1452C865159C.png"
          />
        </Column>
      ))}
    </Box>
  );
}
