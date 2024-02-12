const {
  getLastSevenDays,
  // getLinks,
  processPinboardLink,
} = require('../../../scripts/links');
const sinon = require('sinon');
const assert = require('assert');

const sandbox = sinon.createSandbox();

describe('Links', () => {
  afterEach(() => {
    sandbox.restore();
  });

  // describe('getLinks', () => {
  // });

  describe('getLastSevenDays', () => {
    let mockResponse;
    let pinboardMock;

    beforeEach(() => {
      mockResponse = [
        {
          href: 'https://piccalil.li/blog/react-is-getting-a-bit-of-a-kicking-recently/',
          description: 'It feels like React is getting a bit of a kicking recently - Piccalilli',
          extended: 'I do feel like React is overused and shouldn\'t be the first tool people reach for in the toolbox, but this post is rather more nuanced than some of the others that I\'ve seen making the rounds.',
          meta: '870efbdfb4f9d3276bc8eea7d5ccaa5b',
          hash: '86822d81166b877beb41a24d1400c966',
          time: '2024-02-09T17:41:46Z',
          shared: 'yes',
          toread: 'no',
          tags: 'javascript react'
        },
        {
          href: 'https://drhayes.io/test/thing',
          description: 'Some cool description...',
          extended: 'An extended thing goes here...',
          meta: '870efbdfb4f9d3276bc8eea7d5ccaa5b',
          hash: '86822d81166b877beb41a24d1400c966',
          time: '2024-02-09T17:41:46Z',
          shared: 'no',
          toread: 'no',
          tags: 'javascript react'
        },
      ];
      pinboardMock = {
        all: sandbox.stub().resolves(mockResponse),
      };
    });

    it('calls all with the correct arguments', async () => {
      const date = new Date('2024-02-09');
      const lastPosts = await getLastSevenDays(pinboardMock, date);
      sinon.assert.calledOnce(pinboardMock.all);
      const firstCall = pinboardMock.all.getCall(0);
      assert.deepStrictEqual(firstCall.args, [{
        fromdt: '2024-02-02T00:00:00.000Z',
      }]);
      // Ensure the shared one didn't come back.
      assert.equal(lastPosts.length, 1);
      assert.equal(lastPosts.find(post => post.shared === 'no'), undefined);
    });

    it('blows up when the Pinboard call blows up', async () => {
      pinboardMock.all.rejects(new Error('oh noes!'));
      try {
        await getLastSevenDays(pinboardMock, new Date());
        assert.fail('Should have thrown an error');
      } catch (e) {
        if (e.message !== 'oh noes!') {
          throw e;
        }
      }
    });

    it('blows up if it does not get any posts', async () => {
      pinboardMock.all.resolves({
        date: '2024-02-09T17:41',
        user: 'drhayes',
      });
      try {
        await getLastSevenDays(pinboardMock, new Date());
        assert.fail('Should have thrown an error');
      } catch (e) {
        if (e.message !== 'no posts came back!') {
          throw e;
        }
      }
    });
  });

  describe('processPinboardLink', ()  => {
    const testLink = {
      href: 'https://piccalil.li/blog/react-is-getting-a-bit-of-a-kicking-recently/',
      description: 'It feels like React is getting a bit of a kicking recently - Piccalilli',
      extended: 'I do feel like React is overused and shouldn\'t be the first tool people reach for in the toolbox, but this post is rather more nuanced than some of the others that I\'ve seen making the rounds.',
      meta: '870efbdfb4f9d3276bc8eea7d5ccaa5b',
      hash: '86822d81166b877beb41a24d1400c966',
      time: '2024-02-09T17:41:46Z',
      shared: 'yes',
      toread: 'no',
      tags: 'javascript react'
    };

    it('parses the date', () => {
      const result = processPinboardLink(testLink);
      assert.equal(result.year, 2024);
      assert.equal(result.month, 2);
    });

    it('changes the tags into an array', () => {
      const result = processPinboardLink(testLink);
      assert.deepStrictEqual(result.tags, ['javascript', 'react']);
    });

    it('changes the href into url', () => {
      const result = processPinboardLink(testLink);
      assert.deepStrictEqual(result.url, testLink.href);
    });

    it('changes the description to title and the extended to note', () => {
      const result = processPinboardLink(testLink);
      assert.equal(result.title, testLink.description);
      assert.equal(result.note, testLink.extended);
    });
  });
});
