import { shallowMount } from '@vue/test-utils';
import comp from '../../../src/comp.vue';

describe('index_test', function () {
  before(function () {
    // 在本区块的所有测试用例之前执行
  });

  after(function () {
    // 在本区块的所有测试用例之后执行
  });

  beforeEach(function () {
    // 在本区块的每个测试用例之前执行
  });

  afterEach(function () {
    // 在本区块的每个测试用例之后执行
  });

  it('should_be_rendered_correctly', async () => {
    const wrapper = shallowMount(comp);
    expect(wrapper.text()).to.be.equal('Hello world');
  });
});
