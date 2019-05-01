const app = require('../app');
const expect = require('chai').expect;
const request = require('supertest');

describe('GET /playstore', () => {
  it('should return an array of apps', () => {
    return request(app)
      .get('/playstore')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
      	expect(res.body).to.be.an('array');
      	expect (res.body).to.have.lengthOf.at.least(1);
      	const app = res.body[0];
      	expect(app).to.include.all.keys('App', 'Rating', 'Genres');
      });

  it('should be 400 if sort is incorrect', () => {
	return request(app)
		.get('/playsyore')
		.query({sort: 'MISTAKE'})
		.expect(400, 'Sort must be one of rating or app');
	});

	it('should sort by app', () => {
	  return request(app)
		.get('/playstore')
		.query({sort: 'app'})
		.expect(200)
		.expect('Content-Type', /json/)
		.then(res => {
			expect(res.body).to.be.an('array');
			let i = 0;
			let sorted = true;
			while(sorted && i < res.body.length - 1) {
			sorted = sorted && res.body[i].title < res.body[i + 1].title;
			i++;
			}
		expect(sorted).to.be.true;
	});
});
