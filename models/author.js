var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
    {
        first_name: {type: String, required: true, max: 100},
        family_name: {type: String, required: true, max: 100},
        date_of_birth: {type: Date},
        date_of_death: {type: Date}
    }
);

// Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function(){
    return this.family_name + ', ' + this.first_name;
});

// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function(){
    return '/catalog/author/' + this._id;
});

// Virtual for author's birth dates
AuthorSchema
.virtual('date_of_birth_formatted')
.get(function(){
    return this.date_of_birth ? moment(this.date_of_birth).format('YYYY-MM-DD') : '';
});

// Virtual for author's death dates
AuthorSchema
.virtual('date_of_death_formatted')
.get(function(){
    return this.date_of_death ? moment(this.date_of_death).format('YYYY-MM-DD') : '';
});

// VIrtual for Author's life span
AuthorSchema
.virtual('lifespan')
.get(function(){
    var dob = this.date_of_birth ? moment(this.date_of_birth).format('YYYY-MM-DD') : '';
    var dod = this.date_of_death ? moment(this.date_of_death).format('YYYY-MM-DD') : '';
    return dob + ' - ' + dod;
});

// Export model
module.exports = mongoose.model('Author', AuthorSchema);