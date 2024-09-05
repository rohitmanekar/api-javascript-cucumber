import { Given, Then } from "@cucumber/cucumber";
import { expect } from 'chai';
import axios from "axios";

// Helper function to validate if a field is non-null and non-empty
function validateField(field) {
  expect(field).to.not.be.null; // Check that the field is not null
  expect(field).to.not.equal(''); // Check that the field is not an empty string
}

// Step definition to make a GET request and measure the response time
Given('I make a GET request to {string}', async function (url) {
  const startTime = Date.now(); // Record the start time of the request
  try {
    // Make the GET request and store the response
    this.response = await axios.get(url);
  } catch (err) {
    // If the request fails, assign the error response to `this.response`
    this.response = err.response;
  }
  const endTime = Date.now(); // Record the end time of the request
  this.responseTime = endTime - startTime; // Calculate the response time
  console.log(`Response time = ${this.responseTime} ms`); // Log the response time
});

// Step definition to assert the HTTP status code of the response
Then('the response status code should be {int}', function (statusCode) {
  expect(this.response.status).to.equal(statusCode); // Check that the status code matches the expected value
});

// Step definition to assert that the response time is below a given threshold
Then('the response time should be less than {int} milliseconds', function (time) {
  expect(this.responseTime).to.be.below(time); // Check that the response time is below the specified threshold
});

// Step definition to ensure that 'id' fields are not null or empty
Then('the id field should never be null or empty', function () {
  const elements = this.response.data.schedule.elements;

  elements.forEach(item => {
    validateField(item.id); // Validate 'id' field
    validateField(item.episode.id); // Validate 'episode.id' field
  });
});

// Step definition to ensure that the 'type' field in 'episode' matches the expected type
Then('the type field in episode should always be {string}', function (expectedType) {
  const elements = this.response.data.schedule.elements;

  elements.forEach(item => {
    expect(item.episode.type).to.equal(expectedType); // Check that 'episode.type' matches the expected type
  });
});

// Step definition to ensure that the 'title' field in 'episode' is never null or empty
Then('the title field in episode should never be null or empty for any schedule item', function () {
  const elements = this.response.data.schedule.elements;

  elements.forEach(item => {
    validateField(item.episode.title); // Validate 'episode.title' field
  });
});

// Step definition to ensure that only one episode in the list has 'live' set to true
Then('only one episode in the list should have live as true', function () {
  const elements = this.response.data.schedule.elements;
  const liveEpisodes = elements.filter(item => item.episode.live === true); // Filter episodes with 'live' set to true

  expect(liveEpisodes.length).to.equal(1); // Ensure that there is exactly one live episode
});

// Step definition to ensure that 'transmission_start' is before 'transmission_end'
Then('the transmission_start date should be before the transmission_end date', function () {
  const elements = this.response.data.schedule.elements;

  elements.forEach(item => {
    const start = new Date(item.transmission_start); // Parse 'transmission_start' date
    const end = new Date(item.transmission_end); // Parse 'transmission_end' date
    expect(start).to.be.below(end); // Check that 'transmission_start' is before 'transmission_end'
  });
});

// Step definition to ensure that the response headers contain a 'Date' value
Then('the response headers should contain a Date value', function () {
  expect(this.response.headers.date).to.not.be.undefined; // Check that the 'Date' header is present in the response
});

// Step definition to assert the HTTP status code of the response
Then('the HTTP status code should be {int}', function (expectedStatusCode) {
  expect(this.response.status).to.equal(expectedStatusCode); // Check that the status code matches the expected value
});

// Step definition to ensure that the error object contains specific properties
Then('the error object should have properties details and http_response_code', function () {
  expect(this.response.data).to.have.property('error'); // Check that 'error' property exists
  expect(this.response.data.error).to.have.property('details'); // Check that 'details' property exists in 'error'
  expect(this.response.data.error).to.have.property('http_response_code'); // Check that 'http_response_code' property exists in 'error'

  // Additional assertion to check the value of 'details' and 'http_response_code'
  expect(this.response.data.error.details).to.contain('Schedule not found for date (2023-09-11)');
  expect(this.response.data.error.http_response_code).to.equal(404);
});