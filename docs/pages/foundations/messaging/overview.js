// @flow strict
import React, { type Node as ReactNode } from 'react';
import { BannerSlim, Box, Image } from 'gestalt';
import MainSection from '../../../docs-components/MainSection';
import Page from '../../../docs-components/Page';
import PageHeader from '../../../docs-components/PageHeader';

export default function GuidelinesPage(): ReactNode {
  return (
    <Page title="Messaging overview">
      <PageHeader
        name="Messaging overview"
        type="guidelines"
        description={`Messaging patterns detail how we communicate errors, warnings, successes, recommendations and general information on system status. Messages can be either generated immediately after a user performs an action, or can be generated by the system automatically in order to help someone understand and navigate a product.

A message is different from a status indicator in that it includes a more detailed written explanation.`}
      />
      <MainSection name="Principles">
        <MainSection.Subsection
          title="Timely"
          description={`
Alerts, confirmations and information should be surfaced at the time that they are needed.
`}
        />
        <MainSection.Subsection
          title="Brief"
          description={`
Messages should be brief and should not distract a user or get in the way of
completing a task. They shouldn’t appear too often in the experience.
`}
        />
        <MainSection.Subsection
          title="Relevant"
          description={`
The information or alerts provided should be relevant to the surface a user is currently working on, and be placed near the sections they relate to.`}
        />
      </MainSection>
      <MainSection name="Use cases">
        <MainSection.Subsection
          description={`
Below is a brief user journey of how messages work together along with other components and patterns based on practical use cases from Pinterest products.
`}
        />
        <MainSection.Subsection
          title="Meet Claire"
          description="Claire Ọyáwálé is a Pinner who loves architecture, fine art and fashion. She also has a Pinterest Business account through her employer—a high-end shoe brand. Let's take a look at how she might typically interact with Messaging in the Pinterest product."
        />
      </MainSection>
      <Box width="100%" marginBottom={8} marginTop={-7}>
        <MainSection.Subsection
          title="Alert indicator"
          description="Claire opens Pinterest on her phone to see a red dot on her Avatar.

This isn’t a highly urgent issue, so we don’t display a prominent modal, banner or other message component just yet; just a little nudge that tells her she needs to look at her profile."
        />
        <Box maxWidth={375} maxHeight={780} marginBottom={4} marginTop={2}>
          <Image
            alt="Mobile phone screen of a Pin close-up. There is a small red dot next to the user's profile in the bottom nav bar."
            naturalHeight={1680}
            naturalWidth={1056}
            src="https://i.pinimg.com/originals/72/52/51/725251998a88d92a653cc3bcd08ca2ee.png"
          />
        </Box>
        <BannerSlim
          type="infoBare"
          iconAccessibilityLabel="Information"
          message="Note: Alert indicator is not currently a Gestalt component, but a Variant in other components like Tabs."
        />
      </Box>
      <Box width="100%" marginBottom={12} marginTop={-7}>
        <MainSection.Subsection
          title="Warning bannercallout"
          description="Tapping on her profile leads her to a warning banner about needing to set a password for better security. Being that it’s prominent and at the top of the page, she figures it’s important, so she taps on the primary banner button to update her password."
        />

        <Box maxWidth={375} maxHeight={780} marginBottom={12} marginTop={2}>
          <Image
            alt="Mobile phone screen of a Pinner profile with a BannerCallout Banner warning the user of an issue that needs to be fixed."
            naturalHeight={1680}
            naturalWidth={808}
            src="https://i.pinimg.com/originals/f5/15/d4/f515d4e36832a2637d2d5a53b32e2deb.png"
          />
        </Box>
      </Box>
      <Box width="100%" marginBottom={12} marginTop={-7}>
        <MainSection.Subsection
          title="Success toast"
          description="After setting her new password, Claire gets a short and brief success toast just to verify that the changes went through. She is now ready to start pinning!"
        />

        <Box maxWidth={375} maxHeight={780} marginBottom={4} marginTop={2}>
          <Image
            alt="Mobile phone screen with a success toast message."
            naturalHeight={1680}
            naturalWidth={808}
            src="https://i.pinimg.com/originals/86/1c/4d/861c4dba8f3280333eb00f1fc712e891.png"
          />
        </Box>
      </Box>

      <Box width="100%" marginBottom={12} marginTop={-4}>
        <MainSection.Subsection
          title="Error modal"
          description="As she Pins, Claire accidentally taps a link that leads to harmful content. Luckily, we can stop this by throwing an ModalAlert letting her know why she can’t continue.

Claire goes back to find some other pins, then decides it’s time to get back to work."
        />

        <Box maxWidth={375} maxHeight={780} marginTop={2}>
          <Image
            alt="Mobile phone screen with an error modal message."
            naturalHeight={1680}
            naturalWidth={808}
            src="https://i.pinimg.com/originals/83/f9/a1/83f9a155d2602483eea851350c755a6e.png"
          />
        </Box>
      </Box>

      <Box width="100%" marginBottom={8} marginTop={-7}>
        <MainSection.Subsection
          title="Recommendation banner"
          description="Claire goes to her desktop to resume ads work for her employer, Dressy. She opens her Pinterest Business account on her desktop and navigates to the ads page. A recommendation message is placed right beneath the ad campaign that it refers to so she knows which ad campaign could use improvements.

The recommendation is dismissible since it’s not required and may get in the way of glancing at all the other campaigns."
        />
        <Box maxWidth={960} maxHeight={579}>
          <Image
            alt="Desktop screen with a recommendation inside of a data table showing ad campaigns."
            naturalHeight={1896}
            naturalWidth={3080}
            src="https://i.pinimg.com/originals/65/e4/30/65e43065fa1f96bd25bbcfd9e5a2151e.png"
          />
        </Box>
      </Box>

      <Box width="100%" marginBottom={8} marginTop={-7}>
        <MainSection.Subsection
          title="Confirmation modal"
          description="Claire decides to skip the recommendation for a moment and create an Idea Pin that needs more attention for an Ad campaign. As she organizes and deletes images and videos in her pins, she gets a confirmation modal confirming that she wants to delete an image, as this is irreversible. Being that this may happen multiple times in her edit flows, the option to not show again also appears. *For destructive, irreversible tasks that are not part of creating and editing, we don’t provide a “don’t show again” option.*"
        />

        <Box maxWidth={960} maxHeight={579}>
          <Image
            alt="Desktop screen with a message confirming an action"
            naturalHeight={1896}
            naturalWidth={3080}
            src="https://i.pinimg.com/originals/ad/c7/7f/adc77f21e86c2c8c1780b572c35e0c7a.png"
          />
        </Box>
      </Box>

      <Box width="100%" marginBottom={8} smMarginBottom={4} marginTop={-7}>
        <MainSection.Subsection
          title="Success banner vs Toast"
          description="Claire completes the Idea Pin and turns it into an ad campaign. After publishing it, she gets a Success Banner at the top of the page instead of a Toast since the messaging requires more wording for clarity. Luckily, the banner is still dismissible."
        />

        <Box maxWidth={960} maxHeight={579}>
          <Image
            alt="Desktop screen showing a success banner."
            naturalHeight={1896}
            naturalWidth={3080}
            src="https://i.pinimg.com/originals/20/3f/14/203f14d057e9b3cae2ff02b4d32c5a35.png"
          />
        </Box>
      </Box>

      <MainSection.Subsection
        title="Time to relax"
        description="After a clear and easy messaging session, it’s time for Claire to relax and call it a day. Have fun Claire!"
      />
    </Page>
  );
}
