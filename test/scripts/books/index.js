const {
  addBook,
  fetchBookInfo,
  isBookInfoValid,
} = require('../../../scripts/books');
const sinon = require('sinon');
const assert = require('assert');

describe('isBookInfoValid', () => {
  it('is not valid if it is missing a title', () => {
    assert.ok(!isBookInfoValid({
      authors: ['Author1'],
    }));
  });

  it('is not valid if it is missing authors', () => {
    assert.ok(!isBookInfoValid({
      title: 'Some Cool Title',
    }));
  });

  it('is valid if it has a title and authors', () => {
    assert.ok(isBookInfoValid({
      title: 'Some Cool Title',
      authors: ['Author1'],
    }));
  });
});

describe('fetchBookInfo', () => {
  let mockIsbnInfo;

  beforeEach(() => {
    mockIsbnInfo = {
      resolve: sinon.fake.resolves({}),
    };
  });

  it('should call isbnInfo.resolve with isbn', async () => {
    const isbn = '12345';
    await fetchBookInfo(isbn, mockIsbnInfo);
    assert.ok(mockIsbnInfo.resolve.calledWith(isbn));
  });

  it('should throw an error is isbn has problems', async () => {
    mockIsbnInfo.resolve = sinon.fake.rejects(Error('oh noes'));
    try {
      await fetchBookInfo('12345', mockIsbnInfo);
      assert.fail('should have thrown');
    } catch (err) {
      if (err.message !== 'oh noes') {
        assert.fail('wrong error message');
      }
    }
  });

  it('will filter results to only the parts we care about', async () => {
    const isbnData = {
      title: 'Some Cool Title',
      authors: ['Author1', 'Author2'],
      imageLinks: {
        smallThumbnail: 'http://example.com/small.jpg',
        thumbnail: 'http://example.com/large.jpg',
      },
    };
    mockIsbnInfo.resolve = sinon.fake.resolves(isbnData);
    const result = await fetchBookInfo('12345', mockIsbnInfo);
    assert.deepStrictEqual(result, {
      isValid: true,
      // one of 'unknown', 'reading', 'read', or "want to read'
      status: 'unknown',
      title: isbnData.title,
      authors: isbnData.authors,
      imageLinks: {
        smallThumbnail: isbnData.imageLinks.smallThumbnail,
        thumbnail: isbnData.imageLinks.thumbnail,
      },
    });
  });

  it('handles missing information just fine', async () => {
    mockIsbnInfo.resolve = sinon.fake.resolves({});
    const result = await fetchBookInfo('12345', mockIsbnInfo);
    assert.deepStrictEqual(result, {
      isValid: false,
    });
  });
});
