/* eslint-disable @typescript-eslint/explicit-function-return-type */

const DOM = {
  addStyle(id, css) {
    id = this.sanitizeId(id);
    const brStyles = this.getOrCreateBrStyles();
    const style = this.getOrCreateStyle(id);
    style.textContent = css;
  },
  removeStyle(id) {
    id = this.sanitizeId(id);
    const style = this.getStyleById(id);
    if (style) {
      style.remove();
    }
  },
  createElement(tag, options = {}, child = null) {
    const { className, id, target } = options;
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (id) element.id = id;
    if (child) element.appendChild(child);
    if (target) {
      this.appendToTarget(target, element);
    }
    return element;
  },
  sanitizeId(id) {
    return id.replace(/^[^a-z]+|[^\w-]+/gi, "-");
  },
  getOrCreateBrStyles() {
    return document.querySelector("#app-mount") || this.createElement("br-styles");
  },
  getOrCreateStyle(id) {
    return this.getStyleById(id) || this.createElement("style", { id });
  },
  getStyleById(id) {
    return document.querySelector("br-styles")?.querySelector(`#${id}`);
  },
  appendToTarget(target, element) {
    document.querySelector(target).appendChild(element);
  },
};

export function StartCustomNotificationCSS() {
  DOM.addStyle("OwOStylesOwO", `
    .custom-notification {
        display: flex;
        flex-direction: column;
        position: absolute;
        bottom: 20px; right: 20px;
        width: 440px; height: 270px;
        overflow: hidden;
        background-color: var(--modal-background);
        color: white;
        border-radius: 5px;
        box-shadow: var(--legacy-elevation-border),var(--legacy-elevation-high);
        animation: 1s slide cubic-bezier(0.39, 0.58, 0.57, 1);
    }
    @keyframes slide {
        0% {
            right: -440px;
        }
        100% {
            right: 20px;
        }
    }
    .custom-notification.close {
        animation: 1s gobyebye cubic-bezier(0.39, 0.58, 0.57, 1) forwards;
        right: 20px;
    }

    @keyframes gobyebye {
        0% {
            right: 20px;
        }
        100% {
            right: -440px;
        }
    }
    .custom-notification .top-box {padding: 16px;}
    .custom-notification .notification-title {font-size: 20px; font-weight: bold;}
    .custom-notification .content {
        padding: 0 16px 20px;
        flex: 1 1 auto;
        overflow: hidden;
    }
    .custom-notification .bottom-box {
        background-color: var(--modal-footer-background);
        padding: 16px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
    .custom-notification .confirm-button {
        background-color: #007bff;
        color: white;
        border-radius: 5px;
        padding: 5px 10px;
        margin: 0 5px;
    }
    .custom-notification .cancel-button {
        background-color: red;
        color: white;
        border-radius: 5px;
        padding: 5px 10px;
        margin: 0 5px;
    }
    .button-with-svg {
        position: absolute;
        right: 15px;
        margin-top: -0px !important;
        background: transparent;
    }
  `);
}

export default DOM;
