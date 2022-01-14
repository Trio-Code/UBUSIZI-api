import User from '../models/user';
import Post from '../models/post';

export default async (searchBy, payload, page, limit) => {
  try {
    let Collection;
    let query;
    let fieldsToOmit = '-__v';
    fieldsToOmit += ' ';
    switch (searchBy.toLowerCase()) {
      case 'user':
        Collection = User;
        query = { $or: [{ username: { $regex: `.*${payload}.*`, $options: 'i' }, isVerified: true }, { firstname: { $regex: `.*${payload}.*`, $options: 'i' }, isVerified: true }, { lastname: { $regex: `.*${payload}.*`, $options: 'i' }, isVerified: true }] };
        fieldsToOmit += '-createdAt -password';
        break;
      case 'category':
        Collection = Post;
        query = { category: payload };
        fieldsToOmit += '';
        break;
      default:
        // In case we implement elastic search
        Collection = null;
        break;
    }

    return await Collection.find(query, fieldsToOmit)
      .skip((page - 1) * limit).limit(limit)
      .populate('owner', ['profilePicture', 'username', 'firstname', 'lastname']);
  } catch (error) {
    throw error;
  }
};
