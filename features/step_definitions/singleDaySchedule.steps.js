import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from 'chai';
import axios from "axios";
import logger from '../../logger.js';  // Import logger

/**
 * This is a helper function to validate if a field is non-null and non-empty
 * 
 * @param {*} field 
 */
function validateField(field) {
  expect(field).to.not.be.null;
  expect(field).to.not.equal('');
}

/**
 * Stores the API endpoint URL for later use in the scenario and logs the URL.
 *
 * @param {string} url - The API endpoint URL to be used in the scenario.
 */
Given('I have the API endpoint {string}', function (url) {
  this.url = url; // Store the URL for later use in the scenario
  logger.info(`Set API endpoint: ${url}`);  // Log the API endpoint
});

/**
 * Makes a GET request to the stored API endpoint and logs the request and response time.
 *
 * Calculates the response time and logs whether the request was successful or failed.
 * Stores the response object and response time for later assertions.
 */
When('I make a GET request to the endpoint', async function () {
  const startTime = Date.now();
  logger.info(`Making GET request to: ${this.url}`);
  try {
    this.response = await axios.get(this.url); // Make the GET request
    logger.info('GET request successful');
  } catch (err) {
    this.response = err.response; // Handle request errors
    logger.error(`GET request failed with status: ${err.response.status}`);
  } finally {
    const endTime = Date.now();
    this.responseTime = endTime - startTime; // Calculate response time
    logger.info(`Response time = ${this.responseTime} ms`);
  }
});

/**
 * Verifies that the response status code matches the expected status code.
 *
 * @param {number} statusCode - The expected HTTP status code.
 */
Then('the response status code should be {int}', function (statusCode) {
  logger.info(`Verifying status code. Expected: ${statusCode}, Received: ${this.response.status}`);
  expect(this.response.status).to.equal(statusCode);
  logger.info('Status code verification complete.');
});

/**
 * Asserts that the response time is less than the specified threshold.
 *
 * @param {number} time - The maximum allowed response time in milliseconds.
 */
Then('the response time should be less than {int} milliseconds', function (time) {
  logger.info(`Asserting response time is less than ${time} milliseconds.`);
  expect(this.responseTime).to.be.below(time);
  logger.info(`Response time is ${this.responseTime} milliseconds.`);
});

/**
 * Validates that the 'id' field and 'episode.id' field in each element of the response are non-null and non-empty.
 */
Then('the id field should never be null or empty', function () {
  const elements = this.response.data.schedule.elements;
  logger.info('Validating that the \'id\' field and \'episode.id\' field are non-null and non-empty.');
  elements.forEach(item => {
    validateField(item.id); // Validate 'id' field
    validateField(item.episode.id); // Validate 'episode.id' field
  });
  logger.info('Validation complete for \'id\' and \'episode.id\' fields.');
});

/**
 * Checks that the 'type' field in the 'episode' object is always equal to the expected value.
 *
 * @param {string} expectedType - The expected value for the 'type' field in the 'episode' object.
 */
Then('the type field in episode should always be {string}', function (expectedType) {
  const elements = this.response.data.schedule.elements;
  logger.info(`Checking that the 'type' field in the 'episode' object is always ${expectedType}.`);
  elements.forEach(item => {
    expect(item.episode.type).to.equal(expectedType);
  });
  logger.info('Type field validation complete.');
});

/**
 * Ensures that the 'title' field in the 'episode' object is never null or empty for any schedule item.
 */
Then('the title field in episode should never be null or empty for any schedule item', function () {
  const elements = this.response.data.schedule.elements;
  logger.info('Ensuring that the \'title\' field in the \'episode\' object is never null or empty.');
  elements.forEach(item => {
    validateField(item.episode.title);
  });
  logger.info('Validation complete for \'title\' field.');
});

/**
 * Validates that exactly one episode in the list has 'live' set to true.
 */
Then('only one episode in the list should have live as true', function () {
  const elements = this.response.data.schedule.elements;
  const liveEpisodes = elements.filter(item => item.episode.live === true);
  logger.info(`Validating that exactly one episode in the list has 'live' set to true.`);
  expect(liveEpisodes.length).to.equal(1); // Validate that exactly one episode is live
  logger.info(`Number of live episodes found: ${liveEpisodes.length}`);
});

/**
 * Verifies that the 'transmission_start' date is before the 'transmission_end' date for each item.
 */
Then('the transmission_start date should be before the transmission_end date', function () {
  const elements = this.response.data.schedule.elements;
  logger.info('Verifying that the \'transmission_start\' date is before the \'transmission_end\' date for each item.');
  elements.forEach(item => {
    const start = new Date(item.transmission_start);
    const end = new Date(item.transmission_end);
    expect(start).to.be.below(end);
  });
  logger.info('Date validation complete.');
});

/**
 * Checks that the response headers contain a 'Date' value.
 */
Then('the response headers should contain a Date value', function () {
  logger.info('Checking that the response headers contain a \'Date\' value.');
  expect(this.response.headers.date).to.not.be.undefined;
  logger.info('Date value found in response headers.');
});

/**
 * Asserts that the HTTP status code of the response matches the expected status code.
 *
 * @param {number} expectedStatusCode - The expected HTTP status code.
 */
Then('the HTTP status code should be {int}', function (expectedStatusCode) {
  logger.info(`Asserting that the HTTP status code is ${expectedStatusCode}.`);
  expect(this.response.status).to.equal(expectedStatusCode);
  logger.info(`HTTP status code is ${this.response.status}.`);
});

/**
 * Validates that the error object in the response contains the 'details' and 'http_response_code' properties
 * and checks their values.
 */
Then('the error object should have properties details and http_response_code', function () {
  logger.info('Validating that the error object contains the \'details\' and \'http_response_code\' properties.');
  expect(this.response.data).to.have.property('error');
  expect(this.response.data.error).to.have.property('details');
  expect(this.response.data.error).to.have.property('http_response_code');
  
  // Additional validation for error details
  expect(this.response.data.error.details).to.contain('Schedule not found for date (2023-09-11)');
  expect(this.response.data.error.http_response_code).to.equal(404);
  logger.info('Error object validation complete.');
});
