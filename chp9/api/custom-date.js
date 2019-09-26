const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

const CustomDate = new GraphQLScalarType({
  name: 'CustomDate',
  description: 'A custom scalar type foor date',
  serialize(value) {    
    return value.toISOString();
  },
  parseValue(value) { 
    /** This function will be called when the value on the client side in a mutatiion is passed as variables */
    const dateValue = new Date(value);
    return isNaN(dateValue) ? undefined : dateValue;
    // Returning undefined is treated as an error by the library.
  },
  parseLiteral(ast) { 
    /** This function will be called when the value on the client side in a mutation is passed as a literal */
    if (ast.kind == Kind.STRING) { 
      const value = new Date(ast.value);
      return isNaN(value) ? undefined : value;
    }
    // Returning nothing is same as returning undefined.
  },
});

module.exports = CustomDate;
