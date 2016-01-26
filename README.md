# Quiz 2 - Prototypes

Below are a series of problems to solve using JavaScript's prototype mechanism.
Whenever you create a named function, it has a prototype object attached to it,
which allows you to have shared functionality in all shared instances of your
prototype.

```js
function Dog(breed) {
  this.breed = breed;
  this.steps = 0;
}

Dog.prototype.bark = function() {
  console.log('*bark!*');
};

Dog.prototype.walk = function() {
  this.steps++;
};

let spot = new Dog('beagle');
spot.bark(); // *bark!*
spot.walk();
spot.walk();
console.log(spot.steps); // 2

let spike = new Dog('chihuahua');
spike.walk();
console.log(spike.steps); // 1

Dog.prototype.bark = function() {
  console.log(this.breed + ' says: *bark!');
};

spot.bark(); // beagle says: *bark!*
spike.bark(); // chihuahua says: *bark!*
```

# Nomenclature

* **Contructor** - The function that gets called when an object is initialized.
* **Methods** - Functions that are tied to an object.
* **Parameters** - The variables in a function definition
* **Arguments** - When a method is called, they are the data passed through in
  the parameters.
* **Instance** - A Single instance of a reusable prototype or class. A single
  dog is an instance of the "class" Dog.
* **Static** - Methods or properties tied to the class or prototype. The total
  number of dogs would be a static property.

# Instructions

1. Fork this repo to your own user account

1. Clone your fork of the repo

1. Navigate to the repo's directory in the terminal

1. Install the dependencies:

  ```bash
  npm install
  ```

1. Solve the problems described below. Enter your code into the `user.js` file
  in the root of this project. The problems will build on each other, so you'll
  keep using the same file.

1. Run the tests with the following command:

  ```bash
  npm test
  ```

  You may see errors show up. That is alright! You can run them as many times as
  you want. If you're having trouble here are some helpful tips:

  * Use `console.log()` frequently if you're unsure of the value of a variable.
    Use prefixes to help you distinguish different logging statements like this:
    `console.log('testing', myObj);`

1. Once you're done, commit your code, push it, and submit a pull request to the
  original repo. It will run the automated tests and tell me whether or not they
  pass. If they fail, you can still make new commits. If you push them up, your
  changes will automatically be shown in the pull request, and the automated
  tests will rerun. If the tests pass on your machine, but fail in the pull
  request, contact me and we'll get it resolved.

1. After you have a passing pull request, submit the link to the pull request
  to canvas. If you're having trouble getting all of the tests to pass, you can
  still submit for partial points. The quiz is out of 30 and you have 32 tests
  to pass, which allows you 2 failing tests to still get 100% on the quiz.

Problem 1 - Creating a user object
========================================================================

For the first problem, create a User prototype. The 'constructor' should accept
to properties, `username` and `password`. The values for those properties should
be stored on each user as the `username` and `password` properties respectively.

It should have an `authenticate` method, which accepts a `password` parameter
and returns `true` if the password matches the user and `false` if it doesn't.

```js
let user = new User('myusername', 'mypassword');

console.log(user.username); // 'myusername'
console.log(user.password); // 'mypassword'

console.log(user.authenticate('mypassword')); // true
console.log(user.authenticate('notmypassword')); // false
```


Problem 2 - Hash a password
========================================================================

You should learn how to hash a password. It's not hard. There is a built in
`crypto` module, but I would recommend using either [bcrypt][bcrypt] or
[argon2][argon2].

So for this one, now when you store the password in the constructor function,
I want you to hash the password (Make sure you use the synchronous version of
whichever method you choose).

You will also need to make a modification to your `authenticate` method to make
sure you use the `verify` method of whichever crypto library you used.

```js
let user = new User('myusername', 'mypassword');

console.log(user.username); // 'myusername'
console.log(user.password); // '$argon2i$m=4096,t=3,p=1$K04577+9VO+/vQ0Ff++/vQ$9ilfFAtlMeWagl6Cqf5Ds5cGTRE/42aQ4yRj6oqPw2A'

console.log(user.authenticate('mypassword')); // true
console.log(user.authenticate('notmypassword')); // false
```


Problem 3 - Unique Usernames
========================================================================

You need a way of storing all of your users (it can just be in memory) and
making sure you don't create users with the same name. Use the built in `assert`
module to make sure that you can't create a user with the same username.

```js
var assert = require('assert');

assert(true, 'this will not throw an error');
assert(false, 'but this one will');
```

```js
let user = new User('myusername', 'mypassword');
let user2 = new User('myusername', 'mypassword'); // Should throw assertion error
```


Problem 4 - User lookup
=========================================================================

You should implement a `find` static method that accepts a `username` parameter
which is used to lookup a user by username. It should return the user who's
username is given, or `null` if no user was found.

```js
let user = new User('myusername', 'mypassword');
console.log(User.find('myusername') === user); // true
console.log(User.find('otherusername')); // null
```


Problem 5 - User lookup and authentication
========================================================================

Now implement a static `authenticate` method, which accepts a username and
password. If no user was found, return `false`. If there was a user found, but
the password was wrong, return `false`. But if the user was found and the
password was correct, return the user object.

```js
let user = new User('myusername', 'mypassword');

User.authenticate('myusername', 'mypassword'); // true
User.authenticate('myusername', 'notmypassword'); // false
User.authenticate('notmyusername', 'mypassword'); // false
```

<!-- Links -->
[bcrypt]: https://www.npmjs.com/package/bcrypt
[argon2]: https://www.npmjs.com/package/argon2
