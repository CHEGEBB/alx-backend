#!/usr/bin/env node

import redis from 'redis';
import { promisify } from 'util';

const client = redis.createClient();

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

client.on('error', (err) => {
  console.error('Redis client not connected to the server:', err);
});

const getAsync = promisify(client.get).bind(client);

/**
 * Sets a new key-value pair in Redis.
 * @param {string} schoolName - The key.
 * @param {string} value - The value.
 */
function setNewSchool(schoolName, value) {
  client.set(schoolName, value, redis.print);
}

/**
 * Displays the value associated with a given key using async/await.
 * @param {string} schoolName - The key.
 */
async function displaySchoolValue(schoolName) {
  try {
    const value = await getAsync(schoolName);
    console.log(value);
  } catch (err) {
    console.error(err);
  }
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
