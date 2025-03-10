// @flow strict
import 'highlight.js/styles/a11y-light.css';
import { type Node as ReactNode } from 'react';
import { MDXProvider } from '@mdx-js/react';
import Image from 'next/image';
import { Box, ButtonLink, Datapoint, Flex, Icon, Link, List, Text } from 'gestalt';
import { TOKEN_COLOR_BACKGROUND_SECONDARY_BASE } from 'gestalt-design-tokens';
import { DOCS_COPY_MAX_WIDTH_PX } from './consts';
import Highlighter from './highlight';
import IllustrationCard from './IllustrationCard';
import InternalOnlyIconButton from './InternalOnlyIconButton';
import MainSection from './MainSection';
import Page from './Page';
import PageHeader from './PageHeader';

type Props = {
  children: ReactNode,
  meta: {
    title: string,
    badge: 'pilot' | 'deprecated',
    fullwidth?: boolean,
    description: string,
    component: boolean,
  },
  pageSourceUrl?: string,
  platform: 'android' | 'ios' | 'web',
};

const isExternal: (string) => 'blank' | void = (href) => {
  if (href.startsWith('https://')) return 'blank';
  return undefined;
};

const components = {
  a: ({
    children,
    href,
  }: {
    href: string,
    children: string | null,
    display: 'inline' | 'inlineBlock' | 'block',
  }) => (
    <Link
      href={href}
      target={isExternal(href)}
      externalLinkIcon={isExternal(href) === 'blank' ? 'default' : 'none'}
      display="inline"
    >
      {children}
    </Link>
  ),
  // $FlowFixMe[missing-local-annot]
  ul: (props) => {
    const filtered = Object.values(props.children).filter((a) => a !== '\n');
    return (
      <Box maxWidth={DOCS_COPY_MAX_WIDTH_PX}>
        <List>
          {filtered.map((a, index) => (
            <List.Item
              key={JSON.stringify(a?.props.child ?? index)}
              text={<Text>{a?.props.children}</Text>}
            />
          ))}
        </List>
      </Box>
    );
  },
  // $FlowFixMe[missing-local-annot]
  ol: (props) => {
    const filtered = Object.values(props.children).filter((a) => a !== '\n');
    return (
      <Box maxWidth={DOCS_COPY_MAX_WIDTH_PX}>
        <List type="ordered">
          {filtered.map((a, index) => (
            <List.Item
              key={JSON.stringify(a?.props.child ?? index)}
              text={<Text>{a?.props.children}</Text>}
            />
          ))}
        </List>
      </Box>
    );
  },
  // $FlowFixMe[missing-local-annot]
  small: (props) => <Text size="100">{props.children}</Text>,
  pre: (props: {
    children: {
      props: { className: $ReadOnlyArray<string>, children: string | null },
    },
  }) => (
    <Highlighter classNames={props.children.props.className}>
      {props.children.props.children}
    </Highlighter>
  ),
  figure: ({ src, caption }: { src: string, caption?: string }) => (
    <Flex wrap justifyContent="center">
      <Box as="figure" width={400}>
        <Image
          src={src}
          alt="image"
          width="100%"
          height="100%"
          layout="responsive"
          objectFit="contain"
        />
        <Text size="100" align="center">
          <Box as="figcaption" marginTop={3}>
            {caption || ''}
          </Box>
        </Text>
      </Box>
    </Flex>
  ),
  // $FlowFixMe[missing-local-annot]
  h2: (props) => (
    <Box marginTop={12} marginBottom={0}>
      <MainSection name={props.children} />
    </Box>
  ),
  hr: () => (
    <Box marginTop={8} marginBottom={8}>
      <hr />
    </Box>
  ),
  // $FlowFixMe[missing-local-annot]
  p: (props) => <p style={{ maxWidth: DOCS_COPY_MAX_WIDTH_PX }}> {props.children} </p>,
  ActionButton: ({ children, href }: { href: string, children: string | null }) => (
    <ButtonLink
      href={href}
      target="blank"
      text={children || ''}
      color="gray"
      accessibilityLabel=""
    />
  ),
  Datapoint: ({
    size,
    title,
    value,
    trendValue,
    trendSentiment,
    trendAccessibilityLabel,
  }: {
    size?: 'lg' | 'md',
    title: string,
    value: string,
    trendValue: number,
    trendSentiment?: 'bad' | 'good' | 'neutral',
    trendAccessibilityLabel: string,
  }) => (
    <Datapoint
      size={size}
      title={title}
      value={value}
      trend={{ value: trendValue, accessibilityLabel: trendAccessibilityLabel }}
      trendSentiment={trendSentiment}
    />
  ),
  PrivateLink: ({
    children,
    href,
    display,
  }: {
    href: string,
    children: string | null,
    display: 'inline' | 'inlineBlock' | 'block',
  }) => (
    <Text inline>
      <Link target="blank" href={href} display={display || 'block'}>
        <Flex alignItems="baseline">
          {children}
          <InternalOnlyIconButton size="xs" />
        </Flex>
      </Link>
    </Text>
  ),
  Hint: ({ children }: { children: string | null }) => (
    <div
      className="md-hint"
      style={{
        padding: '1rem',
        backgroundColor: TOKEN_COLOR_BACKGROUND_SECONDARY_BASE,
      }}
    >
      <Flex
        gap={{
          row: 2,
          column: 0,
        }}
        alignItems="center"
        width="full"
      >
        <Icon accessibilityLabel="Hint" icon="lightbulb" size={16} />
        <Text>{children}</Text>
      </Flex>
    </div>
  ),
  h3: ({ children }: { children: string }) => (
    <Box>
      <MainSection.Subsection title={children} marginBottom="compact" />
    </Box>
  ),
  img: (props: { src: string }) => (
    <Image
      src={props.src}
      alt="image"
      width="100%"
      height="100%"
      layout="responsive"
      objectFit="contain"
    />
  ),
  IllustrationCard,
  // $FlowFixMe[missing-local-annot]
  Card: (props) => <MainSection.Card {...props} description={undefined} />,
  Code: (props: { marginBottom: 'default' | 'none', children: string | null }) => {
    const newProps = { ...props };
    newProps.children = null;
    // may not need to this in the future
    return (
      <MainSection.Card
        {...newProps}
        defaultCode={props.children || ''}
        marginBottom={props.marginBottom || 'none'}
      />
    );
  },
  Group: ({ children }: { children: ReactNode }) => <Box marginBottom={12}>{children}</Box>,
  Do: (props: { children?: ReactNode, title: string }) => (
    <MainSection.Card type="do" title={props.title || 'Do'} marginBottom="none">
      {props.children}
    </MainSection.Card>
  ),
  Dont: (props: { children?: ReactNode, title: string }) => (
    <MainSection.Card type="don't" title={props.title || "Don't"} marginBottom="none">
      {props.children}
    </MainSection.Card>
  ),
  TwoCol: ({ children }: { children: ReactNode }) => (
    <MainSection.Subsection columns={2}>{children}</MainSection.Subsection>
  ),
  ImgHero: ({
    src,
    alt,
    width,
    height,
  }: {
    src: string,
    width: number,
    height: number,
    alt: string,
  }) => (
    <div width="100%" style={{ aspectRatio: `${width}/${height}` }}>
      <Image src={src} alt={alt} width={width} height={height} fill />
    </div>
  ),
  ImgContainer: ({
    src,
    caption,
    alt,
    width,
    height,
    padding,
    color,
  }: {
    src: string,
    caption?: string,
    alt?: string,
    width?: number,
    height?: number,
    padding?: 'standard' | 'none',
    color?: string,
  }) => {
    const layout = width || height ? 'fixed' : 'fill';

    const colorStyle = {
      __style: {
        backgroundColor: color ? `var(--color-${color})` : 'white',
      },
    };

    const defaultPadding = padding || 'none';

    return (
      <Box>
        <Box
          padding={defaultPadding === 'standard' ? 8 : 0}
          rounding={2}
          borderStyle="sm"
          height="250px"
          dangerouslySetInlineStyle={colorStyle}
        >
          <Box
            position="relative"
            width="100%"
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Image
              src={src}
              alt={alt}
              width={layout === 'fill' ? undefined : width || '100%'}
              height={layout === 'fill' ? undefined : height || '100%'}
              layout={layout}
              objectFit="contain"
            />
          </Box>
        </Box>
        {caption && (
          <Text size="300" align="start">
            <Box as="figcaption" marginTop={3}>
              {caption}
            </Box>
          </Text>
        )}
      </Box>
    );
  },
  ThreeCol: ({
    children,
    spacing = 'default',
  }: {
    children: ReactNode,
    spacing?: 'default' | 'expanded',
  }) => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, .33fr))',
        gap: spacing === 'default' ? '2px' : '8px',
      }}
    >
      {children}
    </div>
  ),
};

export default function MarkdownPage({
  children,
  meta,
  pageSourceUrl,
  platform,
}: Props): ReactNode {
  const maxWidth = meta?.fullwidth ? 'none' : `${DOCS_COPY_MAX_WIDTH_PX}px`;

  return (
    <MDXProvider components={components}>
      <Page title={meta.title} pageSourceUrl={pageSourceUrl}>
        <PageHeader
          name={meta.title}
          badge={meta.badge}
          description={meta.description}
          margin="none"
          platform={platform}
          type={meta.component ? 'component' : 'guidelines'}
        />
        <Text>
          <article
            className="Markdown mdx-page"
            style={{ maxWidth, marginTop: meta.description ? '0px' : '-32px' }}
          >
            {children}
          </article>
        </Text>
      </Page>
    </MDXProvider>
  );
}
