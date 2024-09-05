# API JavaScript Cucumber

A JavaScript-based API testing framework using Cucumber.js for behavior-driven development (BDD), integrated with various reporting tools.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Reporting](#reporting)
- [Contributing](#contributing)

## Project Overview

This project provides a framework for API testing using JavaScript, Cucumber.js, and Chai for assertions. It includes cucumber reporting for html and json based test reports.

## Features

- BDD-style API testing with Cucumber.js
- Cucumber html reports
- Assertion library: Chai
- HTTP requests handled by Axios

## Installation

To get started, clone the repository and install the necessary dependencies:

```bash
git clone https://github.com/rohitmanekar/api-javascript-cucumber.git
cd api-javascript-cucumber
npm install
```

## Usage
### Writing Tests
Tests are written in Gherkin syntax and placed in the features directory. Step definitions are implemented in the features/step_definitions directory.

### Running Tests
To run the tests, use the following command:
```bash
npm run test
```

## Configuration
The configuration for the test framework and reporting tools is located in the cucumber.js and extent-config.js files. Adjust these configurations as needed to fit your project's requirements.

## Reporting
Test reports are generated using Extent Reports. By default, reports are generated in the reports directory.

### Generating Reports
To generate reports, run your tests as usual. The report generation is handled automatically after the tests complete.

Contributing
Contributions are welcome! Please fork the repository, make your changes, and submit a pull request. Ensure that you follow the project's coding standards and include tests for any new features.
