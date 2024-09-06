import { BeforeAll, AfterAll } from '@cucumber/cucumber';
import logger from '../../logger.js';  // Import logger

/**
 * BeforeAll Hook
 * This hook is executed once before all test scenarios are run.
 */
BeforeAll(function () {
    logger.info(`=========================== STARTING TESTS ===========================`);
});

/**
 * AfterAll Hook
 * This hook is executed once after all test scenarios are run.
 */
AfterAll(function () {
    logger.info(`=========================== TESTS ENDED ===========================`);
});
