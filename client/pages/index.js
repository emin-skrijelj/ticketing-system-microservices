import axios from 'axios';

const LandingPage = ({ color }) => {
  console.log(currentUser)
  return <h1>Landing Page</h1>
}

LandingPage.getInitialProps = async () => {
  const response = await axios.get('http://ingress-nginx-controller.ingress-nginx./api/users/currentuser');

  return response.data
};

export default LandingPage;