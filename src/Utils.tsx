export function docCreateElement(tag: string, props: Record<string, any> = {}, childNodes: Node[] = [], attrs: Record<string, string> = {}) {
  const element = document.createElement(tag);

  for (const [key, value] of Object.entries<string | any>(props)) {
    element[key] = value;
  }

  for (const node of childNodes) {
    if (node instanceof Node) {
      element.appendChild(node);
    }
  }

  for (const [key, value] of Object.entries<string>(attrs)) {
    element.setAttribute(key, value);
  }

  return element;
}
