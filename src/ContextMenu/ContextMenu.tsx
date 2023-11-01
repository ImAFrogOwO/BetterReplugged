/* eslint-disable no-use-before-define */
/* eslint-disable func-style */
import { InjectOwOr } from '../Globals';
import { React } from 'replugged/common';
import { ContextMenu } from "replugged/components"

const ContextMenuConst = {
  patch: (id, callback) => {
    return InjectOwOr.utils.addMenuItem(id, (data, menu) => {
      menu.props = { children: menu.children };
      callback(menu, data)
      menu.children = menu.props.children;
      delete menu.props;
    });
  },
  get buildItem() {
    return (props) => {
      const { type } = props;
      if (type === "separator") return <ContextMenu.MenuSeparator />;

      let Component = ContextMenu.MenuItem;
      const mapper = s => {
        if (s.type === "group") return buildGroup(s);
        return this.buildItem(s);
      };
      const buildGroup = function (group) {
        const items = group.items.map(mapper).filter(i => i);
        return <ContextMenu.MenuGroup>{items}</ContextMenu.MenuGroup>;
      };
      if (type === "submenu") {
        if (!props.children) props.children = (props.render || props.items).map(mapper).filter(i => i);
      }
      else if (type === "toggle" || type === "radio") {
        Component = type === "toggle" ? <ContextMenu.MenuCheckboxItem /> : <ContextMenu.MenuRadioItem />;
        if (props.active) props.checked = props.active;
      }
      else if (type === "control") {
        Component = <ContextMenu.MenuControlItem />;
      }
      if (!props.id) props.id = `${props.label.replace(/^[^a-z]+|[^\w-]+/gi, "-")}`;
      if (props.danger) props.color = "danger";
      if (props.onClick && !props.action) props.action = props.onClick;
      props.extended = true;

      if (type === "toggle") {
        const [active, doToggle] = React.useState(props.checked || false);
        const originalAction = props.action;
        props.checked = active;
        props.action = function (ev) {
          originalAction(ev);
          doToggle(!active);
        };
      }

      return <Component {...props} />;
    }
  }
};

export default ContextMenuConst;
