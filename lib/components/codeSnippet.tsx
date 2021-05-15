import Highlight, { defaultProps } from 'prism-react-renderer';
import dracula from 'prism-react-renderer/themes/dracula';
import styled from 'styled-components';

const CodeContainer = styled.pre`
  text-align: left;
  padding: 1rem;
  padding-left: 1.2rem;
  overflow: auto;
`;

const Line = styled.div``;

export default function CodeSnippet({ children, className }) {
  const language = className.replace(/language-/, '');
  const actualCode = children.trim();
  return (
    <Highlight {...defaultProps} theme={dracula} code={actualCode} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <CodeContainer className={className} style={style}>
          {tokens.map((line, i) => (
            <Line key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </Line>
          ))}
        </CodeContainer>
      )}
    </Highlight>
  );
}
