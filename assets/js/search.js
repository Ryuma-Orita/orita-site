/* Blowfish 2.106.0 override: modal keyboard access and focus restoration.
 * Fuse options and result markup retain the theme's search behavior.
 */
(function () {
  const showButtons = [document.getElementById("search-button"), document.getElementById("search-button-mobile")].filter(Boolean);
  const hideButton = document.getElementById("close-search-button");
  const wrapper = document.getElementById("search-wrapper");
  const modal = document.getElementById("search-modal");
  const input = document.getElementById("search-query");
  const output = document.getElementById("search-results");
  if (!wrapper || !modal || !input || !output || !hideButton) return;

  let fuse;
  let indexed = false;
  let indexLoading = false;
  let searchVisible = false;
  let returnFocus;
  let previousOverflow;

  function isVisible(element) {
    return element && element.isConnected && element.getClientRects().length > 0 && getComputedStyle(element).visibility !== "hidden";
  }

  showButtons.forEach(function (button) {
    button.setAttribute("aria-controls", "search-modal");
    button.setAttribute("aria-haspopup", "dialog");
    button.setAttribute("aria-expanded", "false");
    button.addEventListener("click", displaySearch);
  });
  hideButton.addEventListener("click", hideSearch);
  wrapper.addEventListener("click", function (event) {
    if (event.target === wrapper) hideSearch();
  });
  input.form.addEventListener("submit", function (event) { event.preventDefault(); });
  input.addEventListener("input", function () { executeQuery(input.value); });

  document.addEventListener("keydown", function (event) {
    if (event.isComposing) return;
    const active = document.activeElement;
    const tag = active.tagName;
    const isInputField = tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || active.isContentEditable;
    // Do not layer search over another modal (for example, mobile navigation).
    if (event.key === "/" && !searchVisible && !isInputField && !active.closest('[role="dialog"][aria-modal="true"]')) {
      event.preventDefault();
      displaySearch();
      return;
    }
    if (!searchVisible) return;

    if (event.key === "Escape") {
      event.preventDefault();
      hideSearch();
      return;
    }

    const results = Array.from(output.querySelectorAll("a[href]"));
    if (event.key === "Tab") {
      const last = results[results.length - 1] || hideButton;
      if (!modal.contains(active) || (event.shiftKey && active === input) || (!event.shiftKey && active === last)) {
        event.preventDefault();
        (event.shiftKey ? last : input).focus();
      }
      return;
    }

    const resultIndex = results.indexOf(active);
    if (results.length && (active === input || resultIndex !== -1)) {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        results[Math.min(resultIndex + 1, results.length - 1)].focus();
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        (resultIndex <= 0 ? input : results[resultIndex - 1]).focus();
      } else if (event.key === "Enter" && active === input) {
        event.preventDefault();
        results[0].focus();
      }
    }
  });

  document.addEventListener("focusin", function (event) {
    if (searchVisible && !modal.contains(event.target)) input.focus({ preventScroll: true });
  });

  function displaySearch(event) {
    if (searchVisible) return;
    returnFocus = event ? event.currentTarget : document.activeElement;
    if (returnFocus === document.body) returnFocus = showButtons.find(isVisible);
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    wrapper.style.visibility = "visible";
    wrapper.setAttribute("aria-hidden", "false");
    showButtons.forEach(function (button) { button.setAttribute("aria-expanded", "true"); });
    searchVisible = true;
    input.focus();
    if (!indexed) buildIndex();
  }

  function hideSearch() {
    if (!searchVisible) return;
    searchVisible = false;
    document.body.style.overflow = previousOverflow;
    wrapper.style.visibility = "hidden";
    input.value = "";
    output.innerHTML = "";
    showButtons.forEach(function (button) { button.setAttribute("aria-expanded", "false"); });
    const target = isVisible(returnFocus) ? returnFocus : showButtons.find(isVisible);
    if (target) target.focus({ preventScroll: true });
    wrapper.setAttribute("aria-hidden", "true");
  }

  function buildIndex() {
    if (indexed || indexLoading) return;
    indexLoading = true;
    const baseURL = wrapper.getAttribute("data-url").replace(/\/?$/, "/");
    const httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
      if (httpRequest.readyState !== 4) return;
      indexLoading = false;
      if (httpRequest.status !== 200) return;
      try {
        const data = JSON.parse(httpRequest.responseText);
        fuse = new Fuse(data, {
          shouldSort: true,
          ignoreLocation: true,
          threshold: 0.0,
          includeMatches: true,
          keys: [
            { name: "title", weight: 0.8 },
            { name: "section", weight: 0.2 },
            { name: "summary", weight: 0.6 },
            { name: "content", weight: 0.4 },
          ],
        });
        indexed = true;
      } catch (_) {
        return;
      }
      // Include text entered while the initial index request was in flight.
      if (searchVisible) executeQuery(input.value);
    };
    httpRequest.open("GET", baseURL + "index.json");
    httpRequest.send();
  }

  function executeQuery(term) {
    if (!indexed) {
      buildIndex();
      return;
    }
    const results = fuse.search(term);
    let resultsHTML = "";
    results.forEach(function (value) {
      const div = document.createElement("div");
      div.innerHTML = value.item.summary;
      const summary = div.textContent || div.innerText || "";
      const title = value.item.externalUrl
        ? value.item.title + '<span class="text-xs ml-2 align-center cursor-default text-neutral-400 dark:text-neutral-500">' + value.item.externalUrl + "</span>"
        : value.item.title;
      const linkconfig = value.item.externalUrl
        ? 'target="_blank" rel="noopener" href="' + value.item.externalUrl + '"'
        : 'href="' + value.item.permalink + '"';
      resultsHTML += `<li class="mb-2">
          <a class="flex items-center px-3 py-2 rounded-md appearance-none bg-neutral-100 dark:bg-neutral-700 focus:bg-primary-100 hover:bg-primary-100 dark:hover:bg-primary-900 dark:focus:bg-primary-900 focus:outline-dotted focus:outline-transparent focus:outline-2"
          ${linkconfig} tabindex="0">
            <div class="grow">
              <div class="-mb-1 text-lg font-bold">${title}</div>
              <div class="text-sm text-neutral-500 dark:text-neutral-400">${value.item.section}<span class="px-2 text-primary-500">&middot;</span>${value.item.date ? value.item.date : ""}</div>
              <div class="text-sm italic">${summary}</div>
            </div>
            <div class="ml-2 ltr:block rtl:hidden text-neutral-500">&rarr;</div>
            <div class="mr-2 ltr:hidden rtl:block text-neutral-500">&larr;</div>
          </a>
        </li>`;
    });
    output.innerHTML = resultsHTML;
  }
})();
