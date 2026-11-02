/* The Blowfish checkbox still drives the existing mobile menu styles. */
(function () {
  const toggle = document.getElementById("mobile-menu-toggle");
  const trigger = document.getElementById("mobile-menu-button");
  const dialog = document.getElementById("mobile-menu-dialog");
  const closeButton = document.getElementById("mobile-menu-close-button");
  if (!toggle || !trigger || !dialog || !closeButton) return;

  // Keep this breakpoint aligned with Blowfish's md navigation breakpoint.
  const desktop = window.matchMedia("(min-width: 853px)");
  const focusableSelector = 'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])';

  function isVisible(element) {
    return element && element.getClientRects().length > 0 && getComputedStyle(element).visibility !== "hidden";
  }

  function focusableElements() {
    return Array.from(dialog.querySelectorAll(focusableSelector)).filter(function (element) {
      return !element.disabled && element.tabIndex >= 0 && isVisible(element);
    });
  }

  function openMenu() {
    if (desktop.matches || toggle.checked) return;
    toggle.checked = true;
    trigger.setAttribute("aria-expanded", "true");
    dialog.setAttribute("aria-hidden", "false");
    dialog.inert = false;
    closeButton.focus({ preventScroll: true });
  }

  function closeMenu(restoreFocus = true) {
    const wasOpen = toggle.checked;
    toggle.checked = false;
    trigger.setAttribute("aria-expanded", "false");
    if (wasOpen && restoreFocus && isVisible(trigger)) {
      trigger.focus({ preventScroll: true });
    }
    dialog.setAttribute("aria-hidden", "true");
    dialog.inert = true;
  }

  trigger.addEventListener("click", function () {
    if (toggle.checked) closeMenu();
    else openMenu();
  });
  closeButton.addEventListener("click", function () { closeMenu(); });

  dialog.addEventListener("click", function (event) {
    if (event.target.closest("a[href]")) closeMenu();
  });

  document.addEventListener("keydown", function (event) {
    if (!toggle.checked) return;
    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu();
      return;
    }
    if (event.key !== "Tab") return;
    const elements = focusableElements();
    const first = elements[0] || dialog;
    const last = elements[elements.length - 1] || dialog;
    const active = document.activeElement;
    if (!dialog.contains(active) || (event.shiftKey && active === first) || (!event.shiftKey && active === last)) {
      event.preventDefault();
      (event.shiftKey ? last : first).focus();
    }
  });

  document.addEventListener("focusin", function (event) {
    if (toggle.checked && !dialog.contains(event.target)) closeButton.focus({ preventScroll: true });
  });

  desktop.addEventListener("change", function () {
    if (!desktop.matches || !toggle.checked) return;
    closeMenu(false);
    const fallback = document.getElementById("search-button") || document.querySelector(".main-menu > a");
    if (isVisible(fallback)) fallback.focus({ preventScroll: true });
  });

  // Browsers may restore checkbox state when navigating back to a page.
  window.addEventListener("pageshow", function () { closeMenu(false); });
  closeMenu(false);
})();
