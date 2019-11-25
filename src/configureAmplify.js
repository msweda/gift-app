import Amplify from 'aws-amplify';
import awsConfig from './aws-exports';

function configureAmplify() {
  Amplify.configure(awsConfig);
}

export default configureAmplify;
