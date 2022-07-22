import { PostSchema } from '#Models/Post.js';
import { UserSchema } from '#Models/User.js';
import { GraphQLID, GraphQLString } from 'graphql';
import { createJWTToken } from 'src/utils/auth.service.js';
import { posts } from './queries.js';
import { PostType } from './type.js';

export const register = {
  type: GraphQLString,
  description: 'Register a new user',
  args: {
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    displayName: { type: GraphQLString },
  },
  resolve: async (parent, args) => {
    const { username, email, password, displayName } = args;

    const newUser = new UserSchema({
      username,
      email,
      password,
      displayName,
    });

    await newUser.save();

    const token = createJWTToken({
      _id: newUser.id,
      username: newUser.username,
      email: newUser.email,
    });

    return token;
  },
};

export const login = {
  type: GraphQLString,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  resolve: async (parent, args) => {
    const user = UserSchema.findOne({ email: args.email }).select('+password');

    if (!user || args.password !== (await user).password)
      throw Error('Invalid Credentials');

    const token = createJWTToken({
      _id: user.id,
      username: user.username,
      email: user.email,
    });

    return token;
  },
};

export const createPost = {
  type: PostType,
  description: 'Create a new post',
  args: {
    title: { type: GraphQLString },
    body: {
      type: GraphQLString,
    },
  },
  resolve: async (parent, args, { verifiedUser }) => {
    const newPost = new PostSchema({
      title: args.title,
      body: args.body,
      authorId: verifiedUser._id,
    });

    await newPost.save();

    return newPost;
  },
};

export const updatePost = {
  type: PostType,
  description: 'Update a post',
  args: {
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
  },
  resolve: async (parent, { id, title, body }, { verifiedUser }) => {
    if (!verifiedUser) throw new Error('Unauthorized');

    const updatePost = await PostSchema.findOneAndUpdate(
      { _id: id, authorId: verifiedUser._id },
      { title, body },
      { new: true, runValidators: true }
    );

    return updatePost;
  },
};

export const deletePost = {
  type: GraphQLString,
  description: 'Delete a post',
  args: {
    postId: { type: GraphQLID },
  },
  resolve: async (parent, { postId }, { verifiedUser }) => {
    if (!verifiedUser) throw new Error('Unauthorized');

    const postDeleted = await PostSchema.findOneAndDelete({
      _id: postId,
      authorId: verifiedUser._id,
    });

    if (!postDeleted) throw new Error('Post not found');

    return 'Post deleted';
  },
};
