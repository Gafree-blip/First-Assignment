
// NOTE : You highlight the problem you need to check and ignore the rest code in order for it to read one problem at a time 

// PROBLEM 1


function deepEqual(objA, objB) {
  // 1. If they are strictly equal (primitives or same reference), return true
  if (objA === objB) {
    return true;
  }

  // 2. If either is null or not an object, they cannot be deeply equal objects
  if (
    objA === null ||
    typeof objA !== 'object' ||
    objB === null ||
    typeof objB !== 'object'
  ) {
    return false;
  }

  // 3. Get keys of both objects and compare their lengths
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // 4. Recursively compare every key and value
  for (const key of keysA) {
    if (!Object.hasOwn(objB, key)) {
      return false;
    }

    if (!deepEqual(objA[key], objB[key])) {
      return false;
    }
  }

  return true;
}

// Testing
console.log(deepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } })); // true
console.log(deepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 3 } })); // false
console.log(deepEqual({ a: 1 }, { a: 1, b: 2 })); // false




// PROBLEM 2 

function diffObjects(oldObj, newObj) {
  const result = {
    added: {},
    removed: {},
    changed: {},
  };

  // Combine all unique top-level keys from both objects
  const allKeys = new Set([...Object.keys(oldObj), ...Object.keys(newObj)]);

  for (const key of allKeys) {
    const inOld = Object.hasOwn(oldObj, key);
    const inNew = Object.hasOwn(newObj, key);

    if (inOld && !inNew) {
      // Key existed in oldObj, but was removed in newObj
      result.removed[key] = oldObj[key];
    } else if (!inOld && inNew) {
      // Key did not exist in oldObj, so it was added in newObj
      result.added[key] = newObj[key];
    } else if (oldObj[key] !== newObj[key]) {
      // Key exists in both, but its value changed
      result.changed[key] = {
        from: oldObj[key],
        to: newObj[key],
      };
    }
  }

  return result;
}

console.log(
  diffObjects(
    { name: 'Setemi', role: 'Engineer', country: 'Jamaica' },
    { name: 'Setemi', role: 'Senior Engineer', city: 'Kingston' }
  )
);


// PROBLEM 3 

function deepFreeze(obj) {
  // 1. Loop through all property values of the object
  for (const value of Object.values(obj)) {
  
    if (value !== null && typeof value === 'object') {
      deepFreeze(value);
    }
  }

  // 3. Freeze 
  return Object.freeze(obj);
}

// Test case
const config = deepFreeze({ api: { baseUrl: 'https://x.com', retries: 3 }, debug: false });
config.api.baseUrl = 'https://changed.com'; // should be ignored
config.debug = true; // should be ignored
console.log(config.api.baseUrl, config.debug); // "https://x.com" false
console.log(Object.isFrozen(config.api)); // true


// PROBLEM 4 

function createCounter() {

  let count = 0;

  return {
    increment() {
      count++;
    },
    decrement() {
      count--;
    },
    
    get value() {
      return count;
    },
  };
}

// Test case from your assignment
const counter = createCounter();
counter.increment();
counter.increment();
counter.decrement();
console.log(counter.value); // 1
console.log(counter.count); // undefined 


// PROBLEM 5 
function validateSchema(obj, schema) {
  const errors = [];

  // Loop through each [key]
  for (const [key, expectedType] of Object.entries(schema)) {
    if (!Object.hasOwn(obj, key)) {
      // 1. Check if the property is missing from obj
      errors.push(`${key}: missing property`);
    } else if (typeof obj[key] !== expectedType) {
      // 2. Check if the property's typeof matches the expected type[cite: 5]
      errors.push(`${key}: expected ${expectedType}, got ${typeof obj[key]}`);
    }
  }

  return errors;
}


const schema = { name: 'string', age: 'number', isAdmin: 'boolean' };
console.log(validateSchema({ name: 'Ada', age: 21, isAdmin: false }, schema));
// [][cite: 5]
console.log(validateSchema({ name: 'Ada', age: '21' }, schema));



