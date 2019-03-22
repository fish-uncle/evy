const uuid = require('uuid/v4');
let i = 1;
while (i < 10) {
  console.log(uuid());
  i++;
}
