
/**
 * Internal dependencies
 */
import {
	WOOCOMMERCE_ACTION_LIST_STEP_NEXT,
	WOOCOMMERCE_ACTION_LIST_STEP_SUCCESS,
	WOOCOMMERCE_ACTION_LIST_STEP_FAILURE,
} from '../action-types';

/**
 * Action Creator: Start next action list step.
 *
 * @param {Object} actionList The current action list.
 * @return {Object} action
 */
export function actionListStepNext( actionList ) {
	return {
		type: WOOCOMMERCE_ACTION_LIST_STEP_NEXT,
		actionList,
	};
}

/**
 * Action Creator: Mark current step as successful.
 *
 * @param {Object} actionList The current action list.
 * @return {Object} action
 */
export function actionListStepSuccess( actionList ) {
	return {
		type: WOOCOMMERCE_ACTION_LIST_STEP_SUCCESS,
		actionList,
	};
}

/**
 * Action Creator: Mark current step as failed.
 *
 * @param {Object} actionList The current action list.
 * @param {Object} error The error from the failure.
 * @return {Object} action
 */
export function actionListStepFailure( actionList, error ) {
	return {
		type: WOOCOMMERCE_ACTION_LIST_STEP_FAILURE,
		actionList,
		error,
	};
}

