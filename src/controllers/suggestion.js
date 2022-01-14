import out from '../helpers/response';
import { suggestionsData } from '../helpers/iterators';
import ShuffleArray from '../helpers/shuffleArray';

class SuggestionController {
  static async getSuggestions(req, res) {
    try {
      const { id } = req.user;
      let suggestions = await suggestionsData(id);
      suggestions = ShuffleArray(suggestions);
      suggestions = suggestions.slice(0, 8);
      return out(res, 200, 'Users', suggestions);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }
}

export default SuggestionController;
