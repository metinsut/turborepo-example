import { DefaultNamespace, KeyPrefix, Namespace, TFuncKey, Trans, TransProps } from 'react-i18next';
import { ReactElement, memo } from 'react';
import { unescape } from 'lodash';

const getUnescapeChildrenRef: React.LegacyRef<HTMLSpanElement> = (ref) => {
  if (!ref) {
    return undefined;
  }

  return Array.from(ref.childNodes).forEach((node: ChildNode) => {
    if (node.textContent) {
      // eslint-disable-next-line no-param-reassign
      node.textContent = unescape(node.textContent);
    }
  });
};

export function CatTransComponent<
  K extends TFuncKey<N, TKPrefix> extends infer A ? A : never,
  N extends Namespace = DefaultNamespace,
  TKPrefix extends KeyPrefix<N> = undefined,
  E extends React.HTMLProps<HTMLDivElement> = React.HTMLProps<HTMLDivElement>
>(props: TransProps<K, N, TKPrefix, E>): ReactElement {
  const { values } = props;
  const hasValue = Object.values(values).some(
    (value: any) => typeof value === 'string' && value?.includes('<')
  );

  return hasValue ? (
    <span ref={getUnescapeChildrenRef}>
      <Trans {...props} tOptions={{ interpolation: { escapeValue: true } }} />
    </span>
  ) : (
    <Trans {...props} />
  );
}

export const CatTrans = memo(CatTransComponent);
