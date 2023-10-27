require('dotenv').config();
let mongoose = require('mongoose');

const URI = process.env.MONGO_URI;
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = {
  name: {type: String, required: true},
  age: Number,
  favoriteFoods: [String]
};

const Person = mongoose.model('Person', personSchema);

const p1 = new Person({name: "Feiz", age: 21, favoriteFoods: ["pizza", "burger"]});
const p2 = new Person({name: "Mario", age: 40, favoriteFoods: ["spaghetti"]});
const arrayOfPeople =   [p1, p2];

const createAndSavePerson = (done) => {
  p1.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function(err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function(err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function(err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, function(err, person) {
    if (err) return console.error(err);
    
    person.favoriteFoods.push(foodToAdd);

    person.save(function(err, data) {
      if (err) return console.error(err);
      done(null, data);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, function(err, doc) {
    if (err) return console.error(err);
    done(null , doc);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function(err, doc) {
    if (err) return console.error(err);done(null, doc);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove},function(err, response) {
    if (err) return console.error(err);
    done(null, response);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch})
  .sort({name: 1})
  .limit(2)
  .select({age: 0})
  .exec(function(err, response) {
    if (err) return console.error(err);
    done(null, response);
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
