var mocha = require("mocha");                                                                                                                                                           
var eventsIntercept = require('events-intercept');                                                                                                                                      
                                                                                                                                                                                        
function mochaDotReporter(results) {                                                                                                                                                    
  eventsIntercept.patch(results)                                                                                                                                                        
                                                                                                                                                                                        
  var currentFile = "";                                                                                                                                                                 
                                                                                             
  results.intercept('pass', function(test, done) {                                                                                             
                                                                                             
    if (test.file !== currentFile) {                                                                                             
      currentFile = test.file;                                                                                             
                                                                                             
      results.emit('suite end');                                                                                             
      results.emit('suite', { title: currentFile });                                                                                             
    }                                                                                             
                                                                                             
    // TODO: determin if the test was slow ?                                                                                             
    test.slow = function() {                                                                                             
      return 0;                                                                                             
    };                                                                                             
                                                                                             
    test.title = test.attrs.info;                                                                                             
                                                                                             
    done(null, test);                                                                                             
  });                                                                                             
                                                                                             
  return new mocha.reporters.dot(results);                                                                                             
}                                                                                             
                                                                                             
module.exports = mochaDotReporter; 
