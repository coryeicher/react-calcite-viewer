import { appConfig } from ".././config.js";

/**
 * reset filter elements to defaults. checkboxes and switches are reset to false.
 *  select dropdowns are resent to configured default for all dropdowns. chips are all set to
 *  unselected ("grey"). slider controls ARE reset through state binding (and therefore
 *  not reset within this function)
 */
 export const ResetFilters = (state) => {
    // TODO not fully implemented
    
    // hacky implementation. would have preferred to update via state and binding but
    //      that did not function as expected
    
    // select elements
    document.getElementById('restaurantType').value = appConfig.defaultRestaurantType;
   
    // check
    for (const fieldName in state.filters.check) {
        const elementId = state.filters.check[fieldName].id;
        document.getElementById(elementId).checked = false;
    }

    // switch
    for (const fieldName in state.filters.switch) {
        const elementId = state.filters.switch[fieldName].id;
        const filterElement = document.getElementById(elementId);
        if (filterElement.hasAttribute('checked')) {
            filterElement.checked = false;
        } else { // block section element
            filterElement.open = false;
        }
    }

    // chips
    [...document.querySelectorAll(`[data-type*="type"]`)].forEach(
        (item) => (item.color = "grey")
    );

    // slider
    // note: slider filter controls are currently reset via state binding
}
