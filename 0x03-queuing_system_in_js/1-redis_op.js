#!/usr/bin/env node

import redis from 'redis';

const client = redis.createClient();

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

client.on('error', (err) => {
  console.error('Redis client not connected to the server:', err);
});

/**
 * Sets a new key-value pair in Redis.
 * @param {string} schoolName - The key.
 * @param {string} value - The value.
 */
function setNewSchool(schoolName, value) {
  client.set(schoolName, value, redis.print);
}

/**
 * Displays the value associated with a given key.
 * @param {string} schoolName - The key.
 */
function displaySchoolValue(schoolName) {
  client.get(schoolName, (err, reply) => {
    if (err) {
      console.error(err);
    } else {
      console.log(reply);
    }
  });
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
