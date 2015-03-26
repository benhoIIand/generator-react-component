jest.dontMock('../src/<%= moduleName %>.js');

describe('<%= moduleName %>', function() {

  it('should exist', function(done) {
    var <%= moduleName %> = require('../src/<%= moduleName %>');

    expect(<%= moduleName %>).toBeDefined();
  });

});
