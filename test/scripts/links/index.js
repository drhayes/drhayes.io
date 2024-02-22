const {
  createLinkPost,
  formatLinkDir,
  getLastSevenDays,
  maybeWriteLinkFile,
  processPinboardLink,
  writeLinks,
} = require('../../../scripts/links');
const sinon = require('sinon');
const assert = require('assert');

const sandbox = sinon.createSandbox();

describe('Links', () => {
  afterEach(() => {
    sandbox.restore();
  });

  describe('writeLinks', () => {
    it('writes the links to the file system', async () => {
      const mockFsPromises = {
        mkdir: sandbox.stub().resolves(),
        writeFile: sandbox.stub().resolves(),
      };
      const processedLinks = [
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
      ];
      await writeLinks('/', processedLinks, mockFsPromises);
      sinon.assert.calledOnce(mockFsPromises.mkdir);
      sinon.assert.calledOnce(mockFsPromises.writeFile);
    });
  });

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
      assert.equal(result.date, '2024-02-09');
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

    it('generates a slug', () => {
      const result = processPinboardLink(testLink);
      assert.equal(result.slug, 'it-feels-like-react-is-getting-a-bit-of-a-kicking-recently-piccalilli.md');
    });
  });

  describe('maybeWriteLinkFile', () => {
    const mockFsPromises = {};
    let processedLink;

    beforeEach(() => {
      mockFsPromises.mkdir = sandbox.stub().resolves();
      mockFsPromises.writeFile = sandbox.stub().resolves();
      processedLink = {
        date: '2024-02-09',
        description: 'Some description would be nice but is optional',
        month: 2,
        note: 'Some extended text that appears as a note field in the object.',
        slug: 'some-title.md',
        tags: ['tag1', 'tag2'],
        title: 'Some Title',
        url: 'https://drhayes.io/test/thing',
        year: 2024,
      };
    });

    it('creates the directory if it does not exist', async () => {
      await maybeWriteLinkFile('/linksdir', processedLink, mockFsPromises);
      sinon.assert.calledWith(mockFsPromises.mkdir, '/linksdir/2024/02', { recursive: true });
    });

    it('silently fails if mkdir fails but hopefully logs something about it', async () => {
      mockFsPromises.mkdir.rejects(Error('oh noes!'));
      await maybeWriteLinkFile('/linksdir/one/two', processedLink, mockFsPromises);
    });

    it('writes a file with the slug as the name', async () => {
      await maybeWriteLinkFile('/linksdir', processedLink, mockFsPromises);
      sinon.assert.calledWith(mockFsPromises.writeFile, '/linksdir/2024/02/some-title.md', sinon.match.string);
    });

    it('silently fails if writeFile fails but hopefully logs something about it', async () => {
      mockFsPromises.writeFile.rejects(Error('oh noes!'));
      await maybeWriteLinkFile('/linksdir', processedLink, mockFsPromises);
      sinon.assert.calledWith(mockFsPromises.writeFile, '/linksdir/2024/02/some-title.md', sinon.match.string);
    });
  });

  describe('createLinkPost', () => {
    let processedLink;

    beforeEach(() => {
      processedLink = {
        date: '2024-02-09',
        description: 'Some description would be nice but is optional',
        month: 2,
        note: 'Some extended text that appears as a note field in the object.',
        slug: 'some-title.md',
        tags: ['tag1', 'tag2'],
        title: 'Some Title',
        url: 'https://drhayes.io/test/thing',
        year: 2024,
      };
    });

    it('creates expected link post', () => {
      const post = createLinkPost(processedLink);
      assert.equal(post,
`---
title: "🔗 Some Title"
description: "Some description would be nice but is optional"
date: 2024-02-09
tags:
  - tag1
  - tag2
url: https://drhayes.io/test/thing
---

Some extended text that appears as a note field in the object.

Check it out: https://drhayes.io/test/thing`);
    });

    it('description is optional', () => {
      processedLink.description = '';
      const post = createLinkPost(processedLink);
      assert.equal(post,
`---
title: "🔗 Some Title"
date: 2024-02-09
tags:
  - tag1
  - tag2
url: https://drhayes.io/test/thing
---

Some extended text that appears as a note field in the object.

Check it out: https://drhayes.io/test/thing`);
    });
  });

  describe('formatLinkDir', () => {
    it('pads the month right', () => {
      const baseDir = '/linksdir';
      const processedLink = {
        year: 2024,
        month: 2,
      };
      assert.equal(formatLinkDir(baseDir, processedLink), '/linksdir/2024/02');
    });
  });
});
