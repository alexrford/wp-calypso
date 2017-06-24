/**
 * External dependencies
 */
import { expect } from 'chai';

/**
 * Internal dependencies
 */
import { userCanManagePlugins } from '../';

const currentUserState = {
	currentUser: {
		id: 12345678
	},
	users: {
		items: {
			12345678: {
				primary_blog: 2916288
			}
		}
	}
};

describe( 'userCanManagePlugins()', () => {
	it( 'should return false if no sites exist in state', () => {
		const state = {
			...currentUserState,
			sites: {
				items: {}
			}
		};
		expect( userCanManagePlugins( state ) ).be.false;
	} );

	it( 'should return false if one site exists without referring if the user can manage it or not', () => {
		const state = {
			...currentUserState,
			sites: {
				items: {
					2916288: { ID: 2916288, name: 'WordPress.com Example Blog' }
				}
			}
		};
		expect( userCanManagePlugins( state ) ).be.false;
	} );

	it( 'should return false if several sites exists without referring if the user can manage it or not', () => {
		const state = {
			...currentUserState,
			sites: {
				items: {
					2916288: { ID: 2916288, name: 'WordPress.com Way Better Example Blog' },
					2916289: { ID: 2916289, name: 'WordPress.com Another Example Blog' },
					2916287: { ID: 2916287, name: 'WordPress.com Example Blog' }
				}
			}
		};
		expect( userCanManagePlugins( state ) ).be.false;
	} );

	it( 'should return false if sites explicitly tell the user can not manage', () => {
		const state = {
			...currentUserState,
			sites: {
				items: {
					2916288: {
						ID: 2916288,
						name: 'WordPress.com Way Better Example Blog',
						capabilities: {
							edit_pages: true,
							edit_posts: true,
							manage_options: false
						}
					},
					2916289: {
						ID: 2916289,
						name: 'WordPress.com Another Example Blog',
						capabilities: {
							manage_options: false
						}
					},
					2916287: {
						ID: 2916287,
						name: 'WordPress.com Example Blog',
						capabilities: {
							manage_options: false,
							edit_posts: false
						}
					}
				}
			}
		};
		expect( userCanManagePlugins( state ) ).be.false;
	} );

	it( 'should return true if just one site exists and the user can manage it', () => {
		const state = {
			...currentUserState,
			sites: {
				items: {
					2916287: {
						ID: 2916287,
						name: 'WordPress.com Example Blog',
						capabilities: {
							manage_options: true
						}
					}
				}
			}
		};
		expect( userCanManagePlugins( state ) ).be.true;
	} );

	it( 'should return true if many sites exist and the user can manage them all', () => {
		const state = {
			...currentUserState,
			sites: {
				items: {
					2916288: {
						ID: 2916288,
						name: 'WordPress.com Way Better Example Blog',
						capabilities: {
							edit_pages: true,
							edit_posts: true,
							manage_options: true
						}
					},
					2916289: {
						ID: 2916289,
						name: 'WordPress.com Another Example Blog',
						capabilities: {
							manage_options: true
						}
					},
					2916287: {
						ID: 2916287,
						name: 'WordPress.com Example Blog',
						capabilities: {
							manage_options: true,
							edit_posts: true
						}
					}
				}
			}
		};
		expect( userCanManagePlugins( state ) ).be.true;
	} );

	it( 'should return true if many sites exist and the user can manage just one', () => {
		const state = {
			...currentUserState,
			sites: {
				items: {
					2916288: {
						ID: 2916288,
						name: 'WordPress.com Way Better Example Blog',
						capabilities: {
							edit_pages: true,
							edit_posts: true,
							manage_options: false
						}
					},
					2916289: {
						ID: 2916289,
						name: 'WordPress.com Another Example Blog',
						capabilities: {
							manage_options: true
						}
					},
					2916287: {
						ID: 2916287,
						name: 'WordPress.com Example Blog',
						capabilities: {
							manage_options: false,
							edit_posts: true
						}
					}
				}
			}
		};
		expect( userCanManagePlugins( state ) ).be.true;
	} );
} );
