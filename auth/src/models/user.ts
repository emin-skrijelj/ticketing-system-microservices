import mongoose, { version } from 'mongoose';
import { Password } from '../services/password';
// Interface that describes the propertioes
// that are required by a new User
interface UserAttrs {
  email: string;
  password: string;
}

// interface that describes the properties 
// that User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
} 

// interface that desc what User doc has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
} 

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.password;
    },
    versionKey: false
  }
});

userSchema.pre('save', async function(done) {
  if (this.isModified('password')){
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};


const User = mongoose.model<UserDoc, UserModel>('User', userSchema);


export { User };

