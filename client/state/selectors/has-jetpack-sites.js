/**
 * Internal dependencies
 */
import createSelector from 'lib/create-selector';
import { isJetpackSite } from 'state/sites/selectors';

/**
 * Get all sites
 *
 * @param {Object} state  Global state tree
 * @return {Boolean} Whether jetpack sites exist or not
 */
export default createSelector(
	( state ) => {
		const siteIds = Object.keys( state.sites.items );
		return siteIds.some( ( siteId ) => isJetpackSite( state, siteId ) );
	},
	( state ) => state.sites.items
);
