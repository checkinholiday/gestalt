// @flow strict
import React from 'react';
import Status from './Status.js';

const Valid = <Status type="unstarted" title="Unstarted" />;

// $FlowExpectedError[prop-missing]
const InvalidProps = <Status nonexisting={33} />;
