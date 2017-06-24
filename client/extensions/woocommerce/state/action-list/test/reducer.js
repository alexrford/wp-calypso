/**
 * External dependencies
 */
import { expect } from 'chai';

/**
 * Internal dependencies
 */
import reducer from '../reducer';
import * as fxt from 'woocommerce/state/action-list/test/fixtures';

import {
	actionListStepNext,
	actionListStepSuccess,
	actionListStepFailure,
} from '../actions';

describe( 'reducer', () => {
	it( 'should initialize to null', () => {
		expect( reducer( undefined, { type: 'DUMMY_ACTION' } ) ).to.equal( null );
	} );

	it( 'should show action list progress after step started', () => {
		const actionList = {
			prevSteps: [ fxt.stepASuccessful ],
			currentStep: fxt.stepBStarted,
			nextSteps: [ fxt.stepC ],
		};

		const expectedState = {
			prevSteps: [
				{ description: fxt.stepA.description, startTime: fxt.time.stepAStart, endTime: fxt.time.stepAEnd },
			],
			currentStep: { description: fxt.stepB.description, startTime: fxt.time.stepBStart },
			nextSteps: [
				{ description: fxt.stepC.description },
			],
		};

		expect( reducer( undefined, actionListStepNext( actionList ) ) ).to.eql( expectedState );
	} );

	it( 'should show action list progress after step success', () => {
		const actionList = {
			prevSteps: [ fxt.stepASuccessful, fxt.stepBSuccessful ],
			currentStep: null,
			nextSteps: [ fxt.stepC ],
		};

		const expectedState = {
			prevSteps: [
				{ description: fxt.stepA.description, startTime: fxt.time.stepAStart, endTime: fxt.time.stepAEnd },
				{ description: fxt.stepB.description, startTime: fxt.time.stepBStart, endTime: fxt.time.stepBEnd },
			],
			currentStep: null,
			nextSteps: [
				{ description: fxt.stepC.description },
			],
		};

		expect( reducer( undefined, actionListStepSuccess( actionList ) ) ).to.eql( expectedState );
	} );

	it( 'should clear after the list is successfully completed', () => {
		const actionList = {
			prevSteps: [ fxt.stepASuccessful, fxt.stepASuccessful, fxt.stepCSuccessful ],
			currentStep: null,
			nextSteps: [],
		};

		expect( reducer( undefined, actionListStepSuccess( actionList ) ) ).to.equal( null );
	} );

	it( 'should clear after a step in the list fails', () => {
		const actionList = {
			prevSteps: [ fxt.stepASuccessful, fxt.stepEFailed ],
			currentStep: null,
			nextSteps: [ fxt.stepC ],
		};

		expect( reducer( undefined, actionListStepFailure( actionList ) ) ).to.equal( null );
	} );
} );

