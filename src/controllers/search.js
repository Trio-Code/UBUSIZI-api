import SearchService from '../database/services/search';
import out from '../helpers/response';
import fullname from '../helpers/fullname';
import { allPostsIterator } from '../helpers/iterators';

export default async (req, res) => {
  try {
    const { searchBy } = req.params;
    const { q, page, limit } = req.query;
    const { id } = req.user;
    let results = await SearchService(
      searchBy,
      q,
      parseInt(page, 10),
      parseInt(limit, 10)
    );
    if (searchBy.toLowerCase() === 'user') fullname(results);
    if (searchBy.toLowerCase() === 'category') results = await allPostsIterator(id, results);
    return results.length > 0
      ? out(res, 200, 'Results Retrieved', results)
      : out(res, 404, 'No Search Results', null, 'NOT_FOUND');
  } catch (error) {
    return out(res, 500, error.message || error, null, 'SERVER_ERROR');
  }
};
