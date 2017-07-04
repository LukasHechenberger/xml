import * as moduleExports from '../src/index';
import Builder from '../src/lib/Builder';
import Parser from '../src/lib/Parser';

describe('Module', function() {
  /** @test {Builder} */
  it('should export Builder class', function() {
    expect(moduleExports.Builder, 'to be', Builder);
  });

  /** @test {Parser} */
  it('should export Parser class', function() {
    expect(moduleExports.Parser, 'to be', Parser);
  });

  /** @test {parse} */
  it('should export parse function', function() {
    expect(moduleExports.parse, 'to be a function');
  });

  /** @test {build} */
  it('should export build function', function() {
    expect(moduleExports.build, 'to be a function');
  });
});
