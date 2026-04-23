import type { CSSProperties, ReactNode } from "react";
import Icon, { ICON_NAMES, type IconName } from "./Icon";

interface Props {
  text?: string | null;
  style?: CSSProperties;
  as?: "h1" | "h2" | "p" | "span" | "div";
  iconScale?: number;
}

const ICON_SET = new Set<string>(ICON_NAMES);

export default function RichText({ text, style, as = "span", iconScale = 1, ...rest }: Props & { [k: string]: unknown }) {
  const Tag = as;
  const nodes = parseRich(text ?? "", iconScale);
  return <Tag style={style} {...rest}>{nodes}</Tag>;
}

function parseRich(input: string, iconScale: number): ReactNode {
  const parts: ReactNode[] = [];
  const re = /\{icon:([a-z-]+)\}/gi;
  let last = 0;
  let match: RegExpExecArray | null;
  let idx = 0;
  while ((match = re.exec(input)) !== null) {
    if (match.index > last) parts.push(input.slice(last, match.index));
    const name = match[1].toLowerCase();
    if (ICON_SET.has(name)) {
      parts.push(
        <Icon
          key={`icon-${idx++}`}
          name={name as IconName}
          size={`${iconScale}em`}
          style={{ margin: "0 0.12em", verticalAlign: "-0.14em" }}
        />,
      );
    } else {
      parts.push(match[0]);
    }
    last = match.index + match[0].length;
  }
  if (last < input.length) parts.push(input.slice(last));
  return parts;
}
