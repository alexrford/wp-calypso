/**
 * External dependencies
 */
import { pick } from 'lodash';

/**
 * Internal dependencies
 */
import { createReducer } from 'state/utils';
import {
	WOOCOMMERCE_ACTION_LIST_STEP_NEXT,
	WOOCOMMERCE_ACTION_LIST_STEP_SUCCESS,
	WOOCOMMERCE_ACTION_LIST_STEP_FAILURE,
} from 'woocommerce/state/action-types';

export default createReducer( null, {
	[ WOOCOMMERCE_ACTION_LIST_STEP_NEXT ]: handleNext,
	[ WOOCOMMERCE_ACTION_LIST_STEP_SUCCESS ]: handleSuccess,
	[ WOOCOMMERCE_ACTION_LIST_STEP_FAILURE ]: clearActionList,
} );

function handleNext( actionList, action ) {
	return updateActionList( actionList, action );
}

function handleSuccess( actionList, action ) {
	const { nextSteps } = action.actionList;

	if ( nextSteps && nextSteps.length > 0 ) {
		return updateActionList( actionList, action );
	}

	return clearActionList();
}

function updateActionList( actionList, action ) {
	const { prevSteps, currentStep, nextSteps } = action.actionList;
	const pickNames = [ 'description', 'startTime', 'endTime' ];

	return {
		prevSteps: prevSteps.map( ( step ) => pick( step, pickNames ) ),
		currentStep: ( currentStep ? pick( currentStep, pickNames ) : null ),
		nextSteps: nextSteps.map( ( step ) => pick( step, pickNames ) ),
	};
}

function clearActionList() {
	return null;
}

