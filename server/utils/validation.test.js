const expect = require('expect');
const {isRealString} = require('./validation')

//isRealString
describe('isRealString', ()=>{
  it('should reject nonstring values checkoout number', ()=>{
      var rel = isRealString(123)
      expect(rel).toBe(false);

  });
  it('should reject string with only spaces', ()=>{
    var rel =  isRealString("     ");
    expect(rel).toBe(false);
  });
  it('should allow strings with non-space characters', ()=>{
      var rel = isRealString('  NDE Room  ');
      expect(rel).toBe(true);
  });
});
