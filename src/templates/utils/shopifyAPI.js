/**
 * Converts an object into a query string.
 * @param {Object} params - The parameters to convert.
 * @returns {string} - The resulting query string.
 */
function _getQueryString(obj, prefix) {
  const pairs = [];

  for (let key in obj) {
    if (!obj.hasOwnProperty(key)) {
      continue;
    }

    const value = obj[key];
    const enkey = encodeURIComponent(key);
    let pair;

    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        pair = value.map(item => {
          return _getQueryString(item, prefix ? `${prefix}[${enkey}][]` : `${enkey}[]`);
        }).join('&');
      } else {
        pair = _getQueryString(value, prefix ? `${prefix}[${enkey}]` : enkey);
      }
    } else {
      pair = (prefix ? `${prefix}[${enkey}]` : enkey) + '=' + encodeURIComponent(value);
    }

    pairs.push(pair);
  }

  return pairs.join('&');
}



/**
 * Fetches search suggestions from Shopify's Predictive Search API.
 * @param {Object} params - Parameters for the search query.
 * @param {string} params.q - The search query.
 * @param {('products'|'pages'|'articles'|'collections')} [params.resources] - Types of resources to retrieve. Optional.
 * @param {number} [params.limit] - Limit the number of results for each resource type. Optional.
 * @param {string} [params.options] - Additional options for the search. Optional.
 * @param {string} [params.section_id] - ID of the section containing the search input. Optional.
 * @param {string[]} [renderSelectors] - list of selectors where to render results
 */
async function shopifyAPISuggest(params, renderSelectors) {
  let requestResponse;

  return fetch(
    window.Shopify.routes.root + `search/suggest?${_getQueryString(params)}`
  )
    .then((response) => {
      requestResponse = response;
      return response.text();
    })
    .then((text) => {
      if (!requestResponse.ok) {
        throw new Error(`${requestResponse.status}: ${text}`);
      }
      renderSelectors.forEach((renderSelector) => {
        const resultsMarkup = new DOMParser()
          .parseFromString(text, "text/html")
          .querySelector(renderSelector).innerHTML;

        // Ensure this element is defined or passed to the function
        document.querySelector(renderSelector).innerHTML = resultsMarkup;
      });
    })
    .catch((error) => {
      console.error(error);
    });
}




export const shopifyAPI = {
  suggest: shopifyAPISuggest,

};
