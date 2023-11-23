// import user model
const { GraphQLError } = require("graphql");
const { User } = require("../models");
// import sign token function from auth
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    getSingleUser: async (_, args, context) => {
      if (context.user) {
        const foundUser = await User.findOne({ _id: context.user._id });
        return foundUser;
      }
    },
  },

  Mutation: {
    createUser: async(_,args)=> {
        const user = await User.create(args)
        const token= signToken(user)
        return {token, user}
    },
    login: async(_,args)=>{
        const user = await User.findOne({ $or: [{ username: args.username }, { email: args.email }] });
        if (!user) {
            throw GraphQLError("User not authenticated!")
        }
    
        const correctPw = await user.isCorrectPassword(args.password);
    
        if (!correctPw) {
            throw GraphQLError("User not authenticated!")
        }
        const token = signToken(user);
        return { token, user };

    },
    saveBook: async(_,args,context)=>{
        console.log(context.user)

    }
  },

};

module .exports = resolvers; 
