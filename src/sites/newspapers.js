var utils = require('../utils.js');

var defaultConfig = {
  NEWSPAPERS_LIFESPAN: 90,
  NEWSPAPERS_DATE_PADDING: 5
};

module.exports = function(config, data){

  config = utils.defaults(config, defaultConfig);

  var baseUrl = 'http://go.newspapers.com/results.php?query=';
  var query = '';
  
  // Name
  if(data.givenName) {
    query += data.givenName;
  }
  if(data.familyName) {
    if(query) {
      query += ' ';
    }
    query += data.familyName;
  }
  
  //
  // Year range
  //
  
  var birthYear = utils.getYearInt(data.birthDate), 
      deathYear = utils.getYearInt(data.deathDate);
  
  // We have a birth date
  if(birthYear) {
    
    // We also have death date so add padding
    if(deathYear){
      deathYear += config.NEWSPAPERS_DATE_PADDING;
    } 
    
    // We have a birth date but not a death date, so add
    // the lifespan value to the birth year
    else {
      deathYear = birthYear + config.NEWSPAPERS_LIFESPAN;
    }
    
    // Pad the birth year
    birthYear -= config.NEWSPAPERS_DATE_PADDING
  } 
  
  // We have a death year but not a birth year
  else if(deathYear) {
    
    // Subtract lifespan value from deathYear
    birthYear = deathYear - config.NEWSPAPERS_LIFESPAN;
    
    // Pad the death year
    deathYear += config.NEWSPAPERS_DATE_PADDING;
  }
  
  if(birthYear && deathYear){
    query = utils.addQueryParam(query, 'year-start', birthYear);
    query = utils.addQueryParam(query, 'year-end', deathYear);
  }
  
  return baseUrl + query;

};
