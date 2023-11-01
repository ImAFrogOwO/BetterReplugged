import WebpackModules from '../Webpack/Webpack';
import BDCompat from '../index';
import { docCreateElement } from '../Utils';

type Colors = {
  BRAND: string;
  DANGER: string;
};

const Colors: Colors = {
  BRAND: WebpackModules.findModuleByProps("colorBrand").colorBrand,
  DANGER: WebpackModules.findModuleByProps("colorDanger").colorDanger,
};


export function showConfirmationModal(
  title: string,
  content: string,
  settings: {
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
  } = {}
) {

  const ConfirmationModal = WebpackModules.getModule(
    (x) => x?.ConfirmModal,
    { searchExports: true }
  )?.ConfirmModal;

  const { openModal } = WebpackModules.findModuleByProps("openModal");

  const {
    confirmText = settings.confirmText || "Confirm",
    cancelText = settings.cancelText || "Cancel",
    onConfirm = settings.onConfirm || (() => { }),
    onCancel = settings.onCancel || (() => { }),
  } = settings;

  const moreReact: React.ReactNode[] = [];

  const whiteTextStyle = {
    color: "white",
  };

  const whiteTextContent = <div style={whiteTextStyle}>{content}</div>;

  moreReact.push(whiteTextContent);

  openModal((props) => (
    <ConfirmationModal
      header={title}
      confirmButtonColor={Colors.BRAND}
      confirmText={confirmText}
      cancelText={cancelText}
      onConfirm={onConfirm}
      onCancel={onCancel}
      {...props}
    >
      {moreReact}
    </ConfirmationModal>
  ));
}

export function alert(title: string, content: string) {
  showConfirmationModal(title, content, { cancelText: null });
}

export function showNotice_(title, content, options: any = {}) {
  const container = document.createElement("div");
  container.className = "custom-notification-container";

  const closeNotification = () => {
    const customNotification = container.querySelector(".custom-notification");
    if (customNotification) {
      customNotification.classList.add("close");
      setTimeout(() => {
        document.body.removeChild(container);
      }, 1000);
    }
  };

  const { timeout = 0, type = "default" } = options;
  const buttons = [
    { label: "Close", onClick: () => { } },
    ...options.buttons || []
  ];

  const buttonElements = buttons.map((button) => {
    const onClickHandler = () => {
      button.onClick();
      closeNotification();
    };

    return docCreateElement("button", { className: "confirm-button", onclick: onClickHandler }, [typeof button.label === "string" ? docCreateElement("span", { innerText: button.label }) : button.label]);
  });

  const titleComponent = docCreateElement("span", { className: "notification-title" }, [typeof title === "string" ? docCreateElement("span", { innerText: title }) : title]);

  const contentComponent = docCreateElement("div", { className: "content" }, [typeof content === "string" ? docCreateElement("span", { innerText: title }) : content]);

  const customNotification = docCreateElement("div", { className: `custom-notification ${type}` }, [
    docCreateElement("div", { className: "top-box" }, [titleComponent]),
    contentComponent,
    docCreateElement("div", { className: "bottom-box" }, buttonElements),
  ]);

  container.appendChild(customNotification);
  document.body.appendChild(container);

  if (timeout > 0) {
    setTimeout(closeNotification, timeout);
  }
}

export function showNotice(content, options) {
  return showNotice_("Notice", content, options);
}
