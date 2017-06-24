/**
 * External dependencies
 */
import { get } from 'lodash';

/**
 * Internal dependencies
 */
import createSelector from 'lib/create-selector';
import { getSites } from 'state/selectors';

/**
 * Returns true if user can manage plugins for at least one site and returns false otherwise
 *
 * @param {Object} state  Global state tree
 * @return {Boolean} Whether the user can manage plugins or not
 */
export default createSelector(
	state => getSites( state ).some( ( site ) => get( site, 'capabilities.manage_options', false ) ),
	state => state.sites.items
);
